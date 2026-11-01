'use client';

import React, { useState } from 'react';
import { Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactSection() {
  const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !emailOrPhone || !message) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, emailOrPhone, message }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন।');
      }

      setErrorMessage('');
      setSubmitted(true);
      setName('');
      setEmailOrPhone('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-us" className="py-16 bg-white border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
            সরাসরি যোগাযোগ
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
            যেকোনো প্রশ্ন বা স্পেশাল অর্ডারে আমরা আছি পাশে
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-2">
            খাবার সম্পর্কে পরামর্শ, বাল্ক অর্ডার বা যেকোনো তথ্যে সরাসরি কল করুন অথবা নিচের ফর্মটি পূরণ করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Info & Quick Contact Buttons */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-800 to-teal-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl shadow-emerald-900/10">
            <div className="space-y-6">
              <div>
                <span className="bg-emerald-700/80 text-[11px] font-bold px-3 py-1 rounded-full text-emerald-100">
                  Customer Care
                </span>
                <h3 className="text-2xl font-black mt-3">সহজ ও দ্রুত সহায়তা</h3>
                <p className="text-emerald-100/80 text-xs mt-1.5 leading-relaxed">
                  আমরা সপ্তাহে ৭ দিনই সকাল ৯টা থেকে রাত ১০টা পর্যন্ত আপনাদের সেবা দেওয়ার জন্য প্রস্তুত।
                </p>
              </div>

              {/* Direct Quick Actions */}
              <div className="space-y-3 pt-2">
                <a
                  href="tel:+8801309834483"
                  className="w-full flex items-center justify-between p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-emerald-200">সরাসরি কথা বলুন</p>
                      <p className="text-sm font-bold text-white group-hover:underline">০১৩০৯-৮৩৪৪৮৩</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-white/20 px-2.5 py-1 rounded-lg">কল করুন</span>
                </a>

              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-emerald-200 space-y-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-300" />
                <span>ঢাকা, বাংলাদেশ</span>
              </p>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7 bg-stone-50/70 p-8 rounded-3xl border border-stone-200 shadow-2xs flex flex-col justify-center">
            <h3 className="text-lg font-bold text-gray-900 mb-1">আমাদের একটি বার্তা পাঠান</h3>
            <p className="text-xs text-gray-500 mb-6">
              আপনার মতামত, খাবারের বিশেষ পছন্দ বা বাল্ক অর্ডার সম্পর্কিত তথ্য জানান।
            </p>

            {submitted ? (
              <div className="bg-emerald-100 border border-emerald-300 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                <h4 className="font-bold text-emerald-900 text-sm">বার্তা সফলভাবে পাঠানো হয়েছে!</h4>
                <p className="text-xs text-emerald-700">
                  ধন্যবাদ! আপনার বার্তাটি আমাদের কাছে পৌঁছেছে।
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                    {errorMessage}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      আপনার নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="মোঃ রাকিবুল হাসান"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      ইমেইল বা মোবাইল নম্বর <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="017XXXXXXXX অথবা your@gmail.com"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    আপনার বার্তা বা জিজ্ঞাসা <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="আপনার মন্তব্য বা পণ্যের কোনো স্পেশাল তথ্য..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md shadow-emerald-700/20 transition-all hover:scale-105"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? 'পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
