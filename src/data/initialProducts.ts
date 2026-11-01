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
    name: '🥗 Healthy Mixed Salad (ফ্রেশ মিক্সড সালাদ)',
    slug: 'healthy-mixed-salad',
    description: 'ডিম, গাজর, টমেটো, শসা, কাবলি ছোলা এবং তাজা সবজির সমন্বয়ে তৈরি স্বাস্থ্যকর ও পুষ্টিকর সালাদ। প্রতিদিনের ফিটনেস ও ডায়েটের জন্য উপযুক্ত।',
    price: 180,
    discountPrice: 150,
    packSize: '1 Bowl (350g)',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    categorySlug: 'fresh-meals',
    categoryName: 'Fresh Meals & Snacks',
  },
  {
    id: 'prod-2',
    name: '🥪 Healthy Whole Wheat Sandwich (হোল হুইট স্যান্ডউইচ)',
    slug: 'healthy-sandwich',
    description: '১০০% হোল হুইট ব্রাউন ব্রেড, সেদ্ধ ডিমের পুষ্টি ও তাজা ক্রাঞ্চি সবজির সংমিশ্রণে তৈরি হালকা ও পুষ্টিকর স্যান্ডউইচ।',
    price: 140,
    discountPrice: 120,
    packSize: '2 Pieces (1 Pack)',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    categorySlug: 'fresh-meals',
    categoryName: 'Fresh Meals & Snacks',
  },
  {
    id: 'prod-3',
    name: 'Premium California Almonds (কাঠবাদাম)',
    slug: 'premium-california-almonds',
    description: '১০০% প্রাকৃতিক ও তাজা ক্যালিফোর্নিয়া আলমন্ড। ভিটামিন ই ও অ্যান্টিঅক্সিডেন্টে সমৃদ্ধ যা ব্রেইন ও হার্ট সুস্থ রাখে।',
    price: 450,
    discountPrice: 390,
    packSize: '250g Jar',
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    categorySlug: 'nuts-dry-fruits',
    categoryName: 'Nuts & Dry Fruits',
  },
  {
    id: 'prod-4',
    name: 'Premium Roasted Cashew Nuts (কাজুবাদাম)',
    slug: 'premium-roasted-cashews',
    description: 'হালকা রোস্টেড ও ক্রাঞ্চি বড় দানার প্রিমিয়াম কাজুবাদাম। স্বাস্থ্যকর ফ্যাট ও খনিজের দারুণ উৎস।',
    price: 480,
    discountPrice: 420,
    packSize: '250g Jar',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    categorySlug: 'nuts-dry-fruits',
    categoryName: 'Nuts & Dry Fruits',
  },
  {
    id: 'prod-5',
    name: 'Raw Organic Chia Seeds (অর্গানিক চিয়া সিড)',
    slug: 'organic-chia-seeds',
    description: 'ওমেগা-৩ ফ্যাটি এসিড, ফাইবার ও প্রোটিনে ভরপুর প্রিমিয়াম গ্রেড অর্গানিক চিয়া সিড। ওজন নিয়ন্ত্রণ ও হজমে বিশেষ সহায়ক।',
    price: 320,
    discountPrice: 280,
    packSize: '200g Jar',
    stock: 80,
    imageUrl: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    categorySlug: 'seeds',
    categoryName: 'Seeds',
  },
  {
    id: 'prod-6',
    name: 'Roasted Pumpkin Seeds (মিষ্টি কুমড়ার বীজ)',
    slug: 'roasted-pumpkin-seeds',
    description: 'হালকা রোস্টেড ও ক্রাঞ্চি কুমড়ো বীজ। জিংক, ম্যাগনেসিয়াম ও অ্যান্টিঅক্সিডেন্টের দারুণ প্রাকৃতিক উৎস।',
    price: 350,
    discountPrice: 310,
    packSize: '250g Pouch',
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=600&q=80',
    isFeatured: false,
    categorySlug: 'seeds',
    categoryName: 'Seeds',
  },
  {
    id: 'prod-7',
    name: 'Organic Flax Seeds (তিসি বীজ)',
    slug: 'organic-flax-seeds',
    description: 'উচ্চ মাত্রার ফাইবার ও হার্ট-ফ্রেন্ডলি ফ্যাটি এসিড সমৃদ্ধ প্রাকৃতিক তিসি। হজম শক্তি বৃদ্ধিতে সহায়ক।',
    price: 220,
    discountPrice: 190,
    packSize: '250g Pack',
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80',
    isFeatured: false,
    categorySlug: 'seeds',
    categoryName: 'Seeds',
  },
  {
    id: 'prod-8',
    name: 'Whole Grain Rolled Oats (হোল গ্রেইন ওটস)',
    slug: 'whole-grain-rolled-oats',
    description: '১০০% গ্লুটেন-কম প্রিমিয়াম হোল গ্রেইন রোল্ড ওটস। দীর্ঘক্ষণ পেট ভরা রাখে ও কোলেস্টেরল নিয়ন্ত্রণে সাহায্য করে।',
    price: 280,
    discountPrice: 240,
    packSize: '500g Pack',
    stock: 75,
    imageUrl: 'https://images.unsplash.com/photo-1614961908593-9c8e19b8813a?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    categorySlug: 'oats-breakfast',
    categoryName: 'Oats & Breakfast',
  },
  {
    id: 'prod-9',
    name: 'Natural Himalayan Pink Salt (হিমালয়ান পিংক সল্ট)',
    slug: 'himalayan-pink-salt',
    description: '৮৪+ মিনারেল সমৃদ্ধ আসল হিমালয়ান পিংক রক সল্ট। সাধারণ লবণের স্বাস্থ্যকর ও প্রাকৃতিক বিকল্প।',
    price: 180,
    discountPrice: 150,
    packSize: '500g Jar',
    stock: 90,
    imageUrl: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80',
    isFeatured: false,
    categorySlug: 'salt-seasoning',
    categoryName: 'Salt & Seasoning',
  },
  {
    id: 'prod-10',
    name: 'Pure Sundarban Honey (সুন্দরবনের প্রাকৃতিক মধু)',
    slug: 'sundarban-raw-honey',
    description: 'কোনো প্রিজারভেটিভ বা চিনি ছাড়া সরাসরি সুন্দরবনের প্রাকৃতিক চাকের ১০০% খাঁটি কাঁচা মধু।',
    price: 650,
    discountPrice: 580,
    packSize: '500g Jar',
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    categorySlug: 'other-healthy-foods',
    categoryName: 'Other Healthy Foods',
  },
  {
    id: 'prod-11',
    name: 'Sugar-Free Natural Peanut Butter (খাঁটি পিনাট বাটার)',
    slug: 'natural-peanut-butter',
    description: 'চিনি ও পাম অয়েল ছাড়া ১০০% রোস্টেড চীনাবাদাম দিয়ে তৈরি স্বাস্থ্যকর ও উচ্চ প্রোটিন পিনাট বাটার।',
    price: 390,
    discountPrice: 350,
    packSize: '350g Jar',
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    isFeatured: true,
    categorySlug: 'healthy-protein',
    categoryName: 'Healthy Protein',
  },
];
