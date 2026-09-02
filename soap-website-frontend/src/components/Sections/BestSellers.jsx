// src/components/Sections/BestSellers.jsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import Spinner from '@/components/Spinner';
import { productsAPI, DEMO_PRODUCTS } from '@/services/api';

export default function BestSellers() {
  const [products, setProducts] = useState(DEMO_PRODUCTS.slice(0, 2));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadBestSellers() {
      try {
        const res = await productsAPI.getAll();
        if (res?.data?.products && res.data.products.length > 0) {
          const allowedSlugs = ['aloe-vera-shea-hydration-bar', 'haldi-neem-anti-acne-bar'];
          const filtered = res.data.products.filter(
            (p) => allowedSlugs.includes(p.slug) || ['hydration', 'acne'].includes(p.category)
          );
          if (filtered.length > 0) {
            setProducts(filtered.slice(0, 2));
          }
        }
      } catch (err) {
        console.error('Failed to load best sellers:', err);
      }
    }
    loadBestSellers();
  }, []);

  return (
    <section id="bestsellers" className="py-16 sm:py-24 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <span className="text-secondary font-poppins font-bold uppercase tracking-wider text-xs bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30 inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            Most Loved Formulations
          </span>
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-charcoal">
            Flagship Best Sellers
          </h2>
          <p className="text-charcoal-light text-sm sm:text-base font-inter">
            Pure vegetable glycerine bars infused with cold-pressed botanical extracts. Each recipe is balanced to pH 5.5 for optimal skin barrier health.
          </p>
        </motion.div>

        {/* Product Cards Responsive 2-Col Grid */}
        {loading ? (
          <Spinner size="lg" text="Loading Best Sellers..." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        )}

        {/* Bottom CTA Link */}
        <div className="text-center pt-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-poppins font-bold text-primary hover:text-primary-hover transition group bg-white px-6 py-3 rounded-full border border-primary/20 shadow-subtle hover:shadow-medium"
          >
            <span>Explore Complete Ayurvedic Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
