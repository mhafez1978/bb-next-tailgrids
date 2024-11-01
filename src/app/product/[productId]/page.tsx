"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Product {
  pid: number;
  name: string;
  description: string;
  pricing: { [key: string]: { monthly: string; annually: string } };
  product_url: string;
}

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      console.log("Fetching product with ID:", productId);
      try {
        setLoading(true);
        const response = await fetch(`/api/get-product/${productId}`, {
          method: "POST",
        });

        if (!response.ok) {
          const { error } = await response.json();
          console.error("API Error:", error);
          throw new Error(error || "Failed to fetch product details.");
        }

        const data = await response.json();
        console.log("Product data received:", data);

        // Access the product details within the nested structure
        const productData = data.products?.product[0];
        if (productData) {
          setProduct(productData);
        } else {
          throw new Error("Product not found");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(`Error fetching product: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading)
    return (
      <div className="w-screen min-h-2/3 flex flex-col iems-center justify-center mt-[200px] mb-[200px]">
        <div className="container mx-auto">
          <h1 className="text-center">Loading ....</h1>
        </div>
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg mt-[200px] mb-[200px]">
      <h2 className="font-semibold text-2xl mb-4">{product?.name}</h2>
      <p className="text-gray-600 mb-4">{product?.description}</p>
      <a
        href={product?.product_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline mb-4 block"
      >
        View Product
      </a>
      <div className="text-sm">
        <p className="font-semibold mb-2">Pricing:</p>
        {product?.pricing?.USD ? (
          <ul>
            <li>Monthly: {product.pricing.USD.monthly} USD</li>
            <li>Annually: {product.pricing.USD.annually} USD</li>
          </ul>
        ) : (
          <p>Pricing unavailable</p>
        )}
      </div>
    </div>
  );
}
