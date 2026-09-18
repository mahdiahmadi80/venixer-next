import ProductsHeader from "./_components/ProductsHeader";
import ProductsList from "./_components/ProductsList";

export const metadata = {
  title: "لیست محصولات | فروشگاه ونیکسر",
  description: "مشاهده تمامی محصولات ",
};

async function getAllProducts() {
  try {
    const res = await fetch("http://localhost:4000/api/product", {
      cache: "force-cache", 
      next: { revalidate: 3600 }, 
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("خطا در دریافت لیست محصولات:", error);
    return [];
  }
}

export default async function ProductsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const isDiscounted = resolvedParams.discount === "true";

  let products = await getAllProducts();

  if (isDiscounted) {
    products = products.filter((product) => product.sale > 0);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <ProductsHeader count={products.length} />
        <ProductsList products={products} />        
      </div>
    </div>
  );
}