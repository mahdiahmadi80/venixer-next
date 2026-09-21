"use client";

import { useActionState, useEffect, useRef } from "react";
import { createCategoryAction, updateCategoryAction } from "@/lib/actions/category.actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CategoryForm({ categoryToEdit }) {
  const formRef = useRef(null);
  const router = useRouter();
  const isEditMode = !!categoryToEdit;

  const actionToRun = isEditMode
    ? updateCategoryAction.bind(null, categoryToEdit._id)
    : createCategoryAction;

  const [state, formAction, isPending] = useActionState(actionToRun, {
    success: null, error: null, message: null,
  });

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      if (isEditMode) {
        router.push("/dashboard/categories");
      }
    }
  }, [state?.success, isEditMode, router]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-700 mb-6">
        {isEditMode ? `ویرایش دسته: ${categoryToEdit.name}` : "ثبت دسته‌بندی جدید"}
      </h2>

      {state?.error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">{state.error}</div>}
      {state?.success && <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg">{state.message}</div>}

      <form key={categoryToEdit?._id || "new"} ref={formRef} action={formAction} className="space-y-4">

        <div>
          <label className="block text-black text-sm font-medium mb-1">نام دسته‌بندی (فارسی)</label>
          <input
            type="text"
            name="name"
            defaultValue={categoryToEdit?.name || ""}
            required
            className="w-full text-black px-4 py-2 border border-gray-400 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-black text-sm font-medium mb-1">نام انگلیسی</label>
          <input
            type="text"
            name="en_name"
            defaultValue={categoryToEdit?.en_name || ""}
            required
            className="w-full text-black px-4 py-2 border border-gray-400 rounded-lg"
            dir="ltr"
            placeholder="e.g. mobile"
          />
        </div>

        <div>
          <label className="block text-black text-sm font-medium mb-1">لینک تصویر</label>
          <input
            type="text"
            name="image"
            defaultValue={categoryToEdit?.image || ""}
            required
            className="w-full text-black px-4 py-2 border border-gray-400 rounded-lg"
            dir="ltr"
            placeholder="http://..."
          />
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-gray-800 text-white py-2.5 rounded-lg disabled:opacity-70"
          >
            {isPending ? "در حال ذخیره..." : (isEditMode ? "ویرایش دسته بندی" : "ثبت دسته بندی ")}
          </button>

          {isEditMode && (
            <Link
              href="/dashboard/categories"
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