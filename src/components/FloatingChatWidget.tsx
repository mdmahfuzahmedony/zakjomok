'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  User,
  CheckCheck,
  Image as ImageIcon,
  Loader2,
  ZoomIn,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ChatMessage {
  id: string;
  sessionId: string;
  senderRole: 'CUSTOMER' | 'ADMIN';
  senderName: string;
  senderPhone?: string | null;
  text: string;
  imageUrl?: string | null;
  createdAt: string;
}

export default function FloatingChatWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [showIdentityForm, setShowIdentityForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [hasNewAdminReply, setHasNewAdminReply] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://zakjomok-backend.vercel.app').replace(/\/$/, '');

  // Quick welcome questions
  const quickQuestions = [
    '🥗 সালাদে কী কী উপাদান আছে?',
    '🔥 ২০৪ ক্যালোরি ও পুষ্টিগুণ',
    '📦 কীভাবে অর্ডার করব?',
    '🚚 ডেলিভারি চার্জ কত?',
  ];

  // 1. Initialize or load sessionId & identity from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let savedSession = localStorage.getItem('zakjomok_chat_session');
    if (!savedSession) {
      savedSession = 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem('zakjomok_chat_session', savedSession);
    }
    setSessionId(savedSession);

    const savedName = localStorage.getItem('zakjomok_chat_name') || '';
    const savedPhone = localStorage.getItem('zakjomok_chat_phone') || '';
    setCustomerName(savedName);
    setCustomerPhone(savedPhone);
  }, []);

  // 2. Fetch messages for this session
  const fetchMessages = async (sid: string) => {
    if (!sid) return;
    try {
      const res = await fetch(`${API_BASE}/api/chat/${sid}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setMessages((prev) => {
            // Check if there is a new message from admin when chat is closed
            if (!isOpen && data.data.length > prev.length) {
              const last = data.data[data.data.length - 1];
              if (last.senderRole === 'ADMIN') {
                setHasNewAdminReply(true);
              }
            }
            return data.data;
          });
        }
      }
    } catch {
      // offline / polling silent fail
    }
  };

  // 3. Polling effect: Poll every 3 seconds while chat is active
  useEffect(() => {
    if (!sessionId) return;

    fetchMessages(sessionId);

    const interval = setInterval(() => {
      fetchMessages(sessionId);
    }, 3000);

    return () => clearInterval(interval);
  }, [sessionId, isOpen]);

  // 4. Auto scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setHasNewAdminReply(false);
    }
  }, [messages, isOpen, imagePreviewUrl]);

  // 5. Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // Handle image file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('অনুগ্রহ করে শুধুমাত্র ছবি ফাইল নির্বাচন করুন।');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert('ছবির সাইজ সর্বোচ্চ ৮ MB হতে পারবে।');
      return;
    }

    setSelectedImageFile(file);
    const preview = URL.createObjectURL(file);
    setImagePreviewUrl(preview);
    e.target.value = '';
  };

  const handleRemoveImagePreview = () => {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setSelectedImageFile(null);
    setImagePreviewUrl(null);
  };

  // 6. Handle sending message (text and/or image)
  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = (customText !== undefined ? customText : inputText).trim();

    if ((!textToSend && !selectedImageFile) || !sessionId || isSending || isUploadingImage) return;

    setIsSending(true);
    setInputText('');

    let uploadedImageUrl: string | null = null;

    // Upload image first if present
    if (selectedImageFile) {
      setIsUploadingImage(true);
      try {
        const formData = new FormData();
        formData.append('image', selectedImageFile);

        const uploadRes = await fetch(`${API_BASE}/api/chat/upload-image`, {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (uploadRes.ok && uploadData.success && uploadData.data?.url) {
          uploadedImageUrl = uploadData.data.url;
        } else {
          console.error('Failed to upload chat image:', uploadData.message);
        }
      } catch (err) {
        console.error('Image upload failed:', err);
      } finally {
        setIsUploadingImage(false);
        handleRemoveImagePreview();
      }
    }

    // Optimistic local update
    const tempMsg: ChatMessage = {
      id: 'temp_' + Date.now(),
      sessionId,
      senderRole: 'CUSTOMER',
      senderName: customerName || 'কাস্টমার',
      senderPhone: customerPhone || null,
      text: textToSend,
      imageUrl: uploadedImageUrl,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMsg]);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          text: textToSend,
          imageUrl: uploadedImageUrl,
          senderName: customerName || 'কাস্টমার',
          senderPhone: customerPhone || null,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          setMessages((prev) =>
            prev.map((m) => (m.id === tempMsg.id ? data.data : m))
          );
        }
      }
    } catch (err) {
      console.error('Failed to send live chat message:', err);
    } finally {
      setIsSending(false);
    }
  };

  // Save optional identity
  const handleSaveIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('zakjomok_chat_name', customerName);
    localStorage.setItem('zakjomok_chat_phone', customerPhone);
    setShowIdentityForm(false);
  };

  const formatTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <>
      {/* LIGHTBOX FOR FULL IMAGE PREVIEW */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl bg-black">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImage}
              alt="Full view"
              className="max-h-[85vh] w-auto object-contain mx-auto"
            />
          </div>
        </div>
      )}

      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none">
        {/* 1. MESSENGER CHAT BOX */}
        {isOpen && (
          <div className="mb-3 w-[calc(100vw-2.5rem)] sm:w-96 h-[540px] max-h-[82vh] rounded-3xl bg-white shadow-2xl border border-stone-200/90 flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-200">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-3.5 sm:p-4 shrink-0 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center font-black text-sm">
                      🥗
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-emerald-900 rounded-full animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold leading-tight flex items-center gap-1.5">
                      মাহফুজ • ZaKJomok
                    </h3>
                    <p className="text-[11px] text-emerald-200/90 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      {t('অনলাইনে আছেন • সরাসরি চ্যাট', 'Online • Live Chat')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setShowIdentityForm(!showIdentityForm)}
                    title={t('আপনার নাম ও ফোন নম্বর সেট করুন', 'Set your profile')}
                    className={`p-1.5 rounded-full transition-colors ${
                      showIdentityForm ? 'bg-white text-emerald-900' : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <User className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label="Close Chat"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Optional Identity Drawer */}
              {showIdentityForm && (
                <form onSubmit={handleSaveIdentity} className="mt-3 pt-3 border-t border-white/15 space-y-2 text-stone-800 animate-in fade-in">
                  <p className="text-[11px] text-white/90 font-medium">
                    {t('আপনার নাম ও ফোন দিন যাতে মাহফুজ ভাই আপনাকে চিনতে পারেন:', 'Enter name and phone so admin knows you:')}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder={t('আপনার নাম', 'Your Name')}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-stone-200 focus:outline-hidden"
                    />
                    <input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white border border-stone-200 focus:outline-hidden"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowIdentityForm(false)}
                      className="px-3 py-1 text-[11px] font-bold text-white/80 hover:text-white"
                    >
                      {t('বন্ধ করুন', 'Cancel')}
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-white text-emerald-900 rounded-lg text-[11px] font-black shadow-xs hover:bg-emerald-50"
                    >
                      {t('সেভ করুন', 'Save')}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 bg-[#fbfdfb]">
              {/* Initial Welcome Greeting from Mahfuz */}
              <div className="flex justify-start gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs font-black shadow-2xs">
                  M
                </div>
                <div className="max-w-[85%] rounded-2xl rounded-tl-xs bg-white border border-stone-200/90 p-3 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 mb-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>মাহফুজ (ZaKJomok)</span>
                  </div>
                  <p className="text-xs text-stone-800 font-medium leading-relaxed">
                    {t(
                      'আসসালামু আলাইকুম! ZaKJomok থেকে মাহফুজ বলছি। আপনাকে কীভাবে সাহায্য করতে পারি?',
                      'Assalamu Alaikum! Mahfuz speaking from ZaKJomok. How can I assist you today?'
                    )}
                  </p>
                  <span className="block text-[9px] text-stone-400 mt-1 text-right">
                    {formatTime(new Date().toISOString())}
                  </span>
                </div>
              </div>

              {/* Quick Suggestion Chips (Shown when 0 user messages) */}
              {messages.length === 0 && (
                <div className="pt-1 pb-1 space-y-1.5">
                  <p className="text-[10px] text-stone-400 font-semibold px-1">
                    {t('দ্রুত প্রশ্ন বেছে নিন:', 'Quick suggestions:')}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {quickQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(undefined, q)}
                        className="px-2.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 text-[11px] font-bold transition-all text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Rendered Live Chat Messages */}
              {messages.map((msg) => {
                const isCustomer = msg.senderRole === 'CUSTOMER';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isCustomer ? 'justify-end' : 'justify-start gap-2'} animate-in fade-in duration-150`}
                  >
                    {!isCustomer && (
                      <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs font-black shadow-2xs">
                        M
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                        isCustomer
                          ? 'bg-emerald-700 text-white rounded-tr-xs'
                          : 'bg-white text-stone-900 border border-stone-200/90 rounded-tl-xs'
                      }`}
                    >
                      {!isCustomer && (
                        <span className="block text-[10px] font-black text-emerald-800 mb-0.5">
                          {msg.senderName || 'মাহফুজ (ZaKJomok)'}
                        </span>
                      )}

                      {/* Attached Image */}
                      {msg.imageUrl && (
                        <div className="mb-2 relative group overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-100 min-w-[180px] max-w-[260px]">
                          <img
                            src={msg.imageUrl}
                            alt="Chat attachment"
                            className="w-full max-h-52 object-cover rounded-2xl cursor-pointer hover:opacity-95 transition-all shadow-xs"
                            onClick={() => setLightboxImage(msg.imageUrl || null)}
                            loading="eager"
                          />
                          <div
                            onClick={() => setLightboxImage(msg.imageUrl || null)}
                            className="mt-1 flex items-center justify-between text-[10px] text-stone-500 cursor-pointer hover:underline px-2 py-0.5"
                          >
                            <span>📷 ছবি বড় করে দেখুন</span>
                            <span className="text-emerald-700 font-bold">Zoom 🔍</span>
                          </div>
                        </div>
                      )}

                      {msg.text && <p className="whitespace-pre-wrap break-words">{msg.text}</p>}

                      <div
                        className={`flex items-center justify-end gap-1 mt-1 text-[9px] ${
                          isCustomer ? 'text-emerald-100' : 'text-stone-400'
                        }`}
                      >
                        <span>{formatTime(msg.createdAt)}</span>
                        {isCustomer && <CheckCheck className="w-3 h-3 text-emerald-200 inline" />}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Image Preview Box (if selected) */}
            {imagePreviewUrl && (
              <div className="px-3 py-2 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-emerald-300 relative bg-white">
                    <img src={imagePreviewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-stone-700 block">ছবি যুক্ত করা হয়েছে</span>
                    <span className="text-[10px] text-stone-400 block">স্বয়ংক্রিয়ভাবে WebP ফরম্যাটে অপ্টিমাইজ হবে</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveImagePreview}
                  className="p-1 rounded-full hover:bg-stone-200 text-stone-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Bottom Messenger Reply Bar */}
            <div className="p-2.5 sm:p-3 bg-white border-t border-stone-200 shrink-0">
              <form onSubmit={(e) => handleSendMessage(e)} className="flex items-center gap-2">
                {/* Image Attach Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="ছবি পাঠান"
                  className="w-10 h-10 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center shrink-0 transition-colors"
                >
                  <ImageIcon className="w-4 h-4 text-emerald-700" />
                </button>

                <input
                  ref={inputRef}
                  type="text"
                  placeholder={isUploadingImage ? 'ছবি আপলোড হচ্ছে...' : t('বার্তা লিখুন...', 'Type a message...')}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isSending || isUploadingImage}
                  className="flex-1 px-3.5 py-2.5 text-xs rounded-2xl bg-stone-100/90 border border-transparent focus:border-emerald-600 focus:bg-white focus:outline-hidden text-stone-800 placeholder-stone-400 transition-all"
                />

                <button
                  type="submit"
                  disabled={(!inputText.trim() && !selectedImageFile) || isSending || isUploadingImage}
                  className="w-10 h-10 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-900/15 transition-all hover:scale-105 active:scale-95"
                  aria-label="Send Message"
                >
                  {isSending || isUploadingImage ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>

              <div className="mt-1 flex justify-between items-center px-1">
                <span className="text-[10px] text-stone-400">
                  {customerName ? `${customerName} হিসেবে চ্যাট করছেন` : 'ZaKJomok লাইভ সাপোর্ট'}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  ইনস্ট্যান্ট রিপ্লাই
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 2. FLOATING TRIGGER BUTTON (নিচে ডান সাইডে ছোট করে SMS আইকন) */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open Live Chat / SMS"
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white shadow-xl shadow-emerald-950/25 hover:scale-105 active:scale-95 transition-all"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <>
                <MessageSquare className="w-6 h-6 text-white" />
                {/* Notification Pulse Dot */}
                <span className="absolute top-0 right-0 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 border-2 border-white text-[9px] font-black text-white items-center justify-center">
                    {hasNewAdminReply ? '!' : '1'}
                  </span>
                </span>
              </>
            )}

            {/* Hover Tooltip (Desktop) */}
            {!isOpen && (
              <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-stone-900 text-white text-[11px] font-bold whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
                {t('মাহফুজ ভাইয়ের সাথে লাইভ চ্যাট করুন 💬', 'Live Chat with Mahfuz 💬')}
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
