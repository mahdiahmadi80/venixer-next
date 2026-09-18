import Sidebar from "./_components/Sidebar";
import DashboardHeader from "./_components/DashboardHeader";
export const metadata = {
  title: "پنل مدیریت | داشبورد",
  description: "مدیریت محصولات، دسته‌بندی‌ها و برندهای فروشگاه",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50" dir="rtl">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <DashboardHeader />
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}