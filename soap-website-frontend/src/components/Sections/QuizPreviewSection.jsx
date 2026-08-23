// src/components/Sections/QuizPreviewSection.jsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function QuizPreviewSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-primary-light/40 via-cream to-secondary-light/30 border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-secondary-dark font-poppins font-bold uppercase tracking-wider text-xs bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30">
              Interactive Diagnostic Engine
            </span>
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-charcoal leading-tight">
              Discover Your Custom Skincare Formula
            </h2>
            <p className="text-charcoal-light text-base font-inter leading-relaxed">
              Generic mass-market soaps use identical formulas for millions of people with completely different skin. Our 2-minute diagnostic evaluates your exact oil levels, sensitivity thresholds, and allergen exclusions.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Evaluates 4 primary skin profiles (Oily, Dry, Combo, Sensitive)',
                '100% exclusion guarantee for your specified allergen triggers',
                'Custom formulation matching certified dermatological recipes',
                'Options for silky creamy lather or gentle exfoliating botanical scrub',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-charcoal font-medium">
                  <span className="w-5 h-5 rounded-full bg-primary text-cream flex items-center justify-center text-xs font-bold shrink-0">
                    ✓
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/questionnaire"
                className="bg-primary text-cream px-8 py-4 rounded-large font-poppins font-bold text-sm sm:text-base hover:bg-primary-dark transition-all shadow-medium hover:shadow-large inline-flex items-center gap-2 group"
              >
                <span>Start Free Consultation</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Interactive Mock Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="bg-white rounded-extra p-6 sm:p-8 shadow-large border border-primary/15 relative">
              {/* Top Progress bar */}
              <div className="flex justify-between items-center text-xs font-poppins font-bold text-charcoal mb-4">
                <span className="text-secondary-dark uppercase tracking-wider">Diagnostic Preview</span>
                <span className="text-primary font-semibold">Question 1 of 5</span>
              </div>
              <div className="w-full bg-cream-dark rounded-full h-2 mb-6">
                <div className="bg-primary h-2 rounded-full w-1/4" />
              </div>

              {/* Mock Question */}
              <h3 className="text-xl font-poppins font-bold text-charcoal mb-4">
                What is your primary skin type?
              </h3>

              {/* Mock Options */}
              <div className="space-y-2.5 mb-6">
                {[
                  { title: 'Oily Skin', desc: 'Excess sebum, prone to blemishes', selected: true },
                  { title: 'Dry Skin', desc: 'Flaky, tight feeling, needs intense hydration', selected: false },
                  { title: 'Combination', desc: 'Oily T-zone with normal or dry cheeks', selected: false },
                  { title: 'Sensitive Skin', desc: 'Prone to redness, easily irritated', selected: false },
                ].map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    className={`p-3.5 rounded-large border transition-all flex items-center justify-between ${
                      opt.selected
                        ? 'border-primary bg-primary/10 shadow-subtle'
                        : 'border-cream-dark bg-cream/40 opacity-70'
                    }`}
                  >
                    <div>
                      <div className="font-poppins font-bold text-sm text-charcoal">
                        {opt.title}
                      </div>
                      <div className="text-xs text-charcoal-light">{opt.desc}</div>
                    </div>
                    {opt.selected && (
                      <span className="w-5 h-5 rounded-full bg-primary text-cream flex items-center justify-center text-xs">
                        ✓
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-cream-dark">
                <span className="text-xs text-charcoal-light font-medium">⚡ 2-minute diagnostic</span>
                <Link
                  href="/questionnaire"
                  className="text-xs font-poppins font-bold text-primary hover:text-primary-dark underline"
                >
                  Take Full Quiz Now →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
