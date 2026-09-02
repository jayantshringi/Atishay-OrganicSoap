// src/routes/quiz.js

const express = require('express');
const router = express.Router();
const { optionalAuth } = require('../middleware/auth');
const { SEED_PRODUCTS } = require('../controllers/productController');

// POST /api/quiz
router.post('/', optionalAuth, (req, res) => {
  try {
    const { skinType = 'combination', allergens = [], concerns = [] } = req.body;

    let matchedProduct = null;
    let rationale = '';

    const lowerSkin = skinType.toLowerCase();
    const primaryConcern = (concerns[0] || '').toLowerCase();

    if (primaryConcern.includes('acne') || primaryConcern.includes('clarity') || lowerSkin === 'oily') {
      matchedProduct = SEED_PRODUCTS.find(p => p.category === 'acne') || SEED_PRODUCTS[1];
      rationale = 'Wild Kasturi Turmeric & Neem formula to clarify active breakouts and balance excess oil production.';
    } else {
      matchedProduct = SEED_PRODUCTS.find(p => p.category === 'hydration') || SEED_PRODUCTS[0];
      rationale = 'Aloe Vera & Shea formulation to replenish skin barrier moisture, soothe irritation, and promote lasting hydration.';
    }

    // Filter allergens from recommended ingredients if any specified
    const filteredIngredients = matchedProduct.ingredients.filter(ing => {
      return !allergens.some(allergen => ing.toLowerCase().includes(allergen.toLowerCase()));
    });

    return res.json({
      success: true,
      matchedProduct: {
        ...matchedProduct,
        ingredients: filteredIngredients
      },
      skinProfile: {
        skinType,
        concerns,
        allergens,
        rationale
      },
      recommendationNote: `Based on your ${skinType} skin profile and concerns, our Ayurvedic formulation algorithm recommends the ${matchedProduct.name}.`
    });
  } catch (err) {
    console.error('Quiz recommendation error:', err);
    res.status(500).json({ error: 'Failed to process quiz recommendations' });
  }
});

module.exports = router;
