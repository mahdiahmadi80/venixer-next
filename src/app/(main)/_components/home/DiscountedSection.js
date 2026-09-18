import ProductCard from "../../../components/ProductCard";

export default async function DiscountedSection() {
  const res = await fetch("http://localhost:4000/api/product", { cache: "no-store" });
  const data = res.ok ? await res.json() : { data: [] };

  const discounted = (data.data || []).filter(p => p.sale > 0);

  if (discounted.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {discounted.slice(0, 4).map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}