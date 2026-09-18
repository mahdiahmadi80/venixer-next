import "./globals.css";
import localFont from "next/font/local";
import QueryProvider from "./providers/QueryProvider";

export const metadata = {
  title: "فروشگاه آنلاین ونیکسر",
};

const myCustomFont = localFont({
  src: "../fonts/Vazir-Medium.woff2",
  variable: "--vazirMatn", 
});

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={myCustomFont.variable}>
      <body className="bg-gray-50 text-gray-800 antialiased">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}