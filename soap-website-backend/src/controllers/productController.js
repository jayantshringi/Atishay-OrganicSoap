// src/controllers/productController.js

const supabase = require('../config/supabase');

// Seeded flagship Ayurvedic organic soap products matching the 4 key categories:
// hydration, acne, sensitive, radiance
const SEED_PRODUCTS = [
  {
    id: 'prod_hydration_01',
    slug: 'aloe-vera-shea-hydration-bar',
    name: 'Aloe Vera & Shea Intense Hydration Bar',
    tagline: 'Deep moisture restoration with cooling natural aloe and raw shea butter',
    category: 'hydration',
    skinType: 'dry',
    price: 399,
    compareAtPrice: 499,
    rating: 4.9,
    numReviews: 38,
    stock: 25,
    image: '/images/products/aloe-vera.jpg',
    images: [
      '/images/products/aloe-vera.jpg',
      '/images/products/turmeric-haldi.jpg'
    ],
    shortDescription: 'Formulated for dry and parched skin, this melt-and-pour glycerine bar locks in 24-hour hydration without greasy residue.',
    description: 'Enriched with cold-pressed organic aloe vera leaf juice and unrefined African shea butter. Our botanical infusion replenishes moisture barriers while gently cleansing away environmental impurities. Pure vegetable glycerine ensures moisture retention and a smooth, creamy lather.',
    ingredients: [
      'Cold-Pressed Aloe Vera Gel',
      'Unrefined Shea Butter',
      'Pure Vegetable Glycerine',
      'Sweet Almond Oil',
      'Vitamin E (Tocopherol)',
      'Lavender Essential Oil'
    ],
    benefits: [
      'Restores skin moisture barrier',
      'Non-stripping pH 5.5 formulation',
      'Soothes dry patches and flakiness',
      '100% Sulfate & Paraben Free'
    ],
    createdAt: '2026-01-15T00:00:00.000Z'
  },
  {
    id: 'prod_acne_02',
    slug: 'haldi-neem-anti-acne-bar',
    name: 'Haldi & Neem Clarifying Anti-Acne Bar',
    tagline: 'Potent Ayurvedic antibacterial formulation to combat blemishes & excess sebum',
    category: 'acne',
    skinType: 'oily',
    price: 399,
    compareAtPrice: 449,
    rating: 4.8,
    numReviews: 52,
    stock: 30,
    image: '/images/products/turmeric-haldi.jpg',
    images: [
      '/images/products/turmeric-haldi.jpg',
      '/images/products/aloe-vera.jpg'
    ],
    shortDescription: 'Wild Kasturi turmeric and organic neem leaf extract work synergistically to purify pores and prevent breakouts.',
    description: 'Crafted with potent Kasturi Manjal (wild turmeric) known for non-staining antimicrobial brilliance, and steam-distilled neem oil. This bar regulates sebum production, calms active breakouts, and clarifies congested pores while preserving essential skin lipids.',
    ingredients: [
      'Wild Kasturi Turmeric (Haldi)',
      'Steam-Distilled Neem Extract',
      'Tea Tree Essential Oil',
      'Pure Vegetable Glycerine',
      'Cold-Pressed Jojoba Oil',
      'Activated Coconut Charcoal'
    ],
    benefits: [
      'Controls excess sebum and oily shine',
      'Antiseptic protection against acne bacteria',
      'Fades post-acne blemishes and marks',
      'Dermatologically tested gentle formula'
    ],
    createdAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'prod_sensitive_03',
    slug: 'sandalwood-chandan-soap',
    name: 'Sandalwood-Chandan Soap',
    tagline: 'Soothing Mysore Sandalwood for sensitive and irritated skin',
    category: 'sensitive',
    skinType: 'sensitive',
    price: 449,
    compareAtPrice: 549,
    rating: 4.8,
    numReviews: 60,
    stock: 35,
    image: '/images/products/sandalwood-chandan.png',
    images: ['/images/products/sandalwood-chandan.png'],
    shortDescription: 'Calming Mysore Chandan formulation designed to soothe irritation and provide a delicate, lingering woody aroma.',
    description: 'Experience the cooling and calming effects of authentic Mysore Sandalwood. This gentle formulation is perfect for sensitive skin types, helping to reduce redness and inflammation while delivering a classic, soothing woody fragrance.',
    ingredients: [
      'Mysore Sandalwood Extract',
      'Sandalwood Essential Oil',
      'Pure Vegetable Glycerine',
      'Aloe Vera Extract',
      'Vitamin E (Tocopherol)'
    ],
    benefits: [
      'Soothes irritated and sensitive skin',
      'Provides a natural cooling effect',
      'Leaves a lingering woody aroma',
      'Dermatologically tested gentle formula'
    ],
    createdAt: '2026-01-18T00:00:00.000Z'
  },
  {
    id: 'prod_radiance_04',
    slug: 'saffron-kesar-soap',
    name: 'Saffron Kesar Soap',
    tagline: 'Authentic Kashmiri Saffron for radiant and glowing skin',
    category: 'radiance',
    skinType: 'all',
    price: 499,
    compareAtPrice: 599,
    rating: 4.9,
    numReviews: 45,
    stock: 20,
    image: '/images/products/saffron-kesar.jpg',
    images: ['/images/products/saffron-kesar.jpg'],
    shortDescription: 'Infused with pure Kashmiri Kesar to gently lighten blemishes and promote a luminous complexion.',
    description: 'Our luxurious Saffron Kesar Soap is handcrafted with premium Kashmiri Saffron strands. Known for its skin-brightening properties, kesar naturally improves skin texture and evens out tone, while our pure vegetable glycerine base ensures your skin remains deeply moisturized.',
    ingredients: [
      'Kashmiri Saffron (Kesar)',
      'Pure Vegetable Glycerine',
      'Sweet Almond Oil',
      'Rose Water',
      'Vitamin E (Tocopherol)'
    ],
    benefits: [
      'Promotes natural skin radiance',
      'Helps even out skin tone',
      'Deeply moisturizes without clogging pores',
      '100% Sulfate & Paraben Free'
    ],
    createdAt: '2026-01-20T00:00:00.000Z'
  }
];

