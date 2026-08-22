// src/components/Sections/FAQSection.jsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does the personalization algorithm work?',
      a: 'Our quiz evaluates your reported skin type (oily, dry, combination, sensitive) and checks for any allergen triggers or ingredient exclusions you provide. It then selects a pre-formulated, dermatologist-tested recipe matching your skin concern.',
    },
    {
      q: 'Are your soaps 100% natural and safe?',
      a: 'We use high-purity melt-and-pour glycerine base with organic extracts like Aloe Vera, Haldi, Chandan, and Kesar. All soaps are free from parabens and harsh synthetic sulfates.',
    },
    {
      q: 'Why is a patch test strongly recommended?',
      a: 'Even with organic ingredients, natural botanicals like Turmeric or Sandalwood can occasionally trigger sensitivity in individuals. Applying a small amount on your inner arm for 24 hours verifies safe usage.',
    },
    {
      q: 'What are the pricing and shipping rates?',
      a: 'Standard soap bars are priced at ₹399 (or ₹449 for exfoliating texture). Delivery takes 3-5 business days across local delivery zones in India.',
    },
  ];

  return (
    <section className="py-20 bg-neutral/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 space-y-4"
        >
          <span className="text-accent font-bold uppercase tracking-wider text-xs">Got Questions?</span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-text-muted text-base">
            Everything you need to know about our custom formulation and ordering process.
          </p>
        </motion.div>

        <div className="space-y-4 mb-10">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white border border-amber-900/10 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-5 text-left font-poppins font-bold text-primary hover:bg-neutral/40 transition flex justify-between items-center text-base"
              >
                <span>{faq.q}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-accent text-2xl font-bold ml-4 inline-block"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-sm text-text-muted border-t border-gray-100 leading-relaxed bg-neutral/20">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/faq"
            className="text-primary font-bold hover:text-accent underline text-sm transition-colors"
          >
            View Full FAQ & Safety Guide →
          </Link>
        </div>
      </div>
    </section>
  );
}
