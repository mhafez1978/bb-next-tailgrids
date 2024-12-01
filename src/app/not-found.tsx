import Link from "next/link";
//import Image from "next/image";
import React from "react";
import type { Metadata } from "next";
//import RandomImage from "./util/RandomImage";
import RandomFunnyImage from "./util/RandomFunnyImage";

export const metadata: Metadata = {
  title: "Blooming Brands | Oops, Page not found",
  description:
    "Boston based Website Design, Development, and Online Marketing Agency",
  keywords: "website design, website development, online marketing",
  applicationName: "Blooming Brands", // Provide the app name or remove this field if unnecessary
  authors: [{ name: "Mohamed Hafez" }], // Changed to array of objects
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC a division subsidiary of Nodes Unlimited LLC",
};

const Error = () => {
  return (
    <section className="bg-white py-20 min-h-[800px] flex flex-col justify-center dark:bg-dark lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 md:w-5/12 lg:w-6/12">
            <div className="text-center">
              <RandomFunnyImage />
            </div>
          </div>
          <div className="w-full px-4 md:w-7/12 lg:w-6/12 xl:w-5/12">
            <div className="lg:px-24">
              <div className="mb-4">
                <h1 className="text-red-500 text-8xl font-black">Oops, </h1>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-dark dark:text-white">
                We&apos;re sorry, but we can&apos;t seem to find the Page
                you&apos;re looking for...
              </h3>
              <p className="mb-8 text-lg text-body-color dark:text-dark-6">
                Oops! The page you are looking for does not exist. It might have
                been moved or deleted.
              </p>

              <div className="flex flex-row justify-start items-center gap-4">
                <Link
                  href="/"
                  className="rounded-lg bg-white px-8 py-3 text-base font-semibold text-black shadow-md transition hover:bg-black hover:text-white dark:bg-white/10"
                >
                  Home
                </Link>
                <Link
                  href="/contact"
                  className="rounded-lg bg-white px-8 py-3 text-base font-semibold text-black shadow-md transition hover:bg-black hover:text-white dark:bg-white/10"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
