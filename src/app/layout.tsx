import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GoogleTagManager } from "@next/third-parties/google";

import Header from "@/components/responsive/header/Header";
import Footer from "@/components/responsive/footer/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blooming Brands | ",
  description:
    "Boston based Website Design, Development, and Online Marketing Agency",
  keywords:
    "website design, website development, online stores, online marketing",
  applicationName: "Blooming Brands", // Provide the app name or remove this field if unnecessary
  authors: [{ name: "Mohamed Hafez" }], // Changed to array of objects
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC a division subsidiary of Nodes Unlimited LLC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Header logo="/Blooming_Brands_Logo.png" darkLogo="/dark-logo.png" />
        {children}
        <Footer />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N8472QG7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Script
          src="https://cdn.userway.org/widget.js"
          data-account="MmYQdFTvmZ"
          strategy="beforeInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7DSB7Y9V9X"
          strategy="beforeInteractive"
        />
        <Script
          id="ga-script"
          strategy="beforeInteractive"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-N8472QG7"
        />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1266489978722809"
          strategy="beforeInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-16774657503"
          strategy="beforeInteractive"
        />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1266489978722809"
          strategy="beforeInteractive"
        />
        <GoogleAnalytics gaId="G-7DSB7Y9V9X" />
        <GoogleTagManager gtmId="GTM-N8472QG7" />
      </body>
    </html>
  );
}
