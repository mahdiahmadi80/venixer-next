export async function fetchSession() {
  const response = await fetch("/api/auth/session", {
    credentials: "include", 
  });

  if (!response.ok) {
    throw new Error("نشست نامعتبر است");
  }

  const data = await response.json();
  return data; 
}
export async function signOutUser() {
  const response = await fetch("/api/auth/sign-out", {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("خطا در خروج از حساب");
  }

  return response.json();
}