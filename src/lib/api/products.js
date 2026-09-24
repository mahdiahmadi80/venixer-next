
export async function fetchSaleProducts() {
  const response = await fetch("/api/product/sale", {
    credentials: "include", 
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت محصولات تخفیف‌دار");
  }

  const data = await response.json();
  return data.data;
}
export async function fetchCategories() {
  const response = await fetch("/api/category", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت دسته‌بندی‌ها");
  }

  const data = await response.json();
  return data.data;
}

export async function fetchProductsByCategory(categoryName) {
  const response = await fetch(`/api/product/category/${categoryName}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت محصولات این دسته‌بندی");
  }

  const data = await response.json();
  return data.data; 
}

export async function createCategory(newCategory) {
  const response = await fetch("/api/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCategory),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در ایجاد دسته‌بندی");
  }

  return response.json();
}

export async function deleteCategory(id) {
  const response = await fetch(`/api/category/${id}`, {
    method: "DELETE",
    credentials: "include", 
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در حذف دسته‌بندی");
  }

  return response.json();
}

export async function fetchProductById(productId) {
  const response = await fetch(`/api/product/${productId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات محصول");
  }

  const data = await response.json();
  return data.data;
}

export async function fetchBrands() {
  const response = await fetch("/api/brand", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت لیست برندها");
  }

  const data = await response.json();
  return data.data; 
}

export async function createBrand(newBrand) {
  const response = await fetch("/api/brand", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBrand),
    credentials: "include", 
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در ایجاد برند");
  }

  return response.json();
}

export async function deleteBrand(id) {
  const response = await fetch(`/api/brand/${id}`, {
    method: "DELETE",
    credentials: "include", 
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در حذف برند");
  }

  return response.json();
}


export async function fetchAllProducts() {
  const response = await fetch("/api/product", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("خطا در دریافت لیست محصولات");
  }

  const data = await response.json();
  return data.data; 
}

export async function createProduct(newProduct) {
  const response = await fetch("/api/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در ایجاد محصول");
  }

  return response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`/api/product/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "خطا در حذف محصول");
  }

  return response.json();
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchMediaList() {
  const res = await fetch(`${API_URL}/api/media`, {
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) throw new Error("خطا در دریافت رسانه‌ها");
  const json = await res.json();
  return json.data;
}