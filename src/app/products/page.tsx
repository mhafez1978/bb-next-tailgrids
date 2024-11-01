import ProductList from "@/components/responsive/products/ProductList";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-100 mt-[100px]">
      <h1 className="text-3xl font-bold text-center py-8">Our Products</h1>
      <hr className="border-2" />
      <ProductList />
    </main>
  );
}
