// src/components/Sections/HowItWorks.jsx

'use client';

import { motion } from 'framer-motion';
import {
  ClipboardCheck,
  FlaskConical,
  Sparkles,
  PackageCheck,
  Clock,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: ClipboardCheck,
      duration: '2 Mins',
      title: 'Take Skin Diagnostic',
      description:
        'Tell us about your primary skin profile (oily, dry, combo, sensitive), known allergies, and texture preferences.',
    },
    {
      step: '02',
      icon: FlaskConical,
      duration: 'Instant',
      title: 'Dermatological Match',
      description:
        'Our algorithm designs a customized organic recipe infused with tested botanicals like Haldi, Aloe, Chandan, or Kesar.',
    },
    {
      step: '03',
      icon: Sparkles,
      duration: '24h Handcrafting',
      title: 'Artisanal Hand-Pour',
      description:
        'Each soap is freshly hand-poured in small batches with 100% vegetable glycerine, avoiding artificial parabens and SLS.',
    },
    {
      step: '04',
      icon: PackageCheck,
      duration: '3-5 Days',
      title: 'Doorstep Delivery',
      description:
        'Receive your bespoke soap bar with personalized formula cards and a 24h patch test safety guide across India.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-cream border-y border-primary/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <span className="text-secondary font-poppins font-bold uppercase tracking-wider text-xs bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30">
            Simple 4-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-charcoal">
            How It Works
          </h2>
          <p className="text-charcoal-light text-sm sm:text-base font-inter">
            From your digital consultation to fresh artisanal batches formulated precisely for your skin.
          </p>
        </motion.div>

        {/* 4 Step Cards with Desktop Connector Path */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -6 }}
                className="bg-white border border-primary/15 rounded-extra p-6 sm:p-7 relative shadow-subtle hover:shadow-large transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-xs font-poppins font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                      Step {item.step}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-cream transition-all duration-300 shadow-subtle">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-poppins font-semibold text-secondary-dark mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.duration}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-poppins font-bold text-charcoal mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-light font-inter leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Progress Bar Indicator */}
                <div className="mt-6 pt-4 border-t border-cream-dark">
                  <div className="w-full bg-cream-dark rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-secondary h-1.5 rounded-full"
                      style={{ width: `${(index + 1) * 25}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-2">
          <Link
            href="/questionnaire"
            className="inline-flex items-center gap-2 bg-primary text-cream px-8 py-3.5 rounded-large font-poppins font-bold text-sm hover:bg-primary-hover transition-all shadow-medium hover:shadow-large"
          >
            <span>Start Your 2-Minute Diagnostic</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
