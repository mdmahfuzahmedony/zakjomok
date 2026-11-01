'use client';

import React from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onOrder: () => void;
}

export default function CartDrawer({ onOrder }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, subtotal, isCartOpen, setIsCartOpen } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        onClick={() => setIsCartOpen(false)}
      />
      <aside className="fixed inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 bg-emerald-50/50 p-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-emerald-700" />
            <h2 className="text-lg font-bold text-gray-900">আপনার কার্ট</h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="rounded-full p-1.5 text-gray-500 hover:bg-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="mb-3 h-10 w-10 text-emerald-600" />
              <p className="font-semibold text-gray-700">আপনার কার্ট খালি</p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-4 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white"
              >
                পণ্য দেখুন
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-3 rounded-xl border border-stone-200 p-3">
                <img
                  src={item.imageUrl || ''}
                  alt={item.name}
                  className="h-20 w-20 rounded-lg bg-stone-100 object-cover"
                />
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">{item.name}</h3>
                    {item.packSize && <p className="text-xs text-gray-500">{item.packSize}</p>}
                    <p className="mt-1 text-sm font-bold text-emerald-700">
                      ৳{item.discountPrice ?? item.price}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-gray-200">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-gray-100"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold">{item.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-gray-100"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="space-y-4 border-t border-gray-100 p-5">
            {totalItems < 2 && (
              <p className="rounded-xl bg-amber-50 p-3 text-center text-xs font-semibold text-amber-800">
                অর্ডার করতে কমপক্ষে ২টি পণ্য নিতে হবে
              </p>
            )}
            <div className="flex justify-between font-bold text-gray-900">
              <span>মোট</span>
              <span className="text-emerald-700">৳{subtotal}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>ডেলিভারি চার্জ</span>
              <span className="font-semibold text-emerald-700">ফ্রি</span>
            </div>
            <button
              type="button"
              onClick={onOrder}
              disabled={totalItems < 2}
              className="w-full rounded-xl bg-emerald-700 px-4 py-3.5 font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              অর্ডার করুন
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
