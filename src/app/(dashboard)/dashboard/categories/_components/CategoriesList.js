"use client";

import { useTransition } from "react";
import { deleteCategoryAction } from "@/lib/actions/category.actions";
import Link from "next/link";
import Image from "next/image";

export default function CategoriesList({ categories }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id, name) => {
    if (window.confirm(`آیا از حذف دسته‌بندی "${name}" مطمئن هستید؟`)) {
      startTransition(async () => {
        const res = await deleteCategoryAction(id);
        if (res?.error) {
          alert(res.error);
        }
      });
    }
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500 font-medium">
        هیچ دسته‌بندی ثبت نشده است.
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
              <th className="px-6 py-4">نام فارسی</th>
              <th className="px-6 py-4 text-left">نام انگلیسی</th>
              <th className="px-6 py-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((category) => (
              <tr key={category._id} className="hover:bg-gray-50 transition-colors">

                <td className="px-6 py-3">
                  {category.image ? (
                    <Image
                      width={64} height={64}
                      src={category.image}
                      alt={category.name}
                       loading="eager"
                      className="w-10 h-10 rounded-lg object-cover border border-gray-200 bg-white"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center text-gray-400 text-[10px]">
                      بدون عکس
                    </div>
                  )}
                </td>

                <td className="px-6 py-3 font-medium text-gray-800">{category.name}</td>
                <td className="px-6 py-3 text-left text-gray-500 font-mono" dir="ltr">{category.en_name}</td>

                <td className="px-6 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      href={`/dashboard/categories?edit=${category._id}`}
                      className="text-blue-500 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition-colors text-xs font-medium"
                    >
                      ویرایش
                    </Link>

                    <button
                      onClick={() => handleDelete(category._id, category.name)}
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