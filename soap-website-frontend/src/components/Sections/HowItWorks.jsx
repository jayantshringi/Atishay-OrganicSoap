// src/components/Sections/HowItWorks.jsx

'use client';

import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      icon: '📋',
      title: 'Take Skin Questionnaire',
      description:
        'Tell us about your skin type (oily, dry, combination, sensitive), specific allergies, and preferred bar texture.',
    },
    {
      step: '02',
      icon: '🔬',
      title: 'Scientific Formula Match',
      description:
        'Our algorithm designs a customized organic recipe infused with tested botanicals like Haldi, Aloe Vera, Chandan, or Kesar.',
    },
    {
      step: '03',
      icon: '🧼',
      title: 'Handcrafted With Care',
      description:
        'Each soap is fresh-poured using vegetable glycerine, avoiding artificial irritants and harsh parabens.',
    },
    {
      step: '04',
      icon: '📦',
      title: 'Doorstep Delivery',
      description:
        'Receive your personalized skincare soap safely packaged with a 24h patch test guide in 3-5 business days.',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-cream border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-3"
        >
          <span className="text-secondary font-poppins font-bold uppercase tracking-wider text-xs">
            Simple 4-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-charcoal">
            How It Works
          </h2>
          <p className="text-charcoal-light text-sm sm:text-base font-inter">
            From digital consultation to artisanal formulation crafted specifically for your skin.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
              className="bg-white border border-primary/15 rounded-extra p-6 relative shadow-subtle hover:shadow-medium transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-5">
                  <span className="text-xs font-poppins font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Step {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-primary group-hover:text-cream transition-all duration-300">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-lg font-poppins font-bold text-charcoal mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-charcoal-light font-inter leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Progress visual bar */}
              <div className="mt-5 pt-4 border-t border-cream-dark">
                <div className="w-full bg-cream-dark rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-secondary h-1.5 rounded-full"
                    style={{ width: `${(index + 1) * 25}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
