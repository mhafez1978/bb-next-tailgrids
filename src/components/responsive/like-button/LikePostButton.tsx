"use client";
import React, { useState, useEffect } from "react";

const LikePostButton = ({ postId }: { postId: number }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        // console.log("Fetching like status for post:", postId); // Debugging

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_POSTLIKES}/get-likes/${postId}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch like status: ${response.statusText}`
          );
        }

        const data = await response.json();

        console.log("API Response:", data); // Debugging

        if (Object.keys(data).length === 0) {
          setIsLiked(false);
          setLikesCount(0);
        } else if (Object.keys(data).length > 0 && isLiked === false) {
          setLikesCount(data.likes_count);
        } else {
          setLikesCount(data.likes_count); // Set the likes count from API response
          setIsLiked(true);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching like status:", error.message);
        } else {
          console.error("Error fetching like status:", error);
        }
        setLikesCount(0); // Fallback to 0 on error
        setIsLiked(false);
      }
    };

    fetchLikeStatus();
  }, [postId]);

  // Function to add a like
  const addLike = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_POSTLIKES}/add-like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ post_id: postId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add like");
      }

      setIsLiked(true); // Mark as liked
      setLikesCount((prevCount) => prevCount + 1); // Increment the like count
    } catch (error) {
      console.error("Error adding like:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to remove a like
  const removeLike = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_POSTLIKES}/remove-like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ post_id: postId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove like");
      }

      setIsLiked(false); // Mark as unliked
      setLikesCount((prevCount) => prevCount - 1); // Decrement the like count
    } catch (error) {
      console.error("Error removing like:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle the button click
  const handleLikeToggle = async () => {
    if (isLiked) {
      await removeLike(); // Call remove like function
    } else {
      await addLike(); // Call add like function
    }
  };

  return (
    <div className="flex flex-row gap-6 items-center justify-center">
      <div>
        <h4>Like this post ?</h4>
      </div>
      <div className="relative inline-block pb-2">
        {/* Like Count Badge */}
        <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center z-30">
          {likesCount}
        </span>

        {/* Heart Button */}
        <button
          onClick={handleLikeToggle}
          className="w-[56px] h-[56px] flex items-center justify-center rounded-full p-2 border border-gray-300 bg-white relative z-20"
          aria-label="Like Post"
          disabled={loading} // Disable the button while the API call is in progress
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isLiked ? "red" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={`w-10 h-10 ${
              isLiked ? "text-red-500" : "text-gray-500"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LikePostButton;
