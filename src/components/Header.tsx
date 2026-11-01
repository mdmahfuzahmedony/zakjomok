'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Leaf, PhoneCall, Menu, X, User, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import AccountModal from './AccountModal';

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-emerald-100">
      {/* Top Notification Bar */}
      <div className="bg-emerald-900 text-emerald-50 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 text-center sm:text-left">
          <p className="flex items-center gap-1.5 justify-center font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            প্রাকৃতিক ও স্বাস্থ্যকর খাবার সরাসরি আপনার ঘরে • ক্যাশ অন ডেলিভারি সুবিধা
          </p>
          <div className="flex items-center text-emerald-200">
            <span className="flex items-center gap-1 text-xs">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-300" /> হটলাইন: ০১৩০৯-৮৩৪৪৮৩
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
              <span className="text-2xl font-black tracking-tight text-gray-900">
                ZaK<span className="text-emerald-600">Jomok</span>
              </span>
              <p className="text-[11px] font-semibold text-emerald-700 tracking-wider uppercase -mt-1">
                Good Food • Better You
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-700">
            <Link href="/" className="text-emerald-700 hover:text-emerald-800 transition-colors">
              হোম
            </Link>
            <a href="#products" className="hover:text-emerald-600 transition-colors">
              পণ্যসমূহ
            </a>
            <a href="#fresh-meals" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              সালাদ ও স্যান্ডউইচ
            </a>
            <a href="#why-choose-us" className="hover:text-emerald-600 transition-colors">
              আমাদের বৈশিষ্ট্য
            </a>
            <a href="#contact-us" className="hover:text-emerald-600 transition-colors">
              যোগাযোগ
            </a>
          </nav>

          {/* Right Action: Cart and user profile */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-800"
              aria-label={`কার্ট খুলুন, ${totalItems}টি পণ্য`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden text-xs sm:inline">কার্ট</span>
              {totalItems > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-xs font-black text-emerald-950">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setAccountModalOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-800 transition-all hover:bg-emerald-100"
              aria-haspopup="dialog"
              aria-label={isAuthenticated ? 'Open account menu' : 'Open login and registration'}
            >
              <User className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {isAuthenticated ? `${user?.name.split(' ')[0]} (অ্যাকাউন্ট)` : 'লগইন / সাইনআপ'}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-3 font-medium text-gray-700">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700"
            >
              হোম
            </Link>
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700"
            >
              পণ্যসমূহ
            </a>
            <a
              href="#fresh-meals"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700"
            >
              🥗 সালাদ ও স্যান্ডউইচ
            </a>
            <a
              href="#why-choose-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700"
            >
              আমাদের বৈশিষ্ট্য
            </a>
            <a
              href="#contact-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-emerald-50 hover:text-emerald-700"
            >
              যোগাযোগ
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setAccountModalOpen(true);
              }}
              className="px-3 py-2 text-left rounded-md bg-emerald-50 text-emerald-800 font-bold"
            >
              {isAuthenticated ? `আমার অ্যাকাউন্ট (${user?.name})` : 'লগইন / রেজিস্টার'}
            </button>
          </div>
        )}
      </div>
      <AccountModal isOpen={accountModalOpen} onClose={() => setAccountModalOpen(false)} />
    </header>
  );
}
