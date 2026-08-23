// src/components/Sections/IngredientsShowcase.jsx

'use client';

import { motion } from 'framer-motion';

export default function IngredientsShowcase() {
  const ingredients = [
    {
      name: 'Aloe Vera (Ghritkumari)',
      tag: 'Hydration & Soothing',
      icon: '🪴',
      borderColor: 'border-botanical-aloe hover:border-primary',
      badgeBg: 'bg-botanical-aloe/40 text-primary-darker',
      benefits: [
        'Deep cellular hydration for dry & tight skin',
        'Cools irritation and calms redness',
        'Rich in vitamins C & E for barrier repair',
      ],
      highlight: 'Best for Dry & Sensitive Profiles',
    },
    {
      name: 'Haldi (Wild Turmeric)',
      tag: 'Anti-Bacterial & Glow',
      icon: '✨',
      borderColor: 'border-botanical-haldi hover:border-secondary-dark',
      badgeBg: 'bg-botanical-haldi/30 text-charcoal',
      benefits: [
        'Naturally clears acne-causing bacteria',
        'Fades dark spots and promotes even tone',
        'Potent antioxidant anti-inflammatory shield',
      ],
      highlight: 'Best for Oily & Acne-Prone Profiles',
    },
    {
      name: 'Chandan (Pure Sandalwood)',
      tag: 'Calming & Cooling',
      icon: '🪵',
      borderColor: 'border-botanical-chandan hover:border-accent',
      badgeBg: 'bg-botanical-chandan/50 text-charcoal',
      benefits: [
        'Soothes sunburn, allergies, and heat rashes',
        'Tightens pores and balances sebum levels',
        'Natural therapeutic soothing aroma',
      ],
      highlight: 'Best for Combination & Reactive Profiles',
    },
    {
      name: 'Kesar (Kashmiri Saffron)',
      tag: 'Radiance & Rejuvenation',
      icon: '🌸',
      borderColor: 'border-botanical-kesar hover:border-secondary',
      badgeBg: 'bg-botanical-kesar/30 text-charcoal',
      benefits: [
        'Enhances natural skin luminosity and glow',
        'Improves circulation for healthy complexion',
        'Gentle cell renewal without harsh peeling',
      ],
      highlight: 'Best for Dull & Aging Skin Profiles',
    },
  ];

  return (
    <section id="ingredients" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-3"
        >
          <span className="text-secondary font-poppins font-bold uppercase tracking-wider text-xs">
            Hand-Harvested Botanicals
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-charcoal">
            Our Premium Ingredients
          </h2>
          <p className="text-charcoal-light text-sm sm:text-base font-inter">
            Pure Indian botanical extracts infused in vegetable glycerine base. No fillers, parabens, or synthetic foam boosters.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {ingredients.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -8 }}
              className={`bg-cream/40 rounded-extra p-6 border-2 ${item.borderColor} shadow-subtle hover:shadow-medium transition-all flex flex-col justify-between group`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-poppins font-bold ${item.badgeBg}`}>
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-poppins font-bold text-charcoal mb-3 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>

                <ul className="space-y-2 text-xs text-charcoal-light font-inter mb-4">
                  {item.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-1.5">
                      <span className="text-primary font-bold">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-primary/10">
                <span className="text-[11px] font-poppins font-bold text-secondary-dark block">
                  ✦ {item.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
