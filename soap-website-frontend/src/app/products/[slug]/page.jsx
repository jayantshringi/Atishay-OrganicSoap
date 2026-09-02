// src/app/products/[slug]/page.jsx

'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ShoppingBag,
  Check,
  ShieldCheck,
  Leaf,
  Plus,
  Minus,
  Star,
  ArrowLeft,
  Truck,
  RotateCcw,
  MessageSquare,
  Award
} from 'lucide-react';
import Rating from '@/components/Rating';
import PriceTag from '@/components/PriceTag';
import Spinner from '@/components/Spinner';
import { productsAPI } from '@/services/api';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const { addToCart } = useCart();
  const { user, isLoggedIn } = useAuth();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Review Form State
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccessMessage, setReviewSuccessMessage] = useState('');

  useEffect(() => {
    async function loadProductData() {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await productsAPI.getBySlug(slug);
        if (res?.data) {
          setProduct(res.data);
          // Load reviews
          const revRes = await productsAPI.getReviews(res.data.id || slug);
          setReviews(revRes?.data || []);
        }
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProductData();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    setSubmittingReview(true);
    try {
      const res = await productsAPI.addReview(product.id, {
        rating: reviewRating,
        title: reviewTitle,
        comment: reviewComment,
      });

      if (res?.data?.review) {
        setReviews([res.data.review, ...reviews]);
        setReviewTitle('');
        setReviewComment('');
        setReviewSuccessMessage('Thank you! Your verified review has been published.');
        setTimeout(() => setReviewSuccessMessage(''), 4000);
      }
    } catch (err) {
      console.error('Review submit failed:', err);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Spinner size="lg" text="Loading formulation details..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto my-24 p-8 text-center bg-white rounded-extra border border-primary/15 shadow-subtle space-y-4">
        <h2 className="text-xl font-poppins font-bold text-charcoal">Product Not Found</h2>
        <p className="text-xs text-charcoal-light font-inter">
          The requested soap recipe could not be found or may have been retired.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 bg-primary text-cream px-5 py-2.5 rounded-large font-poppins font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Soap Catalog</span>
        </Link>
      </div>
    );
  }

  const galleryImages = product.images?.length > 0 ? product.images : [product.image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-16">
      {/* Back Button */}
      <div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Soaps</span>
        </Link>
      </div>

      {/* Main Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left: Product Images Gallery */}
        <div className="space-y-4">
          <div className="relative w-full aspect-square bg-gradient-to-br from-cream-light via-cream to-cream-dark/40 rounded-extra border border-primary/15 overflow-hidden flex items-center justify-center p-8 shadow-subtle">
            {galleryImages[selectedImage] ? (
              <div className="relative w-full h-full">
                <Image
                  src={galleryImages[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-xl"
                  priority
                />
              </div>
            ) : (
              <Leaf className="w-20 h-20 text-primary/40 animate-pulse" />
            )}

            {/* Category Pill */}
            <span className="absolute top-4 left-4 text-xs font-poppins font-bold uppercase tracking-wider bg-white/90 text-primary px-3 py-1 rounded-full border border-primary/20 backdrop-blur-md shadow-xs">
              {product.category || 'Botanical'}
            </span>
          </div>

          {/* Gallery Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-primary shadow-subtle scale-105'
                      : 'border-cream-dark opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Actions */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Rating value={product.rating || 4.9} count={product.numReviews || 40} size="sm" showNumber />
            <h1 className="text-2xl sm:text-4xl font-poppins font-extrabold text-charcoal leading-tight">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm font-inter text-secondary-dark font-medium italic">
              {product.tagline}
            </p>
          </div>

          {/* Pricing */}
          <div className="bg-cream-light p-4 rounded-xl border border-primary/15 inline-flex items-center gap-4">
            <PriceTag price={product.price} compareAtPrice={product.compareAtPrice} size="lg" />
            <span className="text-[11px] font-inter text-charcoal-light border-l border-cream-dark pl-4">
              Free Shipping on orders above ₹499
            </span>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-charcoal-light font-inter leading-relaxed">
            {product.description || product.shortDescription}
          </p>

          {/* Key Skin Benefits */}
          {product.benefits && (
            <div className="space-y-2 pt-2 border-t border-cream-dark">
              <h3 className="text-xs font-poppins font-bold text-charcoal uppercase tracking-wider">
                Clinical Skin Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-inter text-charcoal">
                    <Check className="w-3.5 h-3.5 text-status-success shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper & Add to Cart */}
          <div className="pt-4 border-t border-cream-dark space-y-4">
            <div className="flex items-center gap-4">
              {/* Quantity Stepper */}
              <div className="flex items-center bg-white border border-primary/20 rounded-large shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 text-charcoal hover:text-primary transition"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-poppins font-bold text-sm text-charcoal">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 text-charcoal hover:text-primary transition"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-large font-poppins font-bold text-sm transition-all shadow-medium active:scale-98 ${
                  added
                    ? 'bg-status-success text-white'
                    : 'bg-primary text-cream hover:bg-primary-hover'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart (₹{product.price * quantity})</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] font-inter text-charcoal-muted">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Cash on Delivery available nationwide. 100% Satisfaction Guarantee.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients Spotlight Section */}
      <div className="bg-white rounded-extra p-6 sm:p-10 border border-primary/15 shadow-subtle space-y-6">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-poppins font-bold text-charcoal">
            Active Botanical Ingredients
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {product.ingredients?.map((ing, idx) => (
            <div
              key={idx}
              className="bg-cream/50 p-4 rounded-xl border border-primary/10 flex items-center gap-3"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0" />
              <span className="text-xs sm:text-sm font-poppins font-semibold text-charcoal">
                {ing}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews & Write Review Section */}
      <div className="bg-white rounded-extra p-6 sm:p-10 border border-primary/15 shadow-subtle space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-cream-dark pb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-poppins font-bold text-charcoal flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span>Customer Reviews &amp; Experiences</span>
            </h2>
            <p className="text-xs text-charcoal-light font-inter mt-1">
              Real feedback from customers using this bespoke organic formulation.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-cream px-4 py-2 rounded-large border border-primary/15">
            <Rating value={product.rating || 4.9} size="md" />
            <span className="font-poppins font-extrabold text-sm text-charcoal">
              {product.rating || 4.9} / 5.0
            </span>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-xs text-charcoal-light italic">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-cream/40 p-5 rounded-xl border border-primary/10 space-y-2.5"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-poppins font-bold text-xs sm:text-sm text-charcoal">
                        {rev.userName}
                      </h4>
                      <Rating value={rev.rating} size="xs" />
                    </div>
                    <span className="text-[10px] text-charcoal-muted font-inter">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {rev.title && (
                    <p className="font-poppins font-semibold text-xs text-secondary-dark">
                      {rev.title}
                    </p>
                  )}
                  <p className="text-xs font-inter text-charcoal-light leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Write a Review Box */}
        <div className="pt-6 border-t border-cream-dark">
          <h3 className="text-base font-poppins font-bold text-charcoal mb-4">
            Write a Verified Review
          </h3>

          {reviewSuccessMessage && (
            <div className="p-4 bg-status-success/10 border border-status-success/30 rounded-large text-xs text-status-success font-poppins font-semibold mb-4 flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{reviewSuccessMessage}</span>
            </div>
          )}

          {isLoggedIn ? (
            <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-poppins font-bold text-charcoal mb-1">
                  Your Overall Rating
                </label>
                <Rating
                  value={reviewRating}
                  interactive
                  onChange={setReviewRating}
                  size="md"
                  showNumber
                />
              </div>

              <div>
                <label className="block text-xs font-poppins font-bold text-charcoal mb-1">
                  Review Headline (optional)
                </label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  placeholder="e.g. Cleared my skin in 2 weeks!"
                  className="w-full px-3.5 py-2 text-xs font-inter rounded-large bg-cream/50 border border-primary/20 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-poppins font-bold text-charcoal mb-1">
                  Your Detailed Review
                </label>
                <textarea
                  required
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Describe your skin improvements, texture feel, and aroma..."
                  className="w-full px-3.5 py-2 text-xs font-inter rounded-large bg-cream/50 border border-primary/20 focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={submittingReview}
                className="bg-primary text-cream px-6 py-2.5 rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition shadow-subtle"
              >
                {submittingReview ? 'Publishing...' : 'Submit Review'}
              </button>
            </form>
          ) : (
            <div className="bg-cream p-5 rounded-large border border-primary/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-charcoal font-inter">
                Please log in to share your experience with this soap bar.
              </p>
              <Link
                href={`/login?redirect=/products/${slug}`}
                className="bg-primary text-cream px-4 py-2 rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition shrink-0"
              >
                Log In to Review
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
