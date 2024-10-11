"use client";
import React, { useState, useEffect } from "react";

const Loading: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    // Introduce a delay of 500ms (or any duration you'd prefer)
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 500);

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  if (!showLoading) {
    return null; // Don't show anything until the timer has completed
  }

  return (
    <div className="h-screen w-screen text-5xl font-black flex justify-center items-center">
      Loading .....
    </div>
  );
};

export default Loading;
