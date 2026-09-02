// src/routes/coupons.js

const express = require('express');
const router = express.Router();
const { optionalAuth } = require('../middleware/auth');

// Available coupons
const ACTIVE_COUPONS = {
  WELCOME10: {
    code: 'WELCOME10',
    discountPercent: 10,
    minOrderAmount: 0,
    description: '10% Welcome Discount on all organic soaps'
  },
  ATISHAY20: {
    code: 'ATISHAY20',
    discountPercent: 20,
    minOrderAmount: 799,
    description: '20% off on orders above ₹799'
  }
};

// Validate coupon endpoint
router.post('/validate', optionalAuth, (req, res) => {
  try {
    const { code, cartTotal = 0 } = req.body;

    if (!code) {
      return res.status(400).json({ valid: false, error: 'Coupon code is required' });
    }

    const upperCode = code.trim().toUpperCase();
    const coupon = ACTIVE_COUPONS[upperCode];

    if (!coupon) {
      return res.status(404).json({
        valid: false,
        error: 'Invalid coupon code. Try WELCOME10 for 10% off.'
      });
    }

    if (cartTotal < coupon.minOrderAmount) {
      return res.status(400).json({
        valid: false,
        error: `Coupon applies only on cart totals above ₹${coupon.minOrderAmount}`
      });
    }

    const discountAmount = Math.round((cartTotal * coupon.discountPercent) / 100);

    return res.json({
      valid: true,
      code: coupon.code,
      discountPercent: coupon.discountPercent,
      discountAmount,
      description: coupon.description,
      message: `Coupon ${coupon.code} applied: -₹${discountAmount} (${coupon.discountPercent}% OFF)`
    });
  } catch (err) {
    console.error('Coupon validation error:', err);
    res.status(500).json({ valid: false, error: 'Failed to validate coupon' });
  }
});

module.exports = router;
