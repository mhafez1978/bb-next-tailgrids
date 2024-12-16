"use client";
import { useState } from "react";
import Chatbot from "@/components/ai/OpenAiChat"; // Import your chatbot component
import { IoChatbubblesOutline } from "react-icons/io5";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Floating Chat Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-[45px] w-[45px] text-2xl font-black fixed bottom-4 right-4 bg-purple-500 text-white text-center flex justify-center items-center rounded-full shadow-lg z-40 hover:bg-green-600"
          aria-label="Chat with us"
        >
          <IoChatbubblesOutline size={40} color="white" />
        </button>
        {/* Tooltip */}
        <div className="absolute bottom-[60px] right-0 transform translate-x-1/2 bg-gray-700 text-white text-sm font-semibold py-1 px-3 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          We&apos;re Online
        </div>
      </div>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="w-[400px] fixed bottom-[220px] right-[54px] h-[500px] bg-gray-900 text-white rounded-lg shadow-lg z-40">
          <div className="w-full top-2 right-2 flex flex-row justify-end p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="h-[45px] w-[45px] text-2xl bg-red-500 text-white rounded-full hover:bg-red-600"
              aria-label="Close chat"
            >
              x
            </button>
          </div>
          <Chatbot />
        </div>
      )}
    </div>
  );
}
