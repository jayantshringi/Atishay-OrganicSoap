// src/app/admin/orders/page.jsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, Truck, Check, Eye } from 'lucide-react';
import { adminAPI } from '@/services/api';
import Spinner from '@/components/Spinner';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.getAllOrders(statusFilter ? { status: statusFilter } : {});
      setOrders(res?.data?.orders || []);
    } catch (err) {
      console.error('Failed to load orders for admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleQuickStatusUpdate = async (orderId, newStatus) => {
    try {
      await adminAPI.updateOrderStatus(orderId, { orderStatus: newStatus });
      fetchOrders();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-8 sm:my-12 px-4 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-primary/10 pb-5">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold text-primary hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin Dashboard</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-charcoal">
            All Fulfillment Orders
          </h1>
          <p className="text-xs text-charcoal-light font-inter">
            Manage doorstep Cash on Delivery fulfillment status progression
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="bg-white hover:bg-cream text-charcoal px-4 py-2 rounded-large text-xs font-poppins font-bold border border-primary/20 transition flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5 text-primary" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['', 'confirmed', 'in-production', 'shipped', 'delivered'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3.5 py-1.5 rounded-large text-xs font-poppins font-bold transition capitalize ${
              statusFilter === s
                ? 'bg-primary text-cream'
                : 'bg-white text-charcoal hover:bg-cream border border-primary/15'
            }`}
          >
            {s ? s.replace('-', ' ') : 'All Orders'}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner size="lg" text="Loading fulfillment orders..." />
      ) : (
        <div className="bg-white rounded-extra border border-primary/15 shadow-subtle overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream/80 text-charcoal text-xs uppercase font-poppins font-bold border-b border-primary/10">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Formula</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Quick Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-dark text-xs font-inter font-medium">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-cream/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-primary">#{o.id.slice(0, 8)}</td>
                  <td className="p-4">
                    <div className="font-bold text-charcoal">{o.user?.name || 'Customer'}</div>
                    <div className="text-[10px] text-charcoal-muted">{o.deliveryCity}</div>
                  </td>
                  <td className="p-4 font-semibold text-charcoal">{o.recipe?.name || 'Custom Soap'}</td>
                  <td className="p-4 font-poppins font-bold text-secondary text-sm">₹{o.price}</td>
                  <td className="p-4">
                    <span className="capitalize bg-cream px-2 py-1 rounded text-charcoal font-semibold border border-cream-dark">
                      {o.orderStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={o.orderStatus}
                      onChange={(e) => handleQuickStatusUpdate(o.id, e.target.value)}
                      className="bg-cream/50 border border-primary/20 rounded-lg px-2.5 py-1 text-xs font-poppins font-semibold text-charcoal focus:outline-none"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="in-production">In Production</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
