// src/app/cart/page.jsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import EmptyState from '@/components/EmptyState';
import PriceTag from '@/components/PriceTag';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    itemCount,
    subtotal,
    shipping,
    discount,
    coupon,
    total,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { isLoggedIn } = useAuth();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setCouponError('');
    setCouponSuccess('');
    setIsApplying(true);

    try {
      const res = await applyCoupon(couponInput);
      setCouponSuccess(`Applied: ${res.code} (${res.discountPercent}% OFF)`);
      setCouponInput('');
    } catch (err) {
      setCouponError(err.message || 'Invalid coupon code. Try WELCOME10 for 10% off.');
    } finally {
      setIsApplying(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your Shopping Cart is Empty"
          description="Looks like you haven't added any personalized organic soaps yet. Explore our handcrafted formulas or take our diagnostic quiz."
          actionText="Browse Soaps Catalog"
          actionHref="/products"
        />
      </div>
    );
  }

  const freeShippingThreshold = 499;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-dark pb-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-poppins font-extrabold text-charcoal">
            Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light font-inter mt-1">
            Review your customized soap bars before proceeding to Cash on Delivery checkout.
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="bg-cream p-4 rounded-extra border border-primary/15 flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-secondary shrink-0" />
        <div className="flex-1 text-xs font-inter text-charcoal">
          {amountToFreeShipping > 0 ? (
            <span>
              Add <strong className="text-primary font-bold">₹{amountToFreeShipping}</strong> more to qualify for <strong>FREE Delivery</strong> across India!
            </span>
          ) : (
            <span className="text-status-success font-bold flex items-center gap-1">
              <Check className="w-4 h-4" />
              Congratulations! Your order qualifies for FREE Shipping!
            </span>
          )}
        </div>
      </div>

      {/* Cart Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
        {/* Left: Cart Items Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-extra border border-primary/15 shadow-subtle divide-y divide-cream-dark overflow-hidden">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Product Thumbnail & Details */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative w-20 h-20 rounded-xl bg-cream border border-primary/15 overflow-hidden flex items-center justify-center shrink-0 p-1">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <ShoppingBag className="w-6 h-6 text-primary/60" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <Link
                      href={`/products/${item.slug || item.id}`}
                      className="font-poppins font-bold text-sm sm:text-base text-charcoal hover:text-primary transition"
                    >
                      {item.name}
                    </Link>

                    <div className="flex items-center gap-2">
                      <PriceTag price={item.price} size="sm" />
                    </div>

                    {item.options?.texture && (
                      <span className="text-[10px] font-inter bg-cream px-2 py-0.5 rounded text-charcoal-muted capitalize">
                        Texture: {item.options.texture}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls & Total */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                  {/* Stepper */}
                  <div className="flex items-center bg-cream/70 border border-primary/20 rounded-large">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-charcoal hover:text-primary transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-poppins font-bold text-xs text-charcoal">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-charcoal hover:text-primary transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <span className="font-poppins font-bold text-sm sm:text-base text-charcoal min-w-[70px] text-right">
                    ₹{item.price * item.quantity}
                  </span>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-charcoal-muted hover:text-status-error p-1.5 rounded-lg transition"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Order Summary Card */}
        <div className="bg-white rounded-extra p-6 sm:p-8 border border-primary/15 shadow-subtle space-y-6">
          <h2 className="font-poppins font-bold text-lg text-charcoal">Order Summary</h2>

          {/* Price Breakdown */}
          <div className="space-y-3 text-xs sm:text-sm font-inter divide-y divide-cream-dark">
            <div className="flex justify-between pt-2">
              <span className="text-charcoal-light">Subtotal</span>
              <span className="font-bold text-charcoal">₹{subtotal}</span>
            </div>

            <div className="flex justify-between pt-3">
              <span className="text-charcoal-light">Estimated Shipping</span>
              <span className="font-bold text-charcoal">
                {shipping === 0 ? (
                  <span className="text-status-success font-bold">FREE</span>
                ) : (
                  `₹${shipping}`
                )}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between pt-3 text-secondary-dark">
                <span className="flex items-center gap-1 font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  Coupon ({coupon?.code})
                </span>
                <span className="font-bold">-₹{discount}</span>
              </div>
            )}

            <div className="flex justify-between pt-3 text-base sm:text-lg font-poppins font-bold text-charcoal">
              <span>Total Amount</span>
              <span className="text-primary text-xl font-extrabold">₹{total}</span>
            </div>
          </div>

          {/* Coupon Input Form */}
          <div className="space-y-2 pt-2 border-t border-cream-dark">
            <label className="block text-xs font-poppins font-bold text-charcoal">
              Promotional Coupon
            </label>

            {coupon ? (
              <div className="p-3 bg-secondary/15 rounded-large border border-secondary/30 flex items-center justify-between text-xs">
                <div>
                  <span className="font-poppins font-bold text-secondary-dark">{coupon.code}</span>
                  <p className="text-[10px] text-charcoal-light font-inter">{coupon.description}</p>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-xs font-poppins font-bold text-status-error hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="e.g. WELCOME10"
                  className="flex-1 px-3 py-2 text-xs font-inter rounded-large bg-cream/50 border border-primary/20 focus:outline-none focus:border-primary uppercase"
                />
                <button
                  type="submit"
                  disabled={isApplying}
                  className="bg-cream-dark text-charcoal hover:bg-primary hover:text-cream px-4 py-2 rounded-large font-poppins font-bold text-xs transition"
                >
                  {isApplying ? '...' : 'Apply'}
                </button>
              </form>
            )}

            {couponError && (
              <p className="text-[11px] text-status-error font-inter">{couponError}</p>
            )}
            {couponSuccess && (
              <p className="text-[11px] text-status-success font-inter font-semibold">{couponSuccess}</p>
            )}
          </div>

          {/* Proceed to Checkout Button */}
          <Link
            href={isLoggedIn ? "/checkout" : "/login?redirect=/checkout"}
            className="w-full flex items-center justify-center gap-2 bg-primary text-cream py-3.5 rounded-large font-poppins font-bold text-sm hover:bg-primary-hover transition-all shadow-medium active:scale-98"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-center gap-2 text-[10px] font-inter text-charcoal-muted">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>Pay via Cash on Delivery at your doorstep</span>
          </div>
        </div>
      </div>
    </div>
  );
}
