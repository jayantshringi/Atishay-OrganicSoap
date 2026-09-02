// src/app/quiz/page.jsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  ShoppingBag,
  ShieldAlert,
  RotateCcw,
  Leaf,
  Award
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { quizAPI } from '@/services/api';
import SoapPreview from '@/components/SoapPreview';
import PriceTag from '@/components/PriceTag';
import Rating from '@/components/Rating';

const QUESTIONS = [
  {
    id: 'skinType',
    title: '1. What is your primary skin type?',
    subtitle: 'This determines the moisturizing glycerine balance and lipid ratio.',
    options: [
      { id: 'oily', label: 'Oily / Breakout-Prone', desc: 'Excess shine, visible pores, frequent blemishes' },
      { id: 'dry', label: 'Dry / Dehydrated', desc: 'Tight feeling, flaking, dullness, needs deep hydration' },
      { id: 'combination', label: 'Combination (T-Zone)', desc: 'Oily forehead and nose, normal or dry cheeks' },
      { id: 'sensitive', label: 'Sensitive & Reactive', desc: 'Easily irritated, prone to redness and stinging' },
    ],
  },
  {
    id: 'concerns',
    title: '2. What skin concerns would you like to address?',
    subtitle: 'Select your most critical skincare focus.',
    options: [
      { id: 'acne', label: 'Purifying Active Acne & Blemishes', desc: 'Clear congested pores and calm redness' },
      { id: 'hydration', label: 'Deep 24-Hour Hydration Lock', desc: 'Replenish moisture barrier without oily film' },
      { id: 'sensitivity', label: 'Soothing Redness & Calming', desc: 'Zero artificial perfume, hypoallergenic care' },
      { id: 'radiance', label: 'Brightening Tone & Natural Glow', desc: 'Antioxidant saffron therapy for luminous skin' },
    ],
  },
  {
    id: 'allergens',
    title: '3. Do you have any known botanical sensitivities?',
    subtitle: 'We will strictly filter and exclude these extracts from your recipe.',
    isMulti: true,
    options: [
      { id: 'none', label: 'No Known Sensitivities', desc: 'All organic botanical extracts are safe for me' },
      { id: 'nuts', label: 'Nut Oils (Almond, Walnut)', desc: 'Exclude sweet almond and walnut extracts' },
      { id: 'turmeric', label: 'Turmeric Sensitivity', desc: 'Exclude raw kasturi turmeric' },
      { id: 'lavender', label: 'Strong Essential Oils', desc: 'Exclude concentrated floral aromas' },
    ],
  },
  {
    id: 'texture',
    title: '4. What bar texture and lather do you prefer?',
    subtitle: 'Choose how your soap feels during daily bathing.',
    options: [
      { id: 'soft', label: 'Silky Cream Lather', desc: 'Gentle, soothing foam with rich vegetable glycerine' },
      { id: 'hard', label: 'Long-Lasting Dense Bar', desc: 'Slow-melting artisan cured bar' },
      { id: 'exfoliating', label: 'Botanical Scrub (+₹50)', desc: 'Infused with gentle walnut and oat granules' },
    ],
  },
  {
    id: 'aroma',
    title: '5. What aromatherapy note resonates with you?',
    subtitle: '100% steam-distilled pure essential oil fragrances.',
    options: [
      { id: 'sandalwood', label: 'Calming Mysore Sandalwood', desc: 'Warm, earthy, and spiritually grounding' },
      { id: 'fresh', label: 'Cooling Herbal Mint & Aloe', desc: 'Invigorating and crisp morning energy' },
      { id: 'saffron', label: 'Royal Kashmiri Saffron & Rose', desc: 'Luxurious floral and opulent golden aroma' },
      { id: 'unscented', label: 'Pure Fragrance-Free', desc: 'Zero essential oils, pure unscented bar' },
    ],
  },
];

