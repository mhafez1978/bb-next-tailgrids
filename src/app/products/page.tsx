import type { Metadata } from "next";
import ProductList from "@/components/responsive/products/ProductList";

export const metadata: Metadata = {
  title: "Blooming Brands | Partner Products",
  description:
    "Products we promote for our partners, We're a Boston based Website Design, Development, and Online Marketing Agency.",
  keywords:
    "website design, website development, online stores, online marketing",
  applicationName: "Blooming Brands", // Provide the app name or remove this field if unnecessary
  authors: [{ name: "Mohamed Hafez" }], // Changed to array of objects
  creator: "Blooming Brands Web Development Team",
  publisher: "Blooming Brands LLC a division subsidiary of Nodes Unlimited LLC",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center py-8">Our Products</h1>
      <hr className="border-2" />
      <ProductList />
    </main>
  );
}
