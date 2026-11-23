import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { BlogPostSummary } from '../../../lib/api';
import { getBlogPostBySlug, BlogPost } from '../../../data/blogData';
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Clock,
  User,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://zakjomok-backend.vercel.app').replace(/\/$/, '');

async function getBlogPost(slug: string): Promise<BlogPostSummary | null> {
  try {
    const response = await fetch(`${API_BASE}/api/blogs/${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    });
    if (!response.ok) return null;

    const result = await response.json();
    return result.success && result.data ? result.data : null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

async function BlogArticleContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Check local static rich data first
  const localPost: BlogPost | undefined = getBlogPostBySlug(slug);

  // 2. Fall back to backend data
  const backendPost = !localPost ? await getBlogPost(slug) : null;

  if (!localPost && !backendPost) {
    notFound();
  }

  const title = localPost?.title || backendPost?.title || '';
  const excerpt = localPost?.excerpt || backendPost?.excerpt || '';
  const category = localPost?.category || 'স্বাস্থ্য টিপস';
  const readTime = localPost?.readTime || '৪ মিনিট পাঠ';
  const author = localPost?.author || 'ZakJomok টিম';
  const imageUrl =
    localPost?.imageUrl ||
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80';
  const createdAt = localPost?.createdAt || backendPost?.createdAt || new Date().toISOString();
  const paragraphs = localPost?.paragraphs || (backendPost?.content ? [backendPost.content] : [excerpt]);
  const keyTakeaways = localPost?.keyTakeaways || [];

  return (
    <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
      {/* Article Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 px-6 py-12 text-white sm:px-12 sm:py-16">
        <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[28px] border-white/10 pointer-events-none" />
        <div className="flex flex-wrap items-center gap-2">
          <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            {category}
          </span>
          <span className="relative inline-flex items-center gap-1.5 text-xs text-emerald-200">
            <Clock className="h-3.5 w-3.5" />
            {readTime}
          </span>
        </div>

        <h1 className="relative mt-4 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
          {title}
        </h1>

        <div className="relative mt-5 flex flex-wrap items-center gap-4 text-xs text-emerald-200">
          <span className="flex items-center gap-1.5 font-semibold text-emerald-100">
            <User className="h-4 w-4 text-emerald-300" />
            {author}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4 text-emerald-300" />
            {new Date(createdAt).toLocaleDateString('bn-BD', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
      </div>

      <div className="px-6 py-8 sm:px-12 sm:py-12 space-y-8">
        {/* Cover Image */}
        <div className="relative h-64 sm:h-96 w-full overflow-hidden rounded-2xl bg-stone-100 shadow-xs">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Lead Excerpt */}
        <div className="rounded-2xl bg-emerald-50/70 p-5 sm:p-6 border-l-4 border-emerald-600">
          <p className="text-base sm:text-lg font-medium leading-relaxed text-emerald-950 italic">
            "{excerpt}"
          </p>
        </div>

        {/* Content Paragraphs */}
        <div className="space-y-5 text-base sm:text-lg leading-relaxed sm:leading-loose text-stone-700">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {p}
            </p>
          ))}
        </div>

        {/* Key Takeaways */}
        {keyTakeaways.length > 0 && (
          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-teal-50/50 p-6 sm:p-8">
            <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-900 mb-4">
              <BookOpen className="h-5 w-5 text-emerald-700" />
              <span>গুরুত্বপূর্ণ মূল বিষয়সমূহ (Key Takeaways)</span>
            </h3>
            <ul className="space-y-3 text-sm sm:text-base text-stone-700">
              {keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Back and CTA Buttons */}
        <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 rounded-xl bg-stone-100 px-4 py-2.5 text-xs font-bold text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> ব্লগে ফিরে যান
          </Link>

          <Link
            href="/#products"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 transition-colors"
          >
            <span>স্বাস্থ্যকর খাবার অর্ডার করুন</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function BlogArticleFallback() {
  return (
    <div
      role="status"
      className="mx-auto min-h-80 max-w-4xl animate-pulse rounded-3xl border border-stone-200 bg-white p-8 shadow-sm"
    >
      <span className="text-sm font-semibold text-emerald-800">ব্লগ আর্টিকেল লোড হচ্ছে...</span>
    </div>
  );
}

export default function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50 font-sans">
      <Header />
      <main className="flex-1 px-4 py-10 sm:px-6 sm:py-16">
        <Suspense fallback={<BlogArticleFallback />}>
          <BlogArticleContent params={params} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
