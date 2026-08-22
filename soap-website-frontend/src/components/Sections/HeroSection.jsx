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
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral via-secondary/20 to-neutral py-16 sm:py-20 lg:py-32">
      {/* Animated Background Decorative Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-16 -right-16 w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-secondary/30 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-16 -left-16 w-56 h-56 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left space-y-5 sm:space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-primary font-semibold text-xs sm:text-sm shadow-sm"
            >
              ✨ 100% Organic &amp; Glycerine Based Soap
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-extrabold text-primary leading-tight"
            >
              Soap Made{' '}
              <span className="text-accent underline decoration-amber-300 decoration-wavy decoration-2">
                Just For Your
              </span>{' '}
              Unique Skin
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-base sm:text-lg text-text-muted leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Answer 6 simple questions about your skin type, allergies, and concerns. We match you
              with a handcrafted custom soap formulation starting at ₹399.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link
                  href={isLoggedIn ? '/questionnaire' : '/register'}
                  className="bg-accent text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-poppins font-bold text-base sm:text-lg hover:bg-accent-hover transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 group w-full sm:w-auto"
                >
                  <span>Start Your Questionnaire</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link
                  href="/faq"
                  className="bg-white text-primary border border-primary/20 px-6 sm:px-6 py-3.5 sm:py-4 rounded-xl font-poppins font-bold text-base sm:text-lg hover:bg-neutral transition-all text-center block w-full sm:w-auto"
                >
                  Learn How It Works
                </Link>
              </motion.div>
            </motion.div>

            <p className="text-xs text-amber-900/70 font-medium pt-1">
              ⚠️ Patch test recommended for all new skincare products. Delivered in 3-5 business days.
            </p>
          </motion.div>

          {/* Right Column: Floating Visual Card Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.02, rotate: 1 }}
              className="w-full max-w-sm sm:max-w-md bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-8 shadow-2xl border border-amber-900/10 space-y-4 sm:space-y-6"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-3 sm:pb-4">
                <span className="font-poppins font-bold text-primary text-base sm:text-lg">Your Personalized Soap</span>
                <span className="bg-secondary/40 text-primary font-bold px-2.5 sm:px-3 py-1 rounded-full text-xs">
                  Custom Match
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 sm:gap-4 bg-neutral/60 p-3 sm:p-3.5 rounded-xl border border-amber-900/5"
                >
                  <span className="text-xl sm:text-2xl">🌿</span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-primary">Natural Haldi &amp; Aloe Vera</h4>
                    <p className="text-xs text-text-muted">Targeted for acne &amp; oily skin reduction</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 sm:gap-4 bg-neutral/60 p-3 sm:p-3.5 rounded-xl border border-amber-900/5"
                >
                  <span className="text-xl sm:text-2xl">🛡️</span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-primary">Allergen Safe</h4>
                    <p className="text-xs text-text-muted">Formulated excluding your specified irritants</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 sm:gap-4 bg-neutral/60 p-3 sm:p-3.5 rounded-xl border border-amber-900/5"
                >
                  <span className="text-xl sm:text-2xl">🧼</span>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-primary">Texture Selection</h4>
                    <p className="text-xs text-text-muted">Choose between soft lather or gentle exfoliating</p>
                  </div>
                </motion.div>
              </div>

              <div className="bg-secondary/20 p-3 sm:p-4 rounded-xl flex justify-between items-center text-primary font-bold">
                <span className="text-sm sm:text-base">Base Price</span>
                <span className="text-accent text-lg sm:text-xl">₹399</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
