import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const finalPrice = product.sale > 0
    ? product.price - (product.price * (product.sale / 100))
    : product.price;

  return (
    <Link
      href={`/products/${product._id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col transition-all hover:shadow-lg hover:-translate-y-1 group"
    >
      <div className="aspect-square bg-gray-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
        {product.media && product.media.length > 0 ? (
          <Image
            src={product.media[0]?.url || "/placeholder-image.jpg"}
            alt={product.name}
            loading="eager"
            width={400}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-gray-400">بدون تصویر</span>
        )}

        {product.sale > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm">
            {product.sale}%
          </span>
        )}
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex gap-2 text-xs text-gray-400 mb-2">
          {product.category && <span>{product.category.name}</span>}
          {product.category && product.brand && <span>•</span>}
          {product.brand && <span>{product.brand.name}</span>}
        </div>

        <h3 className="font-semibold text-gray-800 mb-4 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        <div className="mt-auto flex justify-between items-end border-t border-gray-50 pt-3">
          <div className="flex flex-col">
            <span className="text-blue-600 font-bold text-lg">
              {finalPrice.toLocaleString()} <span className="text-xs text-gray-500 font-normal">تومان</span>
            </span>
          </div>

          {product.sale > 0 && (
            <span className="text-gray-400 line-through text-xs mb-1">
              {product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}