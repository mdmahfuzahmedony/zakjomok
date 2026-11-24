'use client';

import React from 'react';
import { Category } from '../data/initialProducts';
import { LayoutGrid, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CategorySectionProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
}

export default function CategorySection({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySectionProps) {
  const { t } = useLanguage();

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-stone-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-[11px] font-bold mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('খাদ্য ক্যাটাগরি', 'Food Categories')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900">
              {t('পছন্দের স্বাস্থ্যকর খাবার বেছে নিন', 'Choose Your Healthy Salad')}
            </h2>
          </div>

          <div className="flex justify-center sm:justify-end">
            <button
              onClick={() => onSelectCategory(null)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === null
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/10'
                  : 'bg-stone-50 text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 border border-stone-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              {t('সব (All)', 'All')}
            </button>
          </div>
        </div>

        {/* Category Display - Single Showcase Card or Grid */}
        {categories.length === 1 ? (
          <div className="flex justify-center items-center pb-2 pt-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.slug || selectedCategory === null;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(selectedCategory === cat.slug ? null : cat.slug)}
                  className="group relative p-4 sm:p-6 rounded-3xl flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 sm:gap-5 bg-gradient-to-r from-emerald-50/70 via-white to-teal-50/50 border border-emerald-200/90 shadow-sm hover:shadow-md transition-all max-w-xl w-full"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 bg-white border-2 border-emerald-300 shadow-xs group-hover:scale-105 transition-transform">
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider mb-1.5">
                      {t('প্রধান স্পেশাল ক্যাটাগরি', 'Featured Category')}
                    </span>
                    <h3 className="text-base sm:text-xl font-black text-stone-900 group-hover:text-emerald-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex overflow-x-auto pb-4 pt-1 gap-3 sm:gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 sm:overflow-visible sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(isSelected ? null : cat.slug)}
                  className={`text-left p-3 sm:p-4 rounded-2xl flex flex-col items-center text-center border shrink-0 w-28 sm:w-auto snap-start ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                      : 'bg-stone-50/70 text-stone-800 border-stone-200/80 shadow-2xs'
                  }`}
                >
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden mb-2.5 sm:mb-3 bg-white border-2 border-white shadow-xs">
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3
                    className={`text-xs font-bold line-clamp-2 leading-tight ${
                      isSelected ? 'text-white' : 'text-stone-900'
                    }`}
                  >
                    {cat.name}
                  </h3>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
