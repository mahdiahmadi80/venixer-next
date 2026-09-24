"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ media, productName }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!media || media.length === 0) {
    return (
      <div className="w-full md:w-1/2 p-6 md:p-12 bg-gray-50 flex items-center justify-center border-l border-gray-100">
        <div className="w-full aspect-square flex items-center justify-center text-gray-400 bg-gray-200 rounded-lg">
          بدون تصویر
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/2 p-6 flex flex-col gap-4 border-l border-gray-100 bg-white">
      <div className="w-full flex-1 flex items-center justify-center bg-gray-50 rounded-xl p-4">
        <Image
          src={media[activeIndex]?.url}
          alt={`${productName} - تصویر ${activeIndex + 1}`}
          width={800}
          height={800}
          priority
          className="w-full h-auto object-contain max-h-[400px]"
        />
      </div>

      {media.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {media.map((img, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={img._id || index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  isActive
                    ? "border-blue-500 shadow-md opacity-100"
                    : "border-gray-200 hover:border-gray-300 opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img.url}
                  alt={`${productName} - بندانگشتی ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}