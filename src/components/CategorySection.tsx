'use client';

import React from 'react';
import { Category } from '../data/initialProducts';

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
  return (
    <section className="py-8 sm:py-12 bg-stone-50/50 border-y border-stone-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title & All Filter */}
        <div className="flex items-center justify-between mb-4 sm:mb-8 gap-3">
          <div>
            <span className="text-emerald-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              ক্যাটাগরি সমূহ
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mt-0.5">
              পছন্দের খাবার বেছে নিন
            </h2>
          </div>

          <button
            onClick={() => onSelectCategory(null)}
            className={`shrink-0 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === null
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
            }`}
          >
            সব (All)
          </button>
        </div>

        {/* Mobile Horizontal Scrollable Row | Desktop Clean Grid */}
        <div className="flex overflow-x-auto pb-3 pt-1 gap-3 sm:gap-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 sm:overflow-visible sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? null : cat.slug)}
                className={`group text-left p-2.5 sm:p-3.5 rounded-2xl transition-all flex flex-col items-center text-center border shrink-0 w-24 sm:w-auto snap-start active:scale-95 ${
                  isSelected
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-md scale-102 sm:scale-105'
                    : 'bg-white hover:bg-emerald-50/60 text-gray-800 border-stone-200/80 hover:border-emerald-300 shadow-2xs'
                }`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-2 sm:mb-3 bg-stone-100 border-2 border-white shadow-xs group-hover:scale-105 transition-transform">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3
                  className={`text-[11px] sm:text-xs font-bold line-clamp-2 leading-tight ${
                    isSelected ? 'text-white' : 'text-gray-900'
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
