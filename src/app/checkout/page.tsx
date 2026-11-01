'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CartDrawer from '../../components/CartDrawer';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { placeOrder } from '../../lib/api';
import { ShieldCheck, Truck, Phone, ArrowLeft, CheckCircle2, Tag, Check } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerAddress, setCustomerAddress] = useState(user?.address || '');
  const [deliveryCity, setDeliveryCity] = useState<'Dhaka' | 'Outside'>('Dhaka');
  const [note, setNote] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto populate if user profile updates
  React.useEffect(() => {
    if (user) {
      if (!customerName) setCustomerName(user.name);
      if (!customerPhone && user.phone) setCustomerPhone(user.phone);
      if (!customerAddress && user.address) setCustomerAddress(user.address);
    }
  }, [user]);

  const deliveryCharge = deliveryCity === 'Dhaka' ? 60 : 120;
  const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, subtotal + (cart.length > 0 ? deliveryCharge : 0) - discountAmount);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponError('');

    try {
      const res = await fetch('http://localhost:5000/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: couponInput.trim(),
          subtotal,
          userId: user?.id,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAppliedCoupon({ code: data.data.code, discount: data.data.discountAmount });
        setCouponInput('');
        return;
      } else {
        setCouponError(data.message || 'কুপনটি সঠিক নয়');
        return;
      }
    } catch (e) {
      // Offline fallback check
      const code = couponInput.trim().toUpperCase();
      if (code === 'WELCOME10') {
        const disc = Math.round((subtotal * 10) / 100);
        setAppliedCoupon({ code, discount: disc });
        setCouponInput('');
      } else if (code === 'HEALTHY50') {
        setAppliedCoupon({ code, discount: 50 });
        setCouponInput('');
      } else {
        setCouponError('কুপন কোডটি সঠিক নয়। (টেস্ট করতে WELCOME10 ব্যবহার করুন)');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setErrorMessage('আপনার কার্ট খালি। অনুগ্রহ করে পণ্য যোগ করুন।');
      return;
    }

    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      setErrorMessage('দয়া করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা দিন।');
      return;
    }

    // Phone validation
    const cleanPhone = customerPhone.replace(/\D/g, '');
    if (cleanPhone.length < 11) {
      setErrorMessage('সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)।');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const orderData = {
        customerName,
        customerPhone,
        customerAddress,
        deliveryCity: deliveryCity === 'Dhaka' ? 'Dhaka' : 'Outside Dhaka',
        note,
        couponCode: appliedCoupon?.code,
        discountAmount,
        userId: user?.id,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      const res = await placeOrder(orderData);

      if (res && res.success) {
        clearCart();
        const orderNumber = res.data?.orderNumber || 'ZAK-SUCCESS';
        router.push(
          `/order-success?orderNumber=${orderNumber}&name=${encodeURIComponent(customerName)}&phone=${encodeURIComponent(customerPhone)}&address=${encodeURIComponent(customerAddress)}&total=${grandTotal}&city=${encodeURIComponent(orderData.deliveryCity)}`
        );
      } else {
        setErrorMessage(res?.message || 'অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      }
    } catch (err) {
      setErrorMessage('অর্ডার সম্পন্ন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50/40 flex flex-col font-sans">
      <Header />
      <CartDrawer />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-900 mb-6 bg-white px-3.5 py-1.5 rounded-full border border-stone-200 shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> পণ্য তালিকায় ফিরে যান
        </Link>

        <div className="mb-8">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
            চেকআউট ও ডেলিভারি
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-1">
            অর্ডার কনফার্ম করুন
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            ক্যাশ অন ডেলিভারি: পণ্য হাতে পেয়ে টাকা পরিশোধ করুন।
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
            ⚠️ {errorMessage}
          </div>
        )}

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 max-w-lg mx-auto">
            <p className="text-base font-bold text-gray-800">আপনার কার্টে কোনো পণ্য নেই</p>
            <p className="text-xs text-gray-500 mt-1">অর্ডার করতে প্রথমে পছন্দের পণ্য কার্টে যোগ করুন।</p>
            <Link
              href="/"
              className="mt-6 inline-block px-6 py-2.5 bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md"
            >
              পণ্যসমূহ দেখুন
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Customer Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs">
              <h2 className="text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100 flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-600" />
                আপনার ডেলিভারি তথ্য
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    আপনার সম্পূর্ণ নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: মোঃ সাকিব হোসেন"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    মোবাইল নম্বর (ফোনে অর্ডার কনফার্ম করা হবে) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-emerald-600 focus:outline-hidden"
                  />
                  <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-600" /> অর্ডার নিশ্চিত করার জন্য আমাদের প্রতিনিধি আপনাকে কল করবেন
                  </p>
                </div>

                {/* Delivery City selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    ডেলিভারি এলাকা <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDeliveryCity('Dhaka')}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        deliveryCity === 'Dhaka'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-2xs'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <p className="text-sm font-semibold">ঢাকার ভেতরে</p>
                      <p className="text-xs text-emerald-700 font-bold mt-0.5">চার্জ: ৳৬০</p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryCity('Outside')}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        deliveryCity === 'Outside'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-2xs'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <p className="text-sm font-semibold">ঢাকার বাইরে</p>
                      <p className="text-xs text-emerald-700 font-bold mt-0.5">চার্জ: ৳১২০</p>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="বাড়ি নং, রোড নং, এলাকা/গ্রাম, থানা, জেলা"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">
                    বিশেষ নির্দেশনা (অপশনাল)
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: সালাদে লেবু বেশি দিবেন বা নির্দিষ্ট সময়ে ডেলিভারি"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                {/* Payment Option Notice */}
                <div className="pt-2">
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full border-2 border-emerald-700 flex items-center justify-center bg-white">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-700"></div>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">ক্যাশ অন ডেলিভারি (Cash on Delivery)</p>
                        <p className="text-xs text-gray-600">পণ্য হাতে পাওয়ার পর মূল্য পরিশোধ করুন</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold bg-emerald-200/80 text-emerald-900 px-2.5 py-1 rounded-full">
                      COD
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 mt-6 bg-emerald-700 hover:bg-emerald-800 disabled:bg-gray-400 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-emerald-700/25 transition-all hover:scale-[1.01]"
                >
                  {isSubmitting ? 'অর্ডার প্রসেস হচ্ছে...' : `অর্ডার কনফার্ম করুন (৳${grandTotal})`}
                </button>
              </form>
            </div>

            {/* Order Items Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
                <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100">
                  অর্ডারকৃত পণ্যের তালিকা ({cart.length})
                </h3>

                <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto my-3 pr-2 space-y-2">
                  {cart.map((item) => {
                    const activePrice = item.discountPrice ?? item.price;
                    return (
                      <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={item.imageUrl || ''}
                            alt={item.name}
                            className="w-10 h-10 rounded-lg object-cover bg-stone-100"
                          />
                          <div>
                            <p className="font-bold text-gray-800 line-clamp-1">{item.name}</p>
                            <span className="text-gray-500">
                              {item.packSize && `${item.packSize} • `}৳{activePrice} × {item.quantity}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-emerald-800">
                          ৳{activePrice * item.quantity}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Coupon / Discount Code Input Box */}
                <div className="pt-3 pb-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="text-xs font-bold text-gray-800">কুপন / ডিসকাউন্ট কোড</span>
                  </div>

                  {appliedCoupon ? (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-emerald-900">{appliedCoupon.code}</span>
                        <p className="text-[11px] text-emerald-700">৳{appliedCoupon.discount} ডিসকাউন্ট যুক্ত হয়েছে</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAppliedCoupon(null)}
                        className="text-red-500 hover:text-red-700 font-bold text-[11px]"
                      >
                        রিমুভ
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="কুপন কোড লিখুন (যেমন: WELCOME10)"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                          className="flex-1 px-3 py-2 bg-stone-50 border border-gray-200 rounded-xl text-xs uppercase font-mono focus:border-emerald-600 focus:outline-hidden"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs"
                        >
                          প্রয়োগ
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-red-600 mt-1 font-semibold">{couponError}</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-600">
                    <span>পণ্যের মূল্য (Subtotal):</span>
                    <span className="font-bold text-gray-900">৳{subtotal}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>ডিসকাউন্ট ({appliedCoupon.code}):</span>
                      <span>-৳{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>ডেলিভারি চার্জ ({deliveryCity === 'Dhaka' ? 'ঢাকা' : 'ঢাকার বাইরে'}):</span>
                    <span className="font-bold text-emerald-700">৳{deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-gray-900 pt-2 border-t border-gray-100">
                    <span>সর্বমোট প্রদেয়:</span>
                    <span className="text-emerald-700 text-xl font-black">৳{grandTotal}</span>
                  </div>
                </div>
              </div>

              {/* Order Promise */}
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 text-xs text-emerald-900 space-y-2.5">
                <p className="font-bold flex items-center gap-1.5 text-sm text-emerald-950">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  ZakJomok অর্ডার প্রতিশ্রুতি
                </p>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>অর্ডার জমা হওয়ার পর আমরা ফোন করে আপনার সাথে কথা বলে কনফার্ম করব।</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>পণ্য হাতে পাওয়ার পরেই কেবল ক্যাশ টাকা বুঝিয়ে দিন।</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
