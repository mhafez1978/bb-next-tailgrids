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
        pathname: "/**", // Allow all Gravatar images
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc", // Gravatar for author avatars
        pathname: "/**", // Allow all Gravatar images
      },
    ],
  },
};

export default nextConfig;
