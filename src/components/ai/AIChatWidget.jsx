import React, { useContext } from "react";
import { MessageCircle } from "lucide-react";
import { AIChatContext } from "../../context/AIChatContext.jsx";
import ChatWindow from "./ChatWindow.jsx";

const AIChatWidget = () => {
  const { isOpen, toggleChat } = useContext(AIChatContext);

  return (
    <div className="fixed bottom-10 right-5 sm:right-10 z-50 flex flex-col items-end gap-3">
      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
          <ChatWindow />
        </div>
      )}

      {/* FLOATING BUTTON WRAPPER */}
      <div className="relative flex items-center justify-center">
        {/* PULSE RINGS (alive effect) */}
        <span className="absolute inline-flex h-16 w-16 rounded-full bg-blue-500/30 animate-ping"></span>
        <span className="absolute inline-flex h-20 w-20 rounded-full bg-blue-400/20 animate-pulse"></span>

        {/* MAIN BUTTON */}
        <button
          onClick={toggleChat}
          className={`
            relative flex h-14 w-14 items-center justify-center rounded-full  backdrop-blur-xl
            bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600
            text-white shadow-[0_10px_30px_rgba(59,130,246,0.45)]  transition-all duration-300
            hover:scale-110 hover:cursor-pointer hover:shadow-[0_15px_50px_rgba(59,130,246,0.6)]
            active:scale-95
          `}
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
  );
};

export default AIChatWidget;
