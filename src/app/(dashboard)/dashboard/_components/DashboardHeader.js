"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { signOutUser } from "@/lib/api/auth";
import LinkOutIcon from '@iconify-react/akar-icons/link-out'
import SignOutIcon from '@iconify-react/akar-icons/sign-out';

export default function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const getPageTitle = () => {
    if (pathname.includes("/brands")) return "مدیریت برندها";
    if (pathname.includes("/categories")) return "مدیریت دسته‌بندی‌ها";
    if (pathname.includes("/products")) return "مدیریت محصولات";
    if (pathname.includes("/media")) return "فایل ها و رسانه ها";
    return " (داشبورد)";
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      router.push("/");
      router.refresh();
      alert("شما از سایت خارج شدید");
    } catch (error) {
      alert("مشکلی در خروج پیش آمد!");
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm h-16 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-gray-800 tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/" className="hidden sm:flex text-sm text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors font-medium items-center gap-1.5">
          <LinkOutIcon height="1em" />
          صفحه اصلی
        </Link>

        <div className="w-px h-6 bg-gray-200 hidden sm:block"></div>
        <button
          onClick={handleLogout}
          type="button"
          className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
          title="خروج از حساب"
        >
          <SignOutIcon height="2em" />        </button>
      </div>
    </header>
  );
}