// src/app/order-confirmation/page.jsx

'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ordersAPI, paymentsAPI } from '@/services/api';

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
        name: 'SoapCo',
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
          color: '#D4AF37',
        },
      };

      if (typeof window !== 'undefined' && window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Dev test mode fallback
        alert('Razorpay Checkout SDK active in test mode. Simulating successful payment verification.');
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

  if (loading) return <div className="text-center py-20 font-poppins font-bold text-primary">Loading order summary...</div>;
  if (!order) return <div className="text-center py-20 font-poppins text-primary">Order summary not found. Please try submitting questionnaire again.</div>;

  return (
    <div className="max-w-3xl mx-auto my-12 px-4">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-amber-900/10 space-y-8">
        <div>
          <span className="text-xs font-poppins font-bold uppercase tracking-wider text-accent">Order Match Ready</span>
          <h1 className="text-3xl font-poppins font-bold text-primary mt-1">
            Your Custom Soap Formula
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Review your matched organic recipe and complete payment via Razorpay.
          </p>
        </div>

        {/* Recipe & Customization Breakdown Card */}
        <div className="border-2 border-accent/40 bg-neutral/40 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-start border-b border-amber-900/10 pb-4">
            <div>
              <span className="bg-accent/15 text-primary text-xs font-bold px-3 py-1 rounded-full inline-block mb-1">
                Matched Formulation
              </span>
              <h3 className="text-xl font-poppins font-bold text-primary">
                {order.recipe?.name || 'Custom Organic Blend Soap'}
              </h3>
            </div>
            <span className="text-2xl font-poppins font-extrabold text-accent">
              ₹{order.price}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs text-text-muted uppercase font-bold block">Skin Type</span>
              <span className="font-bold text-primary capitalize">{order.skinType}</span>
            </div>
            <div>
              <span className="text-xs text-text-muted uppercase font-bold block">Main Concern</span>
              <span className="font-bold text-primary capitalize">{order.mainConcern}</span>
            </div>
            <div>
              <span className="text-xs text-text-muted uppercase font-bold block">Soap Texture</span>
              <span className="font-bold text-primary capitalize">{order.texturePreference}</span>
            </div>
            <div>
              <span className="text-xs text-text-muted uppercase font-bold block">Est. Delivery</span>
              <span className="font-bold text-primary">
                {new Date(order.deliveryDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Patch Test Warning Callout */}
        <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h4 className="font-poppins font-bold text-amber-900 text-sm">Important Safety Notice</h4>
            <p className="text-xs text-amber-800 leading-relaxed mt-0.5">
              Always perform a <strong>24-hour patch test</strong> on your inner arm before applying new natural skincare products to your face or body.
            </p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-neutral/60 p-6 rounded-2xl space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">Base Custom Soap Bar</span>
            <span className="font-bold">₹399</span>
          </div>
          {order.texturePreference === 'exfoliating' && (
            <div className="flex justify-between">
              <span className="text-text-muted">Exfoliating Botanical Addon</span>
              <span className="font-bold">₹50</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-text-muted">Delivery Charge (Local Service Area)</span>
            <span className="font-bold text-emerald-600">FREE</span>
          </div>
          <div className="border-t border-amber-900/10 pt-3 flex justify-between items-center text-base">
            <span className="font-poppins font-bold text-primary">Total Payable</span>
            <span className="font-poppins font-extrabold text-2xl text-accent">₹{order.price}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handlePayment}
            disabled={paymentProcessing}
            className="w-full bg-accent text-white py-4 rounded-xl font-poppins font-bold text-lg hover:bg-accent-hover transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>💳 {paymentProcessing ? 'Processing...' : `Pay ₹${order.price} via Razorpay`}</span>
          </button>

          <button
            onClick={() => router.push('/questionnaire')}
            className="w-full py-3 border border-primary/20 text-primary rounded-xl font-poppins font-bold text-sm hover:bg-neutral transition"
          >
            Edit Questionnaire Answers
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 font-poppins font-bold text-primary">Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
