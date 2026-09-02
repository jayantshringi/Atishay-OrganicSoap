// src/app/order-confirmation/page.jsx

'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ordersAPI } from '@/services/api';
import {
  CheckCircle2,
  Truck,
  Sparkles,
  Leaf,
  Calendar,
  ShieldCheck,
  Package,
  ArrowRight,
  MapPin,
  Clock
} from 'lucide-react';
import Spinner from '@/components/Spinner';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderSummary() {
      if (!orderId) {
        setLoading(false);
        return;
      }
      try {
        const res = await ordersAPI.getById(orderId);
        setOrder(res?.data);
      } catch (err) {
        console.error('Failed to load order summary:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrderSummary();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" text="Finalizing order confirmation..." />
      </div>
    );
  }

  const finalOrderId = order?.id || orderId || 'ord_sample101';
  const orderTotal = order?.price || 399;
  const deliveryDate = order?.deliveryDate
    ? new Date(order.deliveryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date(Date.now() + 4 * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="max-w-3xl mx-auto my-10 sm:my-16 px-4 space-y-8">
      {/* Top Success Badge Card */}
      <div className="bg-white rounded-extra p-8 sm:p-10 shadow-large border border-primary/15 text-center space-y-4">
        <div className="w-16 h-16 bg-status-success/15 text-status-success rounded-full flex items-center justify-center mx-auto border border-status-success/30 shadow-subtle animate-scale-in">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-secondary font-poppins font-bold uppercase tracking-wider text-xs bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Order Successfully Placed
        </span>

        <h1 className="text-2xl sm:text-4xl font-poppins font-extrabold text-charcoal">
          Thank You for Your Order!
        </h1>

        <p className="text-xs sm:text-sm text-charcoal-light font-inter max-w-md mx-auto leading-relaxed">
          Your bespoke Ayurvedic soap formulation has been scheduled for artisan small-batch handcrafting.
        </p>

        <div className="inline-block bg-cream px-4 py-2 rounded-xl border border-primary/15 font-mono text-xs font-bold text-primary">
          Order ID: #{finalOrderId.slice(0, 10)}
        </div>
      </div>

      {/* Order Summary & Delivery Timeline */}
      <div className="bg-white rounded-extra p-6 sm:p-8 border border-primary/15 shadow-subtle space-y-6">
        <h2 className="font-poppins font-bold text-lg text-charcoal flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          <span>Fulfillment &amp; Delivery Details</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-inter">
          <div className="bg-cream/50 p-4 rounded-xl border border-primary/10 space-y-1">
            <span className="text-[10px] text-charcoal-muted uppercase font-bold block">
              Payment Method
            </span>
            <span className="font-poppins font-bold text-primary">
              Cash on Delivery (₹{orderTotal})
            </span>
            <p className="text-[11px] text-charcoal-light font-inter">
              Pay in cash or UPI at your doorstep upon arrival.
            </p>
          </div>

          <div className="bg-cream/50 p-4 rounded-xl border border-primary/10 space-y-1">
            <span className="text-[10px] text-charcoal-muted uppercase font-bold block">
              Estimated Delivery
            </span>
            <span className="font-poppins font-bold text-charcoal flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-primary" />
              {deliveryDate}
            </span>
            <p className="text-[11px] text-charcoal-light font-inter">
              Pan-India Express courier dispatch.
            </p>
          </div>

          {order?.deliveryAddress && (
            <div className="sm:col-span-2 bg-cream/50 p-4 rounded-xl border border-primary/10 space-y-1">
              <span className="text-[10px] text-charcoal-muted uppercase font-bold block">
                Shipping Address
              </span>
              <p className="text-charcoal font-medium">
                {order.deliveryAddress}, {order.deliveryCity} ({order.deliveryPostalCode})
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-cream-dark">
          <Link
            href={`/orders/${finalOrderId}`}
            className="w-full sm:w-auto bg-primary text-cream px-6 py-3 rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition shadow-subtle flex items-center justify-center gap-2"
          >
            <Clock className="w-4 h-4" />
            <span>Track Live Order Status</span>
          </Link>

          <Link
            href="/products"
            className="w-full sm:w-auto bg-cream hover:bg-cream-dark text-charcoal px-6 py-3 rounded-large font-poppins font-bold text-xs transition border border-primary/15 flex items-center justify-center gap-2"
          >
            <span>Explore More Soaps</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <Spinner size="lg" text="Loading confirmation..." />
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
