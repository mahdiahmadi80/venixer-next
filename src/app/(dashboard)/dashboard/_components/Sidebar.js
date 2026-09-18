"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const menuItems = [
    { name: "داشبورد", path: "/dashboard" },
    { name: "مدیریت برندها", path: "/dashboard/brands" },
    { name: "مدیریت دسته‌بندی‌ها", path: "/dashboard/categories" },
    { name: "مدیریت محصولات", path: "/dashboard/products" },
    { name: "مدیریت رسانه‌ها", path: "/dashboard/media" },
  ];

  return (
    <aside className="w-full md:w-64 bg-white shadow-sm border-l border-gray-100 min-h-[calc(100vh-64px)] p-6">
      <div className="mb-8 hidden md:block">
        <h2 className="text-xl font-bold text-gray-800">پنل مدیریت ونیکسر</h2>
      </div>

      <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}