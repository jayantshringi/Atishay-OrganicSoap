// src/app/admin/page.jsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminAPI, authAPI } from '@/services/api';
import Toast from '@/components/Toast';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  ShieldCheck,
  RefreshCw,
  TrendingUp,
  Search,
  Truck,
  Sparkles,
  Package,
  CheckCircle2,
  Clock,
  X,
  ChevronDown,
} from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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

  // Recharts Mock/Live Data
  const revenueChartData = [
    { day: 'Mon', revenue: 1995, orders: 5 },
    { day: 'Tue', revenue: 2793, orders: 7 },
    { day: 'Wed', revenue: 3591, orders: 9 },
    { day: 'Thu', revenue: 3192, orders: 8 },
    { day: 'Fri', revenue: 4788, orders: 12 },
    { day: 'Sat', revenue: 5985, orders: 15 },
    { day: 'Sun', revenue: (analytics?.revenueToday || 3990), orders: (analytics?.ordersToday || 10) },
  ];

  const skinTypeDistData = [
    { name: 'Oily / Acne', value: 42, color: '#E8B84F' },
    { name: 'Dry / Flaky', value: 28, color: '#5D7B6F' },
    { name: 'Sensitive', value: 18, color: '#8B7355' },
    { name: 'Combination', value: 12, color: '#D4A574' },
  ];

  const filteredOrders = orders.filter((o) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const customerName = (o.user?.name || '').toLowerCase();
    const customerEmail = (o.user?.email || '').toLowerCase();
    const orderId = o.id.toLowerCase();
    return customerName.includes(query) || customerEmail.includes(query) || orderId.includes(query);
  });

  if (loading) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 text-center bg-white rounded-extra border border-primary/15 shadow-subtle space-y-3">
        <ShieldCheck className="w-8 h-8 text-primary mx-auto animate-pulse" />
        <h3 className="font-poppins font-bold text-charcoal text-lg">Verifying Administrator Access...</h3>
      </div>
    );
  }

  if (userRole !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-status-error/10 border border-status-error/30 rounded-extra text-center space-y-2">
        <ShieldCheck className="w-8 h-8 text-status-error mx-auto" />
        <h2 className="text-xl font-poppins font-bold text-status-error">Access Denied</h2>
        <p className="text-xs text-charcoal-light font-inter">
          You must be logged in with an administrator account to view this operations portal.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-8 sm:my-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'info' })}
        />
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-primary/10 pb-5">
        <div>
          <span className="text-xs font-poppins font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Operational Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-charcoal mt-0.5">
            SoapCo Operations &amp; Fulfillment
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light font-inter">
            Real-time batch fulfillment, dispatch logs, and formulation revenue analytics
          </p>
        </div>
        <button
          onClick={loadAdminData}
          className="w-full sm:w-auto bg-white hover:bg-cream text-charcoal px-4 py-2.5 rounded-large text-xs font-poppins font-bold border border-primary/20 transition shadow-subtle flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5 text-primary" />
          <span>Refresh Operations</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {[
          {
            label: 'Orders Today',
            value: analytics?.ordersToday ?? 0,
            icon: Package,
            cls: 'text-primary',
          },
          {
            label: 'Revenue Today',
            value: `₹${analytics?.revenueToday ?? 0}`,
            icon: TrendingUp,
            cls: 'text-status-success',
          },
          {
            label: 'In Production',
            value: analytics?.ordersInProduction ?? 0,
            icon: Sparkles,
            cls: 'text-secondary-dark',
          },
          {
            label: 'Shipped Orders',
            value: analytics?.ordersShipped ?? 0,
            icon: Truck,
            cls: 'text-accent-dark',
          },
        ].map((kpi) => {
          const IconComp = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white p-5 sm:p-6 rounded-extra border border-primary/15 shadow-subtle space-y-1.5"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] sm:text-xs text-charcoal-muted font-bold uppercase font-poppins">
                  {kpi.label}
                </span>
                <IconComp className={`w-4 h-4 ${kpi.cls}`} />
              </div>
              <span className={`text-2xl sm:text-3xl font-poppins font-extrabold block truncate ${kpi.cls}`}>
                {kpi.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Interactive Charts Row (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Trend Area Chart (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-extra border border-primary/15 shadow-subtle space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-poppins font-bold text-charcoal text-sm sm:text-base">
                7-Day Revenue Trend
              </h3>
              <p className="text-xs text-charcoal-light font-inter">Daily sales from custom formulations</p>
            </div>
            <span className="text-xs font-poppins font-bold text-status-success bg-status-success/10 px-2.5 py-1 rounded-full">
              +18.4% WoW
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5D7B6F" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#5D7B6F" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#8C9797" fontSize={11} />
                <YAxis stroke="#8C9797" fontSize={11} tickFormatter={(v) => `₹${v}`} />
                <Tooltip
                  formatter={(value) => [`₹${value}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#2B3B3B', borderRadius: '10px', color: '#F9F7F2', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#5D7B6F" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skin Profile Distribution Donut Chart (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-extra border border-primary/15 shadow-subtle space-y-4">
          <div>
            <h3 className="font-poppins font-bold text-charcoal text-sm sm:text-base">
              Skin Profile Distribution
            </h3>
            <p className="text-xs text-charcoal-light font-inter">Formulation requests by skin category</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skinTypeDistData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {skinTypeDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [`${val}%`, 'Share']}
                  contentStyle={{ backgroundColor: '#2B3B3B', borderRadius: '10px', color: '#F9F7F2', fontSize: '12px' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2">
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
              className={`px-3.5 py-2 rounded-large text-xs font-poppins font-bold transition ${
                statusFilter === tab.key
                  ? 'bg-primary text-cream shadow-subtle'
                  : 'bg-white text-charcoal hover:bg-cream border border-primary/15'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative max-w-xs">
          <Search className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, email, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-primary/20 rounded-large text-xs font-inter text-charcoal focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-extra shadow-large border border-primary/15 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[640px]">
            <thead className="bg-cream/80 text-charcoal text-xs uppercase font-poppins font-bold border-b border-primary/10">
              <tr>
                <th className="p-3.5 sm:p-4">Order ID</th>
                <th className="p-3.5 sm:p-4">Customer</th>
                <th className="p-3.5 sm:p-4">Formula Details</th>
                <th className="p-3.5 sm:p-4">Price</th>
                <th className="p-3.5 sm:p-4">Status</th>
                <th className="p-3.5 sm:p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-dark font-inter font-medium text-xs sm:text-sm">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-charcoal-light font-poppins text-xs">
                    No orders match the selected filter or search query.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-cream/30 transition-colors">
                    <td className="p-3.5 sm:p-4 font-mono font-bold text-primary text-xs">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="p-3.5 sm:p-4">
                      <div className="font-bold text-charcoal text-xs sm:text-sm">
                        {order.user?.name || 'Customer'}
                      </div>
                      <div className="text-[11px] text-charcoal-light">{order.user?.email || 'N/A'}</div>
                      <div className="text-[10px] text-charcoal-muted">{order.deliveryCity}</div>
                    </td>
                    <td className="p-3.5 sm:p-4">
                      <div className="capitalize font-bold text-charcoal text-xs">
                        {order.skinType} Skin
                      </div>
                      <div className="text-[11px] text-charcoal-light">Concern: {order.mainConcern}</div>
                      <div className="text-[10px] text-primary font-semibold">
                        {order.recipe?.name || 'Custom Blend'}
                      </div>
                    </td>
                    <td className="p-3.5 sm:p-4 font-bold text-secondary text-sm sm:text-base">₹{order.price}</td>
                    <td className="p-3.5 sm:p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-poppins font-bold uppercase tracking-wider whitespace-nowrap ${
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
                    <td className="p-3.5 sm:p-4">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setNewStatus(order.orderStatus);
                          setTrackingNumber(order.trackingNumber || '');
                        }}
                        className="bg-primary text-cream px-3 py-1.5 rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition shadow-subtle whitespace-nowrap"
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
                className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-charcoal hover:bg-cream-dark"
              >
                <X className="w-4 h-4" />
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
                  Courier Tracking Number (AWB)
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
                Updating the order status triggers an automated email notification to{' '}
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
                  className="flex-1 py-3 bg-primary text-cream rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition shadow-medium disabled:opacity-50"
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
