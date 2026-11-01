import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { BlogPostSummary } from '../../../lib/api';
import { ArrowLeft, BookOpen, CalendarDays } from 'lucide-react';

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

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
  const post = await getBlogPost(slug);
  if (!post?.content) notFound();

  return (
    <article className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-950 px-6 py-12 text-white sm:px-12 sm:py-16">
        <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[28px] border-white/10" />
        <span className="relative inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
          <BookOpen className="h-4 w-4" /> ZaKJomok ব্লগ
        </span>
        <h1 className="relative mt-5 text-3xl font-black leading-tight sm:text-4xl">{post.title}</h1>
        <div className="relative mt-4 flex items-center gap-2 text-sm text-emerald-100">
          <CalendarDays className="h-4 w-4" />
          {new Date(post.createdAt).toLocaleDateString('bn-BD')}
        </div>
      </div>
      <div className="px-6 py-8 sm:px-12 sm:py-10">
        <p className="border-b border-stone-100 pb-6 text-lg font-medium leading-8 text-gray-700">
          {post.excerpt}
        </p>
        <div className="whitespace-pre-wrap py-7 text-base leading-8 text-gray-700">
          {post.content}
        </div>
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-800 hover:bg-emerald-100"
        >
          <ArrowLeft className="h-4 w-4" /> ব্লগে ফিরে যান
        </Link>
      </div>
    </article>
  );
}

function BlogArticleFallback() {
  return (
    <div
      role="status"
      className="mx-auto min-h-80 max-w-3xl animate-pulse rounded-3xl border border-stone-200 bg-white p-8 shadow-sm"
    >
      <span className="text-sm font-semibold text-emerald-800">ব্লগ লোড হচ্ছে...</span>
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
