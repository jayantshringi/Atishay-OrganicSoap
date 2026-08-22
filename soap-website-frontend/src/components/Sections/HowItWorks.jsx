// src/components/Sections/HowItWorks.jsx

'use client';

import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: '📝',
      title: 'Take Skin Questionnaire',
      description:
        'Tell us about your skin type (oily, dry, sensitive), specific allergies, concerns, and texture preference.',
    },
    {
      step: '02',
      icon: '🧪',
      title: 'Recipe Matching',
      description:
        'Our system selects an optimal melt-and-pour glycerine recipe using organic ingredients (Haldi, Aloe Vera, Chandan, Kesar).',
    },
    {
      step: '03',
      icon: '💳',
      title: 'Secure Payment',
      description:
        'Review your personalized recipe details, confirm delivery details, and pay securely via Razorpay UPI/Cards.',
    },
    {
      step: '04',
      icon: '📦',
      title: 'Crafted & Delivered',
      description:
        'Your custom soap is freshly handmade, safely packaged, and delivered to your doorstep within 3-5 business days.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-amber-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold text-primary">
            How It Works
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            From quiz to doorstep, get a customized soap formulation in 4 simple steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-neutral/50 border border-amber-900/10 rounded-2xl p-5 sm:p-6 relative shadow-sm hover:shadow-xl transition-all group"
            >
              <span className="text-xs font-poppins font-extrabold text-accent bg-accent/15 px-3 py-1 rounded-full inline-block mb-4">
                Step {item.step}
              </span>
              <div className="text-3xl sm:text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-poppins font-bold text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
