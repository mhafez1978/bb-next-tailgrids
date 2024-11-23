import { createSecureHeaders } from "next-secure-headers";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.tailgrids.com",
        port: "",
        pathname: "*/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "*/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "*/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co", // Allow placeholder image domain
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.blooming-brands.com", // Replace with your actual WordPress domain
        pathname: "*/**", // Path to your WordPress images
      },
      {
        protocol: "https",
        hostname: "robohash.org", // RoboHash for author avatars
        pathname: "/**", // Allow all RoboHash images
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com", // Gravatar for author avatars
        pathname: "/avatar/**", // Allow all Gravatar images
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", // Gravatar for author avatars
        pathname: "/**", // Allow all placeholder images
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc", // Gravatar for author avatars
        pathname: "/**", // Allow all Pravatar images
      },
      {
        protocol: "https",
        hostname: "picsum.photos", // Gravatar for author avatars
        pathname: "/**", // Allow all Pravatar images
      },
      {
        protocol: "https",
        hostname: "media4.giphy.com", // Gravatar for author avatars
        pathname: "/**", // Allow all Pravatar images
      },
      {
        protocol: "https",
        hostname: "media3.giphy.com", // Gravatar for author avatars
        pathname: "/**", // Allow all Pravatar images
      },
      {
        protocol: "https",
        hostname: "media2.giphy.com", // Gravatar for author avatars
        pathname: "/**", // Allow all Pravatar images
      },
      {
        protocol: "https",
        hostname: "media1.giphy.com", // Gravatar for author avatars
        pathname: "/**", // Allow all Pravatar images
      },
      {
        protocol: "https",
        hostname: "media.giphy.com", // Gravatar for author avatars
        pathname: "/**", // Allow all Pravatar images
      },
      {
        protocol: "https",
        hostname: "media0.giphy.com", // Gravatar for author avatars
        pathname: "/**", // Allow all Pravatar images
      },
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          ...createSecureHeaders({
            // HSTS Preload: https://hstspreload.org/
            forceHTTPSRedirect: [
              true,
              { maxAge: 63072000, includeSubDomains: true, preload: true },
            ],
          }),
        ],
      },
    ];
  },
};

export default nextConfig;
