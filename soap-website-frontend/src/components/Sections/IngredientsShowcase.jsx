// src/components/Sections/IngredientsShowcase.jsx

'use client';

import { motion } from 'framer-motion';

export default function IngredientsShowcase() {
  const ingredients = [
    {
      name: 'Aloe Vera (Gritkumari)',
      tag: 'Soothing & Hydrating',
      icon: '🪴',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      description:
        'Deeply hydrates dry skin, reduces inflammation, and leaves skin feeling supple and smooth.',
    },
    {
      name: 'Haldi (Turmeric)',
      tag: 'Anti-bacterial & Anti-Acne',
      icon: '✨',
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      description:
        'Natural antiseptic that targets acne-causing bacteria and imparts a natural, radiant glow.',
    },
    {
      name: 'Chandan (Sandalwood)',
      tag: 'Cooling & Calming',
      icon: '🪵',
      color: 'bg-orange-50 text-orange-800 border-orange-200',
      description:
        'Soothes redness and irritation, evens skin tone, and provides a pleasant calming aroma.',
    },
    {
      name: 'Kesar (Saffron)',
      tag: 'Brightening Luxury',
      icon: '🌸',
      color: 'bg-rose-50 text-rose-800 border-rose-200',
      description:
        'Rich in antioxidants, saffron brightens complexion and rejuvenates tired skin.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-neutral/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4"
        >
          <span className="text-accent font-bold uppercase tracking-wider text-xs">
            Pure Organic Extracts
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold text-primary">
            Our Key Organic Ingredients
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            We use high-purity melt-and-pour glycerine base infused with time-tested Indian herbal
            botanicals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {ingredients.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-900/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  className="text-3xl sm:text-4xl mb-4 inline-block transition-transform"
                >
                  {item.icon}
                </motion.div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-3 ${item.color}`}
                >
                  {item.tag}
                </span>
                <h3 className="text-lg sm:text-xl font-poppins font-bold text-primary mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
