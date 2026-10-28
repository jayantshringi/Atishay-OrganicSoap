// src/routes/quiz.js

const express = require('express');
const router = express.Router();
const { optionalAuth } = require('../middleware/auth');
const { SEED_PRODUCTS } = require('../controllers/productController');

// POST /api/quiz
router.post('/', optionalAuth, (req, res) => {
  try {
    const { skinType = 'combination', allergens = [], concerns = [] } = req.body;

    const lowerSkin = skinType.toLowerCase();
    const primaryConcern = (concerns[0] || '').toLowerCase();

    // SECURITY FIX: Never recommend a pre-manufactured product that contains a customer's known allergen.
    // Search for catalog items that are 100% free of the specified allergens.
    const hasAllergen = (product, allergenList) => {
      if (!allergenList || !Array.isArray(allergenList) || allergenList.length === 0) return false;
      return product.ingredients.some(ing =>
        allergenList.some(a => typeof a === 'string' && a.trim() && ing.toLowerCase().includes(a.trim().toLowerCase()))
      );
    };

    const safeProducts = SEED_PRODUCTS.filter(p => !hasAllergen(p, allergens));

    if (safeProducts.length === 0) {
      return res.json({
        success: true,
        matchedProduct: null,
        needsCustomFormulation: true,
        skinProfile: {
          skinType,
          concerns,
          allergens,
          rationale: 'All standard pre-made soaps contain one or more of your indicated allergens.'
        },
        recommendationNote: 'Because your profile includes specific allergies present in our standard catalog, we recommend our personalized questionnaire to formulate a 100% bespoke allergen-free soap bar.'
      });
    }

    let matchedProduct = null;
    let rationale = '';

    if (primaryConcern.includes('acne') || primaryConcern.includes('clarity') || lowerSkin === 'oily') {
      matchedProduct = safeProducts.find(p => p.category === 'acne') || safeProducts[0];
      rationale = 'Purifying antibacterial formula to clarify breakouts while strictly adhering to your allergen constraints.';
    } else {
      matchedProduct = safeProducts.find(p => p.category === 'hydration') || safeProducts[0];
      rationale = 'Hydrating botanical formula to nourish and replenish skin while strictly adhering to your allergen constraints.';
    }

    return res.json({
      success: true,
      matchedProduct,
      skinProfile: {
        skinType,
        concerns,
        allergens,
        rationale
      },
      recommendationNote: `Based on your ${skinType} skin profile and allergen preferences, our Ayurvedic algorithm recommends the ${matchedProduct.name}.`
    });
  } catch (err) {
    console.error('Quiz recommendation error:', err);
    res.status(500).json({ error: 'Failed to process quiz recommendations' });
  }
});

module.exports = router;
