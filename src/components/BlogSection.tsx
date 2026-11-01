'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, CalendarDays } from 'lucide-react';
import { BlogPostSummary, fetchBlogs } from '../lib/api';

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchBlogs()
      .then(setPosts)
      .catch((error: unknown) => {
        console.error('Error fetching blog posts:', error);
        setErrorMessage('লেখাগুলো এখন লোড করা যাচ্ছে না।');
      });
  }, []);

  return (
    <section id="blog" className="bg-white py-14 sm:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
              ZaKJomok ব্লগ
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              স্বাস্থ্যকর জীবন নিয়ে পড়ুন
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              পুষ্টি, খাবার ও সুস্থ জীবনযাপনের সহজ পরামর্শ।
            </p>
          </div>
          <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 sm:flex">
            <BookOpen className="h-6 w-6" />
          </div>
        </div>

        {errorMessage ? (
          <p role="status" className="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-center text-sm text-gray-600">
            {errorMessage}
          </p>
        ) : posts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/50 px-6 py-10 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-emerald-600" />
            <p className="mt-3 font-semibold text-gray-800">নতুন লেখা শিগগিরই আসছে</p>
            <p className="mt-1 text-sm text-gray-500">আমাদের স্বাস্থ্যকর খাবার ও পুষ্টির লেখাগুলো এখানে পাবেন।</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post, index) => (
              <article
                key={post.id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
              >
                <div className={`relative flex h-36 items-end overflow-hidden p-5 ${index % 2 === 0 ? 'bg-gradient-to-br from-emerald-700 to-teal-950' : 'bg-gradient-to-br from-teal-600 to-emerald-950'}`}>
                  <div className="absolute -right-4 -top-10 h-40 w-40 rounded-full border-[18px] border-white/10" />
                  <div className="absolute right-8 top-8 h-16 w-16 rounded-full bg-white/10 blur-sm" />
                  <span className="relative inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    <BookOpen className="h-3.5 w-3.5" /> খাবার ও সুস্থতা
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center gap-1.5 text-xs text-gray-400">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {new Date(post.createdAt).toLocaleDateString('bn-BD')}
                  </div>
                  <h3 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-emerald-800">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-gray-500">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${encodeURIComponent(post.slug)}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900"
                  >
                    পুরো লেখাটি পড়ুন <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
