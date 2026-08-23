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
  const [filter, setFilter] = useState('all');
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
      pending: { label: 'Pending Payment', style: 'bg-cream-dark text-charcoal border-charcoal/20' },
      confirmed: { label: '✓ Confirmed', style: 'bg-primary/10 text-primary-darker border-primary/30' },
      'in-production': { label: '🏭 In Production', style: 'bg-secondary/20 text-charcoal border-secondary/40' },
      shipped: { label: '🚚 Shipped', style: 'bg-accent/15 text-accent-dark border-accent/30' },
      delivered: { label: '🎉 Delivered', style: 'bg-status-success/15 text-primary-darker border-status-success/30' },
    };
    const current = config[status] || config.pending;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-poppins font-bold border ${current.style}`}>
        {current.label}
      </span>
    );
  };

  const filteredOrders = orders.filter((o) => {
    if (filter === 'all') return true;
    return o.orderStatus === filter;
  });

  return (
    <div className="max-w-6xl mx-auto my-8 sm:my-12 px-4 sm:px-6 space-y-8">
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
          <span className="text-xs font-poppins font-bold uppercase tracking-wider text-secondary">
            Personal Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-charcoal mt-0.5">
            Your Orders &amp; Formulations
          </h1>
          <p className="text-sm text-charcoal-light font-inter mt-1">
            Manage your bespoke organic recipes &amp; track active deliveries
          </p>
        </div>
        <Link
          href="/questionnaire"
          className="w-full sm:w-auto text-center bg-primary text-cream px-6 py-3.5 rounded-large font-poppins font-bold text-sm hover:bg-primary-dark transition-all shadow-medium"
        >
          + Create New Custom Formula
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-primary/10 pb-3">
        {[
          { key: 'all', label: 'All Orders' },
          { key: 'confirmed', label: 'Confirmed' },
          { key: 'in-production', label: 'In Production' },
          { key: 'shipped', label: 'Shipped' },
          { key: 'delivered', label: 'Delivered' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-large text-xs font-poppins font-bold transition ${
              filter === tab.key
                ? 'bg-primary text-cream shadow-subtle'
                : 'bg-white text-charcoal hover:bg-cream border border-primary/15'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white border border-primary/15 rounded-extra p-6 shadow-subtle animate-pulse space-y-4"
            >
              <div className="h-5 bg-cream-dark rounded w-1/3" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="h-10 bg-cream rounded" />
                <div className="h-10 bg-cream rounded" />
                <div className="h-10 bg-cream rounded" />
                <div className="h-10 bg-cream rounded" />
              </div>
              <div className="h-9 bg-cream rounded" />
            </div>
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 sm:py-20 bg-white rounded-extra border border-primary/15 shadow-subtle px-6 space-y-4">
          <span className="text-5xl">🌿</span>
          <h3 className="text-xl font-poppins font-bold text-charcoal">
            No Custom Formulations Found
          </h3>
          <p className="text-sm text-charcoal-light font-inter max-w-md mx-auto">
            Take our 2-minute diagnostic questionnaire to receive your tailor-made organic recipe.
          </p>
          <Link
            href="/questionnaire"
            className="bg-primary text-cream px-7 py-3.5 rounded-large font-poppins font-bold hover:bg-primary-dark transition inline-block shadow-medium text-sm"
          >
            Create Your Custom Soap →
          </Link>
        </div>
      ) : (
        /* Orders List */
        <div className="grid gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-primary/15 rounded-extra p-6 shadow-subtle hover:shadow-medium transition-all"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-cream-dark pb-4 mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-poppins font-bold text-charcoal">
                    Order #{order.id.slice(0, 8)}
                  </h3>
                  <p className="text-xs text-charcoal-light font-inter">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {getStatusBadge(order.orderStatus)}
              </div>

              {/* Order Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-sm font-inter">
                <div>
                  <span className="text-xs text-charcoal-light font-bold block uppercase mb-0.5">
                    Skin Profile
                  </span>
                  <span className="font-bold text-charcoal capitalize">{order.skinType}</span>
                </div>
                <div>
                  <span className="text-xs text-charcoal-light font-bold block uppercase mb-0.5">
                    Target Concern
                  </span>
                  <span className="font-bold text-charcoal capitalize">{order.mainConcern}</span>
                </div>
                <div>
                  <span className="text-xs text-charcoal-light font-bold block uppercase mb-0.5">
                    Price
                  </span>
                  <span className="font-bold text-secondary text-base">₹{order.price}</span>
                </div>
                <div>
                  <span className="text-xs text-charcoal-light font-bold block uppercase mb-0.5">
                    Est. Delivery
                  </span>
                  <span className="font-bold text-primary">
                    {new Date(order.deliveryDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Order Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-t border-cream-dark pt-4">
                <span className="text-xs text-charcoal-light font-inter">
                  {order.recipe?.name ? `Formula: ${order.recipe.name}` : 'Custom Handcrafted Organic Recipe'}
                </span>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleReorder(order)}
                    disabled={reorderingId === order.id}
                    className="flex-1 sm:flex-none bg-cream hover:bg-cream-dark text-charcoal border border-primary/20 px-4 py-2.5 rounded-large font-poppins font-bold text-xs transition shadow-subtle disabled:opacity-50 whitespace-nowrap"
                  >
                    🔄 {reorderingId === order.id ? 'Duplicating...' : 'Re-order Formula'}
                  </button>
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="flex-1 sm:flex-none bg-primary text-cream text-center px-5 py-2.5 rounded-large font-poppins font-bold text-xs hover:bg-primary-dark transition shadow-subtle whitespace-nowrap"
                  >
                    Track Progress →
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
