// src/components/Sections/IngredientsShowcase.jsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf,
  Sparkles,
  Droplets,
  CheckCircle2,
  Wind,
  ShieldCheck,
} from 'lucide-react';

export default function IngredientsShowcase() {
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
    },
  ];

  const filteredIngredients = ingredients.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="ingredients" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <span className="text-secondary font-poppins font-bold uppercase tracking-wider text-xs bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30">
            Hand-Harvested Botanicals
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-charcoal">
            Our Premium Botanical Extracts
          </h2>
          <p className="text-charcoal-light text-sm sm:text-base font-inter">
            Pure Indian botanical extracts cold-infused in 100% vegetable glycerine. Zero chemical fillers, sulfates, or parabens.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-poppins font-bold transition-all ${
                activeCategory === cat.key
                  ? 'bg-primary text-cream shadow-subtle'
                  : 'bg-cream text-charcoal hover:bg-cream-dark border border-primary/15'
              }`}
            >
              {cat.label}
            </button>
          ))}
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
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-cream/40 rounded-extra p-6 sm:p-7 border border-primary/20 shadow-subtle hover:shadow-large transition-all flex flex-col justify-between group"
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
                  <span className="text-[11px] font-serif italic text-charcoal-light/75 block mb-4">
                    {item.latinName}
                  </span>

                  {/* Sensory Profile Notes */}
                  <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 bg-white/70 rounded-large border border-primary/10 text-[11px] font-inter">
                    <div>
                      <span className="text-[9px] text-charcoal-muted uppercase font-bold block flex items-center gap-1">
                        <Wind className="w-2.5 h-2.5" /> Aroma
                      </span>
                      <span className="font-semibold text-charcoal truncate block">{item.aroma}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-charcoal-muted uppercase font-bold block flex items-center gap-1">
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
    </section>
  );
}
