// src/services/emailService.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'test@gmail.com',
    pass: process.env.GMAIL_PASSWORD || 'app_password'
  }
});

// HTML escaping helper to prevent HTML and email injection attacks
const escapeHtml = (unsafe) => {
  if (unsafe === null || unsafe === undefined) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const sendWelcomeEmail = async (user) => {
  try {
    const safeName = escapeHtml(user.name);
    const safeEmail = escapeHtml(user.email);
    const frontendUrl = escapeHtml(process.env.FRONTEND_URL || 'http://localhost:3000');

    const mailOptions = {
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yoursoap.com',
      to: safeEmail,
      subject: 'Welcome to Our Soap Shop! 🧼',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #6B4423;">Welcome, ${safeName}!</h2>
          <p>We're excited to create the perfect custom soap tailored just for your skin type.</p>
          <p><a href="${frontendUrl}/questionnaire" style="background-color: #D4AF37; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Start Your Questionnaire</a></p>
          <p>Questions? Check our <a href="${frontendUrl}/faq">FAQ page</a></p>
        </div>
      `
    };

    return await transporter.sendMail(mailOptions);
  } catch (err) {
    console.warn('Email dispatch warning (transporter skipped or using dev credentials):', err.message);
    return null;
  }
};

const sendOrderConfirmationEmail = async (order) => {
  try {
    const recipientName = escapeHtml(order.user ? order.user.name : 'Customer');
    const recipientEmail = order.user?.email || 'customer@example.com';
    const safeOrderId = escapeHtml(order.id);
    const safeSkinType = escapeHtml(order.skinType);
    const safePrice = escapeHtml(order.price);
    const safeDeliveryDate = escapeHtml(order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : '3-5 business days');
    const frontendUrl = escapeHtml(process.env.FRONTEND_URL || 'http://localhost:3000');

    const mailOptions = {
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yoursoap.com',
      to: recipientEmail,
      subject: `Your Custom Soap Order Confirmed #${safeOrderId.slice(0, 8)} ✓`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #6B4423;">Order Confirmed!</h2>
          <p>Hi ${recipientName},</p>
          <p>Your personalized soap order has been successfully placed and confirmed.</p>
          
          <h3>Order Details:</h3>
          <ul>
            <li><strong>Order ID:</strong> ${safeOrderId}</li>
            <li><strong>Skin Type:</strong> ${safeSkinType}</li>
            <li><strong>Price:</strong> ₹${safePrice}</li>
            <li><strong>Expected Delivery:</strong> ${safeDeliveryDate}</li>
          </ul>
          
          <div style="background-color: #fff3cd; border: 1px solid #ffeeba; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;"><strong>⚠️ Patch test recommended!</strong> Apply a small amount on your inner arm first and wait 24 hours to check for any skin irritation.</p>
          </div>
          
          <p><a href="${frontendUrl}/dashboard/orders/${safeOrderId}" style="background-color: #6B4423; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Track Your Order</a></p>
        </div>
      `
    };

    return await transporter.sendMail(mailOptions);
  } catch (err) {
    console.warn('Email dispatch warning (transporter skipped or using dev credentials):', err.message);
    return null;
  }
};

const sendStatusUpdateEmail = async (order, newStatus) => {
  try {
    const statusMessages = {
      'in-production': '🏭 Your soap is being crafted just for you!',
      'shipped': '🚚 Your soap is on the way!',
      'delivered': '🎉 Your soap has arrived!'
    };

    const safeStatus = escapeHtml(newStatus);
    const safeStatusHeading = escapeHtml(statusMessages[newStatus] || 'Order Update');
    const recipientName = escapeHtml(order.user ? order.user.name : 'Customer');
    const recipientEmail = order.user?.email || 'customer@example.com';
    const safeOrderId = escapeHtml(order.id);
    const safeTracking = order.trackingNumber ? escapeHtml(order.trackingNumber) : '';
    const frontendUrl = escapeHtml(process.env.FRONTEND_URL || 'http://localhost:3000');

    const mailOptions = {
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yoursoap.com',
      to: recipientEmail,
      subject: `${safeStatusHeading} - Order #${safeOrderId.slice(0, 8)}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #6B4423;">${safeStatusHeading}</h2>
          <p>Hi ${recipientName},</p>
          <p>Your order #${safeOrderId} status has been updated to <strong>${safeStatus}</strong>.</p>
          
          ${safeTracking ? `
            <p><strong>Tracking Number:</strong> ${safeTracking}</p>
          ` : ''}
          
          <p><a href="${frontendUrl}/dashboard/orders/${safeOrderId}" style="background-color: #6B4423; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Order Details</a></p>
        </div>
      `
    };

    return await transporter.sendMail(mailOptions);
  } catch (err) {
    console.warn('Email dispatch warning (transporter skipped or using dev credentials):', err.message);
    return null;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendOrderConfirmationEmail,
  sendStatusUpdateEmail
};