// Seeded reviews
let REVIEWS_STORE = [
  {
    id: 'rev_1',
    productId: 'prod_hydration_01',
    userName: 'Ananya Sharma',
    rating: 5,
    title: 'Incredible hydration for dry winter skin!',
    comment: 'I usually feel tight and dry after showers, but this Aloe Vera & Shea bar left my skin feeling silky soft without needing immediate heavy lotion. Smells heavenly!',
    createdAt: '2026-02-14T10:20:00.000Z'
  },
  {
    id: 'rev_2',
    productId: 'prod_hydration_01',
    userName: 'Rohan Gupta',
    rating: 5,
    title: 'Very gentle and long lasting',
    comment: 'The soap bar holds up well if kept on a wooden draining dish. Wonderful lather and pure ingredients.',
    createdAt: '2026-02-18T14:40:00.000Z'
  },
  {
    id: 'rev_3',
    productId: 'prod_acne_02',
    userName: 'Dr. Neha Verma',
    rating: 5,
    title: 'Reduced my hormonal breakouts in 2 weeks',
    comment: 'The combination of Haldi and Neem has completely calmed down the redness around my jawline. Plus it does not leave yellow stains on the skin.',
    createdAt: '2026-02-10T12:00:00.000Z'
  },
  {
    id: 'rev_4',
    productId: 'prod_sensitive_03',
    userName: 'Kavita Patel',
    rating: 5,
    title: 'Pure bliss for sensitive skin',
    comment: 'Zero irritation, zero fragrance burn. The sandalwood aroma is authentic and soothing. Will definitely subscribe!',
    createdAt: '2026-02-20T09:15:00.000Z'
  },
  {
    id: 'rev_5',
    productId: 'prod_radiance_04',
    userName: 'Pooja Iyer',
    rating: 5,
    title: 'Visible glow after 10 days',
    comment: 'The Kesar bar feels like a royal spa treatment every morning. My skin tone looks much more even.',
    createdAt: '2026-02-22T16:30:00.000Z'
  }
];

