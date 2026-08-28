// src/components/SoapPreview.jsx

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ShieldCheck,
  Leaf,
  Droplets,
  Feather,
  CheckCircle2,
} from 'lucide-react';

export default function SoapPreview({ answers = {} }) {
  const {
    skinType = 'oily',
    mainConcern = 'acne',
    texturePreference = 'soft',
    allergies = [],
    excludedIngredients = [],
  } = answers;

  // Determine skin type theme, textures & botanical formula
  const getTheme = () => {
    switch (skinType) {
      case 'dry':
        return {
          gradient: 'from-[#4E7A69] via-[#689885] to-[#39564A]',
          accentBorder: 'border-emerald-300/40',
          glow: 'shadow-[0_20px_50px_-10px_rgba(78,122,105,0.45)]',
          label: 'Hydrating Aloe Vera & Shea Bar',
          baseType: 'Moisture-Rich Glycerine',
          activeBotanicals: ['Organic Aloe Gel', 'Raw Shea Butter', 'Plant Squalane'],
          subText: 'Restores skin lipid barrier & prevents flaking',
          specTexture: 'Silk-Hydrate Gel Base',
        };
      case 'sensitive':
        return {
          gradient: 'from-[#8C7456] via-[#A89073] to-[#5C4A35]',
          accentBorder: 'border-amber-200/40',
          glow: 'shadow-[0_20px_50px_-10px_rgba(140,116,86,0.45)]',
          label: 'Calming Pure Chandan Therapy Bar',
          baseType: 'Hypoallergenic Mild Base',
          activeBotanicals: ['Pure Chandan (Sandalwood)', 'Chamomile Extract', 'Oat Colloidal'],
          subText: 'Neutralizes redness & calms reactive flares',
          specTexture: 'Velvety Soothing Base',
        };
      case 'combination':
        return {
          gradient: 'from-[#D4A574] via-[#E8B84F] to-[#789688]',
          accentBorder: 'border-amber-300/40',
          glow: 'shadow-[0_20px_50px_-10px_rgba(212,165,116,0.45)]',
          label: 'Balancing Kesar & Haldi Formula',
          baseType: 'Dual-Zone Sebum Balance',
          activeBotanicals: ['Kashmiri Kesar', 'Wild Haldi', 'Organic Aloe Gel'],
          subText: 'Purifies T-zone while hydrating dry cheeks',
          specTexture: 'Adaptive Balance Base',
        };
      case 'oily':
      default:
        return {
          gradient: 'from-[#E0A838] via-[#C99127] to-[#4E7A69]',
          accentBorder: 'border-amber-400/40',
          glow: 'shadow-[0_20px_50px_-10px_rgba(224,168,56,0.45)]',
          label: 'Clarifying Wild Haldi & Neem Bar',
          baseType: 'Purifying Glycerine Base',
          activeBotanicals: ['Wild Haldi (Turmeric)', 'Neem Leaf Extract', 'Tea Tree Oil'],
          subText: 'Controls excess sebum & clears acne bacteria',
          specTexture: 'Clarifying Deep-Clean Base',
        };
    }
  };

  const theme = getTheme();
  const allExcluded = [...(allergies || []), ...(excludedIngredients || [])];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-charcoal text-cream p-6 sm:p-7 rounded-extra shadow-large border border-primary/25 relative overflow-hidden flex flex-col justify-between min-h-[460px]"
    >
      {/* Background Ambient Glows */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/25 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/30 rounded-full blur-3xl pointer-events-none"
      />

      {/* Card Top Diagnostic Header */}
      <div className="relative z-10 space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-poppins font-bold uppercase tracking-widest text-secondary bg-secondary/20 px-3 py-1 rounded-full border border-secondary/30 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-secondary animate-pulse" />
            Live Diagnostic Match
          </span>
          <span className="text-xs text-cream/75 font-poppins font-semibold capitalize flex items-center gap-1">
            <Feather className="w-3 h-3 text-primary-light" />
            {skinType} Profile
          </span>
        </div>
        <h3 className="text-lg sm:text-xl font-poppins font-bold text-cream pt-1">
          {theme.label}
        </h3>
        <p className="text-xs text-cream/70 font-inter">{theme.subText}</p>
      </div>

      {/* 3D Realistic Translucent Soap Representation */}
      <div className="my-6 relative flex items-center justify-center perspective-1000 py-2">
        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05, rotateX: 6, rotateY: -6 }}
          className={`w-60 h-38 sm:w-68 sm:h-42 rounded-extra bg-gradient-to-tr ${theme.gradient} ${theme.glow} ${theme.accentBorder} border-2 transition-all duration-700 flex flex-col justify-between p-5 relative backdrop-blur-md cursor-pointer group shadow-2xl overflow-hidden`}
        >
          {/* Surface Lighting Sheen */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-black/20 pointer-events-none rounded-extra" />
          
          {/* Subtle Organic Mica Veins */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-white/20 to-transparent blur-xl pointer-events-none" />

          {/* Exfoliating Scrub Botanical Particles Overlay */}
          {texturePreference === 'exfoliating' && (
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:8px_8px] pointer-events-none" />
          )}

          {/* Top Emblem Row */}
          <div className="relative z-10 flex justify-between items-center opacity-90">
            <div className="flex items-center gap-1.5">
              <div className="relative w-4 h-4 rounded-full overflow-hidden border border-white/40 bg-cream/90 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Atishay Emblem"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-[10px] font-poppins font-bold tracking-wider text-cream/90 uppercase">
                Atishay
              </span>
            </div>
            <span className="text-[8px] font-poppins font-extrabold tracking-widest uppercase bg-white/20 border border-white/30 px-2 py-0.5 rounded text-white shadow-inner-light">
              100% Organic
            </span>
          </div>

          {/* Center Debossed Stamp */}
          <div className="relative z-10 text-center my-auto py-1">
            <span className="block font-poppins font-black text-white text-sm tracking-wider uppercase drop-shadow-md">
              Bespoke Bar
            </span>
            <span className="text-[10px] text-white/90 font-medium italic flex items-center justify-center gap-1 mt-0.5">
              <Droplets className="w-2.5 h-2.5" />
              Target: {mainConcern}
            </span>
          </div>

          {/* Bottom Bar Specifications */}
          <div className="relative z-10 flex justify-between items-end text-[10px] font-bold text-white/90 border-t border-white/20 pt-1.5">
            <span className="capitalize">{texturePreference} Formula</span>
            <span>125g Artisan Bar</span>
          </div>
        </motion.div>
      </div>

      {/* Actives & Allergens Footer */}
      <div className="relative z-10 space-y-3 pt-1">
        <div>
          <span className="text-[10px] font-poppins font-bold uppercase text-secondary tracking-wider block mb-1.5">
            Prescribed Botanical Actives:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {theme.activeBotanicals.map((item, idx) => (
              <motion.span
                key={item}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.08 }}
                className="text-[11px] font-medium bg-white/10 text-cream px-2.5 py-1 rounded-default border border-white/10 backdrop-blur-md flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3 text-secondary" />
                <span>{item}</span>
              </motion.span>
            ))}
          </div>
        </div>

        {allExcluded.length > 0 && (
          <div className="text-[11px] text-botanical-aloe font-medium flex items-center gap-1.5 pt-1 border-t border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span>100% Excluded:</span>
            <span className="text-cream font-semibold capitalize truncate">
              {allExcluded.join(', ')}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
