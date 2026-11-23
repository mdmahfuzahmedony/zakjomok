import type { Metadata } from "next";
import { Anek_Bangla } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";

const anekBangla = Anek_Bangla({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-anek-bangla",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZakJomok — Good Food • Better You | প্রাকৃতিক ও স্বাস্থ্যকর খাবার",
  description: "প্রাকৃতিক বাদাম, পুষ্টিকর সিডস, ওটস, ফ্রেশ মিক্সড সালাদ ও হোল হুইট স্যান্ডউইচ এর বিশ্বস্ত ই-কমার্স প্ল্যাটফর্ম। ক্যাশ অন ডেলিভারি সুবিধা।",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`h-full antialiased scroll-smooth ${anekBangla.variable}`}>
      <body className={`${anekBangla.className} min-h-full flex flex-col font-sans bg-[#fbfdfb] text-stone-900`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
