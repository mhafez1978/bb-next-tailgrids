"use client";
import OpenAiChatBot from "@/components/ai/OpenAiChat";
import React, { useState, useEffect } from "react";

const ArabicKeyboard = () => {
  const [text, setText] = useState("");
  const [authors, setAuthors] = useState<{ _id: string; name: string }[]>([]);
  // Arabic keyboard layout
  const rows = [
    ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د"],
    ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط"],
    ["ئ", "ء", "ؤ", "ر", "ﻻ", "ى", "ة", "و", "ز", "ظ", "←"], // Backspace added
    [" "], // Spacebar
  ];

  const handleKeyClick = (key: string) => {
    if (key === "←") {
      // Handle Backspace
      setText((prevText) => prevText.slice(0, -1));
    } else {
      setText((prevText) => prevText + key);
    }
  };

  const handleClear = () => {
    setText("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Text copied to clipboard!");
    });
  };

  const handleSearch = () => {
    if (text.trim()) {
      const query = encodeURIComponent(text); // Encode text for use in a URL
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    } else {
      alert("Please type something before searching!");
    }
  };

  useEffect(() => {
    const fetchSanityAuhtors = async () => {
      try {
        const response = await fetch(
          "https://b5udlwlx.api.sanity.io/v2024-12-09/data/query/production?query=*%5B_type+%3D%3D+%22author%22%5D%7B+_id%2C+name+%7D%0A"
        );
        const data = await response.json();
        console.log(data);
        setAuthors(data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSanityAuhtors();
  }, []);

  return (
    <>
      <div className="w-screen  bg-gray-90 min-h-[100vh] flex flex-col gap-8 items-center justify-center pt-[100px] pb-[200px]">
        <div className="container mx-auto">
          <ul>
            {authors.map((author) => (
              <li key={author._id} className="text-black font-black">
                {author.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="container max-w-[800px] mx-auto flex flex-col justify-center items-center">
          <OpenAiChatBot />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-5">
            Welcome To Arabic Keyboard
          </h1>
          <textarea
            className="w-full max-w-2xl h-30 border-2 border-gray-300 rounded-md p-3 text-lg mb-5"
            rows={8}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type here..."
          ></textarea>

          <div className="flex flex-col items-center space-y-3">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center space-x-2">
                {row.map((key, keyIndex) => (
                  <button
                    key={keyIndex}
                    onClick={() => handleKeyClick(key)}
                    className={`h-20 ${
                      key === " " ? "w-[500px]" : "w-20"
                    } bg-gray-100 text-xl font-semibold border border-gray-300 rounded-lg hover:bg-gray-200 active:bg-gray-300`}
                  >
                    {key.trim() ? key : "Space"}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-5 flex space-x-4">
            <button
              onClick={handleClear}
              className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
            >
              Clear
            </button>
            <button
              onClick={handleCopy}
              className="bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-700"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={handleSearch}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
            >
              Search on Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArabicKeyboard;
