import Image from "next/image";

export default async function BrandsSection() {
  const res = await fetch("http://localhost:4000/api/brand", { cache: "no-store" });
  const data = res.ok ? await res.json() : { data: [] };
  const brands = data.data || [];

  if (brands.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {brands.map((brand) => (
        <div key={brand._id} className="w-24 h-24 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-2 hover:shadow-md transition-shadow">
          {brand.logo ? <Image src={brand.logo} alt={brand.name} width={64}  height={64} className="w-52 h-52 object-contain mb-2" /> : <div className="w-10 h-10 bg-gray-100 rounded-full mb-2"></div>}
          <span className="text-xs text-gray-600 font-medium" dir="ltr">{brand.en_name}</span>
        </div>
      ))}
    </div>
  );
}