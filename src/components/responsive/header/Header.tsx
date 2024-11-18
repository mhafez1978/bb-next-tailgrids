"use client";
import React, { useState, useEffect } from "react";
import MobileMenu from "../mobile-menu/MobileMenu";
import DesktopMenu from "../desktop-menu/DesktopMenu";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  logo?: string;
  darkLogo?: string;
}

const Header: React.FC<HeaderProps> = ({ logo, darkLogo }) => {
  const [bgColor, setBgColor] = useState("bg-transparent");
  const [txtColor, setTxtColor] = useState("text-slate-800");
  const [iconColor, setIconColor] = useState("black");
  const [linkColor, setLinkColor] = useState("text-slate-800");
  const [theLogo, setTheLogo] = useState(logo);

  const listenScrollEvent = () => {
    if (window.scrollY > 3) {
      setBgColor("bg-slate-800");
      setLinkColor("text-slate-100");
      setTxtColor("text-slate-100");
      setIconColor("white");
      setTheLogo(darkLogo);
    } else {
      setBgColor("bg-transparent");
      setLinkColor("text-slate-800");
      setTxtColor("text-slate-800");
      setIconColor("black");
      setTheLogo(logo);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, [listenScrollEvent]);

  return (
    <section>
      <div
        className={`fixed top-0 w-screen h-[64px] ${bgColor} px-4 z-40 lg:px-0`}
      >
        <div className="container h-full mx-auto flex flex-row justify-between items-center">
          <Link href="/">
            {logo ? (
              <Image
                width={200}
                height={64}
                {...(theLogo ? { src: theLogo } : { src: logo })}
                alt="logo"
                className="w-[300px] h-[64px]"
              />
            ) : (
              <h1
                className={`w-2/3 text-xl font-black uppercase lg:w-1/3 ${txtColor}`}
              >
                Blooming Brands
              </h1>
            )}
          </Link>
          <div
            className={`desktopMenu hidden ${txtColor} uppercase lg:flex lg:flex-row lg:w-2/3 lg:justify-end lg:text-xl`}
          >
            <DesktopMenu linkColor={linkColor} />
          </div>

          <div className="relative flex flex-row w-1/3 justify-end lg:hidden">
            {/* <SlMenu color={iconColor} size={36} /> */}
            <MobileMenu iconColor={iconColor} size={36} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
