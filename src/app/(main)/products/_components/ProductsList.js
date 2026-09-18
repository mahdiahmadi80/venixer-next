import ProductCard from "../../../components/ProductCard";
import EmptyState from "../../../components/EmptyState";

export default function ProductsList({ products }) {
  if (!products || products.length === 0) {
    return <EmptyState message="هیچ محصولی در فروشگاه ثبت نشده است." />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}