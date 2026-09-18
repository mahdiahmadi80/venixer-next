"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2, "نام محصول باید حداقل ۲ حرف باشد"),
  price: z.coerce.number().min(0, "قیمت نمی‌تواند منفی باشد"),
  sale: z.coerce.number().min(0).max(100, "تخفیف باید بین ۰ تا ۱۰۰ باشد").default(0),
  category: z.string().min(1, "انتخاب دسته‌بندی الزامی است"),
  brand: z.string().min(1, "انتخاب برند الزامی است"),
  media: z.array(z.string()).min(1, "حداقل وارد کردن ID یک رسانه الزامی است"),
});

export async function getProducts(cookieHeader) {
  const response = await fetch("http://localhost:4000/api/product", {
    headers: {
      Cookie: cookieHeader || "",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت لیست محصولات");
  }

  const data = await response.json();
  return data.data;
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

    const payload = validated.data; 

    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const cookieHeader = token ? `token=${token}` : "";

    const response = await fetch("http://localhost:4000/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(payload),
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

    const payload = validated.data;

    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const cookieHeader = token ? `token=${token}` : "";

    const response = await fetch(`http://localhost:4000/api/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(payload),
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
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const cookieHeader = token ? `token=${token}` : "";

    const response = await fetch(`http://localhost:4000/api/product/${id}`, {
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