// src/components/Sections/Testimonials.jsx

'use client';

import { motion } from 'framer-motion';

export default function Testimonials() {
  const stats = [
    { value: '5,000+', label: 'Happy Customers' },
    { value: '4.8 / 5', label: 'Average Rating' },
    { value: '100%', label: 'Organic Extracts' },
    { value: '3-5 Days', label: 'Pan-India Delivery' },
  ];

  const reviews = [
    {
      name: 'Priya Mehta',
      location: 'Mumbai',
      skinType: 'Sensitive & Acne-Prone',
      text: 'Finding soap that does not trigger my severe contact allergies was impossible until SoapCo. The Haldi and Chandan soap was customized for my exact profile and calmed my breakouts gently without dryness.',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      name: 'Ananya Roy',
      location: 'Pune',
      skinType: 'Dry & Flaky Skin',
      text: 'The Aloe Vera & Vegetable Glycerine formula left my skin feeling silky hydrated right out of the shower. Love the patch test instructions and personalized recipe card included in the box!',
      rating: 5,
      avatar: '👩‍⚕️',
    },
    {
      name: 'Rohan Sharma',
      location: 'Thane',
      skinType: 'Oily & Clogged Pores',
      text: 'Selected the gentle exfoliating scrub option for ₹449. The texture is balanced and clean, not harsh at all. Delivery arrived in 3 days. Definitely re-ordering!',
      rating: 5,
      avatar: '👨‍💻',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-cream/70 rounded-extra p-8 border border-primary/15 shadow-subtle">
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
          <span className="text-secondary font-poppins font-bold uppercase tracking-wider text-xs">
            Verified Customer Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-charcoal">
            Loved by 5000+ Customers
          </h2>
          <p className="text-charcoal-light text-sm sm:text-base font-inter">
            Real feedback from customers who transformed their skincare with tailored organic formulas.
          </p>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
              className="bg-cream/50 border border-primary/15 rounded-extra p-6 sm:p-7 shadow-subtle hover:shadow-medium transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex text-secondary gap-1 text-base">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <span className="text-2xl">{rev.avatar}</span>
                </div>
                <p className="font-lora italic text-charcoal text-sm sm:text-base leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="border-t border-primary/10 pt-4 mt-6 flex justify-between items-center">
                <div>
                  <h4 className="font-poppins font-bold text-charcoal text-sm">{rev.name}</h4>
                  <span className="text-xs text-charcoal-light font-inter">{rev.location}</span>
                </div>
                <span className="bg-primary/10 text-primary-darker font-poppins font-semibold px-2.5 py-1 rounded-full text-[11px]">
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
