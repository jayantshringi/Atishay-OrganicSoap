// src/components/Sections/FAQSection.jsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ArrowRight, Sparkles } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does the personalization algorithm choose my soap recipe?',
      a: 'Our diagnostic evaluates your answers regarding primary skin profile (oily, dry, combination, sensitive), your target goals (acne clarity, hydration, cooling, glow), and excludes every botanical allergen you specify. It matches you to a scientifically formulated recipe made with high-purity vegetable glycerine and certified herbal extracts.',
    },
    {
      q: 'Are your soaps 100% natural, paraben-free, and safe?',
      a: 'Yes. We use pure vegetable glycerine melt-and-pour bases blended with natural therapeutic botanicals (Haldi, Aloe Vera, Chandan, Kesar). We never include artificial parabens, phthalates, SLS, or synthetic detergents.',
    },
    {
      q: 'Why is a 24-hour patch test recommended for all orders?',
      a: 'Even with organic ingredients, natural botanicals like Sandalwood or Turmeric can occasionally trigger sensitivity in hyper-reactive skin. We provide a patch test guide with every order to ensure 100% safety before regular facial use.',
    },
    {
      q: 'What is the pricing and how long does delivery take?',
      a: 'Standard 125g custom soap bars start at ₹399 (or ₹449 for the gentle exfoliating botanical scrub edition). Orders are handcrafted within 24 hours of payment and delivered within 3-5 business days across India.',
    },
    {
      q: 'Can I re-order the exact same custom formula later?',
      a: 'Absolutely! Every custom recipe is permanently saved to your customer dashboard. You can re-order your exact matched recipe with a single click anytime.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-cream border-t border-primary/10 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <span className="text-secondary font-poppins font-bold uppercase tracking-wider text-xs bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30 flex items-center gap-1.5 w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            Answers &amp; Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-charcoal">
            Frequently Asked Questions
          </h2>
          <p className="text-charcoal-light text-sm sm:text-base font-inter">
            Everything you need to know about our bespoke organic formulations and safety standards.
          </p>
        </motion.div>

        {/* Accordion FAQ List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="bg-white border border-primary/15 rounded-large overflow-hidden shadow-subtle hover:shadow-medium transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left font-poppins font-bold text-charcoal hover:text-primary transition flex justify-between items-center text-sm sm:text-base"
                >
                  <span className="pr-4">{faq.q}</span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-primary text-cream rotate-180' : 'bg-cream text-charcoal'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 pt-0 text-xs sm:text-sm text-charcoal-light font-inter border-t border-cream-dark leading-relaxed bg-cream/20">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-2 pt-2">
          <p className="text-xs sm:text-sm text-charcoal-light font-inter">
            Have a specific skin allergy or custom formulation question?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-primary font-poppins font-bold hover:text-primary-dark underline text-sm transition-colors group"
          >
            <span>Speak directly with our skincare specialists</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
