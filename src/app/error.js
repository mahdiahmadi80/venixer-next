"use client";

export default function Error({ error, reset }) {

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4" dir="rtl">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200 ">متاسفانه مشکلی پیش آمده است</h1>
                <h2> لطفا صفحه را رفرش کنید </h2>
            </div>
        </div>
    );
}