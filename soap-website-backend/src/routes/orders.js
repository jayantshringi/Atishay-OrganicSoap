// src/routes/orders.js

const express = require('express');
const {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  updateOrder
} = require('../controllers/orderController');
const { authMiddleware, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Order placement supports authenticated users as well as guest COD checkout
router.post('/', optionalAuth, createOrder);

// User orders list
router.get('/', authMiddleware, getOrders);
router.get('/my', authMiddleware, getMyOrders);

// Single order details & update
router.get('/:orderId', optionalAuth, getOrderById);
router.put('/:orderId', authMiddleware, updateOrder);

module.exports = router;
