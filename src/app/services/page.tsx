import type { Metadata } from "next";
import Services from "@/components/responsive/services/Services";
//import GetPageName from "../util/getPageName";
import PageTop from "@/components/responsive/page-top/PageTop";
import NewsLetterForm2 from "@/components/responsive/newsletter/NewsletterForm2";

export const metadata: Metadata = {
  title: "Blooming Brands | Our Services",
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
        <PageTop PageMessage="Our Services" />
        <Services />
      </div>
      <NewsLetterForm2 />
    </>
  );
};

export default page;
