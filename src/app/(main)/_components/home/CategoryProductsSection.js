import ProductCard from "../../../components/ProductCard";
export default async function CategoryProductsSection({ categoryEnName }) {
  const res = await fetch("http://localhost:4000/api/product", { cache: "no-store" });
  const data = res.ok ? await res.json() : { data: [] };
  
  const categoryProducts = (data.data || []).filter(
    p => p.category?.en_name === categoryEnName
  );

  if (categoryProducts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {categoryProducts.slice(0, 4).map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}