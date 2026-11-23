'use client';

import React from 'react';
import { Category } from '../data/initialProducts';
import { LayoutGrid } from 'lucide-react';
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
        {/* Header with Title & All Filter */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 gap-3">
          <div>
            <span className="text-emerald-700 text-[11px] font-bold uppercase tracking-wider">
              {t('খাদ্য ক্যাটাগরি', 'Food Categories')}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 mt-0.5">
              {t('পছন্দের খাবার বেছে নিন', 'Choose Your Favorite Food')}
            </h2>
          </div>

          <button
            onClick={() => onSelectCategory(null)}
            className={`inline-flex items-center gap-1.5 shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === null
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/10'
                : 'bg-stone-50 text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 border border-stone-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            {t('সব (All)', 'All')}
          </button>
        </div>

        {/* Mobile Horizontal Scrollable Row | Desktop Clean Grid */}
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
      </div>
    </section>
  );
}
