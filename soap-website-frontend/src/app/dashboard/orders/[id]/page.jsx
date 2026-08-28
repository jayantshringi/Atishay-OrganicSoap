// src/app/dashboard/orders/[id]/page.jsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ordersAPI } from '@/services/api';
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
} from 'lucide-react';

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    if (orderId) {
      fetchOrder();
    }
  }, [orderId, router]);

  const fetchOrder = async () => {
    try {
      const response = await ordersAPI.getById(orderId);
      setOrder(response.data);
    } catch (err) {
      console.error('Failed to fetch order details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 text-center bg-white rounded-extra border border-primary/15 shadow-subtle space-y-3">
        <Sparkles className="w-8 h-8 text-primary mx-auto animate-spin" />
        <h3 className="font-poppins font-bold text-charcoal text-lg">Loading Order Tracking...</h3>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 text-center bg-white rounded-extra border border-primary/15 shadow-subtle space-y-3">
        <h3 className="font-poppins font-bold text-charcoal text-lg">Order Not Found</h3>
        <Link href="/dashboard" className="text-primary font-poppins font-bold text-xs underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const statuses = [
    {
      status: 'confirmed',
      label: 'Order Confirmed',
      description: 'Recipe matched & payment verified',
      icon: Check,
    },
    {
      status: 'in-production',
      label: 'Handcrafting Bar',
      description: 'Fresh-poured vegetable glycerine with organic extracts',
      icon: Sparkles,
    },
    {
      status: 'shipped',
      label: 'Dispatched & Shipped',
      description: 'Handed over to courier express partner',
      icon: Truck,
    },
    {
      status: 'delivered',
      label: 'Delivered',
      description: 'Safely arrived at your delivery address',
      icon: Package,
    },
  ];

  const currentStatusIndex = statuses.findIndex((s) => s.status === order.orderStatus);

  return (
    <div className="max-w-4xl mx-auto my-8 sm:my-12 px-4 space-y-8">
      {/* Back Button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-primary font-poppins font-bold text-xs hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Orders Dashboard</span>
      </Link>

      {/* Top Order Card */}
      <div className="bg-white rounded-extra p-6 sm:p-8 shadow-large border border-primary/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-poppins font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Order Fulfillment Tracking
          </span>
          <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-charcoal mt-1">
            Order #{order.id.slice(0, 8)}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light font-inter mt-0.5">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[10px] text-charcoal-muted font-bold block uppercase">Total Paid</span>
          <span className="text-2xl font-poppins font-extrabold text-secondary">₹{order.price}</span>
        </div>
      </div>

      {/* Stepper Progress */}
      <div className="bg-white rounded-extra p-6 sm:p-8 shadow-large border border-primary/15 space-y-6">
        <h2 className="text-lg font-poppins font-bold text-charcoal">Fulfillment Timeline</h2>

        {/* Vertical/Horizontal Adaptive Stepper */}
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
                      isCurrent ? 'text-secondary-dark' : isCompleted ? 'text-charcoal' : 'text-charcoal-muted'
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
            <span>Prescribed Formulation</span>
          </h3>

          <div className="space-y-2.5 text-xs sm:text-sm font-inter">
            <div className="flex justify-between border-b border-cream-dark pb-2">
              <span className="text-charcoal-light">Skin Profile</span>
              <span className="font-bold text-charcoal capitalize">{order.skinType}</span>
            </div>
            <div className="flex justify-between border-b border-cream-dark pb-2">
              <span className="text-charcoal-light">Target Concern</span>
              <span className="font-bold text-charcoal capitalize">{order.mainConcern}</span>
            </div>
            <div className="flex justify-between border-b border-cream-dark pb-2">
              <span className="text-charcoal-light">Bar Texture</span>
              <span className="font-bold text-charcoal capitalize">{order.texturePreference}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-charcoal-light">Prescribed Recipe</span>
              <span className="font-bold text-primary">{order.recipe?.name || 'Custom Organic Blend'}</span>
            </div>
          </div>
        </div>

        {/* Shipping Information Card */}
        <div className="bg-white rounded-extra p-6 border border-primary/15 shadow-subtle space-y-4">
          <h3 className="text-base font-poppins font-bold text-charcoal flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Shipping &amp; Delivery</span>
          </h3>

          <div className="space-y-2 text-xs sm:text-sm font-inter">
            <p className="text-charcoal leading-relaxed">
              <strong>Street Address:</strong> {order.deliveryAddress}<br />
              <strong>City:</strong> {order.deliveryCity} ({order.deliveryPostalCode})<br />
              <strong>Phone:</strong> {order.deliveryPhone}
            </p>
            <div className="bg-primary/10 p-3 rounded-large border border-primary/20 text-xs text-primary-darker font-medium flex items-center gap-2 mt-2">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <span>Expected Delivery: <strong>{new Date(order.deliveryDate).toLocaleDateString()}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Soap Care Tips Card */}
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
