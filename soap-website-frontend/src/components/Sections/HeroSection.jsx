// src/components/Sections/HeroSection.jsx

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-primary-light/30 to-cream py-16 sm:py-20 lg:py-28">
      {/* Background Soft Glows */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-16 -right-16 w-72 h-72 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-16 -left-16 w-72 h-72 sm:w-96 sm:h-96 bg-secondary/25 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content (7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary-dark font-semibold text-xs sm:text-sm shadow-subtle"
            >
              <span className="text-secondary">✦</span> Science-Backed Personalized Skincare
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-bold text-charcoal leading-[1.15]"
            >
              Soap Made{' '}
              <span className="text-primary underline decoration-secondary decoration-wavy decoration-2">
                Just For Your Skin
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="text-base sm:text-lg text-charcoal-light font-normal leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Answer 5 simple questions. Get your clinically-tailored, organic glycerine soap bar infused with pure Haldi, Aloe Vera, Chandan, or Kesar.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link
                  href="/questionnaire"
                  className="bg-primary text-cream px-7 sm:px-9 py-4 rounded-large font-poppins font-bold text-base hover:bg-primary-dark transition-all shadow-medium hover:shadow-large flex items-center justify-center gap-2 group w-full sm:w-auto"
                >
                  <span>Take the Quiz</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <a
                  href="#bestsellers"
                  className="bg-white text-charcoal border border-primary/20 px-6 sm:px-7 py-4 rounded-large font-poppins font-semibold text-base hover:bg-cream-dark transition-all text-center block w-full sm:w-auto shadow-subtle"
                >
                  Explore Best Sellers
                </a>
              </motion.div>
            </motion.div>

            {/* Rating Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-charcoal-light"
            >
              <span className="flex text-secondary font-bold text-base">★★★★★</span>
              <span className="font-semibold text-charcoal">4.8/5 Rating</span>
              <span className="text-charcoal-light/60">•</span>
              <span>from 2,000+ verified customers</span>
            </motion.div>
          </motion.div>

          {/* Right Showcase (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-extra p-6 sm:p-7 shadow-large border border-primary/15 space-y-5"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center border-b border-primary/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse" />
                  <span className="font-poppins font-bold text-charcoal text-sm sm:text-base">Custom Formula #408</span>
                </div>
                <span className="bg-secondary/20 text-charcoal font-poppins font-bold px-2.5 py-0.5 rounded-full text-xs">
                  Matched Bar
                </span>
              </div>

              {/* Soap Graphic */}
              <div className="bg-gradient-to-tr from-primary to-primary-dark text-cream p-5 rounded-large shadow-medium relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <span className="text-2xl">🧼</span>
                  <span className="text-[10px] font-poppins font-extrabold uppercase bg-white/20 px-2 py-0.5 rounded tracking-widest">
                    100% Organic Base
                  </span>
                </div>
                <div className="my-4 text-center">
                  <span className="font-poppins font-bold text-lg block tracking-wide">
                    Haldi &amp; Chandan Blend
                  </span>
                  <span className="text-xs text-cream/80 font-inter">
                    Acne Defence &amp; Natural Radiance
                  </span>
                </div>
                <div className="flex justify-between text-[11px] font-medium text-cream/75 pt-2 border-t border-white/15">
                  <span>Custom Texture: Soft</span>
                  <span className="text-secondary-light font-bold">125g Artisan Bar</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs bg-cream p-2.5 rounded-default border border-primary/10">
                  <span className="font-medium text-charcoal">🌿 Key Actives:</span>
                  <span className="font-semibold text-primary">Turmeric + Sandalwood</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-cream p-2.5 rounded-default border border-primary/10">
                  <span className="font-medium text-charcoal">🛡️ Allergens:</span>
                  <span className="font-semibold text-status-success">0 Excluded Triggers</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-cream p-2.5 rounded-default border border-primary/10">
                  <span className="font-medium text-charcoal">⚡ Starting Price:</span>
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
