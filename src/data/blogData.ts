export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  category: string;
  categoryEn: string;
  readTime: string;
  readTimeEn: string;
  createdAt: string;
  imageUrl: string;
  author: string;
  authorEn: string;
  paragraphs: string[];
  paragraphsEn: string[];
  keyTakeaways: string[];
  keyTakeawaysEn: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'salad-rules-for-weight-loss',
    title: 'ওজন নিয়ন্ত্রণে ফ্রেশ সালাদ খাওয়ার ৫টি সোনালী নিয়ম',
    titleEn: '5 Golden Rules of Eating Fresh Salad for Weight Loss',
    excerpt: 'কীভাবে সঠিক পুষ্টিকর উপাদান ও ড্রেসিং নির্বাচন করে সালাদ খেলে দ্রুত বাড়তি চর্বি দূর হয় ও শরীর সতেজ থাকে।',
    excerptEn: 'How to choose the right ingredients and dressings so salads effectively burn fat and keep you energized.',
    category: 'ডায়েট ও পুষ্টি',
    categoryEn: 'Diet & Nutrition',
    readTime: '৪ মিনিট পাঠ',
    readTimeEn: '4 min read',
    createdAt: '2026-11-23T00:00:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    author: 'পুষ্টি বিশেষজ্ঞ, ZakJomok',
    authorEn: 'Nutrition Specialist, ZaKJomok',
    paragraphs: [
      'স্বাস্থ্য সচেতন মানুষের কাছে সালাদ এক অবিচ্ছেদ্য খাবার। তবে অনেকেই ভুল উপাদান বা অস্বাস্থ্যকর মেয়োনিজ ড্রেসিং ব্যবহার করায় কাঙ্ক্ষিত ওজন কমাতে পারেন না। সঠিক পদ্ধতিতে তৈরি এক বাটি ফ্রেশ সালাদ যেমন পেট দীর্ঘক্ষণ ভরা রাখে, তেমনই শরীরে প্রয়োজনীয় মাইক্রোনিউট্রিয়েন্ট সরবরাহ করে।',
      '১. রঙিন শাক-সবজির বেস তৈরি করুন: সালাদে শসা, টমেটো, গাজর, ক্যাপসিকাম ও লেটুসের মতো তাজা অ্যান্টিঅক্সিডেন্টসমৃদ্ধ সবজি রাখুন। এগুলো উচ্চ ফাইবার ও পানির উৎস যা পরিপাক প্রক্রিয়াকে দ্রুত সচল করে।',
      '২. স্বাস্থ্যকর প্রোটিন যোগ করতে ভুলবেন না: শুধু শাকসবজি খেলে দ্রুত ক্ষুধা লেগে যেতে পারে। সালাদে সেদ্ধ ডিম, অঙ্কুরিত ছোলা, পনির কিংবা গ্রিল্ড চিকেন যোগ করলে এটি একটি পূর্ণাঙ্গ ব্যালান্সড মিলে রূপান্তরিত হয়।',
      '৩. উচ্চ ক্যালোরির মেয়োনিজ বাদ দিন: সালাদের আসল শত্রু হলো বাজারজাত প্রিজারভেটিভযুক্ত মেয়োনিজ ও চিনিযুক্ত সস। এর বদলে খাঁটি এক্সট্রা ভার্জিন অলিভ অয়েল, কাঁচা লেবুর রস, বিট লবণ ও সামান্য গোলমরিচ গুঁড়ো ব্যবহার করুন।',
      '৪. সুপারসিডস ও ক্রাঞ্চি নাটসের স্পর্শ: ওপর থেকে এক চামচ রোস্টেড চিয়া সিড, মিষ্টি কুমড়ার বীজ ও কাঠবাদাম কুচি ছড়িয়ে দিন। এটি সালাদকে সুস্বাদু করার পাশাপাশি ওমেগা-৩ ফ্যাটি এসিডের যোগান দেবে।',
      '৫. সঠিক সময়ে খাওয়ার অভ্যাস: ভারী মধ্যাহ্নভোজ বা রাতের খাবারের অন্তত ১৫-২০ মিনিট আগে সালাদ খান। এতে মূল খাবারের অতিরিক্ত ক্যালোরি গ্রহণের মাত্রা আপনা থেকেই নিয়ন্ত্রণে চলে আসে।',
    ],
    paragraphsEn: [
      'Salads are an essential meal for health-conscious people. However, using high-calorie mayonnaise dressings often defeats the purpose. A bowl of freshly prepared salad with the right ingredients keeps you satiated for hours while fueling your body with vital micronutrients.',
      '1. Create a Colorful Base: Use crisp cucumbers, tomatoes, carrots, bell peppers, and lettuce rich in antioxidants. These are packed with hydration and dietary fiber that enhance digestion.',
      '2. Always Include Clean Protein: Eating vegetables alone causes hunger soon after. Adding boiled eggs, soaked chickpeas, low-fat cottage cheese, or grilled chicken makes it a complete satisfying meal.',
      '3. Eliminate Commercial Mayonnaise: Avoid sugar-heavy commercial dressings. Instead, use extra virgin olive oil, fresh lemon juice, Himalayan pink salt, and freshly cracked black pepper.',
      '4. Add Superseeds & Nuts: Sprinkle roasted chia seeds, pumpkin seeds, and slivered almonds on top. They add a delicious crunch and essential omega-3 fatty acids.',
      '5. Eat at the Right Time: Consume your salad 15-20 minutes before your main meal. This naturally curbs overeating and manages your overall daily caloric intake.',
    ],
    keyTakeaways: [
      'অলিভ অয়েল ও লেবুর রস দিয়ে প্রাকৃতিক ড্রেসিং তৈরি করুন',
      'সেদ্ধ ডিম বা ছোলা দিয়ে প্রোটিনের চাহিদা পূরণ করুন',
      'মূল খাবারের আগে সালাদ খেলে অতিরিক্ত ক্যালোরি গ্রহণ কমে',
      'চিয়া সিড ও বাদাম দিয়ে ফাইবার ও ওমেগা-৩ বাড়ান',
    ],
    keyTakeawaysEn: [
      'Use extra virgin olive oil & lemon juice for clean natural dressings',
      'Ensure adequate protein with boiled eggs or sprouted chickpeas',
      'Eat salads 15-20 mins before heavy meals to curb overeating',
      'Boost fiber and omega-3 with chia seeds and raw nuts',
    ],
  },
  {
    id: 'blog-2',
    slug: 'breakfast-protein-fiber-guide',
    title: 'সকালের নাস্তায় প্রোটিন ও ফাইবার: সারাদিন চনমনে থাকার চাবিকাঠি',
    titleEn: 'Protein & Fiber at Breakfast: The Key to Staying Energized All Day',
    excerpt: 'সেদ্ধ ডিম, হোল হুইট ব্রেড ও ওটসের সমন্বয়ে প্রস্তুত সকালের স্বাস্থ্যকর নাস্তা সারাদিনের ক্লান্তি দূর করে।',
    excerptEn: 'How a nutritious morning breakfast combining boiled eggs, whole grain oats, and seeds eliminates daily fatigue.',
    category: 'সুস্থ জীবনধারা',
    categoryEn: 'Healthy Lifestyle',
    readTime: '৫ মিনিট পাঠ',
    readTimeEn: '5 min read',
    createdAt: '2026-11-22T00:00:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1200&q=80',
    author: 'লাইফস্টাইল কোচ, ZakJomok',
    authorEn: 'Lifestyle Coach, ZaKJomok',
    paragraphs: [
      'সকালের নাস্তা কেবল পেটের ক্ষুধা মেটানোর জন্য নয়; এটি নির্ধারণ করে সারাদিন আপনার এনার্জি লেভেল কেমন থাকবে এবং কাজের প্রতি মনোযোগ কতটা অটুট থাকবে। রিফাইন্ড ময়দা, পরোটা বা মিষ্টি চায়ের মতো শর্করাবহুল নাস্তা রক্তে দ্রুত সুগার বাড়িয়ে হঠাৎ ক্লান্তি এনে দেয়।',
      'এর বিপরীতে উচ্চ প্রোটিন ও ফাইবারসমৃদ্ধ নাস্তা ধীরগতিতে হজম হয় এবং রক্তে অবিচ্ছিন্নভাবে গ্লুকোজ সরবরাহ বজায় রাখে। এতে দুপুর পর্যন্ত ক্ষুধা লাগার প্রবণতা থাকে না এবং অহেতুক স্ন্যাকস খাওয়ার ইচ্ছা কমে।',
      'হোল গ্রেইন ওটস ও বাদামের চমৎকার সমন্বয়: দুধ বা গরম পানিতে ওটস রান্না করে তাতে এক চামচ মধু, কয়েকটি কাজুবাদাম, কাঠবাদাম ও কিশমিশ মিশিয়ে নিন। এটি হৃদযন্ত্র ভালো রাখতে এবং দীর্ঘমেয়াদে কোলেস্টেরল নিয়ন্ত্রণে দারুণ কার্যকর।',
      'হোল হুইট স্যান্ডউইচ ও ডিমের বিকল্প: যদি আপনি হালকা কিন্তু ভরপুর নাস্তা চান, তবে ব্রাউন বা হোল হুইট ব্রেডে শসা, টমেটো, সেদ্ধ ডিম ও লেটুস পাতা দিয়ে তৈরি স্বাস্থ্যকর স্যান্ডউইচ গ্রহণ করুন। এটি প্রোটিনের দৈনিক চাহিদার এক বড় অংশ পূরণ করে।',
      'প্রতিদিন সকালের স্বাস্থ্যকর খাদ্যাভ্যাস আপনার ওজন নিয়ন্ত্রণে রাখবে এবং মানসিক চাপ মোকাবেলা করার শক্তি জোগাবে।',
    ],
    paragraphsEn: [
      'Breakfast does not merely satisfy morning hunger; it sets the tone for your daily productivity and mental clarity. Heavy carb-loaded breakfasts like white flour breads cause sharp blood glucose spikes followed by afternoon crashes.',
      'Conversely, meals rich in lean proteins and dietary fiber digest gradually, providing a steady release of physical energy without energy crashes or cravings for junk food.',
      'Power of Oats and Nuts: Cooking rolled oats in warm milk or water, topped with a spoon of raw honey, soaked almonds, cashews, and raisins, supports cardiovascular health and steady energy.',
      'Whole Wheat Sandwich & Egg Duo: For those on the go, whole wheat sandwich packed with sliced cucumbers, tomatoes, hard-boiled eggs, and crisp greens provides complete bioavailable nutrition.',
      'Starting your morning with wholesome nutrition establishes mindful eating habits that stay with you for a lifetime.',
    ],
    keyTakeaways: [
      'ময়দার পরোটা ও মিষ্টি চা পরিহার করে ওটস ও ডিম গ্রহণ করুন',
      'ফাইবার ও প্রোটিন রক্তে সুগার নিয়ন্ত্রণে রেখে মেটাবলিজম বাড়ায়',
      'হোল হুইট স্যান্ডউইচ ব্যস্ত সকালে দ্রুত ও স্বাস্থ্যকর পুষ্টির সমাধান',
      'বাদাম ও সিডস থেকে পাওয়া গুড ফ্যাট ব্রেইন ফাংশন বৃদ্ধি করে',
    ],
    keyTakeawaysEn: [
      'Swap refined flour breads with whole oats and boiled eggs',
      'Fiber and protein stabilize blood sugar and rev up metabolism',
      'Whole grain sandwich offers a quick, clean, travel-friendly breakfast',
      'Nuts and seeds deliver healthy fats that boost cognitive focus',
    ],
  },
  {
    id: 'blog-3',
    slug: 'chia-seeds-and-nuts-benefits',
    title: 'চিয়া সিড ও বাদামের পুষ্টিগুণ: প্রতিদিন কেন খাওয়া আবশ্যক?',
    titleEn: 'Nutritional Power of Chia Seeds & Raw Nuts: Why You Need Them Daily',
    excerpt: 'ওমেগা-৩ ও প্রাকৃতিক অ্যান্টিঅক্সিডেন্টে ভরপুর সুপারফুড কীভাবে ব্রেইন পাওয়ার ও হার্টের কার্যক্ষমতা বাড়ায়।',
    excerptEn: 'How omega-3 fatty acids and antioxidants in raw chia seeds and mixed nuts boost heart longevity and brain health.',
    category: 'সুপারফুড গাইড',
    categoryEn: 'Superfood Guide',
    readTime: '৩ মিনিট পাঠ',
    readTimeEn: '3 min read',
    createdAt: '2026-11-21T00:00:00.000Z',
    imageUrl: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=1200&q=80',
    author: 'ফুড সায়েন্টিস্ট, ZakJomok',
    authorEn: 'Food Scientist, ZaKJomok',
    paragraphs: [
      'চিয়া সিড এবং প্রাকৃতিক বাদামকে পুষ্টিবিজ্ঞানে ‘সুপারফুড’ হিসেবে আখ্যা দেওয়া হয়। আধুনিক অনিয়মিত লাইফস্টাইল ও প্রক্রিয়াজাত খাবারের ভিড়ে এই দুটি উপাদান আমাদের প্রতিদিনের পুষ্টিঘাটতি পূরণে ম্যাজিকের মতো কাজ করে।',
      'চিয়া সিডের বিস্ময়কর গুণাবলী: চিয়া সিডে রয়েছে দুধের চেয়ে ৫ গুণ বেশি ক্যালসিয়াম এবং স্যামন মাছের সমপরিমাণ ওমেগা-৩ ফ্যাটি এসিড। পানিতে ভেজানো হলে এটি এর ওজনের চেয়ে ১০-১২ গুণ পানি ধারণ করতে পারে, যা শরীরকে ভেতর থেকে দীর্ঘক্ষণ আর্দ্র ও হাইড্রেটেড রাখে। এটি কোষ্ঠকাঠিন্য দূর করতে এবং অন্ত্রের সুস্থ ব্যাকটেরিয়া বৃদ্ধিতে অত্যন্ত সহায়ক।',
      'মিক্সড বাদামের শক্তি: কাজুবাদাম, কাঠবাদাম ও আখরোটে রয়েছে মনো-আনস্যাচুরেটেড ফ্যাট এবং ভিটামিন-ই। এটি ত্বকের উজ্জ্বলতা বৃদ্ধি করে, চুল পড়া রোধ করে এবং রক্তে খারাপ কোলেস্টেরল (LDL) কমিয়ে ভালো কোলেস্টেরল (HDL) বাড়ায়।',
      'খাওয়ার সঠিক নিয়ম: প্রতিদিন সকালে খালি পেটে এক গ্লাস কুসুম গরম পানিতে ১ চামচ ভেজানো চিয়া সিড এবং সাথে ৪-৫টি ভেজানো কাঠবাদাম খান। অথবা আপনার প্রতিদিনের সালাদ, দই বা ওটসের সাথে এক মুঠো মিশিয়ে নিন।',
      'নিয়মিত অভ্যাসে মাত্র ৩০ দিনেই আপনি শরীরে অভাবনীয় কর্মক্ষমতা ও হালকা অনুভব করবেন।',
    ],
    paragraphsEn: [
      'Chia seeds and raw tree nuts are universally recognized as nutritional powerhouses. In today’s fast-paced world, these two ingredients effortlessly bridge our daily nutrient deficiencies.',
      'Miraculous Chia Seeds: Chia seeds contain 5x more calcium than milk and rich plant-based omega-3s. When soaked in water, they expand up to 10-12 times their weight, providing long-lasting cellular hydration and easing digestion.',
      'Mixed Nuts Potency: Almonds, cashews, and walnuts are packed with monounsaturated healthy fats, zinc, and vitamin E. They promote radiant skin, reduce hair thinning, and elevate good HDL cholesterol while subduing harmful LDL.',
      'Best Way to Consume: Take 1 tablespoon of pre-soaked chia seeds in lukewarm water with fresh lemon every morning alongside 4-5 soaked almonds. Or simply sprinkle over fresh salads and oatmeal.',
      'Consistent daily consumption yields remarkable energy improvements and digestive balance within 30 days.',
    ],
    keyTakeaways: [
      'চিয়া সিড শরীরে দীর্ঘক্ষণ পানি ধরে রাখে এবং হজমশক্তি বাড়ায়',
      'কাঠবাদাম ও কাজুবাদাম হার্টের স্বাস্থ্য ও কোলেস্টেরল নিয়ন্ত্রণে রাখে',
      'ভিটামিন-ই এবং অ্যান্টিঅক্সিডেন্ট ত্বক ও চুলের সৌন্দর্য বজায় রাখে',
      'সালাদ, ওটস বা সরাসরি পানিতে মিশিয়ে প্রতিদিন খাওয়ার সহজ উপায়',
    ],
    keyTakeawaysEn: [
      'Chia seeds ensure cellular hydration and promote smooth digestion',
      'Almonds and walnuts optimize cholesterol and strengthen cardiovascular health',
      'Vitamin E and rich antioxidants nurture glowing skin and stronger hair',
      'Effortlessly add to salads, smoothies, or morning detox water',
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug || p.id === slug);
}
