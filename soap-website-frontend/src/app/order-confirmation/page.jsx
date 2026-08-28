// src/app/order-confirmation/page.jsx

'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ordersAPI, paymentsAPI } from '@/services/api';
import {
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  Truck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Sparkles,
  Leaf,
  Calendar,
} from 'lucide-react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) return;
        const response = await ordersAPI.getById(orderId);
        setOrder(response.data);
      } catch (err) {
        console.error('Failed to fetch order summary:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handlePayment = async () => {
    setPaymentProcessing(true);

    try {
      // Step 1: Call backend to create Razorpay order
      const orderRes = await paymentsAPI.createOrder({
        orderId: order.id,
        amount: order.price,
      });

      const razorpayOrderId = orderRes.data.razorpayOrderId;

      // Step 2: Open Razorpay Checkout modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || 'rzp_test_samplekey12345',
        amount: Math.round(order.price * 100),
        currency: 'INR',
        name: 'Atishay',
        description: `Personalized Soap Order #${order.id.slice(0, 8)}`,
        order_id: razorpayOrderId,
        prefill: {
          email: localStorage.getItem('userEmail') || 'customer@example.com',
          contact: order.deliveryPhone,
        },
        handler: async (response) => {
          try {
            // Step 3: Verify payment signature via backend
            await paymentsAPI.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order.id,
            });

            router.push(`/dashboard/orders/${order.id}`);
          } catch (err) {
            alert('Payment verification failed. Please contact support.');
          }
        },
        theme: {
          color: '#5D7B6F',
        },
      };

      if (typeof window !== 'undefined' && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Dev test mode fallback
        alert('Razorpay Checkout active in test mode. Simulating successful verification.');
        await paymentsAPI.verify({
          razorpay_order_id: razorpayOrderId,
          razorpay_payment_id: `pay_mock_${Date.now()}`,
          razorpay_signature: 'dev_mock_signature',
          orderId: order.id,
        });
        router.push(`/dashboard/orders/${order.id}`);
      }
    } catch (err) {
      alert('Payment initialization failed. Please try again.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 text-center bg-white rounded-extra border border-primary/15 shadow-subtle space-y-3">
        <Sparkles className="w-8 h-8 text-primary mx-auto animate-spin" />
        <h3 className="font-poppins font-bold text-charcoal text-lg">Loading Formula Summary...</h3>
        <p className="text-xs text-charcoal-light font-inter">Matching custom recipe and calculating pricing</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 text-center bg-white rounded-extra border border-primary/15 shadow-subtle space-y-3">
        <AlertTriangle className="w-8 h-8 text-status-warning mx-auto" />
        <h3 className="font-poppins font-bold text-charcoal text-lg">Order Not Found</h3>
        <p className="text-xs text-charcoal-light font-inter">Please try taking the skin diagnostic questionnaire again.</p>
        <button
          onClick={() => router.push('/questionnaire')}
          className="bg-primary text-cream px-6 py-2.5 rounded-large font-poppins font-bold text-xs"
        >
          Take Quiz Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-10 sm:my-14 px-4 space-y-6">
      <div className="bg-white rounded-extra p-6 sm:p-10 shadow-large border border-primary/15 space-y-8">
        {/* Header */}
        <div className="space-y-1">
          <span className="text-xs font-poppins font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Formula Matched &amp; Formulated
          </span>
          <h1 className="text-2xl sm:text-3xl font-poppins font-bold text-charcoal">
            Your Bespoke Soap Summary
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-light font-inter">
            Review your tailored recipe specifications and complete payment safely via Razorpay.
          </p>
        </div>

        {/* Recipe Breakdown Card */}
        <div className="border-2 border-primary/20 bg-cream/40 p-6 rounded-large space-y-4">
          <div className="flex justify-between items-start border-b border-primary/10 pb-4">
            <div>
              <span className="bg-primary/10 text-primary-darker text-xs font-poppins font-bold px-3 py-1 rounded-full inline-flex items-center gap-1 mb-1.5 border border-primary/20">
                <Leaf className="w-3 h-3 text-primary" />
                Prescribed Recipe Match
              </span>
              <h3 className="text-lg sm:text-xl font-poppins font-bold text-charcoal">
                {order.recipe?.name || 'Custom Organic Blend Soap'}
              </h3>
            </div>
            <span className="text-2xl font-poppins font-extrabold text-secondary">
              ₹{order.price}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm font-inter">
            <div>
              <span className="text-[10px] text-charcoal-muted uppercase font-bold block mb-0.5">Skin Profile</span>
              <span className="font-bold text-charcoal capitalize">{order.skinType}</span>
            </div>
            <div>
              <span className="text-[10px] text-charcoal-muted uppercase font-bold block mb-0.5">Main Concern</span>
              <span className="font-bold text-charcoal capitalize">{order.mainConcern}</span>
            </div>
            <div>
              <span className="text-[10px] text-charcoal-muted uppercase font-bold block mb-0.5">Bar Texture</span>
              <span className="font-bold text-charcoal capitalize">{order.texturePreference}</span>
            </div>
            <div>
              <span className="text-[10px] text-charcoal-muted uppercase font-bold block mb-0.5">Est. Delivery</span>
              <span className="font-bold text-primary flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(order.deliveryDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* 24h Patch Test Safety Notice */}
        <div className="bg-secondary-light/30 border border-secondary/40 p-5 rounded-large flex items-start gap-3.5">
          <AlertTriangle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-poppins font-bold text-charcoal text-xs sm:text-sm">
              Mandatory 24-Hour Patch Test Notice
            </h4>
            <p className="text-xs text-charcoal-light leading-relaxed font-inter">
              Even with 100% natural botanical extracts, always apply a small lather to your inner wrist or elbow for 24 hours prior to regular full facial application.
            </p>
          </div>
        </div>

        {/* Itemized Price Breakdown */}
        <div className="bg-cream/60 p-6 rounded-large space-y-3 text-xs sm:text-sm font-inter border border-cream-dark">
          <div className="flex justify-between">
            <span className="text-charcoal-light">Base Custom 125g Soap Bar</span>
            <span className="font-bold text-charcoal">₹399</span>
          </div>
          {order.texturePreference === 'exfoliating' && (
            <div className="flex justify-between">
              <span className="text-charcoal-light">Botanical Exfoliating Oatmeal Scrub Addon</span>
              <span className="font-bold text-charcoal">₹50</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-charcoal-light flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-primary" />
              Pan-India Express Delivery
            </span>
            <span className="font-bold text-status-success uppercase text-xs bg-status-success/15 px-2 py-0.5 rounded">FREE</span>
          </div>
          <div className="border-t border-primary/10 pt-3 flex justify-between items-center text-sm sm:text-base">
            <span className="font-poppins font-bold text-charcoal">Total Amount Payable</span>
            <span className="font-poppins font-extrabold text-xl sm:text-2xl text-secondary">₹{order.price}</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-inter text-charcoal-light border-y border-cream-dark py-3">
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-primary" />
            256-Bit SSL Encrypted
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-status-success" />
            Razorpay Verified Merchant
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
            Ayush Quality Certified
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handlePayment}
            disabled={paymentProcessing}
            className="w-full bg-primary text-cream py-4 rounded-large font-poppins font-bold text-base hover:bg-primary-hover transition-all shadow-medium hover:shadow-large flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
          >
            <CreditCard className="w-5 h-5 text-cream" />
            <span>{paymentProcessing ? 'Processing Secure Payment...' : `Pay ₹${order.price} via Razorpay`}</span>
          </button>

          <button
            onClick={() => router.push('/questionnaire')}
            className="w-full py-3 border border-primary/20 text-charcoal rounded-large font-poppins font-bold text-xs hover:bg-cream transition flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Edit Diagnostic Answers</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto my-24 p-8 text-center bg-white rounded-extra border border-primary/15 shadow-subtle space-y-3">
          <Sparkles className="w-8 h-8 text-primary mx-auto animate-spin" />
          <h3 className="font-poppins font-bold text-charcoal text-lg">Loading Formula Summary...</h3>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
