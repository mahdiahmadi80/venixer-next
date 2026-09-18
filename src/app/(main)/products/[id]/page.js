import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "./_components/ProductGallery";
import ProductInfo from "./_components/ProductInfo";

async function getProduct(id) {
  try {
    const res = await fetch(`http://localhost:4000/api/product/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    const json = await res.json();
    const product = Array.isArray(json?.data) ? json.data[0] : (json?.data || json?.product || json);
    return product?.name ? product : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) return { title: "محصول یافت نشد" };

  return {
    title: `${product.name} | فروشگاه ونیکسر`,
    description: `خرید اینترنتی ${product.name} با بهترین قیمت.`,
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-6 text-gray-500 hover:text-blue-600 transition-colors font-medium"
        >
          بازگشت به صفحه اصلی
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          <ProductGallery media={product.media} productName={product.name} />
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}
