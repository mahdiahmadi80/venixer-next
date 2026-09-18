
export default function CategoryHeader({ categoryName, count }) {
  return (
    <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
      <h1 className="text-2xl font-bold text-gray-800">
        محصولات دسته‌بندی
      </h1>
      <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full font-medium">
        {count} محصول
      </span>
    </div>
  );
}