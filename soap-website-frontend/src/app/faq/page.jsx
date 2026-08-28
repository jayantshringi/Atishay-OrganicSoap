// src/app/faq/page.jsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'all', label: 'All Questions' },
    { key: 'formulation', label: 'Formulation' },
    { key: 'safety', label: 'Safety & Patch Test' },
    { key: 'shipping', label: 'Shipping & Delivery' },
    { key: 'returns', label: 'Returns & Policies' },
  ];

  const faqs = [
    {
      category: 'formulation',
      q: 'How does the custom soap matching process work?',
      a: 'You complete our 6-step diagnostic detailing your primary skin profile (oily, dry, combination, sensitive), known allergies, targeted skin goals, and texture preferences. Our algorithm filters out any allergen risks and matches your profile to a tested organic formulation.',
    },
    {
      category: 'safety',
      q: 'Are your soaps safe for sensitive or allergic skin?',
      a: 'Yes! We explicitly filter out ingredients you mark as allergen risks (e.g. synthetic fragrances, nut extracts, turmeric). However, because natural botanicals can occasionally cause unexpected contact reactions in ultra-sensitive individuals, a 24-hour patch test is mandatory before full application.',
    },
    {
      category: 'safety',
      q: 'What is a patch test and how do I conduct it?',
      a: 'Lather a small amount of your new soap bar onto the inside of your elbow or inner wrist, rinse off, and wait 24 hours. If no redness, itching, or swelling develops, the soap is verified safe for regular daily facial and body usage.',
    },
    {
      category: 'formulation',
      q: 'What base soap materials do you use?',
      a: 'We use high-grade 100% vegetable glycerine melt-and-pour base infused with pure organic botanical extracts including Aloe Vera, Haldi (Turmeric), Chandan (Sandalwood), and Kashmiri Kesar. Our bars contain zero parabens, SLS, or synthetic foaming agents.',
    },
    {
      category: 'shipping',
      q: 'How long does shipping take within India?',
      a: 'Orders are freshly handcrafted within 24 hours of payment verification and delivered within 3-5 business days across active service area postal codes in India.',
    },
    {
      category: 'returns',
      q: 'What is your return or exchange policy?',
      a: 'Due to personal hygiene and cosmetic safety standards, opened custom soap bars cannot be returned. If an unopened soap arrives damaged or if you receive an incorrect formulation, please contact our support team within 48 hours of delivery for a complimentary replacement.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto my-10 sm:my-14 px-4 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-poppins font-bold uppercase tracking-wider text-secondary bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30 flex items-center gap-1.5 w-fit mx-auto">
          <Sparkles className="w-3.5 h-3.5" />
          Knowledge Base &amp; Safety
        </span>
        <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-charcoal">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-light font-inter max-w-xl mx-auto">
          Comprehensive answers regarding custom formulation, ingredient safety, shipping, and patch testing.
        </p>
      </div>

      {/* Live Search Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-5 h-5 text-charcoal-muted absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search questions by keyword (e.g. allergies, patch test, glycerine)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-primary/20 rounded-extra text-xs sm:text-sm font-inter text-charcoal shadow-subtle focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-full text-xs font-poppins font-bold transition-all ${
              activeCategory === cat.key
                ? 'bg-primary text-cream shadow-subtle'
                : 'bg-white text-charcoal hover:bg-cream border border-primary/15'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Mandatory Patch Test Banner */}
      <div className="bg-secondary-light/30 border-2 border-secondary/40 rounded-extra p-6 flex flex-col sm:flex-row items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="font-poppins font-bold text-charcoal text-sm sm:text-base">
            Mandatory Patch Test Guidance
          </h3>
          <p className="text-xs text-charcoal-light font-inter leading-relaxed">
            All botanical skincare products carry a slight possibility of contact sensitivity in reactive skin profiles. We strongly recommend performing a 24-hour patch test on your inner arm prior to full facial application.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-3.5">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-extra border border-primary/15 p-6 space-y-2">
            <HelpCircle className="w-8 h-8 text-charcoal-muted mx-auto" />
            <p className="text-xs font-poppins font-semibold text-charcoal">
              No questions matched your search query.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-primary/15 rounded-large overflow-hidden shadow-subtle hover:shadow-medium transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left font-poppins font-bold text-charcoal hover:text-primary transition flex justify-between items-center text-xs sm:text-sm"
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
                      <div className="p-5 sm:p-6 pt-0 text-xs text-charcoal-light font-inter border-t border-cream-dark leading-relaxed bg-cream/20">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Support Card CTA */}
      <div className="text-center bg-white rounded-extra p-8 border border-primary/15 shadow-subtle space-y-3">
        <h3 className="text-lg font-poppins font-bold text-charcoal">Still Have Questions?</h3>
        <p className="text-xs text-charcoal-light font-inter max-w-md mx-auto">
          Our skincare experts are ready to assist you in formulating the ideal organic blend for your skin.
        </p>
        <Link
          href="/contact"
          className="bg-primary text-cream px-7 py-3 rounded-large font-poppins font-bold hover:bg-primary-hover transition inline-flex items-center gap-1.5 text-xs shadow-medium"
        >
          <span>Contact Customer Support</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
