"use client";

import { useActionState, useEffect, useRef } from "react";
import { createBrandAction, updateBrandAction } from "@/lib/actions/brand.actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BrandForm({ brandToEdit }) {
  const formRef = useRef(null);
  const router = useRouter();

  const isEditMode = !!brandToEdit;

  const actionToRun = isEditMode
    ? updateBrandAction.bind(null, brandToEdit._id)
    : createBrandAction;

  const [state, formAction, isPending] = useActionState(actionToRun, {
    success: null, error: null, message: null,
  });

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      if (isEditMode) {
        router.push("/dashboard/brands");
      }
    }
  }, [state?.success, isEditMode, router]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-black mb-6">
        {isEditMode ? `ویرایش برند: ${brandToEdit.name}` : "ثبت برند جدید"}
      </h2>

      {state?.error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">{state.error}</div>}
      {state?.success && <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg">{state.message}</div>}

      <form key={brandToEdit?._id || "new"} ref={formRef} action={formAction} className="space-y-4">

        <div>
          <label className="block text-black text-sm  font-medium mb-1">نام برند</label>
          <input
            type="text"
            name="name"
            defaultValue={brandToEdit?.name || ""}
            required
            className="w-full text-black px-4 py-2 border-gray-300 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-black text-sm font-medium mb-1">لینک لوگو</label>
          <input
            type="text"
            name="logo"
            defaultValue={brandToEdit?.logo || ""}
            required
            className="w-full text-black px-4 py-2 border-gray-300 border rounded-lg"
            dir="ltr"
          />
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-gray-800 text-white py-2.5 rounded-lg disabled:opacity-70"
          >
            {isPending ? "در حال ذخیره..." : (isEditMode ? "ویرایش برند" : "ثبت برند")}
          </button>
          {isEditMode && (
            <Link
              href="/dashboard/brands"
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