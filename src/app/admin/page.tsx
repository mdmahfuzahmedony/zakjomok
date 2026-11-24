'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { isLoaded, login, user } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (
      isLoaded &&
      user?.role === 'ADMIN'
    ) {
      router.replace('/admin/dashboard');
    }
  }, [isLoaded, router, user]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const result = await login(phone, password, 'ADMIN');
    setIsLoading(false);

    if (result.success) {
      router.replace('/admin/dashboard');
      return;
    }

    setErrorMessage(result.message);
  };

  if (!isLoaded || user?.role === 'ADMIN') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-stone-100">
        <p className="text-sm font-semibold text-emerald-800">লোড হচ্ছে...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-stone-100 px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-lg">
        <div className="mb-7 text-center">
          <Link href="/" className="inline-flex flex-col items-center justify-center group mb-4">
            <img
              src="/logo.png"
              alt="ZaKJomok Brand Logo"
              className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <span className="text-2xl font-black tracking-tight text-stone-900 mt-2">
              ZaK<span className="text-emerald-600">Jomok</span>
            </span>
            <p className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">
              Good Food • Better You
            </p>
          </Link>
          <div className="block">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider mb-2">
              Admin Portal
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-black text-gray-900">অ্যাডমিন প্রবেশদ্বার</h1>
          <p className="mt-2 text-sm text-gray-500">
            প্রবেশ করতে admin-এর মোবাইল নম্বর ও পাসওয়ার্ড দিন।
          </p>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700"
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="admin-phone" className="mb-1.5 block text-sm font-bold text-gray-700">
              মোবাইল নম্বর
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                id="admin-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="username"
                required
                placeholder="01XXXXXXXXX"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-1.5 block text-sm font-bold text-gray-700">
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="আপনার পাসওয়ার্ড"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'লগইন হচ্ছে...' : 'Admin হিসেবে লগইন'}
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
      </section>
    </main>
  );
}
