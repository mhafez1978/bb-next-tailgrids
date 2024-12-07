import React from "react";
import type { Metadata } from "next";
import Login from "@/components/forms/login/Login";

// Metadata for SEO
export const metadata: Metadata = {
  title: "Blooming Brands | Login",
  description:
    "Blooming Brands Blog , should provide our latest news, projects, promotional offers...",
  keywords:
    "website design, website development, online stores, online marketing",
  applicationName: "Blooming Brands",
  authors: [{ name: "Mohamed Hafez" }],
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC",
};

const loginPage = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default loginPage;
