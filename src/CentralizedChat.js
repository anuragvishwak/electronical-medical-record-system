import React, { useState } from "react";
import MainChat from "./In House Chat App/MainChat";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

function CentralizedChat() {
  const [openingChatApp, setopeningChatApp] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setopeningChatApp(true);
        }}
        className="hover:text-[#003441] text-sm text-white border border-white py-1 px-3 hover:bg-white"
      >
        <div className="flex items-center space-x-1">
          <IoChatbubbleEllipsesOutline size={22} />
          <p>Messenger</p>
        </div>
      </button>

      {openingChatApp && <MainChat setopeningChatApp={setopeningChatApp} />}
    </div>
  );
}

export default CentralizedChat;
