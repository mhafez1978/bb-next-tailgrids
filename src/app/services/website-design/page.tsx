import React from "react";
import type { Metadata } from "next";
// import Section from "@/components/responsive/placeholder/Section";
// import Contact from "@/components/responsive/contact/Contact";
// import GetPageName from "@/app/util/getPageName";
import Image from "next/image";
import Cta from "@/components/responsive/banner/call-to-action/CTA";
import PageTop from "@/components/responsive/page-top/PageTop";

export const metadata: Metadata = {
  title: "Blooming Brands | Website Design",
  description:
    "Boston based Website Design, Development, and Online Marketing Agency",
  keywords:
    "website design, website development, online stores, online marketing",
  applicationName: "Blooming Brands", // Provide the app name or remove this field if unnecessary
  authors: [{ name: "Mohamed Hafez" }], // Changed to array of objects
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC a division subsidiary of Nodes Unlimited LLC",
};

const WebsiteDesignService = () => {
  return (
    <>
      <PageTop PageMessage="Website Design & Development" />
      <div className="container mx-auto py-20 flex flex-col lg:flex-row bg-[url('https://img.freepik.com/free-vector/global-network-world-concept-technology-globe-with-continents-map-connection-lines-dots-point-digital-data-planet-design-simple-flat-style-monochrome-color_333792-95.jpg')] bg-top bg-fixed bg-cover bg-no-repeat ">
        <div className="w-full px-4 lg:w-1/2 lg:px-0">
          <h2 className="text-3xl font-black mb-6">
            Professional Web Design Services for New England Small Business
          </h2>
          <h3 className="font-semibold text-lg mb-8">
            Data-driven websites that convert.
          </h3>
          <ol className="space-y-3">
            <ListItem
              count={1}
              text="Custom Designs That Speak to Your Brand"
            />
            <p className="mb-8">
              At Blooming Brands, we understand that your website is more than
              just an online presence—it&apos;s the heart of your brand.
              That&apos;s why we take a personalized approach to every project.
              Our team works closely with you to create a website that reflects
              your business&apos;s identity and values, ensuring you stand out
              in the competitive New England market.
            </p>
            <ListItem count={2} text="User-Friendly & Mobile-Responsive" />
            <p className="mb-8">
              A website needs to do more than just look good—it needs to work
              flawlessly across all devices. Our web designs are not only
              visually appealing but also optimized for mobile, tablet, and
              desktop users. We ensure a seamless user experience, whether your
              customers are browsing on the go or from their office in Boston or
              Lowell.
            </p>
            <ListItem
              count={3}
              text="SEO-Optimized To Make a Local or Global Impact"
            />
            <p className="mb-8">
              We know the New England business scene, and we design your site
              with SEO best practices to help you rank higher in local search
              results. With targeted keywords and fast-loading pages, we ensure
              your website attracts the right traffic, whether you’re serving
              the bustling streets of Boston or the growing business community
              in Lowell.
            </p>
            <ListItem
              count={4}
              text="Our Solutions are Metrics and Data Driven"
            />
            <p className="mb-8">
              Our websites are built with performance in mind. From
              lightning-fast loading speeds to advanced security features, we
              provide a reliable platform that keeps your customers engaged and
              your business protected. Say goodbye to slow, outdated websites
              and hello to sleek, modern designs that drive results.
            </p>
            <ListItem count={5} text="Complete Full Service Support" />
            <p className="">
              When you partner with Blooming Brands, you&apos;re never alone.
              From the initial design consultation to post-launch support,
              we&apos;re here every step of the way to ensure your website
              remains fresh, functional, and up to date. We&apos;re committed to
              building long-lasting relationships and helping your business
              grow.
            </p>
          </ol>
        </div>
        <div className="w-full flex justify-end items-center lg:w-1/2  overflow-hidden bg-[url('/bg.png')] bg-contain bg-center bg-no-repeat">
          <Image
            src="/website-design-process.webp"
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

export default WebsiteDesignService;

interface ListItemProps {
  count: number;
  text: string;
}

const ListItem = ({ count, text }: ListItemProps) => {
  return (
    <li className="text-lg font-black dark:text-dark-6 flex text-base">
      <span className="bg-primary mr-2.5 flex h-[26px] w-full max-w-[26px] items-center justify-center rounded text-base text-white">
        {count}
      </span>
      {text}
    </li>
  );
};

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
