// "use client";
// import React from "react";
// import { useRouter } from "next/navigation";
// import {
//   FaLaptopCode,
//   FaWordpress,
//   FaShoppingCart,
//   FaBullhorn,
//   FaMousePointer,
//   FaSearch,
// } from "react-icons/fa";

// const Services = () => {
//   const router = useRouter();
//   return (
//     <section className="bg-gray-2 pb-12 pt-20 lg:pb-[90px] lg:pt-[120px] z-30">
//       <div className="container mx-auto">
//         <div className="-mx-4 flex flex-wrap">
//           <div className="w-full px-4">
//             <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-[70px]">
//               <span className="mb-2 block text-lg font-semibold text-black capitalize">
//                 Solutions to grow your business
//               </span>
//               <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark sm:text-4xl md:text-[40px]">
//                 What we do for you?
//               </h2>
//               <p className="text-base text-body-color ">
//                 There are many variations of passages of Lorem Ipsum available,
//                 but the majority have suffered alteration in some form.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center z-30 lg:w-1/2 lg:mx-auto">
//           <ServiceCard
//             icon={<FaLaptopCode />}
//             title="Website Design"
//             details="Custom, responsive designs that enhance your brand's online presence"
//             onClick={() => router.push("/website-design")}
//           />
//           <ServiceCard
//             icon={<FaWordpress />}
//             title="WordPress Development"
//             details="Custom themes and plugins for powerful WordPress websites"
//             onClick={() => router.push("/wordpress-development")}
//           />
//           <ServiceCard
//             icon={<FaShoppingCart />}
//             title="Online Stores"
//             details="Secure, scalable eCommerce platforms to grow your sales"
//             onClick={() => router.push("/e-commerce-systems")}
//           />
//           <ServiceCard
//             icon={<FaBullhorn />}
//             title="Online Marketing"
//             details="Expand your reach with effective online marketing solutions"
//             onClick={() => router.push("/online-marketing")}
//           />
//           <ServiceCard
//             icon={<FaMousePointer />}
//             title="Pay-Per-Click Advertisement - PPC"
//             details="Target high-converting keywords with optimized PPC strategies"
//             onClick={() => router.push("/ppc-advertisement")}
//           />
//           <ServiceCard
//             icon={<FaSearch />}
//             title="Search Engine Optimization - SEO"
//             details="Increase your website's visibility and ranking with SEO"
//             onClick={() => router.push("/search-engine-optimization")}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;

// interface ServiceCardProps {
//   title?: string;
//   details?: string;
//   className?: string;
//   icon?: React.ReactNode;
//   onClick?: () => void;
// }

// const ServiceCard = ({
//   title,
//   details,
//   className = "",
//   icon,
//   onClick,
// }: ServiceCardProps) => {
//   return (
//     <div className={`px-4 z-30 ${className}`} onClick={onClick}>
//       <div className="group relative mb-10 overflow-hidden rounded-[10px] border border-stroke bg-slate-800 text-white p-4 text-center duration-200 hover:border-slate-800 hover:shadow-feature hover:scale-105 transform transition-all w-full sm:w-[90%] lg:w-[250px] h-[250px] mx-auto">
//         <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-300 text-3xl font-semibold text-dark drop-shadow-feature group-hover:border-slate-300 group-hover:bg-slate-100 group-hover:text-white ">
//           {icon}
//         </div>
//         <h4 className="mb-2 text-lg font-semibold uppercase text-slate-100">
//           {title}
//         </h4>
//         <p className="text-sm text-body-color">{details}</p>
//         {/* The emerald hover effect at the bottom */}
//         <span className="absolute bottom-0 left-0 block h-2 w-0 bg-emerald-500 duration-300 group-hover:w-full"></span>
//       </div>
//     </div>
//   );
// };

// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   FaLaptopCode,
//   FaWordpress,
//   FaShoppingCart,
//   FaBullhorn,
//   FaMousePointer,
//   FaSearch,
// } from "react-icons/fa";

// const Services = () => {
//   const router = useRouter();
//   return (
//     <section className="bg-gray-2 pb-12 pt-20 lg:pb-[90px] lg:pt-[120px] z-30">
//       <div className="container mx-auto">
//         <div className="-mx-4 flex flex-wrap">
//           <div className="w-full px-4">
//             <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-[70px]">
//               <span className="mb-2 block text-lg font-semibold text-black capitalize">
//                 Solutions to grow your business
//               </span>
//               <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark sm:text-4xl md:text-[40px]">
//                 What we do for you?
//               </h2>
//               <p className="text-base text-body-color ">
//                 There are many variations of passages of Lorem Ipsum available,
//                 but the majority have suffered alteration in some form.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center z-30 lg:w-1/2 lg:mx-auto">
//           <ServiceCard
//             icon={<FaLaptopCode />}
//             title="Website Design"
//             details="Custom, responsive designs that enhance your brand's online presence"
//             onClick={() => router.push("/website-design")}
//           />
//           <ServiceCard
//             icon={<FaWordpress />}
//             title="WordPress Development"
//             details="Custom themes and plugins for powerful WordPress websites"
//             onClick={() => router.push("/wordpress-development")}
//           />
//           <ServiceCard
//             icon={<FaShoppingCart />}
//             title="Online Stores"
//             details="Secure, scalable eCommerce platforms to grow your sales"
//             onClick={() => router.push("/e-commerce-systems")}
//           />
//           <ServiceCard
//             icon={<FaBullhorn />}
//             title="Online Marketing"
//             details="Expand your reach with effective online marketing solutions"
//             onClick={() => router.push("/online-marketing")}
//           />
//           <ServiceCard
//             icon={<FaMousePointer />}
//             title="Pay-Per-Click Advertisement - PPC"
//             details="Target high-converting keywords with optimized PPC strategies"
//             onClick={() => router.push("/ppc-advertisement")}
//           />
//           <ServiceCard
//             icon={<FaSearch />}
//             title="Search Engine Optimization - SEO"
//             details="Increase your website's visibility and ranking with SEO"
//             onClick={() => router.push("/search-engine-optimization")}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;

