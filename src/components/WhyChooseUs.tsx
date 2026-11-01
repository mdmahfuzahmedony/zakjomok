import React from 'react';
import { ShieldCheck, Leaf, PhoneCall, RefreshCw } from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: <Leaf className="w-6 h-6 text-emerald-600" />,
      title: '১০০% খাঁটি ও প্রাকৃতিক উপাদান',
      description: 'কোনো কৃত্রিম রং, রাসায়নিক ফ্লেভার বা ক্ষতিকারক উপাদান ছাড়া সর্বোচ্চ মানের উপাদান থেকে প্রস্তুত।',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'হাইজিনিক ও স্বাস্থ্যসম্মত প্যাকেজিং',
      description: 'সম্পূর্ণ পরিষ্কার ও নিরাপদ পরিবেশে খাবারের পুষ্টিমান ধরে রাখতে উন্নত মোড়কে সংরক্ষণ করা হয়।',
    },
    {
      icon: <PhoneCall className="w-6 h-6 text-emerald-600" />,
      title: 'অর্ডারের পর ফোনে নিশ্চিতকরণ',
      description: 'আপনার অর্ডার করার পর আমাদের কাস্টমার প্রতিনিধি সরাসরি ফোন করে প্রতিটি তথ্য নিশ্চিত করে নেন।',
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-emerald-600" />,
      title: 'ক্যাশ অন ডেলিভারি (COD)',
      description: 'কোনো অগ্রিম পেমেন্ট ছাড়াই পণ্য হাতে পেয়ে কোয়ালিটি দেখে তারপর মূল্য পরিশোধের সুবিধা।',
    },
  ];

  return (
    <section id="why-choose-us" className="py-16 bg-emerald-50/40 border-t border-emerald-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
            কেন ZaKJomok সেরা?
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
            আপনার সুস্থ জীবনের বিশ্বস্ত সাথী
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            আমাদের লক্ষ্য শুধু খাবার বিক্রি নয়, বরং আপনার ও আপনার পরিবারের স্বাস্থ্যকর জীবনধারা নিশ্চিত করা।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-2xs hover:shadow-md transition-shadow flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                {p.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">{p.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-normal">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
