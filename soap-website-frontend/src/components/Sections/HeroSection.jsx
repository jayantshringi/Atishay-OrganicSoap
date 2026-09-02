// src/components/Sections/HeroSection.jsx

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Star,
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-primary-light/25 to-cream py-16 sm:py-20 lg:py-28">
      {/* Background Soft Floating Ambient Glows */}
      <div className="absolute -top-20 -right-20 w-80 h-80 sm:w-[450px] sm:h-[450px] bg-primary/20 rounded-full blur-3xl pointer-events-none animate-glow-1" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 sm:w-[450px] sm:h-[450px] bg-secondary/25 rounded-full blur-3xl pointer-events-none animate-glow-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-primary/20 text-primary-dark font-semibold text-xs sm:text-sm shadow-subtle backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>Ayurvedic Personalized Skincare • Cash on Delivery</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-bold text-charcoal leading-[1.12]"
            >
              Organic Soap{' '}
              <span className="text-primary relative inline-block">
                Tailored
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-secondary"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C50 3 150 3 197 9"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              For Your Unique Skin
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="text-base sm:text-lg text-charcoal-light font-normal leading-relaxed max-w-xl mx-auto lg:mx-0 font-inter"
            >
              Answer 5 quick clinical questions. Receive your bespoke vegetable glycerine soap bar infused with pure Kasturi Haldi, Aloe Vera, Mysore Chandan, or Kashmiri Kesar—100% free from your specified allergen triggers.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/quiz"
                className="bg-primary text-cream px-8 py-4 rounded-large font-poppins font-bold text-base hover:bg-primary-hover transition-all shadow-medium hover:shadow-large flex items-center justify-center gap-2 group w-full sm:w-auto active:scale-95"
              >
                <span>Take Skin Diagnostic</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/products"
                className="bg-white/90 text-charcoal border border-primary/20 px-7 py-4 rounded-large font-poppins font-semibold text-base hover:bg-cream-dark transition-all text-center flex items-center justify-center gap-2 w-full sm:w-auto shadow-subtle backdrop-blur-md hover:text-primary"
              >
                <ShoppingBag className="w-4 h-4 text-primary" />
                <span>Shop All Soaps</span>
              </Link>
            </motion.div>

            {/* Rating & Trust Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-charcoal-light font-inter"
            >
              <div className="flex items-center gap-1 text-secondary">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="font-bold text-charcoal">4.9 / 5.0 Rating</span>
              <span className="text-charcoal-muted">•</span>
              <span>5,400+ Handcrafted Deliveries Across India</span>
            </motion.div>
          </motion.div>

          {/* Right Showcase Product Banner Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-lg group animate-float-banner">
              {/* Soft Ambient Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Banner Container */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/90 bg-white/95">
                <Image
                  src="/images/hero-soap-banner.jpg"
                  alt="Atishay Organic Soaps - Haldi & Neem Clarifying Bar"
                  width={1024}
                  height={682}
                  priority
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
