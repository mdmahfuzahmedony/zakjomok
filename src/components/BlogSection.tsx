'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Clock, Sparkles } from 'lucide-react';
import { BlogPostSummary, fetchBlogs } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';
import { BLOG_POSTS, BlogPost, getBlogPostBySlug } from '../data/blogData';
import BlogDetailsModal from './BlogDetailsModal';

export default function BlogSection() {
  const { language, t } = useLanguage();
  const [backendPosts, setBackendPosts] = useState<BlogPostSummary[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchBlogs()
      .then((data) => {
        if (data && data.length > 0) {
          setBackendPosts(data);
        }
      })
      .catch((error: unknown) => {
        console.error('Error fetching blog posts:', error);
      });
  }, []);

  const handleOpenBlog = (slugOrId: string) => {
    // 1. Try local rich blog data
    const localPost = getBlogPostBySlug(slugOrId);
    if (localPost) {
      setSelectedBlog(localPost);
      return;
    }

    // 2. Try backend posts
    const backendPost = backendPosts.find((p) => p.slug === slugOrId || p.id === slugOrId);
    if (backendPost) {
      const syntheticBlog: BlogPost = {
        id: backendPost.id,
        slug: backendPost.slug,
        title: backendPost.title,
        titleEn: backendPost.title,
        excerpt: backendPost.excerpt,
        excerptEn: backendPost.excerpt,
        category: 'স্বাস্থ্য টিপস',
        categoryEn: 'Health Tips',
        readTime: '৪ মিনিট পাঠ',
        readTimeEn: '4 min read',
        createdAt: backendPost.createdAt,
        imageUrl:
          'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
        author: 'ZakJomok Team',
        authorEn: 'ZakJomok Team',
        paragraphs: backendPost.content ? [backendPost.content] : [backendPost.excerpt],
        paragraphsEn: backendPost.content ? [backendPost.content] : [backendPost.excerpt],
        keyTakeaways: [],
        keyTakeawaysEn: [],
      };
      setSelectedBlog(syntheticBlog);
      return;
    }

    // Fallback to first blog if available
    if (BLOG_POSTS.length > 0) {
      setSelectedBlog(BLOG_POSTS[0]);
    }
  };

  const isBn = language === 'bn';

  return (
    <section id="blog" className="bg-stone-50/50 py-16 sm:py-20 border-b border-stone-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3 py-1 text-xs font-bold text-emerald-800 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('স্বাস্থ্য টিপস ও গাইড', 'Health Tips & Guides')}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-stone-900 sm:text-3xl lg:text-4xl">
              {t('স্বাস্থ্যকর জীবন নিয়ে পড়ুন', 'Read About Healthy Living')}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-600">
              {t(
                'দৈনন্দিন পুষ্টি, খাদ্যাভ্যাস ও দীর্ঘমেয়াদী সুস্থ জীবনযাপনের সহজ বিজ্ঞানসম্মত টিপস।',
                'Simple science-backed tips on daily nutrition, mindful eating and sustainable healthy living.'
              )}
            </p>
          </div>
          <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100/70 text-emerald-800 sm:flex">
            <BookOpen className="h-6 w-6" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => {
            const title = isBn ? post.title : post.titleEn || post.title;
            const excerpt = isBn ? post.excerpt : post.excerptEn || post.excerpt;
            const category = isBn ? post.category : post.categoryEn || post.category;
            const readTime = isBn ? post.readTime : post.readTimeEn || post.readTime;

            return (
              <article
                key={post.id}
                onClick={() => handleOpenBlog(post.slug)}
                className="group flex flex-col overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-xs cursor-pointer transition-shadow hover:shadow-md"
              >
                {/* Blog Image */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-100">
                  <img
                    src={post.imageUrl}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-emerald-800 shadow-xs backdrop-blur">
                    {category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] text-stone-500 mb-2">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="h-3.5 w-3.5 text-stone-400" />
                        {readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
                      {title}
                    </h3>

                    <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenBlog(post.slug);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 active:scale-95 transition-all"
                    >
                      <span>{t('সম্পূর্ণ পড়ুন', 'Read Full Article')}</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>

                    <span className="text-[11px] font-semibold text-stone-400">
                      ZakJomok Blog
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Reading Modal */}
      <BlogDetailsModal
        post={selectedBlog}
        onClose={() => setSelectedBlog(null)}
      />
    </section>
  );
}
