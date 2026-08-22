// src/routes/payments.js

const express = require('express');
const { createOrder, verifyPayment, handleWebhook } = require('../controllers/paymentController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/create-order', authMiddleware, createOrder);
router.post('/verify', authMiddleware, verifyPayment);
router.post('/webhook', handleWebhook);

module.exports = router;
