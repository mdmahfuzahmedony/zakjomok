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
    <section className="py-12 bg-stone-50/50 border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
              ক্যাটাগরি সমূহ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              পছন্দের খাবার বেছে নিন
            </h2>
          </div>

          <button
            onClick={() => onSelectCategory(null)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              selectedCategory === null
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200'
            }`}
          >
            সব ক্যাটাগরি (All)
          </button>
        </div>

        {/* Category Cards Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? null : cat.slug)}
                className={`group text-left p-3.5 rounded-2xl transition-all flex flex-col items-center text-center border ${
                  isSelected
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-md scale-105'
                    : 'bg-white hover:bg-emerald-50/60 text-gray-800 border-stone-200/80 hover:border-emerald-300 shadow-2xs'
                }`}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-stone-100 border-2 border-white shadow-xs group-hover:scale-105 transition-transform">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className={`text-xs font-bold line-clamp-2 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
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
