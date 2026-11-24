'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  X,
  Send,
  CheckCircle2,
  Phone,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FloatingChatWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://zakjomok-backend.vercel.app').replace(/\/$/, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setErrorMessage(t('অনুগ্রহ করে নাম, ফোন নম্বর ও মেসেজ লিখুন।', 'Please enter your name, phone and message.'));
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          emailOrPhone: phone.trim(),
          subject: 'Live Chat / SMS Inquiry',
          message: message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || t('মেসেজ পাঠানো যায়নি। আবার চেষ্টা করুন।', 'Failed to send message.'));
      }

      setIsSuccess(true);
      setName('');
      setPhone('');
      setMessage('');
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : t('মেসেজ পাঠানো যায়নি। আবার চেষ্টা করুন।', 'Failed to send message.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none">
      {/* 1. CHAT POPUP BOX */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] sm:w-96 rounded-3xl bg-white shadow-2xl border border-stone-200/90 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-emerald-300" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-emerald-900 rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold leading-tight flex items-center gap-1.5">
                    {t('ZaKJomok লাইভ সাপোর্ট', 'ZaKJomok Live Support')}
                  </h3>
                  <p className="text-[11px] text-emerald-200/90 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    {t('এডমিন অনলাইনে আছেন', 'Admin is Online')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-5 max-h-[70vh] overflow-y-auto">
            {isSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-stone-900">
                  {t('মেসেজটি এডমিনের কাছে পৌঁছেছে!', 'Message Delivered to Admin!')}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
                  {t(
                    'ধন্যবাদ! আপনার বার্তাটি সরাসরি আমাদের এডমিন প্যানেলে জমা হয়েছে। খুব দ্রুত আমাদের প্রতিনিধি আপনার ফোন নম্বরে যোগাযোগ করবেন।',
                    'Thank you! Your message has been sent to our admin panel. Our team will contact you shortly.'
                  )}
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-xl transition-colors"
                >
                  {t('আরেকটি বার্তা পাঠান', 'Send another message')}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Greeting Bubble */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-stone-700 text-xs leading-relaxed">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t('স্বাগতম!', 'Welcome!')}</span>
                  </div>
                  {t(
                    'সালাদ, খাদ্য তালিকা বা যেকোনো তথ্যের জন্য নিচের বক্সে মেসেজ দিন। আপনার মেসেজ সরাসরি এডমিনের কাছে চলে যাবে।',
                    'Have questions about salads or orders? Send a message below and admin will receive it directly.'
                  )}
                </div>

                {errorMessage && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      {t('আপনার নাম', 'Your Name')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('যেমন: মাহফুজ আহমেদ', 'e.g. Mahfuz Ahmed')}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-hidden focus:border-emerald-600 bg-stone-50/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      {t('মোবাইল নম্বর', 'Mobile Number')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-hidden focus:border-emerald-600 bg-stone-50/40"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      {t('আপনার বার্তা বা প্রশ্ন', 'Your Message')} <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder={t('কী জানতে চান বিস্তারিত লিখুন...', 'Write your message here...')}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-hidden focus:border-emerald-600 bg-stone-50/40 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isSubmitting ? t('পাঠানো হচ্ছে...', 'Sending...') : t('মেসেজ পাঠান', 'Send Message')}
                  </button>
                </form>

                {/* Direct WhatsApp Quick Contact Shortcut */}
                <div className="pt-2 border-t border-stone-100 text-center">
                  <a
                    href="https://wa.me/8801309834483?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%2C%20ZaKJomok%20%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%A6%20%E0%A6%B8%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%B0%E0%A7%8D%E0%A6%95%E0%A7%87%20%E0%A6%9C%E0%A6%BE%E0%A6%A8%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t('অথবা হোয়াটসঅ্যাপে সরাসরি কথা বলুন', 'Or chat directly on WhatsApp')}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. FLOATING TRIGGER BUTTON (নিচে ডান সাইডে ছোট করে SMS আইকন) */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Live Chat / SMS"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white shadow-xl shadow-emerald-950/25 hover:scale-105 active:scale-95 transition-all"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 text-white" />
              {/* Notification Pulse Dot */}
              <span className="absolute top-0 right-0 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 border-2 border-white text-[9px] font-black text-white items-center justify-center">
                  1
                </span>
              </span>
            </>
          )}

          {/* Hover Tooltip (Desktop) */}
          {!isOpen && (
            <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-stone-900 text-white text-[11px] font-bold whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
              {t('মেসেজ দিন / লাইভ চ্যাট 💬', 'Send Message / Live Chat 💬')}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
