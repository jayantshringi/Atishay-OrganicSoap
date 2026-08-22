// src/components/Sections/Testimonials.jsx

'use client';

import { motion } from 'framer-motion';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Priya Mehta',
      location: 'Mumbai',
      skinType: 'Sensitive & Acne-prone',
      text: "Finding soap that doesn't trigger my skin allergies was impossible until SoapCo. The Haldi and Chandan soap was customized for me and cleared my breakouts gently!",
      rating: 5,
    },
    {
      name: 'Ananya Roy',
      location: 'Pune',
      skinType: 'Dry & Flaky Skin',
      text: 'The Aloe Vera & Glycerine combination left my skin feeling hydrated without any tightness. Love the patch test recommendation included in the package!',
      rating: 5,
    },
    {
      name: 'Rohan Sharma',
      location: 'Thane',
      skinType: 'Oily Skin',
      text: 'Selected the exfoliating option for ₹449. The texture is perfect and delivery took just 3 days. Will definitely re-order!',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-t border-amber-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4"
        >
          <span className="text-accent font-bold uppercase tracking-wider text-xs">
            Verified Customer Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-poppins font-bold text-primary">
            Loved By Skin-Conscious Customers
          </h2>
          <p className="text-text-muted text-sm sm:text-base">
            See how custom-crafted soaps changed our customers&apos; daily skincare routine.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((rev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-neutral/40 border border-amber-900/10 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-500 gap-1 mb-4 text-lg">{'★'.repeat(rev.rating)}</div>
                <p className="text-sm text-text italic mb-6 leading-relaxed">&ldquo;{rev.text}&rdquo;</p>
              </div>
              <div className="border-t border-amber-900/10 pt-4 flex flex-wrap justify-between items-center gap-2 text-xs">
                <div>
                  <h4 className="font-poppins font-bold text-primary text-sm">{rev.name}</h4>
                  <span className="text-text-muted">{rev.location}</span>
                </div>
                <span className="bg-secondary/30 text-primary font-semibold px-2.5 py-1 rounded-full text-xs">
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
