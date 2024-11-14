import type { Metadata } from "next";
import Script from "next/script";

import "./globals.css";
import Header from "@/components/responsive/header/Header";
import Footer from "@/components/responsive/footer/Footer";

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
        <Script
          src="https://cdn.userway.org/widget.js"
          data-account="MmYQdFTvmZ"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
