import type { Metadata } from "next";
// import GetPageName from "../util/getPageName";
import About from "@/components/responsive/about/About";
import PageTop from "@/components/responsive/page-top/PageTop";
// import NewsletterSignup from "@/components/responsive/newsletter/NewsletterForm";
import NewsletterSignup2 from "@/components/responsive/newsletter/NewsletterForm2";

export const metadata: Metadata = {
  title: "Blooming Brands | About us",
  description:
    "We Craft Full-Stack, Data-Driven Apps, Websites, Online Stores, Blogs, and More",
  keywords: "Full-Stack, Data-Driven Apps, Websites, Online Stores, Blogs",
  applicationName: "Blooming Brands", // Provide the app name or remove this field if unnecessary
  authors: [{ name: "Mohamed Hafez" }], // Changed to array of objects
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC a division subsidiary of Nodes Unlimited LLC",
};

const page = () => {
  return (
    <>
      <div className="min-h-[50vh]">
        <PageTop PageMessage="About us" />
        <div className="min-h-[25vh] w-screen bg-[url('https://www.tallahasseefreeclassifiedads.com/banner_thumb_new.php?f=samplead.jpg&w=1500&h=500')] bg-center bg-cover bg-no-repeat">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-1266489978722809"
            data-ad-slot="8088782196"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
        <About />
        <div className="min-h-[25vh] w-screen bg-[url('https://www.tallahasseefreeclassifiedads.com/banner_thumb_new.php?f=samplead.jpg&w=1500&h=500')] bg-center bg-cover bg-no-repeat">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-1266489978722809"
            data-ad-slot="8088782196"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>
      {/* <NewsletterSignup /> */}
      <NewsletterSignup2 />
    </>
  );
};

export default page;
