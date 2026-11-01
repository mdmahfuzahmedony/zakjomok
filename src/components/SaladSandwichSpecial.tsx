'use client';

import React from 'react';
import { Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../data/initialProducts';

interface SaladSandwichProps {
  products: Product[];
}

export default function SaladSandwichSpecial({ products }: SaladSandwichProps) {
  const { addToCart } = useCart();
  // Find the salad and sandwich products
  const salad = products.find((p) => p.slug.includes('salad'));
  const sandwich = products.find((p) => p.slug.includes('sandwich'));

  return (
    <section id="fresh-meals" className="py-16 bg-gradient-to-b from-emerald-900 to-teal-950 text-white relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-700 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span>দৈনিক ফ্রেশ খাবার সম্ভার</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            স্বাদ ও সুস্বাস্থ্যের অনন্য মেলবন্ধন
          </h2>
          <p className="text-emerald-200/80 text-base mt-2">
            প্রতিদিন তাজা উপাদান দিয়ে প্রস্তুতকৃত আমাদের স্পেশাল মিক্সড সালাদ এবং পুষ্টিকর হোল হুইট স্যান্ডউইচ।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Item 1: Healthy Mixed Salad */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-400/40 transition-all group">
            <div className="space-y-6">
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden shadow-lg bg-emerald-950">
                <img
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80"
                  alt="Healthy Mixed Salad"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  🥗 স্পেশাল আইটেম
                </span>
                <span className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full">
                  প্যাক: ১ বাটি (৩৫০ গ্রাম)
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">Healthy Mixed Salad (মিক্সড সালাদ)</h3>
                <p className="text-emerald-100/90 text-sm mt-2 leading-relaxed">
                  ডিম, গাজর, টমেটো, শসা, কাবলি ছোলা এবং অন্যান্য পুষ্টিকর তাজা সবজির সমন্বয়ে তৈরি সম্পূর্ণ ব্যালেন্সড ডায়াটরি খাবার।
                </p>

                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs text-emerald-200">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>সেদ্ধ দেশি ডিমের প্রোটিন</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>ছোলা ও খনিজ পুষ্টি</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>তাজা শসা ও টমেটো</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>জিরো প্রিজারভেটিভস</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-2xl font-black text-emerald-300">৳১৫০</span>
                <span className="text-sm text-gray-400 line-through ml-2">৳১৮০</span>
              </div>
              {salad && (
                <button
                  onClick={() => addToCart(salad)}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl flex items-center gap-2 transition-all hover:scale-105 shadow-md shadow-emerald-500/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  কার্টে যোগ করুন
                </button>
              )}
            </div>
          </div>

          {/* Item 2: Healthy Sandwich */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-400/40 transition-all group">
            <div className="space-y-6">
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden shadow-lg bg-emerald-950">
                <img
                  src="https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80"
                  alt="Healthy Sandwich"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  🥪 স্পেশাল আইটেম
                </span>
                <span className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full">
                  প্যাক: ২ পিস
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">Healthy Sandwich (হোল হুইট স্যান্ডউইচ)</h3>
                <p className="text-emerald-100/90 text-sm mt-2 leading-relaxed">
                  ১০০% হোল হুইট ব্রাউন ব্রেড, সেদ্ধ ডিমের পুষ্টি এবং ক্রাঞ্চি তাজা সবজির নিখুঁত ফিলিং দিয়ে তৈরি সকাল বা বিকেলের পারফেক্ট নাশতা।
                </p>

                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs text-emerald-200">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>১০০% হোল হুইট ব্রেড</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>উচ্চমানের ডিম ও প্রোটিন</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>হালকা ও স্বাস্থ্যবান্ধব সস</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>হাতে প্রস্তুতকৃত সতেজতা</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-2xl font-black text-emerald-300">৳১২০</span>
                <span className="text-sm text-gray-400 line-through ml-2">৳১৪০</span>
              </div>
              {sandwich && (
                <button
                  onClick={() => addToCart(sandwich)}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl flex items-center gap-2 transition-all hover:scale-105 shadow-md shadow-emerald-500/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  কার্টে যোগ করুন
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
