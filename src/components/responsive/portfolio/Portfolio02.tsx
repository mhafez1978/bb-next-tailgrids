"use client";

import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import Image from "next/image";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Optional: Initialize Swiper modules if needed
// SwiperCore.use([Navigation, Pagination]);

export function ActionList() {
  return (
    <>
      <ul className="list-disc text-sm pl-4">
        <li>
          Website Design & Development: We designed and built a user-friendly,
          mobile-optimized website that highlighted PWWL&apos;s luxurious
          services and made it easy for visitors to book rides.
        </li>
        <li>
          Paid Ads: We launched targeted paid ad campaigns on Google, focused on
          capturing local search traffic for terms like “limousine services for
          weddings” and “corporate event transportation in Denver, NC.”
        </li>
        <li>
          Search Engine Optimization (SEO): By optimizing the website with
          high-ranking keywords and improving local SEO, we boosted organic
          traffic and increased PWWL&apos;s visibility in search engines.
        </li>
        <li>
          Social Media Ads: We ran targeted social media ads on platforms like
          Facebook and Instagram, showcasing PWWL&apos;s fleet and services.
          These ads focused on attracting wedding planners and corporate event
          organizers.
        </li>
      </ul>
    </>
  );
}

export function ResultsList({ results }: { results: string[] }) {
  return (
    <ul className="list-disc text-sm pl-4">
      {results.map((result, index) => (
        <li key={index}>{result}</li>
      ))}
    </ul>
  );
}

interface PortfolioCardProps {
  subtitle?: string;
  title?: string;
  category?: string;
  details?: string;
  date?: string;
  image?: string;
  client?: string;
  industry?: string;
  location?: string;
  focus?: string;
  overview?: string;
  challenges?: string;
  our_solution?: string;
  results: string[];
  dynamicResults: string[];
  conclusion?: string;
}

