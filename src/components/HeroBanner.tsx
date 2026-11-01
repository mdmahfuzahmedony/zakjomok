import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Clock, Heart } from 'lucide-react';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-stone-50/40 to-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>১০০% খাঁটি ও পুষ্টিকর প্রিমিয়াম স্বাস্থ্যকর খাবার</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
              ভালো খাবার, <br className="hidden sm:inline" />
              সুন্দর আপনি — <span className="text-emerald-700 underline decoration-emerald-300">ZaKJomok</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              আপনার সুস্থ জীবনের সঙ্গী হতে আমরা নিয়ে এসেছি প্রিমিয়াম বাদাম, সিডস, হোল গ্রেইন ওটস এবং সাথে রয়েছে আমাদের বিশেষ <strong>ফ্রেশ মিক্সড সালাদ</strong> ও <strong>হোল হুইট স্যান্ডউইচ</strong>।
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#products"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                পণ্যসমূহ দেখুন
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#fresh-meals"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-stone-50 text-emerald-800 border-2 border-emerald-200 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all hover:border-emerald-300 shadow-xs"
              >
                🥗 সালাদ ও স্যান্ডউইচ
              </a>
            </div>

            {/* Quick Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-emerald-100/80">
              <div className="flex items-center gap-2 text-left">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-gray-700">১০০% অর্গানিক ও ফ্রেশ</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-gray-700">ক্যাশ অন ডেলিভারি</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-gray-700">ফোনে কনফার্মেশন</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Heart className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-gray-700">স্বাস্থ্যবান্ধব প্যাকেজিং</span>
              </div>
            </div>
          </div>

          {/* Right Visual Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Banner Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 bg-emerald-50">
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
                  alt="ZaKJomok Healthy Food"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="bg-emerald-600 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full w-max mb-1">
                    Freshly Prepared
                  </span>
                  <h3 className="text-xl font-bold">প্রতিদিনের সুষম পুষ্টি</h3>
                  <p className="text-xs text-emerald-100">সরাসরি রান্নাঘর থেকে আপনার টেবিলে</p>
                </div>
              </div>

              {/* Floating Feature Tag 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-emerald-50 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xl">
                  🥗
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">বিশেষ আকর্ষণ</p>
                  <p className="text-sm font-bold text-gray-900">মিক্সড সালাদ ও স্যান্ডউইচ</p>
                </div>
              </div>

              {/* Floating Feature Tag 2 */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-gray-100 items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold text-gray-800">ক্যাশ অন ডেলিভারি চালু আছে</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
