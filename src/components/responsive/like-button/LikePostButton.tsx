"use client";
import React, { useState, useEffect } from "react";

const LikePostButton = ({ postId }: { postId: number }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [titleText, setTitleText] = useState("Do you like this post ?");

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_POSTLIKES}/get-likes/${postId}`,
          { next: { revalidate: 60 }, cache: "no-cache" }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch like status: ${response.statusText}`
          );
        }

        const data = await response.json();
        setLikesCount(data.likes_count || 0);
        setIsLiked(!!data.is_liked);
      } catch (error) {
        console.error("Error fetching like status:", error);
        setLikesCount(0);
        setIsLiked(false);
      }
    };

    fetchLikeStatus();
  }, [postId]); // Ensure this triggers a fresh fetch on postId change

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
      setTitleText("You liked this Post");
    }
  };

  return (
    <div className="w-2/3 flex flex-row gap-2 items-center justify-start">
      <div className="w-1/3 text-right">
        <h6 className="w-full font-black">{titleText}</h6>
      </div>
      <div className="w-1/3 relative inline-block pb-2 overflow-visible">
        {/* Like Count Badge */}
        <div className="w-full absolute  -right-10">
          <div className="relative">
            <span className="absolute -bottom-4 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center z-30">
              {likesCount}
            </span>
            <span className="absolute -top-1 left-6 text-black text-xs font-bold z-30">
              {likesCount > 0 ? "Liked this post" : "No one Liked this post"}
            </span>
          </div>
        </div>

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
