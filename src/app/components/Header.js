"use client";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSession, signOutUser } from "@/lib/api/auth";
import { fetchCategories } from "@/lib/api/products";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: sessionData, isLoading: sessionLoading } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    retry: false,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const isAuth = sessionData?.authorized;

  const logoutMutation = useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      router.push("/sign-in");
    },
  });

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              ونیکسر شاپ
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                صفحه اصلی
              </Link>
              <Link href="/products" className="hover:text-blue-600 transition-colors">
                همه محصولات
              </Link>
              {categories?.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/category/${cat.en_name}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {sessionLoading ? (
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            ) : isAuth ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-700 hidden sm:inline-block text-sm font-medium border-l border-gray-200 pl-3">

                </span>

                <Link
                  href="/dashboard"
                  className="bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  داشبورد
                </Link>
                <button
                  onClick={() => logoutMutation.mutate()}
                  className="text-red-500 hover:text-white hover:bg-red-500 border border-red-500 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                  disabled={logoutMutation.isPending}
                >
                  {logoutMutation.isPending ? "..." : "خروج"}
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/sign-in"
                  className="text-blue-600 font-medium px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  ورود
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-blue-600 text-white font-medium px-4 py-2 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                >
                  ثبت‌نام
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}