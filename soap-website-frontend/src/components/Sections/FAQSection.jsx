// src/components/Sections/FAQSection.jsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

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
    <section className="py-16 sm:py-24 bg-cream border-t border-primary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 space-y-3"
        >
          <span className="text-secondary font-poppins font-bold uppercase tracking-wider text-xs">
            Answers &amp; Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-charcoal">
            Frequently Asked Questions
          </h2>
          <p className="text-charcoal-light text-sm sm:text-base font-inter">
            Everything you need to know about our personalized organic formulations and safety standards.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4 mb-10">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="bg-white border border-primary/15 rounded-large overflow-hidden shadow-subtle hover:shadow-medium transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-5 sm:p-6 text-left font-poppins font-bold text-charcoal hover:text-primary transition flex justify-between items-center text-sm sm:text-base"
              >
                <span>{faq.q}</span>
                <span className="text-primary text-xl font-bold ml-4 shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 sm:p-6 pt-0 text-sm text-charcoal-light font-inter border-t border-cream-dark leading-relaxed bg-cream/30">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-2 pt-2">
          <p className="text-xs sm:text-sm text-charcoal-light font-inter">
            Didn&apos;t find what you&apos;re looking for?
          </p>
          <Link
            href="/contact"
            className="text-primary font-poppins font-bold hover:text-primary-dark underline text-sm transition-colors"
          >
            Contact our skincare team directly →
          </Link>
        </div>
      </div>
    </section>
  );
}
