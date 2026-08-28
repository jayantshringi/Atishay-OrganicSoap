// src/components/Sections/BrandStoryTrust.jsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  HeartHandshake,
  FlaskConical,
  Award,
  ShieldCheck,
  ArrowRight,
  Leaf,
} from 'lucide-react';

export default function BrandStoryTrust() {
  const pillars = [
    {
      icon: HeartHandshake,
      title: '100% Cruelty-Free',
      description: 'Zero animal testing. Formulated strictly with ethical, sustainable organic botanical oils.',
    },
    {
      icon: FlaskConical,
      title: 'Clinically Evaluated',
      description: 'Balanced pH 5.5 and allergen-evaluated recipes backed by cosmetic dermatology science.',
    },
    {
      icon: Award,
      title: 'Handmade In India',
      description: 'Fresh artisanal batches crafted locally in clean, temperature-controlled molds.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Harsh Sulfates',
      description: 'Free from parabens, phthalates, SLS, synthetic fragrances, and harsh toxic detergents.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-primary text-cream relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full border border-cream/10 pointer-events-none" />
      <div className="absolute -left-24 -top-24 w-96 h-96 rounded-full border border-cream/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="flex justify-center mb-2">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-secondary/40 bg-cream shadow-large">
              <Image
                src="/images/logo.png"
                alt="Atishay Botanical Seal"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <span className="text-secondary-light font-poppins font-bold uppercase tracking-wider text-xs bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-secondary-light" />
            Clean Ayurvedic Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-poppins font-bold text-cream">
            Why Discerning Customers Trust Atishay
          </h2>
          <p className="text-cream/80 text-sm sm:text-base font-inter leading-relaxed max-w-2xl mx-auto">
            We believe that no two skin profiles are identical. By merging ancient Indian Ayurveda with modern cosmetic science, we formulate bespoke soaps that actually treat your skin with dignity and care.
          </p>
        </motion.div>

        {/* 4 Trust Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -6 }}
                className="bg-primary-dark/60 border border-cream/15 rounded-extra p-6 sm:p-7 text-center space-y-3 backdrop-blur-md shadow-subtle hover:shadow-large transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 mx-auto flex items-center justify-center text-secondary-light">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-poppins font-bold text-cream">
                  {item.title}
                </h3>
                <p className="text-xs text-cream/70 font-inter leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout CTA */}
        <div className="text-center pt-2">
          <Link
            href="/questionnaire"
            className="bg-cream text-primary-dark px-8 py-4 rounded-large font-poppins font-bold text-sm sm:text-base hover:bg-white transition-all shadow-medium inline-flex items-center gap-2 group"
          >
            <span>Start Your Custom Formulation</span>
            <ArrowRight className="w-4 h-4 text-primary-dark group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
