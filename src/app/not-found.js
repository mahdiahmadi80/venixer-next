import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4" dir="rtl">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200 ">404</h1>
                <h2>صفحه پیدا نشد</h2>
            </div>
        </div>
    );
}