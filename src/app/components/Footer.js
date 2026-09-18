import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">          
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold tracking-tight"></h3>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/products" className="hover:text-teal-400 transition-colors">همه محصولات</Link></li>
              <li><Link href="/products?category=laptop" className="hover:text-teal-400 transition-colors">لپ‌ تاپ </Link></li>
              <li><Link href="/products?category=mobile" className="hover:text-teal-400 transition-colors">موبایل و تبلت</Link></li>
            </ul>
          </div>


          <div>
            <h4 className="text-white font-semibold mb-4">ارتباط با ما</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span dir="ltr">021 - 111111</span>
              </li>
              <li className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span>@venixer.ir</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} تمامی حقوق برای ونیکسر شاپ (محمد مهدی احمدی) محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}