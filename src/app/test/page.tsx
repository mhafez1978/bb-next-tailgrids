// // "use client";
// // import React, { useState } from "react";

// // const ArabicKeyboard = () => {
// //   const [text, setText] = useState("");

// //   // Arabic keyboard keys
// //   const keys = [
// //     "ا",
// //     "ب",
// //     "ت",
// //     "ث",
// //     "ج",
// //     "ح",
// //     "خ",
// //     "د",
// //     "ذ",
// //     "ر",
// //     "ز",
// //     "س",
// //     "ش",
// //     "ص",
// //     "ض",
// //     "ط",
// //     "ظ",
// //     "ع",
// //     "غ",
// //     "ف",
// //     "ق",
// //     "ك",
// //     "ل",
// //     "م",
// //     "ن",
// //     "ه",
// //     "و",
// //     "ي",
// //     "ء",
// //     "أ",
// //     "إ",
// //     "ؤ",
// //     "ئ",
// //     "ى",
// //     "ة",
// //   ];

// //   // Function to handle key click
// //   const handleKeyClick = (key) => {
// //     setText((prevText) => prevText + key);
// //   };

// //   // Function to clear text area
// //   const handleClear = () => {
// //     setText("");
// //   };

// //   return (
// //     <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
// //       <h1>Arabic Keyboard</h1>
// //       <textarea
// //         rows="5"
// //         cols="50"
// //         value={text}
// //         onChange={(e) => setText(e.target.value)}
// //         style={{ marginBottom: "20px", fontSize: "18px" }}
// //       ></textarea>
// //       <div
// //         style={{
// //           display: "grid",
// //           gridTemplateColumns: "repeat(10, 1fr)",
// //           gap: "10px",
// //           maxWidth: "500px",
// //           margin: "0 auto",
// //         }}
// //       >
// //         {keys.map((key, index) => (
// //           <button
// //             key={index}
// //             onClick={() => handleKeyClick(key)}
// //             style={{
// //               padding: "10px",
// //               fontSize: "18px",
// //               cursor: "pointer",
// //               borderRadius: "5px",
// //               backgroundColor: "#f0f0f0",
// //               border: "1px solid #ccc",
// //             }}
// //           >
// //             {key}
// //           </button>
// //         ))}
// //       </div>
// //       <div style={{ marginTop: "20px" }}>
// //         <button
// //           onClick={handleClear}
// //           style={{
// //             padding: "10px 20px",
// //             fontSize: "16px",
// //             cursor: "pointer",
// //             backgroundColor: "#ff4d4d",
// //             color: "#fff",
// //             border: "none",
// //             borderRadius: "5px",
// //           }}
// //         >
// //           Clear
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ArabicKeyboard;

// "use client";

// import React, { useState } from "react";

// const ArabicKeyboard = () => {
//   const [text, setText] = useState("");

//   // Arabic keyboard layout
//   const rows = [
//     ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د"],
//     ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط"],
//     ["ئ", "ء", "ؤ", "ر", "ﻻ", "ى", "ة", "و", "ز", "ظ"],
//     [" "], // Spacebar
//   ];

//   const handleKeyClick = (key) => {
//     setText((prevText) => prevText + key);
//   };

//   const handleClear = () => {
//     setText("");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-5">
//       <h1 className="text-2xl font-bold mb-5">Arabic Keyboard</h1>
//       <textarea
//         className="w-full max-w-2xl h-20 border-2 border-gray-300 rounded-md p-3 text-lg mb-5"
//         rows={5}
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Type here..."
//       ></textarea>

//       <div className="flex flex-col items-center space-y-3">
//         {rows.map((row, rowIndex) => (
//           <div key={rowIndex} className="flex justify-center space-x-2">
//             {row.map((key, keyIndex) => (
//               <button
//                 key={keyIndex}
//                 onClick={() => handleKeyClick(key)}
//                 className={`h-20 w-20 bg-gray-100 text-xl font-semibold border border-gray-300 rounded-lg hover:bg-gray-200 active:bg-gray-300 ${
//                   key === " " ? "w-[300px]" : ""
//                 }`}
//               >
//                 {key.trim() ? key : "Space"}
//               </button>
//             ))}
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={handleClear}
//         className="mt-5 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
//       >
//         Clear
//       </button>
//     </div>
//   );
// };

// export default ArabicKeyboard;

// "use client";

// import React, { useState } from "react";

// const ArabicKeyboard = () => {
//   const [text, setText] = useState("");

//   // Arabic keyboard layout
//   const rows = [
//     ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د"],
//     ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط"],
//     ["ئ", "ء", "ؤ", "ر", "ﻻ", "ى", "ة", "و", "ز", "ظ", "←"], // Backspace added
//     [" "], // Spacebar
//   ];

//   const handleKeyClick = (key) => {
//     if (key === "←") {
//       // Handle Backspace
//       setText((prevText) => prevText.slice(0, -1));
//     } else {
//       setText((prevText) => prevText + key);
//     }
//   };

//   const handleClear = () => {
//     setText("");
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(text).then(() => {
//       alert("Text copied to clipboard!");
//     });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center py-[120px]">
//       <h1 className="text-2xl font-bold mb-5">Welcome To Arabic Keyboard</h1>
//       <textarea
//         className="w-full max-w-2xl h-30 border-2 border-gray-300 rounded-md p-3 text-lg mb-5"
//         rows={5}
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Type here..."
//       ></textarea>

//       <div className="flex flex-col items-center space-y-3">
//         {rows.map((row, rowIndex) => (
//           <div key={rowIndex} className="flex justify-center space-x-2">
//             {row.map((key, keyIndex) => (
//               <button
//                 key={keyIndex}
//                 onClick={() => handleKeyClick(key)}
//                 className={`h-20 ${
//                   key === " " ? "w-[500px]" : "w-20"
//                 } bg-gray-100 text-xl font-semibold border border-gray-300 rounded-lg hover:bg-gray-200 active:bg-gray-300`}
//               >
//                 {key.trim() ? key : "Space"}
//               </button>
//             ))}
//           </div>
//         ))}
//       </div>

//       <div className="mt-5 flex space-x-4">
//         <button
//           onClick={handleClear}
//           className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
//         >
//           Clear
//         </button>
//         <button
//           onClick={handleCopy}
//           className="bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-700"
//         >
//           Copy to Clipboard
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ArabicKeyboard;

"use client";
import React, { useState } from "react";

const ArabicKeyboard = () => {
  const [text, setText] = useState("");

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

  return (
    <div className="flex flex-col items-center justify-center py-[150px]">
      <h1 className="text-2xl font-bold mb-5">Welcome To Arabic Keyboard</h1>
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
  );
};

export default ArabicKeyboard;
