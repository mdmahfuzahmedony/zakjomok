'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { Leaf, Lock, User, Phone, MapPin, Sparkles, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !password) {
      setErrorMsg('নাম, মোবাইল নম্বর, বিস্তারিত ঠিকানা এবং পাসওয়ার্ড আবশ্যক।');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    const res = await register({
      name,
      pass: password,
      phone,
      city: 'Jessore Sadar',
      address,
    });
    setIsLoading(false);

    if (res.success) {
      router.push('/dashboard');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50/40 flex flex-col font-sans">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-3xl border border-stone-200 shadow-md">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white mx-auto shadow-md mb-3">
              <Leaf className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 text-[11px] font-bold rounded-full border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              রেজিস্ট্রেশনে পাচ্ছেন ১০% স্পেশাল ছাড়!
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                আপনার নাম <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="মোঃ সাকিব হাসান"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                মোবাইল নম্বর <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden"
                />
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                লোকেশন <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value="Jessore Sadar"
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-xs text-gray-600"
                />
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              <p className="mt-1 text-[11px] text-gray-500">শুধু যশোর সদর এলাকায় রেজিস্ট্রেশন ও ডেলিভারি।</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                বিস্তারিত ঠিকানা <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  autoComplete="street-address"
                  required
                  rows={2}
                  placeholder="বাড়ি/ফ্ল্যাট, রোড, এলাকা"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full resize-y rounded-xl border border-gray-200 py-2.5 pl-9 pr-4 text-xs focus:border-emerald-600 focus:outline-hidden"
                />
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                পাসওয়ার্ড তৈরি করুন <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
              আপাতত OTP ছাড়াই মোবাইল নম্বর দিয়ে রেজিস্ট্রেশন করা যাবে।
            </p>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.01]"
            >
              {isLoading ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-600">
            <p>
              ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
              <Link href="/login" className="text-emerald-700 font-bold hover:underline">
                এখানে লগইন করুন
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
