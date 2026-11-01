'use client';

import React from 'react';
import { Check, Flame, ShoppingBag } from 'lucide-react';
import { Product } from '../data/initialProducts';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const activePrice = product.discountPrice ?? product.price;
  const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.price);

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-emerald-50 to-stone-100">
        <img
          src={product.imageUrl || '/file.svg'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {hasDiscount && (
            <span className="rounded-full bg-rose-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
              ৳{product.price - (product.discountPrice ?? 0)} ছাড়
            </span>
          )}
          {product.isFeatured && (
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-emerald-800 shadow-sm backdrop-blur">
              জনপ্রিয়
            </span>
          )}
        </div>

        {/* Pack size indicator */}
        {product.packSize && (
          <span className="absolute bottom-3 right-3 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-gray-700 shadow-sm backdrop-blur">
            {product.packSize}
          </span>
        )}
        {product.calories !== undefined && product.calories !== null && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-[11px] font-bold text-orange-700 shadow-sm backdrop-blur">
            <Flame className="h-3.5 w-3.5" />
            {product.calories} kcal
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700">
            {product.categoryName}
          </span>
          <h3 className="mt-2 line-clamp-2 min-h-12 text-base font-bold leading-6 text-gray-900 transition-colors group-hover:text-emerald-700">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-gray-500">
            {product.description}
          </p>
          {!!product.highlights?.length && (
            <ul className="mt-3 space-y-1.5">
              {product.highlights.slice(0, 3).map((highlight) => (
                <li key={highlight} className="flex items-start gap-1.5 text-xs font-medium leading-5 text-emerald-900">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}
          {!!product.ingredients?.length && (
            <p className="mt-3 border-t border-stone-100 pt-2.5 text-[11px] leading-5 text-gray-500">
              <span className="font-bold text-gray-700">উপাদান: </span>
              {product.ingredients.slice(0, 4).join(' • ')}
              {product.ingredients.length > 4 ? '…' : ''}
            </p>
          )}
        </div>

        {/* Price & Action Button */}
        <div className="mt-5 flex items-end justify-between gap-3 border-t border-stone-100 pt-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-xl font-black text-emerald-800">৳{activePrice}</span>
              {hasDiscount && (
                <span className="text-xs font-medium text-gray-400 line-through">৳{product.price}</span>
              )}
            </div>
            <span className="mt-0.5 block text-[10px] font-medium text-gray-400">ফ্রি ডেলিভারি</span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-2.5 text-xs font-bold text-white shadow-sm shadow-emerald-900/10 transition-all hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> যোগ করুন
          </button>
        </div>
      </div>
    </article>
  );
}
