"use client";

import { useActionState, useEffect, useRef, useTransition } from "react";
import { createMediaAction, deleteMediaAction } from "@/lib/actions/media.actions";
import Image from "next/image";
import DeleteFilledIcon from '@iconify-react/ant-design/delete-filled';
export default function MediaManager({ initialMedia }) {
  const formRef = useRef(null);

  const [createState, formAction, isCreating] = useActionState(createMediaAction, {
    success: null, error: null, message: null,
  });

  useEffect(() => {
    if (createState?.success) {
      formRef.current?.reset();
    }
  }, [createState?.success]);

  const [isDeleting, startTransition] = useTransition();

  const handleDelete = (id) => {
    if (window.confirm("آیا از حذف این عکس مطمئن هستید؟")) {
      startTransition(async () => {
        const res = await deleteMediaAction(id);
        if (res?.error) {
          alert(res.error);
        }
      });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <form
        ref={formRef}
        action={formAction}
        className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm h-fit"
      >
        <h2 className="font-bold text-gray-800">افزودن عکس</h2>
        <p className="text-xs text-gray-500">فقط URL تصویر را وارد کنید.</p>

        <input
          name="url"
          type="url"
          placeholder="https://example.com/image.jpg"
          className="w-full text-black px-4 py-2 border rounded-lg text-left"
          dir="ltr"
          required
        />

        {createState?.error && (
          <div className="p-2 bg-red-50 text-red-600 text-xs rounded-lg border border-red-100">
            {createState.error}
          </div>
        )}
        {createState?.success && (
          <div className="p-2 bg-green-50 text-green-600 text-xs rounded-lg border border-green-100">
            {createState.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isCreating}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2.5 rounded-lg disabled:opacity-70 transition-colors mt-2 text-sm font-medium"
        >
          {isCreating ? "در حال ذخیره..." : "افزودن تصویر"}
        </button>
      </form>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-bold text-gray-800">
          لیست عکس‌ها ({initialMedia?.length || 0})
        </h2>

        {!initialMedia || initialMedia.length === 0 ? (
          <p className="text-sm text-gray-500 py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
            هنوز عکس‌ای افزوده نشده است.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {initialMedia.map((item) => (
              <li
                key={item._id}
                className="overflow-hidden rounded-xl border border-gray-100 hover:shadow-md transition-shadow group relative bg-gray-50"
              >
                <Image
                  width={64} height={64}
                  src={item.url}
                  alt="عکس"
                  loading="eager"
                  className="aspect-video w-full object-cover bg-gray-200"
                />

                <div className="flex items-center justify-between gap-2 p-3 bg-white border-t border-gray-100">
                  <code className="truncate text-[10px] text-gray-500 font-mono" dir="ltr" title={item._id}>
                    {item._id}
                  </code>

                  <button
                    type="button"
                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
                    disabled={isDeleting}
                    onClick={() => handleDelete(item._id)}
                    title="حذف عکس"
                  >
                    <DeleteFilledIcon height="1em" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}