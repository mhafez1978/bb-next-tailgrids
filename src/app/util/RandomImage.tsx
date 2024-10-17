"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// Image component that fetches a new random image on page load
const RandomImage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("");

  // Fetch a new random image every time the component mounts
  useEffect(() => {
    const fetchRandomImage = () => {
      // Example with Lorem Picsum
      const randomId = Math.floor(Math.random() * 1000); // generate random image id
      const url = `https://picsum.photos/500/300?random=${randomId}` as string;
      setImageUrl(url);
    };

    fetchRandomImage(); // call the function to set initial image on mount
  }, []);

  return (
    <Image
      src={imageUrl}
      alt="Error Not Found Page Image ..."
      style={{ maxWidth: "100%", height: "auto" }}
      className="mx-auto max-w-full"
      width={600}
      height={900}
    />
  );
};

export default RandomImage;