const PortfolioCard = ({
  //   subtitle,
  title,
  //   category,
  //   details,
  //   date,
  image,
  client,
  industry,
  location,
  focus,
  overview,
  challenges,
  our_solution,
  results,
  dynamicResults,
  conclusion,
}: PortfolioCardProps) => {
  const fallbackImage = "";
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2 h-full justify-evenly items-start px-6 py-4 pt-[22px]">
          <h2 className="text-xl text-gray-800 mb-3">
            <span className="font-black">Case Study: </span> <br /> {title}
          </h2>
          <h5 className="text-lg font-medium text-gray-700">
            <span className="font-black">Client:</span> {client}
          </h5>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-black">Location:</span> {location}
          </p>
          <p className="text-sm font-light text-gray-600">
            <span className="font-black">Industry:</span> {industry}
          </p>
          <p className="text-sm font-light text-gray-600">
            <span className="font-black">Focus:</span> {focus}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-black">Overview:</span> <br />
            {overview}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-black">Challenges:</span> <br /> {challenges}
          </p>
          <p className="text-sm text-gray-600 mt-2 w-[80%] mb-4">
            <span className="font-black">Our Solution:</span>
            <br />
            {our_solution}
          </p>

          <ActionList />
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-black">Results:</span>
            <br /> {results}
          </p>
          <ResultsList results={dynamicResults} />
          <p className="text-sm text-gray-600 mt-2 mb-4">
            <span className="font-black">Conclusion:</span> <br />
            {conclusion}
          </p>
        </div>
        <div className="flex flex-col w-1/2 h-[60vh] justify-center items-center">
          <div className="w-full h-full p-4 flex flex-col justify-start items-start py-4 px-4">
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-black">Results:</span>
              <br /> {results}
            </p>
            <ResultsList results={dynamicResults} />
            <p className="text-sm text-gray-600 mt-2 mb-4">
              <span className="font-black">Conclusion:</span> <br />
              {conclusion}
            </p>
            <Image
              src={image || fallbackImage}
              alt="image"
              width={500}
              height={300}
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Portfolio02: React.FC = () => {
  // Use the correct type for sliderRef
  const sliderRef = useRef<SwiperInstance | null>(null);

  const handlePrev = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.slidePrev();
    }
  }, []);

  const handleNext = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.slideNext();
    }
  }, []);

  return (
    <>
      <section
        id="portfolio"
        className="w-screen min-h-screen flex flex-col justify-center items-center overflow-hidden py-24"
      >
        <div className="w-full pb-[400px]">
          <div className="container mx-auto text-center">
            <span className="text-black mb-2 block text-lg font-semibold">
              Success Case Studies
            </span>
            <h2 className="text-dark mb-3 text-3xl leading-[1.208] font-bold sm:text-4xl md:text-[40px]">
              Our Recent Projects
            </h2>
          </div>
          <Swiper
            slidesPerView={1}
            onSwiper={(swiper) => {
              // Update the ref with the Swiper instance
              sliderRef.current = swiper;
            }}
          >
            <SwiperSlide>
              <PortfolioCard
                subtitle="Astro JS"
                title="PWWL - Driving Success for a Limousine Startup"
                category="Transportation Services"
                details="PWWL A startup limousie company based in Denver NC focused on providing luxurious transportation services for wedding groups corporate events"
                date="06, September 2021"
                image="pwwl.png"
                client="PWWL (Premier Wedding and Event Limousine)"
                industry="Luxury Transportation Services"
                location="Denver, NC"
                focus="Weddings, Wine Tours, Group Concdrt and Sports Events, Corporate Events"
                overview="PWWL, a startup limousine company based in Denver, NC, approached Blooming Brands with a clear goal: to increase scheduled limousine rides for wedding groups and corporate events. Their premium transportation services needed a strong online presence to match their luxurious offerings, and they wanted a solution that would drive bookings and establish them as a go-to option in the region."
                challenges="The main challenge was the highly competitive nature of the luxury transportation market, particularly for wedding and corporate events. PWWL needed to stand out from other providers and capture the attention of potential clients through online channels. They were looking for a digital strategy that could quickly generate leads and convert them into bookings."
                our_solution="Blooming Brands took a multi-faceted approach to achieve PWWL’s goal of increasing limousine bookings:"
                results={[
                  "Within the first few months, PWWL saw a significant increase in online traffic and bookings:",
                ]}
                dynamicResults={[
                  "35% increase in website traffic within 6 months",
                  "20% rise in limousine bookings for weddings and corporate events",
                  "Improved local search visibility for 'corporate transportation services Denver NC'",
                ]}
                conclusion="By creating a strong online presence and driving targeted traffic to PWWL’s website, Blooming Brands helped this luxury transportation startup achieve its primary business goal: more bookings. Our combination of paid ads, SEO, and social media marketing effectively positioned PWWL as a leader in the local market for limousine services."
              />
            </SwiperSlide>
            <SwiperSlide>
              <PortfolioCard
                subtitle="Custom WordPress"
                title="Carolina Recycles - Optimizing Waste Management Services"
                category="Waste Management"
                details="Carolina Recycles, a waste management company based in Charlotte, NC, focuses on providing eco-friendly recycling and waste solutions to residential and commercial customers."
                date="15, October 2021"
                image="carolina-recycles.png"
                client="Carolina Recycles"
                industry="Waste Management Services"
                location="Charlotte, NC"
                focus="Eco-friendly Recycling, Waste Solutions for Residential and Commercial Customers"
                overview="Carolina Recycles, a waste management company in Charlotte, NC, came to Blooming Brands with the goal of expanding their digital presence and attracting more clients for their eco-friendly recycling services. They wanted a website and online strategy that would highlight their environmental focus and increase service bookings."
                challenges="Carolina Recycles needed to differentiate themselves in a competitive waste management market. The challenge was to build a modern digital presence that emphasizes their eco-friendly services and resonates with environmentally-conscious consumers."
                our_solution="Blooming Brands implemented a tailored strategy, starting with a mobile-friendly website showcasing their services and commitment to sustainability. We employed SEO tactics to rank them for relevant local search terms and ran targeted Google Ads to drive traffic. A content strategy was put in place to educate potential clients on waste management and recycling best practices."
                results={[
                  "Within the first quarter, Carolina Recycles experienced a 45% increase in online inquiries and a significant boost in local search rankings. This resulted in higher booking rates for their residential and commercial waste management services.",
                ]}
                dynamicResults={[
                  "45% increase in organic website traffic within 4 months",
                  "25% boost in service inquiries for eco-friendly waste management solutions",
                  "Achieved first-page rankings for search terms like 'recycling services Charlotte NC'",
                  "Social media campaigns generated 15% more engagement on Facebook and Instagram",
                ]}
                conclusion="By developing a strong online presence with SEO and paid advertising strategies, Blooming Brands helped Carolina Recycles position itself as a leading eco-friendly waste management company in Charlotte, driving increased service bookings and client engagement."
              />
            </SwiperSlide>
            <SwiperSlide>
              <PortfolioCard
                subtitle="WordPress Theme"
                title="Captain Ehab Design Studio"
                category="Interior Design Company"
                details="Play is free startup, saas, business, app, and software landing page page that is based on Tailwind. It comes with high-quality design and everything you need"
                date="06, September 2021"
                image="ehab.png"
                client="Ehab Hafez"
                industry="Interior Design"
                location="Toronoto, CA"
                focus="Interior Design &amp; Home Improvements"
                overview="Ehab Hafez an interior designer based in Toronoto Canada needed a website to act as a funnerl to capture new leads."
                challenges="Ehab Hafez is new to the Toronoto market and does not have a brand or business identity yet."
                our_solution="We provided Ehab with a custom Logo, web design and development using WordPress. This option allows Ehab more control over modifying and updating the website content. Upload his new designs, images, and create new posts to promote online."
                results={[
                  "Ehab was able within a very short time to start getting leads online through the website.",
                ]}
                dynamicResults={[
                  "60% growth in website traffic in the first 3 months",
                  "40% increase in design service inquiries and lead generation",
                  "Ranked in the top 3 for key search terms such as 'interior design services Toronto CA'",
                  "Google Ads conversion rate improved by 20%, driving higher ROI on ad spend",
                ]}
                conclusion="Ehab was able to save time on developing the brand identiy, building a new website, setup online ads for his website to generate traffic, and post on social media asking for support."
              />
            </SwiperSlide>
            <SwiperSlide>
              <PortfolioCard
                subtitle="React/Node"
                title="JL Auto Repair - Accelerating Growth for an Auto Repair Shop"
                category="Auto Repair"
                details="JL Auto Repair, owned by Jose Lopez, is a full-service auto repair shop based in Charlotte, NC, focused on providing reliable and affordable services to local customers."
                date="20, November 2021"
                image="jl-auto.png"
                client="JL Auto Repair"
                industry="Automotive Services"
                location="Charlotte, NC"
                focus="Vehicle Maintenance, Engine Repairs, Brake Services, Tire Replacement"
                overview="JL Auto Repair, a local shop owned by Jose Lopez in Charlotte, NC, wanted to attract more customers by increasing their online visibility. They sought a modern, mobile-friendly website that would make it easy for customers to book services and learn more about their offerings."
                challenges="The auto repair market in Charlotte is highly competitive. JL Auto Repair needed to stand out from larger, well-established shops while providing a customer-friendly experience to build trust and loyalty."
                our_solution="Blooming Brands built a sleek, mobile-responsive website optimized for search engines, highlighting JL Auto Repair’s services and unique value proposition. We created targeted Google Ads campaigns to drive local traffic and implemented a review management system to boost the shop’s reputation through positive customer feedback."
                results={[
                  "After launching the new site, JL Auto Repair saw a 40% increase in service bookings within three months. The SEO and Google Ads strategy helped them secure a top spot in local search results, bringing in new customers and improving customer engagement.",
                ]}
                dynamicResults={[
                  "80% surge in website traffic within 2 months",
                  "50% increase in total bookings for repair services and vehicle maintenance",
                  "Secured #1 ranking on Google for 'auto repair Charlotte NC' and 'vehicle maintenance services'",
                  "Social media ad campaigns resulted in a 35% increase in follower growth and a 50% boost in user engagement",
                  "Achieved a 25% reduction in customer acquisition cost through optimized digital ad campaigns",
                ]}
                conclusion="By leveraging a combination of web design, local SEO, and paid ads, Blooming Brands helped JL Auto Repair thrive in a competitive market, enhancing their online presence and driving significant growth in service bookings."
              />
            </SwiperSlide>
          </Swiper>
          <div className="container mx-auto -mt-[25vh] w-full flex flex-row justify-between items-center z-30">
            <div className="prev-arrow" onClick={handlePrev}>
              <button className="text-body-color dark:text-dark-6 hover:text-black flex items-center justify-center text-sm font-medium transition-all">
                <span className="mr-3">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path
                      d="M19.25 10.2437H4.57186L10.4156 4.29687C10.725 3.9875 10.725 3.50625 10.4156 3.19687C10.1062 2.8875 9.62499 2.8875 9.31561 3.19687L2.19999 10.4156C1.89061 10.725 1.89061 11.2063 2.19999 11.5156L9.31561 18.7344C9.45311 18.8719 9.65936 18.975 9.86561 18.975C10.0719 18.975 10.2437 18.9062 10.4156 18.7687C10.725 18.4594 10.725 17.9781 10.4156 17.6688L4.60624 11.7906H19.25C19.6625 11.7906 20.0062 11.4469 20.0062 11.0344C20.0062 10.5875 19.6625 10.2437 19.25 10.2437Z"
                      fill=""
                    />
                  </svg>
                </span>
                Previous Project
              </button>
            </div>
            <div className="next-arrow" onClick={handleNext}>
              <button className="text-body-color dark:text-dark-6 hover:text-black flex items-center justify-center text-sm font-medium transition-all">
                Next Project
                <span className="ml-3">
                  <svg
                    width={22}
                    height={22}
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path
                      d="M19.8 10.45L12.6844 3.23125C12.375 2.92188 11.8937 2.92188 11.5844 3.23125C11.275 3.54063 11.275 4.02188 11.5844 4.33125L17.3594 10.2094H2.74999C2.33749 10.2094 1.99374 10.5531 1.99374 10.9656C1.99374 11.3781 2.33749 11.7563 2.74999 11.7563H17.4281L11.5844 17.7031C11.275 18.0125 11.275 18.4938 11.5844 18.8031C11.7219 18.9406 11.9281 19.0094 12.1344 19.0094C12.3406 19.0094 12.5469 18.9406 12.6844 18.7688L19.8 11.55C20.1094 11.2406 20.1094 10.7594 19.8 10.45Z"
                      fill=""
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio02;
