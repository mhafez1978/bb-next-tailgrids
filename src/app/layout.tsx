import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/responsive/header/Header";
import Footer from "@/components/responsive/footer/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blooming Brands | ",
  description:
    "Boston-based Website Design, Development, and Online Marketing Agency",
  keywords:
    "website design, website development, online stores, online marketing",
  applicationName: "Blooming Brands",
  authors: [{ name: "Mohamed Hafez" }],
  creator: "Blooming Brands Web Development Team",
  publisher:
    "Blooming Brands LLC, a division subsidiary of Nodes Unlimited LLC",
};

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Additional meta tags or non-blocking head scripts can go here */}
        <meta name="google-adsense-account" content="ca-pub-1266489978722809" />
      </head>
      <body className="relative">
        <Header darkLogo="/dark-logo.png" />
        <div className="pt-[64px]">{children}</div>
        <Footer />

        {/* AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          strategy="afterInteractive"
        />

        {/* AdSense Ad Slot */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-1266489978722809" // Replace with your AdSense client ID
          data-ad-slot="8088782196" // Replace with your AdSense ad slot ID
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>

        {/* Initialize AdSense */}
        <Script id="adsbygoogle-init" strategy="afterInteractive">
          {`
            (adsbygoogle = window.adsbygoogle || []).push({});
          `}
        </Script>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7DSB7Y9V9X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7DSB7Y9V9X');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-N8472QG7"
          strategy="afterInteractive"
        />

        {/* UserWay Accessibility Widget */}
        <Script
          src="https://cdn.userway.org/widget.js"
          data-account="MmYQdFTvmZ"
          strategy="afterInteractive"
        />

        {/* GTM NoScript Fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N8472QG7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
