'use client';

import React, { useState } from 'react';
import {
  Flame,
  ShoppingBag,
  Eye,
  ArrowRight,
} from 'lucide-react';
import { Product } from '../data/initialProducts';
import { useCart } from '../context/CartContext';
import ProductDetailsModal from './ProductDetailsModal';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  onOrderNow?: (product: Product) => void;
}

const FALLBACK_FOOD_IMAGE = 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80';

export default function ProductCard({
  product,
  onViewDetails,
  onOrderNow,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [isInternalModalOpen, setIsInternalModalOpen] = useState(false);

  const activePrice = product.discountPrice ?? product.price;
  const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.price);
  const validImageUrl = product.imageUrl && product.imageUrl.startsWith('http') ? product.imageUrl : FALLBACK_FOOD_IMAGE;

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
      <article className="flex flex-col overflow-hidden rounded-3xl border border-stone-200/90 bg-white shadow-xs">
        {/* Compact Product Image */}
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-100">
          <img
            src={validImageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5 z-10">
            {hasDiscount && (
              <span className="rounded-full bg-rose-600 px-2.5 py-0.5 text-[10px] font-black text-white shadow-xs">
                ৳{product.price - (product.discountPrice ?? 0)} ছাড়
              </span>
            )}
            {product.isFeatured && (
              <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 shadow-xs backdrop-blur">
                ★ সেরা পছন্দ
              </span>
            )}
          </div>

          {/* Right badge: Pack size or Calories */}
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1">
            {product.calories && (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold text-orange-700 shadow-xs backdrop-blur">
                <Flame className="h-3 w-3" />
                {product.calories} kcal
              </span>
            )}
            {product.packSize && (
              <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-semibold text-stone-700 shadow-xs backdrop-blur">
                {product.packSize}
              </span>
            )}
          </div>
        </div>

        {/* Card Body - Compact & Clean */}
        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
          <div>
            {/* Category */}
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              {product.categoryName}
            </span>

            {/* Product Title */}
            <h3 className="mt-2 text-base sm:text-lg font-bold text-stone-900 line-clamp-1 leading-snug">
              {product.name}
            </h3>

            {/* "বিস্তারিত দেখুন" Button directly below title */}
            <button
              onClick={handleOpenDetails}
              className="mt-2.5 inline-flex items-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50/70 px-3 py-1.5 text-xs font-bold text-emerald-800 transition-colors hover:bg-emerald-100 hover:text-emerald-950"
            >
              <Eye className="h-3.5 w-3.5 text-emerald-600" />
              বিস্তারিত দেখুন (উপকরণ ও পুষ্টি)
            </button>
          </div>

          {/* Bottom Pricing & Actions */}
          <div className="mt-4 border-t border-stone-100 pt-3.5">
            <div className="flex items-center justify-between gap-2">
              {/* Price */}
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-emerald-800">৳{activePrice}</span>
                  {hasDiscount && (
                    <span className="text-xs font-semibold text-stone-400 line-through">
                      ৳{product.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleOrder}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-3.5 py-2.5 text-xs font-black text-white shadow-xs shadow-emerald-900/10 transition-all hover:from-emerald-700 hover:to-emerald-800 active:scale-95"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  অর্ডার করুন
                </button>

                <button
                  onClick={() => addToCart(product)}
                  title="কার্টে যোগ করুন"
                  aria-label="কার্টে যোগ করুন"
                  className="rounded-xl border border-stone-200 bg-white p-2.5 text-stone-700 shadow-2xs transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 active:scale-95"
                >
                  <ShoppingBag className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Internal Modal fallback if no parent handler */}
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
