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

export default function ProductCard({
  product,
  onViewDetails,
  onOrderNow,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [isInternalModalOpen, setIsInternalModalOpen] = useState(false);

  const activePrice = product.discountPrice ?? product.price;
  const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.price);

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
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg">
        {/* Compact Product Image */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-stone-100">
          <img
            src={product.imageUrl || '/file.svg'}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 z-10">
            {hasDiscount && (
              <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-black text-white shadow-xs">
                ৳{product.price - (product.discountPrice ?? 0)} ছাড়
              </span>
            )}
            {product.isFeatured && (
              <span className="rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold text-emerald-800 shadow-xs backdrop-blur">
                ★ স্পেশাল
              </span>
            )}
          </div>

          {/* Right badge: Pack size or Calories */}
          <div className="absolute right-2.5 top-2.5 z-10 flex items-center gap-1">
            {product.calories && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-bold text-orange-700 shadow-xs backdrop-blur">
                <Flame className="h-3 w-3" />
                {product.calories} kcal
              </span>
            )}
            {product.packSize && (
              <span className="rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-stone-700 shadow-xs backdrop-blur">
                {product.packSize}
              </span>
            )}
          </div>
        </div>

        {/* Card Body - Compact & Clean */}
        <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
          <div>
            {/* Category */}
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              {product.categoryName}
            </span>

            {/* Product Title */}
            <h3 className="mt-1 line-clamp-1 text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
              {product.name}
            </h3>

            {/* "বিস্তারিত দেখুন" Button directly below title */}
            <button
              onClick={handleOpenDetails}
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50/70 px-2.5 py-1 text-xs font-bold text-emerald-800 transition-colors hover:bg-emerald-100 hover:text-emerald-950"
            >
              <Eye className="h-3.5 w-3.5 text-emerald-600" />
              বিস্তারিত দেখুন (উপকরণ ও পুষ্টি)
            </button>
          </div>

          {/* Bottom Pricing & Actions */}
          <div className="mt-3.5 border-t border-stone-100 pt-3">
            <div className="flex items-center justify-between gap-2">
              {/* Price */}
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black text-emerald-800">৳{activePrice}</span>
                  {hasDiscount && (
                    <span className="text-xs font-semibold text-stone-400 line-through">
                      ৳{product.price}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleOrder}
                  className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-3 py-2 text-xs font-extrabold text-white shadow-xs transition-all hover:from-emerald-700 hover:to-emerald-800 active:scale-95"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  অর্ডার করুন
                </button>

                <button
                  onClick={() => addToCart(product)}
                  title="কার্টে যোগ করুন"
                  aria-label="কার্টে যোগ করুন"
                  className="rounded-xl border border-stone-200 bg-white p-2 text-stone-700 shadow-2xs transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 active:scale-95"
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
