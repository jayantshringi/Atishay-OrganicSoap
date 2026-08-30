// src/app/shop/page.jsx

'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuestionnaireStore } from '@/store/questionnaireStore';
import { questionnaireAPI } from '@/services/api';
import Toast from '@/components/Toast';
import {
  Sparkles,
  Star,
  Leaf,
  ShieldCheck,
  Award,
  CheckCircle2,
  Droplets,
  Heart,
  Eye,
  ShoppingBag,
  ArrowRight,
  Filter,
  Search,
  Check,
  Flame,
  Flower2,
  HeartHandshake,
  AlertTriangle,
  Info,
  X,
  Truck,
  RotateCcw,
} from 'lucide-react';

export default function ShopPage() {
  const router = useRouter();
  const store = useQuestionnaireStore();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quickOrderProduct, setQuickOrderProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Quick Order Form State
  const [quickForm, setQuickForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const products = [
    {
      id: 'aloe-vera',
      name: 'Aloe Vera (Ghritkumari)',
      tagline: 'Deep Cellular Hydration & Soothing Barrier Repair',
      category: 'hydration',
      skinType: 'dry',
      skinLabel: 'Dry, Dehydrated & Flaky Skin',
      skinBadgeColor: 'bg-botanical-aloe/25 text-primary-darker border-botanical-aloe/60',
      price: 399,
      originalPrice: 499,
      weight: '125g Artisan Bar',
      rating: 4.9,
      reviewsCount: 328,
      badge: 'Best Seller',
      badgeColor: 'bg-primary text-cream',
      image: '/images/products/aloe-vera.jpg',
      botanicalName: 'Aloe barbadensis Miller',
      ayurvedicProperty: 'Sheetala (Intense Cooling) & Ropana (Healing)',
      latherType: 'Silk Velvet Hydrating Glide',
      aroma: 'Fresh Crisp Botanical Aloe & Dew',
      phLevel: '5.5 Skin Balanced',
      description:
        'Crafted from cold-pressed inner aloe leaf gel and organic coconut glycerine. Instantly relieves tightness, repairs the dermal lipid barrier, and delivers cellular moisture without heavy greasiness.',
      keyIngredients: [
        { name: 'Fresh Aloe Vera Gel', desc: 'Soothes inflammation, locks in deep cellular hydration' },
        { name: 'Pure Vegetable Glycerine', desc: 'Natural humectant attracting ambient moisture to skin' },
        { name: 'Organic Raw Shea Butter', desc: 'Rich in fatty acids to restore cracked skin barrier' },
        { name: 'Sweet Almond Oil & Vit E', desc: 'Nourishes dry patches with antioxidant protection' },
      ],
      idealFor: ['Tight or flaky skin after bathing', 'Sun exposure & windburn recovery', 'Dry skin conditions and irritation'],
      howToUse: 'Lather between damp palms with warm water. Gently glide the rich creamy foam across face and body in circular motions. Rinse thoroughly and pat dry.',
    },
    {
      id: 'wild-turmeric',
      name: 'Wild Turmeric (Kasturi Haldi)',
      tagline: 'Anti-Bacterial Acne Defense & Clarifying Glow',
      category: 'clarifying',
      skinType: 'oily',
      skinLabel: 'Oily, Acne-Prone & Blemish-Prone',
      skinBadgeColor: 'bg-botanical-haldi/25 text-charcoal border-botanical-haldi/60',
      price: 399,
      originalPrice: 499,
      weight: '125g Artisan Bar',
      rating: 4.9,
      reviewsCount: 412,
      badge: 'Most Prescribed',
      badgeColor: 'bg-secondary text-charcoal',
      image: '/images/products/turmeric-haldi.jpg',
      botanicalName: 'Curcuma aromatica',
      ayurvedicProperty: 'Varnya (Complexion Enhancing) & Kushtaghna (Acne Clearing)',
      latherType: 'Rich Micro-Exfoliating Clarifying Foam',
      aroma: 'Warm Earthy Spice & Golden Botanical Notes',
      phLevel: '5.5 Skin Balanced',
      description:
        'Infused with authentic wild non-staining Kasturi Haldi and organic cold-pressed neem essence. Naturally destroys acne-causing bacteria, balances sebum output, and gently fades stubborn post-acne marks.',
      keyIngredients: [
        { name: 'Kasturi Haldi (Wild Turmeric)', desc: 'High-potency non-staining botanical with antimicrobial properties' },
        { name: 'Cold-Pressed Neem Extract', desc: 'Deep-cleans pores and curbs bacterial breakouts' },
        { name: 'Purified Tea Tree Essence', desc: 'Balances excess sebum and reduces redness' },
        { name: 'Organic Glycerine Matrix', desc: 'Cleanses deeply without stripping natural skin oils' },
      ],
      idealFor: ['Active acne breakouts and blackheads', 'Excess oiliness and congested pores', 'Post-blemish dark spots and pigmentation'],
      howToUse: 'Work into a rich golden lather. Massage onto face focusing on T-zone and blemish-prone areas for 45-60 seconds. Rinse with cool water.',
    },
    {
      id: 'pure-sandalwood',
      name: 'Pure Sandalwood (Chandan)',
      tagline: 'Ultra-Calming Redness Relief & Pore Balancing',
      category: 'calming',
      skinType: 'sensitive',
      skinLabel: 'Sensitive, Reactive & Heat-Flushed',
      skinBadgeColor: 'bg-botanical-chandan/40 text-charcoal border-botanical-chandan',
      price: 449,
      originalPrice: 549,
      weight: '125g Artisan Bar',
      rating: 5.0,
      reviewsCount: 264,
      badge: 'Ayurvedic Gold',
      badgeColor: 'bg-accent-dark text-cream',
      image: '/images/products/sandalwood-chandan.png',
      botanicalName: 'Santalum album',
      ayurvedicProperty: 'Pitta Shamaka (Heat Pacifying) & Prasadana (Purifying)',
      latherType: 'Gentle Hypoallergenic Velvet Lather',
      aroma: 'Subtle Sacred Sandalwood & Earthy Serenity',
      phLevel: '5.5 Skin Balanced',
      description:
        'Sourced from genuine Mysore sandalwood distillates and blended with cooling vetiver (khus) and pure rose hydrosol. Pacifies sudden flushing, alleviates heat rashes, tightens enlarged pores, and calms hypersensitive barriers.',
      keyIngredients: [
        { name: 'Mysore Sandalwood Extract', desc: 'Sacred anti-inflammatory agent that cools irritated nerve endings' },
        { name: 'Cooling Vetiver (Khus)', desc: 'Natural astringent that regulates facial temperature and oiliness' },
        { name: 'Steam-Distilled Rose Hydrosol', desc: 'Balances skin pH and soothes reactive redness' },
        { name: 'Hypoallergenic Glycerine Base', desc: 'Ultra-gentle formulation with zero synthetic irritants' },
      ],
      idealFor: ['Easily irritated or flushed skin', 'Rosacea-prone & heat rash tendencies', 'Pore tightening without stinging or tightness'],
      howToUse: 'Create a soft soothing lather in hands. Gently apply to sensitized skin without harsh rubbing. Rinse gently with lukewarm water.',
    },
    {
      id: 'kashmiri-saffron',
      name: 'Kashmiri Saffron (Kesar)',
      tagline: 'Luminous Cellular Radiance & Hyperpigmentation Care',
      category: 'glow',
      skinType: 'combination',
      skinLabel: 'Dull, Pigmented & Normal/Combination',
      skinBadgeColor: 'bg-botanical-kesar/25 text-charcoal border-botanical-kesar/60',
      price: 499,
      originalPrice: 599,
      weight: '125g Artisan Bar',
      rating: 5.0,
      reviewsCount: 389,
      badge: 'Luxury Signature',
      badgeColor: 'bg-botanical-kesar text-charcoal',
      image: '/images/products/saffron-kesar.jpg',
      botanicalName: 'Crocus sativus',
      ayurvedicProperty: 'Kanti Vardhaka (Complexion Radiance) & Rasayana',
      latherType: 'Creamy Golden Luminous Foam',
      aroma: 'Royal Kashmiri Saffron & Exotic Floral Bloom',
      phLevel: '5.5 Skin Balanced',
      description:
        'Infused with handpicked Grade-A Mongra Kashmiri Saffron stigmas, cold-pressed almond oil, and rich goat milk proteins. Boosts micro-circulation, fades stubborn dark patches, and restores an ethereal, lit-from-within glow.',
      keyIngredients: [
        { name: 'Grade-A Kashmiri Saffron (Mongra)', desc: 'Rich in Crocin antioxidants to revitalize dull skin tone' },
        { name: 'Cold-Pressed Sweet Almond Oil', desc: 'Enriched with Vitamin E to smooth fine texture' },
        { name: 'Pure Goat Milk Proteins', desc: 'Natural lactic acid to gently buff away dead cells without peeling' },
        { name: 'Vegetable Glycerine Complex', desc: 'Retains moisture while delivering luminous radiance' },
      ],
      idealFor: ['Dull or fatigued skin lacking natural luster', 'Uneven tan lines and stubborn hyperpigmentation', 'Enhancing festive glow and healthy radiance'],
      howToUse: 'Lather into a creamy golden foam. Massage gently into face and neck for 1 full minute to allow saffron bio-actives to absorb. Rinse thoroughly.',
    },
  ];

  const categories = [
    { key: 'all', label: 'All Soaps' },
    { key: 'hydration', label: 'Hydration & Dry' },
    { key: 'clarifying', label: 'Acne & Clarifying' },
    { key: 'calming', label: 'Sensitive & Calming' },
    { key: 'glow', label: 'Radiance & Glow' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.skinLabel.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
      });
  }, [products, activeCategory, searchQuery, sortBy]);

  const handleCustomizeFromShop = (product) => {
    store.updateAnswer('skinType', product.skinType);
    if (product.category === 'hydration') store.updateAnswer('mainConcern', 'dryness');
    if (product.category === 'clarifying') store.updateAnswer('mainConcern', 'acne');
    if (product.category === 'calming') store.updateAnswer('mainConcern', 'sensitivity');
    if (product.category === 'glow') store.updateAnswer('mainConcern', 'glow');

    router.push('/questionnaire');
  };

  const handleOpenQuickOrder = (product) => {
    setQuickOrderProduct(product);
    setOrderQuantity(1);
    // Pre-fill user data if available
    const savedName = localStorage.getItem('userName') || '';
    const savedEmail = localStorage.getItem('userEmail') || '';
    setQuickForm((prev) => ({
      ...prev,
      name: savedName || prev.name,
    }));
  };

  const handleConfirmQuickOrder = async (e) => {
    e.preventDefault();
    if (!quickForm.name || !quickForm.phone || !quickForm.address || !quickForm.city || !quickForm.postalCode) {
      setToastType('error');
      setToastMessage('Please complete all delivery fields to place your order.');
      return;
    }

    setIsPlacingOrder(true);
    try {
      const orderPayload = {
        skinType: quickOrderProduct.skinType,
        mainConcern: quickOrderProduct.category,
        texturePreference: 'soft',
        deliveryAddress: quickForm.address,
        deliveryCity: quickForm.city,
        deliveryPostalCode: quickForm.postalCode,
        deliveryPhone: quickForm.phone,
        customItems: [
          {
            soapId: quickOrderProduct.id,
            soapName: quickOrderProduct.name,
            quantity: orderQuantity,
            price: quickOrderProduct.price,
          },
        ],
      };

      const res = await questionnaireAPI.submit(orderPayload);
      const orderId = res.data.orderId;
      setQuickOrderProduct(null);
      setToastType('success');
      setToastMessage(`Order placed successfully! Order ID: ${orderId}`);
      setTimeout(() => {
        router.push(`/order-confirmation?orderId=${orderId}`);
      }, 1200);
    } catch (err) {
      setToastType('error');
      setToastMessage('Failed to submit order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-10">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <Toast
            message={toastMessage}
            type={toastType}
            onClose={() => setToastMessage('')}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-primary/15 via-secondary/15 to-primary/10 rounded-extra border border-primary/20 p-8 sm:p-12 overflow-hidden shadow-subtle text-center sm:text-left flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-poppins font-bold text-primary shadow-subtle">
              <Sparkles className="w-3.5 h-3.5 text-secondary animate-pulse" />
              <span>Handcrafted In Small Batches • Ayush Evaluated</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-poppins font-extrabold text-charcoal tracking-tight leading-tight">
              Our Artisanal <span className="text-primary">Soap Shop</span>
            </h1>
            <p className="text-sm sm:text-base text-charcoal-light font-inter leading-relaxed">
              Explore our core quartet of pure Ayurvedic formulations. Each 125g luxury bar is handcrafted with pure vegetable glycerine, cold-pressed therapeutic oils, and zero synthetic fillers.
            </p>
          </div>

          {/* Quick Quiz CTA Card */}
          <div className="bg-white/95 backdrop-blur-md p-6 rounded-extra border border-primary/20 shadow-large text-center space-y-3 shrink-0 max-w-xs w-full">
            <div className="w-10 h-10 mx-auto rounded-full bg-primary/15 flex items-center justify-center text-primary">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-poppins font-bold text-sm text-charcoal">
              Not sure which soap suits you?
            </h3>
            <p className="text-xs text-charcoal-light font-inter">
              Answer 5 quick questions for a dermatologist-aligned prescription.
            </p>
            <Link
              href="/questionnaire"
              className="w-full flex items-center justify-center gap-2 bg-primary text-cream py-2.5 rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition shadow-subtle hover:shadow-medium active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-secondary-light" />
              <span>Take Free Skin Quiz</span>
            </Link>
          </div>
        </motion.div>

        {/* Filters, Search & Sort Bar */}
        <div className="bg-white/80 backdrop-blur-sm border border-primary/15 rounded-extra p-4 sm:p-5 shadow-subtle space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2 items-center">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-large text-xs font-poppins font-semibold transition-all shadow-subtle ${activeCategory === cat.key
                    ? 'bg-primary text-cream shadow-medium scale-102'
                    : 'bg-cream text-charcoal hover:bg-cream-dark border border-primary/10'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search botanical soaps..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-cream/70 border border-primary/15 rounded-large focus:outline-none focus:border-primary font-inter placeholder:text-charcoal-muted"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3.5 py-2 text-xs bg-cream/70 border border-primary/15 rounded-large focus:outline-none focus:border-primary font-poppins font-semibold text-charcoal cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-extra border border-primary/15 shadow-subtle hover:shadow-large transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Product Visual Card Header */}
              <div className="relative w-full aspect-square bg-cream overflow-hidden border-b border-primary/10">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-contain p-1.5 group-hover:scale-104 transition-transform duration-500"
                  priority={index < 2}
                />

                {/* Quick View Button */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-charcoal hover:text-primary hover:bg-white p-2 rounded-full shadow-medium transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                  title="Quick View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Product Info Section */}
              <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  {/* Rating & pH */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-secondary text-xs font-poppins font-bold">
                      <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                      <span>{product.rating}</span>
                      <span className="text-charcoal-muted font-normal text-[11px]">
                        ({product.reviewsCount})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-poppins font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {product.phLevel}
                      </span>
                      <span className="text-[10px] font-inter text-charcoal-muted">
                        {product.weight}
                      </span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-poppins font-bold uppercase tracking-wider ${product.badgeColor}`}
                    >
                      {product.badge}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10.5px] font-poppins font-semibold border ${product.skinBadgeColor}`}
                    >
                      {product.skinLabel}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    onClick={() => setSelectedProduct(product)}
                    className="text-base font-poppins font-bold text-charcoal group-hover:text-primary transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-charcoal-light font-inter line-clamp-2 leading-relaxed">
                    {product.tagline}
                  </p>

                  <div className="pt-1">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-poppins font-semibold border ${product.skinBadgeColor}`}
                    >
                      {product.skinLabel}
                    </span>
                  </div>
                </div>

                {/* Pricing & CTA Actions */}
                <div className="pt-3 border-t border-cream-dark space-y-2.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-charcoal-muted uppercase font-bold block">
                        Direct Price
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-poppins font-extrabold text-charcoal">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-charcoal-muted line-through font-inter">
                          ₹{product.originalPrice}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenQuickOrder(product)}
                      className="bg-secondary text-charcoal font-poppins font-bold text-xs px-3.5 py-2 rounded-large hover:bg-secondary-hover transition-all shadow-subtle flex items-center gap-1.5 active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Order Bar</span>
                    </button>
                  </div>

                  <button
                    onClick={() => handleCustomizeFromShop(product)}
                    className="w-full flex items-center justify-center gap-1 text-[11px] font-poppins font-bold text-primary hover:text-primary-hover hover:underline transition py-1"
                  >
                    <Sparkles className="w-3 h-3 text-secondary" />
                    <span>Customize For Your Allergies &rarr;</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quality Standard Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/70 rounded-extra border border-primary/15 shadow-subtle">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-large bg-primary/15 flex items-center justify-center text-primary shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-xs text-charcoal">100% Organic Base</h4>
              <p className="text-[11px] text-charcoal-light font-inter">Pure vegetable glycerine</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-large bg-secondary/20 flex items-center justify-center text-secondary-dark shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-xs text-charcoal">Derm Evaluated</h4>
              <p className="text-[11px] text-charcoal-light font-inter">pH 5.5 Skin Balanced</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-large bg-primary/15 flex items-center justify-center text-primary shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-xs text-charcoal">Pan-India Express</h4>
              <p className="text-[11px] text-charcoal-light font-inter">Dispatches within 24h</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-large bg-secondary/20 flex items-center justify-center text-secondary-dark shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-poppins font-bold text-xs text-charcoal">Purity Guaranteed</h4>
              <p className="text-[11px] text-charcoal-light font-inter">Zero parabens &amp; sulfates</p>
            </div>
          </div>
        </div>

        {/* Why Choose Our Handcrafted Soaps Comparison */}
        <div className="bg-cream-light border border-primary/20 rounded-extra p-8 sm:p-10 shadow-medium space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-secondary font-poppins font-bold uppercase tracking-wider text-xs bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30">
              The Pure Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-charcoal">
              Commercial Synthetic Bars vs. Atishay Artisan Bars
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Commercial */}
            <div className="p-6 rounded-extra bg-white/60 border border-status-error/20 space-y-4">
              <div className="flex items-center gap-2 text-status-error font-poppins font-bold text-sm">
                <X className="w-4 h-4" />
                <span>Commercial Mass-Market Soaps</span>
              </div>
              <ul className="space-y-2.5 text-xs text-charcoal-light font-inter">
                <li className="flex items-start gap-2">
                  <span className="text-status-error font-bold">•</span>
                  <span>Harsh SLS/SLES synthetic detergents that strip moisture barrier</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-status-error font-bold">•</span>
                  <span>High alkaline pH (9.0 - 10.5) triggering flaking and breakouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-status-error font-bold">•</span>
                  <span>Artificial synthetic perfumes, mineral oils, and paraben preservatives</span>
                </li>
              </ul>
            </div>

            {/* Atishay */}
            <div className="p-6 rounded-extra bg-primary/10 border border-primary/30 space-y-4 shadow-subtle">
              <div className="flex items-center gap-2 text-primary-dark font-poppins font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Atishay Handcrafted Ayurvedic Bars</span>
              </div>
              <ul className="space-y-2.5 text-xs text-charcoal font-inter">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>100% Pure vegetable glycerine base that locks in natural moisture</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Physiological pH 5.5 skin-balanced to preserve the acid mantle</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>Real active botanicals (Haldi, Aloe, Chandan, Kesar) with zero irritants</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK VIEW PRODUCT MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl bg-white rounded-extra shadow-2xl border border-primary/20 overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-cream-dark/80 hover:bg-cream-dark flex items-center justify-center text-charcoal transition"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Image View - Full 1:1 Aspect Ratio */}
              <div className="w-full md:w-1/2 bg-cream-light p-4 sm:p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-primary/10 relative">
                <div className="relative w-full aspect-square max-w-[340px] rounded-extra overflow-hidden shadow-medium border border-primary/15 bg-white">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-1"
                    priority
                  />
                </div>
              </div>

              {/* Right Details View */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-poppins font-bold uppercase tracking-wider ${selectedProduct.badgeColor}`}
                    >
                      {selectedProduct.badge}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-poppins font-semibold border ${selectedProduct.skinBadgeColor}`}
                    >
                      {selectedProduct.skinLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-secondary text-xs font-poppins font-bold mb-1">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span>{selectedProduct.rating}</span>
                    <span className="text-charcoal-muted font-normal">
                      ({selectedProduct.reviewsCount} customer reviews)
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-poppins font-extrabold text-charcoal">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-xs text-primary font-poppins italic mt-0.5">
                    {selectedProduct.botanicalName} • {selectedProduct.ayurvedicProperty}
                  </p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-poppins font-extrabold text-charcoal">
                    ₹{selectedProduct.price}
                  </span>
                  <span className="text-sm text-charcoal-muted line-through">
                    ₹{selectedProduct.originalPrice}
                  </span>
                  <span className="text-xs text-status-success font-poppins font-bold bg-status-success/15 px-2 py-0.5 rounded-full">
                    Save ₹{selectedProduct.originalPrice - selectedProduct.price}
                  </span>
                </div>

                <p className="text-xs text-charcoal-light font-inter leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Key Ingredients breakdown */}
                <div className="space-y-2 pt-2 border-t border-cream-dark">
                  <h4 className="text-xs font-poppins font-bold text-charcoal uppercase tracking-wider">
                    Key Botanical Bio-Actives
                  </h4>
                  <div className="space-y-1.5">
                    {selectedProduct.keyIngredients.map((ing, idx) => (
                      <div key={idx} className="text-[11.5px] font-inter">
                        <strong className="text-charcoal">{ing.name}:</strong>{' '}
                        <span className="text-charcoal-light">{ing.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-cream-dark space-y-2">
                  <button
                    onClick={() => {
                      const prod = selectedProduct;
                      setSelectedProduct(null);
                      handleOpenQuickOrder(prod);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-secondary text-charcoal py-3 rounded-large font-poppins font-bold text-xs hover:bg-secondary-hover transition shadow-subtle active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Proceed to Order (₹{selectedProduct.price})</span>
                  </button>

                  <button
                    onClick={() => handleCustomizeFromShop(selectedProduct)}
                    className="w-full flex items-center justify-center gap-2 bg-primary text-cream py-3 rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition shadow-subtle active:scale-98"
                  >
                    <Sparkles className="w-4 h-4 text-secondary-light" />
                    <span>Customize This Bar for Your Skin</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QUICK ORDER MODAL */}
      <AnimatePresence>
        {quickOrderProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickOrderProduct(null)}
              className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-extra shadow-2xl border border-primary/20 overflow-hidden z-10 p-6 sm:p-8 space-y-6"
            >
              <button
                onClick={() => setQuickOrderProduct(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream-dark/80 hover:bg-cream-dark flex items-center justify-center text-charcoal transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div>
                <span className="text-secondary font-poppins font-bold uppercase tracking-wider text-[10px] bg-secondary/15 px-2.5 py-0.5 rounded-full">
                  Quick Express Checkout
                </span>
                <h3 className="text-xl font-poppins font-extrabold text-charcoal mt-1">
                  Order {quickOrderProduct.name}
                </h3>
              </div>

              {/* Product Brief Summary */}
              <div className="flex items-center gap-3 p-3 bg-cream rounded-large border border-primary/15">
                <div className="relative w-14 h-14 rounded-default overflow-hidden shrink-0 border border-primary/20">
                  <Image
                    src={quickOrderProduct.image}
                    alt={quickOrderProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-poppins font-bold text-xs text-charcoal">
                    {quickOrderProduct.name}
                  </h4>
                  <span className="text-[11px] text-charcoal-light font-inter">
                    ₹{quickOrderProduct.price} • {quickOrderProduct.weight}
                  </span>
                </div>
                {/* Quantity Control */}
                <div className="flex items-center gap-2 border border-primary/20 rounded-large bg-white px-2 py-1">
                  <button
                    type="button"
                    onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                    className="text-xs font-bold text-charcoal px-1 hover:text-primary"
                  >
                    -
                  </button>
                  <span className="text-xs font-poppins font-bold text-charcoal w-4 text-center">
                    {orderQuantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setOrderQuantity(Math.min(10, orderQuantity + 1))}
                    className="text-xs font-bold text-charcoal px-1 hover:text-primary"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Delivery Details Form */}
              <form onSubmit={handleConfirmQuickOrder} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-poppins font-bold text-charcoal mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={quickForm.name}
                      onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-cream border border-primary/20 rounded-large focus:outline-none focus:border-primary font-inter"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-poppins font-bold text-charcoal mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={quickForm.phone}
                      onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-cream border border-primary/20 rounded-large focus:outline-none focus:border-primary font-inter"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-poppins font-bold text-charcoal mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House/Flat No., Street, Landmark"
                    value={quickForm.address}
                    onChange={(e) => setQuickForm({ ...quickForm, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-cream border border-primary/20 rounded-large focus:outline-none focus:border-primary font-inter"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-poppins font-bold text-charcoal mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="City"
                      value={quickForm.city}
                      onChange={(e) => setQuickForm({ ...quickForm, city: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-cream border border-primary/20 rounded-large focus:outline-none focus:border-primary font-inter"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-poppins font-bold text-charcoal mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Pincode"
                      value={quickForm.postalCode}
                      onChange={(e) => setQuickForm({ ...quickForm, postalCode: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-cream border border-primary/20 rounded-large focus:outline-none focus:border-primary font-inter"
                    />
                  </div>
                </div>

                {/* Total and Submit */}
                <div className="pt-3 border-t border-cream-dark flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-charcoal-muted uppercase font-bold block">
                      Total Payable
                    </span>
                    <span className="text-xl font-poppins font-extrabold text-charcoal">
                      ₹{quickOrderProduct.price * orderQuantity}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isPlacingOrder}
                    className="bg-primary text-cream px-6 py-2.5 rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition shadow-medium flex items-center gap-2 disabled:opacity-50"
                  >
                    {isPlacingOrder ? (
                      <span>Placing Order...</span>
                    ) : (
                      <>
                        <span>Confirm &amp; Place Order</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
