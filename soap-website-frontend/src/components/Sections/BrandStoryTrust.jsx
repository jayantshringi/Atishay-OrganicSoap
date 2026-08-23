// src/components/Sections/BrandStoryTrust.jsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BrandStoryTrust() {
  const pillars = [
    {
      icon: '🐰',
      title: '100% Cruelty-Free',
      description: 'Never tested on animals. Formulated with ethical botanical sources.',
    },
    {
      icon: '🔬',
      title: 'Clinically Tested',
      description: 'Balanced pH and allergen-evaluated recipes backed by skincare science.',
    },
    {
      icon: '🧼',
      title: 'Handmade In India',
      description: 'Fresh artisanal batches crafted locally in clean, temperature-controlled molds.',
    },
    {
      icon: '🌿',
      title: 'Zero Harsh Sulfates',
      description: 'Free from parabens, phthalates, SLS, and artificial toxic preservatives.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-primary text-cream relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-cream/10 pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full border border-cream/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4"
        >
          <span className="text-secondary-light font-poppins font-bold uppercase tracking-wider text-xs">
            Clean Skincare Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-cream">
            Why Our Customers Love Us
          </h2>
          <p className="text-cream/80 text-base font-inter leading-relaxed max-w-2xl mx-auto">
            We believe that no two skin profiles are identical. By merging ancient Indian Ayurveda with modern cosmetic science, we formulate bespoke soaps that actually treat your skin with dignity and care.
          </p>
        </motion.div>

        {/* 4 Trust Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {pillars.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
              className="bg-primary-darker/40 border border-cream/15 rounded-extra p-6 text-center space-y-3 backdrop-blur-sm"
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <h3 className="text-lg font-poppins font-bold text-cream">
                {item.title}
              </h3>
              <p className="text-xs text-cream/70 font-inter leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout & CTA */}
        <div className="text-center pt-4">
          <Link
            href="/questionnaire"
            className="bg-cream text-primary-darker px-8 py-4 rounded-large font-poppins font-bold text-sm sm:text-base hover:bg-white hover:text-primary transition-all shadow-medium inline-block"
          >
            Start Your Custom Formulation →
          </Link>
        </div>
      </div>
    </section>
  );
}
