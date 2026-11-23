'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import WhyChooseUs from '../components/WhyChooseUs';
import CategorySection from '../components/CategorySection';
import ProductCard from '../components/ProductCard';
import ProductDetailsModal from '../components/ProductDetailsModal';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import OrderModal from '../components/OrderModal';
import CartDrawer from '../components/CartDrawer';
import { fetchCategories, fetchProducts } from '../lib/api';
import { Category, Product, INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '../data/initialProducts';
import { Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function HomePage() {
  const { cart, subtotal, setIsCartOpen, addToCart } = useCart();
  const { t } = useLanguage();
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prods] = await Promise.all([
          fetchCategories(),
          fetchProducts(),
        ]);
        if (cats && cats.length > 0) setCategories(cats);
        // Always prioritize the 4 mouth-watering healthy salad & meal products
        if (prods && prods.length > 0) {
          const freshMeals = prods.filter(
            (p) =>
              p.categorySlug === 'fresh-meals' ||
              p.slug.includes('salad') ||
              p.slug.includes('sandwich')
          );
          if (freshMeals.length >= 4) {
            setProducts(freshMeals.slice(0, 4));
          } else {
            setProducts(INITIAL_PRODUCTS);
          }
        } else {
          setProducts(INITIAL_PRODUCTS);
        }
      } catch (err) {
        console.error('Error fetching initial data:', err);
      }
    }
    loadData();
  }, []);

  // Direct checkout action for 1-click orders from ProductCard or ProductDetailsModal
  const handleDirectOrder = (product: Product, quantity: number = 1) => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setSelectedDetailProduct(null);
    setIsOrderModalOpen(true);
  };

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
    <div className="min-h-screen bg-[#fbfdfb] flex flex-col font-sans text-stone-900">
      <Header />
      <CartDrawer
        onOrder={() => {
          setIsCartOpen(false);
          setIsOrderModalOpen(true);
        }}
      />
      {isOrderModalOpen && (
        <OrderModal
          cart={cart}
          subtotal={subtotal}
          onClose={() => setIsOrderModalOpen(false)}
        />
      )}

      {/* Product Details & Health Benefit Popup Modal */}
      <ProductDetailsModal
        product={selectedDetailProduct}
        isOpen={Boolean(selectedDetailProduct)}
        onClose={() => setSelectedDetailProduct(null)}
        onOrderNow={(prod, qty) => handleDirectOrder(prod, qty)}
      />

      <main className="flex-1">
        {/* 1. Hero Banner */}
        <HeroBanner />

        {/* 2. কেন জাকজমক সেরা (Why Choose Us) - ব্যানার এর ঠিক নিচে */}
        <WhyChooseUs />

        {/* 3. ক্যাটাগরি (Categories Section) */}
        <CategorySection
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(slug) => setSelectedCategory(slug)}
        />

        {/* 4. খাদ্য সম্ভার / প্রোডাক্ট (Products Section - 3 Cards Per Row Grid) */}
        <section id="products" className="py-16 sm:py-20 bg-stone-50/50 border-b border-stone-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div>
                <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
                  {t('আমাদের ফ্রেশ খাদ্য সম্ভার', 'Our Fresh Food Menu')}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 mt-1">
                  {selectedCategory
                    ? `${categories.find((c) => c.slug === selectedCategory)?.name || t('ক্যাটাগরি', 'Category')} ${t('পণ্যসমূহ', 'Items')}`
                    : t('প্রাকৃতিক ও স্বাস্থ্যকর সালাদ ও মিলস', 'Natural & Healthy Salads & Meals')}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  {t(
                    'প্রতিদিন সকালে সংগৃহীত সতেজ উপাদান ও কোল্ড-প্রেসড অলিভ অয়েলে প্রস্তুত।',
                    'Prepared fresh every morning with organic ingredients and cold-pressed olive oil.'
                  )}
                </p>
              </div>

              {/* Search Input */}
              <div className="relative w-full md:w-72">
                <input
                  type="text"
                  placeholder={t('পণ্য খুঁজুন (যেমন: সালাদ, স্যান্ডউইচ)...', 'Search food (e.g. salad, sandwich)...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs focus:outline-hidden focus:border-emerald-500 shadow-2xs text-stone-800"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-200">
                <p className="text-stone-500 text-base font-semibold">{t('কোনো পণ্য পাওয়া যায়নি!', 'No products found!')}</p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery('');
                  }}
                  className="mt-4 px-5 py-2 bg-emerald-600 text-white rounded-full text-xs font-bold shadow-xs hover:bg-emerald-700"
                >
                  {t('সব পণ্য রিসেট করুন', 'Reset All Products')}
                </button>
              </div>
            ) : (
              /* 3 cards per row on desktop (lg:grid-cols-3) */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={(prod) => setSelectedDetailProduct(prod)}
                    onOrderNow={(prod) => handleDirectOrder(prod, 1)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 5. ব্লগ (Blog Section) */}
        <BlogSection />

        {/* 6. যোগাযোগ / কন্টাক্ট আস (Contact Section) */}
        <ContactSection />
      </main>

      {/* 7. ফুটার (Footer) */}
      <Footer />
    </div>
  );
}
