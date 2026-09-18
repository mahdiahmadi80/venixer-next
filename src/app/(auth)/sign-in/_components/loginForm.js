"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/lib/validations/auth";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({ email: "", password: "" });
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

    const validation = signInSchema.safeParse(formData);

    if (!validation.success) {
      const fieldErrors = {};
      validation.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (response.status === 200) {

        queryClient.invalidateQueries({ queryKey: ["session"] });

        router.push("/");
        router.refresh();
      }
      else if (response.status === 401) {
        setServerError("ایمیل یا رمز عبور اشتباه است");
      }
      else if (response.status === 422) {
        if (data.fieldErrors) {
          const apiFieldErrors = {};
          for (const key in data.fieldErrors) {
            apiFieldErrors[key] = data.fieldErrors[key][0];
          }
          setErrors(apiFieldErrors);
        } else {
          setServerError(data.message);
        }
      }
      else {
        setServerError(data.message || "خطای ناشناخته رخ داد.");
      }
    } catch (error) {
      setServerError("خطا در ارتباط با سرور.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" dir="rtl">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">ورود به ونیکسر شاپ</h2>


        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full text-black px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300 focus:ring-blue-500"}`} dir="ltr"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className={`w-full  text-black px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300 focus:ring-blue-500"}`} dir="ltr"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          {serverError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
              {serverError}
            </div>
          )}
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
          >
            {isLoading ? "در حال ورود " : "ورود"}
          </button>
        </form>
      </div>
    </div>
  );
}