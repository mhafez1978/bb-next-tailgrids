"use client";

import React, { useState, useEffect } from "react";

const Page = () => {
  const [bgColor, setBgColor] = useState("bg-red-500"); // Initial color

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setBgColor("bg-white"); // Set background to white when scrolling
      } else {
        setBgColor("bg-red-500"); // Revert to red when at the top
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup scroll listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs once

  return (
    <>
      <header
        className={`fixed w-screen min-h-[64px] transition-colors duration-300 ${bgColor}`}
      />
      <div className="min-h-screen">
        <p>Scroll down to see the header background change.</p>
      </div>
    </>
  );
};

export default Page;
