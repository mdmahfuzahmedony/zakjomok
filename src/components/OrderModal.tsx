'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';
import { CartItem, useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder, validateCoupon } from '../lib/api';

interface OrderModalProps {
  cart: CartItem[];
  subtotal: number;
  onClose: () => void;
}

export default function OrderModal({ cart, subtotal, onClose }: OrderModalProps) {
  const { user } = useAuth();
  const { clearCart } = useCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const [errorMessage, setErrorMessage] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [isCheckingCoupon, setIsCheckingCoupon] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    if (isSubmitting) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSubmitting, onClose]);

  if (cart.length === 0 && !orderConfirmed) return null;

  const handleApplyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError('কুপন কোড লিখুন।');
      return;
    }

    setCouponError('');
    setIsCheckingCoupon(true);
    try {
      const result = await validateCoupon(code, subtotal, user?.id);
      setAppliedCoupon({
        code: result.data.code,
        discountAmount: Number(result.data.discountAmount),
      });
      setCouponCode(code);
    } catch (error) {
      setAppliedCoupon(null);
      setCouponError(error instanceof Error ? error.message : 'কুপন যাচাই করা যায়নি।');
    } finally {
      setIsCheckingCoupon(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    const formData = new FormData(event.currentTarget);
    const customerName = String(formData.get('customerName') || '').trim();
    const customerPhone = String(formData.get('customerPhone') || '').trim();
    const customerAddress = String(formData.get('customerAddress') || '').trim();

    if (totalItems < 2) {
      setErrorMessage('অর্ডার করতে কমপক্ষে ২টি পণ্য নিতে হবে।');
      return;
    }

    if (customerPhone.replace(/\D/g, '').length < 11) {
      setErrorMessage('সঠিক মোবাইল নম্বর দিন (কমপক্ষে ১১ ডিজিট)।');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await placeOrder({
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerAddress: customerAddress.trim(),
        deliveryCity: 'Dhaka',
        couponCode: appliedCoupon?.code,
        userId: user?.id,
        items: cart.map((item) => ({ productId: item.id, quantity: item.quantity })),
      });

      if (!result.success) {
        setErrorMessage(result.message || 'অর্ডার জমা দেওয়া যায়নি। আবার চেষ্টা করুন।');
        return;
      }

      clearCart();
      setOrderConfirmed(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'অর্ডার সম্পন্ন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = Math.max(0, subtotal - (appliedCoupon?.discountAmount || 0));

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={orderConfirmed ? 'order-confirmed-title' : 'order-modal-title'}
        className="relative max-h-full w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close order form"
          className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
        >
          <X className="h-5 w-5" />
        </button>

        {orderConfirmed ? (
          <div className="flex flex-col items-center py-6 text-center">
            <CheckCircle2 className="mb-3 h-12 w-12 text-emerald-600" />
            <h2 id="order-confirmed-title" className="text-xl font-bold text-gray-900">
              আপনার অর্ডারটি কনফার্ম হয়েছে
            </h2>
          </div>
        ) : (
          <>
            <div className="mb-6 pr-8">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <h2 id="order-modal-title" className="text-xl font-black text-gray-900">
                অর্ডার করুন
              </h2>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                {cart.map((item) => (
                  <p key={item.id}>
                    {item.name} × {item.quantity}
                  </p>
                ))}
              </div>
              <p className="mt-2 font-bold text-emerald-700">
                মোট: ৳{subtotal} · ডেলিভারি ফ্রি
              </p>
            </div>

            {errorMessage && (
              <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {errorMessage}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="order-coupon" className="block text-sm font-semibold text-gray-700">
                  কুপন কোড
                </label>
                <div className="mt-1.5 flex gap-2">
                  <input
                    id="order-coupon"
                    type="text"
                    value={couponCode}
                    onChange={(event) => {
                      setCouponCode(event.target.value.toUpperCase());
                      setAppliedCoupon(null);
                      setCouponError('');
                    }}
                    placeholder="কুপন কোড লিখুন"
                    className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={isCheckingCoupon || isSubmitting}
                    className="rounded-xl bg-emerald-100 px-4 py-2.5 text-sm font-bold text-emerald-800 hover:bg-emerald-200 disabled:opacity-60"
                  >
                    {isCheckingCoupon ? 'যাচাই হচ্ছে...' : 'প্রয়োগ'}
                  </button>
                </div>
                {couponError && <p role="alert" className="mt-1 text-xs text-red-600">{couponError}</p>}
                {appliedCoupon && (
                  <p className="mt-1 text-xs font-semibold text-emerald-700">
                    কুপন প্রয়োগ হয়েছে — ৳{appliedCoupon.discountAmount} ছাড়
                  </p>
                )}
              </div>

              <label className="block text-sm font-semibold text-gray-700">
                আপনার নাম
                <input
                  type="text"
                  autoComplete="name"
                  required
                  name="customerName"
                  defaultValue={user?.name || ''}
                  placeholder="আপনার নাম লিখুন"
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600"
                />
              </label>

              <label className="block text-sm font-semibold text-gray-700">
                মোবাইল নম্বর
                <input
                  type="tel"
                  autoComplete="tel"
                  required
                  name="customerPhone"
                  defaultValue={user?.phone || ''}
                  placeholder="01XXXXXXXXX"
                  className="mt-1.5 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600"
                />
              </label>

              <label className="block text-sm font-semibold text-gray-700">
                ডেলিভারি ঠিকানা
                <textarea
                  autoComplete="street-address"
                  required
                  name="customerAddress"
                  rows={3}
                  defaultValue={user?.address || ''}
                  placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                  className="mt-1.5 w-full resize-y rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600"
                />
              </label>

              <div className="space-y-1 border-t border-gray-100 pt-3 text-sm">
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700">
                    <span>কুপন ছাড়</span>
                    <span>−৳{appliedCoupon.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-gray-900">
                  <span>ডেলিভারিসহ মোট</span>
                  <span>৳{total}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isCheckingCoupon}
                className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-bold text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'অর্ডার পাঠানো হচ্ছে...' : 'অর্ডার নিশ্চিত করুন'}
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
