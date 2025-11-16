import React, { useState } from "react";
import { BsArrowUp } from "react-icons/bs";
import { FaRobot } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

function AIAssistant() {
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
 const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // ✅ Corrected model name
// OR:
// const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

  const publicRoutes = ["/", "/Login", "/SignUp"];
  const location = useLocation();
  const isPublic = publicRoutes.includes(location.pathname);
  const [openingChatBot, setopeningChatBot] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setLoading(true);

    try {
      const formattedMessages = updatedMessages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

      const result = await model.generateContent({
        contents: formattedMessages,
      });

      const aiText = result.response.text();

      setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
    } catch (err) {
      console.error("Gemini Error:", err);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div>
      {!isPublic && !openingChatBot && (
        <button
          onClick={() => setopeningChatBot(true)}
          className="fixed bottom-4 right-4 p-2.5 rounded-full shadow-lg bg-[#003441] text-white"
        >
          <FaRobot size={40} />
        </button>
      )}

      {openingChatBot && (
        <div className="fixed z-50 shadow bg-white border border-gray-300 h-[550px] w-[400px] bottom-4 right-4 rounded-lg flex flex-col">
          {/* Header */}
          <div className="flex bg-[#003441] p-4 items-start justify-between">
            <div>
              <p className="text-white font-semibold">AnuMed AI</p>
              <p className="text-[#01B49C] text-sm">Your Smart EMR Assistant</p>
            </div>

            <button
              onClick={() => setopeningChatBot(false)}
              className="font-semibold text-red-400 hover:text-red-600"
            >
              Close
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg text-sm ${
                  msg.role === "user"
                    ? "bg-[#003441] text-white self-end ml-20"
                    : "bg-gray-200 text-black mr-20"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && <p className="text-gray-400 text-sm">Thinking...</p>}
          </div>

          <div>
            <div className="flex items-center space-x-2 m-3 border border-gray-300 p-3 bg-gray-100">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your Questions..."
                className="text-sm w-full bg-gray-100 border-b border-gray-300"
              />
              <button onClick={handleSend} disabled={loading}>
                <BsArrowUp
                  size={33}
                  className="bg-white rounded-full border border-gray-300 shadow p-2"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIAssistant;
