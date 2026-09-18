"use client";

import { useTransition } from "react";
import { deleteProductAction } from "@/lib/actions/product.actions";
import Link from "next/link";
import Image from "next/image";

export default function ProductsList({ products }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id, name) => {
    if (window.confirm(`آیا از حذف محصول "${name}" مطمئن هستید؟`)) {
      startTransition(async () => {
        const res = await deleteProductAction(id);
        if (res?.error) {
          alert(res.error);
        }
      });
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500 font-medium">
        هیچ محصولی ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right text-gray-600">
          <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">تصویر</th>
              <th className="px-6 py-4">نام محصول</th>
              <th className="px-6 py-4">دسته‌بندی</th>
              <th className="px-6 py-4">قیمت</th>
              <th className="px-6 py-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">

                <td className="px-6 py-3">
                  {product.media && product.media.length > 0 ? (
                    <Image
                      width={64} height={64}
                      src={product.media[0]?.url || "/placeholder-image.jpg"}
                      alt={product.name}
                       loading="eager"
                      className="w-10 h-10 rounded-md object-cover border border-gray-200 bg-white"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center text-gray-400 text-[10px]">
                      بدون عکس
                    </div>
                  )}
                </td>

                <td className="px-6 py-3 font-medium text-gray-800 line-clamp-2 max-w-[200px] mt-1 border-none">
                  {product.name}
                </td>

                <td className="px-6 py-3">
                  {product.category?.name || "-"}
                </td>

                <td className="px-6 py-3">
                  {product.price.toLocaleString()} تومان
                </td>

                <td className="px-6 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/dashboard/products?edit=${product._id}`}
                      className="text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors text-xs font-medium"
                    >
                      ویرایش
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id, product.name)}
                      disabled={isPending}
                      className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition-colors disabled:opacity-50 text-xs font-medium"
                    >
                      {isPending ? "..." : "حذف"}
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}