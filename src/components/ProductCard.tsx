'use client';

import React, { useState } from 'react';
import {
  Check,
  Flame,
  ShoppingBag,
  Eye,
  Salad,
  Zap,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Product } from '../data/initialProducts';
import { getProductHealthInfo } from '../data/productHealthInfo';
import { useCart } from '../context/CartContext';
import ProductDetailsModal from './ProductDetailsModal';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  onOrderNow?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onViewDetails,
  onOrderNow,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [isInternalModalOpen, setIsInternalModalOpen] = useState(false);

  const activePrice = product.discountPrice ?? product.price;
  const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.price);
  const healthInfo = getProductHealthInfo(product);

  const handleOpenDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    } else {
      setIsInternalModalOpen(true);
    }
  };

  const handleOrder = () => {
    if (onOrderNow) {
      onOrderNow(product);
    } else {
      addToCart(product);
    }
  };

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl">
        {/* Product Image & Badges */}
        <div className="relative aspect-4/3 sm:aspect-square w-full overflow-hidden bg-gradient-to-br from-emerald-50/60 to-stone-100">
          <img
            src={product.imageUrl || '/file.svg'}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Top Left Badges */}
          <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5 z-10">
            {hasDiscount && (
              <span className="rounded-full bg-rose-600 px-2.5 py-1 text-[11px] font-black text-white shadow-md">
                ৳{product.price - (product.discountPrice ?? 0)} ছাড়
              </span>
            )}
            {product.isFeatured && (
              <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-emerald-800 shadow-sm backdrop-blur">
                ★ সেরা পছন্দ
              </span>
            )}
          </div>

          {/* Top Right Badges */}
          <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5 z-10">
            {product.calories !== undefined && product.calories !== null && (
              <span className="inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/95 px-2.5 py-1 text-[11px] font-bold text-orange-700 shadow-sm backdrop-blur">
                <Flame className="h-3.5 w-3.5" />
                {product.calories} kcal
              </span>
            )}
          </div>

          {/* Bottom Pack Size Indicator */}
          {product.packSize && (
            <span className="absolute bottom-3 right-3 rounded-full border border-white/70 bg-white/95 px-3 py-1 text-[11px] font-semibold text-stone-700 shadow-sm backdrop-blur">
              {product.packSize}
            </span>
          )}

          {/* Quick Hover "View Details" Overlay Button */}
          <div className="absolute inset-0 bg-stone-900/25 opacity-0 backdrop-blur-2xs transition-opacity duration-200 group-hover:opacity-100 hidden sm:flex items-center justify-center">
            <button
              onClick={handleOpenDetails}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-stone-900 shadow-lg backdrop-blur transition-transform duration-150 hover:scale-105 hover:bg-emerald-50 hover:text-emerald-900"
            >
              <Eye className="h-3.5 w-3.5 text-emerald-700" /> বিস্তারিত দেখুন
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex-1">
            {/* Category */}
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700">
              {product.categoryName}
            </span>

            {/* Title */}
            <h3 className="mt-1.5 line-clamp-2 min-h-11 text-base font-bold leading-snug text-stone-900 transition-colors group-hover:text-emerald-800">
              {product.name}
            </h3>

            {/* Description */}
            <p className="mt-1.5 line-clamp-2 min-h-9 text-xs leading-5 text-stone-500">
              {product.description}
            </p>

            {/* কী দিয়ে তৈরি / উপাদান সংক্ষেপ (Ingredients Preview) */}
            <div className="mt-3 rounded-xl border border-emerald-100 bg-emerald-50/40 p-2.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900">
                <Salad className="h-3.5 w-3.5 text-emerald-600" />
                <span>কী দিয়ে তৈরি / উপকরণ:</span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {healthInfo.ingredients.slice(0, 3).map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-block rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-emerald-900 border border-emerald-100/80 shadow-2xs"
                  >
                    {item.split(' ')[0]} {item.split(' ')[1] || ''}
                  </span>
                ))}
                {healthInfo.ingredients.length > 3 && (
                  <span className="inline-block rounded-md bg-emerald-100/60 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                    +{healthInfo.ingredients.length - 3}টি
                  </span>
                )}
              </div>
            </div>

            {/* View Details Button (Mobile & Desktop Accessible) */}
            <button
              onClick={handleOpenDetails}
              className="mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50/70 py-2 text-xs font-bold text-stone-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
            >
              <Eye className="h-3.5 w-3.5 text-emerald-600" />
              বিস্তারিত পুষ্টিগুণ ও উপকারিতা দেখুন
            </button>
          </div>

          {/* Pricing & Call to Actions */}
          <div className="mt-4 border-t border-stone-100 pt-3">
            <div className="flex items-baseline justify-between mb-3">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-emerald-800">৳{activePrice}</span>
                {hasDiscount && (
                  <span className="text-xs font-semibold text-stone-400 line-through">
                    ৳{product.price}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                ক্যাশ অন ডেলিভারি
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Order Now Button (Direct Checkout) */}
              <button
                onClick={handleOrder}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-3 py-2.5 text-xs font-black text-white shadow-sm shadow-emerald-900/10 transition-all hover:from-emerald-700 hover:to-emerald-800 active:scale-95"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                অর্ডার করুন
              </button>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product)}
                title="কার্টে যোগ করুন"
                aria-label="কার্টে যোগ করুন"
                className="inline-flex shrink-0 items-center justify-center rounded-xl border border-stone-200 bg-white p-2.5 text-stone-700 shadow-2xs transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 active:scale-95"
              >
                <ShoppingBag className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Internal Modal if no parent modal handler */}
      {!onViewDetails && (
        <ProductDetailsModal
          product={product}
          isOpen={isInternalModalOpen}
          onClose={() => setIsInternalModalOpen(false)}
          onOrderNow={(prod, qty) => {
            setIsInternalModalOpen(false);
            for (let i = 0; i < qty; i++) {
              addToCart(prod);
            }
            if (onOrderNow) {
              onOrderNow(prod);
            }
          }}
        />
      )}
    </>
  );
}
