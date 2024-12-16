import Hero from "@/components/responsive/banner/hero/Hero";
import SocialProof from "@/components/responsive/social-proof/SocialProof";
import About from "@/components/responsive/about/About";
import Services from "@/components/responsive/services/Services";
import Portfolio from "@/components/responsive/portfolio/Portfolio";
import Offer from "@/components/responsive/offer/Offer";
import Accomplishments from "@/components/responsive/accomplishments/Accomplishments";
import OurProcessTimeLine from "@/components/responsive/timeline/OurProcessTimeLine";
import Testimonials from "@/components/responsive/testimonials/Testimonials";
import Contact from "@/components/responsive/contact/Contact";
import type { Metadata } from "next";
import CookiesConcentNotice from "@/components/responsive/consent/CookiesConcentNotice";
import NewsLetterForm2 from "@/components/responsive/newsletter/NewsletterForm2";
import ChatButton from "@/components/ai/ChatButton";

export const metadata: Metadata = {
  title: "Blooming Brands | Home",
  description:
    "Boston based Website Design, Development, and Online Marketing Agency",
  keywords: "website design, website development, online marketing",
  applicationName: "Blooming Brands", // Provide the app name or remove this field if unnecessary
  authors: [{ name: "Blooming Brands LLC" }], // Changed to array of objects
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC a division subsidiary of Nodes Unlimited LLC",
};

export default function Home() {
  return (
    <>
      <Hero
        heroTitle="Grow Your Brand with Online Marketing"
        heroDescription="We offer tailored online marketing, website design, and
              development solutions to fit any budget. Elevate your brand and
              achieve digital success with strategies that work for you."
      />
      <SocialProof socialProofText="We provide a tailored approach to website design, development, and online marketing that drives real results for small business in Boston Massachusetts and beyond." />
      <About
        aboutTitle="We're Committed to Making a Positive Imapct"
        aboutSubTitle="We Craft Full-Stack, Data-Driven Apps, Websites, Online Stores, Blogs, and More…"
        aboutParagraph1="At Blooming Brands, we believe in the power of innovation, creativity, and precision. As the founder, my vision has always been to help businesses flourish in the digital world by offering tailored solutions that blend design and functionality seamlessly."
        aboutParagraph2="I am personally committed to delivering excellence in every project we take on. Our team is dedicated to building relationships based on trust, transparency, and a relentless focus on quality. We don't just build websites; we create experiences that leave a lasting impact and help your business thrive. Let's build something extraordinary, together."
        aboutCall2ActionText="Call us +1 508 936 3727"
      />
      <Services />
      <OurProcessTimeLine />
      <Accomplishments />
      <div id="portfolio">
        <Portfolio />
      </div>
      <Offer />
      <Testimonials />
      <Contact />
      <NewsLetterForm2 />
      <CookiesConcentNotice />
      <div className="hidden lg:fixed lg:block lg:botton-100 lg:right-10 z-30">
        <ChatButton />
      </div>
    </>
  );
}
