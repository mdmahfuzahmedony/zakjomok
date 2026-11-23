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
    id: 'cat-1',
    name: 'Nuts & Dry Fruits',
    slug: 'nuts-dry-fruits',
    description: 'প্রাকৃতিক ও প্রিমিয়াম মানের বাদাম এবং শুকনো ফল',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-2',
    name: 'Seeds',
    slug: 'seeds',
    description: 'পুষ্টিগুণে ভরপুর অর্গানিক চিয়া সিড, মিষ্টি কুমড়ার বীজ ও ফ্ল্যাক্স সিড',
    imageUrl: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-3',
    name: 'Oats & Breakfast',
    slug: 'oats-breakfast',
    description: 'সকালের আদর্শ স্বাস্থ্যকর নাশতা ও পুষ্টিকর ওটস',
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-4',
    name: 'Healthy Protein',
    slug: 'healthy-protein',
    description: 'শরীর সুস্থ ও এনার্জেটিক রাখার প্রাকৃতিক প্রোটিন ও পিনাট বাটার',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-5',
    name: 'Salt & Seasoning',
    slug: 'salt-seasoning',
    description: 'হিমালয়ান পিংক সল্ট ও প্রাকৃতিক মশলা',
    imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-6',
    name: 'Fresh Meals & Snacks',
    slug: 'fresh-meals',
    description: 'সতেজ সালাদ ও পুষ্টিকর হোল হুইট স্যান্ডউইচ',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'cat-7',
    name: 'Other Healthy Foods',
    slug: 'other-healthy-foods',
    description: 'খাঁটি মধু ও দৈনন্দিন সুষম পুষ্টিকর খাবার',
    imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: '🥗 Healthy Mixed Salad (ক্লাসিক মিক্সড সালাদ)',
    slug: 'healthy-mixed-salad',
    description: 'সেদ্ধ দেশি ডিম, কাবলি ছোলা, তাজা শসা, গাজর, টমেটো ও এক্সট্রা ভার্জিন অলিভ অয়েল ড্রেসিংয়ে তৈরি পুষ্টিকর সালাদ।',
    price: 180,
    discountPrice: 150,
    packSize: '1 Bowl (350g)',
    stock: 50,
    calories: 165,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    ingredients: ['সেদ্ধ ডিম', 'কাবলি ছোলা', 'শসা', 'গাজর', 'টমেটো', 'অলিভ অয়েল ড্রেসিং'],
    highlights: ['দ্রুত ওজন নিয়ন্ত্রণ করে', 'হজম শক্তি বাড়ায়', 'প্রাকৃতিক প্রোটিন সমৃদ্ধ'],
    isFeatured: true,
    categorySlug: 'fresh-meals',
    categoryName: 'Fresh Meals & Snacks',
  },
  {
    id: 'prod-2',
    name: '🥑 Avocado & Sprout Green Salad (অ্যাভোকাডো গ্রিন সালাদ)',
    slug: 'avocado-green-salad',
    description: 'বাটার অ্যাভোকাডো, অঙ্কুরিত ছোলা, বেবি পালং, ক্রাঞ্চি শসা ও লেমন-অলিভ ড্রেসিং সমৃদ্ধ প্রিমিয়াম গ্রিন সালাদ।',
    price: 260,
    discountPrice: 220,
    packSize: '1 Bowl (350g)',
    stock: 35,
    calories: 195,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    ingredients: ['অ্যাভোকাডো স্লাইস', 'অঙ্কুরিত ছোলা', 'বেবি পালং', 'চেরি টমেটো', 'লেমন ড্রেসিং'],
    highlights: ['উচ্চ গুড ফ্যাট ও পটাশিয়াম', 'হার্ট সুস্থ রাখে', 'ত্বকের উজ্জ্বলতা বাড়ায়'],
    isFeatured: true,
    categorySlug: 'fresh-meals',
    categoryName: 'Fresh Meals & Snacks',
  },
  {
    id: 'prod-3',
    name: '🍗 Grilled Chicken Protein Salad (গ্রিল্ড চিকেন সালাদ)',
    slug: 'grilled-chicken-salad',
    description: 'জুসি গ্রিল্ড চিকেন ব্রেস্ট, ডিমের সাদা অংশ, ব্রকলি, বেলপেপার ও লো-ক্যালরি ড্রেসিংয়ের হাই-প্রোটিন মিল।',
    price: 240,
    discountPrice: 199,
    packSize: '1 Bowl (380g)',
    stock: 40,
    calories: 230,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    ingredients: ['গ্রিল্ড চিকেন ব্রেস্ট', 'ডিমের সাদা অংশ', 'ব্রকলি', 'বেলপেপার', 'হারবাল ড্রেসিং'],
    highlights: ['২৬-২৮ গ্রাম হাই প্রোটিন', 'পেশি গঠন ও রিকভারি', 'জিরো ফ্যাট ক্যালরি'],
    isFeatured: true,
    categorySlug: 'fresh-meals',
    categoryName: 'Fresh Meals & Snacks',
  },
  {
    id: 'prod-4',
    name: '🥪 Whole Wheat Egg Sandwich (হোল হুইট স্যান্ডউইচ)',
    slug: 'healthy-sandwich',
    description: '১০০% হোল হুইট ব্রাউন ব্রেড, সেদ্ধ ডিমের পুষ্টি ও তাজা ক্রাঞ্চি সবজির সংমিশ্রণে তৈরি হালকা ও পুষ্টিকর স্যান্ডউইচ।',
    price: 140,
    discountPrice: 120,
    packSize: '2 Pieces (1 Pack)',
    stock: 45,
    calories: 210,
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    ingredients: ['হোল হুইট ব্রাউন ব্রেড', 'সেদ্ধ ডিম', 'শসা', 'টমেটো', 'লেটুস পাতা'],
    highlights: ['কমপ্লেক্স কার্বোহাইড্রেট', 'দীর্ঘক্ষণ শক্তি জোগায়', 'পেটের চর্বি জমতে দেয় না'],
    isFeatured: true,
    categorySlug: 'fresh-meals',
    categoryName: 'Fresh Meals & Snacks',
  },
];
