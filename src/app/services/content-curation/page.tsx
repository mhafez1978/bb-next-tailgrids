import React from "react";
import type { Metadata } from "next";
//import Section from "@/components/responsive/placeholder/Section";
//import Contact from "@/components/responsive/contact/Contact";
//import GetPageName from "@/app/util/getPageName";
import Image from "next/image";
import PageTop from "@/components/responsive/page-top/PageTop";
import Cta from "@/components/responsive/banner/call-to-action/CTA";

export const metadata: Metadata = {
  title: "Blooming Brands | Content Curation",
  description:
    "Boston based Website Design, Development, and Online Marketing Agency",
  keywords:
    "website design, website development, online stores, online marketing",
  applicationName: "Blooming Brands", // Provide the app name or remove this field if unnecessary
  authors: [{ name: "Mohamed Hafez" }], // Changed to array of objects
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC a division subsidiary of Nodes Unlimited LLC",
};

const ContentCuration = () => {
  return (
    <>
      <PageTop PageMessage="Content Curation" />
      <div className="container mx-auto py-20 flex flex-col lg:flex-row bg-[url('https://img.freepik.com/free-vector/global-network-world-concept-technology-globe-with-continents-map-connection-lines-dots-point-digital-data-planet-design-simple-flat-style-monochrome-color_333792-95.jpg')] bg-top bg-fixed bg-cover bg-no-repeat ">
        <div className="w-full px-4 lg:w-1/2 lg:px-0">
          <h2 className="text-3xl font-black mb-6">
            Content Curation That Drives Engagement
          </h2>
          <h3 className="font-semibold text-lg mb-4">
            Resonates with Your Audience and Amplify Your Message
          </h3>
          <p className="text-base mb-2">
            In the digital world, content is king, but not all content is
            created equal. Curating meaningful, relevant, and timely information
            helps position your brand as a thought leader, keeping your audience
            engaged and coming back for more. At Blooming Brands, we specialize
            in crafting and curating content that not only captivates but
            converts.
          </p>
          <h4 className="font-semibold text-lg mb-4">
            Why Choose Blooming Brands?
          </h4>
          <p className="text-base mb-2">
            With our strategic approach, we sift through the noise to bring you
            the most valuable, industry-relevant content that speaks directly to
            your audience. Our tailored content curation service saves you time,
            boosts engagement, and builds trust with your customers. Whether
            it&apos;s blog posts, newsletters, social media, or website updates,
            we curate content that aligns with your brand voice and business
            goals.
          </p>
          <p>
            At Blooming Brands, we understand the unique challenges small
            businesses face. Our content and copy services are custom-tailored
            to your specific goals, whether you&apos;re looking to increase
            traffic, generate leads, or build a loyal customer base. With a
            focus on delivering measurable results, we help small businesses in
            Boston, Lowell, and beyond stand out in the competitive online
            space. Let Blooming Brands help your business grow with targeted
            online marketing solutions. Get in touch today and start driving
            more traffic, leads, and sales!
          </p>
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

export default ContentCuration;

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
