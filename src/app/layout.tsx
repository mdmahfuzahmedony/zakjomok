import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../components/Providers";

export const metadata: Metadata = {
  title: "ZakJomok — Good Food • Better You | প্রাকৃতিক ও স্বাস্থ্যকর খাবার",
  description: "প্রাকৃতিক বাদাম, পুষ্টিকর সিডস, ওটস, ফ্রেশ মিক্সড সালাদ ও হোল হুইট স্যান্ডউইচ এর বিশ্বস্ত ই-কমার্স প্ল্যাটফর্ম। ক্যাশ অন ডেলিভারি সুবিধা।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-sans bg-stone-50/20 text-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

