// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// interface Product {
//   pid: number;
//   name: string;
//   description: string;
//   pricing: { [key: string]: { monthly: string; annually: string } };
//   product_url: string;
// }

// export default function ProductDetails({ pid }: Product) {
//   const { productId } = useParams();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!productId) return;

//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`/api/get-product/${productId}`, {
//           method: "GET",
//         });

//         const responseText = await response.text();
//         //console.log("Response from API:", responseText);

//         if (!response.ok) {
//           throw new Error(
//             `Failed to fetch product details. Status: ${response.status}`
//           );
//         }

//         const data = JSON.parse(responseText);
//         setProduct(data.product.products.product[0]); // Access the product object as needed
//       } catch (error: unknown) {
//         console.error("Fetch Error:", error);
//         setError(
//           `Error fetching product: ${
//             error instanceof Error ? error.message : "Unknown error"
//           }`
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg py-22 mt-[200px] mb-[200px] min-h-2/3">
//       <h2 className="font-semibold text-2xl mb-4">{product?.name}</h2>
//       <p className="text-gray-600 mb-4">{product?.description}</p>
//       <a
//         href={product?.product_url}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-500 underline mb-4 block"
//       >
//         View Product
//       </a>
//       <div className="text-sm">
//         <p className="font-semibold mb-2">Pricing:</p>
//         {product?.pricing?.USD ? (
//           <ul>
//             <li>Monthly: {product.pricing.USD.monthly} USD</li>
//             <li>Annually: {product.pricing.USD.annually} USD</li>
//           </ul>
//         ) : (
//           <p>Pricing unavailable</p>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";

// interface Product {
//   pid: number;
//   name: string;
//   description: string;
//   pricing: { [key: string]: { monthly: string; annually: string } };
//   product_url: string;
// }

// export default function ProductDetails({
//   productId,
// }: {
//   productId: number | string;
// }) {
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!productId) return;

//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`/api/get-product/${productId}`, {
//           method: "GET",
//         });

//         const responseText = await response.text();

//         if (!response.ok) {
//           throw new Error(
//             `Failed to fetch product details. Status: ${response.status}`
//           );
//         }

//         const data = JSON.parse(responseText);
//         setProduct(data.product.products.product[0]); // Adjust data access as needed
//       } catch (error: unknown) {
//         console.error("Fetch Error:", error);
//         setError(
//           `Error fetching product: ${
//             error instanceof Error ? error.message : "Unknown error"
//           }`
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg py-22 mt-[200px] mb-[200px] min-h-2/3">
//       <h2 className="font-semibold text-2xl mb-4">{product?.name}</h2>
//       <p className="text-gray-600 mb-4">{product?.description}</p>
//       <a
//         href={product?.product_url}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-500 underline mb-4 block"
//       >
//         View Product
//       </a>
//       <div className="text-sm">
//         <p className="font-semibold mb-2">Pricing:</p>
//         {product?.pricing?.USD ? (
//           <ul>
//             <li>Monthly: {product.pricing.USD.monthly} USD</li>
//             <li>Annually: {product.pricing.USD.annually} USD</li>
//           </ul>
//         ) : (
//           <p>Pricing unavailable</p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";

interface Product {
  pid: number;
  name: string;
  description: string;
  pricing: { [key: string]: { monthly: string; annually: string } };
  product_url: string;
}

export default function ProductDetails({
  productId,
}: {
  productId: number | string;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);

        // Fetch product details
        const response = await fetch(`/api/get-product/${productId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch product details. Status: ${response.status}`
          );
        }

        const data = await response.json();

        // Validate and set product
        if (data?.product?.products?.product?.length) {
          setProduct(data.product.products.product[0]); // Adjust access path as needed
        } else {
          throw new Error("Invalid product data structure.");
        }
      } catch (error: unknown) {
        console.error("Fetch Error:", error);
        setError(
          `Error fetching product: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg py-22 mt-8 mb-[200px] min-h-2/3">
      {product ? (
        <>
          <h2 className="font-semibold text-2xl mb-4">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <a
            href={product.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline mb-4 block"
          >
            View Product
          </a>
          <div className="text-sm">
            <p className="font-semibold mb-2">Pricing:</p>
            {product.pricing?.USD ? (
              <ul>
                <li>Monthly: {product.pricing.USD.monthly} USD</li>
                <li>Annually: {product.pricing.USD.annually} USD</li>
              </ul>
            ) : (
              <p>Pricing unavailable</p>
            )}
          </div>
        </>
      ) : (
        <p>Product details not available.</p>
      )}
    </div>
  );
}