// interface ServiceCardProps {
//   title?: string;
//   details?: string;
//   className?: string;
//   icon?: React.ReactNode;
//   onClick?: () => void;
// }

// const ServiceCard = ({
//   title,
//   details,
//   className = "",
//   icon,
//   onClick,
// }: ServiceCardProps) => {
//   const [iconColor, setIconColor] = useState("text-dark"); // Default icon color

//   return (
//     <div className={`px-4 z-30 ${className}`} onClick={onClick}>
//       <div
//         className="group relative mb-10 overflow-hidden rounded-[10px] border border-stroke bg-slate-800 text-white p-4 text-center duration-200 hover:border-slate-800 hover:shadow-feature hover:scale-105 transform transition-all w-full sm:w-[90%] lg:w-[250px] h-[250px] mx-auto"
//         onMouseEnter={() => setIconColor("text-black")} // Change icon color on hover
//         onMouseLeave={() => setIconColor("text-dark")} // Reset icon color on mouse leave
//       >
//         <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-300 text-3xl font-semibold drop-shadow-feature group-hover:border-slate-300 group-hover:bg-slate-100">
//           {React.cloneElement(icon as React.ReactElement, { color: iconColor })}{" "}
//           {/* Update icon color dynamically */}
//         </div>
//         <h4 className="mb-2 text-lg font-semibold uppercase text-slate-100">
//           {title}
//         </h4>
//         <p className="text-sm text-body-color">{details}</p>
//         {/* Red Line on default, turns green on hover */}
//         <span className="absolute bottom-0 left-0 block h-2 w-full bg-red-500 duration-300 group-hover:bg-emerald-500 group-hover:w-full"></span>
//       </div>
//     </div>
//   );
// };

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaLaptopCode,
  FaWordpress,
  FaShoppingCart,
  FaBullhorn,
  FaMousePointer,
  FaSearch,
} from "react-icons/fa";

const Services = () => {
  const router = useRouter();
  return (
    <section className="bg-gray-2 pb-12 pt-20 lg:pb-[90px] lg:pt-[120px] z-30">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[650px] text-center lg:mb-[70px]">
              <span className="mb-2 block text-lg font-semibold text-black capitalize">
                Solutions to grow your business
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark sm:text-4xl md:text-[40px]">
                What we do for you?
              </h2>
              <p className="text-base text-body-color ">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center z-30 lg:w-2/3 lg:mx-auto">
          <ServiceCard
            icon={<FaLaptopCode />}
            title="Website Design"
            details="Custom, responsive designs that enhance your brand's online presence"
            onClick={() => router.push("/services/website-design")}
          />
          <ServiceCard
            icon={<FaWordpress />}
            title="WordPress Development"
            details="Custom themes and plugins for powerful WordPress websites"
            onClick={() => router.push("/services/wordpress-development")}
          />
          <ServiceCard
            icon={<FaShoppingCart />}
            title="Online Stores"
            details="Secure, scalable eCommerce platforms to grow your sales"
            onClick={() => router.push("/services/online-stores")}
          />
          <ServiceCard
            icon={<FaBullhorn />}
            title="Online Marketing"
            details="Expand your reach with effective online marketing solutions"
            onClick={() => router.push("/services/online-marketing")}
          />
          <ServiceCard
            icon={<FaMousePointer />}
            title="Pay-Per-Click Advertisement - PPC"
            details="Target high-converting keywords with optimized PPC strategies"
            onClick={() => router.push("/services/pay-per-click")}
          />
          <ServiceCard
            icon={<FaSearch />}
            title="Search Engine Optimization - SEO"
            details="Increase your website's visibility and ranking with SEO"
            onClick={() => router.push("/services/search-engine-optimization")}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;

interface ServiceCardProps {
  title?: string;
  details?: string;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const ServiceCard = ({
  title,
  details,
  className = "",
  icon,
  onClick,
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  return (
    <div
      className={`px-4 z-30 ${className} hover:cursor-pointer`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)} // Set hover state to true
      onMouseLeave={() => setIsHovered(false)} // Reset hover state to false
    >
      <div className="group relative mb-10 overflow-hidden rounded-[10px] border border-stroke bg-slate-800 text-white p-4 text-center duration-200 hover:border-slate-800 hover:shadow-feature hover:scale-105 transform transition-all w-full sm:w-[90%] lg:w-[250px] h-[250px] mx-auto">
        <div
          className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-300 text-3xl font-semibold drop-shadow-feature transition-colors duration-300 ${
            isHovered ? "bg-slate-100 border-slate-300" : "bg-transparent"
          }`}
        >
          {React.cloneElement(icon as React.ReactElement, {
            color: isHovered ? "#1e293b" : "white", // Change icon color based on hover state
          })}
        </div>
        <h4 className="mb-2 text-lg font-semibold uppercase text-slate-100">
          {title}
        </h4>
        <p className="text-sm text-body-color">{details}</p>
        {/* Red Line on default, turns green on hover */}
        <span className="absolute bottom-0 left-0 block h-2 w-full bg-red-500 duration-300 group-hover:bg-emerald-500 group-hover:w-full"></span>
      </div>
    </div>
  );
};
