'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="ZaKJomok Brand Logo"
                className="h-9 w-auto object-contain"
              />
              <div>
                <span className="text-xl font-black text-white">
                  ZaK<span className="text-emerald-400">Jomok</span>
                </span>
                <p className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">
                  Good Food • Better You
                </p>
              </div>
            </Link>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              {t(
                'ZakJomok এর মূল লক্ষ্য স্বাস্থ্যকর খাবার ও পুষ্টিকর পণ্য ঘরে ঘরে পৌঁছে দেওয়া। ফ্রেশ সালাদ, হোল হুইট স্যান্ডউইচ, বাদাম ও অর্গানিক সিডস দিয়ে গড়ে উঠুক আপনার সুস্থ আগামী।',
                'ZaKJomok aims to deliver fresh organic healthy food and nutrition directly to your home. Build a vibrant future with our fresh salads, sandwiches, nuts and seeds.'
              )}
            </p>

            <div className="pt-2 text-xs text-stone-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{t('হটলাইন: ০১৩০৯-৮৩৪৪৮৩ (সকাল ৯টা - রাত ১০টা)', 'Hotline: +8801309834483 (9 AM - 10 PM)')}</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{t('যশোর, বাংলাদেশ', 'Jashore, Bangladesh')}</span>
              </p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">{t('জনপ্রিয় ক্যাটাগরি', 'Popular Categories')}</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link href="/#products" className="hover:text-emerald-400 transition-colors">Nuts & Dry Fruits</Link></li>
              <li><Link href="/#products" className="hover:text-emerald-400 transition-colors">Organic Seeds</Link></li>
              <li><Link href="/#products" className="hover:text-emerald-400 transition-colors">Oats & Breakfast</Link></li>
              <li><Link href="/#products" className="hover:text-emerald-400 transition-colors">Healthy Mixed Salad</Link></li>
              <li><Link href="/#products" className="hover:text-emerald-400 transition-colors">Whole Wheat Sandwich</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">{t('প্রয়োজনীয় লিংক', 'Quick Links')}</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">{t('হোম পেজ', 'Home')}</Link></li>
              <li><Link href="/#products" className="hover:text-emerald-400 transition-colors">{t('সকল পণ্য', 'All Products')}</Link></li>
              <li><Link href="/#why-choose-us" className="hover:text-emerald-400 transition-colors">{t('কেন আমরা সেরা', 'Why Us')}</Link></li>
              <li><Link href="/#blog" className="hover:text-emerald-400 transition-colors">{t('ব্লগ ও হেলথ টিপস', 'Blog & Health Tips')}</Link></li>
              <li><Link href="/#contact-us" className="hover:text-emerald-400 transition-colors">{t('যোগাযোগ', 'Contact')}</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">{t('কাস্টমার কেয়ার', 'Customer Care')}</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>{t('ক্যাশ অন ডেলিভারি (COD)', 'Cash on Delivery (COD)')}</li>
              <li>{t('সহজ রিটার্ন পলিসি', 'Easy Return Policy')}</li>
              <li>{t('১০০% খাঁটি পণ্যের নিশ্চয়তা', '100% Genuine Guarantee')}</li>
              <li>{t('ফোনে অর্ডার সাপোর্ট', 'Phone Order Support')}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} ZaKJomok Healthy Food. {t('সর্বস্বত্ব সংরক্ষিত।', 'All rights reserved.')}</p>
          <p className="flex items-center gap-1">
            <span>{t('স্বাস্থ্যকর খাবার, সুন্দর জীবন', 'Healthy Food, Healthy Life')}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
