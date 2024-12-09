import React from "react";
import Register from "@/components/forms/register/Register";
import type { Metadata } from "next";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Blooming Brands | Register",
  description:
    "Blooming Brands Blog , should provide our latest news, projects, promotional offers...",
  keywords:
    "website design, website development, online stores, online marketing",
  applicationName: "Blooming Brands",
  authors: [{ name: "Mohamed Hafez" }],
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC",
};

const registerPage = () => {
  return (
    <div>
      <Register />
    </div>
  );
};

export default registerPage;
