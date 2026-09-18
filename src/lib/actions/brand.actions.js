"use server";

import { revalidatePath } from "next/cache";

export async function getBrands(cookieHeader) {
  const response = await fetch("http://localhost:4000/api/brand", {
    headers: {
      Cookie: cookieHeader || "",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت لیست برندها");
  }

  const data = await response.json();
  return data.data;
}

export async function createBrandAction(prevState, formData) {
  try {
    const name = formData.get("name");
    const logo = formData.get("logo");

    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const cookieHeader = token ? `token=${token}` : "";

    const response = await fetch("http://localhost:4000/api/brand", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify({ name, logo }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || "خطا در ایجاد برند" };
    }

    revalidatePath("/dashboard/brands");
    return { success: true, message: "برند با موفقیت ساخته شد" };

  } catch (error) {
    return { success: false, error: "امکان ارتباط با سرور وجود ندارد" };
  }
}

export async function updateBrandAction(id, prevState, formData) {
  try {
    const name = formData.get("name");
    const logo = formData.get("logo");

    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const cookieHeader = token ? `token=${token}` : "";

    const response = await fetch(`http://localhost:4000/api/brand/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify({ name, logo }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || "خطا در ویرایش برند" };
    }

    revalidatePath("/dashboard/brands");
    return { success: true, message: "برند با موفقیت ویرایش شد" };

  } catch (error) {
    return { success: false, error: "امکان ارتباط با سرور وجود ندارد" };
  }
}

export async function deleteBrandAction(id) {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const cookieHeader = token ? `token=${token}` : "";

    const response = await fetch(`http://localhost:4000/api/brand/${id}`, {
      method: "DELETE",
      headers: {
        Cookie: cookieHeader,
      }
    });

    if (!response.ok) {
      return { success: false, error: "خطا در حذف برند" };
    }

    revalidatePath("/dashboard/brands");
    return { success: true };

  } catch (error) {
    return { success: false, error: "امکان ارتباط با سرور وجود ندارد" };
  }
}