// src/services/emailService.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'test@gmail.com',
    pass: process.env.GMAIL_PASSWORD || 'app_password'
  }
});

const sendWelcomeEmail = async (user) => {
  try {
    const mailOptions = {
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yoursoap.com',
      to: user.email,
      subject: 'Welcome to Our Soap Shop! 🧼',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #6B4423;">Welcome, ${user.name}!</h2>
          <p>We're excited to create the perfect custom soap tailored just for your skin type.</p>
          <p><a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/questionnaire" style="background-color: #D4AF37; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Start Your Questionnaire</a></p>
          <p>Questions? Check our <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/faq">FAQ page</a></p>
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
    const mailOptions = {
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yoursoap.com',
      to: order.user ? order.user.email : 'customer@example.com',
      subject: `Your Custom Soap Order Confirmed #${order.id.slice(0, 8)} ✓`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #6B4423;">Order Confirmed!</h2>
          <p>Hi ${order.user ? order.user.name : 'Customer'},</p>
          <p>Your personalized soap order has been successfully placed and confirmed.</p>
          
          <h3>Order Details:</h3>
          <ul>
            <li><strong>Order ID:</strong> ${order.id}</li>
            <li><strong>Skin Type:</strong> ${order.skinType}</li>
            <li><strong>Price:</strong> ₹${order.price}</li>
            <li><strong>Expected Delivery:</strong> ${order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : '3-5 business days'}</li>
          </ul>
          
          <div style="background-color: #fff3cd; border: 1px solid #ffeeba; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;"><strong>⚠️ Patch test recommended!</strong> Apply a small amount on your inner arm first and wait 24 hours to check for any skin irritation.</p>
          </div>
          
          <p><a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/orders/${order.id}" style="background-color: #6B4423; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Track Your Order</a></p>
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

    const mailOptions = {
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@yoursoap.com',
      to: order.user ? order.user.email : 'customer@example.com',
      subject: `${statusMessages[newStatus] || 'Order Update'} - Order #${order.id.slice(0, 8)}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #6B4423;">${statusMessages[newStatus] || 'Status Update'}</h2>
          <p>Hi ${order.user ? order.user.name : 'Customer'},</p>
          <p>Your order #${order.id} status has been updated to <strong>${newStatus}</strong>.</p>
          
          ${order.trackingNumber ? `
            <p><strong>Tracking Number:</strong> ${order.trackingNumber}</p>
          ` : ''}
          
          <p><a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard/orders/${order.id}" style="background-color: #6B4423; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Order Details</a></p>
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
