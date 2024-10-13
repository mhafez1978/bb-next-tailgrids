import React from "react";
import type { Metadata } from "next";
// import Section from "@/components/responsive/placeholder/Section";
// import Contact from "@/components/responsive/contact/Contact";
// import GetPageName from "@/app/util/getPageName";
import Image from "next/image";
import PageTop from "@/components/responsive/page-top/PageTop";
import Cta from "@/components/responsive/banner/call-to-action/CTA";

export const metadata: Metadata = {
  title: "Blooming Brands | WordPress Development",
  description:
    "Boston based Website Design, Development, and Online Marketing Agency",
  keywords:
    "website design, website development, online stores, online marketing",
  applicationName: "Blooming Brands", // Provide the app name or remove this field if unnecessary
  authors: [{ name: "Mohamed Hafez" }], // Changed to array of objects
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC a division subsidiary of Nodes Unlimited LLC",
};

const WordPressDevelopmentService = () => {
  return (
    <>
      <PageTop PageMessage="WordPress Development" />
      <div className="container mx-auto py-20 flex flex-col lg:flex-row bg-[url('https://img.freepik.com/free-vector/global-network-world-concept-technology-globe-with-continents-map-connection-lines-dots-point-digital-data-planet-design-simple-flat-style-monochrome-color_333792-95.jpg')] bg-top bg-fixed bg-cover bg-no-repeat ">
        <div className="w-full px-4 lg:w-1/2 lg:px-0">
          <h2 className="text-3xl font-black mb-6">
            Tailor-Made WordPress Themes & Plugins for Your Business
          </h2>
          <h4 className="text-lg font-semibold mt-4 mb-4">
            Why Small Businesses Rely on WordPress
          </h4>
          <p className="text-base mb-2">
            WordPress is one of the most popular platforms for building
            websites, powering over 40% of all websites on the internet today.
            It&apos;s easy to use, flexible, and offers businesses a way to
            create a professional online presence without requiring extensive
            technical knowledge. From simple blogs to fully functioning online
            stores, WordPress is highly adaptable, making it a go-to choice for
            businesses of all sizes.
          </p>
          <h3 className="font-semibold text-lg mb-4">
            Tailored To Your Business Needs
          </h3>
          <p className="text-base mb-2">
            At Blooming Brands, we offer tailored WordPress solutions designed
            to help your business thrive in the digital world. Whether you need
            a custom theme to reflect your brand or a plugin to enhance your
            website&apos;s functionality, we&apos;re here to bring your vision
            to life. Based in the heart of New England, we proudly serve
            businesses in Boston, Lowell, and beyond, delivering high-quality,
            unique WordPress solutions that set you apart
          </p>
          <h4 className="text-lg font-semibold mt-4 mb-4">
            How Blooming Brands Extends WordPress Functionality and Looks
          </h4>
          <p className="text-base mb-2">
            At Blooming Brands, we take WordPress to the next level by offering
            custom themes and plugins that help small businesses stand out.
            While WordPress provides an excellent foundation, many businesses
            need unique features to truly represent their brand and streamline
            their processes and that&apos;s where our expertise comes in.
          </p>
          <p className="text-base mb-2">
            We create custom WordPress themes and plugins that not only reflect
            your business&apos;s unique identity but also elevate your
            website&apos;s functionality and performance. Whether you need a
            Full Stack Headless WordPress App for advanced flexibility and
            speed, or custom themes and plugins tailored to your specific
            needs—such as an advanced booking system, enhanced e-commerce
            capabilities, or custom features to simplify your
            operations—we&apos;ve got you covered.
          </p>
          <p className="text-base mb-2">
            By extending WordPress&apos;s functionality with these powerful
            solutions, Blooming Brands helps small businesses thrive and stay
            competitive in today&apos;s digital landscape.
          </p>
          <h4 className="text-lg font-semibold mt-4 mb-4">
            Our Favorite Tech Stack
          </h4>
          <p className="text-base mb-2">
            Our development process utilizes a modern tech stack, ensuring your
            WordPress site is built for performance and scalability. We use
            Next.js for fast, server-rendered applications, React components for
            dynamic and interactive user interfaces, MySQL for robust database
            management, and Node.js APIs to integrate custom functionality
            seamlessly. This combination allows us to create Full Stack Headless
            WordPress Apps and custom solutions that deliver speed, flexibility,
            and a superior user experience.
          </p>
        </div>
        <div className="w-full flex justify-end items-center lg:w-1/2  overflow-hidden bg-[url('/bg.png')] bg-contain bg-center bg-no-repeat">
          <Image
            src="/wordpress-dev.webp"
            alt="website design process"
            width={400}
            height={900}
            className="object-cover relative z-20"
          />
          <div className="min-h-[200px] w-[400px] bg-red-400 w-1/4 absolute z-10"></div>
        </div>
      </div>
      <section>
        <div className="container mx-auto">
          <Cta
            secondaryCallToActionText="Get A Free Quote Today"
            mainCallToActionText="Have a new project in mind ?"
            mainCallToActionTextAfterBlockOnSmall=""
            mainCallToActionButtonText="Call us"
          />
        </div>
      </section>
    </>
  );
};

