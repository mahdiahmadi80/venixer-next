"use client";

import { useTransition } from "react";
import { deleteBrandAction } from "@/lib/actions/brand.actions";
import Link from "next/link";
import Image from "next/image";

export default function BrandsList({ brands }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id, name) => {
    if (window.confirm(`آیا از حذف برند "${name}" مطمئن هستید؟`)) {
      startTransition(async () => {
        const res = await deleteBrandAction(id);
        if (res?.error) {
          alert(res.error);
        }
      });
    }
  };

  if (!brands || brands.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500 font-medium">
        هیچ برندی ثبت نشده است.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right text-gray-600">
          <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-semibold">
            <tr>
              <th className="px-6 py-4">لوگو</th>
              <th className="px-6 py-4">نام برند</th>
              <th className="px-6 py-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {brands.map((brand) => (
              <tr key={brand._id} className="hover:bg-gray-50 transition-colors">

                <td className="px-6 py-3">
                  {brand.logo ? (
                    <Image
                      width={64} height={64}
                      src={brand.logo}
                      alt={brand.name}
                      loading="eager"
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 bg-white"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-[10px]">
                      بدون عکس
                    </div>
                  )}
                </td>

                <td className="px-6 py-3 font-medium text-gray-800">{brand.name}</td>

                <td className="px-6 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/dashboard/brands?edit=${brand._id}`}
                      className="text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors text-xs font-medium"
                    >
                      ویرایش
                    </Link>

                    {/* دکمه حذف */}
                    <button
                      onClick={() => handleDelete(brand._id, brand.name)}
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