// Controller methods
const getProducts = async (req, res) => {
  try {
    const { category, skinType, search, sort = 'featured', page = 1, limit = 12 } = req.query;

    let productsList = SEED_PRODUCTS;

    // 1. Try fetching from Supabase products table
    if (supabase) {
      try {
        const { data: dbProducts, error } = await supabase.from('products').select('*');
        if (!error && dbProducts && dbProducts.length > 0) {
          productsList = dbProducts.map(p => ({
            id: p.id,
            slug: p.slug,
            name: p.name,
            tagline: p.tagline,
            category: p.category,
            skinType: p.skin_type || p.skinType,
            price: Number(p.price),
            compareAtPrice: p.compare_at_price ? Number(p.compare_at_price) : null,
            rating: Number(p.rating || 5.0),
            numReviews: Number(p.num_reviews || 0),
            stock: Number(p.stock || 50),
            image: p.image,
            images: Array.isArray(p.images) ? p.images : [p.image],
            shortDescription: p.short_description || p.shortDescription,
            description: p.description,
            ingredients: Array.isArray(p.ingredients) ? p.ingredients : [],
            benefits: Array.isArray(p.benefits) ? p.benefits : [],
            createdAt: p.created_at || new Date().toISOString()
          }));
        }
      } catch (dbErr) {
        console.warn('Supabase products fetch fallback to seed:', dbErr.message);
      }
    }

    let filtered = [...productsList];

    // Filter by Category
    if (category && category !== 'all') {
      filtered = filtered.filter(
        p => p.category.toLowerCase() === category.toLowerCase()
      );
    }// Skin type filter
    if (skinType) {
      filtered = filtered.filter(p => p.skinType.toLowerCase() === skinType.toLowerCase());
    }

    // Search query filter (matches name, tagline, description, ingredients)
    if (search) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.ingredients.some(ing => ing.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sort === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: featured / newest
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const total = filtered.length;
    const startIndex = (pageNum - 1) * limitNum;
    const paginated = filtered.slice(startIndex, startIndex + limitNum);

    return res.json({
      products: paginated,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = SEED_PRODUCTS.find(p => p.slug === slug || p.id === slug);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.json(product);
  } catch (err) {
    console.error('Error fetching product detail:', err);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
};

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = REVIEWS_STORE.filter(
      r => r.productId === productId || productId === 'all'
    );
    return res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

const addProductReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, title, comment, orderId } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ error: 'Rating and comment are required' });
    }

    const newReview = {
      id: `rev_${Date.now()}`,
      productId,
      userName: req.user?.name || 'Verified Customer',
      rating: Number(rating),
      title: title || 'Verified Purchase Review',
      comment,
      orderId: orderId || null,
      createdAt: new Date().toISOString()
    };

    REVIEWS_STORE.unshift(newReview);

    // Update product average rating
    const product = SEED_PRODUCTS.find(p => p.id === productId || p.slug === productId);
    if (product) {
      const prodReviews = REVIEWS_STORE.filter(r => r.productId === product.id);
      const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
      product.rating = Number(avg.toFixed(1));
      product.numReviews = prodReviews.length;
    }

    return res.status(201).json({
      message: 'Review submitted successfully',
      review: newReview
    });
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ error: 'Failed to submit review' });
  }
};

module.exports = {
  SEED_PRODUCTS,
  getProducts,
  getProductBySlug,
  getProductReviews,
  addProductReview
};
