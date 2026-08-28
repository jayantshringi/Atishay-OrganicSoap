// src/components/Sections/Testimonials.jsx

'use client';

import { motion } from 'framer-motion';
import { Star, CheckCircle2, Quote, Sparkles } from 'lucide-react';

export default function Testimonials() {
  const stats = [
    { value: '5,400+', label: 'Happy Customers' },
    { value: '4.8 / 5.0', label: 'Average Derm Rating' },
    { value: '100%', label: 'Organic Extracts' },
    { value: '3-5 Days', label: 'Pan-India Express' },
  ];

  const reviews = [
    {
      name: 'Priya Mehta',
      location: 'Mumbai, Maharashtra',
      skinType: 'Sensitive & Acne-Prone',
      journey: 'Chronic flares → Calm skin in 3 weeks',
      text: 'Finding a soap that did not trigger my severe contact allergies was impossible until Atishay. The Haldi and Chandan formula was customized for my exact profile and calmed my breakouts gently without any dryness.',
      initials: 'PM',
      rating: 5,
    },
    {
      name: 'Dr. Ananya Roy',
      location: 'Pune, Maharashtra',
      skinType: 'Dry & Flaky Skin',
      journey: 'Winter tight skin → Deeply hydrated',
      text: 'The Aloe Vera & Vegetable Glycerine formula left my skin feeling silky hydrated right out of the shower. Love the patch test instructions and personalized recipe card included in the box!',
      initials: 'AR',
      rating: 5,
    },
    {
      name: 'Rohan Sharma',
      location: 'Bengaluru, Karnataka',
      skinType: 'Oily & Clogged Pores',
      journey: 'Sebum congestion → Clean & smooth',
      text: 'Selected the gentle exfoliating scrub option for ₹449. The texture is balanced and clean, not abrasive at all. Arrived in 3 days with pristine eco-packaging. Definitely re-ordering!',
      initials: 'RS',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-primary/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Stats Summary Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-cream/80 rounded-extra p-8 border border-primary/15 shadow-subtle">
          {stats.map((st, idx) => (
            <div key={idx} className="text-center space-y-1">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-extrabold text-primary block">
                {st.value}
              </span>
              <span className="text-xs sm:text-sm text-charcoal-light font-medium font-inter">
                {st.label}
              </span>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <span className="text-secondary font-poppins font-bold uppercase tracking-wider text-xs bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30 flex items-center gap-1.5 w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-charcoal">
            Loved by 5,400+ Skincare Enthusiasts
          </h2>
          <p className="text-charcoal-light text-sm sm:text-base font-inter">
            Real feedback from customers who transformed their daily skincare routine with bespoke organic formulas.
          </p>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
              className="bg-cream/40 border border-primary/15 rounded-extra p-6 sm:p-7 shadow-subtle hover:shadow-large transition-all flex flex-col justify-between relative"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex text-secondary gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-primary/20" />
                </div>

                <p className="font-lora italic text-charcoal text-sm sm:text-base leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </p>

                <div className="bg-white/80 p-2 rounded-large border border-primary/10 text-[11px] font-inter text-primary font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0" />
                  <span>{rev.journey}</span>
                </div>
              </div>

              <div className="border-t border-primary/10 pt-4 mt-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary-dark font-poppins font-bold flex items-center justify-center text-xs shadow-inner-light">
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-charcoal text-sm">{rev.name}</h4>
                    <span className="text-[11px] text-charcoal-light font-inter block">{rev.location}</span>
                  </div>
                </div>

                <span className="bg-primary/10 text-primary-darker font-poppins font-semibold px-2.5 py-1 rounded-full text-[10px] border border-primary/20">
                  {rev.skinType}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
