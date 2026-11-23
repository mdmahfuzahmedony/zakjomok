'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import { BlogPostSummary, fetchBlogs } from '../lib/api';

interface HealthTipItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  createdAt: string;
  imageUrl: string;
}

const DEFAULT_BLOG_POSTS: HealthTipItem[] = [
  {
    id: 'blog-1',
    title: 'ওজন নিয়ন্ত্রণে ফ্রেশ সালাদ খাওয়ার ৫টি সোনালী নিয়ম',
    slug: 'salad-rules-for-weight-loss',
    excerpt: 'কীভাবে সঠিক পুষ্টিকর উপাদান ও ড্রেসিং নির্বাচন করে সালাদ খেলে দ্রুত বাড়তি চর্বি দূর হয় ও শরীর সতেজ থাকে।',
    category: 'ডায়েট ও পুষ্টি',
    readTime: '৪ মিনিট পাঠ',
    createdAt: '2026-11-23T00:00:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'blog-2',
    title: 'সকালের নাস্তায় প্রোটিন ও ফাইবার: সারাদিন চনমনে থাকার চাবিকাঠি',
    slug: 'breakfast-protein-fiber-guide',
    excerpt: 'সেদ্ধ ডিম, হোল হুইট ব্রেড ও ওটসের সমন্বয়ে প্রস্তুত সকালের স্বাস্থ্যকর নাস্তা সারাদিনের ক্লান্তি দূর করে।',
    category: 'সুস্থ জীবনধারা',
    readTime: '৫ মিনিট পাঠ',
    createdAt: '2026-11-22T00:00:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'blog-3',
    title: 'চিয়া সিড ও বাদামের পুষ্টিগুণ: প্রতিদিন কেন খাওয়া আবশ্যক?',
    slug: 'chia-seeds-and-nuts-benefits',
    excerpt: 'ওমেগা-৩ ও প্রাকৃতিক অ্যান্টিঅক্সিডেন্টে ভরপুর সুপারফুড কীভাবে ব্রেইন পাওয়ার ও হার্টের কার্যক্ষমতা বাড়ায়।',
    category: 'সুপারফুড গাইড',
    readTime: '৩ মিনিট পাঠ',
    createdAt: '2026-11-21T00:00:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80',
  },
];

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);

  useEffect(() => {
    fetchBlogs()
      .then((data) => {
        if (data && data.length > 0) {
          setPosts(data);
        }
      })
      .catch((error: unknown) => {
        console.error('Error fetching blog posts:', error);
      });
  }, []);

  const displayPosts: (BlogPostSummary | HealthTipItem)[] =
    posts.length > 0 ? posts.slice(0, 3) : DEFAULT_BLOG_POSTS;

  return (
    <section id="blog" className="bg-stone-50/50 py-16 sm:py-20 border-b border-stone-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-bold text-emerald-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>স্বাস্থ্য টিপস ও গাইড</span>
            </div>
            <h2 className="text-2xl font-extrabold text-stone-900 sm:text-3xl lg:text-4xl">
              স্বাস্থ্যকর জীবন নিয়ে পড়ুন
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600">
              দৈনন্দিন পুষ্টি, খাদ্যাভ্যাস ও দীর্ঘমেয়াদী সুস্থ জীবনযাপনের সহজ বিজ্ঞানসম্মত টিপস।
            </p>
          </div>
          <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100/70 text-emerald-800 sm:flex">
            <BookOpen className="h-6 w-6" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => {
            const hasCategory = 'category' in post && post.category ? post.category : 'স্বাস্থ্য টিপস';
            const hasReadTime = 'readTime' in post && post.readTime ? post.readTime : '৪ মিনিট পাঠ';
            const imageUrl =
              'imageUrl' in post && post.imageUrl
                ? post.imageUrl
                : 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80';

            return (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
              >
                {/* Blog Image */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-emerald-800 shadow-xs backdrop-blur">
                    {hasCategory}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] text-stone-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-stone-400" />
                        {hasReadTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      সম্পূর্ণ পড়ুন <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
