// src/routes/orders.js

const express = require('express');
const { getOrders, getOrderById, updateOrder } = require('../controllers/orderController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, getOrders);
router.get('/:orderId', authMiddleware, getOrderById);
router.put('/:orderId', authMiddleware, updateOrder);

module.exports = router;
