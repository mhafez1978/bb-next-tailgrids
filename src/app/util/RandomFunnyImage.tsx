"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// Giphy API Key and endpoint
const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
const GIPHY_RANDOM_URL = `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=apes&rating=pg`;

const RandomFunnyImage: React.FC = () => {
  const [gifUrl, setGifUrl] = useState<string>("");

  // Fetch a new random funny GIF every time the component mounts
  useEffect(() => {
    const fetchRandomGif = async () => {
      try {
        const response = await fetch(GIPHY_RANDOM_URL);
        const data = await response.json();
        const gifData = data.data;
        setGifUrl(gifData.images.original.url); // Set the URL for the funny gif
      } catch (error) {
        console.error("Error fetching Giphy API", error);
      }
    };

    fetchRandomGif(); // Call the function to set the initial gif
  }, []);

  return (
    <>
      {gifUrl ? (
        <Image
          src={gifUrl}
          alt="Random funny GIF"
          className="mx-auto max-w-full"
          width={600}
          height={900}
          unoptimized={true}
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default RandomFunnyImage;
