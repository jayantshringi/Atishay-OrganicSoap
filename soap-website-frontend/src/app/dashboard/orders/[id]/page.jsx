// src/app/dashboard/orders/[id]/page.jsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ordersAPI } from '@/services/api';
import Link from 'next/link';

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

  if (loading) return <div className="text-center py-20 font-poppins font-bold text-primary">Loading order status...</div>;
  if (!order) return <div className="text-center py-20 font-poppins text-charcoal">Order not found.</div>;

  const statuses = [
    { status: 'confirmed', label: 'Order Confirmed', description: 'Recipe matched and payment authorized', icon: '✓' },
    { status: 'in-production', label: 'In Production', description: 'Handcrafting vegetable glycerine bar with organic extracts', icon: '🏭' },
    { status: 'shipped', label: 'Dispatched & Shipped', description: 'Handed over to local courier delivery partner', icon: '📦' },
    { status: 'delivered', label: 'Delivered', description: 'Safely arrived at your delivery address', icon: '🎉' },
  ];

  const currentStatusIndex = statuses.findIndex((s) => s.status === order.orderStatus);

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 space-y-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-primary font-poppins font-bold text-sm hover:underline"
      >
        ← Back to Orders Dashboard
      </Link>

      <div className="bg-white rounded-extra p-8 shadow-large border border-primary/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-poppins font-bold uppercase tracking-wider text-secondary">
            Order Fulfillment Tracking
          </span>
          <h1 className="text-3xl font-poppins font-bold text-charcoal mt-1">
            Order #{order.id.slice(0, 8)}
          </h1>
          <p className="text-sm text-charcoal-light font-inter mt-1">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-charcoal-light font-bold block uppercase">Total Paid</span>
          <span className="text-2xl font-poppins font-extrabold text-secondary">₹{order.price}</span>
        </div>
      </div>

      {/* Visual Timeline Stepper */}
      <div className="bg-white rounded-extra p-8 shadow-large border border-primary/15">
        <h2 className="text-xl font-poppins font-bold text-charcoal mb-8">Fulfillment Progress</h2>
        <div className="space-y-6">
          {statuses.map((item, index) => {
            const isCompleted = index <= (currentStatusIndex >= 0 ? currentStatusIndex : 0);
            const isCurrent = index === currentStatusIndex;

            return (
              <div key={item.status} className="flex items-start">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-large flex items-center justify-center text-lg font-bold transition-all ${
                      isCompleted
                        ? 'bg-primary text-cream shadow-subtle'
                        : 'bg-cream text-charcoal-light/50 border border-cream-dark'
                    }`}
                  >
                    {item.icon}
                  </div>
                  {index < statuses.length - 1 && (
                    <div
                      className={`w-1 h-10 my-1 rounded-full ${
                        index < currentStatusIndex ? 'bg-primary' : 'bg-cream-dark'
                      }`}
                    />
                  )}
                </div>
                <div className="ml-6 pt-1">
                  <h4 className={`font-poppins font-bold text-base ${isCurrent ? 'text-secondary-dark' : 'text-charcoal'}`}>
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
        <div className="bg-cream/70 rounded-extra p-6 border border-primary/15 space-y-4">
          <h3 className="text-lg font-poppins font-bold text-charcoal">Custom Recipe Formulation</h3>
          <div className="space-y-2.5 text-sm font-inter">
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

        <div className="bg-white rounded-extra p-6 border border-primary/15 shadow-subtle space-y-4">
          <h3 className="text-lg font-poppins font-bold text-charcoal">Shipping Information</h3>
          <div className="space-y-2 text-sm font-inter">
            <p className="text-charcoal leading-relaxed">
              <strong>Street Address:</strong> {order.deliveryAddress}<br />
              <strong>City:</strong> {order.deliveryCity} ({order.deliveryPostalCode})<br />
              <strong>Phone:</strong> {order.deliveryPhone}
            </p>
            <div className="bg-primary/10 p-3.5 rounded-large border border-primary/20 text-xs text-primary-darker font-medium mt-3">
              📅 Expected Doorstep Delivery: <strong>{new Date(order.deliveryDate).toLocaleDateString()}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
