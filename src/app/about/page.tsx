import type { Metadata } from "next";
// import GetPageName from "../util/getPageName";
import About from "@/components/responsive/about/About";
import PageTop from "@/components/responsive/page-top/PageTop";
// import NewsletterSignup from "@/components/responsive/newsletter/NewsletterForm";
import NewsletterSignup2 from "@/components/responsive/newsletter/NewsletterForm2";

export const metadata: Metadata = {
  title: "Blooming Brands | About us",
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
        <PageTop PageMessage="About us" />
        <About />
      </div>
      {/* <NewsletterSignup /> */}
      <NewsletterSignup2 />
    </>
  );
};

export default page;
