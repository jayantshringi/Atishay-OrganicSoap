// src/components/SoapPreview.jsx

'use client';

import { motion } from 'framer-motion';

export default function SoapPreview({ answers = {} }) {
  const {
    skinType = 'oily',
    mainConcern = 'acne',
    texturePreference = 'soft',
    allergies = [],
  } = answers;

  // Determine skin type color themes & botanicals according to DESIGN.md palette
  const getTheme = () => {
    switch (skinType) {
      case 'dry':
        return {
          bg: 'from-[#5D7B6F] via-[#7A9A8D] to-[#4A6157]',
          accent: 'text-botanical-aloe',
          label: 'Hydrating Aloe Vera Formula',
          glow: 'shadow-primary/40',
          botanicals: ['Organic Aloe Vera', 'Shea Butter', 'Vegetable Glycerine'],
        };
      case 'sensitive':
        return {
          bg: 'from-[#8B7355] via-[#A89073] to-[#5D4E39]',
          accent: 'text-botanical-chandan',
          label: 'Calming Sandalwood Blend',
          glow: 'shadow-accent/40',
          botanicals: ['Pure Chandan (Sandalwood)', 'Chamomile Extract', 'Mild Oils'],
        };
      case 'combination':
        return {
          bg: 'from-[#D4A574] via-[#E8B84F] to-[#8B7355]',
          accent: 'text-cream',
          label: 'Balancing Herbal Formula',
          glow: 'shadow-secondary/40',
          botanicals: ['Wild Haldi', 'Aloe Vera Gel', 'Sebum Balancer'],
        };
      case 'oily':
      default:
        return {
          bg: 'from-[#E8B84F] via-[#D4A574] to-[#5D7B6F]',
          accent: 'text-cream',
          label: 'Clarifying Haldi & Neem Formula',
          glow: 'shadow-botanical-haldi/40',
          botanicals: ['Wild Haldi (Turmeric)', 'Neem Extract', 'Purifying Glycerine'],
        };
    }
  };

  const theme = getTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-charcoal text-cream p-6 sm:p-7 rounded-extra shadow-large border border-primary/25 relative overflow-hidden flex flex-col justify-between min-h-[440px]"
    >
      {/* Background Soft Glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-60 h-60 bg-secondary/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-24 -left-24 w-60 h-60 bg-primary/25 rounded-full blur-3xl pointer-events-none"
      />

      {/* Card Header */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-poppins font-bold uppercase tracking-widest text-secondary bg-secondary/20 px-3 py-1 rounded-full border border-secondary/30">
            Live Formula Diagnostic
          </span>
          <span className="text-xs text-cream/70 font-poppins font-semibold capitalize">
            {skinType} Skin Profile
          </span>
        </div>
        <h3 className="text-xl font-poppins font-bold text-cream">
          {theme.label}
        </h3>
      </div>

      {/* 3D Floating Soap Bar Representation */}
      <div className="my-6 relative flex items-center justify-center">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.04, rotate: 1 }}
          className={`w-56 h-36 sm:w-64 sm:h-40 rounded-extra bg-gradient-to-tr ${theme.bg} shadow-2xl ${theme.glow} transition-all duration-700 flex flex-col justify-between p-5 relative border-2 border-white/25 backdrop-blur-sm cursor-pointer group`}
        >
          {/* Texture Overlay */}
          {texturePreference === 'exfoliating' && (
            <div className="absolute inset-0 rounded-extra opacity-30 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:6px_6px] pointer-events-none" />
          )}

          {/* Stamp/Logo Emblem */}
          <div className="flex justify-between items-center opacity-85">
            <span className="text-2xl">🌿</span>
            <span className="text-[9px] font-poppins font-extrabold tracking-widest uppercase border border-white/40 px-2 py-0.5 rounded text-white">
              100% ORGANIC
            </span>
          </div>

          {/* Embedded Custom Callout Stamp */}
          <div className="text-center my-auto">
            <span className="block font-poppins font-black text-white text-sm tracking-wider uppercase drop-shadow">
              SoapCo Custom
            </span>
            <span className="text-[10px] text-white/80 font-medium italic">
              Target: {mainConcern}
            </span>
          </div>

          {/* Bar Bottom Specs */}
          <div className="flex justify-between items-end text-[10px] font-bold text-white/90">
            <span className="capitalize">{texturePreference} Bar</span>
            <span>125 Grams</span>
          </div>
        </motion.div>
      </div>

      {/* Ingredients & Safety Badges */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {theme.botanicals.map((item, idx) => (
            <motion.span
              key={idx}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="text-[11px] font-semibold bg-white/10 text-cream px-3 py-1 rounded-default border border-white/10 backdrop-blur-md"
            >
              🌿 {item}
            </motion.span>
          ))}
        </div>

        {allergies.length > 0 && (
          <div className="text-[11px] text-botanical-aloe font-medium flex items-center gap-1.5 pt-1">
            <span>🛡️ Excluded Allergens:</span>
            <span className="text-cream font-semibold capitalize">{allergies.join(', ')}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
