// src/context/CartContext.jsx

'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { couponsAPI } from '@/services/api';

const CartContext = createContext({
  cart: { items: [] },
  itemCount: 0,
  subtotal: 0,
  shipping: 0,
  discount: 0,
  coupon: null,
  total: 0,
  addToCart: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  applyCoupon: async () => {},
  removeCoupon: () => {},
  refreshCart: () => {}
});

const CART_STORAGE_KEY = 'atishay_cart_v1';
const COUPON_STORAGE_KEY = 'atishay_coupon_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load initial cart and coupon from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed)) setItems(parsed);
        } else {
          // Default initial demo cart item for instant gratification
          setItems([
            {
              id: 'prod_hydration_01',
              slug: 'aloe-vera-shea-hydration-bar',
              name: 'Aloe Vera & Shea Intense Hydration Bar',
              price: 399,
              compareAtPrice: 499,
              quantity: 1,
              image: '/images/products/aloe-vera.jpg',
              category: 'hydration'
            }
          ]);
        }

        const savedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
        if (savedCoupon) {
          setCoupon(JSON.parse(savedCoupon));
        }
      } catch (e) {
        console.error('Failed to parse cart storage:', e);
      }
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      if (coupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    }
  }, [coupon, isLoaded]);

  // Derived calculations
  const itemCount = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = items.reduce((sum, item) => sum + ((Number(item.price) || 399) * (item.quantity || 1)), 0);
  const shipping = items.length === 0 ? 0 : (subtotal >= 499 ? 0 : 49);

  let discount = 0;
  if (coupon && subtotal > 0) {
    if (coupon.discountPercent) {
      discount = Math.round((subtotal * coupon.discountPercent) / 100);
    } else if (coupon.discountAmount) {
      discount = Math.min(subtotal, coupon.discountAmount);
    }
  }

  const total = Math.max(0, subtotal + shipping - discount);

  const addToCart = (product, quantity = 1, options = {}) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && JSON.stringify(item.options || {}) === JSON.stringify(options || {})
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id || `item_${Date.now()}`,
            slug: product.slug || 'custom-soap',
            name: product.name || 'Organic Artisan Soap',
            price: Number(product.price) || 399,
            compareAtPrice: product.compareAtPrice || null,
            image: product.image || '/images/products/aloe-vera.jpg',
            category: product.category || 'botanical',
            quantity: Math.max(1, quantity),
            options
          }
        ];
      }
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeItem = (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  };

  const applyCoupon = async (code) => {
    if (!code || !code.trim()) {
      throw new Error('Please enter a coupon code');
    }

    try {
      const res = await couponsAPI.validate(code, subtotal);
      if (res?.data?.valid) {
        setCoupon({
          code: res.data.code,
          discountPercent: res.data.discountPercent,
          discountAmount: res.data.discountAmount,
          description: res.data.description
        });
        return res.data;
      } else {
        throw new Error(res?.data?.error || 'Invalid coupon code');
      }
    } catch (err) {
      // Offline fallback for WELCOME10
      const upper = code.trim().toUpperCase();
      if (upper === 'WELCOME10') {
        const disc = Math.round((subtotal * 10) / 100);
        const fallbackCoupon = {
          code: 'WELCOME10',
          discountPercent: 10,
          discountAmount: disc,
          description: '10% Welcome Discount applied!'
        };
        setCoupon(fallbackCoupon);
        return { valid: true, ...fallbackCoupon };
      }
      throw new Error(err.response?.data?.error || err.message || 'Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart: { items },
        items,
        itemCount,
        subtotal,
        shipping,
        discount,
        coupon,
        total,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        removeCoupon,
        refreshCart: () => {}
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
