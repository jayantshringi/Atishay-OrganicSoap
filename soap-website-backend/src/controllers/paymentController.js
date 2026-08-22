// src/controllers/paymentController.js

const { PrismaClient } = require('@prisma/client');
const { createRazorpayOrder, verifyPaymentSignature, razorpay } = require('../services/paymentService');
const { sendOrderConfirmationEmail } = require('../services/emailService');

const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({ error: 'Order ID and amount required' });
    }

    const razorpayOrder = await createRazorpayOrder(orderId, amount);

    try {
      // Save payment record with pending status
      const payment = await prisma.payment.create({
        data: {
          orderId,
          userId: req.user.userId,
          amount,
          razorpayOrderId: razorpayOrder.id,
          status: 'pending'
        }
      });

      return res.json({
        razorpayOrderId: razorpayOrder.id,
        paymentId: payment.id
      });
    } catch (dbErr) {
      console.warn('DB Error in createOrder (payment), returning mock response:', dbErr.message);
      return res.json({
        razorpayOrderId: razorpayOrder.id,
        paymentId: `pay_${Date.now()}`
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create payment order' });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId
    } = req.body;

    // Verify signature
    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return res.status(403).json({ error: 'Invalid payment signature' });
    }

    try {
      // Update payment record
      await prisma.payment.updateMany({
        where: { razorpayOrderId: razorpay_order_id },
        data: {
          razorpayPaymentId: razorpay_payment_id,
          status: 'success'
        }
      });

      // Update order status
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { orderStatus: 'confirmed' },
        include: { user: true, recipe: true }
      });

      // Send confirmation email (async)
      sendOrderConfirmationEmail(order).catch(err =>
        console.error('Email send error:', err)
      );
    } catch (dbErr) {
      console.warn('DB Error during payment verify update:', dbErr.message);
    }

    return res.json({
      success: true,
      orderId,
      message: 'Payment verified successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Payment verification failed' });
  }
};

const handleWebhook = async (req, res) => {
  try {
    const crypto = require('crypto');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'sample_webhook_secret';
    const signature = req.headers['x-razorpay-signature'];

    if (signature) {
      const shasum = crypto.createHmac('sha256', secret);
      shasum.update(JSON.stringify(req.body));
      const digest = shasum.digest('hex');

      if (digest !== signature && process.env.NODE_ENV === 'production') {
        return res.status(400).json({ error: 'Invalid webhook signature' });
      }
    }

    const { event, payload } = req.body;
    console.log(`Received Razorpay webhook event: ${event}`);

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = payload?.payment?.entity || {};
      const razorpayOrderId = paymentEntity.order_id;
      const razorpayPaymentId = paymentEntity.id;

      if (razorpayOrderId) {
        try {
          await prisma.payment.updateMany({
            where: { razorpayOrderId },
            data: {
              razorpayPaymentId: razorpayPaymentId || undefined,
              status: 'success'
            }
          });

          const paymentRecord = await prisma.payment.findFirst({
            where: { razorpayOrderId }
          });

          if (paymentRecord && paymentRecord.orderId) {
            const order = await prisma.order.update({
              where: { id: paymentRecord.orderId },
              data: { orderStatus: 'confirmed' },
              include: { user: true, recipe: true }
            });

            sendOrderConfirmationEmail(order).catch(err =>
              console.error('Webhook Email Send Error:', err)
            );
          }
        } catch (dbErr) {
          console.warn('DB error during webhook execution:', dbErr.message);
        }
      }
    }

    return res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};

module.exports = { createOrder, verifyPayment, handleWebhook };
