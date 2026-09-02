// src/routes/products.js

const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductBySlug,
  getProductReviews,
  addProductReview
} = require('../controllers/productController');
const { optionalAuth, authenticate } = require('../middleware/auth');

// Public endpoints
router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
router.get('/:productId/reviews', getProductReviews);

// Authenticated review submission
router.post('/:productId/reviews', authenticate, addProductReview);

module.exports = router;
