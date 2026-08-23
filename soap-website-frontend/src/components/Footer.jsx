// src/components/Footer.jsx

'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream pt-16 pb-12 mt-20 border-t-4 border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Newsletter (Col 1-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-poppins font-bold flex items-center gap-2 text-cream">
              <span className="p-1 bg-primary/20 rounded-lg text-primary-light">🌿</span> Soap<span className="text-secondary">Co</span>
            </h3>
            <p className="text-cream/70 text-sm leading-relaxed max-w-sm font-inter">
              Science-backed, dermatologist-evaluated personalized organic soap.
              Handcrafted in India with pure Haldi, Aloe Vera, Chandan, and Kesar customized for your skin profile.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-poppins font-semibold uppercase tracking-wider text-secondary block mb-2">
                Join Our Skincare Club
              </span>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-charcoal-light/30 border border-cream/20 text-cream px-3.5 py-2.5 rounded-large text-xs flex-grow focus:outline-none focus:border-secondary placeholder:text-cream/40 font-inter"
                />
                <button
                  type="submit"
                  className="bg-secondary text-charcoal font-poppins font-bold px-4 py-2.5 rounded-large text-xs hover:bg-secondary-hover transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
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
                <a href="#bestsellers" className="hover:text-secondary transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#ingredients" className="hover:text-secondary transition-colors">
                  Ingredients
                </a>
              </li>
              <li>
                <Link href="/questionnaire" className="hover:text-secondary transition-colors font-medium text-secondary">
                  Take Skin Quiz ✨
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-secondary transition-colors">
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
                  Safety FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-secondary transition-colors">
                  Patch Test Guidance
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-secondary transition-colors">
                  Shipping &amp; Delivery Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-secondary transition-colors">
                  Privacy &amp; Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect / Social */}
          <div>
            <h4 className="font-poppins font-bold text-secondary mb-4 uppercase tracking-wider text-xs">
              Connect With Us
            </h4>
            <p className="text-sm text-cream/70 mb-3 font-inter">
              Questions? Reach out to us:
              <a
                href="mailto:support@soapco.com"
                className="block mt-1 underline hover:text-secondary text-cream/90 font-medium break-all"
              >
                support@soapco.com
              </a>
            </p>
            <div className="flex gap-2 text-sm font-medium flex-wrap pt-2">
              <a href="#" className="px-3 py-1.5 bg-cream/10 rounded-default hover:bg-secondary hover:text-charcoal transition-all text-xs font-inter">
                Instagram
              </a>
              <a href="#" className="px-3 py-1.5 bg-cream/10 rounded-default hover:bg-secondary hover:text-charcoal transition-all text-xs font-inter">
                WhatsApp
              </a>
              <a href="#" className="px-3 py-1.5 bg-cream/10 rounded-default hover:bg-secondary hover:text-charcoal transition-all text-xs font-inter">
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Patch Test Warning and Copyright */}
        <div className="border-t border-cream/10 mt-12 pt-8 text-center text-xs text-cream/60 space-y-3 font-inter">
          <div className="bg-charcoal-light/20 border border-cream/15 rounded-large p-3.5 max-w-2xl mx-auto text-cream/90">
            <span className="text-secondary font-bold mr-1">⚠️ Safety First:</span>
            Always perform a 24-hour patch test on your inner arm before regular facial or full-body use of any personalized skincare product.
          </div>
          <p>© 2026 SoapCo India. Handcrafted organic personalized skincare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
