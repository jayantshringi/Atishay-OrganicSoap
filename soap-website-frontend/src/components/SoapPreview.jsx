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

  // Determine skin type color themes & botanicals
  const getTheme = () => {
    switch (skinType) {
      case 'dry':
        return {
          bg: 'from-emerald-400 via-teal-500 to-emerald-700',
          accent: 'text-emerald-300',
          label: 'Hydrating Aloe Formula',
          glow: 'shadow-emerald-500/40',
          botanicals: ['Aloe Vera', 'Shea Butter', 'Glycerine Base'],
        };
      case 'sensitive':
        return {
          bg: 'from-amber-200 via-orange-300 to-amber-500',
          accent: 'text-amber-700',
          label: 'Calming Sandalwood Blend',
          glow: 'shadow-amber-500/40',
          botanicals: ['Chandan (Sandalwood)', 'Chamomile', 'Mild Oils'],
        };
      case 'combination':
        return {
          bg: 'from-yellow-400 via-amber-500 to-orange-600',
          accent: 'text-amber-200',
          label: 'Balancing Herbal Formula',
          glow: 'shadow-yellow-500/40',
          botanicals: ['Haldi', 'Aloe Vera', 'Balance Extract'],
        };
      case 'oily':
      default:
        return {
          bg: 'from-amber-500 via-yellow-600 to-amber-700',
          accent: 'text-yellow-200',
          label: 'Brightening Haldi Formula',
          glow: 'shadow-amber-600/40',
          botanicals: ['Haldi (Turmeric)', 'Neem Extract', 'Purifying Base'],
        };
    }
  };

  const theme = getTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-amber-950 to-primary text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-amber-500/20 relative overflow-hidden flex flex-col justify-between min-h-[420px]"
    >
      {/* Animated Background Glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-60 h-60 bg-accent/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-24 -left-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Card Header */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-poppins font-bold uppercase tracking-widest text-accent bg-accent/20 px-3 py-1 rounded-full border border-accent/30 shadow-sm">
            Live Formula Preview
          </span>
          <span className="text-xs text-amber-200/70 font-semibold capitalize">
            {skinType} Skin Profile
          </span>
        </div>
        <h3 className="text-xl font-poppins font-bold text-neutral">
          {theme.label}
        </h3>
      </div>

      {/* 3D Floating Soap Bar Representation */}
      <div className="my-6 relative flex items-center justify-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05, rotate: 2 }}
          className={`w-56 h-36 sm:w-64 sm:h-40 rounded-3xl bg-gradient-to-tr ${theme.bg} shadow-2xl ${theme.glow} transition-all duration-700 flex flex-col justify-between p-5 relative border-2 border-white/30 backdrop-blur-sm cursor-pointer group`}
        >
          {/* Soap Texture Spec/Overlay */}
          {texturePreference === 'exfoliating' && (
            <div className="absolute inset-0 rounded-3xl opacity-40 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />
          )}

          {/* Stamp/Logo Emblem */}
          <div className="flex justify-between items-center opacity-80">
            <span className="text-2xl">🧼</span>
            <span className="text-[9px] font-poppins font-extrabold tracking-widest uppercase border border-white/40 px-2 py-0.5 rounded text-white/90">
              100% ORGANIC
            </span>
          </div>

          {/* Embedded Custom Callout Stamp */}
          <div className="text-center my-auto">
            <span className="block font-poppins font-black text-white/90 text-sm tracking-wider uppercase drop-shadow-md">
              SoapCo Custom
            </span>
            <span className="text-[10px] text-white/75 font-medium italic">
              Target: {mainConcern}
            </span>
          </div>

          {/* Bar Bottom Specs */}
          <div className="flex justify-between items-end text-[10px] font-bold text-white/80">
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
              className="text-[11px] font-bold bg-white/10 text-neutral px-3 py-1 rounded-xl border border-white/10 backdrop-blur-md"
            >
              🌿 {item}
            </motion.span>
          ))}
        </div>

        {allergies.length > 0 && (
          <div className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5 pt-1">
            <span>🛡️ Excluded Allergens:</span>
            <span className="text-white capitalize">{allergies.join(', ')}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
