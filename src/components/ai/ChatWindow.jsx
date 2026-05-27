import React, { useContext, useEffect, useState, useMemo, useRef } from "react";

import { Send, X, Sparkles, Bot, User } from "lucide-react";

import { AIChatContext } from "../../context/AIChatContext.jsx";
import { RobotIcon } from "./RobotIcon.jsx";

const suggestedQuestions = [
  "Show me gaming laptops under $1500",
  "Best budget headphones for gaming",
  "Gaming mice with RGB lighting",
  "Affordable home office furniture",
];

const ChatWindow = () => {
  const [text, setText] = useState("");

  const {
    sendMessage,
    messages,
    products,
    filters,
    loading,
    error,
    closeChat,
  } = useContext(AIChatContext);

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    await sendMessage(text);

    setText("");
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === "NumpadEnter") && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestedQuestion = (question) => {
    sendMessage(question);
  };

  const showSuggestions =
    messages.length === 0 ||
    messages[messages.length - 1]?.role === "assistant";

  return (
    <div className="fixed bottom-6 right-3 sm:right-6 z-50 flex h-[85vh] w-[340px] sm:w-[400px] flex-col  rounded-3xl border border-slate-200 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.15)]">
      {/* HEADER */}

      <div className="flex items-center justify-between border-b rounded-xl not-first: border-slate-200 bg-white px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg">
            <RobotIcon />
          </div>
        </div>

        <button
          onClick={closeChat}
          className="rounded-full p-2 hover:cursor-pointer text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={18} />
        </button>
      </div>

      {/* CHAT BODY */}

      <div className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 py-6">
        {/* SUGGESTED QUESTIONS */}

        {showSuggestions && (
          <div className="mb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Suggested Questions
            </p>

            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSuggestedQuestion(question)}
                  disabled={loading}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition hover:border-indigo-400 hover:bg-indigo-50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MESSAGES */}

        <div className="space-y-5">
          {messages.map((message, index) => {
            const isUser = message.role === "user";

            return (
              <div
                key={index}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex max-w-[85%] gap-3 ${
                    isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* AVATAR */}

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      isUser
                        ? "bg-blue-700 text-white"
                        : "bg-indigo-600 text-white"
                    }`}
                  >
                    {isUser ? <User size={16} /> : <RobotIcon />}
                  </div>

                  {/* MESSAGE */}

                  <div
                    className={`rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? "bg-blue-300 text-white"
                        : "border border-slate-200 bg-white text-slate-800"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            );
          })}

          {/* LOADING */}

          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <Bot size={16} />
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0.2s]"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </div>

      {/* FOOTER */}

      <div className="border-t border-slate-200 rounded-xl bg-white p-4">
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <textarea
            rows={1}
            value={text}
            disabled={loading}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about products..."
            className="max-h-40 min-h-[52px] flex-1 resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          />

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 hover:cursor-pointer w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
