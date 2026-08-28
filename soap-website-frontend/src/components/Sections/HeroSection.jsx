// src/components/Sections/HeroSection.jsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Leaf,
  Droplets,
  Award,
} from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-primary-light/25 to-cream py-16 sm:py-20 lg:py-28">
      {/* Background Soft Floating Ambient Glows */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -right-20 w-80 h-80 sm:w-[450px] sm:h-[450px] bg-primary/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-20 -left-20 w-80 h-80 sm:w-[450px] sm:h-[450px] bg-secondary/25 rounded-full blur-3xl pointer-events-none"
      />

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
              <span>Science-Backed Personalized Skincare in India</span>
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
              Answer 5 quick questions. Receive your bespoke vegetable glycerine soap bar infused with pure Haldi, Aloe Vera, Chandan, or Kashmiri Kesar—100% free from your specified allergen triggers.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/questionnaire"
                className="bg-primary text-cream px-8 py-4 rounded-large font-poppins font-bold text-base hover:bg-primary-hover transition-all shadow-medium hover:shadow-large flex items-center justify-center gap-2 group w-full sm:w-auto active:scale-95"
              >
                <span>Take Skin Diagnostic</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#bestsellers"
                className="bg-white/90 text-charcoal border border-primary/20 px-7 py-4 rounded-large font-poppins font-semibold text-base hover:bg-cream-dark transition-all text-center block w-full sm:w-auto shadow-subtle backdrop-blur-md"
              >
                Explore Best Sellers
              </a>
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
              <span className="font-bold text-charcoal">4.8 / 5.0 Rating</span>
              <span className="text-charcoal-muted">•</span>
              <span>5,400+ Verified Customers across India</span>
            </motion.div>
          </motion.div>

          {/* Right Showcase 3D Floating Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="lg:col-span-5 relative flex justify-center perspective-1000"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-extra p-6 sm:p-7 shadow-large border border-primary/15 space-y-5 relative"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center border-b border-cream-dark pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-ping" />
                  <span className="font-poppins font-bold text-charcoal text-sm">
                    Live Formula Match #408
                  </span>
                </div>
                <span className="bg-secondary/20 text-secondary-dark font-poppins font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  Prescribed
                </span>
              </div>

              {/* 3D Rendered Soap Graphic */}
              <div className="bg-gradient-to-tr from-[#E8B84F] via-[#D4A574] to-[#5D7B6F] text-cream p-6 rounded-extra shadow-soap-glow relative overflow-hidden border-2 border-white/30">
                <div className="flex justify-between items-start">
                  <Leaf className="w-6 h-6 text-white drop-shadow" />
                  <span className="text-[10px] font-poppins font-extrabold uppercase bg-white/25 backdrop-blur-md px-2.5 py-0.5 rounded text-white tracking-wider">
                    100% Organic Base
                  </span>
                </div>

                <div className="my-5 text-center">
                  <span className="font-poppins font-extrabold text-xl block tracking-wide text-white drop-shadow">
                    Haldi &amp; Chandan Blend
                  </span>
                  <span className="text-xs text-white/90 font-inter mt-0.5 block">
                    Acne Clarity &amp; Deep Radiance
                  </span>
                </div>

                <div className="flex justify-between text-[11px] font-medium text-white/85 pt-3 border-t border-white/20">
                  <span>Custom Texture: Soft &amp; Creamy</span>
                  <span className="font-bold text-white">125g Artisan Bar</span>
                </div>
              </div>

              {/* Formula Highlights Breakdown */}
              <div className="space-y-2.5 font-inter">
                <div className="flex items-center justify-between text-xs bg-cream/70 p-3 rounded-large border border-primary/10">
                  <span className="font-semibold text-charcoal flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-primary" /> Key Actives:
                  </span>
                  <span className="font-bold text-primary">Turmeric + Sandalwood</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-cream/70 p-3 rounded-large border border-primary/10">
                  <span className="font-semibold text-charcoal flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-status-success" /> Allergen Safety:
                  </span>
                  <span className="font-bold text-status-success">0 Excluded Triggers</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-cream/70 p-3 rounded-large border border-primary/10">
                  <span className="font-semibold text-charcoal flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-secondary" /> Starting Price:
                  </span>
                  <span className="font-poppins font-extrabold text-secondary text-sm">₹399</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
