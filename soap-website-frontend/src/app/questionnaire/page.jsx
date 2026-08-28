// src/app/questionnaire/page.jsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuestionnaireStore } from '@/store/questionnaireStore';
import { questionnaireAPI } from '@/services/api';
import SoapPreview from '@/components/SoapPreview';
import Toast from '@/components/Toast';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Check,
  ShieldCheck,
  Leaf,
  Eye,
  X,
  MapPin,
  Phone,
  HelpCircle,
} from 'lucide-react';

export default function QuestionnairePage() {
  const router = useRouter();
  const store = useQuestionnaireStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Check auth
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/register');
    }
  }, [router]);

  const handleNext = () => {
    const currentQ = store.currentQuestion;

    if (currentQ === 1 && !store.answers.skinType) {
      setError('Please select your skin profile to continue');
      return;
    }
    if (currentQ === 3 && !store.answers.mainConcern) {
      setError('Please select your primary skin concern');
      return;
    }
    if (
      currentQ === 6 &&
      (!store.answers.deliveryAddress ||
        !store.answers.deliveryCity ||
        !store.answers.deliveryPostalCode)
    ) {
      setError('Please complete all mandatory delivery fields');
      return;
    }

    setError('');
    if (store.currentQuestion < 6) {
      store.nextQuestion();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await questionnaireAPI.submit(store.answers);
      const orderId = response.data.orderId;
      router.push(`/order-confirmation?orderId=${orderId}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit questionnaire. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const questions = [
    {
      num: 1,
      title: "What's your primary skin type?",
      description: 'This determines the foundational glycerine and plant butter balance for your soap bar.',
      type: 'radio',
      field: 'skinType',
      options: [
        { value: 'oily', label: 'Oily Skin', desc: 'Excess sebum, visible pores, prone to acne breakouts' },
        { value: 'dry', label: 'Dry & Dehydrated', desc: 'Tight, flaky, dull texture needing deep lipid hydration' },
        { value: 'combination', label: 'Combination Skin', desc: 'Oily T-zone (forehead, nose) with dry or normal cheeks' },
        { value: 'sensitive', label: 'Sensitive / Reactive', desc: 'Prone to redness, easily irritated by synthetic chemicals' },
      ],
    },
    {
      num: 2,
      title: 'Do you have any known botanical allergies?',
      description: 'We strictly exclude selected ingredients from your custom recipe formulation.',
      type: 'checkbox',
      field: 'allergies',
      options: [
        { value: 'fragrance', label: 'Synthetic Fragrance / Chemical Perfumes' },
        { value: 'nuts', label: 'Tree Nuts & Peanut Extract Oils' },
        { value: 'haldi', label: 'Haldi (Turmeric Root Extracts)' },
        { value: 'chandan', label: 'Chandan (Sandalwood Essential Oils)' },
        { value: 'None', label: 'None Of these' },
      ],
    },
    {
      num: 3,
      title: 'What is your primary skin target concern?',
      description: 'Determines the primary active herbal botanical extract in your bespoke bar.',
      type: 'radio',
      field: 'mainConcern',
      options: [
        { value: 'acne', label: 'Acne & Breakouts', desc: 'Infused with anti-bacterial Wild Haldi & Neem' },
        { value: 'dryness', label: 'Deep Moisture & Barrier Repair', desc: 'Infused with Organic Aloe Vera & Raw Shea Butter' },
        { value: 'sensitivity', label: 'Calming Redness & Flares', desc: 'Infused with Pure Chandan & Chamomile' },
        { value: 'general', label: 'Radiance & Natural Glow', desc: 'Infused with Kashmiri Saffron (Kesar) & Vitamin E' },
      ],
    },
    {
      num: 4,
      title: 'Any specific ingredients you wish to exclude?',
      description: 'Customize your preference beyond allergen safety.',
      type: 'checkbox',
      field: 'excludedIngredients',
      options: [
        { value: 'artificial_colors', label: 'Artificial Dyes & Chemical Colorants' },
        { value: 'essential_oils', label: 'Strong Essential Oil Scents' },
        { value: 'exfoliants', label: 'Coarse Exfoliating Seeds' },
      ],
    },
    {
      num: 5,
      title: 'Preferred soap bar texture & lather?',
      description: 'Select your physical bar density and exfoliation preference.',
      type: 'radio',
      field: 'texturePreference',
      options: [
        { value: 'soft', label: 'Soft & Creamy Bar (₹399)', desc: 'Rich velvety moisturization, smooth glide on skin' },
        { value: 'hard', label: 'Hard & Long-Lasting Bar (₹399)', desc: 'Higher density bar formulation, slow melt rate' },
        { value: 'exfoliating', label: 'Gentle Botanical Scrub (+₹50 Addon - ₹449)', desc: 'Infused with fine ground oatmeal & botanical scrub particles' },
      ],
    },
    {
      num: 6,
      title: 'Shipping & Delivery Address',
      description: 'Where should we dispatch your freshly handcrafted soap bar?',
      type: 'text',
      field: 'delivery',
      subFields: [
        { key: 'deliveryAddress', placeholder: 'Flat, House No., Street Address', label: 'Street Address', required: true },
        { key: 'deliveryCity', placeholder: 'City (e.g. Mumbai, Pune)', label: 'City', required: true },
        { key: 'deliveryPostalCode', placeholder: '6-digit PIN Code (e.g. 400001)', label: 'PIN Code', required: true },
        { key: 'deliveryPhone', placeholder: '10-digit Phone Number', label: 'Contact Phone', required: true },
      ],
    },
  ];

  const currentQuestion = questions[store.currentQuestion - 1];

  return (
    <div className="max-w-6xl mx-auto my-6 sm:my-10 px-4 sm:px-6">
      {error && <Toast message={error} type="error" onClose={() => setError('')} />}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Questionnaire Form Side */}
        <div className="lg:col-span-7 bg-white rounded-extra p-6 sm:p-8 shadow-large border border-primary/15">
          {/* Progress Header */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-poppins font-bold text-xs uppercase tracking-wider text-secondary flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Step {store.currentQuestion} of 6
              </span>
              <span className="font-poppins font-bold text-xs text-primary">
                {Math.round((store.currentQuestion / 6) * 100)}% Completed
              </span>
            </div>

            {/* Clickable Step Indicator Pills */}
            <div className="grid grid-cols-6 gap-1.5 pt-1">
              {[1, 2, 3, 4, 5, 6].map((stepNum) => {
                const isCurrent = store.currentQuestion === stepNum;
                const isCompleted = store.currentQuestion > stepNum;
                return (
                  <button
                    key={stepNum}
                    onClick={() => {
                      if (isCompleted || stepNum < store.currentQuestion) {
                        useQuestionnaireStore.setState({ currentQuestion: stepNum });
                      }
                    }}
                    disabled={stepNum > store.currentQuestion}
                    aria-label={`Jump to Step ${stepNum}`}
                    className={`h-2 rounded-full transition-all duration-300 ${isCurrent
                        ? 'bg-primary'
                        : isCompleted
                          ? 'bg-secondary hover:bg-secondary-dark cursor-pointer'
                          : 'bg-cream-dark'
                      }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Question Animated Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={store.currentQuestion}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {/* Question Title & Description */}
              <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-poppins font-bold text-charcoal mb-1.5">
                  {currentQuestion.title}
                </h1>
                <p className="text-xs sm:text-sm text-charcoal-light font-inter">
                  {currentQuestion.description}
                </p>
              </div>

              {/* Radio Options */}
              {currentQuestion.type === 'radio' && (
                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option) => {
                    const isSelected = store.answers[currentQuestion.field] === option.value;
                    return (
                      <label
                        key={option.value}
                        className={`flex items-start p-4 border-2 rounded-large cursor-pointer transition-all ${isSelected
                            ? 'border-primary bg-primary/10 shadow-subtle'
                            : 'border-cream-dark hover:border-primary/40 bg-cream/40'
                          }`}
                      >
                        <input
                          type="radio"
                          name={currentQuestion.field}
                          value={option.value}
                          checked={isSelected}
                          onChange={() => store.updateAnswer(currentQuestion.field, option.value)}
                          className="mt-1 w-4 h-4 text-primary focus:ring-primary"
                        />
                        <div className="ml-3.5">
                          <span className="block font-poppins font-bold text-charcoal text-sm sm:text-base">
                            {option.label}
                          </span>
                          {option.desc && (
                            <span className="block text-xs text-charcoal-light font-inter mt-0.5">
                              {option.desc}
                            </span>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* Checkbox Options */}
              {currentQuestion.type === 'checkbox' && (
                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option) => {
                    const isChecked = store.answers[currentQuestion.field]?.includes(option.value);
                    return (
                      <label
                        key={option.value}
                        className={`flex items-center p-4 border-2 rounded-large cursor-pointer transition-all ${isChecked
                            ? 'border-primary bg-primary/10 shadow-subtle'
                            : 'border-cream-dark hover:border-primary/40 bg-cream/40'
                          }`}
                      >
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={isChecked || false}
                          onChange={(e) => {
                            const currentValues = store.answers[currentQuestion.field] || [];
                            if (e.target.checked) {
                              store.updateAnswer(currentQuestion.field, [...currentValues, option.value]);
                            } else {
                              store.updateAnswer(
                                currentQuestion.field,
                                currentValues.filter((v) => v !== option.value)
                              );
                            }
                          }}
                          className="w-4 h-4 text-primary focus:ring-primary rounded"
                        />
                        <span className="ml-3.5 font-poppins font-bold text-charcoal text-sm">
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* Text Inputs for Delivery Address */}
              {currentQuestion.type === 'text' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {currentQuestion.subFields.map((field) => (
                    <div key={field.key} className={field.key === 'deliveryAddress' ? 'sm:col-span-2' : ''}>
                      <label className="block text-xs font-poppins font-bold uppercase text-charcoal mb-1">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        placeholder={field.placeholder}
                        value={store.answers[field.key] || ''}
                        onChange={(e) => store.updateAnswer(field.key, e.target.value)}
                        className="w-full px-4 py-3 bg-cream/30 border border-cream-dark rounded-large text-sm font-inter text-charcoal focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Action Buttons */}
          <div className="flex gap-3 border-t border-cream-dark pt-6">
            <button
              onClick={() => store.previousQuestion()}
              disabled={store.currentQuestion === 1}
              className="flex items-center justify-center gap-1.5 py-3 px-5 border border-primary/20 text-charcoal rounded-large font-poppins font-bold text-xs hover:bg-cream transition disabled:opacity-30"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            {store.currentQuestion < 6 ? (
              <button
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 px-6 bg-primary text-cream rounded-large font-poppins font-bold text-xs hover:bg-primary-hover transition shadow-medium active:scale-95"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-status-success text-cream rounded-large font-poppins font-bold text-xs hover:bg-emerald-700 transition shadow-medium disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-cream animate-pulse" />
                <span>{loading ? 'Matching Formulation...' : 'Generate Recipe & Place Order'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Desktop Sticky Live Soap Preview */}
        <div className="hidden sm:block lg:col-span-5 lg:sticky lg:top-24">
          <SoapPreview answers={store.answers} />
        </div>
      </div>

      {/* Mobile Floating Button to View Live Soap Preview */}
      <div className="sm:hidden fixed bottom-5 left-4 right-4 z-40">
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="w-full py-3.5 px-5 bg-charcoal text-cream rounded-extra shadow-large border border-primary/40 font-poppins font-bold text-xs flex items-center justify-between backdrop-blur-xl"
        >
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-secondary" />
            <span>View Custom Formula Bar (Live)</span>
          </div>
          <span className="bg-secondary/20 text-secondary text-[10px] px-2.5 py-1 rounded-full font-extrabold uppercase">
            Preview
          </span>
        </button>
      </div>

      {/* Mobile Slide-Up Modal Drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-50 sm:hidden"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 max-h-[85dvh] overflow-y-auto bg-charcoal rounded-t-extra p-5 z-50 sm:hidden shadow-large border-t border-primary/30"
            >
              <div className="flex justify-between items-center pb-3 mb-3 border-b border-white/15">
                <span className="font-poppins font-bold text-xs text-secondary uppercase tracking-wider">
                  Live Soap Formulation
                </span>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-cream"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <SoapPreview answers={store.answers} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
