'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { Leaf, Lock, Phone, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !password) {
      setErrorMsg('মোবাইল নম্বর এবং পাসওয়ার্ড দিন।');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    const res = await login(phone, password);
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
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white mx-auto shadow-md mb-3">
              <Leaf className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">কাস্টমার লগইন</h1>
            <p className="text-xs text-gray-500 mt-1">
              আপনার ZakJomok অ্যাকাউন্টে লগইন করে অর্ডার ও ডিসকাউন্ট দেখুন
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              ⚠️ {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                মোবাইল নম্বর
              </label>
              <div className="relative">
                <input
                  type="tel"
                  inputMode="tel"
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
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.01]"
            >
              {isLoading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Registration CTA */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-600">
            <p>
              নতুন কাস্টমার?{' '}
              <Link href="/register" className="text-emerald-700 font-bold hover:underline">
                এখানে অ্যাকাউন্ট খুলুন (রেজিস্ট্রেশন করলেই ১০% ডিসকাউন্ট!)
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
