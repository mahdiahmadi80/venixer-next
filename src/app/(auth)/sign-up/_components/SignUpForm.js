"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpSchema } from "@/lib/validations/auth";

export default function SignUpForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined });
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    if (signUpSchema) {
      const validation = signUpSchema.safeParse(formData);
      if (!validation.success) {
        const fieldErrors = {};
        validation.error.issues.forEach((issue) => {
          fieldErrors[issue.path[0]] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 201 || response.status === 200) {
        router.push("/login");
      } else {
        setServerError(data.message || "خطایی در ثبت‌نام رخ داد.");
      }
    } catch (error) {
      setServerError("خطا در ارتباط با سرور.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-gray-50 p-4" dir="rtl">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">ایجاد حساب کاربری</h2>
          <p className="text-sm text-gray-500 mt-2">برای استفاده از خدمات سایت ثبت ‌نام کنید.</p>
        </div>

        {serverError && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm text-center font-medium">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">نام و نام خانوادگی</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 text-black py-2.5 border rounded-xl focus:ring-2 focus:outline-none transition-all ${errors.name ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                }`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">ایمیل</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 text-black py-2.5 border rounded-xl focus:ring-2 focus:outline-none transition-all ${errors.email ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                }`}
              dir="ltr"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">رمز عبور</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 text-black py-2.5 border rounded-xl focus:ring-2 focus:outline-none transition-all ${errors.password ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                }`}
              dir="ltr"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-70 mt-4"
          >
            {isLoading ? "در حال ثبت‌نام..." : "ثبت‌ نام"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          قبلاً ثبت‌ نام کرده‌اید؟{" "}
          <Link href="/sign-in" className="text-blue-600 hover:text-blue-800 font-medium">
            وارد شوید
          </Link>
        </p>
      </div>
    </div>
  );
}