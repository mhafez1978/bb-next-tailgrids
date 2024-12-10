import type { Metadata } from "next";
import ProductDetails from "@/app/product/[productId]/ProductComponent";

type Props = {
  params: {
    productId: string | number;
  };
};

// Helper function to fetch product details
const fetchProductDetails = async (productId: string | number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/get-product/${productId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch product details for metadata. Status: ${response.status}`
    );
  }

  const data = await response.json();
  return data.product.products.product[0]; // Adjust based on your API response structure
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  try {
    const product = await fetchProductDetails(params.productId);
    return {
      title: `Product ${product.name}`,
      description:
        product.description ||
        `Details and pricing for product ${params.productId}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: `Product ${params.productId}`,
      description: `Details and pricing for product ${params.productId}`,
    };
  }
};

export default function ProductPage({ params }: Props) {
  return (
    <div className="w-screen min-h-[50vh]">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold px-4">Product Details Page</h1>
        <ProductDetails productId={params.productId} />
      </div>
    </div>
  );
}
