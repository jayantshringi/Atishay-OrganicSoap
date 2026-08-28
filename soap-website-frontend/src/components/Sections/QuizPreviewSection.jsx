// src/components/Sections/QuizPreviewSection.jsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useQuestionnaireStore } from '@/store/questionnaireStore';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Leaf,
  Droplets,
} from 'lucide-react';

export default function QuizPreviewSection() {
  const router = useRouter();
  const store = useQuestionnaireStore();
  const [selectedSkinType, setSelectedSkinType] = useState('oily');

  const options = [
    { value: 'oily', title: 'Oily & Acne-Prone', desc: 'Excess sebum, visible pores, breakouts' },
    { value: 'dry', title: 'Dry & Dehydrated', desc: 'Tight, flaky, needing deep lipid moisture' },
    { value: 'combination', title: 'Combination Skin', desc: 'Oily T-zone with normal or dry cheeks' },
    { value: 'sensitive', title: 'Sensitive & Reactive', desc: 'Prone to redness, easily irritated' },
  ];

  const handleSelectAndStart = (skinValue) => {
    setSelectedSkinType(skinValue);
    store.updateAnswer('skinType', skinValue);
    router.push('/questionnaire');
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-primary-light/40 via-cream to-secondary-light/30 border-y border-primary/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-secondary-dark font-poppins font-bold uppercase tracking-wider text-xs bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30 flex items-center gap-1.5 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Diagnostic Engine
            </span>

            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-charcoal leading-tight">
              Discover Your Custom Skincare Formula
            </h2>

            <p className="text-charcoal-light text-sm sm:text-base font-inter leading-relaxed">
              Generic mass-market soaps use identical formulas for millions of completely different skin types. Our 2-minute diagnostic evaluates your exact oil balance, sensitivity thresholds, and allergen exclusions.
            </p>

            <div className="space-y-3 pt-1 font-inter">
              {[
                'Evaluates 4 primary skin profiles (Oily, Dry, Combo, Sensitive)',
                '100% exclusion guarantee for your specified allergen triggers',
                'Custom formulation matching certified dermatological recipes',
                'Options for silky creamy lather or gentle exfoliating botanical scrub',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-charcoal font-medium">
                  <div className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <button
                onClick={() => {
                  store.updateAnswer('skinType', selectedSkinType);
                  router.push('/questionnaire');
                }}
                className="bg-primary text-cream px-8 py-4 rounded-large font-poppins font-bold text-sm sm:text-base hover:bg-primary-hover transition-all shadow-medium hover:shadow-large inline-flex items-center gap-2 group active:scale-95"
              >
                <span>Start Free Skin Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
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
                <span className="text-secondary-dark uppercase tracking-wider flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-primary" />
                  Live Diagnostic Teaser
                </span>
                <span className="text-primary font-semibold">Question 1 of 5</span>
              </div>
              <div className="w-full bg-cream-dark rounded-full h-2 mb-6">
                <div className="bg-primary h-2 rounded-full w-1/5" />
              </div>

              {/* Question Headline */}
              <h3 className="text-lg sm:text-xl font-poppins font-bold text-charcoal mb-4">
                What is your primary skin type?
              </h3>

              {/* Interactive Teaser Options */}
              <div className="space-y-2.5 mb-6 font-inter">
                {options.map((opt) => {
                  const isSelected = selectedSkinType === opt.value;
                  return (
                    <div
                      key={opt.value}
                      onClick={() => setSelectedSkinType(opt.value)}
                      className={`p-3.5 rounded-large border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-primary bg-primary/10 shadow-subtle'
                          : 'border-cream-dark bg-cream/30 hover:border-primary/40 hover:bg-cream/60'
                      }`}
                    >
                      <div>
                        <div className="font-poppins font-bold text-sm text-charcoal">
                          {opt.title}
                        </div>
                        <div className="text-xs text-charcoal-light">{opt.desc}</div>
                      </div>
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-primary text-cream flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-cream" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-cream-dark" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action */}
              <div className="flex justify-between items-center pt-3 border-t border-cream-dark">
                <span className="text-xs text-charcoal-light font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-status-success" />
                  Free 2-minute diagnostic
                </span>
                <button
                  onClick={() => handleSelectAndStart(selectedSkinType)}
                  className="text-xs font-poppins font-bold text-primary hover:text-primary-dark flex items-center gap-1 group"
                >
                  <span>Continue With Selected</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
