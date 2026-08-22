// src/app/dashboard/page.jsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ordersAPI, questionnaireAPI } from '@/services/api';
import { useQuestionnaireStore } from '@/store/questionnaireStore';
import Toast from '@/components/Toast';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const store = useQuestionnaireStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reorderingId, setReorderingId] = useState(null);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetchOrders();
  }, [router]);

  const fetchOrders = async () => {
    try {
      const response = await ordersAPI.getAll();
      setOrders(response.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (order) => {
    setReorderingId(order.id);
    try {
      store.updateAnswer('skinType', order.skinType);
      store.updateAnswer('mainConcern', order.mainConcern);
      store.updateAnswer('texturePreference', order.texturePreference);
      store.updateAnswer('deliveryAddress', order.deliveryAddress);
      store.updateAnswer('deliveryCity', order.deliveryCity);
      store.updateAnswer('deliveryPostalCode', order.deliveryPostalCode);
      store.updateAnswer('deliveryPhone', order.deliveryPhone);

      const res = await questionnaireAPI.submit({
        skinType: order.skinType,
        mainConcern: order.mainConcern,
        texturePreference: order.texturePreference,
        deliveryAddress: order.deliveryAddress,
        deliveryCity: order.deliveryCity,
        deliveryPostalCode: order.deliveryPostalCode,
        deliveryPhone: order.deliveryPhone,
      });

      const newOrderId = res.data.orderId;
      setToast({ message: 'Custom formula duplicated! Proceeding to checkout.', type: 'success' });
      setTimeout(() => {
        router.push(`/order-confirmation?orderId=${newOrderId}`);
      }, 1000);
    } catch (err) {
      setToast({ message: 'Failed to create re-order. Please try questionnaire.', type: 'error' });
    } finally {
      setReorderingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      pending: { label: 'Pending Payment', style: 'bg-gray-100 text-gray-800 border-gray-300' },
      confirmed: { label: 'Order Confirmed', style: 'bg-blue-50 text-blue-800 border-blue-200' },
      'in-production': { label: '🏭 In Production', style: 'bg-amber-50 text-amber-800 border-amber-200' },
      shipped: { label: '🚚 Shipped', style: 'bg-purple-50 text-purple-800 border-purple-200' },
      delivered: { label: '🎉 Delivered', style: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    };
    const current = config[status] || config.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${current.style}`}>
        {current.label}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto my-8 sm:my-12 px-4 sm:px-6 space-y-6 sm:space-y-8">
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'info' })}
        />
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-primary">
            Customer Dashboard
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Manage your custom soap formulations &amp; track active deliveries
          </p>
        </div>
        <Link
          href="/questionnaire"
          className="w-full sm:w-auto text-center bg-accent text-white px-5 sm:px-6 py-3 rounded-xl font-poppins font-bold text-sm hover:bg-accent-hover transition-all shadow-md"
        >
          + Order New Custom Soap
        </Link>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white border border-amber-900/10 rounded-2xl p-5 sm:p-6 shadow-sm animate-pulse space-y-4"
            >
              <div className="h-5 bg-gray-200 rounded w-1/3" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="h-10 bg-gray-100 rounded" />
                <div className="h-10 bg-gray-100 rounded" />
                <div className="h-10 bg-gray-100 rounded" />
                <div className="h-10 bg-gray-100 rounded" />
              </div>
              <div className="h-9 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 sm:py-20 bg-white rounded-3xl border border-amber-900/10 shadow-sm px-6">
          <span className="text-5xl">🧼</span>
          <h3 className="text-xl font-poppins font-bold text-primary mt-4">
            No Custom Soap Orders Yet
          </h3>
          <p className="text-sm text-text-muted max-w-md mx-auto mt-2 mb-6">
            Take our 2-minute skin quiz to receive your tailor-made organic recipe.
          </p>
          <Link
            href="/questionnaire"
            className="bg-accent text-white px-6 py-3.5 rounded-xl font-poppins font-bold hover:bg-accent-hover transition inline-block shadow-md text-sm"
          >
            Create Your Custom Soap →
          </Link>
        </div>
      ) : (
        /* Orders List */
        <div className="grid gap-5 sm:gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-amber-900/10 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-4 mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-poppins font-bold text-primary">
                    Order #{order.id.slice(0, 8)}
                  </h3>
                  <p className="text-xs text-text-muted">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {getStatusBadge(order.orderStatus)}
              </div>

              {/* Order Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6 text-sm">
                <div>
                  <span className="text-xs text-text-muted font-bold block uppercase mb-0.5">
                    Skin Type
                  </span>
                  <span className="font-bold text-primary capitalize">{order.skinType}</span>
                </div>
                <div>
                  <span className="text-xs text-text-muted font-bold block uppercase mb-0.5">
                    Main Concern
                  </span>
                  <span className="font-bold text-primary capitalize">{order.mainConcern}</span>
                </div>
                <div>
                  <span className="text-xs text-text-muted font-bold block uppercase mb-0.5">
                    Price
                  </span>
                  <span className="font-bold text-accent">₹{order.price}</span>
                </div>
                <div>
                  <span className="text-xs text-text-muted font-bold block uppercase mb-0.5">
                    Est. Delivery
                  </span>
                  <span className="font-bold text-primary">
                    {new Date(order.deliveryDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Order Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-t border-gray-100 pt-4">
                <span className="text-xs text-text-muted">
                  {order.recipe?.name ? `Formula: ${order.recipe.name}` : 'Custom Handcrafted Formula'}
                </span>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleReorder(order)}
                    disabled={reorderingId === order.id}
                    className="flex-1 sm:flex-none bg-neutral hover:bg-neutral-dark text-primary border border-amber-900/10 px-3 sm:px-4 py-2.5 rounded-xl font-poppins font-bold text-xs transition shadow-sm disabled:opacity-50 whitespace-nowrap"
                  >
                    🔄 {reorderingId === order.id ? 'Duplicating...' : 'Re-order Formula'}
                  </button>
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="flex-1 sm:flex-none bg-primary text-white text-center px-4 sm:px-5 py-2.5 rounded-xl font-poppins font-bold text-xs hover:bg-primary-dark transition shadow-sm whitespace-nowrap"
                  >
                    Track Order →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
