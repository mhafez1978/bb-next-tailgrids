"use client";
import Image from "next/image";
import React, { useState } from "react";

const Portfolio = () => {
  const [showCard, setShowCard] = useState("all");

  const handleProject = (category: string) => {
    setShowCard(category);
  };

  return (
    <>
      <section className="pt-20 pb-12 lg:pt-[120px] lg:pb-[90px] dark:bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                <span className="text-black mb-2 block text-lg font-semibold">
                  Our Portfolio
                </span>
                <h2 className="text-dark mb-3 text-3xl leading-[1.208] font-bold sm:text-4xl md:text-[40px]">
                  Recent Projects
                </h2>
                <p className="text-body-color text-base dark:text-dark-6">
                  {/* There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form. */}
                </p>
              </div>
            </div>
          </div>

          {/* <div className="w-full flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <ul className="w-full flex flex-wrap justify-center items-center text-center mb-12 space-x-1">
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("all")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "all"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    All Projects
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("branding")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "branding"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Branding
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("design")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "design"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Website Design
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("marketing")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "marketing"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Online Marketing
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("development")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "development"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Full Stack Development
                  </button>
                </li>
              </ul>
            </div>
          </div> */}
          {/* <div className="w-full flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <ul className="w-full flex flex-wrap justify-center items-center text-center mb-12">
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("all")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "all"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    All Projects
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("branding")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "branding"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Branding
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("design")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "design"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Website Design
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("marketing")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "marketing"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Online Marketing
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("development")}
                    className={`inline-block rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "development"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Full Stack Development
                  </button>
                </li>
              </ul>
            </div>
          </div> */}
          {/* <div className="w-full flex flex-wrap justify-center -mx-4">
            <div className="w-full px-4">
              <ul className="w-full flex flex-wrap justify-center items-center text-center mb-12">
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("all")}
                    className={`inline-block rounded-lg py-2 sm:px-3 lg:px-8 text-center text-base font-semibold transition md:py-3 ${
                      showCard === "all"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    All Projects
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("branding")}
                    className={`inline-block rounded-lg py-2 sm:px-3 lg:px-8 text-center text-base font-semibold transition md:py-3 ${
                      showCard === "branding"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Branding
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("design")}
                    className={`inline-block rounded-lg py-2 sm:px-3 lg:px-8 text-center text-base font-semibold transition md:py-3 ${
                      showCard === "design"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Website Design
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("marketing")}
                    className={`inline-block rounded-lg py-2 sm:px-3 lg:px-8 text-center text-base font-semibold transition md:py-3 ${
                      showCard === "marketing"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Online Marketing
                  </button>
                </li>
                <li className="mb-1">
                  <button
                    onClick={() => handleProject("development")}
                    className={`inline-block rounded-lg py-2 sm:px-3 lg:px-8 text-center text-base font-semibold transition md:py-3 ${
                      showCard === "development"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Full Stack Development
                  </button>
                </li>
              </ul>
            </div>
          </div> */}
          {/* <div className="w-full flex justify-center -mx-4">
            <div className="w-full px-4">
              <ul className="w-full flex flex-col justify-center items-center text-center mb-12 space-y-4">
                <li className="w-full mb-1">
                  <button
                    onClick={() => handleProject("all")}
                    className={`inline-block w-full rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "all"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    All Projects
                  </button>
                </li>
                <li className="w-full mb-1">
                  <button
                    onClick={() => handleProject("branding")}
                    className={`inline-block w-full rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "branding"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Branding
                  </button>
                </li>
                <li className="w-full mb-1">
                  <button
                    onClick={() => handleProject("design")}
                    className={`inline-block w-full rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "design"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Website Design
                  </button>
                </li>
                <li className="w-full mb-1">
                  <button
                    onClick={() => handleProject("marketing")}
                    className={`inline-block w-full rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "marketing"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Online Marketing
                  </button>
                </li>
                <li className="w-full mb-1">
                  <button
                    onClick={() => handleProject("development")}
                    className={`inline-block w-full rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "development"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Full Stack Development
                  </button>
                </li>
              </ul>
            </div>
          </div> */}
          {/* <div className="w-full flex justify-center -mx-4">
            <div className="w-full px-4">
              <ul className="w-full grid grid-cols-2 md:grid-cols-1 gap-4 justify-center items-center text-center mb-12">
                <li className="w-full">
                  <button
                    onClick={() => handleProject("all")}
                    className={`inline-block w-full rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "all"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    All Projects
                  </button>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => handleProject("branding")}
                    className={`inline-block w-full rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "branding"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Branding
                  </button>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => handleProject("design")}
                    className={`inline-block w-full rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "design"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Website Design
                  </button>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => handleProject("marketing")}
                    className={`inline-block w-full rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "marketing"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Online Marketing
                  </button>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => handleProject("development")}
                    className={`inline-block w-full rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "development"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Full Stack Development
                  </button>
                </li>
              </ul>
            </div>
          </div> */}
          <div className="w-full flex justify-center -mx-4">
            <div className="w-full px-4">
              <ul className="w-full grid grid-cols-2 gap-4 justify-center items-center text-center mb-12 lg:flex lg:flex-row">
                <li className="w-full">
                  <button
                    onClick={() => handleProject("all")}
                    className={`inline-block w-full rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "all"
                        ? "activeClasses bg-black text-white" // Keep text black for active
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white" // Hover text stays black
                    }`}
                  >
                    All Projects
                  </button>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => handleProject("branding")}
                    className={`inline-block w-full rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "branding"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Branding
                  </button>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => handleProject("design")}
                    className={`inline-block w-full rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "design"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Website Design
                  </button>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => handleProject("marketing")}
                    className={`inline-block w-full rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "marketing"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Online Marketing
                  </button>
                </li>
                <li className="w-full">
                  <button
                    onClick={() => handleProject("development")}
                    className={`inline-block w-full rounded-lg py-2 px-5 text-center text-base font-semibold transition md:py-3 lg:px-8 ${
                      showCard === "development"
                        ? "activeClasses bg-black text-white"
                        : "inactiveClasses text-body-color dark:text-dark-6 hover:bg-black hover:text-white"
                    }`}
                  >
                    Full Stack
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap -mx-4">
            <PortfolioCard
              ImageHref="/pwwl-small.png"
              category="Marketing"
              title="Prestige Worldwide Limos"
              // button="View Details"
              // buttonHref="https://glittering-biscuit-572c74.netlify.app"
              showCard={showCard}
            />
            <PortfolioCard
              ImageHref="/jl-auto.png"
              category="Marketing"
              title="JL Automotive"
              // button="View Details"
              // buttonHref="https://web.archive.org/web/20160310014421/http://charlotteautowiz.com/"
              showCard={showCard}
            />
            <PortfolioCard
              ImageHref="/carolina-recycles.png"
              category="Branding"
              title="Carolina Recycles"
              // button="View Details"
              // buttonHref="https://www.carolinarecycles.com/"
              showCard={showCard}
            />
            <PortfolioCard
              ImageHref="/hafez-design-studio.png"
              category="Design"
              title="Hafez Design Studio"
              // button="View Details"
              // buttonHref="#"
              showCard={showCard}
            />
            <PortfolioCard
              ImageHref="/cbd.png"
              category="Development"
              title="Charlotte Budget Dumpster"
              // button="View Details"
              // buttonHref="https://web.archive.org/web/20211225204901/https://charlottebudgetdumpster.com/waste-management/"
              showCard={showCard}
            />
            <PortfolioCard
              ImageHref="/portofolio-01.png"
              category="Development"
              title="Portfolio"
              // button="View Details"
              // buttonHref="#"
              showCard={showCard}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;

interface PortfolioCardProps {
  showCard: string;
  category: string;
  ImageHref: string;
  title: string;
  // button?: string;
  // buttonHref?: string;
}

const PortfolioCard = ({
  showCard,
  category,
  ImageHref,
  title,
}: // button,
// buttonHref,
PortfolioCardProps) => {
  return (
    <>
      <div
        className={`w-full px-4 md:w-1/2 xl:w-1/3 ${
          showCard === "all" || showCard === category.toLowerCase()
            ? "block"
            : "hidden"
        }`}
      >
        <div className="relative mb-12">
          <div className="overflow-hidden rounded-[10px] h-[380px] border-2 border-black">
            <Image
              width={500}
              height={300}
              src={ImageHref}
              alt="portfolio"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 mx-7 rounded-lg border-2 border-black bg-white py-[34px] px-3 text-center shadow-portfolio dark:shadow-box-dark">
            <span className="text-black mb-2 block text-sm font-medium">
              {category}
            </span>
            <h3 className="text-dark dark:text-white mb-5 text-xl font-bold">
              {title}
            </h3>
            {/* <a
              target="_blank"
              href={buttonHref}
              className="text-body-color dark:text-dark-6 hover:border-primary hover:bg-black inline-block rounded-md border border-stroke dark:border-dark-3 py-[10px] px-7 text-sm font-medium transition hover:text-white"
            >
              {button}
            </a> */}
          </div>
        </div>
      </div>
    </>
  );
};
