// src/app/checkout/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  AlertCircle,
  Tag,
  Check,
  ShoppingBag,
  Info
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ordersAPI } from '@/services/api';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, itemCount, subtotal, shipping, discount, coupon, total, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400001',
    orderNotes: ''
  });

  const [placingOrder, setPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        addressLine1: user.addresses?.[0]?.addressLine1 || prev.addressLine1,
        addressLine2: user.addresses?.[0]?.addressLine2 || prev.addressLine2,
        city: user.addresses?.[0]?.city || prev.city,
        state: user.addresses?.[0]?.state || prev.state,
        postalCode: user.addresses?.[0]?.postalCode || prev.postalCode
      }));
    }
  }, [user]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      router.push('/products');
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.addressLine1 || !formData.city || !formData.postalCode) {
      setErrorMessage('Please fill in all required shipping address fields.');
      return;
    }

    setPlacingOrder(true);
    setErrorMessage('');

    try {
      const orderPayload = {
        shippingAddress: {
          fullName: formData.fullName,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
        },
        items,
        couponCode: coupon?.code || null,
        subtotal,
        shippingFee: shipping,
        discount,
        price: total,
        paymentMethod: 'COD',
        notes: formData.orderNotes
      };

      const res = await ordersAPI.create(orderPayload);
      const createdOrderId = res?.data?.orderId || res?.data?.order?.id || `ord_${Date.now()}`;

      // Clear the cart
      clearCart();

      // Redirect to confirmation page
      router.push(`/order-confirmation?orderId=${createdOrderId}`);
    } catch (err) {
      console.error('Failed to place order:', err);
      setErrorMessage(err.message || 'Failed to place order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 bg-white rounded-extra border border-primary/15 text-center space-y-4">
        <h2 className="text-xl font-poppins font-bold text-charcoal">Your Cart is Empty</h2>
        <p className="text-xs text-charcoal-light font-inter">Add some items before checking out.</p>
        <Link
          href="/products"
          className="inline-block bg-primary text-cream px-6 py-2.5 rounded-large text-xs font-poppins font-bold"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Title & Progress Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-dark pb-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-poppins font-extrabold text-charcoal">
            Cash on Delivery Checkout
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light font-inter mt-1">
            Zero-risk doorstep payment across India. Complete your delivery address below.
          </p>
        </div>

        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Cart</span>
        </Link>
      </div>

      {errorMessage && (
        <div className="bg-status-error/10 border border-status-error/30 p-4 rounded-large text-xs font-inter text-status-error flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Form & Summary Grid */}
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        {/* Left 2 Cols: Delivery Address & Payment Method */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address Section */}
          <div className="bg-white rounded-extra p-6 sm:p-8 border border-primary/15 shadow-subtle space-y-6">
            <h2 className="font-poppins font-bold text-lg text-charcoal flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              <span>1. Delivery &amp; Contact Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-poppins font-bold text-charcoal mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Priya Mehta"
                  className="w-full px-3.5 py-2.5 text-xs font-inter rounded-large bg-cream/50 border border-primary/20 focus:outline-none focus:border-primary text-charcoal"
                />
              </div>

              <div>
                <label className="block text-xs font-poppins font-bold text-charcoal mb-1">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 9876543210"
                  className="w-full px-3.5 py-2.5 text-xs font-inter rounded-large bg-cream/50 border border-primary/20 focus:outline-none focus:border-primary text-charcoal"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-poppins font-bold text-charcoal mb-1">
                  Email Address (for order tracking notifications)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. priya@example.com"
                  className="w-full px-3.5 py-2.5 text-xs font-inter rounded-large bg-cream/50 border border-primary/20 focus:outline-none focus:border-primary text-charcoal"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-poppins font-bold text-charcoal mb-1">
                  House / Flat / Street Address Line 1 *
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  required
                  value={formData.addressLine1}
                  onChange={handleChange}
                  placeholder="e.g. Flat 402, Lotus Residency, MG Road"
                  className="w-full px-3.5 py-2.5 text-xs font-inter rounded-large bg-cream/50 border border-primary/20 focus:outline-none focus:border-primary text-charcoal"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-poppins font-bold text-charcoal mb-1">
                  Landmark / Colony (optional)
                </label>
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  placeholder="e.g. Near Central Park"
                  className="w-full px-3.5 py-2.5 text-xs font-inter rounded-large bg-cream/50 border border-primary/20 focus:outline-none focus:border-primary text-charcoal"
                />
              </div>

              <div>
                <label className="block text-xs font-poppins font-bold text-charcoal mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai"
                  className="w-full px-3.5 py-2.5 text-xs font-inter rounded-large bg-cream/50 border border-primary/20 focus:outline-none focus:border-primary text-charcoal"
                />
              </div>

              <div>
                <label className="block text-xs font-poppins font-bold text-charcoal mb-1">
                  Pincode / Postal Code *
                </label>
                <input
                  type="text"
                  name="postalCode"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="e.g. 400001"
                  className="w-full px-3.5 py-2.5 text-xs font-inter rounded-large bg-cream/50 border border-primary/20 focus:outline-none focus:border-primary text-charcoal"
                />
              </div>
            </div>
          </div>

          {/* Payment Method (COD Only - Portfolio Ground Rule) */}
          <div className="bg-white rounded-extra p-6 sm:p-8 border border-primary/15 shadow-subtle space-y-4">
            <h2 className="font-poppins font-bold text-lg text-charcoal flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-secondary" />
              <span>2. Payment Option</span>
            </h2>

            {/* Exclusive COD Option */}
            <div className="p-4 bg-cream rounded-xl border-2 border-primary flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-poppins font-bold text-sm text-charcoal">
                    Cash on Delivery (COD)
                  </h4>
                  <p className="text-xs text-charcoal-light font-inter">
                    Pay securely in cash or UPI when your handcrafted soap package arrives at your door.
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-poppins font-bold bg-primary text-cream px-2 py-0.5 rounded uppercase">
                Active
              </span>
            </div>

            {/* Demo Project Disclaimer Note */}
            <div className="p-3 bg-secondary/15 rounded-lg border border-secondary/30 flex items-center gap-2 text-xs text-secondary-dark font-inter">
              <Info className="w-4 h-4 shrink-0" />
              <span>
                <strong>Portfolio Demonstration Notice:</strong> This project intentionally supports Cash on Delivery only so end-to-end order placement can be verified without requiring external payment gateway merchant keys.
              </span>
            </div>
          </div>
        </div>

        {/* Right Col: Order Summary & Place Order */}
        <div className="bg-white rounded-extra p-6 sm:p-8 border border-primary/15 shadow-subtle space-y-6">
          <h2 className="font-poppins font-bold text-lg text-charcoal">Order Items ({itemCount})</h2>

          {/* Items Preview */}
          <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-cream-dark pr-1">
            {items.map((item) => (
              <div key={item.id} className="pt-2 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center shrink-0 relative overflow-hidden">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-contain" />
                    ) : (
                      <ShoppingBag className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-poppins font-bold text-charcoal line-clamp-1">{item.name}</p>
                    <p className="text-[10px] text-charcoal-muted">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-poppins font-bold text-charcoal">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-2.5 text-xs font-inter pt-3 border-t border-cream-dark">
            <div className="flex justify-between text-charcoal-light">
              <span>Subtotal</span>
              <span className="font-bold text-charcoal">₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-charcoal-light">
              <span>Delivery Charges</span>
              <span className="font-bold text-charcoal">
                {shipping === 0 ? <span className="text-status-success">FREE</span> : `₹${shipping}`}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-secondary-dark font-semibold">
                <span>Coupon Discount ({coupon?.code})</span>
                <span>-₹{discount}</span>
              </div>
            )}

            <div className="flex justify-between text-base font-poppins font-bold text-charcoal pt-2 border-t border-cream-dark">
              <span>Total Payable</span>
              <span className="text-primary text-xl font-extrabold">₹{total}</span>
            </div>
          </div>

          {/* Place Order CTA Button */}
          <button
            type="submit"
            disabled={placingOrder}
            className="w-full flex items-center justify-center gap-2 bg-primary text-cream py-4 rounded-large font-poppins font-bold text-sm hover:bg-primary-hover transition-all shadow-medium active:scale-98 disabled:opacity-75"
          >
            {placingOrder ? (
              <span>Placing Order...</span>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Place Order (COD ₹{total})</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-charcoal-muted text-center font-inter">
            By placing your order, you agree to Atishay's standard organic skincare terms and return policy.
          </p>
        </div>
      </form>
    </div>
  );
}
