import Hero from "@/components/responsive/banner/hero/Hero";
import SocialProof from "@/components/responsive/social-proof/SocialProof";
import About from "@/components/responsive/about/About";
import Services from "@/components/responsive/services/Services";
import Portfolio from "@/components/responsive/portfolio/Portfolio";
//import Portfolio02 from "@/components/responsive/portfolio/Portfolio02";
import Offer from "@/components/responsive/offer/Offer";
//import Section from "@/components/responsive/placeholder/Section";
import Accomplishments from "@/components/responsive/accomplishments/Accomplishments";
import OurProcessTimeLine from "@/components/responsive/timeline/OurProcessTimeLine";
import Testimonials from "@/components/responsive/testimonials/Testimonials";
import Contact from "@/components/responsive/contact/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blooming Brands | Home",
  description:
    "Boston based Website Design, Development, and Online Marketing Agency",
  keywords: "website design, website development, online marketing",
  applicationName: "Blooming Brands", // Provide the app name or remove this field if unnecessary
  authors: [{ name: "Mohamed Hafez" }], // Changed to array of objects
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC a division subsidiary of Nodes Unlimited LLC",
};

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <About />
      <Services />
      <OurProcessTimeLine />
      <Accomplishments />
      <div id="portfolio">
        <Portfolio />
      </div>
      <Offer />
      <Testimonials />
      <Contact />
    </>
  );
}
