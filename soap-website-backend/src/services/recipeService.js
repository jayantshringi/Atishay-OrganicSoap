// src/services/recipeService.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Pre-defined recipes
const PREDEFINED_RECIPES = [
  {
    name: 'Oily Skin Haldi Soap',
    skinType: 'oily',
    addressesConcern: 'acne',
    ingredients: JSON.stringify(['haldi', 'glycerine_base']),
    description: 'Turmeric-based soap for oily, acne-prone skin',
    allergenRisk: true,
    isPremium: false
  },
  {
    name: 'Dry Skin Hydration Soap',
    skinType: 'dry',
    addressesConcern: 'dryness',
    ingredients: JSON.stringify(['aloe_vera', 'chandan', 'glycerine_base']),
    description: 'Moisturizing soap for dry skin',
    allergenRisk: false,
    isPremium: false
  },
  {
    name: 'Sensitive Skin Calming Soap',
    skinType: 'sensitive',
    addressesConcern: 'sensitivity',
    ingredients: JSON.stringify(['chandan', 'aloe_vera', 'glycerine_base']),
    description: 'Gentle soap for sensitive skin',
    allergenRisk: false,
    isPremium: false
  },
  {
    name: 'Combination Skin Balance Soap',
    skinType: 'combination',
    addressesConcern: 'general',
    ingredients: JSON.stringify(['haldi', 'aloe_vera', 'glycerine_base']),
    description: 'Balanced formula for combination skin',
    allergenRisk: true,
    isPremium: false
  },
  {
    name: 'Premium Luxury Soap',
    skinType: 'oily',
    addressesConcern: 'general',
    ingredients: JSON.stringify(['kesar', 'chandan', 'aloe_vera', 'glycerine_base']),
    description: 'Premium saffron and sandalwood soap',
    allergenRisk: false,
    isPremium: true
  }
];

const matchRecipe = async (answers) => {
  try {
    let recipes = [];
    try {
      // Get all active recipes from DB if available
      recipes = await prisma.recipe.findMany({
        where: { isActive: true }
      });
    } catch (e) {
      console.warn('Prisma DB lookup skipped or failed, using predefined recipes in memory fallback.');
    }

    // If no recipes in DB, seed with predefined ones or use directly
    if (!recipes || recipes.length === 0) {
      try {
        for (const recipe of PREDEFINED_RECIPES) {
          await prisma.recipe.create({ data: recipe });
        }
        recipes = await prisma.recipe.findMany({ where: { isActive: true } });
      } catch (e) {
        recipes = PREDEFINED_RECIPES.map((r, idx) => ({ ...r, id: `recipe_${idx + 1}` }));
      }
    }

    // Filter by skin type
    let candidates = recipes.filter(r => r.skinType === answers.skinType);

    if (candidates.length === 0) {
      candidates = recipes; // Fallback to any recipe
    }

    // Filter out recipes with allergens
    if (answers.allergies && answers.allergies.length > 0) {
      candidates = candidates.filter(recipe => {
        try {
          const recipeIngredients = typeof recipe.ingredients === 'string' 
            ? JSON.parse(recipe.ingredients) 
            : recipe.ingredients;
          return !answers.allergies.some(allergen =>
            recipeIngredients.includes(allergen)
          );
        } catch (e) {
          return true;
        }
      });
    }

    if (candidates.length === 0) {
      candidates = recipes; // Fallback
    }

    // Score recipes based on concern and premium status
    const scored = candidates.map(recipe => {
      let score = 0;
      if (recipe.addressesConcern === answers.mainConcern) score += 10;
      if (recipe.isPremium) score += 2;
      return { ...recipe, score };
    });

    // Pick best recipe
    const selectedRecipe = scored.sort((a, b) => b.score - a.score)[0];

    return selectedRecipe || candidates[0];
  } catch (err) {
    console.error('Recipe matching error:', err);
    throw err;
  }
};

module.exports = { matchRecipe, PREDEFINED_RECIPES };
