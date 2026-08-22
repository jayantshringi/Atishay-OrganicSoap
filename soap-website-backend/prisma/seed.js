// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Seed Ingredients
  const ingredients = [
    { name: 'aloe_vera', displayName: 'Aloe Vera', description: 'Deeply hydrating and soothing botanical extract', allergenRisk: false },
    { name: 'haldi', displayName: 'Haldi (Turmeric)', description: 'Anti-bacterial, brightening & acne defense', allergenRisk: true },
    { name: 'chandan', displayName: 'Chandan (Sandalwood)', description: 'Calming essential oil for sensitive skin', allergenRisk: false },
    { name: 'kesar', displayName: 'Kesar (Saffron)', description: 'Luxury antioxidant for natural skin radiance', allergenRisk: false },
    { name: 'glycerine_base', displayName: 'Organic Glycerine Base', description: 'Gentle, clear moisturizing bar base', allergenRisk: false },
  ];

  for (const ing of ingredients) {
    await prisma.ingredient.upsert({
      where: { name: ing.name },
      update: ing,
      create: ing,
    });
  }
  console.log('✅ Ingredients seeded.');

  // Seed Admin User
  const adminPasswordHash = await bcrypt.hash('AdminPass123!', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@soapco.com' },
    update: {},
    create: {
      email: 'admin@soapco.com',
      phone: '9998887770',
      name: 'SoapCo Admin',
      password: adminPasswordHash,
      role: 'admin',
      address: 'SoapCo HQ, Mumbai'
    },
  });
  console.log(`✅ Admin user seeded: ${adminUser.email} (Password: AdminPass123!)`);

  // Seed Recipes
  const recipes = [
    {
      id: 'rec_oily_haldi',
      name: 'Oily Skin Haldi Soap',
      skinType: 'oily',
      addressesConcern: 'acne',
      ingredients: JSON.stringify(['haldi', 'glycerine_base']),
      description: 'Turmeric-based soap for oily, acne-prone skin',
      allergenRisk: true,
      isPremium: false,
      isActive: true
    },
    {
      id: 'rec_dry_aloe',
      name: 'Dry Skin Hydration Soap',
      skinType: 'dry',
      addressesConcern: 'dryness',
      ingredients: JSON.stringify(['aloe_vera', 'chandan', 'glycerine_base']),
      description: 'Moisturizing soap for dry skin',
      allergenRisk: false,
      isPremium: false,
      isActive: true
    },
    {
      id: 'rec_sensitive_chandan',
      name: 'Sensitive Skin Calming Soap',
      skinType: 'sensitive',
      addressesConcern: 'sensitivity',
      ingredients: JSON.stringify(['chandan', 'aloe_vera', 'glycerine_base']),
      description: 'Gentle soap for sensitive skin',
      allergenRisk: false,
      isPremium: false,
      isActive: true
    },
    {
      id: 'rec_combo_balance',
      name: 'Combination Skin Balance Soap',
      skinType: 'combination',
      addressesConcern: 'general',
      ingredients: JSON.stringify(['haldi', 'aloe_vera', 'glycerine_base']),
      description: 'Balanced formula for combination skin',
      allergenRisk: true,
      isPremium: false,
      isActive: true
    },
    {
      id: 'rec_premium_kesar',
      name: 'Premium Luxury Soap',
      skinType: 'oily',
      addressesConcern: 'general',
      ingredients: JSON.stringify(['kesar', 'chandan', 'aloe_vera', 'glycerine_base']),
      description: 'Premium saffron and sandalwood soap',
      allergenRisk: false,
      isPremium: true,
      isActive: true
    }
  ];

  for (const rec of recipes) {
    await prisma.recipe.upsert({
      where: { id: rec.id },
      update: rec,
      create: rec
    });
  }
  console.log('✅ Recipes seeded.');

  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
