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
  if (!order) return <div className="text-center py-20 font-poppins text-primary">Order not found.</div>;

  const statuses = [
    { status: 'confirmed', label: 'Order Confirmed', description: 'Recipe matched and payment authorized', icon: '✓' },
    { status: 'in-production', label: 'In Production', description: 'Handcrafting melt-and-pour glycerine bar', icon: '🏭' },
    { status: 'shipped', label: 'Dispatched & Shipped', description: 'Handed over to local courier partner', icon: '📦' },
    { status: 'delivered', label: 'Delivered', description: 'Safely arrived at your delivery address', icon: '🎉' },
  ];

  const currentStatusIndex = statuses.findIndex((s) => s.status === order.orderStatus);

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 space-y-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-primary font-poppins font-bold text-sm hover:underline"
      >
        ← Back to Dashboard
      </Link>

      <div className="bg-white rounded-3xl p-8 shadow-xl border border-amber-900/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-poppins font-bold uppercase tracking-wider text-accent">Order Tracking</span>
          <h1 className="text-3xl font-poppins font-bold text-primary mt-1">
            Order #{order.id.slice(0, 8)}
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Placed on {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-text-muted font-bold block uppercase">Total Paid</span>
          <span className="text-2xl font-poppins font-extrabold text-accent">₹{order.price}</span>
        </div>
      </div>

      {/* Visual Timeline Stepper */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-amber-900/10">
        <h2 className="text-xl font-poppins font-bold text-primary mb-8">Fulfillment Progress</h2>
        <div className="space-y-6">
          {statuses.map((item, index) => {
            const isCompleted = index <= (currentStatusIndex >= 0 ? currentStatusIndex : 0);
            const isCurrent = index === currentStatusIndex;

            return (
              <div key={item.status} className="flex items-start">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold transition-all ${
                      isCompleted
                        ? 'bg-accent text-white shadow-md'
                        : 'bg-neutral text-gray-400 border border-gray-200'
                    }`}
                  >
                    {item.icon}
                  </div>
                  {index < statuses.length - 1 && (
                    <div
                      className={`w-1 h-10 my-1 rounded-full ${
                        index < currentStatusIndex ? 'bg-accent' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
                <div className="ml-6 pt-1">
                  <h4 className={`font-poppins font-bold text-base ${isCurrent ? 'text-accent' : 'text-primary'}`}>
                    {item.label}
                  </h4>
                  <p className="text-xs text-text-muted mt-0.5">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recipe & Delivery Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral/50 rounded-3xl p-6 border border-amber-900/10 space-y-4">
          <h3 className="text-lg font-poppins font-bold text-primary">Custom Recipe Formulation</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-amber-900/5 pb-2">
              <span className="text-text-muted">Skin Profile</span>
              <span className="font-bold text-primary capitalize">{order.skinType}</span>
            </div>
            <div className="flex justify-between border-b border-amber-900/5 pb-2">
              <span className="text-text-muted">Target Concern</span>
              <span className="font-bold text-primary capitalize">{order.mainConcern}</span>
            </div>
            <div className="flex justify-between border-b border-amber-900/5 pb-2">
              <span className="text-text-muted">Bar Texture</span>
              <span className="font-bold text-primary capitalize">{order.texturePreference}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-text-muted">Recipe Name</span>
              <span className="font-bold text-primary">{order.recipe?.name || 'Custom Organic Blend'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-sm space-y-4">
          <h3 className="text-lg font-poppins font-bold text-primary">Shipping Information</h3>
          <div className="space-y-2 text-sm">
            <p className="text-text leading-relaxed">
              <strong>Street Address:</strong> {order.deliveryAddress}<br />
              <strong>City:</strong> {order.deliveryCity} ({order.deliveryPostalCode})<br />
              <strong>Phone:</strong> {order.deliveryPhone}
            </p>
            <div className="bg-secondary/20 p-3.5 rounded-xl border border-secondary/30 text-xs text-primary font-medium mt-3">
              📅 Expected Delivery: <strong>{new Date(order.deliveryDate).toLocaleDateString()}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
