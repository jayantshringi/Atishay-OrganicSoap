// src/routes/admin.js

const express = require('express');
const { getAnalyticsSummary, getAllOrders, updateOrderStatus } = require('../controllers/adminController');
const { adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/analytics/summary', adminMiddleware, getAnalyticsSummary);
router.get('/orders', adminMiddleware, getAllOrders);
router.post('/orders/:orderId/update-status', adminMiddleware, updateOrderStatus);

module.exports = router;
