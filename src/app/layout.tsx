import type { Metadata } from "next";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GoogleTagManager } from "@next/third-parties/google";

import Header from "@/components/responsive/header/Header";
import Footer from "@/components/responsive/footer/Footer";
import "./globals.css";
import Adsense from "@/components/adsense/Adsense";
import { AuthProvider } from "@/app/context/AuthContext";

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
      <head>
        <Adsense publisher_id="1266489978722809" />
      </head>
      <body>
        <AuthProvider>
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

          <Script id="adsbygoogle" async strategy="afterInteractive">
            (adsbygoogle = window.adsbygoogle || []).push({});
          </Script>

          {/* G-7DSB7Y9V9X */}
          <GoogleAnalytics gaId="G-7DSB7Y9V9X" />
          {/* GTM-N8472QG7 */}
          <GoogleTagManager gtmId="GTM-N8472QG7" />
          {/* AW-16774657503 */}
          <GoogleTagManager gtmId="AW-16774657503" />
          <GoogleTagManager gtmId="GT-NB9WLNG3" />
          {/* GT-NB9WLNG3 */}
        </AuthProvider>
      </body>
    </html>
  );
}
