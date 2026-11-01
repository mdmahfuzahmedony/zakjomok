'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import CategorySection from '../components/CategorySection';
import ProductCard from '../components/ProductCard';
import SaladSandwichSpecial from '../components/SaladSandwichSpecial';
import WhyChooseUs from '../components/WhyChooseUs';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import { fetchCategories, fetchProducts } from '../lib/api';
import { Category, Product, INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../data/initialProducts';
import { Search } from 'lucide-react';

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);
        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        console.error('Error fetching initial data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter products based on search and selected category
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory ? p.categorySlug === selectedCategory : true;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50/30 flex flex-col font-sans">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Categories Section */}
        <CategorySection
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(slug) => setSelectedCategory(slug)}
        />

        {/* Salad & Sandwich Special Highlight */}
        <SaladSandwichSpecial products={products} />

        {/* All / Filtered Products Section */}
        <section id="products" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                আমাদের খাদ্য তালিকা
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                {selectedCategory
                  ? `${categories.find((c) => c.slug === selectedCategory)?.name || 'ক্যাটাগরি'} পণ্যসমূহ`
                  : 'প্রাকৃতিক ও স্বাস্থ্যকর পণ্যসমূহ'}
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="পণ্য খুঁজুন (যেমন: বাদাম, ওটস)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-hidden focus:border-emerald-500 shadow-2xs text-gray-800"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-base font-semibold">কোনো পণ্য পাওয়া যায়নি!</p>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}
                className="mt-4 px-5 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold"
              >
                সব পণ্য রিসেট করুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* One-Page Direct Contact Section */}
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
