'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  PhoneCall,
  Menu,
  X,
  User,
  ShoppingBag,
  Globe,
  LayoutDashboard,
  Package,
  Gift,
  LogOut,
  Shield,
  LogIn,
  UserPlus,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountDropdownOpen(false);
      }
    };
    if (accountDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [accountDropdownOpen]);

  const handleLogout = () => {
    logout();
    setAccountDropdownOpen(false);
    router.push('/');
  };

  const openCart = () => {
    setAccountDropdownOpen(false);
    setIsCartOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-xs border-b border-emerald-100">
      {/* Top Notification Bar */}
      <div className="bg-emerald-900 text-emerald-50 text-xs py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 text-center sm:text-left">
          <p className="flex items-center gap-1.5 justify-center font-medium text-[11px] sm:text-xs">
            <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {t(
              'প্রাকৃতিক ও স্বাস্থ্যকর খাবার সরাসরি আপনার ঘরে • ক্যাশ অন ডেলিভারি সুবিধা',
              'Natural & Healthy Food Delivered to Your Doorstep • Cash on Delivery'
            )}
          </p>
          <div className="hidden sm:flex items-center text-emerald-200">
            <span className="flex items-center gap-1 text-xs">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-300" /> {t('হটলাইন: ০১৩০৯-৮৩৪৪৮৩', 'Hotline: +8801309834483')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <img
              src="/logo.png"
              alt="ZaKJomok Brand Logo"
              className="h-8 sm:h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col justify-center">
              <span className="text-lg sm:text-2xl font-black tracking-tight text-stone-900 leading-none">
                ZaK<span className="text-emerald-600">Jomok</span>
              </span>
              <p className="text-[9px] sm:text-[11px] font-semibold text-emerald-700 tracking-wider uppercase mt-0.5">
                Good Food • Better You
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
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

          {/* Right Action: Language Switcher, Cart, Account Dropdown */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Language Toggle Button */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex h-9 items-center justify-center gap-1 rounded-full border border-stone-200 bg-stone-50 px-2 sm:px-3 text-xs font-bold text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 transition-all active:scale-95 shrink-0"
              title={language === 'bn' ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
              aria-label="Change Language"
            >
              <Globe className="h-4 w-4 text-emerald-600" />
              <span className="text-[11px] font-black uppercase">{language === 'bn' ? 'EN' : 'বাং'}</span>
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-emerald-700 px-2.5 sm:px-4 font-semibold text-white transition-colors hover:bg-emerald-800 active:scale-95 shadow-xs shrink-0"
              aria-label={`${t('কার্ট খুলুন', 'Open cart')}, ${totalItems}`}
              title={t('শপিং কার্ট', 'Shopping Cart')}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden text-xs sm:inline font-bold">{t('কার্ট', 'Cart')}</span>
              {totalItems > 0 && (
                <span className="flex h-4 min-w-4 sm:h-5 sm:min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] sm:text-xs font-black text-emerald-950">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Account Dropdown Container (Directly below button, NOT center modal) */}
            <div className="relative shrink-0" ref={accountRef}>
              <button
                type="button"
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className={`inline-flex h-9 items-center justify-center gap-1 rounded-full border px-2.5 sm:px-3.5 text-xs font-bold transition-all active:scale-95 ${
                  accountDropdownOpen
                    ? 'border-emerald-500 bg-emerald-100 text-emerald-950 shadow-xs'
                    : 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                }`}
                aria-expanded={accountDropdownOpen}
                aria-haspopup="menu"
                title={isAuthenticated ? user?.name : t('অ্যাকাউন্ট', 'Account')}
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {isAuthenticated
                    ? `${user?.name.split(' ')[0]}`
                    : t('অ্যাকাউন্ট', 'Account')}
                </span>
                <ChevronDown className={`h-3 w-3 hidden sm:inline transition-transform duration-200 ${accountDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* The Dropdown Menu positioned directly underneath */}
              {accountDropdownOpen && (
                <div
                  role="menu"
                  className="fixed sm:absolute right-2 sm:right-0 top-18 sm:top-full mt-2 w-[calc(100vw-1.5rem)] max-w-[320px] sm:w-84 rounded-2xl border border-stone-200/90 bg-white p-3.5 shadow-2xl z-[100] animate-in fade-in zoom-in-95 duration-150"
                >
                  {/* Top Arrow Pointer pointing to button */}
                  <div className="hidden sm:block absolute -top-1.5 right-6 w-3 h-3 bg-white border-t border-l border-stone-200 rotate-45 z-10" />

                  {isAuthenticated ? (
                    <div>
                      {/* User Bio Header */}
                      <div className="p-3 bg-gradient-to-r from-emerald-50 to-stone-50 rounded-xl border border-emerald-100/70 mb-2">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                            {user?.role === 'ADMIN' ? 'Admin Profile' : t('কাস্টমার প্রোফাইল', 'Customer Profile')}
                          </p>
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        </div>
                        <h4 className="font-extrabold text-stone-900 text-sm mt-0.5 truncate">
                          {user?.name}
                        </h4>
                        <p className="text-xs text-stone-500">{user?.phone}</p>
                      </div>

                      {/* Dropdown Navigation Links */}
                      <div className="space-y-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-stone-800 hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4 text-emerald-700" />
                          <span>{t('আমার ড্যাশবোর্ড', 'My Dashboard')}</span>
                        </Link>

                        <Link
                          href="/dashboard?tab=orders"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
                        >
                          <Package className="h-4 w-4 text-emerald-700" />
                          <span>{t('আমার অর্ডারসমূহ', 'My Orders')}</span>
                        </Link>

                        <Link
                          href="/dashboard?tab=discounts"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
                        >
                          <Gift className="h-4 w-4 text-emerald-700" />
                          <span>{t('অফার ও ভাউচার', 'Offers & Vouchers')}</span>
                        </Link>

                        <button
                          type="button"
                          onClick={openCart}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
                        >
                          <ShoppingBag className="h-4 w-4 text-emerald-700" />
                          <span>{t('শপিং কার্ট', 'Shopping Cart')}</span>
                        </button>

                        {user?.role === 'ADMIN' && (
                          <Link
                            href="/admin/dashboard"
                            onClick={() => setAccountDropdownOpen(false)}
                            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold text-amber-900 bg-amber-50/80 hover:bg-amber-100 transition-colors"
                          >
                            <Shield className="h-4 w-4 text-amber-700" />
                            <span>{t('অ্যাডমিন প্যানেল', 'Admin Panel')}</span>
                          </Link>
                        )}

                        <div className="pt-1.5 border-t border-stone-100">
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-rose-700 hover:bg-rose-50 transition-colors"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>{t('সাইন আউট', 'Sign Out')}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Guest User Header */}
                      <div className="p-3 bg-stone-50 rounded-xl mb-3 border border-stone-100 flex items-center gap-3">
                        <img src="/logo.png" alt="ZaKJomok" className="h-8 w-auto object-contain shrink-0" />
                        <div>
                          <p className="text-xs font-extrabold text-stone-900 leading-tight">
                            {t('ZaKJomok এ স্বাগতম!', 'Welcome to ZaKJomok!')}
                          </p>
                          <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">
                            {t('অর্ডার ট্র্যাক ও কুপন সুবিধা পেতে লগইন করুন।', 'Sign in to track orders and access exclusive coupons.')}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Link
                          href="/login"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition-colors"
                        >
                          <LogIn className="h-4 w-4" />
                          {t('লগইন করুন', 'Log In')}
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white py-2.5 text-xs font-bold text-stone-800 hover:bg-stone-50 transition-colors"
                        >
                          <UserPlus className="h-4 w-4 text-emerald-700" />
                          {t('নতুন অ্যাকাউন্ট খুলুন', 'Create Account')}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-stone-100 flex flex-col gap-2 font-medium text-stone-700 animate-in fade-in slide-in-from-top-2 duration-150">
            {/* Mobile Quick Cart & Language Row */}
            <div className="grid grid-cols-2 gap-2 pb-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs shadow-xs"
              >
                <span className="flex items-center gap-1.5">
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>{t('কার্ট', 'Cart')}</span>
                </span>
                <span className="rounded-full bg-amber-400 text-emerald-950 px-1.5 py-0.2 text-[10px] font-black">
                  {totalItems}
                </span>
              </button>

              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 font-bold text-xs hover:bg-stone-100"
              >
                <Globe className="h-3.5 w-3.5 text-emerald-600" />
                <span>{language === 'bn' ? 'English (EN)' : 'বাংলা (বাং)'}</span>
              </button>
            </div>

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

            {isAuthenticated ? (
              <div className="mt-2 pt-2 border-t border-stone-100 space-y-1">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl bg-emerald-50 text-emerald-900 font-bold flex items-center justify-between text-xs"
                >
                  <span className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4 text-emerald-700" />
                    <span>{t('আমার ড্যাশবোর্ড', 'My Dashboard')}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 truncate max-w-[120px]">
                    {user?.name}
                  </span>
                </Link>
                <Link
                  href="/dashboard?tab=orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-stone-700 hover:bg-stone-50 font-semibold flex items-center gap-2 text-xs"
                >
                  <Package className="h-4 w-4 text-emerald-700" />
                  <span>{t('আমার অর্ডারসমূহ', 'My Orders')}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50 rounded-xl"
                >
                  {t('লগআউট', 'Sign Out')}
                </button>
              </div>
            ) : (
              <div className="mt-2 pt-2 border-t border-stone-100 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl bg-emerald-700 text-white font-bold text-xs"
                >
                  {t('লগইন', 'Log In')}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-center rounded-xl border border-stone-200 bg-white text-stone-800 font-bold text-xs"
                >
                  {t('রেজিস্টার', 'Sign Up')}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
