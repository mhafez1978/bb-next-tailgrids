// // import type { Metadata } from "next";
// // import Script from "next/script";
// // import { GoogleAnalytics } from "@next/third-parties/google";
// // import { GoogleTagManager } from "@next/third-parties/google";

// // import Header from "@/components/responsive/header/Header";
// // import Footer from "@/components/responsive/footer/Footer";
// // import "./globals.css";
// // import Adsense from "@/components/adsense/Adsense";

// // export const metadata: Metadata = {
// //   title: "Blooming Brands | ",
// //   description:
// //     "Boston based Website Design, Development, and Online Marketing Agency",
// //   keywords:
// //     "website design, website development, online stores, online marketing",
// //   applicationName: "Blooming Brands", // Provide the app name or remove this field if unnecessary
// //   authors: [{ name: "Mohamed Hafez" }], // Changed to array of objects
// //   creator: "Blooming Brands Web Development Team",
// //   publisher: "Blooming Brands LLC a division subsidiary of Nodes Unlimited LLC",
// // };

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <html lang="en" className="scroll-smooth">
// //       <head>
// //         <Adsense publisher_id="1266489978722809" />
// //       </head>
// //       <body>
// //         <Header logo="/Blooming_Brands_Logo.png" darkLogo="/dark-logo.png" />
// //         {children}
// //         <Footer />
// //         <noscript>
// //           <iframe
// //             src="https://www.googletagmanager.com/ns.html?id=GTM-N8472QG7"
// //             height="0"
// //             width="0"
// //             style={{ display: "none", visibility: "hidden" }}
// //           ></iframe>
// //         </noscript>
// //         <Script
// //           src="https://cdn.userway.org/widget.js"
// //           data-account="MmYQdFTvmZ"
// //           strategy="beforeInteractive"
// //         />

// //         <Script id="adsbygoogle" async strategy="afterInteractive">
// //           (adsbygoogle = window.adsbygoogle || []).push({});
// //         </Script>

// //         {/* G-7DSB7Y9V9X */}
// //         <GoogleAnalytics gaId="G-7DSB7Y9V9X" />
// //         {/* GTM-N8472QG7 */}
// //         <GoogleTagManager gtmId="GTM-N8472QG7" />
// //         {/* AW-16774657503 */}
// //         <GoogleTagManager gtmId="AW-16774657503" />
// //         <GoogleTagManager gtmId="GT-NB9WLNG3" />
// //         {/* GT-NB9WLNG3 */}
// //       </body>
// //     </html>
// //   );
// // }

// import type { Metadata } from "next";
// import Script from "next/script";
// import Header from "@/components/responsive/header/Header";
// import Footer from "@/components/responsive/footer/Footer";
// import Adsense from "@/components/adsense/Adsense";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "Blooming Brands | ",
//   description:
//     "Boston-based Website Design, Development, and Online Marketing Agency",
//   keywords:
//     "website design, website development, online stores, online marketing",
//   applicationName: "Blooming Brands",
//   authors: [{ name: "Mohamed Hafez" }],
//   creator: "Blooming Brands Web Development Team",
//   publisher: "Blooming Brands LLC a division subsidiary of Nodes Unlimited LLC",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className="scroll-smooth">
//       <head />
//       <body>
//         <Header logo="/Blooming_Brands_Logo.png" darkLogo="/dark-logo.png" />
//         {children}
//         <Footer />

//         {/* UserWay Widget */}
//         <Script
//           src="https://cdn.userway.org/widget.js"
//           data-account="MmYQdFTvmZ"
//           strategy="afterInteractive"
//         />

//         {/* Google AdSense */}
//         <Script
//           async
//           src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
//           strategy="afterInteractive"
//         />
//         <Adsense publisher_id="1266489978722809" />

//         {/* Google Analytics */}
//         <Script id="google-analytics" strategy="afterInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', 'G-7DSB7Y9V9X');
//           `}
//         </Script>

//         {/* Google Tag Manager */}
//         <Script
//           id="google-tag-manager"
//           src="https://www.googletagmanager.com/gtm.js?id=GTM-N8472QG7"
//           strategy="afterInteractive"
//         />
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/responsive/header/Header";
import Footer from "@/components/responsive/footer/Footer";
import "./globals.css";
import ChatButton from "@/components/ai/ChatButton";

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
      </head>
      <body>
        <Header logo="/Blooming_Brands_Logo.png" darkLogo="/dark-logo.png" />
        <div className="mt-[70px]">{children}</div>
        <div className="">
          <ChatButton />
        </div>
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
