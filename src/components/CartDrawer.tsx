'use client';

import React from 'react';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, subtotal, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-emerald-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-700" />
              <h2 className="text-lg font-bold text-gray-900">আপনার শপিং কার্ট</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-semibold text-gray-700 text-base">আপনার কার্ট খালি!</p>
                <p className="text-sm text-gray-500 mt-1">পছন্দের স্বাস্থ্যকর খাবার কার্টে যোগ করুন।</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full text-sm transition-all shadow-md shadow-emerald-600/20"
                >
                  পণ্য ব্রাউজ করুন
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const activePrice = item.discountPrice ?? item.price;
                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-stone-50/60 rounded-xl border border-stone-200/60 hover:border-emerald-200 transition-colors"
                  >
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=150&q=80'}
                      alt={item.name}
                      className="w-18 h-18 rounded-lg object-cover bg-white"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{item.name}</h4>
                        {item.packSize && (
                          <span className="text-xs text-gray-500 font-medium">{item.packSize}</span>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-emerald-700 font-bold text-sm">৳{activePrice}</span>
                          {item.discountPrice && (
                            <span className="text-xs text-gray-400 line-through">৳{item.price}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600 rounded-l-lg transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-gray-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 text-gray-600 rounded-r-lg transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-white space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>মোট পণ্য মূল্য (Subtotal):</span>
                  <span className="font-semibold text-gray-900">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="text-emerald-600 font-medium">চেকআউট পেজে যুক্ত হবে</span>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                  <span>সর্বমোট:</span>
                  <span className="text-emerald-700 text-lg">৳{subtotal}</span>
                </div>
              </div>

              <div className="bg-emerald-50 text-emerald-800 text-xs p-2.5 rounded-lg text-center font-medium">
                🚚 ক্যাশ অন ডেলিভারি: পণ্য হাতে পেয়ে টাকা পরিশোধ করুন
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02]"
              >
                চেকআউট করুন
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
