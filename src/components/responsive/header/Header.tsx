// // // // "use client";
// // // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // // import MobileMenu from "../mobile-menu/MobileMenu";
// // // // import DesktopMenu from "../desktop-menu/DesktopMenu";
// // // // import Link from "next/link";
// // // // import Image from "next/image";

// // // // interface HeaderProps {
// // // //   logo?: string;
// // // //   darkLogo?: string;
// // // // }

// // // // const Header: React.FC<HeaderProps> = ({ logo, darkLogo }) => {
// // // //   const [bgColor, setBgColor] = useState("bg-transparent");
// // // //   const [txtColor, setTxtColor] = useState("text-slate-800");
// // // //   const [iconColor, setIconColor] = useState("black");
// // // //   const [linkColor, setLinkColor] = useState("text-slate-800");
// // // //   const [theLogo, setTheLogo] = useState(logo);

// // // //   // const [isShrunk, setIsShrunk] = useState(false);
// // // //   // const [isHidden, setIsHidden] = useState(false);

// // // //   const lastScrollY = useRef(0); // Use useRef to persist the value across renders

// // // //   const listenScrollEvent = useCallback(() => {
// // // //     const currentScrollY = window.scrollY;

// // // //     if (currentScrollY > lastScrollY.current) {
// // // //       if (currentScrollY > 0) {
// // // //         // setIsShrunk(true);
// // // //         setBgColor("bg-slate-800");
// // // //       }
// // // //     } else {
// // // //       setBgColor("bg-transparent");
// // // //     }

// // // //     lastScrollY.current = currentScrollY; // Update the ref value
// // // //   }, []); // Empty dependency array to memoize the function

// // // //   useEffect(() => {
// // // //     window.addEventListener("scroll", listenScrollEvent);

// // // //     // Cleanup the event listener when the component unmounts
// // // //     return () => {
// // // //       window.removeEventListener("scroll", listenScrollEvent);
// // // //     };
// // // //   }, [listenScrollEvent]);

// // // //   return (
// // // //     <section>
// // // //       <div
// // // //         className={`fixed top-0 w-screen h-[64px] ${bgColor} px-4 z-40 lg:px-0`}
// // // //       >
// // // //         <div className="container h-full mx-auto flex flex-row justify-between items-center">
// // // //           <Link href="/">
// // // //             {logo ? (
// // // //               <Image
// // // //                 width={200}
// // // //                 height={64}
// // // //                 src={theLogo || darkLogo || ""}
// // // //                 alt="logo"
// // // //                 className="w-[300px] h-[64px]"
// // // //               />
// // // //             ) : (
// // // //               <h1
// // // //                 className={`w-2/3 text-xl font-black uppercase lg:w-1/3 ${txtColor}`}
// // // //               >
// // // //                 Blooming Brands
// // // //               </h1>
// // // //             )}
// // // //           </Link>
// // // //           <div
// // // //             className={`desktopMenu hidden ${txtColor} uppercase lg:flex lg:flex-row lg:w-2/3 lg:justify-end lg:text-xl`}
// // // //           >
// // // //             <DesktopMenu linkColor={linkColor} />
// // // //           </div>

// // // //           <div className="relative flex flex-row w-1/3 justify-end lg:hidden">
// // // //             {/* <SlMenu color={iconColor} size={36} /> */}
// // // //             <MobileMenu iconColor={iconColor} size={36} />
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // };

// // // // export default Header;

// // // "use client";
// // // import React, { useState, useEffect, useRef, useCallback } from "react";
// // // import MobileMenu from "../mobile-menu/MobileMenu";
// // // import DesktopMenu from "../desktop-menu/DesktopMenu";
// // // import Link from "next/link";
// // // import Image from "next/image";

// // // interface HeaderProps {
// // //   logo?: string;
// // //   darkLogo?: string;
// // // }

// // // const Header: React.FC<HeaderProps> = ({ logo, darkLogo }) => {
// // //   const [bgColor, setBgColor] = useState("bg-transparent");
// // //   const [txtColor, setTxtColor] = useState("text-slate-800");
// // //   const [iconColor, setIconColor] = useState("black");
// // //   const [linkColor, setLinkColor] = useState("text-slate-800");

// // //   const lastScrollY = useRef(0);

// // //   const listenScrollEvent = useCallback(() => {
// // //     const currentScrollY = window.scrollY;

