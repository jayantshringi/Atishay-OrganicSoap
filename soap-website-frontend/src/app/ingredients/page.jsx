// src/app/ingredients/page.jsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Sparkles,
  Droplets,
  CheckCircle2,
  Wind,
  ShieldCheck,
  ArrowRight,
  Flame,
  Flower2,
  HeartHandshake,
  AlertCircle,
} from 'lucide-react';

export default function IngredientsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'all', label: 'All Botanicals' },
    { key: 'hydration', label: 'Hydration' },
    { key: 'clarifying', label: 'Acne & Clarifying' },
    { key: 'calming', label: 'Calming Care' },
    { key: 'glow', label: 'Radiance Glow' },
  ];

  const ingredients = [
    {
      id: 'aloe',
      category: 'hydration',
      name: 'Aloe Vera (Ghritkumari)',
      latinName: 'Aloe barbadensis Miller',
      tag: 'Deep Hydration & Soothing',
      colorBadge: 'bg-botanical-aloe/30 text-primary-darker border-botanical-aloe/60',
      aroma: 'Fresh Botanical Green',
      lather: 'Silk-Hydrating Velvet',
      benefits: [
        'Deep cellular hydration for tight, flaky skin',
        'Cools irritation and accelerates barrier repair',
        'Rich in vitamins A, C & E for cellular health',
      ],
      highlight: 'Best for Dry & Dehydrated Profiles',
      ayurvedicProperty: 'Sheetala (Cooling) & Ropana (Healing)',
    },
    {
      id: 'haldi',
      category: 'clarifying',
      name: 'Wild Turmeric (Kasturi Haldi)',
      latinName: 'Curcuma aromatica',
      tag: 'Anti-Bacterial & Anti-Acne',
      colorBadge: 'bg-botanical-haldi/25 text-charcoal border-botanical-haldi/60',
      aroma: 'Earthy Warm Spice',
      lather: 'Rich Clarifying Foam',
      benefits: [
        'Naturally eliminates acne-causing bacteria',
        'Fades blemish marks and evens skin tone',
        'Potent antioxidant anti-inflammatory shield',
      ],
      highlight: 'Best for Oily & Acne-Prone Profiles',
      ayurvedicProperty: 'Varnya (Complexion Enhancing) & Kushtaghna',
    },
    {
      id: 'chandan',
      category: 'calming',
      name: 'Pure Sandalwood (Chandan)',
      latinName: 'Santalum album',
      tag: 'Calming Redness & Sebum Balance',
      colorBadge: 'bg-botanical-chandan/40 text-charcoal border-botanical-chandan',
      aroma: 'Subtle Woody Sandalwood',
      lather: 'Gentle Hypoallergenic Glide',
      benefits: [
        'Instantly soothes redness, heat rashes, and flares',
        'Minimizes enlarged pores without stripping moisture',
        'Ancient therapeutic aromatherapeutic relaxation',
      ],
      highlight: 'Best for Sensitive & Reactive Profiles',
      ayurvedicProperty: 'Pitta Shamaka (Heat Pacifying) & Prasadana',
    },
    {
      id: 'kesar',
      category: 'glow',
      name: 'Kashmiri Saffron (Kesar)',
      latinName: 'Crocus sativus',
      tag: 'Radiance & Cellular Glow',
      colorBadge: 'bg-botanical-kesar/25 text-charcoal border-botanical-kesar/60',
      aroma: 'Luxurious Golden Floral',
      lather: 'Luminous Creamy Lather',
      benefits: [
        'Enhances natural luminosity and complexion glow',
        'Stimulates micro-circulation for healthy undertone',
        'Gentle cellular renewal without abrasive peeling',
      ],
      highlight: 'Best for Dull & Uneven Skin Profiles',
      ayurvedicProperty: 'Kanti Vardhaka (Luminosity Enhancer)',
    },
  ];

  const standards = [
    {
      title: '100% Vegetable Glycerine',
      desc: 'Plant-derived humectant base that naturally binds moisture to the stratum corneum without stripping.',
      icon: Droplets,
    },
    {
      title: 'Cold-Infused Extracts',
      desc: 'Herbal extracts processed at gentle low temperatures to preserve volatile bio-actives and antioxidants.',
      icon: Leaf,
    },
    {
      title: 'Zero Chemical Fillers',
      desc: 'No SLS, SLES, parabens, phthalates, synthetic hardening agents, or artificial foaming detergents.',
      icon: ShieldCheck,
    },
    {
      title: 'Dermatologist pH 5.5',
      desc: 'Formulated to align with the skin’s natural acid mantle to prevent barrier breakdown and irritation.',
      icon: HeartHandshake,
    },
  ];

  const filteredIngredients = ingredients.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto my-10 sm:my-14 px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-poppins font-bold uppercase tracking-wider text-secondary bg-secondary/15 px-3.5 py-1.5 rounded-full border border-secondary/30 flex items-center gap-1.5 w-fit mx-auto">
          <Leaf className="w-3.5 h-3.5" />
          Hand-Harvested Botanical Integrity
        </span>
        <h1 className="text-3xl sm:text-5xl font-poppins font-bold text-charcoal tracking-tight">
          Our Premium Botanical Extracts
        </h1>
        <p className="text-sm sm:text-base text-charcoal-light font-inter leading-relaxed">
          Pure Indian botanical extracts cold-infused in 100% vegetable glycerine. 
          Scientifically paired to nourish your specific skin barrier without synthetic detergents or harsh chemicals.
        </p>
      </div>

      {/* Standards & Purity Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {standards.map((std, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-white rounded-extra p-6 border border-primary/15 shadow-subtle flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-large bg-primary/10 text-primary flex items-center justify-center">
                <std.icon className="w-5 h-5" />
              </div>
              <h2 className="font-poppins font-bold text-sm sm:text-base text-charcoal">
                {std.title}
              </h2>
              <p className="text-xs text-charcoal-light font-inter leading-relaxed">
                {std.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-primary/10 pb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-poppins font-bold text-charcoal">
              Botanical Catalog
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-light font-inter">
              Explore the therapeutic benefits and sensory profile of each active botanical.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-xs font-poppins font-bold transition-all ${
                  activeCategory === cat.key
                    ? 'bg-primary text-cream shadow-subtle'
                    : 'bg-white text-charcoal hover:bg-cream border border-primary/15'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Botanical Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredIngredients.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-extra p-6 sm:p-7 border border-primary/20 shadow-subtle hover:shadow-large transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-poppins font-bold border ${item.colorBadge}`}>
                      {item.tag}
                    </span>
                    <div className="w-8 h-8 rounded-large bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-cream transition-colors">
                      <Leaf className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-poppins font-bold text-charcoal group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-[11px] font-serif italic text-charcoal-light/75 block mb-2">
                    {item.latinName}
                  </span>

                  <span className="text-[10px] font-poppins font-medium text-primary-dark/80 bg-primary/5 px-2 py-0.5 rounded-default block mb-4">
                    {item.ayurvedicProperty}
                  </span>

                  {/* Sensory Profile Notes */}
                  <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 bg-cream/50 rounded-large border border-primary/10 text-[11px] font-inter">
                    <div>
                      <span className="text-[9px] text-charcoal-muted uppercase font-bold flex items-center gap-1">
                        <Wind className="w-2.5 h-2.5" /> Aroma
                      </span>
                      <span className="font-semibold text-charcoal truncate block">{item.aroma}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-charcoal-muted uppercase font-bold flex items-center gap-1">
                        <Droplets className="w-2.5 h-2.5" /> Lather
                      </span>
                      <span className="font-semibold text-charcoal truncate block">{item.lather}</span>
                    </div>
                  </div>

                  {/* Benefits */}
                  <ul className="space-y-2 text-xs text-charcoal-light font-inter mb-4">
                    {item.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Highlight Badge */}
                <div className="pt-3 border-t border-primary/10">
                  <span className="text-[11px] font-poppins font-bold text-secondary-dark flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-secondary" />
                    <span>{item.highlight}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Safety and Formulation CTA Banner */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-darker rounded-extra p-8 sm:p-12 text-cream shadow-large flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <span className="text-xs font-poppins font-bold uppercase tracking-wider text-secondary-light bg-white/10 px-3 py-1 rounded-full inline-block border border-white/20">
            Personalized Formulation
          </span>
          <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-cream">
            Find the Perfect Botanical Blend for Your Skin
          </h2>
          <p className="text-xs sm:text-sm text-cream/80 font-inter leading-relaxed">
            Take our 2-minute diagnostic skin quiz. Our algorithm automatically filters out allergens and selects the ideal combination of botanical extracts for your skin type.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href="/questionnaire"
            className="bg-secondary text-charcoal px-7 py-3.5 rounded-large font-poppins font-bold hover:bg-secondary-hover transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shadow-medium"
          >
            <Sparkles className="w-4 h-4" />
            <span>Take Skin Quiz</span>
          </Link>
          <Link
            href="/faq"
            className="bg-white/15 text-cream border border-cream/25 px-6 py-3.5 rounded-large font-poppins font-semibold hover:bg-white/25 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
          >
            <span>FAQ &amp; Patch Testing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
