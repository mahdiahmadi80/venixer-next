"use client"
import Link from "next/link";
import PhoneIcon from '@iconify-react/akar-icons/phone';
import MailFilledIcon from '@iconify-react/ant-design/mail-filled';
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
                <PhoneIcon height="1em" />
                <span dir="ltr">021 - 111111</span>
              </li>
              <li className="flex items-center gap-2">
                <MailFilledIcon height="1em" />
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