
import ProductCard from "../../../../components/ProductCard";
import EmptyState from "../../../../components/EmptyState";

export default function CategoryList({ products }) {
  if (!products || products.length === 0) {
    return <EmptyState message="هیچ محصولی در این دسته‌بندی یافت نشد." />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}