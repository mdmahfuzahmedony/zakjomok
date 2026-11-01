'use client';

import React from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Product } from '../data/initialProducts';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, cart } = useCart();
  const [justAdded, setJustAdded] = React.useState(false);

  const activePrice = product.discountPrice ?? product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const inCart = cart.find((item) => item.id === product.id);

  const handleAdd = () => {
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-2xl border border-stone-200/80 hover:border-emerald-300 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {hasDiscount && (
            <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              সেভ ৳{product.price - (product.discountPrice ?? 0)}
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              জনপ্রিয়
            </span>
          )}
        </div>

        {/* Pack size indicator */}
        {product.packSize && (
          <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-gray-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-gray-200/60 shadow-xs">
            {product.packSize}
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-medium text-emerald-700 tracking-wide uppercase">
            {product.categoryName}
          </span>
          <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-2 mt-1 group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 mt-1.5 font-normal">
            {product.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-emerald-700">৳{activePrice}</span>
              {hasDiscount && (
                <span className="text-xs text-gray-400 line-through">৳{product.price}</span>
              )}
            </div>
            <span className="text-[10px] text-gray-400 block font-medium">ক্যাশ অন ডেলিভারি</span>
          </div>

          <button
            onClick={handleAdd}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
              justAdded
                ? 'bg-emerald-800 text-white'
                : inCart
                ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105 shadow-emerald-600/20'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" /> যোগ হয়েছে
              </>
            ) : inCart ? (
              <>
                <Check className="w-3.5 h-3.5" /> কার্টে আছে ({inCart.quantity})
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" /> কার্টে নিন
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
