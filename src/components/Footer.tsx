import React from 'react';
import Link from 'next/link';
import { Leaf, Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-black text-white">
                  ZaK<span className="text-emerald-400">Jomok</span>
                </span>
                <p className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">
                  Good Food • Better You
                </p>
              </div>
            </Link>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              ZakJomok এর মূল লক্ষ্য স্বাস্থ্যকর খাবার ও পুষ্টিকর পণ্য ঘরে ঘরে পৌঁছে দেওয়া। ফ্রেশ সালাদ, হোল হুইট স্যান্ডউইচ, বাদাম ও অর্গানিক সিডস দিয়ে গড়ে উঠুক আপনার সুস্থ আগামী।
            </p>

            <div className="pt-2 text-xs text-gray-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>হটলাইন: 01700-000000 (সকাল ৯টা - রাত ১০টা)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>ইমেইল: support@zakjomok.com</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>ঢাকা, বাংলাদেশ</span>
              </p>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">জনপ্রিয় ক্যাটাগরি</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><a href="#products" className="hover:text-emerald-400 transition-colors">Nuts & Dry Fruits</a></li>
              <li><a href="#products" className="hover:text-emerald-400 transition-colors">Organic Seeds</a></li>
              <li><a href="#products" className="hover:text-emerald-400 transition-colors">Oats & Breakfast</a></li>
              <li><a href="#fresh-meals" className="hover:text-emerald-400 transition-colors">Healthy Mixed Salad</a></li>
              <li><a href="#fresh-meals" className="hover:text-emerald-400 transition-colors">Healthy Sandwich</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">প্রয়োজনীয় লিংক</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">হোম পেজ</Link></li>
              <li><a href="#products" className="hover:text-emerald-400 transition-colors">সব পণ্য</a></li>
              <li><a href="#why-choose-us" className="hover:text-emerald-400 transition-colors">আমাদের বৈশিষ্ট্য</a></li>
              <li><Link href="/checkout" className="hover:text-emerald-400 transition-colors">চেকআউট</Link></li>
              <li><Link href="/admin" className="hover:text-emerald-400 transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Trust / Policy */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">ডেলিভারি ও সেবা</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>🚚 ক্যাশ অন ডেলিভারি (COD)</li>
              <li>📞 প্রতিটি অর্ডারে ফোন কল কনফার্মেশন</li>
              <li>🔒 ১০০% নিরাপদ ও নির্ভরযোগ্য সেবা</li>
              <li>⚡ ঢাকার ভেতরে দ্রুত ডেলিভারি</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 ZakJomok. সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Healthy Living
          </p>
        </div>
      </div>
    </footer>
  );
}