// // //     if (currentScrollY > 0) {
// // //       setBgColor("bg-slate-800");
// // //     } else {
// // //       setBgColor("bg-transparent");
// // //     }

// // //     lastScrollY.current = currentScrollY;
// // //   }, []);

// // //   useEffect(() => {
// // //     window.addEventListener("scroll", listenScrollEvent);

// // //     return () => {
// // //       window.removeEventListener("scroll", listenScrollEvent);
// // //     };
// // //   }, [listenScrollEvent]);

// // //   return (
// // //     <section>
// // //       <div
// // //         className={`fixed top-0 w-screen h-[64px] ${bgColor} px-4 z-40 lg:px-0`}
// // //       >
// // //         <div className="container h-full mx-auto flex flex-row justify-between items-center">
// // //           <Link href="/">
// // //             {logo || darkLogo ? (
// // //               <Image
// // //                 width={200}
// // //                 height={64}
// // //                 src={logo || darkLogo || "/default-logo.png"}
// // //                 alt="Blooming Brands Logo"
// // //                 className="w-[300px] h-[64px]"
// // //               />
// // //             ) : (
// // //               <h1
// // //                 className={`w-2/3 text-xl font-black uppercase lg:w-1/3 ${txtColor}`}
// // //               >
// // //                 Blooming Brands
// // //               </h1>
// // //             )}
// // //           </Link>
// // //           <div
// // //             className={`desktopMenu hidden ${txtColor} uppercase lg:flex lg:flex-row lg:w-2/3 lg:justify-end lg:text-xl`}
// // //           >
// // //             <DesktopMenu linkColor={linkColor} />
// // //           </div>
// // //           <div className="relative flex flex-row w-1/3 justify-end lg:hidden">
// // //             <MobileMenu iconColor={iconColor} size={36} />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default Header;

// // "use client";
// // import React, { useState, useEffect, useRef } from "react";
// // import MobileMenu from "../mobile-menu/MobileMenu";
// // import DesktopMenu from "../desktop-menu/DesktopMenu";
// // import Link from "next/link";
// // import Image from "next/image";

// // interface HeaderProps {
// //   logo?: string;
// //   darkLogo?: string;
// // }

// // const Header: React.FC<HeaderProps> = ({
// //   logo = "/default-logo.png",
// //   darkLogo = "/default-dark-logo.png",
// // }) => {
// //   const [bgColor, setBgColor] = useState("bg-transparent");
// //   const [txtColor, setTxtColor] = useState("text-slate-800");
// //   const [iconColor, setIconColor] = useState("black");
// //   const [currentLogo, setCurrentLogo] = useState(logo);

// //   const lastScrollY = useRef(0);

// //   const listenScrollEvent = () => {
// //     const currentScrollY = window.scrollY;

// //     if (currentScrollY > 0) {
// //       setBgColor("bg-slate-800");
// //       setTxtColor("text-white");
// //       setIconColor("white");
// //       setCurrentLogo(darkLogo); // Switch to dark logo
// //     } else {
// //       setBgColor("bg-transparent");
// //       setTxtColor("text-slate-800");
// //       setIconColor("black");
// //       setCurrentLogo(logo); // Switch back to default logo
// //     }

// //     lastScrollY.current = currentScrollY;
// //   };

// //   useEffect(() => {
// //     const debouncedScroll = () => {
// //       clearTimeout(lastScrollY.current as any);
// //       lastScrollY.current = setTimeout(listenScrollEvent, 100); // Debounce scroll listener
// //     };

// //     window.addEventListener("scroll", debouncedScroll);

// //     return () => {
// //       window.removeEventListener("scroll", debouncedScroll);
// //     };
// //   }, [logo, darkLogo]);

// //   return (
// //     <section>
// //       <div
// //         className={`fixed top-0 w-screen h-[64px] ${bgColor} px-4 z-40 lg:px-0 transition-colors duration-300`}
// //       >
// //         <div className="container h-full mx-auto flex flex-row justify-between items-center">
// //           <Link href="/">
// //             <Image
// //               width={200}
// //               height={64}
// //               src={currentLogo}
// //               alt="Blooming Brands Logo"
// //               className="w-[300px] h-[64px]"
// //             />
// //           </Link>
// //           <div
// //             className={`desktopMenu hidden ${txtColor} uppercase lg:flex lg:flex-row lg:w-2/3 lg:justify-end lg:text-xl`}
// //           >
// //             <DesktopMenu linkColor={txtColor} />
// //           </div>
// //           <div className="relative flex flex-row w-1/3 justify-end lg:hidden">
// //             <MobileMenu iconColor={iconColor} size={36} />
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Header;

