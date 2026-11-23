'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Clock, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function HeroBanner() {
  const { t } = useLanguage();

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
              <span>{t('১০০% খাঁটি ও পুষ্টিকর প্রিমিয়াম স্বাস্থ্যকর খাবার', '100% Pure & Nutritious Premium Healthy Food')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
              {t('ভালো খাবার,', 'Good Food,')} <br className="hidden sm:inline" />
              {t('সুন্দর আপনি —', 'Better You —')}{' '}
              <span className="text-emerald-700 underline decoration-emerald-300">ZaKJomok</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {t(
                'আপনার সুস্থ জীবনের সঙ্গী হতে আমরা নিয়ে এসেছি প্রিমিয়াম বাদাম, সিডস, হোল গ্রেইন ওটস এবং সাথে রয়েছে আমাদের বিশেষ ফ্রেশ মিক্সড সালাদ ও হোল হুইট স্যান্ডউইচ।',
                'Your trusted partner for healthy living. Enjoy our fresh mixed salads, whole wheat sandwiches, premium nuts, seeds and whole grains.'
              )}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#products"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                {t('পণ্যসমূহ দেখুন', 'Explore Products')}
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#products"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-stone-50 text-emerald-800 border-2 border-emerald-200 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all hover:border-emerald-300 shadow-xs"
              >
                {t('🥗 ফ্রেশ মিলস ও সালাদ', '🥗 Fresh Meals & Salads')}
              </a>
            </div>

            {/* Quick Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-emerald-100/80">
              <div className="flex items-center gap-2 text-left">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-stone-700">{t('১০০% অর্গানিক ও ফ্রেশ', '100% Organic & Fresh')}</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-stone-700">{t('ক্যাশ অন ডেলিভারি', 'Cash on Delivery')}</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-stone-700">{t('ফোনে কনফার্মেশন', 'Phone Confirmation')}</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Heart className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-stone-700">{t('স্বাস্থ্যবান্ধব প্যাকেজিং', 'Hygienic Packaging')}</span>
              </div>
            </div>
          </div>

          {/* Right Product Showcase Banner */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-tr from-emerald-100 to-teal-50">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
                alt="ZaKJomok Fresh Healthy Salad"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max mb-2">
                  {t('আজকের তাজা প্রস্তুত', 'Freshly Prepared Today')}
                </span>
                <h3 className="text-xl font-bold">{t('মিক্সড সালাদ ও হোল হুইট মিলস', 'Mixed Salad & Whole Wheat Meals')}</h3>
                <p className="text-xs text-emerald-100 mt-1">{t('জিরো প্রিজারভেটিভ • প্রাকৃতিক পুষ্টির নিশ্চয়তা', 'Zero Preservatives • Pure Nutrition')}</p>
              </div>
            </div>

            {/* Floating Review Badge */}
            <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-emerald-100 shadow-xl flex items-center gap-3 z-10">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                4.9★
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900">{t('৫০০+ সন্তুষ্ট গ্রাহক', '500+ Happy Customers')}</p>
                <p className="text-[10px] text-stone-500">{t('সরাসরি ফার্ম ফ্রেশ উপাদান', 'Directly Farm Fresh Sourced')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
