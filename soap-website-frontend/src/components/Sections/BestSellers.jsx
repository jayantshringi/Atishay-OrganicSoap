// src/components/Sections/BestSellers.jsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BestSellers() {
  const products = [
    {
      id: 'haldi-acne',
      name: 'Haldi & Neem Clarifying Bar',
      skinType: 'Oily & Acne-Prone',
      skinTagColor: 'bg-botanical-haldi/20 text-charcoal border-botanical-haldi/40',
      description: 'Clinically balanced with turmeric extract to purge clogged pores without drying your natural moisture barrier.',
      price: 399,
      icon: '✨',
      badge: 'Bestseller',
      bgGradient: 'from-amber-100 to-amber-50',
    },
    {
      id: 'aloe-hydrate',
      name: 'Aloe Vera & Shea Butter Bar',
      skinType: 'Dry & Dehydrated',
      skinTagColor: 'bg-botanical-aloe/30 text-primary-darker border-botanical-aloe',
      description: 'Rich vegetable glycerine base infused with fresh aloe gel to relieve tightness and replenish moisture.',
      price: 399,
      icon: '🪴',
      badge: 'Most Loved',
      bgGradient: 'from-emerald-100 to-teal-50',
    },
    {
      id: 'chandan-calm',
      name: 'Chandan Soothing Therapy Bar',
      skinType: 'Sensitive & Redness',
      skinTagColor: 'bg-botanical-chandan/40 text-charcoal border-botanical-chandan',
      description: 'Formulated without synthetic fragrances or irritants. Pure sandalwood gently calms reactive skin.',
      price: 399,
      icon: '🪵',
      badge: 'Derm Favorite',
      bgGradient: 'from-orange-100 to-amber-50',
    },
    {
      id: 'kesar-glow',
      name: 'Kesar & Almond Exfoliating Bar',
      skinType: 'All Skin Types',
      skinTagColor: 'bg-botanical-kesar/30 text-charcoal border-botanical-kesar',
      description: 'Infused with Kashmiri saffron threads and gentle ground oatmeal scrub for radiant, silky smooth skin.',
      price: 449,
      icon: '🌸',
      badge: 'Premium Edition',
      bgGradient: 'from-rose-100 to-amber-50',
    },
  ];

  return (
    <section id="bestsellers" className="py-16 sm:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-3"
        >
          <span className="text-secondary font-poppins font-bold uppercase tracking-wider text-xs">
            Handcrafted Masterpieces
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-charcoal">
            Best Sellers &amp; Most Loved
          </h2>
          <p className="text-charcoal-light text-sm sm:text-base font-inter">
            Our most frequently prescribed customer recipes. Each can be tailored to match your specific allergies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-extra border border-primary/15 shadow-subtle hover:shadow-medium transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Product Visual Area */}
              <div className={`p-8 bg-gradient-to-b ${item.bgGradient} flex flex-col items-center justify-center relative border-b border-primary/10`}>
                <span className="absolute top-3 left-3 bg-secondary text-charcoal font-poppins font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-subtle shadow-subtle">
                  ⭐ {item.badge}
                </span>
                <motion.span
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-6xl my-4 block transition-transform cursor-pointer"
                >
                  {item.icon}
                </motion.span>
                <span className={`px-3 py-1 rounded-full text-xs font-poppins font-semibold border ${item.skinTagColor}`}>
                  {item.skinType}
                </span>
              </div>

              {/* Product Details Area */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <h3 className="text-lg font-poppins font-bold text-charcoal group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-charcoal-light font-inter mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-cream-dark flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-charcoal-light uppercase font-bold block">Formula Price</span>
                    <span className="text-xl font-poppins font-extrabold text-secondary">
                      ₹{item.price}
                    </span>
                  </div>
                  <Link
                    href="/questionnaire"
                    className="bg-primary text-cream px-4 py-2 rounded-large font-poppins font-bold text-xs hover:bg-primary-dark transition-all shadow-subtle"
                  >
                    Customize →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
