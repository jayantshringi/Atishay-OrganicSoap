// src/components/Footer.jsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  Leaf,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Mail,
  Send,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  const certifications = [
    { icon: Leaf, label: '100% Organic Base', sub: 'Pure Vegetable Glycerine' },
    { icon: ShieldCheck, label: 'Dermatologist Evaluated', sub: 'pH 5.5 Skin Balanced' },
    { icon: HeartHandshake, label: 'Cruelty-Free', sub: 'Zero Animal Testing' },
    { icon: Sparkles, label: 'Ayurvedic Botanicals', sub: 'Haldi, Aloe, Chandan, Kesar' },
  ];

  return (
    <footer className="bg-charcoal text-cream pt-16 pb-12 mt-20 border-t-4 border-secondary relative overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Top Certification Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/5 border border-cream/10 rounded-extra backdrop-blur-md">
          {certifications.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-large bg-primary/20 flex items-center justify-center text-primary-light shrink-0">
                <item.icon className="w-5 h-5 text-secondary-light" />
              </div>
              <div>
                <span className="font-poppins font-bold text-xs sm:text-sm text-cream block">
                  {item.label}
                </span>
                <span className="text-[11px] text-cream/60 font-inter block">
                  {item.sub}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Newsletter (Col 1-2) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-cream/20 bg-cream/95 group-hover:scale-105 transition-transform duration-300 shadow-medium shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Atishay Bespoke Organic Soaps"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-poppins font-bold text-cream tracking-tight leading-none group-hover:text-secondary transition-colors">
                  ATISHAY
                </span>
                <span className="text-[9.5px] font-inter uppercase tracking-widest text-secondary font-semibold mt-1">
                  Bespoke Organic Soaps • Est. 2026
                </span>
              </div>
            </Link>

            <p className="text-cream/70 text-sm leading-relaxed max-w-sm font-inter">
              Science-backed, dermatologist-evaluated personalized organic soap.
              Handcrafted in India with pure Haldi, Aloe Vera, Chandan, and Kesar customized for your unique skin profile.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-poppins font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Join Our Skincare Club
              </span>

              {subscribed ? (
                <div className="bg-status-success/20 border border-status-success/40 text-cream px-4 py-2.5 rounded-large text-xs font-poppins flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-status-success" />
                  <span>Welcome to the Atishay Skincare Club!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border border-cream/20 text-cream px-3.5 py-2.5 rounded-large text-xs flex-grow focus:outline-none focus:border-secondary placeholder:text-cream/40 font-inter"
                  />
                  <button
                    type="submit"
                    className="bg-secondary text-charcoal font-poppins font-bold px-4 py-2.5 rounded-large text-xs hover:bg-secondary-hover transition-all flex items-center gap-1.5 shadow-subtle shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-bold text-secondary mb-4 uppercase tracking-wider text-xs">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/80 font-normal font-inter">
              <li>
                <Link href="/" className="hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#bestsellers" className="hover:text-secondary transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="/#ingredients" className="hover:text-secondary transition-colors">
                  Ingredients
                </a>
              </li>
              <li>
                <Link href="/questionnaire" className="hover:text-secondary transition-colors font-semibold text-secondary flex items-center gap-1">
                  <span>Take Skin Quiz</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <a href="/#how-it-works" className="hover:text-secondary transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="font-poppins font-bold text-secondary mb-4 uppercase tracking-wider text-xs">
              Help &amp; Policies
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/80 font-normal font-inter">
              <li>
                <Link href="/faq" className="hover:text-secondary transition-colors">
                  Safety &amp; Patch Testing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-secondary transition-colors">
                  Shipping &amp; Delivery
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-secondary transition-colors">
                  Returns &amp; Replacement
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect / Social */}
          <div>
            <h4 className="font-poppins font-bold text-secondary mb-4 uppercase tracking-wider text-xs">
              Direct Inquiries
            </h4>
            <p className="text-sm text-cream/70 mb-3 font-inter">
              Skincare consultation hotline:
              <a
                href="mailto:support@atishay.com"
                className="block mt-1 underline hover:text-secondary text-cream font-medium break-all"
              >
                support@atishay.com
              </a>
            </p>
            <div className="flex gap-2 pt-2">
              <span className="px-3 py-1.5 bg-cream/10 rounded-default text-xs font-inter text-cream/80">
                Pan-India Express
              </span>
              <span className="px-3 py-1.5 bg-cream/10 rounded-default text-xs font-inter text-cream/80">
                Ayush Certified
              </span>
            </div>
          </div>
        </div>

        {/* Patch Test Warning and Copyright */}
        <div className="border-t border-cream/10 pt-8 text-center text-xs text-cream/60 space-y-3 font-inter">
          <div className="bg-white/5 border border-secondary/30 rounded-large p-4 max-w-2xl mx-auto text-cream/90 flex items-center justify-center gap-3">
            <AlertTriangle className="w-5 h-5 text-secondary shrink-0" />
            <p className="text-left text-xs leading-relaxed">
              <strong className="text-secondary">Mandatory Safety Guideline:</strong> Always perform a 24-hour patch test on your inner wrist before regular facial use of any bespoke botanical formulation.
            </p>
          </div>
          <p>© 2026 Atishay India. Handcrafted organic personalized skincare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
