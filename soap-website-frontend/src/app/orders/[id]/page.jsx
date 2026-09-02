// src/app/orders/[id]/page.jsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  Sparkles,
  Truck,
  Package,
  Clock,
  MapPin,
  Calendar,
  Leaf,
  ShieldCheck,
  Info,
  Star,
  MessageSquare
} from 'lucide-react';
import { ordersAPI } from '@/services/api';
import Spinner from '@/components/Spinner';

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      if (!orderId) return;
      setLoading(true);
      try {
        const response = await ordersAPI.getById(orderId);
        setOrder(response?.data);
      } catch (err) {
        console.error('Failed to fetch order details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" text="Loading order fulfillment tracking..." />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 text-center bg-white rounded-extra border border-primary/15 shadow-subtle space-y-3">
        <h3 className="font-poppins font-bold text-charcoal text-lg">Order Not Found</h3>
        <p className="text-xs text-charcoal-light font-inter">
          The requested order #{orderId} could not be located.
        </p>
        <Link href="/orders" className="text-primary font-poppins font-bold text-xs underline">
          Return to My Orders
        </Link>
      </div>
    );
  }

  const statuses = [
    {
      status: 'confirmed',
      label: 'Order Placed (COD)',
      description: 'Prescription matched & confirmed for preparation',
      icon: Check,
    },
    {
      status: 'in-production',
      label: 'Handcrafting Batch',
      description: 'Fresh-poured vegetable glycerine with organic botanical extracts',
      icon: Sparkles,
    },
    {
      status: 'shipped',
      label: 'Dispatched & Shipped',
      description: 'Handed over to express courier delivery partner',
      icon: Truck,
    },
    {
      status: 'delivered',
      label: 'Delivered',
      description: 'Safely arrived at your doorstep',
      icon: Package,
    },
  ];

  const currentStatusIndex = statuses.findIndex((s) => s.status === (order.orderStatus || 'confirmed'));
  const isDelivered = order.orderStatus === 'delivered';

  return (
    <div className="max-w-4xl mx-auto my-8 sm:my-12 px-4 space-y-8">
      {/* Back Button */}
      <Link
        href="/orders"
        className="inline-flex items-center gap-1.5 text-primary font-poppins font-bold text-xs hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Orders</span>
      </Link>

      {/* Top Order Card */}
      <div className="bg-white rounded-extra p-6 sm:p-8 shadow-large border border-primary/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-poppins font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Live Fulfillment Tracking
          </span>
          <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-charcoal mt-1">
            Order #{order.id.slice(0, 10)}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light font-inter mt-0.5">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            {order.trackingNumber && ` • Courier AWB: ${order.trackingNumber}`}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[10px] text-charcoal-muted font-bold block uppercase">Payable on Delivery</span>
          <span className="text-2xl font-poppins font-extrabold text-primary">₹{order.price}</span>
        </div>
      </div>

      {/* Review Eligibility Banner if Delivered */}
      {isDelivered && (
        <div className="bg-primary/10 border-2 border-primary/30 rounded-extra p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-poppins font-bold text-sm text-primary flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-secondary text-secondary" />
              <span>Your Soap has been Delivered! How is your skin feeling?</span>
            </h4>
            <p className="text-xs text-charcoal font-inter">
              You are now eligible to post a verified customer review for this artisan batch.
            </p>
          </div>
          <Link
            href="/products"
            className="bg-primary text-cream px-5 py-2 rounded-large text-xs font-poppins font-bold hover:bg-primary-hover transition shrink-0 flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Write Product Review</span>
          </Link>
        </div>
      )}

      {/* Stepper Progress */}
      <div className="bg-white rounded-extra p-6 sm:p-8 shadow-large border border-primary/15 space-y-6">
        <h2 className="text-lg font-poppins font-bold text-charcoal">Fulfillment Progression Timeline</h2>

        <div className="space-y-6 sm:space-y-8">
          {statuses.map((item, index) => {
            const isCompleted = index <= (currentStatusIndex >= 0 ? currentStatusIndex : 0);
            const isCurrent = index === currentStatusIndex;
            const IconComp = item.icon;

            return (
              <div key={item.status} className="flex items-start">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-large flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-primary text-cream shadow-subtle'
                        : 'bg-cream text-charcoal-muted border border-cream-dark'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  {index < statuses.length - 1 && (
                    <div
                      className={`w-1 h-8 sm:h-10 my-1 rounded-full ${
                        index < currentStatusIndex ? 'bg-primary' : 'bg-cream-dark'
                      }`}
                    />
                  )}
                </div>
                <div className="ml-5 pt-0.5">
                  <h4
                    className={`font-poppins font-bold text-sm sm:text-base ${
                      isCurrent ? 'text-secondary-dark font-extrabold' : isCompleted ? 'text-charcoal' : 'text-charcoal-muted'
                    }`}
                  >
                    {item.label}
                  </h4>
                  <p className="text-xs text-charcoal-light font-inter mt-0.5">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recipe & Delivery Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Custom Recipe Card */}
        <div className="bg-cream/60 rounded-extra p-6 border border-primary/15 space-y-4">
          <h3 className="text-base font-poppins font-bold text-charcoal flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-primary" />
            <span>Prescribed Organic Formulation</span>
          </h3>

          <div className="space-y-2.5 text-xs sm:text-sm font-inter">
            <div className="flex justify-between border-b border-cream-dark pb-2">
              <span className="text-charcoal-light">Recipe Name</span>
              <span className="font-bold text-charcoal capitalize">
                {order.recipe?.name || order.items?.[0]?.name || 'Custom Organic Herbal Blend'}
              </span>
            </div>
            <div className="flex justify-between border-b border-cream-dark pb-2">
              <span className="text-charcoal-light">Skin Profile Focus</span>
              <span className="font-bold text-charcoal capitalize">{order.skinType || 'Hydration & Balance'}</span>
            </div>
            <div className="flex justify-between border-b border-cream-dark pb-2">
              <span className="text-charcoal-light">Payment Method</span>
              <span className="font-bold text-secondary-dark">Cash on Delivery (COD)</span>
            </div>
          </div>
        </div>

        {/* Shipping Information Card */}
        <div className="bg-white rounded-extra p-6 border border-primary/15 shadow-subtle space-y-4">
          <h3 className="text-base font-poppins font-bold text-charcoal flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Delivery Destination</span>
          </h3>

          <div className="space-y-2 text-xs sm:text-sm font-inter">
            <p className="text-charcoal leading-relaxed">
              <strong>Address:</strong> {order.deliveryAddress}<br />
              <strong>City &amp; Pincode:</strong> {order.deliveryCity} ({order.deliveryPostalCode})<br />
              <strong>Recipient Phone:</strong> {order.deliveryPhone}
            </p>
            <div className="bg-primary/10 p-3 rounded-large border border-primary/20 text-xs text-primary-dark font-medium flex items-center gap-2 mt-2">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <span>Estimated Doorstep Delivery: <strong>{new Date(order.deliveryDate || Date.now() + 4 * 86400000).toLocaleDateString()}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Artisan Soap Care Tips */}
      <div className="bg-white rounded-extra p-6 border border-primary/15 shadow-subtle flex items-start gap-3.5">
        <Info className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs font-inter">
          <h4 className="font-poppins font-bold text-charcoal text-sm">
            Artisan Soap Longevity Guidance
          </h4>
          <p className="text-charcoal-light leading-relaxed">
            Because our soaps are formulated with pure vegetable glycerine and zero artificial chemical hardeners, please store your bar on a well-drained wooden soap dish away from direct shower spray to maximize its lifespan.
          </p>
        </div>
      </div>
    </div>
  );
}
