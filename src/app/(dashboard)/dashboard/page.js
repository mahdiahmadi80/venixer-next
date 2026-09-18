import Link from "next/link";

export default function DashboardHomePage() {
  return (
    <div>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          به پنل مدیریت خوش آمدید
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed max-w-2xl">
          از طریق منوی سمت راست می‌توانید بخش‌های مختلف فروشگاه از جمله محصولات، دسته‌بندی‌ها و برندها را مدیریت کنید.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Link 
            href="/dashboard/products" 
            className="bg-blue-50 text-blue-700 hover:bg-blue-100 font-medium px-6 py-3 rounded-xl transition-colors"
          >
            + افزودن محصول جدید
          </Link>
          <Link 
            href="/dashboard/categories" 
            className="bg-gray-50 text-gray-700 hover:bg-gray-100 font-medium px-6 py-3 rounded-xl transition-colors border border-gray-200"
          >
            مدیریت دسته‌بندی‌ها
          </Link>
        </div>
      </div>
    </div>
  );
}