import React from "react";
import MobileMenu from "../mobile-menu/MobileMenu";
import DesktopMenu from "../desktop-menu/DesktopMenu";
import Image from "next/image";

interface HeaderProps {
  darkLogo?: string;
}

const Header: React.FC<HeaderProps> = ({ darkLogo }: HeaderProps) => {
  return (
    <section>
      <div
        className={`fixed top-0 w-screen h-[64px] bg-slate-800 px-4 z-40 lg:px-0`}
      >
        <div className="container h-full mx-auto flex flex-row justify-between items-center">
          {darkLogo ? (
            <Image
              width={200}
              height={64}
              src={darkLogo}
              alt="logo"
              className="w-[300px] h-[64px]"
            />
          ) : (
            <h1
              className={`w-2/3 text-xl font-black uppercase text-white lg:w-1/3`}
            >
              Blooming Brands
            </h1>
          )}

          <div
            className={`desktopMenu hidden text-white uppercase lg:flex lg:flex-row lg:w-2/3 lg:justify-end lg:text-xl`}
          >
            <DesktopMenu linkColor="white" />
          </div>

          <div className="relative flex flex-row w-1/3 justify-end lg:hidden">
            <MobileMenu iconColor="white" size={36} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
