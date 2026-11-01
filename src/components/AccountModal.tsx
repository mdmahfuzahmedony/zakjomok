'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Gift,
  LockKeyhole,
  LogOut,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  UserRound,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const router = useRouter();
  const { user, isAuthenticated, login, register, logout } = useAuth();
  const { setIsCartOpen } = useCart();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const result =
      mode === 'login'
        ? await login(phone, password)
        : await register({ name, phone, pass: password, city: 'Jessore Sadar', address });

    setIsLoading(false);

    if (!result.success) {
      setErrorMessage(result.message);
      return;
    }

    onClose();
    router.push('/dashboard');
  };

  const openCart = () => {
    onClose();
    setIsCartOpen(true);
  };

  const handleLogout = () => {
    logout();
    onClose();
    router.push('/');
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-modal-title"
        className="relative max-h-full w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close account window"
          className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <X className="h-5 w-5" />
        </button>

        {isAuthenticated ? (
          <>
            <div className="mb-6 pr-8">
              <p className="text-sm font-semibold text-emerald-700">আপনার অ্যাকাউন্ট</p>
              <h2 id="account-modal-title" className="mt-1 text-xl font-black text-gray-900">
                {user?.name}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{user?.phone}</p>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={openCart}
                className="flex w-full items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 text-left font-semibold text-gray-800 hover:border-emerald-200 hover:bg-emerald-50"
              >
                <ShoppingBag className="h-5 w-5 text-emerald-700" />
                কার্ট
              </button>
              <Link
                href="/dashboard?tab=orders"
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 font-semibold text-gray-800 hover:border-emerald-200 hover:bg-emerald-50"
              >
                <Package className="h-5 w-5 text-emerald-700" />
                আমার অর্ডার
              </Link>
              <Link
                href="/dashboard?tab=discounts"
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 font-semibold text-gray-800 hover:border-emerald-200 hover:bg-emerald-50"
              >
                <Gift className="h-5 w-5 text-emerald-700" />
                অফার ও কুপন
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl border border-red-100 px-4 py-3 text-left font-semibold text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
                সাইন আউট
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 pr-8">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
                <UserRound className="h-6 w-6" />
              </div>
              <h2 id="account-modal-title" className="text-xl font-black text-gray-900">
                {mode === 'login' ? 'লগইন করুন' : 'নতুন অ্যাকাউন্ট'}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                মোবাইল নম্বর ও পাসওয়ার্ড দিয়ে সহজেই {mode === 'login' ? 'লগইন' : 'রেজিস্টার'} করুন।
              </p>
            </div>

            {errorMessage && (
              <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {errorMessage}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <label className="block text-sm font-semibold text-gray-700">
                  আপনার নাম
                  <span className="relative mt-1.5 block">
                    <UserRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="আপনার নাম"
                      className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-600"
                    />
                  </span>
                </label>
              )}

              {mode === 'register' && (
                <>
                  <label className="block text-sm font-semibold text-gray-700">
                    লোকেশন
                    <span className="relative mt-1.5 block">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value="Jessore Sadar"
                        readOnly
                        className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-600 outline-none"
                      />
                    </span>
                  </label>

                  <label className="block text-sm font-semibold text-gray-700">
                    বিস্তারিত ঠিকানা
                    <span className="relative mt-1.5 block">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <textarea
                        autoComplete="street-address"
                        required
                        rows={2}
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        placeholder="বাড়ি/ফ্ল্যাট, রোড, এলাকা"
                        className="w-full resize-y rounded-xl border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-600"
                      />
                    </span>
                  </label>
                </>
              )}

              <label className="block text-sm font-semibold text-gray-700">
                মোবাইল নম্বর
                <span className="relative mt-1.5 block">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-600"
                  />
                </span>
              </label>

              <label className="block text-sm font-semibold text-gray-700">
                পাসওয়ার্ড
                <span className="relative mt-1.5 block">
                  <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="password"
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    minLength={8}
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="কমপক্ষে ৮ অক্ষর"
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-600"
                  />
                </span>
              </label>

              {mode === 'register' && (
                <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  আপাতত OTP ছাড়াই মোবাইল নম্বর দিয়ে রেজিস্ট্রেশন করা যাবে।
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3 font-bold text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading
                  ? mode === 'login'
                    ? 'লগইন হচ্ছে...'
                    : 'অ্যাকাউন্ট তৈরি হচ্ছে...'
                  : mode === 'login'
                    ? 'লগইন'
                    : 'রেজিস্টার'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-gray-600">
              {mode === 'login' ? 'নতুন এখানে?' : 'আগে থেকেই অ্যাকাউন্ট আছে?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setErrorMessage('');
                }}
                className="font-bold text-emerald-700 hover:underline"
              >
                {mode === 'login' ? 'রেজিস্টার করুন' : 'লগইন করুন'}
              </button>
            </p>
          </>
        )}
      </section>
    </div>,
    document.body,
  );
}
