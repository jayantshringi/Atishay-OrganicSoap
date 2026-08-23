// src/app/faq/page.jsx

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'How does the custom soap matching process work?',
      a: 'You complete our 6-step diagnostic detailing your primary skin profile (oily, dry, combination, sensitive), known allergies, targeted skin goals, and texture preferences. Our algorithm filters out any allergen risks and matches your profile to a tested organic formulation.',
    },
    {
      q: 'Are your soaps safe for sensitive or allergic skin?',
      a: 'Yes! We explicitly filter out ingredients you mark as allergen risks (e.g. synthetic fragrances, nut extracts, turmeric). However, because natural botanicals can occasionally cause unexpected contact reactions in ultra-sensitive individuals, a 24-hour patch test is mandatory before full application.',
    },
    {
      q: 'What is a patch test and how do I conduct it?',
      a: 'Lather a small amount of your new soap bar onto the inside of your elbow or inner wrist, rinse off, and wait 24 hours. If no redness, itching, or swelling develops, the soap is verified safe for regular daily facial and body usage.',
    },
    {
      q: 'What base soap materials do you use?',
      a: 'We use high-grade 100% vegetable glycerine melt-and-pour base infused with pure organic botanical extracts including Aloe Vera, Haldi (Turmeric), Chandan (Sandalwood), and Kashmiri Kesar. Our bars contain zero parabens, SLS, or synthetic foaming agents.',
    },
    {
      q: 'How long does shipping take within India?',
      a: 'Orders are freshly handcrafted within 24 hours of payment verification and delivered within 3-5 business days across active service area postal codes in India.',
    },
    {
      q: 'What is your return or exchange policy?',
      a: 'Due to personal hygiene and cosmetic safety standards, opened custom soap bars cannot be returned. If an unopened soap arrives damaged or if you receive an incorrect formulation, please contact our support team within 48 hours of delivery for a complimentary replacement.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-poppins font-bold uppercase tracking-wider text-secondary">
          Knowledge Base &amp; Safety
        </span>
        <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-charcoal">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-charcoal-light font-inter max-w-xl mx-auto">
          Comprehensive answers on custom formulation, ingredient safety, shipping, and patch testing.
        </p>
      </div>

      {/* Safety Notice Callout Banner */}
      <div className="bg-secondary-light/40 border-2 border-secondary/40 rounded-extra p-6 sm:p-7 flex flex-col sm:flex-row items-start gap-4">
        <span className="text-3xl">⚠️</span>
        <div className="space-y-1">
          <h3 className="font-poppins font-bold text-charcoal text-lg">Mandatory Patch Test Guidance</h3>
          <p className="text-sm text-charcoal-light font-inter leading-relaxed">
            All botanical skincare products carry a slight possibility of contact sensitivity in reactive skin. We strongly recommend performing a 24-hour patch test on your inner arm prior to full facial use.
          </p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white border border-primary/15 rounded-large overflow-hidden shadow-subtle hover:shadow-medium transition-shadow">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 text-left font-poppins font-bold text-charcoal hover:text-primary transition flex justify-between items-center text-sm sm:text-base"
            >
              <span>{faq.q}</span>
              <span className="text-primary text-2xl font-bold ml-4">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-6 pt-0 text-sm text-charcoal-light font-inter border-t border-cream-dark leading-relaxed bg-cream/30">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center bg-white rounded-extra p-8 border border-primary/15 shadow-subtle space-y-4">
        <h3 className="text-xl font-poppins font-bold text-charcoal">Still Have Questions?</h3>
        <p className="text-sm text-charcoal-light font-inter max-w-md mx-auto">
          Our skincare experts are here to help you select or customize the perfect formulation.
        </p>
        <Link
          href="/contact"
          className="bg-primary text-cream px-7 py-3.5 rounded-large font-poppins font-bold hover:bg-primary-dark transition inline-block text-sm shadow-medium"
        >
          Contact Customer Support →
        </Link>
      </div>
    </div>
  );
}