export default function QuizPage() {
  const router = useRouter();
  const { addToCart } = useCart();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    skinType: 'combination',
    concerns: ['radiance'],
    allergens: ['none'],
    texture: 'soft',
    aroma: 'saffron',
  });

  const [recommendation, setRecommendation] = useState(null);
  const [loadingOutcome, setLoadingOutcome] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const q = QUESTIONS[currentStep];

  const handleSelectOption = (optId) => {
    if (q.isMulti) {
      setAnswers((prev) => {
        const currentList = prev[q.id] || [];
        if (optId === 'none') {
          return { ...prev, [q.id]: ['none'] };
        }
        const filtered = currentList.filter((item) => item !== 'none');
        const exists = filtered.includes(optId);
        const nextList = exists
          ? filtered.filter((item) => item !== optId)
          : [...filtered, optId];
        return { ...prev, [q.id]: nextList.length > 0 ? nextList : ['none'] };
      });
    } else {
      setAnswers((prev) => ({
        ...prev,
        [q.id]: optId,
      }));
    }
  };

  const handleNext = async () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete quiz and evaluate recommendation
      setLoadingOutcome(true);
      try {
        const res = await quizAPI.evaluate({
          skinType: answers.skinType,
          concerns: answers.concerns,
          allergens: answers.allergens,
          texture: answers.texture,
          aroma: answers.aroma,
        });

        if (res?.data) {
          setRecommendation(res.data);
        }
      } catch (err) {
        console.error('Quiz evaluation error:', err);
      } finally {
        setLoadingOutcome(false);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddRecommendedToCart = () => {
    if (!recommendation?.matchedProduct) return;
    addToCart(recommendation.matchedProduct, 1, {
      skinType: answers.skinType,
      texture: answers.texture,
      aroma: answers.aroma,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const progressPercent = Math.round(((currentStep + 1) / QUESTIONS.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-secondary font-poppins font-bold uppercase tracking-wider text-xs bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          5-Step Ayurvedic Diagnostic Engine
        </span>
        <h1 className="text-3xl sm:text-4xl font-poppins font-extrabold text-charcoal">
          Personalized Skin Diagnostic
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-light font-inter">
          Answer 5 clinical questions to match your precise botanical formulation and soap texture.
        </p>
      </div>

      {!recommendation ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
          {/* Left: Dynamic 3D Soap Visualizer Preview */}
          <div className="lg:col-span-5 bg-white rounded-extra p-6 border border-primary/15 shadow-subtle flex flex-col items-center space-y-4">
            <h3 className="font-poppins font-bold text-xs uppercase tracking-wider text-charcoal-light">
              Live Soap Formulation Preview
            </h3>
            <SoapPreview
              skinType={answers.skinType}
              texturePreference={answers.texture}
              mainConcern={answers.concerns[0] || 'radiance'}
            />
            <div className="w-full bg-cream/70 rounded-xl p-3 border border-primary/10 text-center text-xs font-inter text-charcoal-light">
              <span>Selected Profile: </span>
              <strong className="text-primary capitalize">{answers.skinType} Skin</strong>
              <span> • </span>
              <strong className="text-secondary-dark capitalize">{answers.texture} Bar</strong>
            </div>
          </div>

          {/* Right: Question Card */}
          <div className="lg:col-span-7 bg-white rounded-extra p-6 sm:p-8 border border-primary/15 shadow-large space-y-6">
            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-poppins font-semibold text-charcoal-light">
                <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
                <span>{progressPercent}% Complete</span>
              </div>
              <div className="w-full h-2 bg-cream rounded-full overflow-hidden border border-cream-dark">
                <div
                  className="h-full bg-primary transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Title */}
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-poppins font-bold text-charcoal">
                {q.title}
              </h2>
              <p className="text-xs text-charcoal-light font-inter">
                {q.subtitle}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {q.options.map((opt) => {
                const isSelected = q.isMulti
                  ? (answers[q.id] || []).includes(opt.id)
                  : answers[q.id] === opt.id;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-primary bg-primary/10 shadow-xs'
                        : 'border-cream-dark bg-cream/40 hover:bg-cream hover:border-primary/30'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <p className={`font-poppins font-bold text-xs sm:text-sm ${
                        isSelected ? 'text-primary' : 'text-charcoal'
                      }`}>
                        {opt.label}
                      </p>
                      <p className="text-[11px] font-inter text-charcoal-light">
                        {opt.desc}
                      </p>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-primary border-primary text-cream'
                        : 'border-cream-dark bg-white'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Nav Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-cream-dark">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold text-charcoal hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={loadingOutcome}
                className="inline-flex items-center gap-2 bg-primary text-cream px-6 py-3 rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition-all shadow-medium active:scale-95"
              >
                {currentStep === QUESTIONS.length - 1 ? (
                  loadingOutcome ? 'Analyzing...' : 'Discover Prescription'
                ) : (
                  <>
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Results / Prescription View */
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-extra p-6 sm:p-10 border border-primary/15 shadow-large space-y-8"
        >
          <div className="text-center space-y-2 border-b border-cream-dark pb-6">
            <span className="text-secondary font-poppins font-bold text-xs uppercase tracking-wider bg-secondary/15 px-3 py-1 rounded-full border border-secondary/30 inline-flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Prescription Matched
            </span>
            <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-charcoal">
              Your Tailored Ayurvedic Soap Recommendation
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-light font-inter max-w-xl mx-auto">
              {recommendation.recommendationNote || 'Here is the ideal handcrafted formulation for your skin profile.'}
            </p>
          </div>

          {/* Matched Product Card */}
          {recommendation.matchedProduct && (
            <div className="bg-cream/50 rounded-extra p-6 sm:p-8 border border-primary/15 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Product Visual */}
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-primary/10 shadow-subtle">
                <SoapPreview
                  skinType={answers.skinType}
                  texturePreference={answers.texture}
                  mainConcern={answers.concerns[0] || 'radiance'}
                />
              </div>

              {/* Product Info & Actions */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-poppins font-bold uppercase tracking-wider bg-primary/15 text-primary px-2.5 py-0.5 rounded-full">
                    {recommendation.matchedProduct.category} Care
                  </span>
                  <h3 className="text-xl font-poppins font-bold text-charcoal">
                    {recommendation.matchedProduct.name}
                  </h3>
                  <Rating value={recommendation.matchedProduct.rating || 4.9} size="xs" showNumber />
                </div>

                <p className="text-xs text-charcoal-light font-inter leading-relaxed">
                  {recommendation.matchedProduct.shortDescription || recommendation.matchedProduct.description}
                </p>

                {/* Ingredients Included */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-poppins font-bold text-charcoal flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-primary" />
                    <span>Included Pure Extracts:</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {recommendation.matchedProduct.ingredients?.slice(0, 4).map((ing, i) => (
                      <span key={i} className="text-[10px] font-inter bg-white px-2 py-0.5 rounded-md border border-cream-dark text-charcoal">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-cream-dark flex items-center justify-between gap-4">
                  <PriceTag price={recommendation.matchedProduct.price} size="lg" />

                  <button
                    type="button"
                    onClick={handleAddRecommendedToCart}
                    className={`flex items-center gap-2 px-5 py-3 rounded-large font-poppins font-bold text-xs transition-all shadow-subtle active:scale-95 ${
                      addedToCart
                        ? 'bg-status-success text-white'
                        : 'bg-primary text-cream hover:bg-primary-hover'
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart (COD)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Retake & Explore Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-cream-dark">
            <button
              type="button"
              onClick={() => {
                setRecommendation(null);
                setCurrentStep(0);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-poppins font-bold text-charcoal hover:text-primary"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Diagnostic Quiz</span>
            </button>

            <Link
              href="/cart"
              className="inline-flex items-center gap-2 bg-secondary text-charcoal px-6 py-2.5 rounded-large font-poppins font-bold text-xs hover:bg-secondary-hover transition shadow-subtle"
            >
              <span>View Cart &amp; Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
