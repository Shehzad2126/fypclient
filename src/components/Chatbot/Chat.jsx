import React, { useState } from "react";
import { faq } from "./faqdata";
import { TbMessageChatbotFilled } from "react-icons/tb";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentChatIndex, setCurrentChatIndex] = useState(null);
  const [input, setInput] = useState("");

  const startNewChat = () => {
    const welcomeMessage = {
      sender: "bot",
      text: "Can I help you with anything?",
    };
    setConversations([...conversations, [welcomeMessage]]);
    setCurrentChatIndex(conversations.length);
  };

  const toggleChat = () => {
    if (!isOpen) startNewChat();
    setIsOpen(!isOpen);
  };

  const getAnswer = (question) => {
    const match = faq.find(
      (f) => f.question.toLowerCase() === question.toLowerCase()
    );
    return match ? match.answer : "Sorry, I have no information about this.";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    const botMessage = { sender: "bot", text: getAnswer(input) };

    const updatedConvo = [
      ...conversations[currentChatIndex],
      userMessage,
      botMessage,
    ];
    const allConvos = [...conversations];
    allConvos[currentChatIndex] = updatedConvo;
    setConversations(allConvos);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Chat Icon */}
      <div className="fixed z-50 bottom-5 right-5 group sm:bottom-6 sm:right-6">
        <button
          onClick={toggleChat}
          className="relative p-4 text-white bg-green-700 rounded-full shadow-lg shadow-white hover:bg-green-800"
        >
          <TbMessageChatbotFilled size={30} className="sm:size-10" />
          <span className="absolute px-2 py-1 text-xs text-gray-700 transition-opacity duration-300 transform -translate-y-1/2 bg-white rounded shadow-md opacity-0 -left-32 top-1/2 shadow-white group-hover:opacity-100">
            Chat with me
          </span>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[95%] sm:w-[350px] h-[80vh] sm:h-[450px] bg-white border rounded-lg shadow-lg z-50 flex flex-col">
          {/* Header */}
          <div className="relative flex items-center justify-between p-3 font-semibold text-white bg-green-700 rounded-t-lg">
            <span className="text-sm sm:text-base">
              Farmers Chatbot - Chat {currentChatIndex + 1}
            </span>
            <button
              onClick={toggleChat}
              className="text-xl leading-none text-white hover:text-gray-300"
            >
              &times;
            </button>
          </div>

          {/* Tabs */}
          <div className="flex p-2 space-x-2 overflow-x-auto text-xs bg-gray-100">
            {conversations.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentChatIndex(idx)}
                className={`px-2 py-1 rounded whitespace-nowrap ${
                  idx === currentChatIndex
                    ? "bg-green-600 text-white"
                    : "bg-white border"
                }`}
              >
                Chat {idx + 1}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-2 overflow-y-auto text-sm">
            {conversations[currentChatIndex]?.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md max-w-[75%] break-words ${
                  msg.sender === "user"
                    ? "bg-gray-200 self-end ml-auto"
                    : "bg-green-100 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex p-2 border-t">
            <input
              type="text"
              placeholder="Ask your questions"
              className="flex-grow px-3 py-2 text-sm border rounded-l focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSend}
              className="px-4 text-sm text-white bg-green-600 rounded-r hover:bg-green-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
