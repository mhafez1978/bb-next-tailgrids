// "use client";
// import { useEffect, useState } from "react";

// interface Product {
//   pid: number;
//   name: string;
//   description: string;
//   pricing: {
//     [key: string]: { monthly: string; annually: string; [key: string]: any };
//   };
//   product_url: string;
// }

// export default function ProductList() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("/api/get-products");

//         if (!response.ok) {
//           const { error } = await response.json();
//           throw new Error(error || "Failed to fetch products.");
//         }

//         const data = await response.json();
//         setProducts(data.products.products.product || []);
//       } catch (error: any) {
//         setError(`Error fetching products: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) return <div className="text-center p-4">Loading...</div>;
//   if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

//   return (
//     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {products.map((product) => (
//         <div
//           key={product.pid}
//           className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-200 hover:scale-105"
//           style={{ color: "black", marginTop: "20px" }}
//         >
//           <h2 className="font-semibold text-xl mb-2">{product.name}</h2>
//           <p className="text-gray-600 mb-4">{product.description}</p>
//           <a
//             href={product.product_url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-blue-500 underline mb-4 block"
//           >
//             View Product
//           </a>
//           <div className="text-sm">
//             <p className="font-semibold mb-2">Pricing:</p>
//             {product.pricing ? (
//               <ul className="list-disc ml-4">
//                 <li>Monthly: {product.pricing.USD?.monthly} USD</li>
//                 <li>Annually: {product.pricing.USD?.annually} USD</li>
//               </ul>
//             ) : (
//               <p>Pricing unavailable</p>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface CurrencyPricing {
  prefix: string;
  suffix: string;
  msetupfee: string;
  qsetupfee: string;
  ssetupfee: string;
  asetupfee: string;
  bsetupfee: string;
  tsetupfee: string;
  monthly: string;
  quarterly: string;
  semiannually: string;
  annually: string;
  biennially: string;
  triennially: string;
}

interface Product {
  pid: number;
  name: string;
  description: string;
  pricing: {
    [currencyCode: string]: CurrencyPricing;
  };
  product_url: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/get-products");

        if (!response.ok) {
          const { error } = await response.json();
          throw new Error(error || "Failed to fetch products.");
        }

        const data = await response.json();
        setProducts(data.products.products.product || []);
      } catch (error) {
        setError(`Error fetching products: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Link key={product.pid} href={`/product/${product.pid}`}>
          <div
            className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-200 hover:scale-105 cursor-pointer"
            style={{ color: "black", marginTop: "20px" }}
          >
            <h2 className="font-semibold text-xl mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="text-sm">
              <p className="font-semibold mb-2">Pricing:</p>
              {product.pricing ? (
                <ul className="list-disc ml-4">
                  <li>Monthly: {product.pricing.USD?.monthly} USD</li>
                  <li>Annually: {product.pricing.USD?.annually} USD</li>
                </ul>
              ) : (
                <p>Pricing unavailable</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
