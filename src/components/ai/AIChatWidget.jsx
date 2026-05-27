import React, { useContext } from "react";
import { MessageCircle } from "lucide-react";
import { AIChatContext } from "../../context/AIChatContext.jsx";
import ChatWindow from "./ChatWindow.jsx";

const AIChatWidget = () => {
  const { isOpen, toggleChat } = useContext(AIChatContext);

  return (
    <div className="fixed flex flex-col items-end bottom-10 right-5 sm:right-10 z-50">
      {isOpen ? (
        <>
          <div className=" max-w-lg animate-in fade-in slide-in-from-bottom-4">
            <ChatWindow />
          </div>
          <button
            onClick={toggleChat}
            className="flex h-14 w-14 items-center hover:cursor-pointer justify-center rounded-full bg-indigo-600 text-white shadow-lg transition hover:bg-indigo-700 hover:shadow-xl active:scale-95"
            title="Open shopping assistant"
          >
            <MessageCircle size={24} />
          </button>
        </>
      ) : (
        <button
          onClick={toggleChat}
          className="flex h-14 w-14 items-center hover:cursor-pointer justify-center rounded-full bg-indigo-600 text-white shadow-lg transition hover:bg-indigo-700 hover:shadow-xl active:scale-95"
          title="Open shopping assistant"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default AIChatWidget;
