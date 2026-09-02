// src/app/orders/page.jsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Package,
  Sparkles,
  Truck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShoppingBag,
  Leaf
} from 'lucide-react';
import { ordersAPI } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import Spinner from '@/components/Spinner';
import EmptyState from '@/components/EmptyState';

export default function OrdersPage() {
  const router = useRouter();
  const { user, isLoggedIn, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await ordersAPI.getMyOrders();
        setOrders(res?.data || []);
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    const s = (status || 'confirmed').toLowerCase();
    if (s === 'delivered') {
      return (
        <span className="inline-flex items-center gap-1 bg-status-success/15 text-status-success border border-status-success/30 px-2.5 py-1 rounded-full text-[11px] font-poppins font-bold">
          <CheckCircle2 className="w-3 h-3" />
          <span>Delivered</span>
        </span>
      );
    } else if (s === 'shipped') {
      return (
        <span className="inline-flex items-center gap-1 bg-secondary/20 text-secondary-dark border border-secondary/30 px-2.5 py-1 rounded-full text-[11px] font-poppins font-bold">
          <Truck className="w-3 h-3" />
          <span>Dispatched &amp; Shipped</span>
        </span>
      );
    } else if (s === 'in-production') {
      return (
        <span className="inline-flex items-center gap-1 bg-primary/15 text-primary border border-primary/25 px-2.5 py-1 rounded-full text-[11px] font-poppins font-bold">
          <Sparkles className="w-3 h-3" />
          <span>Handcrafting in Studio</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 bg-cream-dark text-charcoal border border-cream-dark px-2.5 py-1 rounded-full text-[11px] font-poppins font-bold">
        <Clock className="w-3 h-3" />
        <span>Order Placed (COD)</span>
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-dark pb-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-poppins font-extrabold text-charcoal">
            My Order History &amp; Tracking
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light font-inter mt-1">
            Track real-time artisan batch formulation, dispatch timelines, and past custom soap deliveries.
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-primary text-cream px-5 py-2.5 rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition shadow-subtle"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Shop New Soap</span>
        </Link>
      </div>

      {loading ? (
        <Spinner size="lg" text="Loading your orders..." />
      ) : orders.length === 0 ? (
        <EmptyState
          icon={Package}
          title="No Orders Yet"
          description="You have not placed any organic soap orders yet. Take our diagnostic quiz to formulate your first tailored batch."
          actionText="Start Skin Quiz"
          actionHref="/quiz"
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-extra p-6 border border-primary/15 shadow-subtle hover:shadow-medium transition-all space-y-4"
            >
              {/* Order Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cream-dark pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-poppins font-bold text-sm sm:text-base text-charcoal">
                      Order #{order.id.slice(0, 10)}
                    </span>
                    {getStatusBadge(order.orderStatus)}
                  </div>
                  <p className="text-[11px] text-charcoal-light font-inter">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {order.trackingNumber && ` • AWB: ${order.trackingNumber}`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-charcoal-muted uppercase font-bold block">Total Amount</span>
                    <span className="font-poppins font-extrabold text-base text-primary">₹{order.price || 399}</span>
                  </div>

                  <Link
                    href={`/orders/${order.id}`}
                    className="inline-flex items-center gap-1.5 bg-cream hover:bg-primary hover:text-cream text-charcoal px-4 py-2 rounded-large text-xs font-poppins font-bold transition border border-primary/15"
                  >
                    <span>Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Items in this order */}
              <div className="text-xs font-inter text-charcoal space-y-1.5">
                <p className="font-poppins font-semibold text-charcoal-light text-[11px] uppercase tracking-wider">
                  Prescribed Formulation:
                </p>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-bold">
                    {order.recipe?.name || order.items?.[0]?.name || 'Custom Organic Herbal Blend'}
                  </span>
                </div>
                <p className="text-charcoal-light text-[11px]">
                  Shipping to: {order.deliveryAddress}, {order.deliveryCity}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
