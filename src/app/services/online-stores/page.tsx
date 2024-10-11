import React from "react";
import type { Metadata } from "next";
// import Section from "@/components/responsive/placeholder/Section";
// import Contact from "@/components/responsive/contact/Contact";
// import GetPageName from "@/app/util/getPageName";
import Image from "next/image";
import PageTop from "@/components/responsive/page-top/PageTop";
import Cta from "@/components/responsive/banner/call-to-action/CTA";

export const metadata: Metadata = {
  title: "Blooming Brands | Online Stores",
  description:
    "Boston based Website Design, Development, and Online Marketing Agency",
  keywords:
    "website design, website development, online stores, online marketing",
  applicationName: "Blooming Brands", // Provide the app name or remove this field if unnecessary
  authors: [{ name: "Mohamed Hafez" }], // Changed to array of objects
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC a division subsidiary of Nodes Unlimited LLC",
};

const OnlineStoresService = () => {
  return (
    <>
      <PageTop PageMessage="Online Stores" />
      <div className="container mx-auto py-20 flex flex-col lg:flex-row bg-[url('https://img.freepik.com/free-vector/global-network-world-concept-technology-globe-with-continents-map-connection-lines-dots-point-digital-data-planet-design-simple-flat-style-monochrome-color_333792-95.jpg')] bg-top bg-fixed bg-cover bg-no-repeat ">
        <div className="w-full px-4 lg:w-1/2 lg:px-0">
          <h2 className="text-3xl font-black mb-6">
            Launch Your Dream Online Store
          </h2>
          <h3 className="font-semibold text-lg mb-8">
            Custom Online Stores for Small Businesses: Shopify, WooCommerce, and
            Beyond
          </h3>
          <p className="text-base mb-4">
            At Blooming Brands, we help small businesses in New England take
            their retail operations online with fully customized e-commerce
            solutions. Whether you&apos;re looking to set up a simple online
            shop or build a complex, scalable store, we offer a range of
            platforms—including Shopify, WooCommerce, or even custom-built
            full-stack solutions—to meet your unique needs.
          </p>
          <h4 className="font-black text-lg mb-4">Shopify Stores</h4>
          <p className="text-base mb-4">
            If you&apos;re seeking an all-in-one e-commerce platform that&apos;s
            easy to manage, our Shopify solutions are ideal. We set up and
            design your Shopify store to reflect your brand, integrate powerful
            features, and ensure a seamless shopping experience across all
            devices.
          </p>
          <h4 className="text-lg font-black mb-4">WooCommerce for WordPress</h4>
          <p className="text-base mb-4">
            For businesses that already have or want to build a WordPress site,
            we offer WooCommerce development, creating a feature-rich and fully
            customizable online store. WooCommerce allows flexibility with
            custom themes and plugins, making it perfect for businesses that
            need more control over their e-commerce operations.
          </p>
          <h4 className="text-lg font-black mb-4">Custom Shopping Cart</h4>
          <p className="text-base mb-4">
            Looking for a more unique, built-from-scratch solution? Our
            full-stack development team can create custom online stores that are
            tailored to your specific requirements, ensuring scalability,
            performance, and a personalized shopping experience. We use modern
            tried and tested frameworks like React, Next.js, and Node.js to
            deliver fast, secure, and efficient online stores.
          </p>
          <h4 className="text-lg font-black mb-4">
            Why Choose Blooming Brands for Your Online Store?
          </h4>
          <p className="mb-4 text-base">
            We understand the importance of a reliable, user-friendly, and
            visually stunning online store. At Blooming Brands, we work closely
            with your business to create an online shopping experience that not
            only looks great but also converts visitors into loyal customers.
            From handling product listings and payment gateways to ensuring
            mobile responsiveness and SEO optimization, we&apos;ve got your
            online store covered.
          </p>
        </div>
        <div className="w-full flex justify-end items-center lg:w-1/2  overflow-hidden bg-[url('/bg.png')] bg-contain bg-center bg-no-repeat">
          <Image
            src="/e-commerce.webp"
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

export default OnlineStoresService;

// interface ListItemProps {
//   count: number;
//   text: string;
// }

// const ListItem = ({ count, text }: ListItemProps) => {
//   return (
//     <li className="text-lg font-black dark:text-dark-6 flex text-base">
//       <span className="bg-primary mr-2.5 flex h-[26px] w-full max-w-[26px] items-center justify-center rounded text-base text-white">
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
