// src/components/Sections/BestSellers.jsx

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useQuestionnaireStore } from '@/store/questionnaireStore';
import {
  Star,
  Sparkles,
  ArrowRight,
  Leaf,
  ShieldCheck,
  Award,
} from 'lucide-react';

export default function BestSellers() {
  const store = useQuestionnaireStore();

  const products = [
    {
      id: 'haldi-acne',
      name: 'Haldi & Neem Clarifying Bar',
      skinType: 'oily',
      skinLabel: 'Oily & Acne-Prone',
      skinTagColor: 'bg-botanical-haldi/20 text-charcoal border-botanical-haldi/40',
      description: 'Clinically balanced with pure turmeric extract to purge clogged pores without drying your natural moisture barrier.',
      price: 399,
      rating: 4.9,
      reviewCount: 342,
      badge: 'Best Seller',
      gradient: 'from-amber-200/60 via-amber-100/40 to-cream',
      ph: '5.5 Balanced',
    },
    {
      id: 'aloe-hydrate',
      name: 'Aloe Vera & Shea Butter Bar',
      skinType: 'dry',
      skinLabel: 'Dry & Dehydrated',
      skinTagColor: 'bg-botanical-aloe/30 text-primary-darker border-botanical-aloe',
      description: 'Rich vegetable glycerine base infused with fresh aloe gel to relieve tightness and replenish essential skin lipids.',
      price: 399,
      rating: 4.9,
      reviewCount: 285,
      badge: 'Most Loved',
      gradient: 'from-emerald-200/60 via-teal-100/40 to-cream',
      ph: '5.5 Balanced',
    },
    {
      id: 'chandan-calm',
      name: 'Chandan Soothing Therapy Bar',
      skinType: 'sensitive',
      skinLabel: 'Sensitive & Reactive',
      skinTagColor: 'bg-botanical-chandan/40 text-charcoal border-botanical-chandan',
      description: 'Formulated without synthetic fragrances or irritants. Pure sandalwood gently calms reactive redness and heat rashes.',
      price: 399,
      rating: 4.8,
      reviewCount: 198,
      badge: 'Derm Choice',
      gradient: 'from-orange-200/60 via-amber-100/40 to-cream',
      ph: '5.5 Balanced',
    },
    {
      id: 'kesar-glow',
      name: 'Kesar & Almond Glow Bar',
      skinType: 'combination',
      skinLabel: 'All Skin Types',
      skinTagColor: 'bg-botanical-kesar/30 text-charcoal border-botanical-kesar',
      description: 'Infused with Kashmiri saffron threads and gentle ground oatmeal scrub for radiant, luminous and silky smooth skin.',
      price: 449,
      rating: 5.0,
      reviewCount: 412,
      badge: 'Luxury Edition',
      gradient: 'from-rose-200/60 via-amber-100/40 to-cream',
      ph: '5.5 Balanced',
    },
  ];

  return (
    <section id="bestsellers" className="py-16 sm:py-24 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <span className="text-secondary font-poppins font-bold uppercase tracking-wider text-xs bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30">
            Handcrafted Masterpieces
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-charcoal">
            Best Sellers &amp; Most Prescribed
          </h2>
          <p className="text-charcoal-light text-sm sm:text-base font-inter">
            Our most frequently prescribed customer recipes. Each formula can be fully customized for your unique allergy profile.
          </p>
        </motion.div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-extra border border-primary/15 shadow-subtle hover:shadow-large transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* Product Visual Area */}
              <div className={`p-8 bg-gradient-to-b ${item.gradient} flex flex-col items-center justify-center relative border-b border-primary/10`}>
                <span className="absolute top-3 left-3 bg-secondary text-charcoal font-poppins font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-subtle flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  {item.badge}
                </span>

                {/* 3D Bar Graphic */}
                <div className="w-28 h-20 bg-white/90 backdrop-blur-md rounded-large shadow-medium border border-primary/20 flex flex-col justify-between p-3 my-4 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-300">
                  <div className="flex justify-between items-center">
                    <Leaf className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[8px] font-bold uppercase text-charcoal-light">125g</span>
                  </div>
                  <div className="text-center font-poppins font-extrabold text-[10px] text-charcoal uppercase">
                    SoapCo Custom
                  </div>
                  <div className="text-[8px] font-semibold text-secondary-dark text-right">
                    {item.ph}
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-poppins font-semibold border ${item.skinTagColor}`}>
                  {item.skinLabel}
                </span>
              </div>

              {/* Product Details Area */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <div className="flex items-center gap-1 text-secondary text-xs mb-1.5 font-poppins font-bold">
                    <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                    <span>{item.rating}</span>
                    <span className="text-charcoal-muted font-normal">({item.reviewCount} reviews)</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-poppins font-bold text-charcoal group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-charcoal-light font-inter mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-cream-dark flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-charcoal-muted uppercase font-bold block">Formula Price</span>
                    <span className="text-xl font-poppins font-extrabold text-secondary">
                      ₹{item.price}
                    </span>
                  </div>
                  <Link
                    href="/questionnaire"
                    onClick={() => store.updateAnswer('skinType', item.skinType)}
                    className="bg-primary text-cream px-4 py-2 rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition-all shadow-subtle flex items-center gap-1 group/btn"
                  >
                    <span>Customize</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
