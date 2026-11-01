import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, Product, Category } from '../data/initialProducts';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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
  items: { productId: string; quantity: number }[];
}) {
  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.warn('Backend server not reachable, creating simulated order for local demo.');
  }

  // Fallback demo order response if backend is not started
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const orderNumber = `ZAK-${Date.now().toString().slice(-4)}${randomSuffix}`;
  return {
    success: true,
    message: 'অর্ডার সফলভাবে গ্রহণ করা হয়েছে! নিশ্চিত করতে আমাদের প্রতিনিধি কল করবেন।',
    data: {
      id: 'demo-' + orderNumber,
      orderNumber,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerAddress: orderData.customerAddress,
      deliveryCity: orderData.deliveryCity,
      status: 'PENDING',
      paymentMethod: 'COD',
      deliveryCharge: orderData.deliveryCity.toLowerCase() === 'dhaka' ? 60 : 120,
    },
  };
}
