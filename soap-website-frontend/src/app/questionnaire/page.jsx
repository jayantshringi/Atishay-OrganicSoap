// src/app/questionnaire/page.jsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuestionnaireStore } from '@/store/questionnaireStore';
import { questionnaireAPI } from '@/services/api';
import SoapPreview from '@/components/SoapPreview';
import Toast from '@/components/Toast';

export default function QuestionnairePage() {
  const router = useRouter();
  const store = useQuestionnaireStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      setError('Please select your skin type to continue');
      return;
    }
    if (currentQ === 6 && (!store.answers.deliveryAddress || !store.answers.deliveryCity || !store.answers.deliveryPostalCode)) {
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
      description: "This determines the foundational glycerine & butter balance for your soap bar.",
      type: 'radio',
      field: 'skinType',
      options: [
        { value: 'oily', label: 'Oily Skin', desc: 'Excess sebum, visible pores, prone to acne' },
        { value: 'dry', label: 'Dry Skin', desc: 'Tight, flaky, dull texture needing deep hydration' },
        { value: 'combination', label: 'Combination Skin', desc: 'Oily T-zone (forehead, nose) with dry cheeks' },
        { value: 'sensitive', label: 'Sensitive Skin', desc: 'Redness, easily irritated by synthetic chemicals' },
      ],
    },
    {
      num: 2,
      title: 'Do you have any known botanical allergies?',
      description: 'We strictly exclude selected ingredients from your custom recipe formula.',
      type: 'checkbox',
      field: 'allergies',
      options: [
        { value: 'fragrance', label: 'Synthetic Fragrance/Perfume' },
        { value: 'nuts', label: 'Tree Nuts & Peanut Extracts' },
        { value: 'haldi', label: 'Haldi (Turmeric Extracts)' },
        { value: 'chandan', label: 'Chandan (Sandalwood Essential Oil)' },
      ],
    },
    {
      num: 3,
      title: "What is your main skin target concern?",
      description: 'Helps us select the primary active herbal botanical extract.',
      type: 'radio',
      field: 'mainConcern',
      options: [
        { value: 'acne', label: 'Acne & Breakouts', desc: 'Infused with anti-bacterial Haldi & Neem' },
        { value: 'dryness', label: 'Deep Moisture & Hydration', desc: 'Infused with Aloe Vera & Shea' },
        { value: 'sensitivity', label: 'Calming Redness & Irritation', desc: 'Infused with Chandan & Chamomile' },
        { value: 'general', label: 'General Nourishment & Glow', desc: 'Infused with Kesar (Saffron) & Vitamins' },
      ],
    },
    {
      num: 4,
      title: 'Any specific ingredients you wish to exclude?',
      description: 'Customize your preference beyond allergen safety.',
      type: 'checkbox',
      field: 'excludedIngredients',
      options: [
        { value: 'artificial_colors', label: 'Artificial Dyes/Coloring' },
        { value: 'essential_oils', label: 'Strong Essential Oils' },
        { value: 'exfoliants', label: 'Coarse Exfoliants' },
      ],
    },
    {
      num: 5,
      title: 'Preferred soap bar texture & lather?',
      description: 'Select your physical bar formulation preference.',
      type: 'radio',
      field: 'texturePreference',
      options: [
        { value: 'soft', label: 'Soft & Creamy Bar (₹399)', desc: 'Rich moisturization, smooth glide' },
        { value: 'hard', label: 'Hard & Long-Lasting Bar (₹399)', desc: 'Higher density bar, slow melt' },
        { value: 'exfoliating', label: 'Gentle Exfoliating Scrub (+₹50 Addon - ₹449)', desc: 'Infused with ground oatmeal/botanical scrub' },
      ],
    },
    {
      num: 6,
      title: 'Shipping & Delivery Address',
      description: 'Where should we dispatch your custom handcrafted soap?',
      type: 'text',
      field: 'delivery',
      subFields: [
        { key: 'deliveryAddress', placeholder: 'Flat, House No., Street Address', label: 'Street Address' },
        { key: 'deliveryCity', placeholder: 'City (e.g. Mumbai, Pune)', label: 'City' },
        { key: 'deliveryPostalCode', placeholder: '6-digit PIN Code (e.g. 400001)', label: 'PIN Code' },
        { key: 'deliveryPhone', placeholder: 'Contact Phone Number', label: 'Phone' },
      ],
    },
  ];

  const currentQuestion = questions[store.currentQuestion - 1];

  return (
    <div className="max-w-6xl mx-auto my-6 sm:my-8 px-4 sm:px-6">
      {error && <Toast message={error} type="error" onClose={() => setError('')} />}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Questionnaire Form Side */}
        <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl border border-amber-900/10">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="font-poppins font-bold text-xs uppercase tracking-wider text-accent">
                Step {store.currentQuestion} of 6
              </span>
              <span className="font-poppins font-bold text-xs text-primary">
                {Math.round((store.currentQuestion / 6) * 100)}% Completed
              </span>
            </div>
            <div className="w-full bg-neutral rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-accent h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(store.currentQuestion / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-poppins font-bold text-primary mb-2">
              {currentQuestion.title}
            </h2>
            <p className="text-sm text-text-muted">
              {currentQuestion.description}
            </p>
          </div>

          {/* Question Input Controls */}
          <div className="space-y-4 mb-10">
            {currentQuestion.type === 'radio' && (
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option) => {
                  const isSelected = store.answers[currentQuestion.field] === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`flex items-start p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                        isSelected
                          ? 'border-accent bg-accent/10 shadow-sm'
                          : 'border-gray-100 hover:border-accent/40 bg-neutral/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name={currentQuestion.field}
                        value={option.value}
                        checked={isSelected}
                        onChange={() => store.updateAnswer(currentQuestion.field, option.value)}
                        className="mt-1 w-4 h-4 text-accent focus:ring-accent"
                      />
                      <div className="ml-3">
                        <span className="block font-poppins font-bold text-primary text-base">
                          {option.label}
                        </span>
                        {option.desc && (
                          <span className="block text-xs text-text-muted mt-0.5">
                            {option.desc}
                          </span>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === 'checkbox' && (
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option) => {
                  const isChecked = store.answers[currentQuestion.field]?.includes(option.value);
                  return (
                    <label
                      key={option.value}
                      className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${
                        isChecked
                          ? 'border-accent bg-accent/10 shadow-sm'
                          : 'border-gray-100 hover:border-accent/40 bg-neutral/30'
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
                        className="w-4 h-4 text-accent focus:ring-accent rounded"
                      />
                      <span className="ml-3 font-poppins font-bold text-primary text-sm">
                        {option.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === 'text' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQuestion.subFields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-bold uppercase text-primary mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={store.answers[field.key] || ''}
                      onChange={(e) => store.updateAnswer(field.key, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-4 border-t border-gray-100 pt-6">
            <button
              onClick={() => store.previousQuestion()}
              disabled={store.currentQuestion === 1}
              className="flex-1 py-3 px-6 border border-primary/20 text-primary rounded-xl font-poppins font-bold hover:bg-neutral transition disabled:opacity-30"
            >
              ← Back
            </button>

            {store.currentQuestion < 6 ? (
              <button
                onClick={handleNext}
                className="flex-1 py-3 px-6 bg-accent text-white rounded-xl font-poppins font-bold hover:bg-accent-hover transition shadow-md"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-3 px-6 bg-emerald-600 text-white rounded-xl font-poppins font-bold hover:bg-emerald-700 transition shadow-md disabled:opacity-50"
              >
                {loading ? 'Matching Recipe...' : 'Generate My Recipe & Order'}
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Soap Preview Side — hidden on small mobile, shows on sm+ */}
        <div className="hidden sm:block lg:col-span-5 lg:sticky lg:top-24">
          <SoapPreview answers={store.answers} />
        </div>
      </div>
    </div>
  );
}
