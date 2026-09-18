import Image from "next/image";

export default function ProductGallery({ media, productName }) {
  return (
    <div className="w-full md:w-1/2 p-6 md:p-12 bg-gray-50 flex items-center justify-center">
      {media && media.length > 0 ? (
        <Image
          src={media[0]?.url}
          alt={productName}
          width={800}
          height={800}
          loading="eager"
           className="w-full h-auto object-contain max-h-[400px] rounded-lg shadow-sm"
        />
      ) : (
        <div className="w-full aspect-square flex items-center justify-center text-gray-400 bg-gray-200 rounded-lg">
          بدون تصویر
        </div>
      )}
    </div>
  );
}