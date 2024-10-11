"use client";
// import { motion } from "framer-motion";
import React from "react";
import Modal from "../modal/Modal";

export default function Offer() {
  return (
    <section className="relative w-screen h-[50vh] z-10 overflow-hidden bg-[url('/assets/boston_cover.jpg')] bg-center bg-cover bg-fixed bg-no-repeat">
      <div className="absolute w-full h-full bg-gray-800/70 z-20"></div>
      <div className="absolute w-screen h-full flex flex-col justify-center items-center z-30">
        <h2 className="text-4xl font-black mb-4 text-white">
          Have a Project In Mind ?
        </h2>
        <p className="mb-8 text-lg font-semibold text-white">
          We love to hear your pitch and transform your ideas to functional
          website
        </p>
        <div className="w-1/4 flex items-center justify-center">
          <Modal />
        </div>
      </div>

      <div className="absolute left-20 top-0 -z-10">
        <svg
          width="605"
          height="237"
          viewBox="0 0 605 237"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2" filter="url(#filter0_f_2651_11432)">
            <path
              d="M341.26 -146.484L393.515 -99.0466L172.361 136.563L84.3048 136.563L341.26 -146.484Z"
              fill="#8646F4"
            />
            <path
              d="M452.745 -208.391L505 -160.953L283.846 74.6569L195.79 74.6569L452.745 -208.391Z"
              fill="#18BFFF"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_2651_11432"
              x="-15.6953"
              y="-308.391"
              width="620.695"
              height="544.954"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="50"
                result="effect1_foregroundBlur_2651_11432"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-0 right-6 -z-10">
        <svg
          width="531"
          height="197"
          viewBox="0 0 531 197"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.2" filter="url(#filter0_f_2651_11493)">
            <path
              d="M264.045 383.485L211.79 336.048L432.944 100.438L521 100.438L264.045 383.485Z"
              fill="#8646F4"
            />
            <path
              d="M152.56 445.392L100.305 397.954L321.459 162.344L409.515 162.344L152.56 445.392Z"
              fill="#18BFFF"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_2651_11493"
              x="0.304688"
              y="0.437744"
              width="620.695"
              height="544.954"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="50"
                result="effect1_foregroundBlur_2651_11493"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </section>
  );
}
