import React from "react";
import type { Metadata } from "next";
// import Section from "@/components/responsive/placeholder/Section";
// import Contact from "@/components/responsive/contact/Contact";
// import GetPageName from "@/app/util/getPageName";
import Image from "next/image";
import PageTop from "@/components/responsive/page-top/PageTop";
import Cta from "@/components/responsive/banner/call-to-action/CTA";

export const metadata: Metadata = {
  title: "Blooming Brands | Online Marketing",
  description:
    "Boston based Website Design, Development, and Online Marketing Agency",
  keywords:
    "website design, website development, online stores, online marketing",
  applicationName: "Blooming Brands", // Provide the app name or remove this field if unnecessary
  authors: [{ name: "Mohamed Hafez" }], // Changed to array of objects
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC a division subsidiary of Nodes Unlimited LLC",
};

const OnlineMarketingService = () => {
  return (
    <>
      <PageTop PageMessage="Online Marketing" />
      <div className="container mx-auto py-20 flex flex-col lg:flex-row bg-[url('https://img.freepik.com/free-vector/global-network-world-concept-technology-globe-with-continents-map-connection-lines-dots-point-digital-data-planet-design-simple-flat-style-monochrome-color_333792-95.jpg')] bg-top bg-fixed bg-cover bg-no-repeat ">
        <div className="w-full px-4 lg:w-1/2 lg:px-0">
          <h2 className="text-3xl font-black mb-6">
            Online Marketing Drives Brand Growth
          </h2>
          <h3 className="font-semibold text-lg mb-4">
            Boost Your Business with Expert Online Marketing
          </h3>
          <p className="text-base mb-2">
            In today&apos;s competitive digital world, having an online presence
            is not enough—you need a powerful online marketing strategy that
            drives traffic, increases conversions, and grows your business.
          </p>
          <p className="text-base mb-2">
            At Blooming Brands, we specialize in crafting tailored online
            marketing strategies that help businesses in Boston, Lowell, and
            throughout New England succeed online. From SEO and social media to
            email campaigns and paid ads, we provide comprehensive marketing
            solutions that deliver real results summarized below:
          </p>
          <ul>
            <li className="font-semibold text-lg mb-4">
              Search Engine Optimization (SEO)
            </li>
            <li className="text-base mb-4">
              Our SEO services help your website rank higher on search engines
              like Google, making it easier for potential customers to find you.
              We use proven techniques to drive organic traffic and improve your
              online visibility, helping you attract the right audience.
            </li>
            <li className="font-semibold text-lg mb-4">
              Pay-Per-Click (PPC) Advertising
            </li>
            <li className="text-base mb-4">
              PPC is one of the fastest ways to get immediate traffic to your
              website. We design and manage highly targeted PPC campaigns that
              deliver a li return on investment, driving qualified leads and
              boosting conversions.
            </li>
            <li className="font-semibold text-lg mb-4">
              Social Media Marketing
            </li>
            <li className="text-base mb-4">
              We create tailored social media marketing campaigns to help you
              connect with your audience, build brand awareness, and drive
              engagement on platforms like Facebook, Instagram, and LinkedIn.
              Our ads are designed to grow your follower base and turn likes
              into loyal customers.
            </li>
            <li className="font-semibold text-lg mb-4">Email Marketing </li>
            <li className="text-base mb-4">
              Our email marketing solutions help you nurture relationships with
              customers and prospects. From newsletters to promotional
              campaigns, we create personalized emails that drive repeat
              business and keep your audience engaged.
            </li>
            <li className="font-semibold text-lg mb-4">Content Marketing</li>
            <li className="text-base mb-4">
              Content is key to building trust and credibility online. We
              develop high-quality blog posts, videos, and infographics that
              engage your audience and boost your SEO rankings, positioning your
              business as an industry leader.
            </li>
          </ul>
          <h4 className="font-semibold text-lg mb-4">
            Why Choose Blooming Brands?
          </h4>
          <p>
            At Blooming Brands, we understand the unique challenges small
            businesses face. Our online marketing strategies are custom-tailored
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

export default OnlineMarketingService;

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
