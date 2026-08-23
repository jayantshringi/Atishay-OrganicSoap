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
          color: '#5D7B6F',
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
      <div className="bg-white rounded-extra p-8 sm:p-10 shadow-large border border-primary/15 space-y-8">
        <div>
          <span className="text-xs font-poppins font-bold uppercase tracking-wider text-secondary">
            Formula Formulated
          </span>
          <h1 className="text-3xl font-poppins font-bold text-charcoal mt-1">
            Your Custom Soap Match
          </h1>
          <p className="text-sm text-charcoal-light font-inter mt-1">
            Review your tailor-made botanical recipe and complete payment via Razorpay.
          </p>
        </div>

        {/* Recipe & Customization Breakdown Card */}
        <div className="border-2 border-primary/20 bg-cream/50 p-6 rounded-large space-y-4">
          <div className="flex justify-between items-start border-b border-primary/10 pb-4">
            <div>
              <span className="bg-primary/10 text-primary-darker text-xs font-poppins font-bold px-3 py-1 rounded-full inline-block mb-1.5">
                Matched Formulation
              </span>
              <h3 className="text-xl font-poppins font-bold text-charcoal">
                {order.recipe?.name || 'Custom Organic Blend Soap'}
              </h3>
            </div>
            <span className="text-2xl font-poppins font-extrabold text-secondary">
              ₹{order.price}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm font-inter">
            <div>
              <span className="text-xs text-charcoal-light uppercase font-bold block">Skin Profile</span>
              <span className="font-bold text-charcoal capitalize">{order.skinType}</span>
            </div>
            <div>
              <span className="text-xs text-charcoal-light uppercase font-bold block">Main Concern</span>
              <span className="font-bold text-charcoal capitalize">{order.mainConcern}</span>
            </div>
            <div>
              <span className="text-xs text-charcoal-light uppercase font-bold block">Soap Texture</span>
              <span className="font-bold text-charcoal capitalize">{order.texturePreference}</span>
            </div>
            <div>
              <span className="text-xs text-charcoal-light uppercase font-bold block">Est. Delivery</span>
              <span className="font-bold text-primary">
                {new Date(order.deliveryDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Patch Test Warning Callout */}
        <div className="bg-secondary-light/40 border border-secondary/40 p-5 rounded-large flex items-start gap-3.5">
          <span className="text-2xl">⚠️</span>
          <div>
            <h4 className="font-poppins font-bold text-charcoal text-sm">Mandatory 24h Patch Test Notice</h4>
            <p className="text-xs text-charcoal-light leading-relaxed mt-0.5 font-inter">
              Even with 100% natural botanical ingredients, please perform a <strong>24-hour patch test</strong> on your inner arm prior to regular full facial or body application.
            </p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-cream/60 p-6 rounded-large space-y-3 text-sm font-inter">
          <div className="flex justify-between">
            <span className="text-charcoal-light">Base Custom Soap Bar</span>
            <span className="font-bold text-charcoal">₹399</span>
          </div>
          {order.texturePreference === 'exfoliating' && (
            <div className="flex justify-between">
              <span className="text-charcoal-light">Exfoliating Botanical Scrub Addon</span>
              <span className="font-bold text-charcoal">₹50</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-charcoal-light">Standard Delivery (Pan-India)</span>
            <span className="font-bold text-status-success">FREE</span>
          </div>
          <div className="border-t border-primary/10 pt-3 flex justify-between items-center text-base">
            <span className="font-poppins font-bold text-charcoal">Total Payable</span>
            <span className="font-poppins font-extrabold text-2xl text-secondary">₹{order.price}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handlePayment}
            disabled={paymentProcessing}
            className="w-full bg-primary text-cream py-4 rounded-large font-poppins font-bold text-lg hover:bg-primary-dark transition-all shadow-medium hover:shadow-large flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>💳 {paymentProcessing ? 'Processing...' : `Pay ₹${order.price} via Razorpay`}</span>
          </button>

          <button
            onClick={() => router.push('/questionnaire')}
            className="w-full py-3 border-2 border-primary/20 text-primary rounded-large font-poppins font-bold text-sm hover:bg-cream transition"
          >
            Edit Diagnostic Answers
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
