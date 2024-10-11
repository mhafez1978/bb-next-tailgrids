import type { Metadata } from "next";
//import GetPageName from "../util/getPageName";
import Portfolio from "@/components/responsive/portfolio/Portfolio";
import PageTop from "@/components/responsive/page-top/PageTop";

export const metadata: Metadata = {
  title: "Blooming Brands | Portfolio",
  description:
    "Boston based Website Design, Development, and Online Marketing Agency",
  keywords:
    "website design, website development, online stores, online marketing",
  applicationName: "Blooming Brands", // Provide the app name or remove this field if unnecessary
  authors: [{ name: "Mohamed Hafez" }], // Changed to array of objects
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC a division subsidiary of Nodes Unlimited LLC",
};

const page = () => {
  return (
    <>
      <div className="min-h-[50vh] mt-[63px]">
        <PageTop PageMessage="Our Portfolio" />
        <Portfolio />
      </div>
    </>
  );
};

export default page;
