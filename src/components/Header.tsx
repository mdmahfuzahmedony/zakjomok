'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Leaf, PhoneCall, Menu, X, User, ShoppingBag, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import AccountModal from './AccountModal';

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-emerald-100">
      {/* Top Notification Bar */}
      <div className="bg-emerald-900 text-emerald-50 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 text-center sm:text-left">
          <p className="flex items-center gap-1.5 justify-center font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {t(
              'প্রাকৃতিক ও স্বাস্থ্যকর খাবার সরাসরি আপনার ঘরে • ক্যাশ অন ডেলিভারি সুবিধা',
              'Natural & Healthy Food Delivered to Your Doorstep • Cash on Delivery'
            )}
          </p>
          <div className="flex items-center text-emerald-200">
            <span className="flex items-center gap-1 text-xs">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-300" /> {t('হটলাইন: ০১৩০৯-৮৩৪৪৮৩', 'Hotline: +8801309834483')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-stone-900">
                ZaK<span className="text-emerald-600">Jomok</span>
              </span>
              <p className="text-[11px] font-semibold text-emerald-700 tracking-wider uppercase -mt-1">
                Good Food • Better You
              </p>
            </div>
          </Link>

          {/* Desktop Links (Dashboard is inside Account menu as requested) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700">
            <Link href="/" className="text-emerald-700 hover:text-emerald-800 transition-colors">
              {t('হোম', 'Home')}
            </Link>
            <Link href="/#products" className="hover:text-emerald-600 transition-colors">
              {t('পণ্যসমূহ', 'Products')}
            </Link>
            <Link href="/#why-choose-us" className="hover:text-emerald-600 transition-colors">
              {t('আমাদের বৈশিষ্ট্য', 'Why Choose Us')}
            </Link>
            <Link href="/#blog" className="hover:text-emerald-600 transition-colors">
              {t('স্বাস্থ্য টিপস', 'Health Tips')}
            </Link>
            <Link href="/#contact-us" className="hover:text-emerald-600 transition-colors">
              {t('যোগাযোগ', 'Contact')}
            </Link>
          </nav>

          {/* Right Action: Language Switcher, Cart, Account */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Toggle Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 transition-all active:scale-95"
              title={language === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
              aria-label="Change Language"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-600" />
              <span>{language === 'bn' ? 'EN' : 'বাংলা'}</span>
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 rounded-full bg-emerald-700 px-3.5 sm:px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-800 active:scale-95 shadow-xs"
              aria-label={`${t('কার্ট খুলুন', 'Open cart')}, ${totalItems}`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden text-xs sm:inline">{t('কার্ট', 'Cart')}</span>
              {totalItems > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-xs font-black text-emerald-950">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Account Button (Opens modal with Dashboard, Orders, Discounts, Logout) */}
            <button
              type="button"
              onClick={() => setAccountModalOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 transition-all hover:bg-emerald-100 active:scale-95"
              aria-haspopup="dialog"
              aria-label={isAuthenticated ? 'Open account menu' : 'Open login and registration'}
            >
              <User className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {isAuthenticated
                  ? `${user?.name.split(' ')[0]} (${t('অ্যাকাউন্ট', 'Account')})`
                  : t('লগইন / সাইনআপ', 'Login / Sign Up')}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-100 flex flex-col gap-2 font-medium text-stone-700">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700 font-semibold"
            >
              {t('হোম', 'Home')}
            </Link>
            <Link
              href="/#products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700 font-semibold"
            >
              {t('পণ্যসমূহ', 'Products')}
            </Link>
            <Link
              href="/#why-choose-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700 font-semibold"
            >
              {t('আমাদের বৈশিষ্ট্য', 'Why Choose Us')}
            </Link>
            <Link
              href="/#blog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700 font-semibold"
            >
              {t('স্বাস্থ্য টিপস', 'Health Tips')}
            </Link>
            <Link
              href="/#contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700 font-semibold"
            >
              {t('যোগাযোগ', 'Contact')}
            </Link>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between px-3">
              <span className="text-xs text-stone-500 font-medium">
                {t('ভাষা পরিবর্তন:', 'Language:')}
              </span>
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-bold text-stone-800 shadow-2xs"
              >
                <Globe className="h-3.5 w-3.5 text-emerald-600" />
                <span>{language === 'bn' ? 'Switch to English' : 'বাংলা করুন'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setAccountModalOpen(true);
              }}
              className="mt-2 px-3 py-2.5 text-left rounded-xl bg-emerald-50 text-emerald-800 font-bold flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              {isAuthenticated
                ? `${t('আমার অ্যাকাউন্ট', 'My Account')} (${user?.name})`
                : t('লগইন / রেজিস্টার', 'Login / Register')}
            </button>
          </div>
        )}
      </div>
      <AccountModal isOpen={accountModalOpen} onClose={() => setAccountModalOpen(false)} />
    </header>
  );
}
