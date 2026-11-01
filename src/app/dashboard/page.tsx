'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  ShoppingBag,
  Tag,
  Package,
  TrendingUp,
  Clock,
  PhoneCall,
  CheckCircle,
  Truck,
  Copy,
  Check,
  LogOut,
  User,
  ArrowRight,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  Save,
  MessageCircle,
  ChevronRight,
} from 'lucide-react';

interface UserOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  itemsSummary: string;
  createdAt: string;
}

interface UserCoupon {
  id: string;
  code: string;
  description: string;
  discountPercent?: number;
  discountAmount?: number;
  minOrderAmount: number;
}

export default function UserDashboardPage() {
  const router = useRouter();
  const { user, token, logout, isAuthenticated, updateUserLocally } = useAuth();

  // Active Sidebar Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'discounts' | 'profile'>('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Profile Form States
  const [name, setName] = useState(user?.name || 'প্রিয় গ্রাহক');
  const [phone, setPhone] = useState(user?.phone || '01712-345678');
  const [address, setAddress] = useState(user?.address || 'বাড়ি #১২, ধানমন্ডি, ঢাকা');
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Orders State
  const [orders, setOrders] = useState<UserOrder[]>([
    {
      id: 'ord-user-1',
      orderNumber: 'ZAK-8921',
      customerName: user?.name || 'গ্রাহক',
      customerPhone: user?.phone || '01712-345678',
      customerAddress: user?.address || 'বাড়ি #১২, ধানমন্ডি, ঢাকা',
      totalAmount: 430,
      status: 'PENDING',
      itemsSummary: '🥗 Healthy Mixed Salad (x1), 🥪 Healthy Sandwich (x2)',
      createdAt: 'আজ, ১০:১৫ AM',
    },
    {
      id: 'ord-user-2',
      orderNumber: 'ZAK-8874',
      customerName: user?.name || 'গ্রাহক',
      customerPhone: user?.phone || '01712-345678',
      customerAddress: user?.address || 'বাড়ি #১২, ধানমন্ডি, ঢাকা',
      totalAmount: 670,
      status: 'DELIVERED',
      itemsSummary: 'Premium California Almonds (x1), Whole Grain Rolled Oats (x1)',
      createdAt: '২৫ অক্টোবর, ০৪:৩০ PM',
    },
  ]);

  // Available Discounts & Coupons
  const [coupons, setCoupons] = useState<UserCoupon[]>([
    {
      id: 'c-1',
      code: 'WELCOME10',
      description: 'নতুন রেজিস্ট্রেশন স্পেশাল ১০% ছাড়',
      discountPercent: 10,
      minOrderAmount: 300,
    },
    {
      id: 'c-2',
      code: 'HEALTHY50',
      description: 'প্রিমিয়াম ফুড অর্ডারে সরাসরি ৳৫০ ছাড়',
      discountAmount: 50,
      minOrderAmount: 500,
    },
  ]);

  useEffect(() => {
    const tab = new URLSearchParams(window.location.search).get('tab');
    if (tab === 'orders' || tab === 'discounts') {
      setActiveTab(tab);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      if (user.phone) setPhone(user.phone);
      if (user.address) setAddress(user.address);
    }

    async function loadUserData() {
      if (token) {
        try {
          const res = await fetch('http://localhost:5000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.data) {
              if (data.data.orders && data.data.orders.length > 0) {
                setOrders(
                  data.data.orders.map((o: any) => ({
                    id: o.id,
                    orderNumber: o.orderNumber,
                    customerName: o.customerName,
                    customerPhone: o.customerPhone,
                    customerAddress: o.customerAddress,
                    totalAmount: o.totalAmount,
                    status: o.status,
                    itemsSummary: (o.items || []).map((i: any) => `${i.productName} (x${i.quantity})`).join(', '),
                    createdAt: new Date(o.createdAt).toLocaleDateString('bn-BD'),
                  }))
                );
              }
              if (data.data.availableCoupons && data.data.availableCoupons.length > 0) {
                setCoupons(data.data.availableCoupons);
              }
            }
          }
        } catch (e) {
          // offline support
        }
      }
    }

    loadUserData();
  }, [token, user]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserLocally({ name, phone, address });
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  // Metrics
  const totalOrders = orders.length;
  const totalProducts = orders.reduce((sum) => sum + 3, 0); // approx items
  const totalSpent = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="min-h-screen bg-stone-100/60 font-sans flex flex-col text-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Breadcrumb & Title */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold mb-1">
              <Link href="/" className="hover:text-emerald-700">হোম</Link>
              <span>/</span>
              <span className="text-emerald-800">কাস্টমার ড্যাশবোর্ড</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              ইউজার কন্ট্রোল প্যানেল
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              সক্রিয় সদস্য (Active Member)
            </span>
          </div>
        </div>

        {/* 2-Column Dashboard Layout: Left Content + Right Navigation Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: MAIN CONTENT AREA (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-900/10 relative overflow-hidden">
                  <div className="relative z-10 space-y-3">
                    <span className="bg-emerald-700/80 text-[10px] font-bold px-3 py-1 rounded-full text-emerald-100 uppercase tracking-wider">
                      Good Food • Better You
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black">
                      স্বাগতম, {user?.name || name}!
                    </h2>
                    <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl leading-relaxed">
                      ZakJomok-এর সাথে আপনার স্বাস্থ্যকর যাত্রায় আপনাকে শুভেচ্ছা। আপনার সকল অর্ডারের বর্তমান অবস্থা, কেনা পণ্যের তালিকা এবং স্পেশাল ডিসকাউন্ট নিচে দেখতে পারবেন।
                    </p>

                    <div className="pt-2 flex flex-wrap gap-3">
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="px-4 py-2 bg-white text-emerald-900 hover:bg-stone-100 font-bold text-xs rounded-xl transition-all shadow-xs"
                      >
                        📦 আমার অর্ডারসমূহ দেখুন
                      </button>
                      <button
                        onClick={() => setActiveTab('discounts')}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all border border-emerald-500/50"
                      >
                        🎟️ সক্রিয় কুপন ও ভাউচার
                      </button>
                    </div>
                  </div>

                  <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-emerald-600/30 rounded-full blur-2xl pointer-events-none" />
                </div>

                {/* 3 Key Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 font-medium">মোট অর্ডার</p>
                      <ShoppingBag className="w-4 h-4 text-emerald-700" />
                    </div>
                    <p className="text-2xl font-black text-gray-900 mt-2">{totalOrders} টি</p>
                    <span className="text-[10px] text-emerald-700 font-semibold block mt-1">সব সফল অর্ডার</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 font-medium">কেনা খাবার পণ্য</p>
                      <Package className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-2xl font-black text-gray-900 mt-2">{totalProducts} পিস</p>
                    <span className="text-[10px] text-blue-700 font-semibold block mt-1">সালাদ, স্যান্ডউইচ ও ড্রাইফুডস</span>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 font-medium">মোট খরচ (COD)</p>
                      <TrendingUp className="w-4 h-4 text-amber-600" />
                    </div>
                    <p className="text-2xl font-black text-emerald-800 mt-2">৳{totalSpent}</p>
                    <span className="text-[10px] text-amber-700 font-semibold block mt-1">ক্যাশ অন ডেলিভারিতে</span>
                  </div>
                </div>

                {/* Recent Order Preview */}
                <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-700" />
                      সাম্প্রতিক অর্ডার
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-emerald-700 hover:underline"
                    >
                      সব অর্ডার দেখুন →
                    </button>
                  </div>

                  {orders.slice(0, 1).map((ord) => (
                    <div key={ord.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-900">
                          অর্ডার: <span className="text-emerald-800">{ord.orderNumber}</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700">{ord.itemsSummary}</p>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200 text-xs">
                        <span className="text-gray-400 font-medium">{ord.createdAt}</span>
                        <span className="font-black text-emerald-800 text-sm">৳{ord.totalAmount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: MY ORDERS & STATUS */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">আমার সকল অর্ডার ও স্ট্যাটাস</h3>
                    <p className="text-xs text-gray-500">আপনার প্রতিটি অর্ডারের প্রগ্রেস ও ডেলিভারির তথ্য</p>
                  </div>
                  <Link
                    href="/"
                    className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-all shadow-xs"
                  >
                    + নতুন অর্ডার
                  </Link>
                </div>

                <div className="divide-y divide-gray-100 space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="pt-4 first:pt-0 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-base font-black text-gray-900">
                            অর্ডার নং: <span className="text-emerald-800">{ord.orderNumber}</span>
                          </span>
                          <p className="text-[11px] text-gray-400 font-medium">অর্ডারের তারিখ: {ord.createdAt}</p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-max ${
                            ord.status === 'PENDING'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : ord.status === 'CONFIRMED'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : ord.status === 'PROCESSING'
                              ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                              : ord.status === 'SHIPPED'
                              ? 'bg-purple-100 text-purple-800 border border-purple-300'
                              : ord.status === 'DELIVERED'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-red-100 text-red-800 border border-red-300'
                          }`}
                        >
                          ● {ord.status === 'PENDING' ? 'পেন্ডিং (কলের অপেক্ষায়)' : ord.status}
                        </span>
                      </div>

                      <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
                        <p className="text-gray-800 font-medium">
                          <span className="font-bold text-gray-900">আইটেমসমূহ:</span> {ord.itemsSummary}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-bold text-gray-800">ডেলিভারি ঠিকানা:</span> {ord.customerAddress}
                        </p>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200 text-xs">
                          <span className="text-gray-500 font-medium">পেমেন্ট মেথড: ক্যাশ অন ডেলিভারি (COD)</span>
                          <span className="text-sm font-black text-emerald-800">
                            সর্বমোট: ৳{ord.totalAmount}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: DISCOUNTS & COUPONS */}
            {activeTab === 'discounts' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
                <div className="pb-4 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">আমার সক্রিয় ডিসকাউন্ট ও কুপন কোড</h3>
                  <p className="text-xs text-gray-500">
                    চেকআউটের সময় কোডটি দিয়ে সরাসরি ছাড় উপভোগ করুন
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {coupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      className="p-5 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50 transition-colors flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-base font-black text-emerald-900 tracking-wider bg-white px-3 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                            {coupon.code}
                          </span>
                          <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {coupon.discountPercent ? `${coupon.discountPercent}% ছাড়` : `৳${coupon.discountAmount} ছাড়`}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-gray-800 mt-2">{coupon.description}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          ন্যূনতম অর্ডার: ৳{coupon.minOrderAmount}
                        </p>
                      </div>

                      <button
                        onClick={() => handleCopyCode(coupon.code)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs shrink-0 ${
                          copiedCode === coupon.code
                            ? 'bg-emerald-800 text-white'
                            : 'bg-white hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {copiedCode === coupon.code ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> কপি হয়েছে
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> কপি
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: PROFILE & ADDRESS */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs space-y-6">
                <div className="pb-4 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">প্রোফাইল ও ডেলিভারি তথ্য</h3>
                  <p className="text-xs text-gray-500">
                    এখানে ঠিকানা সেট করে রাখলে চেকআউট করার সময় বারবার লিখতে হবে না
                  </p>
                </div>

                {profileSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    আপনার তথ্য সফলভাবে সেভ করা হয়েছে!
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">আপনার নাম</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Gmail / ইমেইল</label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || 'customer@gmail.com'}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-stone-100 text-xs text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">মোবাইল নম্বর</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">ডিফল্ট ডেলিভারি ঠিকানা</label>
                    <textarea
                      rows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Save className="w-4 h-4" />
                    তথ্য সেভ করুন
                  </button>
                </form>
              </div>
            )}

          </div>

          {/* RIGHT: NAVIGATION SIDEBAR (4 Cols) */}
          <aside className="lg:col-span-4 space-y-5">
            {/* User Mini Card */}
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-emerald-600/20">
                {name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-gray-900 text-sm truncate">{name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email || 'customer@gmail.com'}</p>
                <span className="inline-block mt-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  কাস্টমার আইডি: #{user?.id ? user.id.slice(0, 6) : 'ZAK99'}
                </span>
              </div>
            </div>

            {/* Sidebar Routes Navigation Menu */}
            <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs p-3 space-y-1.5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 py-2">
                ড্যাশবোর্ড মেনু
              </p>

              {/* Route 1: Overview */}
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                  activeTab === 'overview'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>ওভারভিউ (Overview)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Route 2: Orders */}
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                  activeTab === 'orders'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  <span>আমার অর্ডারসমূহ</span>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    activeTab === 'orders'
                      ? 'bg-white text-emerald-900'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {orders.length}
                </span>
              </button>

              {/* Route 3: Discounts & Coupons */}
              <button
                onClick={() => setActiveTab('discounts')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                  activeTab === 'discounts'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Tag className="w-4 h-4" />
                  <span>আমার ডিসকাউন্ট ও কুপন</span>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    activeTab === 'discounts'
                      ? 'bg-amber-400 text-emerald-950'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {coupons.length} টি
                </span>
              </button>

              {/* Route 4: Profile & Address */}
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                  activeTab === 'profile'
                    ? 'bg-emerald-800 text-white shadow-sm'
                    : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4" />
                  <span>প্রোফাইল ও ঠিকানা</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <div className="pt-2 border-t border-gray-100 my-1"></div>

              {/* Route 5: Shop Link */}
              <Link
                href="/"
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-xs text-gray-700 hover:bg-stone-50 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-emerald-700" />
                  <span>শপ পেজে যান</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>

              {/* Route 6: Logout */}
              <button
                onClick={() => {
                  logout();
                  router.push('/');
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl font-bold text-xs text-red-600 hover:bg-red-50 transition-all text-left"
              >
                <LogOut className="w-4 h-4" />
                <span>লগআউট</span>
              </button>
            </div>

            {/* Support Box in Sidebar */}
            <div className="bg-emerald-900 text-white rounded-3xl p-5 shadow-xs space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                সহায়তা দরকার?
              </span>
              <h4 className="text-sm font-bold">অর্ডার বা খাবার নিয়ে কোনো প্রশ্ন?</h4>
              <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                আমাদের কাস্টমার কেয়ার প্রতিনিধি সরাসরি ফোনে ও হোয়াটসঅ্যাপে সহায়তা করতে প্রস্তুত।
              </p>
              <div className="pt-1 flex gap-2">
                <a
                  href="tel:01700000000"
                  className="flex-1 py-2 bg-emerald-800 hover:bg-emerald-700 text-center rounded-xl text-xs font-bold transition-colors"
                >
                  📞 কল করুন
                </a>
                <a
                  href="https://wa.me/8801700000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-center rounded-xl text-xs font-bold transition-colors"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}
