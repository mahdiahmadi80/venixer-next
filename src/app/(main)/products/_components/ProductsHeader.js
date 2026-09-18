
export default function ProductsHeader({ count }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-800">تمامی محصولات</h1>
      <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full font-medium">
        {count} محصول
      </span>
    </div>
  );
}