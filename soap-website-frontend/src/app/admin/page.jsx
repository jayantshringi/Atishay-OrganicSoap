// src/app/admin/page.jsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI, authAPI } from '@/services/api';
import Toast from '@/components/Toast';

export default function AdminPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'info' });

  // Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('in-production');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    authAPI
      .getMe()
      .then((res) => {
        const role = res.data.role || localStorage.getItem('userRole');
        setUserRole(role);
        if (role !== 'admin') {
          setToast({ message: 'Access Denied: Admin role required', type: 'error' });
          setTimeout(() => router.push('/dashboard'), 2000);
        } else {
          loadAdminData();
        }
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  const loadAdminData = async () => {
    try {
      const [analyticsRes, ordersRes] = await Promise.all([
        adminAPI.getAnalytics(),
        adminAPI.getAllOrders(statusFilter ? { status: statusFilter } : {}),
      ]);
      setAnalytics(analyticsRes.data);
      setOrders(ordersRes.data.orders || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setToast({ message: 'Failed to load admin metrics', type: 'error' });
    }
  };

  useEffect(() => {
    if (userRole === 'admin') {
      adminAPI
        .getAllOrders(statusFilter ? { status: statusFilter } : {})
        .then((res) => setOrders(res.data.orders || []))
        .catch((err) => console.error(err));
    }
  }, [statusFilter, userRole]);

  const handleUpdateStatusSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setUpdating(true);

    try {
      await adminAPI.updateOrderStatus(selectedOrder.id, {
        orderStatus: newStatus,
        trackingNumber: trackingNumber || undefined,
      });

      setToast({
        message: `Order #${selectedOrder.id.slice(0, 8)} updated to ${newStatus}`,
        type: 'success',
      });
      setSelectedOrder(null);
      setTrackingNumber('');
      loadAdminData();
    } catch {
      setToast({ message: 'Failed to update order status', type: 'error' });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 font-poppins font-bold text-primary">
        Verifying Administrator Access...
      </div>
    );
  }

  if (userRole !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-status-error/10 border border-status-error/30 rounded-extra text-center">
        <span className="text-4xl">⚠️</span>
        <h2 className="text-xl font-poppins font-bold text-status-error mt-2">Access Denied</h2>
        <p className="text-xs text-charcoal-light font-inter mt-1">
          You must be logged in with an administrator account to view this portal.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-8 sm:my-10 px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'info' })}
        />
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-primary/10 pb-5 sm:pb-6">
        <div>
          <span className="text-xs font-poppins font-bold uppercase tracking-wider text-secondary">
            Operational Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-charcoal mt-0.5">
            SoapCo Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light font-inter">
            Real-time batch fulfillment, order dispatching, and revenue metrics
          </p>
        </div>
        <button
          onClick={loadAdminData}
          className="w-full sm:w-auto bg-cream hover:bg-cream-dark text-charcoal px-4 py-2.5 rounded-large text-xs font-poppins font-bold border border-primary/20 transition shadow-subtle"
        >
          🔄 Refresh Metrics
        </button>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {[
          {
            label: 'Orders Today',
            value: analytics?.ordersToday ?? 0,
            cls: 'text-primary',
          },
          {
            label: 'Revenue Today',
            value: `₹${analytics?.revenueToday ?? 0}`,
            cls: 'text-status-success',
          },
          {
            label: 'In Production',
            value: analytics?.ordersInProduction ?? 0,
            cls: 'text-secondary-dark',
          },
          {
            label: 'Shipped Orders',
            value: analytics?.ordersShipped ?? 0,
            cls: 'text-accent-dark',
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white p-4 sm:p-6 rounded-extra border border-primary/15 shadow-subtle space-y-1 sm:space-y-2"
          >
            <span className="text-[10px] sm:text-xs text-charcoal-light font-bold uppercase block leading-tight font-poppins">
              {kpi.label}
            </span>
            <span
              className={`text-2xl sm:text-3xl font-poppins font-extrabold block truncate ${kpi.cls}`}
            >
              {kpi.value}
            </span>
          </div>
        ))}
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-primary/10 pb-3">
        {[
          { key: '', label: 'All Orders' },
          { key: 'confirmed', label: 'Confirmed' },
          { key: 'in-production', label: 'In Production' },
          { key: 'shipped', label: 'Shipped' },
          { key: 'delivered', label: 'Delivered' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-3 sm:px-4 py-2 rounded-large text-xs font-poppins font-bold transition ${
              statusFilter === tab.key
                ? 'bg-primary text-cream shadow-subtle'
                : 'bg-white text-charcoal hover:bg-cream border border-primary/15'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-extra shadow-large border border-primary/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[640px]">
            <thead className="bg-cream/80 text-charcoal text-xs uppercase font-poppins font-bold border-b border-primary/10">
              <tr>
                <th className="p-3 sm:p-4">Order ID</th>
                <th className="p-3 sm:p-4">Customer</th>
                <th className="p-3 sm:p-4">Formula Details</th>
                <th className="p-3 sm:p-4">Price</th>
                <th className="p-3 sm:p-4">Status</th>
                <th className="p-3 sm:p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-dark font-inter font-medium">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-charcoal-light font-poppins text-sm">
                    No orders match the selected filter.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-cream/30 transition-colors">
                    <td className="p-3 sm:p-4 font-mono font-bold text-primary text-xs">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="p-3 sm:p-4">
                      <div className="font-bold text-charcoal text-sm">
                        {order.user?.name || 'Customer'}
                      </div>
                      <div className="text-xs text-charcoal-light">{order.user?.email || 'N/A'}</div>
                      <div className="text-[11px] text-charcoal-light/70">{order.deliveryCity}</div>
                    </td>
                    <td className="p-3 sm:p-4">
                      <div className="capitalize font-bold text-charcoal text-sm">
                        {order.skinType} Skin
                      </div>
                      <div className="text-xs text-charcoal-light">Concern: {order.mainConcern}</div>
                      <div className="text-[11px] text-primary font-semibold">
                        {order.recipe?.name || 'Custom Blend'}
                      </div>
                    </td>
                    <td className="p-3 sm:p-4 font-bold text-secondary text-base">₹{order.price}</td>
                    <td className="p-3 sm:p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-poppins font-bold uppercase tracking-wider whitespace-nowrap ${
                          order.orderStatus === 'delivered'
                            ? 'bg-status-success/20 text-primary-darker'
                            : order.orderStatus === 'shipped'
                            ? 'bg-accent/20 text-accent-dark'
                            : order.orderStatus === 'in-production'
                            ? 'bg-secondary/20 text-charcoal'
                            : 'bg-primary/15 text-primary-darker'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setNewStatus(order.orderStatus);
                          setTrackingNumber(order.trackingNumber || '');
                        }}
                        className="bg-primary text-cream px-3 sm:px-3.5 py-1.5 rounded-large font-poppins font-bold text-xs hover:bg-primary-dark transition shadow-subtle whitespace-nowrap"
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Update Status Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-extra sm:rounded-extra p-6 sm:p-8 max-w-lg w-full shadow-large border border-primary/20 space-y-5 sm:space-y-6 max-h-[90dvh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-poppins font-bold uppercase tracking-wider text-secondary">
                  Fulfillment Status Update
                </span>
                <h3 className="text-lg sm:text-xl font-poppins font-bold text-charcoal">
                  Order #{selectedOrder.id.slice(0, 8)}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-charcoal-light hover:text-charcoal font-bold text-xl p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateStatusSubmit} className="space-y-4 font-inter">
              <div>
                <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1.5">
                  Select New Order Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-cream/40 border border-cream-dark rounded-large text-sm font-poppins text-charcoal focus:outline-none focus:border-primary"
                >
                  <option value="confirmed">Confirmed</option>
                  <option value="in-production">🏭 In Production</option>
                  <option value="shipped">🚚 Shipped</option>
                  <option value="delivered">🎉 Delivered</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1.5">
                  Courier Tracking Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. AWB987654321IN"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full px-4 py-3 bg-cream/40 border border-cream-dark rounded-large text-sm font-inter text-charcoal focus:outline-none focus:border-primary"
                />
              </div>

              <p className="text-xs text-charcoal-light leading-relaxed">
                Updating the order status triggers an automated status notification email to{' '}
                <strong>{selectedOrder.user?.email || 'the customer'}</strong>.
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-3 border border-primary/20 rounded-large font-poppins font-bold text-xs text-charcoal hover:bg-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 py-3 bg-primary text-cream rounded-large font-poppins font-bold text-xs hover:bg-primary-dark transition shadow-medium disabled:opacity-50"
                >
                  {updating ? 'Updating...' : 'Save & Dispatch Email'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
