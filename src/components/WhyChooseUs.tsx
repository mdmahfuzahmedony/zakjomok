'use client';

import React from 'react';
import { ShieldCheck, Leaf, PhoneCall, RefreshCw, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: <Leaf className="w-7 h-7 text-white" />,
      title: t('১০০% খাঁটি ও প্রাকৃতিক উপাদান', '100% Pure & Organic'),
      description: t(
        'কোনো কৃত্রিম রং, রাসায়নিক ফ্লেভার বা ক্ষতিকারক উপাদান ছাড়া ১০০% স্বাস্থ্যসম্মত উপাদানে প্রস্তুত।',
        'Prepared with 100% natural and wholesome ingredients without artificial additives.'
      ),
      tag: t('প্রাকৃতিক বিশুদ্ধতা', 'Natural Purity'),
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-white" />,
      title: t('হাইজিনিক ও নিরাপদ মোড়ক', 'Hygienic Packaging'),
      description: t(
        'সম্পূর্ণ পরিষ্কার ও জীবানুমুক্ত পরিবেশে খাবারের পুষ্টিমান অক্ষুণ্ণ রেখে প্রিমিয়াম প্যাকেজিং।',
        'Sealed in sanitized environments to preserve maximum nutrients and flavor.'
      ),
      tag: t('স্বাস্থ্যসম্মত পরিবেশ', 'Safe & Clean'),
    },
    {
      icon: <PhoneCall className="w-7 h-7 text-white" />,
      title: t('অর্ডারের পর ফোনে নিশ্চিতকরণ', 'Phone Confirmation'),
      description: t(
        'অর্ডারের পর আমাদের প্রতিনিধি আপনাকে সরাসরি কল করে পছন্দ ও ডেলিভারির সময় নিশ্চিত করবেন।',
        'Our team calls you promptly to verify your preferences and delivery time.'
      ),
      tag: t('দ্রুত সেবা', 'Fast Service'),
    },
    {
      icon: <RefreshCw className="w-7 h-7 text-white" />,
      title: t('ক্যাশ অন ডেলিভারি (COD)', 'Cash on Delivery (COD)'),
      description: t(
        'অগ্রিম কোনো টাকা ছাড়া পণ্য হাতে পেয়ে গুণগত মান যাচাই করে নিশ্চিন্তে মূল্য পরিশোধ করুন।',
        'Pay with zero advance — inspect your food at your door before making payment.'
      ),
      tag: t('নিরাপদ পেমেন্ট', 'Secure Payment'),
    },
  ];

  return (
    <section id="why-choose-us" className="py-14 sm:py-20 bg-linear-to-b from-white via-emerald-50/20 to-white border-b border-emerald-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-bold text-emerald-800 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('কেন ZaKJomok সেরা?', 'Why Choose ZaKJomok?')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t('আপনার সুস্থ জীবনের বিশ্বস্ত সাথী', 'Your Trusted Partner for Healthy Living')}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed">
            {t(
              'আমাদের লক্ষ্য শুধু খাবার পরিবেশন নয়, বরং আপনার ও আপনার প্রিয় পরিবারের জন্য একটি স্বাস্থ্যকর ও চনমনে জীবনধারা গড়ে তোলা।',
              'Our mission is not just delivering food, but nurturing a healthy, energizing lifestyle for you and your loved ones.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center mb-5 shadow-md shadow-emerald-700/20">
                  {p.icon}
                </div>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mb-2">
                  {p.tag}
                </span>
                <h3 className="text-base font-bold text-stone-900">
                  {p.title}
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
