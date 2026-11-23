'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  X,
  Clock,
  Calendar,
  User,
  CheckCircle2,
  Share2,
  Check,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { BlogPost } from '../data/blogData';
import { useLanguage } from '../context/LanguageContext';

interface BlogDetailsModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function BlogDetailsModal({ post, onClose }: BlogDetailsModalProps) {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (post) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [post, onClose]);

  if (!post) return null;

  const isBn = language === 'bn';
  const title = isBn ? post.title : post.titleEn || post.title;
  const excerpt = isBn ? post.excerpt : post.excerptEn || post.excerpt;
  const category = isBn ? post.category : post.categoryEn || post.category;
  const readTime = isBn ? post.readTime : post.readTimeEn || post.readTime;
  const author = isBn ? post.author : post.authorEn || post.author;
  const paragraphs = isBn ? post.paragraphs : post.paragraphsEn || post.paragraphs;
  const keyTakeaways = isBn ? post.keyTakeaways : post.keyTakeawaysEn || post.keyTakeaways;

  const formattedDate = new Date(post.createdAt).toLocaleDateString(
    isBn ? 'bn-BD' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.slug}` : '';
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fallback to clipboard if share was canceled or failed
      }
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-stone-900/70 p-3 sm:p-5 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-blog-title"
    >
      <div
        className="relative flex flex-col max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar with Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-stone-100 bg-white/95 px-5 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/80 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
              <Sparkles className="h-3 w-3 text-emerald-600" />
              {category}
            </span>
            <span className="flex items-center gap-1 text-xs text-stone-500 font-medium">
              <Clock className="h-3 w-3 text-stone-400" />
              {readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 transition-all active:scale-95"
              title={t('লিংক কপি করুন', 'Copy Link')}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-700">{t('কপি হয়েছে', 'Copied')}</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-stone-600" />
                  <span>{t('শেয়ার', 'Share')}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-colors active:scale-90"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-8 space-y-6">
          {/* Article Header */}
          <div>
            <h1
              id="modal-blog-title"
              className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 leading-tight"
            >
              {title}
            </h1>

            {/* Author & Date metadata */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-500 border-b border-stone-100 pb-4">
              <span className="flex items-center gap-1.5 font-semibold text-emerald-800">
                <User className="h-3.5 w-3.5 text-emerald-600" />
                {author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-stone-400" />
                {formattedDate}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-56 sm:h-72 w-full overflow-hidden rounded-2xl bg-stone-100 shadow-xs">
            <img
              src={post.imageUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Excerpt Lead Box */}
          <div className="rounded-2xl bg-emerald-50/60 p-4 sm:p-5 border-l-4 border-emerald-600">
            <p className="text-sm sm:text-base font-semibold text-emerald-950 leading-relaxed italic">
              "{excerpt}"
            </p>
          </div>

          {/* Paragraphs */}
          <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed sm:leading-loose">
            {paragraphs.map((p, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {p}
              </p>
            ))}
          </div>

          {/* Key Takeaways Card */}
          {keyTakeaways && keyTakeaways.length > 0 && (
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-teal-50/50 p-5 sm:p-6 shadow-xs">
              <h3 className="flex items-center gap-2 text-base font-bold text-emerald-900 mb-3.5">
                <BookOpen className="h-5 w-5 text-emerald-700" />
                <span>{t('জরুরি সারসংক্ষেপ (Key Takeaways)', 'Key Takeaways')}</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                {keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Call to action footer banner inside modal */}
          <div className="rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-900 p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div>
              <h4 className="font-extrabold text-base sm:text-lg">
                {t('সুস্থ জীবনের শুরু হোক আজ থেকেই!', 'Start Your Healthy Journey Today!')}
              </h4>
              <p className="text-xs text-emerald-100 mt-1 max-w-md">
                {t(
                  'ফ্রেশ সালাদ, হোল গ্রেইন ওটস ও ন্যাচারাল বাদাম অর্ডার করতে আমাদের স্টোর ভিজিট করুন।',
                  'Explore our wholesome salads, organic whole oats and premium nuts.'
                )}
              </p>
            </div>
            <Link
              href="/#products"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-black text-emerald-900 shadow-md hover:bg-emerald-50 transition-all shrink-0 active:scale-95"
            >
              <span>{t('পণ্যসমূহ দেখুন', 'Explore Products')}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
