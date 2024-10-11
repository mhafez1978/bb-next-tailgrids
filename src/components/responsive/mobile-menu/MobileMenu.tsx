"use client";
import React, { useState } from "react";
import { AppPages } from "@/components/AppPages";
import { FiMenu } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import Link from "next/link";
import { motion } from "framer-motion";

interface MobileMenuProps {
  iconColor?: string;
  size?: number;
  //   onClick?: () => {};
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  iconColor,
  size,
  //   onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (e: React.SyntheticEvent) => {
    // Close the menu when a link is clicked
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <div className="w-full flex justify-end">
      <FiMenu color={iconColor} size={size} onClick={handleClick} />
      <div
        className={`fixed top-0 right-0 w-[100vw] min-h-screen z-50 bg-black text-white transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="w-full flex flex-row justify-end pr-[54px] pt-[18px]">
          <motion.div
            initial={{ rotate: 30 }}
            animate={{ rotate: isOpen ? 0 : 30 }} // Rotate when open
            transition={{ duration: 1.5 }} // Duration of the rotation
            className="w-1/8 flex flex-row justify-end"
          >
            <GrClose size={40} onClick={handleClick} />
          </motion.div>
        </div>

        {/* Menu Links */}
        <ul className="w-full h-[800px] text-2xl flex flex-col gap-4 justify-center items-center">
          {AppPages.map((page, index) => (
            <motion.div
              key={index}
              initial={{ y: -50, opacity: 0 }} // Start above and transparent
              animate={{ y: 0, opacity: isOpen ? 1 : 0 }} // Animate down and fade in
              transition={{ duration: 0.5, delay: index * 0.3 }} // Staggered delay
            >
              <Link
                href={page.href}
                className=""
                onClick={handleLinkClick} // Close menu when link is clicked
              >
                {page.pageTitle}
              </Link>
            </motion.div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
