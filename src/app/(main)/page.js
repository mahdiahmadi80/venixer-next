import { Suspense } from "react";
import Link from "next/link";
import CategoriesSection from "./_components/home/CategoriesSection";
import DiscountedSection from "./_components/home/DiscountedSection";
import CategoryProductsSection from "./_components/home/CategoryProductsSection";
import BrandsSection from "./_components/home/BrandsSection";

export const metadata = {
  title: "فروشگاه ونیکسر",
};

const ProductSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="h-72 bg-gray-200 animate-pulse rounded-2xl"></div>
    ))}
  </div>
);

const CategorySkeleton = () => (
  <div className="flex gap-6 overflow-x-hidden pb-4">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="w-16 h-16 rounded-full bg-gray-200 animate-pulse"></div>
    ))}
  </div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">

      <section className="max-w-7xl mx-auto px-4 pt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">دسته‌بندی‌های سایت</h2>
        <Suspense fallback={<CategorySkeleton />}>
          <CategoriesSection />
        </Suspense>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-12 bg-red-50 rounded-2xl p-6 border border-red-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600">پیشنهادات شگفت‌انگیز</h2>
          <Link href="/products?discount=true" className="text-sm text-red-500 hover:text-red-700">مشاهده همه &larr;</Link>
        </div>
        <Suspense fallback={<ProductSkeleton />}>
          <DiscountedSection />
        </Suspense>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">جدیدترین گوشی‌های موبایل</h2>
          <Link href="/category/mobile" className="text-sm text-blue-600 hover:text-blue-800">مشاهده همه &larr;</Link>
        </div>
        <Suspense fallback={<ProductSkeleton />}>
          <CategoryProductsSection categoryEnName="mobile" />
        </Suspense>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">لپ‌تاپ</h2>
          <Link href="/category/laptop" className="text-sm text-blue-600 hover:text-blue-800">مشاهده همه &larr;</Link>
        </div>
        <Suspense fallback={<ProductSkeleton />}>
          <CategoryProductsSection categoryEnName="laptop" />
        </Suspense>
      </section>

      <section className="max-w-7xl mx-auto px-4 mt-16 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">برندهای معتبر</h2>
        <Suspense fallback={<div className="h-24 bg-gray-200 animate-pulse rounded-2xl"></div>}>
          <BrandsSection />
        </Suspense>
      </section>

    </div>
  );
}