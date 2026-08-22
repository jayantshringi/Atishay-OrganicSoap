// src/app/faq/page.jsx

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'How does the custom soap matching process work?',
      a: 'You complete our 6-step skin questionnaire detailing your primary skin type (oily, dry, combination, sensitive), known allergies, skin targets, and texture preferences. Our backend algorithm filters out any allergen risks and matches your profile to a tested organic formulation.',
    },
    {
      q: 'Are your soaps safe for sensitive or allergic skin?',
      a: 'Yes! We explicitly filter out ingredients you mark as allergen risks (e.g. synthetic fragrances, nut oils, turmeric). However, because natural botanicals can occasionally cause unexpected contact reactions, a 24-hour patch test is mandatory before full application.',
    },
    {
      q: 'What is a patch test and how do I conduct it?',
      a: 'Apply a small amount of lather from your new soap bar to the inside of your elbow or wrist and rinse off. Wait 24 hours. If no redness, itching, or swelling occurs, the soap is safe for regular daily use on your face or body.',
    },
    {
      q: 'What base soap materials do you use?',
      a: 'We use high-grade 100% vegetable glycerine melt-and-pour base infused with organic extracts including Aloe Vera, Haldi (Turmeric), Chandan (Sandalwood), and Kesar (Saffron). Our bars contain no harsh parabens.',
    },
    {
      q: 'How long does shipping take within India?',
      a: 'Orders are handcrafted within 24 hours of payment verification and delivered within 3-5 business days across active service area postal codes in India.',
    },
    {
      q: 'What is your return or exchange policy?',
      a: 'Due to personal hygiene and safety guidelines, opened soap bars cannot be returned. If an unopened soap arrives damaged or if you receive an incorrect order, please contact our support team within 48 hours of delivery.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto my-12 px-4 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs font-poppins font-bold uppercase tracking-wider text-accent">Help Center & Safety</span>
        <h1 className="text-4xl font-poppins font-bold text-primary">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-text-muted max-w-xl mx-auto">
          Clear answers about custom soap formulation, ingredient safety, shipping, and patch testing.
        </p>
      </div>

      {/* Safety Notice Callout Banner */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 flex flex-col sm:flex-row items-start gap-4">
        <span className="text-3xl">⚠️</span>
        <div className="space-y-1">
          <h3 className="font-poppins font-bold text-amber-900 text-lg">Mandatory Patch Test Guidance</h3>
          <p className="text-sm text-amber-800 leading-relaxed">
            All natural skincare products carry a slight possibility of localized skin sensitivity. We strongly advise performing a 24-hour patch test on your inner arm before full usage.
          </p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white border border-amber-900/10 rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 text-left font-poppins font-bold text-primary hover:bg-neutral/40 transition flex justify-between items-center text-base"
            >
              <span>{faq.q}</span>
              <span className="text-accent text-2xl font-bold ml-4">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-6 pt-0 text-sm text-text-muted border-t border-gray-100 leading-relaxed bg-neutral/20">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center bg-white rounded-3xl p-8 border border-amber-900/10 shadow-sm space-y-4">
        <h3 className="text-xl font-poppins font-bold text-primary">Still Have Questions?</h3>
        <p className="text-sm text-text-muted max-w-md mx-auto">
          Our skincare experts are here to help you choose the right recipe for your skin.
        </p>
        <Link
          href="/contact"
          className="bg-accent text-white px-6 py-3 rounded-xl font-poppins font-bold hover:bg-accent-hover transition inline-block text-sm shadow-md"
        >
          Contact Customer Support →
        </Link>
      </div>
    </div>
  );
}
