// src/components/ProductCard.jsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Check, Sparkles, ArrowRight } from 'lucide-react';
import Rating from './Rating';
import PriceTag from './PriceTag';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const categoryColors = {
    hydration: 'bg-primary/15 text-primary-dark border-primary/25',
    acne: 'bg-status-error/10 text-status-error border-status-error/20',
    sensitive: 'bg-secondary/20 text-secondary-dark border-secondary/30',
    radiance: 'bg-amber-100 text-amber-800 border-amber-200',
  };

  const badgeClass = categoryColors[product.category?.toLowerCase()] || 'bg-cream text-charcoal border-cream-dark';

  return (
    <div className="group bg-white rounded-extra border border-primary/15 shadow-subtle hover:shadow-large transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      {/* Top Banner & Image Container */}
      <Link href={`/products/${product.slug || product.id}`} className="block relative">
        <div className="relative w-full aspect-square bg-gradient-to-br from-cream-light via-cream to-cream-dark/50 overflow-hidden flex items-center justify-center p-6">
          {product.image ? (
            <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain drop-shadow-md"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
              <Sparkles className="w-10 h-10 animate-pulse" />
            </div>
          )}

          {/* Category Tag */}
          <span
            className={`absolute top-3 left-3 text-[10px] font-poppins font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md shadow-xs ${badgeClass}`}
          >
            {product.category || 'Botanical'}
          </span>

          {/* Skin Type Badge */}
          {product.skinType && (
            <span className="absolute bottom-3 left-3 text-[10px] font-inter font-semibold bg-white/90 text-charcoal px-2 py-0.5 rounded-md border border-cream-dark/80 backdrop-blur-sm capitalize">
              For {product.skinType} Skin
            </span>
          )}
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-3">
        <div className="space-y-1.5">
          <Rating value={product.rating || 4.9} count={product.numReviews || 36} size="xs" />

          <Link href={`/products/${product.slug || product.id}`}>
            <h3 className="font-poppins font-bold text-sm sm:text-base text-charcoal group-hover:text-primary transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-charcoal-light font-inter line-clamp-2 leading-relaxed">
            {product.shortDescription || product.tagline || 'Artisanal organic melt-and-pour glycerine bar.'}
          </p>
        </div>

        {/* Pricing & Add-to-Cart Action */}
        <div className="pt-2 border-t border-cream-dark flex items-center justify-between gap-2 mt-auto">
          <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />

          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.name} to cart`}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-large text-xs font-poppins font-bold transition-all shadow-subtle active:scale-95 ${
              added
                ? 'bg-status-success text-white'
                : 'bg-primary text-cream hover:bg-primary-hover hover:shadow-medium'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
