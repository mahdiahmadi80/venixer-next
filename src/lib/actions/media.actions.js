"use server";

import { revalidatePath } from "next/cache";

export async function getMediaAction(cookieHeader) {
  const response = await fetch("http://localhost:4000/api/media", {
    headers: { Cookie: cookieHeader || "" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت لیست رسانه‌ها");
  }

  const data = await response.json();
  return data.data; 
}

export async function createMediaAction(prevState, formData) {
  try {
    const url = formData.get("url");

    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const cookieHeader = token ? `token=${token}` : "";

    const response = await fetch("http://localhost:4000/api/media", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify({ url }), 
    });

    const data = await response.json();

    if (!response.ok) {
      console.log("❌ ارور بک‌اند در ساخت رسانه:", data);
      return { success: false, error: data.message || "خطا در آپلود رسانه" };
    }

    revalidatePath("/dashboard/media"); 
    return { success: true, message: "رسانه با موفقیت افزوده شد" };
  } catch (error) {
    return { success: false, error: "امکان ارتباط با سرور وجود ندارد" };
  }
}

export async function deleteMediaAction(id) {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const cookieHeader = token ? `token=${token}` : "";

    const response = await fetch(`http://localhost:4000/api/media/${id}`, {
      method: "DELETE",
      headers: { Cookie: cookieHeader },
    });

    if (!response.ok) {
      return { success: false, error: "خطا در حذف رسانه" };
    }

    revalidatePath("/dashboard/media");
    return { success: true };
  } catch (error) {
    return { success: false, error: "امکان ارتباط با سرور وجود ندارد" };
  }
}