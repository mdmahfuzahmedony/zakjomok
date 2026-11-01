import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, Product, Category } from '../data/initialProducts';

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  isPublished?: boolean;
  createdAt: string;
}

export async function fetchBlogs(): Promise<BlogPostSummary[]> {
  const res = await fetch(`${API_BASE}/api/blogs`, { cache: 'no-store' });
  const data = await res.json();
  if (!res.ok || !data.success || !Array.isArray(data.data)) {
    throw new Error(data.message || 'Blog posts could not be loaded');
  }
  return data.data;
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE}/api/categories`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        return data.data;
      }
    }
  } catch (error) {
    // Graceful fallback to initial categories
  }
  return INITIAL_CATEGORIES;
}

export async function fetchProducts(categorySlug?: string, featuredOnly?: boolean): Promise<Product[]> {
  try {
    let url = `${API_BASE}/api/products?`;
    if (categorySlug) url += `category=${categorySlug}&`;
    if (featuredOnly) url += `featured=true&`;

    const res = await fetch(url, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        return data.data.map((p: any) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          description: p.description || '',
          price: p.price,
          discountPrice: p.discountPrice,
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
      }
    }
  } catch (error) {
    // Graceful fallback
  }

  let products = [...INITIAL_PRODUCTS];
  if (categorySlug) {
    products = products.filter((p) => p.categorySlug === categorySlug);
  }
  if (featuredOnly) {
    products = products.filter((p) => p.isFeatured);
  }
  return products;
}

export async function placeOrder(orderData: {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  deliveryCity: string;
  note?: string;
  couponCode?: string;
  userId?: string;
  items: { productId: string; quantity: number }[];
}) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'অর্ডার জমা দেওয়া যায়নি। আবার চেষ্টা করুন।');
  }

  return data;
}

export async function validateCoupon(code: string, subtotal: number, userId?: string) {
  const res = await fetch(`${API_BASE}/api/coupons/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, subtotal, userId }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'কুপন যাচাই করা যায়নি।');
  }

  return data;
}

export async function fetchActiveCoupons() {
  const res = await fetch(`${API_BASE}/api/coupons/active`, { cache: 'no-store' });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'কুপন লোড করা যায়নি।');
  }
  return data;
}
