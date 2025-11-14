import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { database } from "../FirebaseConfiguration";
import { BsFillSendFill } from "react-icons/bs";
import { motion } from "framer-motion";

function MainChat({ setopeningChatApp }) {
  const email = localStorage.getItem("email");
  const hospitalName = localStorage.getItem("hospitalName");
  const [gettingUser, setgettingUser] = useState([]);
  const [capturingUserObject, setcapturingUserObject] = useState(null);
  const [captureMessage, setcaptureMessage] = useState("");
  const [gettingMessages, setgettingMessages] = useState([]);

  async function renderingUser() {
    const taskDetails = await getDocs(collection(database, "user_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingUser(multipleArray);
  }

  async function addMessage() {
    const messageData = {
      sender: email,
      message: captureMessage,
      reciever: capturingUserObject.email,
      hospitalName: hospitalName,
    };
    try {
      await addDoc(collection(database, "message_database"), messageData);
      alert("Message sent successfully!!");
      console.log("Message sent successfully!!");
    } catch (error) {
      console.log("Something went wrong!!!", error);
    }
  }

  async function renderingMessages() {
    const taskDetails = await getDocs(collection(database, "message_database"));
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setgettingMessages(multipleArray);
  }

  useEffect(() => {
    renderingUser();
    renderingMessages();
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 40 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 14,
        }}
        className="bg-white p-5 w-10/12 h-[630px]"
      >
        <div className="flex items-start mb-3 justify-between">
          <div>
            <div className="flex items-center space-x-1">
              <IoChatbubbleEllipsesOutline
                className="text-[#003441]"
                size={20}
              />
              <p className="text-xl font-bold text-[#003441]">Message Center</p>
            </div>
            <p className="text-[#01B49C] text-sm font-semibold">
              EMR Chat: Everyone's connected
            </p>
          </div>
          <button
            onClick={() => {
              setopeningChatApp(false);
            }}
            className="text-red-500 font-semibold"
          >
            Close
          </button>
        </div>
        <div className="bg-gray-100 shadow-inner border flex w-full border-gray-300 h-[530px]">
          <div className="bg-white border-r w-60 border-gray-300 p-3">
            <p className="text-[#01B49C] text-lg font-bold">Your Chats</p>
            <div>
              {gettingUser
                .filter(
                  (user) =>
                    user.Hospital_name === hospitalName && user.email !== email
                )
                .map((user) => (
                  <div
                    onClick={() => {
                      setcapturingUserObject(user);
                    }}
                    className="border-b py-2 border-gray-300"
                  >
                    <p className="text-[#003441] font-semibold">{user.name}</p>
                    <p className="text-sm text-[#01B49C]">{user.email}</p>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex-1">
            {capturingUserObject ? (
              <div className="h-full flex flex-col">
                <div className="p-3 border-b bg-[#003441] border-gray-300">
                  <p className="text-lg font-semibold text-white">
                    {capturingUserObject.name}
                  </p>

                  <div className="text-sm flex items-center text-[#01B49C]">
                    <p>{capturingUserObject.email}</p>
                    <span className="text-white mx-1">|</span>
                    <p className="capitalize">{capturingUserObject.role}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3"></div>

                {gettingMessages
                  .filter(
                    (message) =>
                      message.hospitalName === hospitalName &&
                      ((message.sender === email &&
                        message.reciever === capturingUserObject.email) ||
                        (message.sender === capturingUserObject.email &&
                          message.reciever === email))
                  )
                  .map((message) => (
                    <div
                      className={`w-auto flex my-1 ${
                        message.sender === email
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`px-3 py-2 text-sm rounded-xl border border-gray-300 shadow m-3 w-80 text-justify ${
                          message.sender === email
                            ? "bg-[#01B49C] text-white rounded-br-none"
                            : "bg-white text-black rounded-bl-none"
                        }`}
                      >
                        {message.message}
                      </div>
                    </div>
                  ))}

                <div className="mt-auto p-3 border-t bg-white border-gray-300">
                  <div className="flex items-center space-x-2">
                    <input
                      onChange={(e) => {
                        setcaptureMessage(e.target.value);
                      }}
                      className="border-b text-[#003441] border-gray-300 w-full p-2"
                      placeholder="Type a message..."
                    />
                    <button
                      onClick={() => {
                        addMessage();
                      }}
                      className="bg-[#01B49C] text-white px-4 py-2"
                    >
                      <BsFillSendFill />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-gray-700">
                  <IoChatbubbleEllipsesOutline
                    size={160}
                    className="mx-auto mb-2"
                  />
                  <p className="text-[#003441] text-3xl font-bold">
                    Select User to chat.
                  </p>
                  <p className="text-sm text-[#01B49C] mt-2">
                    Start a secure conversation with hospital staff
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default MainChat;
