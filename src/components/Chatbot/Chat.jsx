import React, { useState } from "react";
import { faq } from "./faqData";
import { TbMessageChatbotFilled } from "react-icons/tb";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentChatIndex, setCurrentChatIndex] = useState(null);
  const [input, setInput] = useState("");

  const startNewChat = () => {
    const welcomeMessage = { sender: "bot", text: "Can I help you with anything?" };
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

    const updatedConvo = [...conversations[currentChatIndex], userMessage, botMessage];
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
      <div className="fixed bottom-5 right-5 z-50 group sm:bottom-6 sm:right-6">
        <button
          onClick={toggleChat}
          className="bg-green-700 text-white p-4 rounded-full shadow-lg shadow-white hover:bg-green-800 relative"
        >
          <TbMessageChatbotFilled size={30} className="sm:size-10" />
          <span className="absolute -left-32 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 text-xs px-2 py-1 rounded shadow-md shadow-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Chat with me
          </span>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[95%] sm:w-[350px] h-[80vh] sm:h-[450px] bg-white border rounded-lg shadow-lg z-50 flex flex-col">
          {/* Header */}
          <div className="relative bg-green-700 text-white p-3 rounded-t-lg font-semibold flex justify-between items-center">
            <span className="text-sm sm:text-base">Farmers Chatbot - Chat {currentChatIndex + 1}</span>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-300 text-xl leading-none"
            >
              &times;
            </button>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto p-2 space-x-2 bg-gray-100 text-xs">
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
          <div className="p-3 flex-1 overflow-y-auto space-y-2 text-sm">
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
          <div className="flex border-t p-2">
            <input
              type="text"
              placeholder="Ask your questions"
              className="flex-grow border rounded-l px-3 py-2 text-sm focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSend}
              className="bg-green-600 text-white px-4 rounded-r hover:bg-green-700 text-sm"
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
