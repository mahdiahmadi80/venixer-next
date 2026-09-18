
import CategoryHeader from "./_components/CategoryHeader";
import CategoryList from "./_components/CategoryList";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return {
    title: `محصولات دسته‌بندی ${resolvedParams.categoryName} | فروشگاه ونیکسر`,
    description: `خرید بهترین محصولات از دسته‌بندی ${resolvedParams.categoryName}`,
  };
}

async function getCategoryProducts(categoryName) {
  try {
    const res = await fetch("http://localhost:4000/api/product", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    
    const allProducts = data.data || [];
    return allProducts.filter(p => p.category?.en_name === categoryName);
  } catch (error) {
    return [];
  }
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const { categoryName } = resolvedParams;
  
  const products = await getCategoryProducts(categoryName);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <CategoryHeader categoryName={categoryName} count={products.length} />        
        <CategoryList products={products} />

      </div>
    </div>
  );
}