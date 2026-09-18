import Image from "next/image";
import Link from "next/link";

export default async function CategoriesSection() {
  const res = await fetch("http://localhost:4000/api/category", { cache: "no-store" });
  const data = res.ok ? await res.json() : { data: [] };
  const categories = data.data || [];

  if (categories.length === 0) return null;

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {categories.map((category) => (
        <Link key={category._id} href={`/category/${category.en_name}`} className="flex flex-col items-center gap-3 min-w-[100px] text-black hover:text-blue-600 transition-colors">
          <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center overflow-hidden">
            {category.image ? <Image src={category.image} alt={category.name} width={64} height={64} className="w-full h-full object-cover" /> : <span className="text-xs text-gray-400">بدون عکس</span>}
          </div>
          <span className="text-sm font-medium">{category.name}</span>
        </Link>
      ))}
    </div>
  );
}