export default WordPressDevelopmentService;

// interface ListItemProps {
//   count: number;
//   text: string;
// }

// const ListItem = ({ count, text }: ListItemProps) => {
//   return (
//     <li className="text-lg font-black dark:text-dark-6 flex text-base">
//       <span className="bg-black mr-2.5 flex h-[26px] w-full max-w-[26px] items-center justify-center rounded text-base text-white">
//         {count}
//       </span>
//       {text}
//     </li>
//   );
// };

// interface BrandProps {
//   link: string;
//   imageSrc: string;
//   altText: string;
// }

// const SingleImage = ({ brand }: { brand: BrandProps }) => {
//   const { link, imageSrc, altText } = brand;
//   return (
//     <a
//       href={link}
//       className="mx-4 flex min-w-[150px] max-w-[200px] items-center justify-center py-5 lg:min-w-min lg:max-w-[110px] xl:max-w-[200px]"
//     >
//       <img src={imageSrc} alt={altText} className="h-10 w-full" />
//     </a>
//   );
// };

// const DotShape = () => {
//   return (
//     <>
//       <svg
//         width="50"
//         height="49"
//         viewBox="0 0 50 49"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <circle
//           cx="47.7119"
//           cy="46.3164"
//           r="1.74121"
//           transform="rotate(180 47.7119 46.3164)"
//           fill="white"
//         />
//         <circle
//           cx="47.7119"
//           cy="16.7161"
//           r="1.74121"
//           transform="rotate(180 47.7119 16.7161)"
//           fill="white"
//         />
//         <circle
//           cx="47.7119"
//           cy="31.3423"
//           r="1.74121"
//           transform="rotate(180 47.7119 31.3423)"
//           fill="white"
//         />
//         <circle
//           cx="47.7119"
//           cy="1.74121"
//           r="1.74121"
//           transform="rotate(180 47.7119 1.74121)"
//           fill="white"
//         />
//         <circle
//           cx="32.3916"
//           cy="46.3162"
//           r="1.74121"
//           transform="rotate(180 32.3916 46.3162)"
//           fill="white"
//         />
//         <circle
//           cx="32.3916"
//           cy="16.7161"
//           r="1.74121"
//           transform="rotate(180 32.3916 16.7161)"
//           fill="white"
//         />
//         <circle
//           cx="32.3916"
//           cy="31.342"
//           r="1.74121"
//           transform="rotate(180 32.3916 31.342)"
//           fill="white"
//         />
//         <circle
//           cx="32.3916"
//           cy="1.74145"
//           r="1.74121"
//           transform="rotate(180 32.3916 1.74145)"
//           fill="white"
//         />
//         <circle
//           cx="17.0674"
//           cy="46.3162"
//           r="1.74121"
//           transform="rotate(180 17.0674 46.3162)"
//           fill="white"
//         />
//         <circle
//           cx="17.0674"
//           cy="16.7161"
//           r="1.74121"
//           transform="rotate(180 17.0674 16.7161)"
//           fill="white"
//         />
//         <circle
//           cx="17.0674"
//           cy="31.342"
//           r="1.74121"
//           transform="rotate(180 17.0674 31.342)"
//           fill="white"
//         />
//         <circle
//           cx="17.0674"
//           cy="1.74145"
//           r="1.74121"
//           transform="rotate(180 17.0674 1.74145)"
//           fill="white"
//         />
//         <circle
//           cx="1.74316"
//           cy="46.3162"
//           r="1.74121"
//           transform="rotate(180 1.74316 46.3162)"
//           fill="white"
//         />
//         <circle
//           cx="1.74316"
//           cy="16.7161"
//           r="1.74121"
//           transform="rotate(180 1.74316 16.7161)"
//           fill="white"
//         />
//         <circle
//           cx="1.74316"
//           cy="31.342"
//           r="1.74121"
//           transform="rotate(180 1.74316 31.342)"
//           fill="white"
//         />
//         <circle
//           cx="1.74316"
//           cy="1.74145"
//           r="1.74121"
//           transform="rotate(180 1.74316 1.74145)"
//           fill="white"
//         />
//       </svg>
//     </>
//   );
// };
