"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createProductAction, updateProductAction, fetchMediaList } from "@/lib/actions/product.actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductForm({ productToEdit, categories, brands }) {
  const formRef = useRef(null);
  const router = useRouter();

  const isEditMode = !!productToEdit;

  const initialMedia = isEditMode && productToEdit?.media?.length
    ? productToEdit.media.map((m) => (typeof m === "string" ? m : m._id))
    : [];
  const [selectedMedia, setSelectedMedia] = useState(initialMedia);

  const { data: mediaList = [], isLoading: mediaLoading } = useQuery({
    queryKey: ["media"],
    queryFn: fetchMediaList,
  });

  const actionToRun = isEditMode
    ? updateProductAction.bind(null, productToEdit._id)
    : createProductAction;

  const [state, formAction, isPending] = useActionState(actionToRun, {
    success: null, error: null, message: null,
  });

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      setSelectedMedia([]);
      if (isEditMode) {
        router.push("/dashboard/products");
      }
    }
  }, [state?.success, isEditMode, router]);

  const toggleMedia = (id) => {
    setSelectedMedia((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-black mb-6">
        {isEditMode ? `ویرایش محصول: ${productToEdit.name}` : "ثبت محصول جدید"}
      </h2>

      {state?.error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">{state.error}</div>}
      {state?.success && <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg">{state.message}</div>}

      <form key={productToEdit?._id || "new"} ref={formRef} action={formAction} className="space-y-4">

        <div>
          <label className="block text-black text-sm font-medium mb-1">نام محصول</label>
          <input
            type="text"
            name="name"
            defaultValue={productToEdit?.name || ""}
            required
            className="w-full text-black px-4 py-2 border-gray-300 border rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-black text-sm font-medium mb-1">قیمت (تومان)</label>
            <input
              type="number"
              name="price"
              defaultValue={productToEdit?.price || ""}
              required
              min="0"
              className="w-full text-black px-4 py-2 border-gray-300 border rounded-lg text-left"
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-black text-sm font-medium mb-1">تخفیف (%)</label>
            <input
              type="number"
              name="sale"
              defaultValue={productToEdit?.sale || 0}
              min="0"
              max="100"
              className="w-full text-black px-4 py-2 border-gray-300 border rounded-lg text-left"
              dir="ltr"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-black text-sm font-medium mb-1">دسته‌بندی</label>
            <select
              name="category"
              defaultValue={productToEdit?.category?._id || productToEdit?.category || ""}
              required
              className="w-full text-black px-4 py-2 border-gray-300 border rounded-lg bg-white"
            >
              <option value="">انتخاب کنید...</option>
              {categories?.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-black text-sm font-medium mb-1">برند</label>
            <select
              name="brand"
              defaultValue={productToEdit?.brand?._id || productToEdit?.brand || ""}
              required
              className="w-full text-black px-4 py-2 border-gray-300 border rounded-lg bg-white"
            >
              <option value="">انتخاب کنید...</option>
              {brands?.map(brand => (
                <option key={brand._id} value={brand._id}>{brand.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-black">
              گالری تصاویر
            </label>
            <span className="text-xs text-gray-500">
              {selectedMedia.length} تصویر انتخاب شده
            </span>
          </div>

          {selectedMedia.map((id) => (
            <input key={id} type="hidden" name="media" value={id} />
          ))}

          {mediaLoading ? (
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : mediaList.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6">
              هنوز رسانه‌ای ثبت نشده است. از بخش{" "}
              <Link href="/dashboard/media" className="text-blue-600 hover:underline">
                مدیریت رسانه‌ها
              </Link>{" "}
              اضافه کنید.
            </p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-80 overflow-y-auto p-1">
              {mediaList.map((media) => {
                const isSelected = selectedMedia.includes(media._id);
                return (
                  <button
                    type="button"
                    key={media._id}
                    onClick={() => toggleMedia(media._id)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      isSelected
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={media.url}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          ✓
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-gray-800 text-white py-2.5 rounded-lg disabled:opacity-70"
          >
            {isPending ? "در حال پردازش..." : (isEditMode ? "ویرایش محصول" : "ثبت محصول")}
          </button>
          {isEditMode && (
            <Link
              href="/dashboard/products"
              className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center justify-center font-medium"
            >
              انصراف
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}