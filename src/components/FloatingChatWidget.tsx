'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  User,
  CheckCheck,
  MessageCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ChatMessage {
  id: string;
  sessionId: string;
  senderRole: 'CUSTOMER' | 'ADMIN';
  senderName: string;
  senderPhone?: string | null;
  text: string;
  createdAt: string;
}

export default function FloatingChatWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showIdentityForm, setShowIdentityForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [hasNewAdminReply, setHasNewAdminReply] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'https://zakjomok-backend.vercel.app').replace(/\/$/, '');

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

    // Initial fetch
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
  }, [messages, isOpen]);

  // 5. Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  // 6. Handle sending message
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const textToSend = inputText.trim();
    if (!textToSend || !sessionId || isSending) return;

    setIsSending(true);
    setInputText('');

    // Optimistic local update
    const tempMsg: ChatMessage = {
      id: 'temp_' + Date.now(),
      sessionId,
      senderRole: 'CUSTOMER',
      senderName: customerName || 'কাস্টমার',
      senderPhone: customerPhone || null,
      text: textToSend,
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
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none">
      {/* 1. MESSENGER CHAT BOX */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] sm:w-96 h-[520px] max-h-[80vh] rounded-3xl bg-white shadow-2xl border border-stone-200/90 flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-200">
          
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
                    {t('ZaKJomok লাইভ চ্যাট', 'ZaKJomok Live Chat')}
                  </h3>
                  <p className="text-[11px] text-emerald-200/90 flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                    {t('এডমিন অনলাইনে আছেন • মেসেঞ্জার', 'Admin is Online • Messenger')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowIdentityForm(!showIdentityForm)}
                  title={t('আপনার পরিচয় সেট করুন', 'Set your profile')}
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
                  {t('আপনার নাম ও ফোন দিন যাতে এডমিন আপনাকে চিনতে পারে:', 'Enter your name and phone for admin:')}
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
            {/* Initial Welcome Greeting */}
            <div className="flex justify-start gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-xs font-black">
                Z
              </div>
              <div className="max-w-[82%] rounded-2xl rounded-tl-xs bg-white border border-stone-200/80 p-3 shadow-2xs">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 mb-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>{t('ZaKJomok সাপোর্ট টিম', 'ZaKJomok Support')}</span>
                </div>
                <p className="text-xs text-stone-700 leading-relaxed">
                  {t(
                    'আসসালামু আলাইকুম! ZaKJomok-এ আপনাকে স্বাগতম। আপনি যেকোনো প্রশ্ন বা কথা এখানে লিখুন, আমাদের এডমিন সাথে সাথে দেখতে পাচ্ছেন।',
                    'Welcome to ZaKJomok! Type any question or message here, our admin sees it instantly.'
                  )}
                </p>
                <span className="block text-[9px] text-stone-400 mt-1 text-right">
                  {formatTime(new Date().toISOString())}
                </span>
              </div>
            </div>

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
                      Z
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
                        {msg.senderName || t('ZaKJomok এডমিন', 'ZaKJomok Admin')}
                      </span>
                    )}

                    <p className="whitespace-pre-wrap break-words">{msg.text}</p>

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

          {/* Bottom Messenger Reply Bar */}
          <div className="p-2.5 sm:p-3 bg-white border-t border-stone-200 shrink-0">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder={t('একটি বার্তা লিখুন (যেমন মেসেঞ্জারে লিখেন)...', 'Type a message...')}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isSending}
                className="flex-1 px-3.5 py-2.5 text-xs rounded-2xl bg-stone-100/90 border border-transparent focus:border-emerald-600 focus:bg-white focus:outline-hidden text-stone-800 placeholder-stone-400 transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isSending}
                className="w-10 h-10 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 disabled:hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-900/15 transition-all hover:scale-105 active:scale-95"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Quick WhatsApp Fallback */}
            <div className="mt-1.5 flex justify-between items-center px-1">
              <span className="text-[10px] text-stone-400">
                {customerName ? `${customerName} হিসেবে চ্যাট করছেন` : 'লাইভ রিয়েল-টাইম চ্যাট'}
              </span>
              <a
                href="https://wa.me/8801309834483?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%2C%20ZaKJomok%20%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%A6%20%E0%A6%B8%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%B0%E0%A7%8D%E0%A6%95%E0%A7%87%20%E0%A6%9C%E0%A6%BE%E0%A6%A8%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <MessageCircle className="w-3 h-3 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
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
              {t('মেসেঞ্জারের মতো লাইভ চ্যাট করুন 💬', 'Live Chat like Messenger 💬')}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