// "use client";
// import React, { useState, useEffect } from "react";
// import MobileMenu from "../mobile-menu/MobileMenu";
// import DesktopMenu from "../desktop-menu/DesktopMenu";
// import Link from "next/link";
// import Image from "next/image";

// interface HeaderProps {
//   logo?: string;
//   darkLogo?: string;
// }

// const Header: React.FC<HeaderProps> = ({
//   logo = "/default-logo.png",
//   darkLogo = "/default-dark-logo.png",
// }) => {
//   const [bgColor, setBgColor] = useState("bg-transparent");
//   const [txtColor, setTxtColor] = useState("text-slate-800");
//   const [iconColor, setIconColor] = useState("black");
//   const [currentLogo, setCurrentLogo] = useState(logo);

//   useEffect(() => {
//     const handleScroll = () => {
//       console.log("Scroll position:", window.scrollY);
//       console.log("Background Color:", bgColor);
//       console.log("Current Logo:", currentLogo);
//       if (window.scrollY > 0) {
//         setBgColor("bg-slate-800");
//         setTxtColor("text-white");
//         setIconColor("white");
//         setCurrentLogo(darkLogo || "/default-dark-logo.png");
//       } else {
//         setBgColor("bg-transparent");
//         setTxtColor("text-slate-800");
//         setIconColor("black");
//         setCurrentLogo(logo || "/default-logo.png");
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [logo, darkLogo, bgColor, currentLogo]);

//   return (
//     <section>
//       <div
//         className={`fixed top-0 w-full h-16 ${bgColor} transition-colors duration-300`}
//       >
//         <div className="container h-full mx-auto flex flex-row justify-between items-center">
//           <Link href="/">
//             <Image
//               width={200}
//               height={64}
//               src={currentLogo}
//               alt="Blooming Brands Logo"
//               className="w-[300px] h-[64px]"
//             />
//           </Link>
//           <div
//             className={`desktopMenu hidden ${txtColor} uppercase lg:flex lg:flex-row lg:w-2/3 lg:justify-end lg:text-xl`}
//           >
//             <DesktopMenu linkColor={txtColor} />
//           </div>
//           <div className="relative flex flex-row w-1/3 justify-end lg:hidden">
//             <MobileMenu iconColor={iconColor} size={36} />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Header;

"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "../mobile-menu/MobileMenu";
import DesktopMenu from "../desktop-menu/DesktopMenu";

interface HeaderProps {
  logo?: string;
  darkLogo?: string;
}

const Header: React.FC<HeaderProps> = ({
  logo = "/default-logo.png",
  darkLogo = "/default-dark-logo.png",
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef(logo);

  // Attach scroll listener
  const scrollListener = () => {
    const header = headerRef.current;
    if (!header) return;

    if (window.scrollY > 0) {
      header.classList.add("bg-slate-800");
      header.classList.remove("bg-transparent");
      logoRef.current = darkLogo;
    } else {
      header.classList.add("bg-transparent");
      header.classList.remove("bg-slate-800");
      logoRef.current = logo;
    }

    const logoImg = header.querySelector("img");
    if (logoImg) {
      logoImg.setAttribute("src", logoRef.current || "");
    }
  };

  // Attach scroll listener directly to the window
  if (typeof window !== "undefined") {
    window.onscroll = scrollListener;
  }

  return (
    <section>
      <div
        ref={headerRef}
        className="fixed top-0 w-full h-16 bg-transparent transition-colors duration-300"
      >
        <div className="container h-full mx-auto flex flex-row justify-between items-center">
          <Link href="/">
            <Image
              width={200}
              height={64}
              src={logoRef.current}
              alt="Blooming Brands Logo"
              className="w-[300px] h-[64px]"
            />
          </Link>
          <div
            className={`desktopMenu hidden text-slate-800 uppercase lg:flex lg:flex-row lg:w-2/3 lg:justify-end lg:text-xl`}
          >
            <DesktopMenu linkColor="text-slate-800" />
          </div>
          <div className="relative flex flex-row w-1/3 justify-end lg:hidden">
            <MobileMenu iconColor="black" size={36} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
