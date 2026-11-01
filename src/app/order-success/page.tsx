'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { CheckCircle2, PhoneCall, Package, Truck, ArrowRight, ShieldCheck } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'ZAK-2026';
  const name = searchParams.get('name') || 'সম্মানিত গ্রাহক';
  const phone = searchParams.get('phone') || '';
  const address = searchParams.get('address') || '';
  const total = searchParams.get('total') || '';

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      {/* Success Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-md text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            অর্ডার সফল হয়েছে!
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900">
            ধন্যবাদ, {name}!
          </h1>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            আপনার অর্ডারটি সফলভাবে জমা হয়েছে। আমাদের প্রতিনিধি খুব শীঘ্রই আপনাকে কল করে অর্ডারটি নিশ্চিত করবেন।
          </p>
        </div>

        {/* Order Number Badge */}
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 inline-block">
          <p className="text-xs text-gray-500 font-medium">অর্ডার রেফারেন্স নম্বর</p>
          <p className="text-2xl font-black text-emerald-800 tracking-wider mt-0.5">{orderNumber}</p>
        </div>

        {/* 5-Step Order Lifecycle according to user rules */}
        <div className="pt-6 border-t border-gray-100 text-left">
          <h3 className="text-sm font-bold text-gray-900 mb-4 text-center">
            📦 আপনার অর্ডারের পরবর্তী ধাপসমূহ
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 flex flex-col items-center text-center">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mb-1">
                ✓
              </span>
              <p className="text-xs font-bold text-emerald-900">১. অর্ডার গ্রহণ</p>
              <p className="text-[10px] text-emerald-700 font-medium">সম্পন্ন হয়েছে</p>
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 flex flex-col items-center text-center animate-pulse">
              <PhoneCall className="w-5 h-5 text-amber-600 mb-1" />
              <p className="text-xs font-bold text-amber-900">২. ফোন ভেরিফিকেশন</p>
              <p className="text-[10px] text-amber-700 font-medium">অ্যাডমিন কল করবেন</p>
            </div>

            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex flex-col items-center text-center opacity-70">
              <Package className="w-5 h-5 text-gray-500 mb-1" />
              <p className="text-xs font-bold text-gray-800">৩. প্যাকেজিং</p>
              <p className="text-[10px] text-gray-500">প্রস্তুতি</p>
            </div>

            <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 flex flex-col items-center text-center opacity-70">
              <Truck className="w-5 h-5 text-gray-500 mb-1" />
              <p className="text-xs font-bold text-gray-800">৪. ডেলিভারি ও ক্যাশ</p>
              <p className="text-[10px] text-gray-500">পণ্য পেয়ে টাকা দিন</p>
            </div>
          </div>
        </div>

        {/* Customer Detail Summary */}
        <div className="bg-stone-50/70 p-5 rounded-2xl border border-stone-200 text-left text-xs space-y-1.5 text-gray-700">
          <p className="font-bold text-gray-900 text-sm mb-2">ডেলিভারির বিবরণ:</p>
          {phone && <p><span className="text-gray-500">মোবাইল নম্বর:</span> {phone}</p>}
          {address && <p><span className="text-gray-500">ঠিকানা:</span> {address}</p>}
          {total && <p><span className="text-gray-500">সর্বমোট প্রদেয় (COD):</span> ৳{total}</p>}
          <p className="text-emerald-700 font-semibold pt-1">
            পেমেন্ট মাধ্যম: ক্যাশ অন ডেলিভারি (Cash on Delivery)
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            আরও পণ্য কিনুন
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/admin"
            className="px-6 py-3.5 bg-stone-100 hover:bg-stone-200 text-gray-800 font-bold rounded-xl text-sm transition-all flex items-center justify-center"
          >
            অ্যাডমিন ড্যাশবোর্ড দেখুন
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-stone-50/40 flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<div className="p-12 text-center text-sm">লোড হচ্ছে...</div>}>
          <OrderSuccessContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
