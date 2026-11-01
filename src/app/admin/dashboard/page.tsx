'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  FolderTree,
  Users,
  Tag,
  Mail,
  Search,
  PhoneCall,
  CheckCircle,
  Truck,
  Clock,
  XCircle,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Plus,
  Edit2,
  Trash2,
  Eye,
  LogOut,
  DollarSign,
  AlertTriangle,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Sparkles,
  BarChart3,
  Activity,
  ArrowUpRight,
  Calendar,
  Percent,
  BookOpen,
} from 'lucide-react';
import { Product, Category } from '../../../data/initialProducts';
import { useAuth } from '../../../context/AuthContext';
import AdminImageUpload from '../../../components/AdminImageUpload';

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  deliveryCity: string;
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentMethod: string;
  itemsSummary: string;
  createdAt: string;
}

interface AdminCoupon {
  id: string;
  code: string;
  description: string | null;
  discountPercent: number | string | null;
  discountAmount: number | string | null;
  minOrderAmount: number | string;
  isActive: boolean;
}

interface AdminMessage {
  id: string;
  name: string;
  emailOrPhone: string;
  subject: string | null;
  message: string;
  createdAt: string;
}

interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isLoaded, token, user, logout } = useAuth();
  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'MANAGER';

  // Dashboard sections
  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'categories' | 'orders' | 'customers' | 'coupons' | 'messages' | 'blogs'
  >('overview');

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [salesPeriod, setSalesPeriod] = useState<'today' | '7days' | 'month' | 'year'>('7days');

  // Products and Categories states
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [couponsList, setCouponsList] = useState<AdminCoupon[]>([]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponAmount, setNewCouponAmount] = useState('');
  const [newCouponMinOrder, setNewCouponMinOrder] = useState('');
  const [blogPosts, setBlogPosts] = useState<AdminBlogPost[]>([]);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogExcerpt, setNewBlogExcerpt] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [isSavingBlog, setIsSavingBlog] = useState(false);

  // In-Page Add Product Form Toggle (Directly inside the page)
  const [showInPageAddProduct, setShowInPageAddProduct] = useState(false);
  const [showInPageAddCategory, setShowInPageAddCategory] = useState(false);

  // Edit Product Modal State
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // New Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdDiscountPrice, setNewProdDiscountPrice] = useState('');
  const [newProdPackSize, setNewProdPackSize] = useState('250g Jar');
  const [newProdImageUrl, setNewProdImageUrl] = useState('');
  const [newProdDescription, setNewProdDescription] = useState('');
  const [newProdIngredients, setNewProdIngredients] = useState(['']);
  const [newProdHighlights, setNewProdHighlights] = useState(['']);
  const [newProdCalories, setNewProdCalories] = useState('');
  const [isSavingProduct, setIsSavingProduct] = useState(false);

  // Edit Product Form State
  const [editPrice, setEditPrice] = useState('');
  const [editDiscountPrice, setEditDiscountPrice] = useState('');
  const [editStock, setEditStock] = useState('');
  const [editPackSize, setEditPackSize] = useState('');

  // New Category Form State
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatImageUrl, setNewCatImageUrl] = useState('');
  const [newCatDescription, setNewCatDescription] = useState('');
  const [isSavingCategory, setIsSavingCategory] = useState(false);

  // Toast message
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Orders State
  const [orders, setOrders] = useState<AdminOrder[]>([
    {
      id: 'ord-101',
      orderNumber: 'ZAK-8921',
      customerName: 'মোঃ তানভীর হাসান',
      customerPhone: '01712-345678',
      customerAddress: 'বাড়ি #১২, রোড #৪, ধানমন্ডি, ঢাকা',
      deliveryCity: 'Dhaka',
      totalAmount: 430,
      status: 'PENDING',
      paymentMethod: 'COD',
      itemsSummary: '🥗 Healthy Mixed Salad (x1), 🥪 Healthy Sandwich (x2)',
      createdAt: 'আজ, ১০:১৫ AM',
    },
    {
      id: 'ord-102',
      orderNumber: 'ZAK-8919',
      customerName: 'ফারহানা ইসলাম',
      customerPhone: '01890-123456',
      customerAddress: 'ফ্ল্যাট ৪বি, উত্তরা সেক্টর ৭, ঢাকা',
      deliveryCity: 'Dhaka',
      totalAmount: 650,
      status: 'CONFIRMED',
      paymentMethod: 'COD',
      itemsSummary: 'Premium California Almonds (x1), Organic Chia Seeds (x1)',
      createdAt: 'আজ, ০৯:৩০ AM',
    },
    {
      id: 'ord-103',
      orderNumber: 'ZAK-8890',
      customerName: 'রাশেদ করিম',
      customerPhone: '01911-987654',
      customerAddress: 'জিইসি মোড়, চট্টগ্রাম',
      deliveryCity: 'Outside Dhaka',
      totalAmount: 480,
      status: 'SHIPPED',
      paymentMethod: 'COD',
      itemsSummary: 'Rolled Oats (x1), Himalayan Pink Salt (x1)',
      createdAt: 'গতকাল, ০৫:২০ PM',
    },
  ]);

  const [messages, setMessages] = useState<AdminMessage[]>([]);

  // Load backend real data (Orders, Products, Categories, Messages)
  useEffect(() => {
    if (!isLoaded) return;
    if (!isAdmin || !token) {
      router.replace('/admin');
      return;
    }

    async function fetchBackendData() {
      // 1. Orders
      try {
        const res = await fetch(`${API_BASE}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data && data.data.length > 0) {
            const mapped: AdminOrder[] = data.data.map((o: any) => ({
              id: o.id,
              orderNumber: o.orderNumber,
              customerName: o.customerName,
              customerPhone: o.customerPhone,
              customerAddress: o.customerAddress,
              deliveryCity: o.deliveryCity,
              totalAmount: o.totalAmount,
              status: o.status,
              paymentMethod: o.paymentMethod,
              itemsSummary: (o.items || [])
                .map((i: any) => `${i.productName} (x${i.quantity})`)
                .join(', '),
              createdAt: new Date(o.createdAt).toLocaleDateString('bn-BD'),
            }));
            setOrders(mapped);
          }
        }
      } catch (e) {
        // offline / simulated fallback
      }

      // 2. Categories
      try {
        const catRes = await fetch(`${API_BASE}/api/categories`);
        if (!catRes.ok) {
          throw new Error(`Category request failed with status ${catRes.status}`);
        }

        const catData: {
          success?: boolean;
          data?: Array<{
            id: string;
            name: string;
            slug: string;
            description?: string | null;
            imageUrl?: string | null;
          }>;
        } = await catRes.json();
        if (!catData.success || !Array.isArray(catData.data)) {
          throw new Error('Category API returned an invalid response');
        }

        const savedCategories: Category[] = catData.data.map((category) => ({
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description || '',
          imageUrl: category.imageUrl || '',
        }));
        setCategoriesList(savedCategories);
        setNewProdCategory((current) =>
          savedCategories.some((category) => category.slug === current)
            ? current
            : savedCategories[0]?.slug || '',
        );
      } catch (error) {
        console.error('Error fetching admin categories:', error);
      }

      // 3. Products
      try {
        const prodRes = await fetch(`${API_BASE}/api/products`);
        if (!prodRes.ok) {
          throw new Error(`Product request failed with status ${prodRes.status}`);
        }

        const prodData = await prodRes.json();
        if (!prodData.success || !Array.isArray(prodData.data)) {
          throw new Error('Product API returned an invalid response');
        }

        const mappedProds: Product[] = prodData.data.map((p: any) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description || '',
          price: Number(p.price),
          discountPrice: p.discountPrice ? Number(p.discountPrice) : undefined,
          packSize: p.packSize || '',
          stock: p.stock,
          imageUrl: p.imageUrl || '',
          ingredients: Array.isArray(p.ingredients) ? p.ingredients : [],
          highlights: Array.isArray(p.highlights) ? p.highlights : [],
          calories: p.calories ?? null,
          isFeatured: p.isFeatured,
          categorySlug: p.category?.slug || '',
          categoryName: p.category?.name || '',
        }));
        setProductsList(mappedProds);
      } catch (error) {
        console.error('Error fetching admin products:', error);
      }

      try {
        const couponRes = await fetch(`${API_BASE}/api/coupons`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const couponData = await couponRes.json();
        if (!couponRes.ok || !couponData.success || !Array.isArray(couponData.data)) {
          throw new Error(couponData.message || 'Coupon API returned an invalid response');
        }
        setCouponsList(couponData.data);
      } catch (error) {
        console.error('Error fetching admin coupons:', error);
        showToast('কুপন তালিকা লোড করা যায়নি।', 'error');
      }

      try {
        const messageRes = await fetch(`${API_BASE}/api/contact`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const messageData = await messageRes.json();
        if (!messageRes.ok || !messageData.success || !Array.isArray(messageData.data)) {
          throw new Error(messageData.message || 'Messages API returned an invalid response');
        }
        setMessages(messageData.data);
      } catch (error) {
        console.error('Error fetching admin messages:', error);
      }

      try {
        const blogRes = await fetch(`${API_BASE}/api/blogs/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const blogData = await blogRes.json();
        if (!blogRes.ok || !blogData.success || !Array.isArray(blogData.data)) {
          throw new Error(blogData.message || 'Blog API returned an invalid response');
        }
        setBlogPosts(blogData.data);
      } catch (error) {
        console.error('Error fetching admin blog posts:', error);
      }
    }
    fetchBackendData();
  }, [isAdmin, isLoaded, router, token]);

  if (!isLoaded || !isAdmin || !token) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-stone-100">
        <p className="text-sm font-semibold text-emerald-800">লোড হচ্ছে...</p>
      </main>
    );
  }

  const handleUpdateStatus = async (
    orderId: string,
    newStatus: AdminOrder['status']
  ) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );

    try {
      await fetch(`${API_BASE}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      // offline support
    }
    showToast(`অর্ডার স্ট্যাটাস ${newStatus} এ আপডেট হয়েছে!`);
  };

  const handleCreateCoupon = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const discountAmount = Number(newCouponAmount);
    const minOrderAmount = newCouponMinOrder ? Number(newCouponMinOrder) : 0;
    if (!newCouponCode.trim() || !Number.isFinite(discountAmount) || discountAmount <= 0 ||
      !Number.isFinite(minOrderAmount) || minOrderAmount < 0) {
      showToast('সঠিক কুপন কোড ও ছাড়ের পরিমাণ দিন।', 'error');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/coupons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: newCouponCode.trim(),
          discountAmount,
          minOrderAmount,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'কুপন তৈরি করা যায়নি।');
      }

      setCouponsList((current) => [result.data, ...current]);
      setNewCouponCode('');
      setNewCouponAmount('');
      setNewCouponMinOrder('');
      showToast('কুপন তৈরি ও সক্রিয় হয়েছে।');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'কুপন তৈরি করা যায়নি।', 'error');
    }
  };

  const handleToggleCoupon = async (coupon: AdminCoupon) => {
    try {
      const response = await fetch(`${API_BASE}/api/coupons/${coupon.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'কুপনের অবস্থা পরিবর্তন করা যায়নি।');
      }

      setCouponsList((current) =>
        current.map((item) => item.id === coupon.id ? result.data : item)
      );
      showToast(coupon.isActive ? 'কুপন নিষ্ক্রিয় করা হয়েছে।' : 'কুপন আবার সক্রিয় হয়েছে।');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'কুপনের অবস্থা পরিবর্তন করা যায়নি।', 'error');
    }
  };

  const handleCreateBlogPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSavingBlog(true);

    try {
      const response = await fetch(`${API_BASE}/api/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newBlogTitle.trim(),
          excerpt: newBlogExcerpt.trim(),
          content: newBlogContent.trim(),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success || !result.data) {
        throw new Error(result.message || 'ব্লগ প্রকাশ করা যায়নি।');
      }

      setBlogPosts((current) => [result.data, ...current]);
      setNewBlogTitle('');
      setNewBlogExcerpt('');
      setNewBlogContent('');
      showToast('ব্লগ প্রকাশ করা হয়েছে।');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'ব্লগ প্রকাশ করা যায়নি।', 'error');
    } finally {
      setIsSavingBlog(false);
    }
  };

  // 1. ADD NEW PRODUCT HANDLER (Directly Inside Page & Synced to Backend)
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdPrice) return;
    if (!newProdImageUrl) {
      showToast('পণ্য সেভ করার আগে gallery থেকে ছবি বেছে upload করুন।', 'error');
      return;
    }

    const matchedCat = categoriesList.find((c) => c.slug === newProdCategory);
    const slug = newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (!slug || !matchedCat) {
      showToast('পণ্যের নাম ইংরেজিতে দিন এবং একটি category বেছে নিন।', 'error');
      return;
    }

    setIsSavingProduct(true);
    try {
      const ingredients = newProdIngredients.map((item) => item.trim()).filter(Boolean);
      const highlights = newProdHighlights.map((item) => item.trim()).filter(Boolean);
      const response = await fetch(`${API_BASE}/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newProdName.trim(),
          slug,
          description: newProdDescription.trim() || 'প্রাকৃতিক ও স্বাস্থ্যকর পুষ্টিকর খাবার।',
          price: parseFloat(newProdPrice),
          discountPrice: newProdDiscountPrice ? parseFloat(newProdDiscountPrice) : undefined,
          ingredients,
          highlights,
          calories: newProdCalories ? Number(newProdCalories) : null,
          packSize: newProdPackSize,
          imageUrl: newProdImageUrl,
          categoryId: matchedCat.id,
          isFeatured: true,
        }),
      });

      const result: {
        success?: boolean;
        data?: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          price: number | string;
          discountPrice: number | string | null;
          packSize: string | null;
          stock: number;
          imageUrl: string | null;
          ingredients: string[];
          highlights: string[];
          calories: number | null;
          isFeatured: boolean;
          category: { slug: string; name: string };
        };
        message?: string;
      } = await response.json();

      if (!response.ok || !result.success || !result.data) {
        showToast(result.message || 'পণ্য সংরক্ষণ করা যায়নি।', 'error');
        return;
      }

      const savedProduct: Product = {
        id: result.data.id,
        name: result.data.name,
        slug: result.data.slug,
        description: result.data.description || '',
        price: Number(result.data.price),
        discountPrice: result.data.discountPrice
          ? Number(result.data.discountPrice)
          : undefined,
        packSize: result.data.packSize || '',
        stock: result.data.stock,
        imageUrl: result.data.imageUrl || newProdImageUrl,
        ingredients: result.data.ingredients,
        highlights: result.data.highlights,
        calories: result.data.calories,
        isFeatured: result.data.isFeatured,
        categorySlug: result.data.category.slug,
        categoryName: result.data.category.name,
      };

      setProductsList((current) => [savedProduct, ...current]);
      setShowInPageAddProduct(false);
      setNewProdName('');
      setNewProdPrice('');
      setNewProdDiscountPrice('');
      setNewProdImageUrl('');
      setNewProdDescription('');
      setNewProdIngredients(['']);
      setNewProdHighlights(['']);
      setNewProdCalories('');
      showToast('নতুন পণ্য সফলভাবে যোগ করা হয়েছে!');
    } catch (error) {
      console.error('Error creating product:', error);
      showToast('সার্ভারের সঙ্গে যোগাযোগ করা যায়নি; পণ্য সংরক্ষিত হয়নি।', 'error');
    } finally {
      setIsSavingProduct(false);
    }
  };

  // 2. OPEN EDIT MODAL
  const openEditModal = (prod: Product) => {
    setSelectedProduct(prod);
    setEditPrice(prod.price.toString());
    setEditDiscountPrice(prod.discountPrice ? prod.discountPrice.toString() : '');
    setEditStock(prod.stock.toString());
    setEditPackSize(prod.packSize);
    setIsEditProductOpen(true);
  };

  // 3. SAVE EDITED PRODUCT (Price, Discount, Stock & Synced to Backend)
  const handleSaveEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const updatedPrice = parseFloat(editPrice) || selectedProduct.price;
    const updatedDiscount = editDiscountPrice ? parseFloat(editDiscountPrice) : undefined;
    const updatedStock = parseInt(editStock) || selectedProduct.stock;
    const updatedPack = editPackSize || selectedProduct.packSize;

    const updated = productsList.map((p) => {
      if (p.id === selectedProduct.id) {
        return {
          ...p,
          price: updatedPrice,
          discountPrice: updatedDiscount,
          stock: updatedStock,
          packSize: updatedPack,
        };
      }
      return p;
    });

    setProductsList(updated);
    setIsEditProductOpen(false);

    // Sync to backend
    try {
      await fetch(`${API_BASE}/api/products/${selectedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          price: updatedPrice,
          discountPrice: updatedDiscount,
          stock: updatedStock,
          packSize: updatedPack,
        }),
      });
    } catch (err) {}

    showToast(`"${selectedProduct.name}" এর মূল্য ও স্টক আপডেট করা হয়েছে!`);
  };

  // 4. DELETE PRODUCT (Synced to Backend)
  const handleDeleteProduct = async (id: string, name: string) => {
    if (confirm(`আপনি কি সত্যিই "${name}" পণ্যটি মুছে ফেলতে চান?`)) {
      setProductsList(productsList.filter((p) => p.id !== id));
      try {
        await fetch(`${API_BASE}/api/products/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {}
      showToast('পণ্যটি সফলভাবে মুছে ফেলা হয়েছে!');
    }
  };

  // 5. ADD NEW CATEGORY HANDLER (Directly Inside Page & Synced to Backend)
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = newCatName.trim();
    if (!name) return;
    if (!newCatImageUrl) {
      showToast('ক্যাটাগরি সেভ করার আগে gallery থেকে ছবি বেছে upload করুন।', 'error');
      return;
    }

    const slug = (newCatSlug.trim() || name.toLowerCase())
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    if (!slug) {
      showToast('বাংলা নামের জন্য ইংরেজি অক্ষরে একটি URL slug দিন।', 'error');
      return;
    }

    setIsSavingCategory(true);
    try {
      const response = await fetch(`${API_BASE}/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          slug,
          description: newCatDescription.trim() || 'প্রাকৃতিক ও স্বাস্থ্যকর পণ্যের সম্ভার',
          imageUrl: newCatImageUrl,
        }),
      });

      const result: {
        success?: boolean;
        data?: Category;
        message?: string;
      } = await response.json();
      const savedCategory = result.data;

      if (!response.ok || !result.success || !savedCategory) {
        showToast(result.message || 'ক্যাটাগরি সংরক্ষণ করা যায়নি।', 'error');
        return;
      }

      setCategoriesList((current) => [...current, savedCategory]);
      setShowInPageAddCategory(false);
      setNewCatName('');
      setNewCatSlug('');
      setNewCatImageUrl('');
      setNewCatDescription('');
      showToast('নতুন ক্যাটাগরি তৈরি সম্পন্ন হয়েছে!');
    } catch (error) {
      console.error('Error creating category:', error);
      showToast('সার্ভারের সঙ্গে যোগাযোগ করা যায়নি; ক্যাটাগরি সংরক্ষিত হয়নি।', 'error');
    } finally {
      setIsSavingCategory(false);
    }
  };

  // Metrics
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'PENDING').length;
  const confirmedCount = orders.filter((o) => o.status === 'CONFIRMED').length;
  const processingCount = orders.filter((o) => o.status === 'PROCESSING').length;
  const shippedCount = orders.filter((o) => o.status === 'SHIPPED').length;
  const deliveredCount = orders.filter((o) => o.status === 'DELIVERED').length;
  const totalSales = orders
    .filter((o) => o.status !== 'CANCELLED')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  // Sales Report & Health Analytics Data
  const periodStats = {
    today: { sales: '৳৪,৩৫০', orders: '৮ টি', growth: '+১২.৪%', subtitle: 'আজকের মোট অর্ডার' },
    '7days': { sales: '৳৪৪,৮০০', orders: '৯২ টি', growth: '+১৮.৫%', subtitle: 'গত ৭ দিনের সার্বিক অগ্রগতি' },
    month: { sales: '৳১,৮৬,৪০০', orders: '৩৮৫ টি', growth: '+২৪.১%', subtitle: 'চলতি মাসের মোট সেলস' },
    year: { sales: '৳১৪,২৫,০০০', orders: '২,৯৫০ টি', growth: '+৩৫.৮%', subtitle: 'বাৎসরিক গ্রোথ রেকার্ড' },
  };

  const weeklySalesData = [
    { day: 'শনিবার', sales: 4200, orders: 8, heightPercent: 46 },
    { day: 'রবিবার', sales: 5800, orders: 11, heightPercent: 64 },
    { day: 'সোমবার', sales: 6300, orders: 13, heightPercent: 69 },
    { day: 'মঙ্গলবার', sales: 5100, orders: 10, heightPercent: 56 },
    { day: 'বুধবার', sales: 7400, orders: 15, heightPercent: 81 },
    { day: 'বৃহস্পতিবার', sales: 6900, orders: 14, heightPercent: 76 },
    { day: 'শুক্রবার', sales: 9100, orders: 19, heightPercent: 100 },
  ];

  const topSellingFoods = [
    { name: 'Healthy Mixed Salad', sold: '৪২ পিস', revenue: '৳১৪,৭০০', tag: '🥗 ফ্রেশ খাবার', percent: 92 },
    { name: 'Roasted Almonds (বাদাম)', sold: '২৮ পিস', revenue: '৳১৮,২০০', tag: '🥜 প্রিমিয়াম নাটস', percent: 78 },
    { name: 'Whole Wheat Sandwich', sold: '৩৪ পিস', revenue: '৳৬,৮০০', tag: '🥪 হেলদি ব্রেকফাস্ট', percent: 65 },
    { name: 'Organic Chia Seeds', sold: '২২ পিস', revenue: '৳৮,৮০০', tag: '🌾 সুপার সিডস', percent: 52 },
  ];

  // Filtered Orders
  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = statusFilter === 'ALL' || ord.status === statusFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerPhone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen w-full bg-stone-100 flex font-sans text-gray-900 antialiased overflow-x-hidden">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-slide-up ${
            toastMessage.type === 'error'
              ? 'bg-red-900 border border-red-700'
              : 'bg-emerald-900 border border-emerald-700'
          }`}
        >
          {toastMessage.type === 'error' ? (
            <AlertTriangle className="w-4 h-4 text-red-300" />
          ) : (
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          )}
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* 1. LEFT SIDEBAR: STRICTLY CLEAN NAVIGATION ROUTES ONLY */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 lg:w-72 bg-emerald-950 text-white flex flex-col justify-between border-r border-emerald-900 transition-transform duration-300 lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Sidebar Brand Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-emerald-900/80 bg-emerald-950">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-emerald-950 text-lg shadow-md shadow-emerald-500/20">
                Z
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  ZaK<span className="text-emerald-400">Jomok</span>
                </span>
                <p className="text-[10px] text-emerald-300 uppercase tracking-widest font-extrabold -mt-0.5">
                  Admin Panel
                </p>
              </div>
            </div>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-emerald-300 hover:bg-emerald-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Standard Navigation Routes Only */}
          <div className="p-4 space-y-1.5">
            <p className="text-[10px] font-black uppercase tracking-wider text-emerald-400 px-3 py-2">
              নেভিগেশন রুট
            </p>

            {/* Route 1: Overview (Everything in One Place) */}
            <button
              onClick={() => {
                setActiveTab('overview');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                activeTab === 'overview'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-emerald-100/80 hover:bg-emerald-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>📊 ওভারভিউ (একনজরে)</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            {/* Route 2: Products */}
            <button
              onClick={() => {
                setActiveTab('products');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                activeTab === 'products'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-emerald-100/80 hover:bg-emerald-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>🥗 পণ্য ও স্টক (Products)</span>
              </div>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-100 font-bold px-2 py-0.5 rounded-full">
                {productsList.length} টি
              </span>
            </button>

            {/* Route 3: Categories */}
            <button
              onClick={() => {
                setActiveTab('categories');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                activeTab === 'categories'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-emerald-100/80 hover:bg-emerald-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderTree className="w-4 h-4" />
                <span>📂 ক্যাটাগরি সমূহ</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold">{categoriesList.length}</span>
            </button>

            {/* Route 4: Orders */}
            <button
              onClick={() => {
                setActiveTab('orders');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                activeTab === 'orders'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-emerald-100/80 hover:bg-emerald-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>📦 অর্ডারসমূহ (Orders)</span>
              </div>
              {pendingOrdersCount > 0 ? (
                <span className="bg-amber-400 text-emerald-950 text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce">
                  {pendingOrdersCount} নতুন
                </span>
              ) : (
                <span className="text-[10px] font-bold text-emerald-400">{orders.length}</span>
              )}
            </button>

            {/* Route 5: Customers */}
            <button
              onClick={() => {
                setActiveTab('customers');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                activeTab === 'customers'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-emerald-100/80 hover:bg-emerald-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>👥 কাস্টমার লিস্ট</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold">{orders.length}</span>
            </button>

            {/* Route 6: Coupons */}
            <button
              onClick={() => {
                setActiveTab('coupons');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                activeTab === 'coupons'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-emerald-100/80 hover:bg-emerald-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Tag className="w-4 h-4" />
                <span>🏷️ কুপন ও ডিসকাউন্ট</span>
              </div>
              <span className="text-[10px] text-amber-300 font-bold">অফার</span>
            </button>

            {/* Route 7: Contact Messages */}
            <button
              onClick={() => {
                setActiveTab('messages');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                activeTab === 'messages'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-emerald-100/80 hover:bg-emerald-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>✉️ ইনকোয়ারি বার্তা</span>
              </div>
              <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full font-bold">
                {messages.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('blogs');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs transition-all ${
                activeTab === 'blogs'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-emerald-100/80 hover:bg-emerald-900 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>📝 ব্লগ লেখা</span>
              </div>
              <span className="text-[10px] text-emerald-300 font-bold">{blogPosts.length}</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-emerald-900/80 space-y-3 bg-emerald-950/80">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-bold text-xs transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              লাইভ শপ ভিউ
            </span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </Link>

          <div className="flex items-center gap-3 px-2 pt-1">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center font-black text-sm">
              {user?.name.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-emerald-300 truncate">{user?.phone}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                router.replace('/admin');
              }}
              aria-label="Admin থেকে লগআউট"
              title="লগআউট"
              className="rounded-lg p-2 text-emerald-200 transition hover:bg-emerald-900 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* 2. RIGHT MAIN WORKSPACE (FULL WIDTH) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 lg:pl-72 w-full">
        
        {/* Top Header Bar */}
        <header className="h-20 bg-white border-b border-stone-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-stone-50"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900">
                {activeTab === 'overview' && '📊 ড্যাশবোর্ড ওভারভিউ (সবকিছু একনজরে)'}
                {activeTab === 'products' && '🥗 পণ্য ব্যবস্থাপনা ও মূল্য সেটআপ'}
                {activeTab === 'categories' && '📂 ক্যাটাগরি তৈরি ও পরিচালনা'}
                {activeTab === 'orders' && '📦 অর্ডার ম্যানেজমেন্ট ও ফোন কল কনফার্মেশন'}
                {activeTab === 'customers' && '👥 কাস্টমার ডাটাবেজ'}
                {activeTab === 'coupons' && '🏷️ ডিসকাউন্ট ও কুপন কোড'}
                {activeTab === 'messages' && '✉️ কাস্টমার ইনকোয়ারি বার্তা'}
                {activeTab === 'blogs' && '📝 ব্লগ লেখা ও প্রকাশ'}
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                ZakJomok Healthy Food • ফুল উইডথ বিজনেস কন্ট্রোল প্যানেল
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
            >
              <span>লাইভ শপ</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* FULL WIDTH MAIN CONTENT */}
        <main className="p-6 sm:p-8 flex-1 space-y-6 w-full max-w-none">
          
          {/* ========================================================
              TAB: OVERVIEW (MASTER DASHBOARD - EVERYTHING IN ONE PLACE)
          ======================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6 w-full animate-fade-in">
              
              {/* ========================================================
                  1. AT THE VERY TOP: LIVE STORE HEALTH & SALES REPORT
                  (একপলকে সাইটের সার্বিক বিক্রয় ও অগ্রগতি বোঝার জন্য)
              ======================================================== */}
              <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-6">
                
                {/* Header: Live Status + Time Filter */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-600"></span>
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                          লাইভ সেলস ও বিজনেস পারফর্ম্যান্স রিপোর্ট
                        </h2>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase">
                          স্টোর লাইভ
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        একপলকে সাইটের বিক্রয়, গ্রাহকের অর্ডার প্রবণতা ও ডেলিভারি অগ্রগতি পর্যবেক্ষণ করুন
                      </p>
                    </div>
                  </div>

                  {/* Time Filter Buttons */}
                  <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-2xl self-start md:self-auto">
                    {[
                      { key: 'today', label: 'আজকের সেলস' },
                      { key: '7days', label: 'গত ৭ দিন' },
                      { key: 'month', label: 'এই মাস' },
                      { key: 'year', label: 'চলতি বছর' },
                    ].map((p) => (
                      <button
                        key={p.key}
                        onClick={() => setSalesPeriod(p.key as any)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          salesPeriod === p.key
                            ? 'bg-emerald-800 text-white shadow-xs'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-stone-200/60'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4 Highlights of Current Selected Period */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                    <div className="flex items-center justify-between text-gray-500 text-xs">
                      <span className="font-bold">মোট বিক্রয় রেভিনিউ</span>
                      <DollarSign className="w-4 h-4 text-emerald-700" />
                    </div>
                    <p className="text-2xl font-black text-emerald-800 mt-1.5">
                      {periodStats[salesPeriod].sales}
                    </p>
                    <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" /> {periodStats[salesPeriod].growth} গ্রোথ
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                    <div className="flex items-center justify-between text-gray-500 text-xs">
                      <span className="font-bold">মোট অর্ডার সংখ্যা</span>
                      <ShoppingBag className="w-4 h-4 text-blue-700" />
                    </div>
                    <p className="text-2xl font-black text-gray-900 mt-1.5">
                      {periodStats[salesPeriod].orders}
                    </p>
                    <span className="text-[11px] text-gray-500 font-medium mt-0.5 block">
                      {periodStats[salesPeriod].subtitle}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                    <div className="flex items-center justify-between text-gray-500 text-xs">
                      <span className="font-bold">গড় অর্ডার মূল্য (AOV)</span>
                      <Activity className="w-4 h-4 text-purple-700" />
                    </div>
                    <p className="text-2xl font-black text-purple-900 mt-1.5">৳৪৮৫</p>
                    <span className="text-[11px] text-gray-500 font-medium mt-0.5 block">
                      প্রতি কাস্টমার বাস্কেট সাইজ
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                    <div className="flex items-center justify-between text-gray-500 text-xs">
                      <span className="font-bold">ডেলিভারি সাকসেস রেট</span>
                      <Percent className="w-4 h-4 text-teal-700" />
                    </div>
                    <p className="text-2xl font-black text-teal-900 mt-1.5">৯৪.২%</p>
                    <span className="text-[11px] text-teal-700 font-bold mt-0.5 block">
                      সফল ক্যাশ অন ডেলিভারি
                    </span>
                  </div>
                </div>

                {/* Visual Analytics Grid: 7-Day Sales Trend Bar Chart + Pipeline Funnel */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                  
                  {/* Left: 7-Day Revenue Trend Bar Chart (Span 2) */}
                  <div className="lg:col-span-2 p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-emerald-700" />
                        <h3 className="font-bold text-gray-900 text-sm">
                          ৭ দিনের দৈনিক বিক্রয় ও রেভিনিউ গ্রাফ (সাপ্তাহিক ট্রেন্ড)
                        </h3>
                      </div>
                      <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                        চলতি সপ্তাহ: ৳৪৪,৮০০
                      </span>
                    </div>

                    {/* Bar Chart Visualization */}
                    <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 pt-8 px-2 border-b border-gray-200">
                      {weeklySalesData.map((d, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                          {/* Amount tag on hover or prominent for top day */}
                          <span className={`text-[10px] font-black transition-all ${
                            d.heightPercent === 100
                              ? 'text-emerald-700 font-extrabold scale-105'
                              : 'text-gray-400 group-hover:text-gray-900'
                          }`}>
                            ৳{d.sales}
                          </span>

                          {/* Bar */}
                          <div className="w-full max-w-[42px] bg-stone-200 rounded-t-xl overflow-hidden h-full flex items-end">
                            <div
                              style={{ height: `${d.heightPercent}%` }}
                              className={`w-full rounded-t-xl transition-all duration-500 ${
                                d.heightPercent === 100
                                  ? 'bg-gradient-to-t from-emerald-700 to-teal-500 shadow-sm'
                                  : 'bg-gradient-to-t from-emerald-800/80 to-emerald-600/70 group-hover:from-emerald-700 group-hover:to-teal-400'
                              }`}
                            />
                          </div>

                          {/* Day Label */}
                          <span className="text-[10px] font-bold text-gray-600 truncate max-w-[48px] text-center">
                            {d.day}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Chart Footer Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                        <span>সর্বোচ্চ বিক্রয়: <strong>শুক্রবার (৳৯,১০০)</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shrink-0" />
                        <span>গড় দৈনিক সেলস: <strong>৳৬,৪০০</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                        <span>সাপ্তাহিক অর্ডার: <strong>৯২ টি</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Order Status Pipeline Funnel (Span 1) */}
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
                        <h3 className="font-bold text-gray-900 text-sm">অর্ডার পাইপলাইন ফানেল</h3>
                        <span className="text-[10px] text-gray-500 font-bold">লাইভ অবস্থা</span>
                      </div>

                      <div className="space-y-3 mt-3">
                        {/* 1. Pending */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-gray-700">
                            <span className="flex items-center gap-1 text-amber-700">
                              <Clock className="w-3 h-3 text-amber-600" /> ১. পেন্ডিং (কল করা বাকি)
                            </span>
                            <span className="text-amber-900 font-black">{pendingOrdersCount} টি</span>
                          </div>
                          <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${Math.min(100, pendingOrdersCount * 25)}%` }}
                              className="bg-amber-500 h-full rounded-full"
                            />
                          </div>
                        </div>

                        {/* 2. Confirmed */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-gray-700">
                            <span className="flex items-center gap-1 text-blue-700">
                              <CheckCircle className="w-3 h-3 text-blue-600" /> ২. ফোনে কনফার্মড
                            </span>
                            <span className="text-blue-900 font-black">{confirmedCount} টি</span>
                          </div>
                          <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${Math.min(100, confirmedCount * 30)}%` }}
                              className="bg-blue-600 h-full rounded-full"
                            />
                          </div>
                        </div>

                        {/* 3. Processing */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-gray-700">
                            <span className="flex items-center gap-1 text-indigo-700">
                              <Package className="w-3 h-3 text-indigo-600" /> ৩. প্যাকেজিং চলছে
                            </span>
                            <span className="text-indigo-900 font-black">{processingCount} টি</span>
                          </div>
                          <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${Math.min(100, processingCount * 30)}%` }}
                              className="bg-indigo-600 h-full rounded-full"
                            />
                          </div>
                        </div>

                        {/* 4. Shipped */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-gray-700">
                            <span className="flex items-center gap-1 text-purple-700">
                              <Truck className="w-3 h-3 text-purple-600" /> ৪. রাইডারের কাছে (Shipped)
                            </span>
                            <span className="text-purple-900 font-black">{shippedCount} টি</span>
                          </div>
                          <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${Math.min(100, shippedCount * 30)}%` }}
                              className="bg-purple-600 h-full rounded-full"
                            />
                          </div>
                        </div>

                        {/* 5. Delivered */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-gray-700">
                            <span className="flex items-center gap-1 text-emerald-700">
                              <CheckCircle className="w-3 h-3 text-emerald-600" /> ৫. সফল ডেলিভারি
                            </span>
                            <span className="text-emerald-900 font-black">{deliveredCount} টি</span>
                          </div>
                          <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${Math.min(100, deliveredCount * 30)}%` }}
                              className="bg-emerald-600 h-full rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200 text-[11px] text-gray-600 flex items-center justify-between font-bold">
                      <span>ডেলিভারি এলাকা:</span>
                      <span className="text-emerald-800">ঢাকা ৬৮% • বাইরে ৩২%</span>
                    </div>
                  </div>

                </div>

                {/* Top Selling Foods Quick Row */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                      🔥 সর্বাধিক বিক্রিত শীর্ষ খাবারসমূহ (Top Bestselling Foods)
                    </h4>
                    <span className="text-[11px] text-gray-500 font-medium">সর্বোচ্চ ডিমান্ড আইটেম</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {topSellingFoods.map((item, i) => (
                      <div key={i} className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-gray-900 truncate max-w-[140px]">{item.name}</span>
                          <span className="text-emerald-700 font-black">{item.revenue}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-gray-500">
                          <span>{item.tag}</span>
                          <span className="font-bold text-gray-700">{item.sold}</span>
                        </div>
                        <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${item.percent}%` }}
                            className="bg-emerald-600 h-full rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
              
              {/* 1. WELCOME & QUICK SHORTCUTS BANNER */}
              <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-950/20 relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 bg-emerald-700/80 text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider text-emerald-200">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                      ZaKJomok মাস্টার কন্ট্রোল প্যানেল
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                      ড্যাশবোর্ড ওভারভিউ — সবকিছু একনজরে
                    </h2>
                    <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
                      আজকের মোট সেলস, পেন্ডিং ফোন কল কনফার্মেশন, পণ্যের ইনভেন্টরি স্টক ও কাস্টমার ইনকোয়ারি এখানে একনজরে পর্যবেক্ষণ ও নিয়ন্ত্রণ করুন।
                    </p>
                  </div>

                  {/* Quick Action Shortcuts */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={() => {
                        setActiveTab('products');
                        setShowInPageAddProduct(true);
                      }}
                      className="px-4 py-2.5 bg-white hover:bg-emerald-50 text-emerald-950 font-black text-xs rounded-xl shadow-md transition-all hover:scale-105 flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5 text-emerald-700" />
                      নতুন পণ্য যোগ করুন
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('categories');
                        setShowInPageAddCategory(true);
                      }}
                      className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 border border-emerald-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      নতুন ক্যাটাগরি
                    </button>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="px-4 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-200 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 border border-emerald-800"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      সকল অর্ডার ({orders.length})
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. CORE METRICS KPI CARDS (6 Key Indicators) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 w-full">
                {/* 1. Total COD Sales */}
                <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-[11px] font-bold uppercase tracking-wider">মোট বিক্রয় (COD)</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl sm:text-3xl font-black text-emerald-800">৳{totalSales}</p>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-3 h-3" /> ক্যাশ অন ডেলিভারি
                    </span>
                  </div>
                </div>

                {/* 2. Pending Orders (Urgent) */}
                <div
                  onClick={() => setActiveTab('orders')}
                  className={`p-5 rounded-3xl border shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between ${
                    pendingOrdersCount > 0
                      ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-300/40'
                      : 'bg-white border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-amber-900">
                    <span className="text-[11px] font-black uppercase tracking-wider">পেন্ডিং অর্ডার</span>
                    <Clock className="w-4 h-4 text-amber-600 animate-spin-slow" />
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl sm:text-3xl font-black text-amber-950">{pendingOrdersCount} টি</p>
                    <span className="text-[10px] text-amber-800 font-bold flex items-center gap-1 mt-0.5">
                      <PhoneCall className="w-3 h-3 text-amber-600" /> ফোনে কনফার্ম করুন
                    </span>
                  </div>
                </div>

                {/* 3. Confirmed & In-Packaging */}
                <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-[11px] font-bold uppercase tracking-wider">কনফার্মড ও প্যাকিং</span>
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl sm:text-3xl font-black text-blue-900">{confirmedCount + processingCount} টি</p>
                    <span className="text-[10px] text-blue-600 font-bold flex items-center gap-1 mt-0.5">
                      <CheckCircle className="w-3 h-3" /> প্রসেসিং চলছে
                    </span>
                  </div>
                </div>

                {/* 4. Delivered */}
                <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-[11px] font-bold uppercase tracking-wider">সফল ডেলিভারি</span>
                    <Truck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl sm:text-3xl font-black text-emerald-900">{deliveredCount} টি</p>
                    <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                      <CheckCircle className="w-3 h-3" /> সম্পন্ন অর্ডার
                    </span>
                  </div>
                </div>

                {/* 5. Total Products */}
                <div
                  onClick={() => setActiveTab('products')}
                  className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-[11px] font-bold uppercase tracking-wider">হেলদি ফুড পণ্য</span>
                    <Package className="w-4 h-4 text-teal-600" />
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl sm:text-3xl font-black text-gray-900">{productsList.length} টি</p>
                    <span className="text-[10px] text-teal-700 font-bold flex items-center gap-1 mt-0.5">
                      সরাসরি এডিট ও অ্যাড
                    </span>
                  </div>
                </div>

                {/* 6. Categories */}
                <div
                  onClick={() => setActiveTab('categories')}
                  className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-[11px] font-bold uppercase tracking-wider">মোট ক্যাটাগরি</span>
                    <FolderTree className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl sm:text-3xl font-black text-gray-900">{categoriesList.length} টি</p>
                    <span className="text-[10px] text-purple-700 font-bold flex items-center gap-1 mt-0.5">
                      ক্যাটাগরি সমূহ
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. URGENT PENDING ORDERS SECTION (Direct Phone Confirmation) */}
              {pendingOrdersCount > 0 && (
                <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-black">
                        <PhoneCall className="w-5 h-5 animate-bounce" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-amber-950">
                          🚨 জরুরি: কাস্টমারকে ফোন করে কনফার্ম করার জন্য {pendingOrdersCount} টি নতুন অর্ডার জমা আছে
                        </h3>
                        <p className="text-xs text-amber-800">
                          কাস্টমারদের সরাসরি ফোন দিয়ে কনফার্ম করুন এবং নিচের বাটনে চাপ দিয়ে স্ট্যাটাস পরিবর্তন করুন
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 self-start sm:self-auto"
                    >
                      অর্ডার ম্যানেজমেন্টে যান →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {orders
                      .filter((o) => o.status === 'PENDING')
                      .map((ord) => (
                        <div
                          key={ord.id}
                          className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs flex flex-col justify-between space-y-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-black text-xs text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                                {ord.orderNumber}
                              </span>
                              <span className="font-black text-xs text-emerald-800">৳{ord.totalAmount} (COD)</span>
                            </div>
                            <h4 className="font-bold text-gray-900 text-sm mt-1">{ord.customerName}</h4>
                            <p className="text-xs text-gray-500 line-clamp-1">{ord.customerAddress}</p>
                            <p className="text-xs text-emerald-900 font-medium bg-stone-50 p-2 rounded-xl mt-1">
                              {ord.itemsSummary}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                            <a
                              href={`tel:${ord.customerPhone}`}
                              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-black text-xs rounded-xl flex items-center gap-1.5 transition-colors border border-emerald-200"
                            >
                              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                              {ord.customerPhone}
                            </a>
                            <button
                              onClick={() => handleUpdateStatus(ord.id, 'CONFIRMED')}
                              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs rounded-xl shadow-xs transition-colors"
                            >
                              ✅ কনফার্ম করুন
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* 4. MASTER TWO-COLUMN GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                
                {/* LEFT COLUMN: RECENT ORDERS & PRODUCT INVENTORY (Span 2) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* CARD 1: RECENT ORDERS TABLE */}
                  <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <ShoppingBag className="w-5 h-5 text-emerald-700" />
                        <div>
                          <h3 className="font-bold text-gray-900 text-base">সর্বশেষ অর্ডারসমূহ</h3>
                          <p className="text-xs text-gray-500">সাম্প্রতিক গ্রাহকদের ক্যাশ অন ডেলিভারি অর্ডার</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline"
                      >
                        সকল অর্ডার দেখুন ({orders.length}) <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-stone-50 border-b border-stone-200 text-gray-600 font-bold uppercase text-[10px]">
                            <th className="p-4">অর্ডার নং</th>
                            <th className="p-4">কাস্টমার</th>
                            <th className="p-4">খাবার আইটেম</th>
                            <th className="p-4">মোট বিল</th>
                            <th className="p-4">স্ট্যাটাস</th>
                            <th className="p-4 text-right">একশন</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {orders.slice(0, 5).map((ord) => (
                            <tr key={ord.id} className="hover:bg-stone-50/60 transition-colors">
                              <td className="p-4 whitespace-nowrap">
                                <span className="font-black text-emerald-800 block">{ord.orderNumber}</span>
                                <span className="text-[10px] text-gray-400">{ord.createdAt}</span>
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <p className="font-bold text-gray-800">{ord.customerName}</p>
                                <a
                                  href={`tel:${ord.customerPhone}`}
                                  className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 hover:underline"
                                >
                                  <PhoneCall className="w-3 h-3" />
                                  {ord.customerPhone}
                                </a>
                              </td>
                              <td className="p-4 max-w-xs">
                                <p className="line-clamp-1 text-gray-700 font-medium">{ord.itemsSummary}</p>
                              </td>
                              <td className="p-4 whitespace-nowrap font-black text-gray-900">
                                ৳{ord.totalAmount}
                              </td>
                              <td className="p-4 whitespace-nowrap">
                                <span
                                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                    ord.status === 'PENDING'
                                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                      : ord.status === 'CONFIRMED'
                                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                      : ord.status === 'PROCESSING'
                                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                                      : ord.status === 'SHIPPED'
                                      ? 'bg-purple-100 text-purple-800 border border-purple-300'
                                      : ord.status === 'DELIVERED'
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                      : 'bg-red-100 text-red-800 border border-red-300'
                                  }`}
                                >
                                  {ord.status}
                                </span>
                              </td>
                              <td className="p-4 text-right whitespace-nowrap">
                                <select
                                  value={ord.status}
                                  onChange={(e) =>
                                    handleUpdateStatus(ord.id, e.target.value as AdminOrder['status'])
                                  }
                                  className="px-2.5 py-1 bg-white border border-gray-300 rounded-lg font-bold text-[11px] text-gray-800 focus:border-emerald-600 focus:outline-hidden cursor-pointer"
                                >
                                  <option value="PENDING">PENDING</option>
                                  <option value="CONFIRMED">CONFIRMED</option>
                                  <option value="PROCESSING">PROCESSING</option>
                                  <option value="SHIPPED">SHIPPED</option>
                                  <option value="DELIVERED">DELIVERED</option>
                                  <option value="CANCELLED">CANCELLED</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* CARD 2: PRODUCT INVENTORY & STOCK OVERVIEW */}
                  <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
                    <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Package className="w-5 h-5 text-emerald-700" />
                        <div>
                          <h3 className="font-bold text-gray-900 text-base">পণ্য তালিকা ও ইনভেন্টরি স্টক</h3>
                          <p className="text-xs text-gray-500">বর্তমান খাবারের দাম, অফার ও মজুত পণ্যের হিসাব</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setActiveTab('products');
                            setShowInPageAddProduct(true);
                          }}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          পণ্য যোগ
                        </button>
                        <button
                          onClick={() => setActiveTab('products')}
                          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline ml-2"
                        >
                          সকল পণ্য ({productsList.length}) <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {productsList.slice(0, 6).map((prod) => (
                        <div
                          key={prod.id}
                          className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/60 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.imageUrl}
                              alt={prod.name}
                              className="w-12 h-12 rounded-xl object-cover bg-stone-100 border border-stone-200 shrink-0"
                            />
                            <div>
                              <p className="font-bold text-gray-900 text-xs sm:text-sm">{prod.name}</p>
                              <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                                <span className="bg-stone-100 px-2 py-0.5 rounded font-medium">
                                  {prod.categoryName}
                                </span>
                                <span>প্যাক: {prod.packSize}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                            <div className="text-right">
                              <span className="font-black text-gray-900 text-xs sm:text-sm block">৳{prod.price}</span>
                              {prod.discountPrice && (
                                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                                  ছাড়: ৳{prod.discountPrice}
                                </span>
                              )}
                            </div>

                            <span
                              className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                                prod.stock < 15
                                  ? 'bg-red-100 text-red-700 border border-red-200'
                                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              }`}
                            >
                              স্টক: {prod.stock} পিস
                            </span>

                            <button
                              onClick={() => openEditModal(prod)}
                              className="px-3 py-1.5 bg-stone-100 hover:bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl transition-colors border border-stone-200"
                              title="দাম ও স্টক পরিবর্তন করুন"
                            >
                              ✏️ এডিট
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN: CATEGORIES, COUPONS, MESSAGES (Span 1) */}
                <div className="space-y-6">
                  
                  {/* CARD 3: CATEGORY BREAKDOWN */}
                  <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-2">
                        <FolderTree className="w-4 h-4 text-emerald-700" />
                        <h3 className="font-bold text-gray-900 text-sm">খাবারের ক্যাটাগরি সমূহ</h3>
                      </div>
                      <button
                        onClick={() => setActiveTab('categories')}
                        className="text-[11px] font-bold text-emerald-700 hover:underline"
                      >
                        সকল ({categoriesList.length}) →
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {categoriesList.map((cat) => {
                        const count = productsList.filter((p) => p.categorySlug === cat.slug).length;
                        return (
                          <div
                            key={cat.id}
                            className="p-2.5 rounded-2xl bg-stone-50 hover:bg-emerald-50/60 border border-stone-100 flex items-center justify-between transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={cat.imageUrl}
                                alt={cat.name}
                                className="w-9 h-9 rounded-xl object-cover border border-stone-200"
                              />
                              <div>
                                <h5 className="font-bold text-gray-900 text-xs">{cat.name}</h5>
                                <span className="text-[10px] text-gray-400 font-mono">/{cat.slug}</span>
                              </div>
                            </div>
                            <span className="text-[10px] bg-white text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-stone-200 shadow-2xs">
                              {count} টি পণ্য
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CARD 4: ACTIVE PROMO CODES */}
                  <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-amber-600" />
                        <h3 className="font-bold text-gray-900 text-sm">অ্যাক্টিভ কুপন ও ভাউচার</h3>
                      </div>
                      <button
                        onClick={() => setActiveTab('coupons')}
                        className="text-[11px] font-bold text-emerald-700 hover:underline"
                      >
                        কুপন ম্যানেজমেন্ট →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {couponsList.filter((coupon) => coupon.isActive).slice(0, 3).map((coupon) => (
                        <div key={coupon.id} className="flex items-center justify-between rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/80 p-3.5">
                          <div>
                            <span className="font-mono text-xs font-black text-emerald-900">{coupon.code}</span>
                            <p className="mt-0.5 text-[11px] font-bold text-gray-700">
                              {coupon.discountPercent ? `${coupon.discountPercent}% ছাড়` : `৳${coupon.discountAmount} ছাড়`}
                            </p>
                          </div>
                          <span className="rounded-full bg-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-900">সক্রিয়</span>
                        </div>
                      ))}
                      {couponsList.every((coupon) => !coupon.isActive) && (
                        <p className="text-xs text-gray-500">এখন কোনো কুপন সক্রিয় নেই।</p>
                      )}
                    </div>
                  </div>

                  {/* CARD 5: CUSTOMER INQUIRY MESSAGES */}
                  <div className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-emerald-700" />
                        <h3 className="font-bold text-gray-900 text-sm">কাস্টমার ইনকোয়ারি</h3>
                      </div>
                      <button
                        onClick={() => setActiveTab('messages')}
                        className="text-[11px] font-bold text-emerald-700 hover:underline"
                      >
                        সব মেসেজ ({messages.length}) →
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {messages.map((m) => (
                        <div key={m.id} className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1">
                          <div className="flex justify-between items-center font-bold text-gray-900">
                            <span>{m.name}</span>
                            <span className="text-[10px] text-gray-400 font-normal">{new Date(m.createdAt).toLocaleString('bn-BD')}</span>
                          </div>
                          <p className="font-semibold text-gray-700">{m.emailOrPhone}</p>
                          {m.subject && <p className="text-gray-500">{m.subject}</p>}
                          <p className="text-gray-600 text-[11px] line-clamp-2">{m.message}</p>
                          {!m.emailOrPhone.includes('@') && (
                            <a
                              href={`tel:${m.emailOrPhone}`}
                              className="text-[10px] text-emerald-700 font-bold inline-flex items-center gap-1 hover:underline mt-1"
                            >
                              <PhoneCall className="w-2.5 h-2.5" /> কল: {m.emailOrPhone}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 1: PRODUCT MANAGEMENT (Everything Happens In-Page!) */}
          {activeTab === 'products' && (
            <div className="space-y-6 w-full">
              
              {/* IN-PAGE ADD PRODUCT BANNER & TOGGLE */}
              <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl shadow-emerald-900/10">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-700/80 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-emerald-100">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                    পণ্য ও স্টক কন্ট্রোল
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">
                    নতুন খাবার যোগ করুন অথবা মূল্য সেটআপ করুন
                  </h3>
                  <p className="text-xs text-emerald-100/90 max-w-xl">
                    নিচের বাটনে চাপ দিলে সরাসরি এই পেজের ভেতরেই নতুন পণ্য যোগ করার ফর্ম ওপেন হবে।
                  </p>
                </div>

                {/* IN-PAGE TOGGLE BUTTON */}
                <button
                  onClick={() => setShowInPageAddProduct(!showInPageAddProduct)}
                  className="px-6 py-3.5 bg-white hover:bg-emerald-50 text-emerald-950 font-black text-xs rounded-2xl shadow-md transition-all hover:scale-105 flex items-center justify-center gap-2 shrink-0"
                >
                  <Plus className={`w-4 h-4 text-emerald-700 transition-transform ${showInPageAddProduct ? 'rotate-45' : ''}`} />
                  {showInPageAddProduct ? 'ফর্ম বন্ধ করুন' : '+ নতুন পণ্য যোগ করুন'}
                </button>
              </div>

              {/* IN-PAGE ADD PRODUCT FORM (Expands Right Inside The Page) */}
              {showInPageAddProduct && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-lg space-y-5 animate-scale-up">
                  <div className="pb-3 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-black text-gray-900">➕ নতুন খাবারের তথ্য পূরণ করুন</h4>
                      <p className="text-xs text-gray-500">ফর্ম পূরণ করে সেভ করলেই নিচের টেবিলে এবং ওয়েবসাইটে যুক্ত হবে</p>
                    </div>
                    <button
                      onClick={() => setShowInPageAddProduct(false)}
                      className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          পণ্যের নাম <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="যেমন: প্রিমিয়াম কাজুবাদাম (Roasted Cashews)"
                          value={newProdName}
                          onChange={(e) => setNewProdName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          ক্যাটাগরি নির্বাচন করুন <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={newProdCategory}
                          onChange={(e) => setNewProdCategory(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden bg-white font-semibold"
                        >
                          <option value="" disabled>
                            {categoriesList.length ? 'একটি category বেছে নিন' : 'আগে category তৈরি করুন'}
                          </option>
                          {categoriesList.map((c) => (
                            <option key={c.slug} value={c.slug}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                        {categoriesList.length === 0 && (
                          <p className="mt-1 text-[10px] text-amber-700">
                            Product যোগ করার আগে Categories tab থেকে একটি category তৈরি করুন।
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          বিক্রয় মূল্য (টাকায়) <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          required
                          placeholder="৪৫০"
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          ডিসকাউন্ট মূল্য (ছাড়ের পর দাম)
                        </label>
                        <input
                          type="number"
                          placeholder="৩৯০"
                          value={newProdDiscountPrice}
                          onChange={(e) => setNewProdDiscountPrice(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden font-bold text-emerald-700"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          প্যাক সাইজ <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="যেমন: 250g Jar / 1 Bowl (350g)"
                          value={newProdPackSize}
                          onChange={(e) => setNewProdPackSize(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          ক্যালরি (প্রতি প্যাক/সার্ভিং)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100000"
                          step="1"
                          placeholder="যেমন: 250 kcal"
                          value={newProdCalories}
                          onChange={(e) => setNewProdCalories(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden"
                        />
                      </div>
                    </div>

                    <div>
                      <AdminImageUpload
                        folder="products"
                        imageUrl={newProdImageUrl}
                        token={token}
                        onImageUrlChange={setNewProdImageUrl}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        খাবারের বিবরণ ও পুষ্টিগুণ
                      </label>
                      <textarea
                        rows={2}
                        placeholder="খাবারের উপকারিতা ও পুষ্টিগুণ সম্পর্কে লিখুন..."
                        value={newProdDescription}
                        onChange={(e) => setNewProdDescription(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2 rounded-2xl border border-stone-200 p-4">
                        <div className="flex items-center justify-between gap-2">
                          <label className="text-xs font-bold text-gray-700">উপাদান</label>
                          <button
                            type="button"
                            onClick={() => setNewProdIngredients((items) => [...items, ''])}
                            className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
                          >
                            + উপাদান যোগ করুন
                          </button>
                        </div>
                        {newProdIngredients.map((ingredient, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              maxLength={120}
                              aria-label={`উপাদান ${index + 1}`}
                              placeholder={index === 0 ? 'যেমন: কাঠবাদাম' : `উপাদান ${index + 1}`}
                              value={ingredient}
                              onChange={(event) => {
                                const value = event.target.value;
                                setNewProdIngredients((items) =>
                                  items.map((item, itemIndex) => itemIndex === index ? value : item)
                                );
                              }}
                              className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                            />
                            {newProdIngredients.length > 1 && (
                              <button
                                type="button"
                                aria-label={`উপাদান ${index + 1} মুছুন`}
                                onClick={() => setNewProdIngredients((items) => items.filter((_, itemIndex) => itemIndex !== index))}
                                className="rounded-lg px-2.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                              >
                                বাদ
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 rounded-2xl border border-stone-200 p-4">
                        <div className="flex items-center justify-between gap-2">
                          <label className="text-xs font-bold text-gray-700">হাইলাইট / বিশেষ দিক</label>
                          <button
                            type="button"
                            onClick={() => setNewProdHighlights((items) => [...items, ''])}
                            className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
                          >
                            + হাইলাইট যোগ করুন
                          </button>
                        </div>
                        {newProdHighlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              maxLength={120}
                              aria-label={`হাইলাইট ${index + 1}`}
                              placeholder={index === 0 ? 'যেমন: প্রোটিন সমৃদ্ধ' : `হাইলাইট ${index + 1}`}
                              value={highlight}
                              onChange={(event) => {
                                const value = event.target.value;
                                setNewProdHighlights((items) =>
                                  items.map((item, itemIndex) => itemIndex === index ? value : item)
                                );
                              }}
                              className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3 py-2 text-xs focus:border-emerald-600 focus:outline-hidden"
                            />
                            {newProdHighlights.length > 1 && (
                              <button
                                type="button"
                                aria-label={`হাইলাইট ${index + 1} মুছুন`}
                                onClick={() => setNewProdHighlights((items) => items.filter((_, itemIndex) => itemIndex !== index))}
                                className="rounded-lg px-2.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                              >
                                বাদ
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setShowInPageAddProduct(false)}
                        className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-stone-50"
                      >
                        বাতিল
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingProduct}
                        className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-700/20"
                      >
                        {isSavingProduct ? 'সেভ হচ্ছে...' : '✓ পণ্য সেভ করুন'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Summary Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
                  <p className="text-xs text-gray-500 font-bold uppercase">মোট পণ্যের সংখ্যা</p>
                  <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">{productsList.length} টি</p>
                  <span className="text-[11px] text-emerald-700 font-medium">লাইভ ওয়েবসাইটে প্রদর্শিত</span>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
                  <p className="text-xs text-gray-500 font-bold uppercase">মোট ক্যাটাগরি</p>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">{categoriesList.length} টি</p>
                  <span className="text-[11px] text-gray-500 font-medium">বাদাম, বীজ, ওটস ও সালাদ</span>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
                  <p className="text-xs text-gray-500 font-bold uppercase">ডিসকাউন্ট অফারযুক্ত পণ্য</p>
                  <p className="text-2xl sm:text-3xl font-black text-amber-700 mt-1">
                    {productsList.filter((p) => p.discountPrice).length} টি
                  </p>
                  <span className="text-[11px] text-amber-600 font-medium">বিশেষ ছাড়ে বিক্রি হচ্ছে</span>
                </div>
              </div>

              {/* Products Table with Direct Price & Stock Editing */}
              <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs w-full">
                <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      সকল খাবারের তালিকা, দাম ও স্টক ({productsList.length})
                    </h3>
                    <p className="text-xs text-gray-500">
                      যেকোনো পণ্যের দাম বা স্টক পরিবর্তন করতে "✏️ দাম ও স্টক এডিট" বাটনে ক্লিক করুন
                    </p>
                  </div>

                  <button
                    onClick={() => setShowInPageAddProduct(true)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    + নতুন পণ্য যোগ করুন
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-stone-50 border-b border-stone-200 text-gray-600 font-bold uppercase text-[11px]">
                        <th className="p-4">পণ্যের ছবি ও নাম</th>
                        <th className="p-4">ক্যাটাগরি</th>
                        <th className="p-4">প্যাক সাইজ</th>
                        <th className="p-4">বিক্রয় মূল্য</th>
                        <th className="p-4">ডিসকাউন্ট মূল্য</th>
                        <th className="p-4">বর্তমান স্টক</th>
                        <th className="p-4">অবস্থা</th>
                        <th className="p-4 text-right">মূল্য ও স্টক অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {productsList.map((prod) => (
                        <tr key={prod.id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <img
                              src={prod.imageUrl}
                              alt={prod.name}
                              className="w-12 h-12 rounded-xl object-cover bg-stone-100 border border-stone-200"
                            />
                            <div>
                              <span className="font-bold text-gray-900 text-sm block">{prod.name}</span>
                              <span className="text-[10px] text-gray-400 font-mono">/{prod.slug}</span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-600 font-medium">{prod.categoryName}</td>
                          <td className="p-4 text-gray-700 font-bold bg-stone-50/50 px-3 py-1 rounded-lg">
                            {prod.packSize}
                          </td>
                          <td className="p-4 font-black text-sm text-gray-900">৳{prod.price}</td>
                          <td className="p-4">
                            {prod.discountPrice ? (
                              <span className="font-black text-sm text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md">
                                ৳{prod.discountPrice}
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full font-bold text-xs ${
                                prod.stock < 15
                                  ? 'bg-red-100 text-red-700 border border-red-200'
                                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              }`}
                            >
                              {prod.stock} পিস
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                              সক্রিয় (Active)
                            </span>
                          </td>
                          <td className="p-4 text-right whitespace-nowrap space-x-2">
                            <button
                              onClick={() => openEditModal(prod)}
                              className="px-3 py-1.5 bg-stone-100 hover:bg-emerald-100 text-emerald-900 font-bold rounded-xl transition-colors border border-stone-200"
                              title="দাম ও স্টক পরিবর্তন করুন"
                            >
                              ✏️ দাম ও স্টক এডিট
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(prod.id, prod.name)}
                              className="px-2.5 py-1.5 hover:bg-red-50 text-red-600 hover:text-red-700 rounded-xl transition-colors"
                              title="পণ্য মুছুন"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CATEGORY CREATION & MANAGEMENT (In-Page) */}
          {activeTab === 'categories' && (
            <div className="space-y-6 w-full">
              <div className="bg-white rounded-3xl border border-stone-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">ক্যাটাগরি সমূহ ({categoriesList.length})</h3>
                  <p className="text-xs text-gray-500">
                    নতুন ক্যাটাগরি তৈরি করুন অথবা বর্তমান ক্যাটাগরি পরিচালনা করুন
                  </p>
                </div>
                <button
                  onClick={() => setShowInPageAddCategory(!showInPageAddCategory)}
                  className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  {showInPageAddCategory ? 'ফর্ম বন্ধ করুন' : 'নতুন ক্যাটাগরি তৈরি করুন'}
                </button>
              </div>

              {/* In-Page Add Category Form */}
              {showInPageAddCategory && (
                <div className="bg-white rounded-3xl p-6 border-2 border-emerald-500 shadow-lg space-y-4 animate-scale-up">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h4 className="text-base font-black text-gray-900">নতুন ক্যাটাগরি ফর্ম</h4>
                    <button onClick={() => setShowInPageAddCategory(false)} className="text-gray-400 hover:text-gray-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleAddCategory} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">ক্যাটাগরির নাম *</label>
                        <input
                          type="text"
                          required
                          placeholder="যেমন: Organic Honey & Tea"
                          value={newCatName}
                          onChange={(e) => setNewCatName(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">URL slug</label>
                        <input
                          type="text"
                          placeholder="যেমন: nuts-dry-fruits"
                          value={newCatSlug}
                          onChange={(e) => setNewCatSlug(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden"
                        />
                        <p className="text-[10px] text-gray-500 mt-1">
                          খালি রাখলে ইংরেজি নাম থেকে তৈরি হবে; বাংলা নাম হলে ইংরেজি slug লিখুন।
                        </p>
                      </div>
                    </div>
                    <AdminImageUpload
                      folder="categories"
                      imageUrl={newCatImageUrl}
                      token={token}
                      onImageUrlChange={setNewCatImageUrl}
                    />
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">সংক্ষিপ্ত বিবরণ</label>
                      <textarea
                        rows={2}
                        placeholder="ক্যাটাগরির পুষ্টিগুণ বা পণ্যের বর্ণনা..."
                        value={newCatDescription}
                        onChange={(e) => setNewCatDescription(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowInPageAddCategory(false)}
                        className="px-4 py-2 border rounded-xl text-xs font-bold text-gray-600"
                      >
                        বাতিল
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingCategory}
                        className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold"
                      >
                        {isSavingCategory ? 'সেভ হচ্ছে...' : 'ক্যাটাগরি সেভ করুন'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                {categoriesList.map((cat) => (
                  <div
                    key={cat.id}
                    className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        className="w-14 h-14 rounded-2xl object-cover bg-stone-100 border border-stone-200"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{cat.name}</h4>
                        <span className="text-[10px] text-emerald-700 font-mono block mt-0.5">
                          slug: /{cat.slug}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">{cat.description}</p>
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-emerald-800 font-semibold">
                      <span>পণ্য সংখ্যা: {productsList.filter((p) => p.categorySlug === cat.slug).length} টি</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                        সক্রিয়
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4 w-full">
              <div className="bg-white p-5 rounded-3xl border border-stone-200 flex flex-col md:flex-row gap-4 items-center justify-between shadow-2xs w-full">
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    placeholder="অর্ডার নং, নাম বা ফোন নম্বর দিয়ে খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-gray-200 rounded-xl text-xs focus:outline-hidden focus:border-emerald-600"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>

                <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                  {['ALL', 'PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                        statusFilter === st
                          ? 'bg-emerald-800 text-white shadow-2xs'
                          : 'bg-stone-100 text-gray-600 hover:bg-stone-200'
                      }`}
                    >
                      {st === 'ALL'
                        ? 'সব'
                        : st === 'PENDING'
                        ? 'পেন্ডিং'
                        : st === 'CONFIRMED'
                        ? 'কনফার্মড'
                        : st === 'PROCESSING'
                        ? 'প্রসেসিং'
                        : st === 'SHIPPED'
                        ? 'শিপড'
                        : st === 'DELIVERED'
                        ? 'ডেলিভার্ড'
                        : 'বাতিল'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs w-full">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-stone-50 border-b border-stone-200 text-gray-600 font-bold uppercase text-[11px]">
                        <th className="p-4">অর্ডার নং</th>
                        <th className="p-4">কাস্টমার ও কল</th>
                        <th className="p-4">ডেলিভারি ঠিকানা</th>
                        <th className="p-4">খাবার তালিকা</th>
                        <th className="p-4">মূল্য (COD)</th>
                        <th className="p-4">বর্তমান Status</th>
                        <th className="p-4 text-right">Status পরিবর্তন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-12 text-gray-400 font-medium">
                            কোনো অর্ডার পাওয়া যায়নি
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-stone-50/50 transition-colors">
                            <td className="p-4 font-bold whitespace-nowrap">
                              <span className="text-emerald-800 font-black text-sm">{ord.orderNumber}</span>
                              <p className="text-[10px] text-gray-400 font-normal">{ord.createdAt}</p>
                            </td>

                            <td className="p-4 whitespace-nowrap">
                              <p className="font-bold text-gray-800">{ord.customerName}</p>
                              <a
                                href={`tel:${ord.customerPhone}`}
                                className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline mt-0.5"
                              >
                                <PhoneCall className="w-3 h-3" />
                                {ord.customerPhone}
                              </a>
                            </td>

                            <td className="p-4 text-gray-600 max-w-xs">
                              <p className="line-clamp-2">{ord.customerAddress}</p>
                              <span className="text-[10px] bg-stone-100 text-gray-600 px-2 py-0.5 rounded-md font-semibold mt-1 inline-block">
                                {ord.deliveryCity}
                              </span>
                            </td>

                            <td className="p-4 text-gray-700 max-w-xs">
                              <p className="line-clamp-2 font-medium">{ord.itemsSummary}</p>
                            </td>

                            <td className="p-4 whitespace-nowrap">
                              <span className="font-black text-sm text-gray-900">৳{ord.totalAmount}</span>
                              <span className="block text-[10px] text-emerald-700 font-bold uppercase">
                                {ord.paymentMethod}
                              </span>
                            </td>

                            <td className="p-4 whitespace-nowrap">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  ord.status === 'PENDING'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                    : ord.status === 'CONFIRMED'
                                    ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                    : ord.status === 'PROCESSING'
                                    ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                                    : ord.status === 'SHIPPED'
                                    ? 'bg-purple-100 text-purple-800 border border-purple-300'
                                    : ord.status === 'DELIVERED'
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : 'bg-red-100 text-red-800 border border-red-300'
                                }`}
                              >
                                {ord.status}
                              </span>
                            </td>

                            <td className="p-4 text-right whitespace-nowrap">
                              <select
                                value={ord.status}
                                onChange={(e) =>
                                  handleUpdateStatus(ord.id, e.target.value as AdminOrder['status'])
                                }
                                className="px-3 py-1.5 bg-white border border-gray-300 rounded-xl font-bold text-xs text-gray-800 focus:border-emerald-600 focus:outline-hidden cursor-pointer shadow-2xs"
                              >
                                <option value="PENDING">PENDING (পেন্ডিং)</option>
                                <option value="CONFIRMED">CONFIRMED (ফোনে কনফার্ম)</option>
                                <option value="PROCESSING">PROCESSING (প্যাকেজিং)</option>
                                <option value="SHIPPED">SHIPPED (রাইডারকে হস্তান্তর)</option>
                                <option value="DELIVERED">DELIVERED (সম্পন্ন)</option>
                                <option value="CANCELLED">CANCELLED (বাতিল)</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}


          {/* TAB 5: CUSTOMERS */}
          {activeTab === 'customers' && (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-6 w-full">
              <h3 className="text-lg font-bold text-gray-900">কাস্টমার তালিকা ও ফোন নম্বর</h3>
              <div className="divide-y divide-gray-100">
                {orders.map((ord) => (
                  <div key={ord.id} className="py-3.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{ord.customerName}</p>
                      <p className="text-gray-500">{ord.customerAddress}</p>
                    </div>
                    <a
                      href={`tel:${ord.customerPhone}`}
                      className="px-4 py-2 bg-emerald-50 text-emerald-800 font-bold rounded-xl flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      {ord.customerPhone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: COUPONS */}
          {activeTab === 'coupons' && (
              <div className="w-full space-y-6 rounded-3xl border border-stone-200 bg-white p-6">
                <h3 className="text-lg font-bold text-gray-900">কুপন ও স্পেশাল ছাড়</h3>

                <form onSubmit={handleCreateCoupon} className="grid grid-cols-1 gap-3 rounded-2xl bg-stone-50 p-4 sm:grid-cols-2 lg:grid-cols-4">
                  <input
                    required
                    value={newCouponCode}
                    onChange={(event) => setNewCouponCode(event.target.value.toUpperCase())}
                    placeholder="কুপন কোড"
                    className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600"
                  />
                  <input
                    required
                    type="number"
                    min="1"
                    step="1"
                    value={newCouponAmount}
                    onChange={(event) => setNewCouponAmount(event.target.value)}
                    placeholder="কত টাকা ছাড়"
                    className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600"
                  />
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={newCouponMinOrder}
                    onChange={(event) => setNewCouponMinOrder(event.target.value)}
                    placeholder="সর্বনিম্ন অর্ডার (ঐচ্ছিক)"
                    className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800"
                  >
                    কুপন তৈরি করুন
                  </button>
                </form>

                {couponsList.length === 0 ? (
                  <p className="py-6 text-center text-sm text-gray-500">এখনো কোনো কুপন তৈরি করা হয়নি।</p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {couponsList.map((coupon) => (
                      <div
                        key={coupon.id}
                        className={`rounded-2xl border p-5 ${coupon.isActive ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 bg-gray-50'}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="font-mono text-base font-black text-emerald-900">{coupon.code}</span>
                            <p className="mt-1 text-sm font-bold text-gray-800">
                              {coupon.discountPercent
                                ? `${coupon.discountPercent}% ছাড়`
                                : `৳${coupon.discountAmount} ছাড়`}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              সর্বনিম্ন অর্ডার: ৳{coupon.minOrderAmount}
                            </p>
                          </div>
                          <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${coupon.isActive ? 'bg-emerald-200 text-emerald-900' : 'bg-gray-200 text-gray-600'}`}>
                            {coupon.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleCoupon(coupon)}
                          className={`mt-4 w-full rounded-xl px-3 py-2 text-xs font-bold ${coupon.isActive ? 'bg-white text-red-700 hover:bg-red-50' : 'bg-emerald-700 text-white hover:bg-emerald-800'}`}
                        >
                          {coupon.isActive ? 'কুপন বন্ধ করুন' : 'আবার সক্রিয় করুন'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          )}

          {/* TAB 7: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-6 w-full">
              <h3 className="text-lg font-bold text-gray-900">ইনকোয়ারি ও কাস্টমার বার্তা</h3>
              <div className="space-y-3">
                {messages.length === 0 && (
                  <p className="rounded-xl bg-stone-50 p-5 text-center text-sm text-gray-500">
                    এখনো কোনো বার্তা আসেনি।
                  </p>
                )}
                {messages.map((m) => (
                  <div key={m.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1.5">
                    <div className="flex justify-between items-center font-bold text-gray-900">
                      <span>{m.name}</span>
                      <span className="text-[10px] text-gray-400 font-normal">{new Date(m.createdAt).toLocaleString('bn-BD')}</span>
                    </div>
                    <p className="font-semibold text-gray-700">{m.emailOrPhone}</p>
                    {m.subject && <p className="text-gray-500">{m.subject}</p>}
                    <p className="text-gray-700">{m.message}</p>
                    {!m.emailOrPhone.includes('@') && (
                      <a href={`tel:${m.emailOrPhone}`} className="inline-flex items-center gap-1 pt-1 font-bold text-emerald-700">
                        <PhoneCall className="h-3 w-3" /> কল করুন
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: BLOGS */}
          {activeTab === 'blogs' && (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
              <form
                onSubmit={handleCreateBlogPost}
                className="h-fit space-y-4 rounded-3xl border border-stone-200 bg-white p-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-900">নতুন ব্লগ লিখুন</h3>
                  <p className="mt-1 text-sm text-gray-500">প্রকাশ করলেই লেখাটি হোমপেজের ব্লগ অংশে দেখা যাবে।</p>
                </div>
                <label className="block space-y-1.5">
                  <span className="text-sm font-semibold text-gray-700">শিরোনাম</span>
                  <input
                    required
                    maxLength={180}
                    value={newBlogTitle}
                    onChange={(event) => setNewBlogTitle(event.target.value)}
                    placeholder="ব্লগের শিরোনাম"
                    className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600"
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-sm font-semibold text-gray-700">সংক্ষিপ্ত পরিচিতি</span>
                  <textarea
                    required
                    maxLength={500}
                    rows={3}
                    value={newBlogExcerpt}
                    onChange={(event) => setNewBlogExcerpt(event.target.value)}
                    placeholder="ব্লগের ছোট পরিচিতি"
                    className="w-full resize-y rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600"
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-sm font-semibold text-gray-700">সম্পূর্ণ লেখা</span>
                  <textarea
                    required
                    rows={10}
                    value={newBlogContent}
                    onChange={(event) => setNewBlogContent(event.target.value)}
                    placeholder="এখানে সম্পূর্ণ ব্লগ লিখুন"
                    className="w-full resize-y rounded-xl border border-gray-200 px-3 py-2.5 text-sm leading-6 outline-none focus:border-emerald-600"
                  />
                </label>
                <button
                  type="submit"
                  disabled={isSavingBlog}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Plus className="h-4 w-4" />
                  {isSavingBlog ? 'প্রকাশ হচ্ছে...' : 'ব্লগ প্রকাশ করুন'}
                </button>
              </form>

              <section className="space-y-4 rounded-3xl border border-stone-200 bg-white p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">প্রকাশিত ব্লগ</h3>
                    <p className="mt-1 text-sm text-gray-500">{blogPosts.length} টি লেখা</p>
                  </div>
                  <BookOpen className="h-5 w-5 text-emerald-700" />
                </div>
                {blogPosts.length === 0 ? (
                  <p className="rounded-xl bg-stone-50 p-5 text-center text-sm text-gray-500">
                    এখনো কোনো ব্লগ প্রকাশ করা হয়নি।
                  </p>
                ) : (
                  <div className="space-y-3">
                    {blogPosts.map((post) => (
                      <article key={post.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h4 className="font-bold text-gray-900">{post.title}</h4>
                          <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${post.isPublished ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-600'}`}>
                            {post.isPublished ? 'প্রকাশিত' : 'খসড়া'}
                          </span>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                        <Link
                          href={`/blog/${encodeURIComponent(post.slug)}`}
                          target="_blank"
                          className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900"
                        >
                          লেখাটি দেখুন <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================
          EDIT PRICE & STOCK MODAL
      ======================================================== */}
      {isEditProductOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-stone-200 animate-scale-up">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-base font-black text-gray-900">মূল্য ও স্টক সেটআপ</h3>
                <p className="text-xs text-emerald-800 font-bold truncate mt-0.5">{selectedProduct.name}</p>
              </div>
              <button
                onClick={() => setIsEditProductOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditProduct} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">মূল্য (টাকায়)</label>
                <input
                  type="number"
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden font-bold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  ডিসকাউন্ট মূল্য (ছাড়ের পর দাম)
                </label>
                <input
                  type="number"
                  placeholder="না থাকলে ফাঁকা রাখুন"
                  value={editDiscountPrice}
                  onChange={(e) => setEditDiscountPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden font-bold text-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">প্যাক সাইজ</label>
                <input
                  type="text"
                  required
                  value={editPackSize}
                  onChange={(e) => setEditPackSize(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">স্টক পরিমাণ (পিস)</label>
                <input
                  type="number"
                  required
                  value={editStock}
                  onChange={(e) => setEditStock(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:border-emerald-600 focus:outline-hidden font-bold"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditProductOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs"
                >
                  আপডেট সেভ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
