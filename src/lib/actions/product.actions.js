"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const productSchema = z.object({
  name: z.string().min(2, "نام محصول باید حداقل ۲ حرف باشد"),
  price: z.coerce.number().min(0, "قیمت نمی‌تواند منفی باشد"),
  sale: z.coerce.number().min(0).max(100, "تخفیف باید بین ۰ تا ۱۰۰ باشد").default(0),
  category: z.string().min(1, "انتخاب دسته‌بندی الزامی است"),
  brand: z.string().min(1, "انتخاب برند الزامی است"),
  media: z.array(z.string()).min(1, "حداقل انتخاب یک تصویر الزامی است"),
});

async function getCookieHeader() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return token ? `token=${token}` : "";
}

export async function createProductAction(prevState, formData) {
  try {
    const rawData = {
      name: formData.get("name"),
      price: formData.get("price"),
      sale: formData.get("sale"),
      category: formData.get("category"),
      brand: formData.get("brand"),
      media: formData.getAll("media").filter((id) => id.trim() !== ""), 
    };

    const validated = productSchema.safeParse(rawData);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0].message };
    }

    const cookieHeader = await getCookieHeader();

    const response = await fetch(`${API_URL}/api/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(validated.data),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || "خطا در ایجاد محصول" };
    }

    revalidatePath("/dashboard/products");
    revalidatePath("/products");
    revalidatePath("/");
    return { success: true, message: "محصول با موفقیت ساخته شد" };
  } catch (error) {
    return { success: false, error: "امکان ارتباط با سرور وجود ندارد" };
  }
}

export async function updateProductAction(id, prevState, formData) {
  try {
    const rawData = {
      name: formData.get("name"),
      price: formData.get("price"),
      sale: formData.get("sale"),
      category: formData.get("category"),
      brand: formData.get("brand"),
      media: formData.getAll("media").filter((id) => id.trim() !== ""),
    };

    const validated = productSchema.safeParse(rawData);
    if (!validated.success) {
      return { success: false, error: validated.error.errors[0].message };
    }

    const cookieHeader = await getCookieHeader();

    const response = await fetch(`${API_URL}/api/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(validated.data),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || "خطا در ویرایش محصول" };
    }

    revalidatePath("/dashboard/products");
    revalidatePath("/products");
    revalidatePath("/"); 
    return { success: true, message: "محصول با موفقیت ویرایش شد" };
  } catch (error) {
    return { success: false, error: "امکان ارتباط با سرور وجود ندارد" };
  }
}

export async function deleteProductAction(id) {
  try {
    const cookieHeader = await getCookieHeader();

    const response = await fetch(`${API_URL}/api/product/${id}`, {
      method: "DELETE",
      headers: {
        Cookie: cookieHeader,
      },
    });

    if (!response.ok) {
      return { success: false, error: "خطا در حذف محصول" };
    }

    revalidatePath("/dashboard/products");
    revalidatePath("/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "امکان ارتباط با سرور وجود ندارد" };
  }
}

export async function getProducts(cookieHeader = "") {
  const response = await fetch(`${API_URL}/api/product`, {
    headers: { Cookie: cookieHeader },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("خطا در دریافت لیست محصولات");
  const data = await response.json();
  return data.data;
}

export async function fetchSaleProducts() {
  const response = await fetch(`${API_URL}/api/product/sale`, {
    credentials: "include", 
  });

  if (!response.ok) throw new Error("خطا در دریافت محصولات تخفیف‌دار");
  const data = await response.json();
  return data.data;
}

export async function fetchProductById(productId) {
  const response = await fetch(`${API_URL}/api/product/${productId}`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("خطا در دریافت اطلاعات محصول");
  const data = await response.json();
  return data.data;
}

export async function fetchProductsByCategory(categoryName) {
  const response = await fetch(`${API_URL}/api/product/category/${categoryName}`, {
    credentials: "include",
  });

  if (!response.ok) throw new Error("خطا در دریافت محصولات این دسته‌بندی");
  const data = await response.json();
  return data.data; 
}
export async function fetchMediaList() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const res = await fetch(`${API_URL}/api/media`, {
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("خطا در دریافت رسانه‌ها");
  const json = await res.json();
  return json.data;
}