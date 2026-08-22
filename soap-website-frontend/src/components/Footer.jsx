// src/components/Footer.jsx

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12 mt-20 border-t-4 border-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-3">
            <h3 className="text-2xl font-poppins font-bold flex items-center gap-2">
              <span>🧼</span> SoapCo
            </h3>
            <p className="text-amber-100/80 text-sm leading-relaxed max-w-xs">
              Personalized organic melt-and-pour soaps handcrafted with natural ingredients like
              Haldi, Aloe Vera, Chandan &amp; Kesar for your skin.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-poppins font-bold text-accent mb-4 uppercase tracking-wider text-xs">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-amber-100/90">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/questionnaire" className="hover:text-accent transition-colors">
                  Take Questionnaire
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-poppins font-bold text-accent mb-4 uppercase tracking-wider text-xs">
              Legal &amp; Policy
            </h4>
            <ul className="space-y-2 text-sm text-amber-100/90">
              <li>
                <Link href="/faq" className="hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-accent transition-colors">
                  Shipping &amp; Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h4 className="font-poppins font-bold text-accent mb-4 uppercase tracking-wider text-xs">
              Connect With Us
            </h4>
            <p className="text-sm text-amber-100/80 mb-3">
              Questions? Email us at{' '}
              <a
                href="mailto:support@soapco.com"
                className="underline hover:text-accent transition-colors break-all"
              >
                support@soapco.com
              </a>
            </p>
            <div className="flex gap-4 text-sm font-medium flex-wrap">
              <a href="#" className="hover:text-accent transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                WhatsApp
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-amber-100/70">
          <p>© 2026 SoapCo India. All rights reserved.</p>
          <p className="mt-2 text-amber-200/90 font-medium max-w-2xl mx-auto">
            ⚠️ <strong>Patch Test Notice:</strong> Always perform a 24-hour patch test on your
            inner arm before full usage of any custom skincare product.
          </p>
        </div>
      </div>
    </footer>
  );
}
