'use client';

import React, { useEffect, useState } from 'react';
import {
  X,
  Flame,
  AlertTriangle,
  HeartPulse,
  Salad,
  CheckCircle2,
  ShoppingBag,
  Zap,
  Info,
  Clock,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Product } from '../data/initialProducts';
import { getProductHealthInfo } from '../data/productHealthInfo';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderNow: (product: Product, quantity: number) => void;
}

export default function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  onOrderNow,
}: ProductDetailsModalProps) {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'all' | 'ingredients' | 'nutrition' | 'benefits' | 'cautions'>('all');

  // Reset quantity on product change
  useEffect(() => {
    setQuantity(1);
    setActiveTab('all');
  }, [product]);

  // Handle escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const healthInfo = getProductHealthInfo(product);
  const activePrice = product.discountPrice ?? product.price;
  const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.price);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onClose();
  };

  const handleOrderNow = () => {
    onOrderNow(product, quantity);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-white shadow-2xl overflow-hidden border border-stone-200/80 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-2 text-stone-500 shadow-md backdrop-blur transition-all hover:bg-stone-100 hover:text-stone-800"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header / Product Quick Bio */}
        <div className="relative border-b border-stone-100 bg-gradient-to-r from-emerald-50/80 via-stone-50 to-emerald-50/40 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
            {/* Image */}
            <div className="relative aspect-square w-28 sm:w-36 shrink-0 overflow-hidden rounded-2xl border-2 border-white shadow-md bg-stone-100">
              <img
                src={product.imageUrl || '/file.svg'}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {hasDiscount && (
                <span className="absolute left-2 top-2 rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  ৳{product.price - (product.discountPrice ?? 0)} ছাড়
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  {product.categoryName}
                </span>
                {product.packSize && (
                  <span className="rounded-full bg-stone-200/80 px-2.5 py-0.5 text-[11px] font-semibold text-stone-700">
                    {product.packSize}
                  </span>
                )}
                {product.calories && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2.5 py-0.5 text-[11px] font-bold text-orange-800">
                    <Flame className="h-3 w-3" /> {product.calories} kcal
                  </span>
                )}
              </div>

              <h2 className="mt-2 text-lg sm:text-xl font-black text-stone-900 leading-snug">
                {product.name}
              </h2>

              <p className="mt-1 text-xs sm:text-sm text-stone-600 line-clamp-2">
                {product.description}
              </p>

              {/* Price & Stock */}
              <div className="mt-3 flex flex-wrap items-baseline justify-center sm:justify-start gap-3">
                <span className="text-2xl font-black text-emerald-800">৳{activePrice}</span>
                {hasDiscount && (
                  <span className="text-sm font-medium text-stone-400 line-through">৳{product.price}</span>
                )}
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {t('স্টক:', 'Stock:')} {product.stock > 0 ? `${product.stock} ${t('টি উপলব্ধ', 'available')}` : t('স্টক শেষ', 'Out of Stock')}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Section Filter Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 border-t border-emerald-100/60">
            {[
              { id: 'all', label: t('সব তথ্য', 'All Info'), icon: Sparkles },
              { id: 'ingredients', label: t('কী দিয়ে তৈরি (উপকরণ)', 'Ingredients'), icon: Salad },
              { id: 'nutrition', label: t('পুষ্টিগুণ ও এনার্জি', 'Nutrition Facts'), icon: Zap },
              { id: 'benefits', label: t('উপকারিতা', 'Health Benefits'), icon: HeartPulse },
              { id: 'cautions', label: t('কাদের খাওয়া নিষেধ / সতর্কতা', 'Who Should Avoid / Caution'), icon: AlertTriangle },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-white text-stone-600 hover:bg-emerald-100/60 hover:text-emerald-900 border border-stone-200'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* 1. তৈরি উপকরণ (Ingredients) */}
          {(activeTab === 'all' || activeTab === 'ingredients') && (
            <section className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="rounded-lg bg-emerald-100 p-2 text-emerald-800">
                  <Salad className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    কী কী দিয়ে তৈরি / উপাদান তালিকা
                  </h3>
                  <p className="text-xs text-stone-500">
                    শতভাগ প্রাকৃতিক ও স্বাস্থ্যকর উপাদানে প্রস্তুত
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
                {healthInfo.ingredients.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/50 p-2.5 text-xs text-emerald-950 font-medium"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 2. পুষ্টিগুণ ও ক্যালোরি (Nutrition & Calorie breakdown) */}
          {(activeTab === 'all' || activeTab === 'nutrition') && (
            <section className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="rounded-lg bg-amber-100 p-2 text-amber-800">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    পুষ্টিগুণ ও এনার্জি চার্ট (Nutrition Facts)
                  </h3>
                  <p className="text-xs text-stone-500">
                    শরীরের দৈনিক পুষ্টি চাহিদার নির্ভরযোগ্য প্রাকৃতিক উৎস
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                <div className="rounded-xl border border-stone-100 bg-stone-50 p-3 text-center">
                  <span className="block text-[11px] font-semibold text-stone-500">মোট ক্যালোরি</span>
                  <span className="mt-1 block text-sm font-black text-stone-900">
                    {healthInfo.nutrition.calories}
                  </span>
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 text-center">
                  <span className="block text-[11px] font-semibold text-emerald-800">প্রোটিন</span>
                  <span className="mt-1 block text-sm font-black text-emerald-950">
                    {healthInfo.nutrition.protein}
                  </span>
                </div>
                <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-3 text-center">
                  <span className="block text-[11px] font-semibold text-amber-800">ফাইবার</span>
                  <span className="mt-1 block text-sm font-black text-amber-950">
                    {healthInfo.nutrition.fiber}
                  </span>
                </div>
                <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-center">
                  <span className="block text-[11px] font-semibold text-blue-800">গুড ফ্যাট</span>
                  <span className="mt-1 block text-sm font-black text-blue-950">
                    {healthInfo.nutrition.fat}
                  </span>
                </div>
                <div className="rounded-xl border border-purple-100 bg-purple-50/60 p-3 text-center">
                  <span className="block text-[11px] font-semibold text-purple-800">কার্বোহাইড্রেট</span>
                  <span className="mt-1 block text-sm font-black text-purple-950">
                    {healthInfo.nutrition.carbs}
                  </span>
                </div>
                <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-3 text-center">
                  <span className="block text-[11px] font-semibold text-rose-800">খনিজ ও ভিটামিন</span>
                  <span className="mt-1 block text-xs font-bold text-rose-950">
                    {healthInfo.nutrition.minerals}
                  </span>
                </div>
              </div>
            </section>
          )}

          {/* 3. স্বাস্থ্য উপকারিতা (Health Benefits) */}
          {(activeTab === 'all' || activeTab === 'benefits') && (
            <section className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 to-white p-4 sm:p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="rounded-lg bg-emerald-600 p-2 text-white">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">
                    এটি খেলে কী কী উপকার পাবেন? (Health Benefits)
                  </h3>
                  <p className="text-xs text-stone-500">
                    নিয়মিত সেবনে আপনার শরীর ও মনের স্বাস্থ্যগত পরিবর্তন
                  </p>
                </div>
              </div>

              <ul className="mt-3 space-y-2.5">
                {healthInfo.benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-stone-800"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 4. কাদের খাওয়া উচিত নয় / সতর্কতা (Who Should NOT Consume / Caution) */}
          {(activeTab === 'all' || activeTab === 'cautions') && (
            <section className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4 sm:p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="rounded-lg bg-rose-600 p-2 text-white">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-rose-950">
                    কাদের খাওয়া উচিত নয় / বিশেষ সতর্কতা (Precautions)
                  </h3>
                  <p className="text-xs text-rose-700">
                    আপনার নিরাপত্তার জন্য অনুগ্রহ করে নিচের বিষয়গুলো খেয়াল রাখুন
                  </p>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                {healthInfo.cautions.map((caution, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-rose-200/80 bg-white p-3 text-xs text-rose-900 font-medium"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-bold text-rose-700">
                      !
                    </span>
                    <span className="leading-5">{caution}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5. খাওয়ার নিয়ম ও সময় */}
          {healthInfo.servingSuggestion && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 flex items-start gap-3">
              <Clock className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  খাওয়ার সঠিক নিয়ম ও সময়
                </h4>
                <p className="mt-1 text-xs text-amber-800 leading-relaxed font-medium">
                  {healthInfo.servingSuggestion}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="border-t border-stone-200 bg-stone-50/90 p-4 sm:p-5 backdrop-blur">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity Selector & Price Summary */}
            <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
              <div className="flex items-center rounded-xl border border-stone-200 bg-white p-1 shadow-2xs">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  className="rounded-lg p-1.5 text-stone-600 hover:bg-stone-100 disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-stone-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock || 20, q + 1))}
                  disabled={quantity >= (product.stock || 20)}
                  className="rounded-lg p-1.5 text-stone-600 hover:bg-stone-100 disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div>
                <span className="block text-[11px] font-medium text-stone-500">{t('মোট মূল্য:', 'Total Price:')}</span>
                <span className="text-xl font-black text-emerald-800">
                  ৳{activePrice * quantity}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleAddToCart}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-700 bg-white px-4 py-3 text-xs sm:text-sm font-bold text-emerald-800 shadow-2xs transition-all hover:bg-emerald-50 active:scale-95"
              >
                <ShoppingBag className="h-4 w-4" /> {t('কার্টে যোগ করুন', 'Add to Cart')}
              </button>

              <button
                onClick={handleOrderNow}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-5 py-3 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-emerald-900/20 transition-all hover:from-emerald-700 hover:to-emerald-800 active:scale-95"
              >
                {t('সরাসরি অর্ডার করুন', 'Order Directly')} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
