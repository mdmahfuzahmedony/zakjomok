'use client';

import { ChangeEvent, useId, useState } from 'react';
import Image from 'next/image';
import { ImagePlus, LoaderCircle, Upload } from 'lucide-react';

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

interface AdminImageUploadProps {
  folder: 'products' | 'categories';
  imageUrl: string;
  token: string;
  onImageUrlChange: (imageUrl: string) => void;
}

interface UploadResponse {
  success: boolean;
  data?: { url: string };
  message?: string;
}

export default function AdminImageUpload({
  folder,
  imageUrl,
  token,
  onImageUrlChange,
}: AdminImageUploadProps) {
  const inputId = useId();
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setErrorMessage('');
    if (!file.type.startsWith('image/')) {
      setErrorMessage('একটি image file নির্বাচন করুন।');
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setErrorMessage('ছবির সাইজ সর্বোচ্চ ৫ MB হতে পারবে।');
      return;
    }

    onImageUrlChange('');
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    try {
      const response = await fetch(`${API_BASE}/api/uploads/image`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const result: UploadResponse = await response.json();

      if (!response.ok || !result.success || !result.data?.url) {
        setErrorMessage(result.message || 'ছবি আপলোড করা যায়নি। আবার চেষ্টা করুন।');
        return;
      }

      onImageUrlChange(result.data.url);
    } catch (error) {
      console.error('Image upload request failed:', error);
      setErrorMessage('সার্ভারের সঙ্গে যোগাযোগ করা যায়নি; ছবি আপলোড হয়নি।');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-xs font-bold text-gray-700">
        Gallery থেকে ছবি বাছুন <span className="text-red-500">*</span>
      </label>
      <input
        id={inputId}
        type="file"
        accept="image/*"
        disabled={isUploading}
        onChange={handleFileChange}
        className="sr-only"
      />
      <label
        htmlFor={inputId}
        className={`flex min-h-24 cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed px-4 py-4 text-xs font-bold transition ${
          isUploading
            ? 'cursor-wait border-emerald-200 bg-emerald-50 text-emerald-800'
            : 'border-gray-300 bg-stone-50 text-gray-700 hover:border-emerald-500 hover:bg-emerald-50'
        }`}
      >
        {isUploading ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" />
            Supabase Storage-এ আপলোড হচ্ছে...
          </>
        ) : (
          <>
            {imageUrl ? <Upload className="h-5 w-5 text-emerald-700" /> : <ImagePlus className="h-5 w-5 text-emerald-700" />}
            {imageUrl ? 'অন্য ছবি বাছুন' : 'ছবি বাছুন ও আপলোড করুন'}
          </>
        )}
      </label>
      <p className="text-[10px] text-gray-500">
        যেকোনো supported image · upload-এর সময় WebP-তে convert হবে · সর্বোচ্চ ৫ MB
      </p>

      {errorMessage && (
        <p role="alert" className="text-xs font-medium text-red-700">
          {errorMessage}
        </p>
      )}

      {imageUrl && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-2.5">
          <Image
            src={imageUrl}
            alt="আপলোড করা ছবির preview"
            width={64}
            height={64}
            unoptimized
            className="h-16 w-16 rounded-lg border border-stone-200 bg-white object-cover"
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-emerald-800">Supabase Storage-এ আপলোড সম্পন্ন</p>
            <p className="truncate text-[10px] text-gray-500">{imageUrl}</p>
          </div>
        </div>
      )}
    </div>
  );
}
