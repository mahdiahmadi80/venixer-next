"use server";
import { revalidatePath } from "next/cache";

export async function getCategories(cookieHeader) {
  const response = await fetch("http://localhost:4000/api/category", {
    headers: { Cookie: cookieHeader || "" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت لیست دسته‌بندی‌ها");
  }

  const data = await response.json();
  return data.data;
}

export async function createCategoryAction(prevState, formData) {
  try {
    const name = formData.get("name");
    const en_name = formData.get("en_name");
    const image = formData.get("image"); 
    
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const cookieHeader = token ? `token=${token}` : "";

    const response = await fetch("http://localhost:4000/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify({ name, en_name, image }),
    });

    const data = await response.json();

    if (!response.ok) {
      
      return { success: false, error: data.message || "خطا در ایجاد دسته‌بندی" };
    }

    revalidatePath("/dashboard/categories");
    return { success: true, message: "دسته‌بندی با موفقیت ساخته شد" };
  } catch (error) {
    return { success: false, error: "امکان ارتباط با سرور وجود ندارد" };
  }
}

export async function updateCategoryAction(id, prevState, formData) {
  try {
    const name = formData.get("name");
    const en_name = formData.get("en_name");
    const image = formData.get("image");
    
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const cookieHeader = token ? `token=${token}` : "";

    const response = await fetch(`http://localhost:4000/api/category/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify({ name, en_name, image }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || "خطا در ویرایش دسته‌بندی" };
    }

    revalidatePath("/dashboard/categories");
    return { success: true, message: "دسته‌بندی با موفقیت ویرایش شد" };
  } catch (error) {
    return { success: false, error: "امکان ارتباط با سرور وجود ندارد" };
  }
}

export async function deleteCategoryAction(id) {
  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const cookieHeader = token ? `token=${token}` : "";

    const response = await fetch(`http://localhost:4000/api/category/${id}`, {
      method: "DELETE",
      headers: { Cookie: cookieHeader },
    });

    if (!response.ok) {
      return { success: false, error: "خطا در حذف دسته‌بندی" };
    }

    revalidatePath("/dashboard/categories");
    return { success: true };
  } catch (error) {
    return { success: false, error: "امکان ارتباط با سرور وجود ندارد" };
  }
}