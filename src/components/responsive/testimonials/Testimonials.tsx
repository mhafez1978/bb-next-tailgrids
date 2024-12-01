"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  review: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    review:
      "Amazing website design service! Our e-commerce store looks professional and drives sales.",
    avatar: "https://i.pravatar.cc/150?Image=1",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Jane Smith",
    review:
      "The online marketing campaigns have been a game-changer for our business!",
    avatar: "https://i.pravatar.cc/150?Image=2",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Michael Johnson",
    review:
      "They built an incredible e-commerce store for us. Our customers love it!",
    avatar: "https://i.pravatar.cc/150?Image=3",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Emily Davis",
    review: "PPC ad management is on point! Highly recommend their services.",
    avatar: "https://i.pravatar.cc/150?Image=4",
    rating: 4.6,
  },
  {
    id: 5,
    name: "James Brown",
    review:
      "Our website redesign exceeded expectations! Great team to work with.",
    avatar: "https://i.pravatar.cc/150?Image=5",
    rating: 4.9,
  },
  {
    id: 6,
    name: "Patricia Taylor",
    review:
      "Top-notch online marketing strategy! We saw results almost instantly.",
    avatar: "https://i.pravatar.cc/150?Image=6",
    rating: 4.5,
  },
  {
    id: 7,
    name: "Robert Martinez",
    review:
      "Their e-commerce solutions are brilliant. I love the design and functionality.",
    avatar: "https://i.pravatar.cc/150?Image=7",
    rating: 4.8,
  },
  {
    id: 8,
    name: "Linda Harris",
    review:
      "The PPC campaigns have been driving great traffic to our website. Worth every penny!",
    avatar: "https://i.pravatar.cc/150?Image=8",
    rating: 4.6,
  },
  {
    id: 9,
    name: "David Clark",
    review:
      "They transformed our e-commerce store. Great design and customer experience!",
    avatar: "https://i.pravatar.cc/150?Image=9",
    rating: 4.7,
  },
  {
    id: 10,
    name: "Susan Lewis",
    review:
      "Our online marketing campaigns are successful thanks to their expertise.",
    avatar: "https://i.pravatar.cc/150?Image=10",
    rating: 4.9,
  },
  {
    id: 11,
    name: "Susan Lewis",
    review:
      "Our online marketing campaigns are successful thanks to their expertise.",
    avatar: "https://i.pravatar.cc/150?Image=10",
    rating: 4.9,
  },
  {
    id: 12,
    name: "Susan Lewis",
    review:
      "Our online marketing campaigns are successful thanks to their expertise.",
    avatar: "https://i.pravatar.cc/150?Image=10",
    rating: 4.9,
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const testimonialLength = testimonials.length;

  const handlePrevClick = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    // Ensure we are in the client-side before accessing `window`
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (sliderRef.current) {
          sliderRef.current.style.transform = `translateX(-${
            (currentIndex * 100) / (window.innerWidth < 1024 ? 1 : 2)
          }%)`;
        }
      };

      // Call resize function on mount and window resize
      handleResize();
      window.addEventListener("resize", handleResize);

      // Transition end logic
      const slider = sliderRef.current;
      const transitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex === 0) {
          setCurrentIndex(testimonialLength); // Jump to last real slide without transition
        } else if (currentIndex === testimonialLength + 1) {
          setCurrentIndex(1); // Jump to first real slide without transition
        }
      };

      if (slider) {
        slider.addEventListener("transitionend", transitionEnd);
      }

      // Cleanup event listeners on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
        if (slider) {
          slider.removeEventListener("transitionend", transitionEnd);
        }
      };
    }
  }, [currentIndex, isTransitioning, testimonialLength]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill={i <= Math.floor(rating) ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-5 h-5 text-yellow-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.048 2.927c.3-.921 1.603-.921 1.902 0l2.134 6.564a1 1 0 00.95.69h6.899c.969 0 1.372 1.24.588 1.81l-5.583 4.046a1 1 0 00-.364 1.118l2.134 6.564c.3.922-.755 1.688-1.54 1.118l-5.583-4.046a1 1 0 00-1.176 0l-5.583 4.046c-.785.57-1.84-.196-1.54-1.118l2.134-6.564a1 1 0 00-.364-1.118L.51 12.99c-.784-.57-.38-1.81.588-1.81h6.898a1 1 0 00.951-.69l2.134-6.564z"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <section
      className="relative w-screen min-h-[50vh] bg-slate-800 text-slate-100 py-24"
      style={{ zIndex: "-30" }}
    >
      <h3 className="text-lg capitalize mb-4 text-center">
        What our clients are saying
      </h3>
      <h5 className="text-3xl capitalize mb-4 text-center max-w-1/3 mx-auto">
        It takes hard work and dedication to earn our customers&apos; trust
      </h5>
      <hr className="w-12 mx-auto bg-white mb-6" />
      <div className="container h-full mx-auto flex flex-col justify-center items-center">
        <div className="relative w-full lg:w-2/3 mx-auto flex justify-center items-center overflow-hidden pb-20">
          <div
            ref={sliderRef}
            className={`w-full mx-auto flex transition-transform duration-500 ease-in-out ${
              isTransitioning ? "" : "no-transition"
            }`}
            style={{
              transform: `translateX(-${
                (currentIndex * 100) /
                (typeof window !== "undefined" && window.innerWidth < 1024
                  ? 1
                  : 2)
              }%)`,
            }}
          >
            {/* Real testimonials */}
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-none w-full lg:w-1/2 px-4"
              >
                <div className="p-6 bg-slate-100 rounded-lg shadow-lg text-black flex flex-col justify-center items-center">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-full mb-4"
                  />
                  <h4 className="font-semibold text-lg mb-2">
                    {testimonial.name}
                  </h4>
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-700">{testimonial.review}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
        </div>
        <div className="w-[88vw] mx-auto absolute flex justify-between items-center px-4 lg:-mt-28">
          <button
            onClick={handlePrevClick}
            className="bg-slate-100 text-slate-800 p-2 rounded-full shadow-lg hover:bg-slate-200"
          >
            <FaArrowLeft size={38} />
          </button>
          <button
            onClick={handleNextClick}
            className="bg-slate-100 text-slate-800 p-2 rounded-full shadow-lg hover:bg-slate-200"
          >
            <FaArrowRight size={38} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
