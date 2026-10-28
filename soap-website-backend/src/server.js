// src/server.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Trust reverse proxy (Nginx, AWS ALB, Cloudflare, Vercel)
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet());

// General rate limiter for API endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // allow up to 300 requests per 15 minutes for general catalog browsing
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP, please try again after 15 minutes' }
});
app.use(limiter);

// Strict rate limiter for authentication endpoints (prevent brute-force attacks)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts. Please try again after 15 minutes.' }
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: '🧼 Atishay Organic Soap Backend is running',
    mode: 'COD-E-Commerce-Portfolio',
    timestamp: new Date()
  });
});

// Routes with targeted protection
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/coupons', require('./routes/coupons'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/questionnaire', require('./routes/questionnaire'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/admin', require('./routes/admin'));

// Error handling middleware (sanitized for production)
app.use((err, req, res, next) => {
  console.error('Server error handler caught:', err.stack || err.message);
  const isProd = process.env.NODE_ENV === 'production';
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: isProd && statusCode === 500 ? 'Internal Server Error' : (err.message || 'Internal Server Error')
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🧼 Atishay Backend server running on port ${PORT}`);
});

module.exports = app;
