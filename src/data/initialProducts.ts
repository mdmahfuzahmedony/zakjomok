export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  packSize: string;
  stock: number;
  imageUrl: string;
  ingredients?: string[];
  highlights?: string[];
  calories?: number | null;
  isFeatured?: boolean;
  categorySlug: string;
  categoryName: string;
}

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-healthy-mixed-salad',
    name: 'স্বাস্থ্যকর মিক্সড সালাদ',
    slug: 'healthy-mixed-salad',
    description: '১০টি তাজা ও পুষ্টিকর উপাদান এবং স্পেশাল টক-ঝাল সসে প্রস্তুত সম্পূর্ণ ব্যালান্সড ডায়েট মিল',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-healthy-mixed-salad',
    name: 'স্বাস্থ্যকর মিক্সড সালাদ (স্পেশাল টক-ঝাল সস সহ)',
    slug: 'healthy-mixed-salad',
    description: 'সিদ্ধ ডিম, গাজর, শসা, টমেটো, বরবটি, বাঁধাকপি, সিদ্ধ ছোলা, মিষ্টি ভুট্টা, বিটরুট ও স্পেশাল টক-ঝাল সসের সম্পূর্ণ সুষম ও পুষ্টিকর সালাদ বাটি।',
    price: 180,
    discountPrice: 150,
    packSize: '১ বাটি (৩৫০ গ্রাম)',
    stock: 50,
    calories: 204,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    ingredients: [
      '১. সিদ্ধ ডিম — ১টি',
      '২. গাজর — ২০ গ্রাম',
      '৩. শসা — ২৫ গ্রাম',
      '৪. টমেটো — ২০ গ্রাম',
      '৫. বরবটি (হালকা সিদ্ধ) — ১৫ গ্রাম',
      '৬. বাঁধাকপি — ১৫ গ্রাম',
      '৭. সিদ্ধ ছোলা — ২৫ গ্রাম',
      '৮. মিষ্টি ভুট্টা (সিদ্ধ) — ২০ গ্রাম',
      '৯. বিটরুট — ১০ গ্রাম',
      '১০. টক-ঝাল সস — ১টি ছোট কাপ',
    ],
    highlights: [
      '১০টি খাঁটি স্বাস্থ্যকর উপাদানে প্রস্তুত',
      'মোট ২০৪ কিলোক্যালরি (পারফেক্ট ডায়েট মিল)',
      '১০.৮ গ্রাম লিন প্রোটিন ও উচ্চ খাদ্যআঁশ সমৃদ্ধ',
      'সহজ হজম ও অতিরিক্ত মেদ কমাতে বিশেষভাবে কার্যকর',
    ],
    isFeatured: true,
    categorySlug: 'healthy-mixed-salad',
    categoryName: 'স্বাস্থ্যকর মিক্সড সালাদ',
  },
];
