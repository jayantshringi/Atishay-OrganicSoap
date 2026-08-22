// src/store/questionnaireStore.js

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useQuestionnaireStore = create(
  persist(
    (set, get) => ({
      // State
      answers: {
        skinType: null,
        allergies: [],
        mainConcern: null,
        excludedIngredients: [],
        texturePreference: 'soft',
        deliveryAddress: '',
        deliveryCity: '',
        deliveryPostalCode: '',
        deliveryPhone: '',
      },
      currentQuestion: 1,

      // Actions
      updateAnswer: (field, value) => {
        set((state) => ({
          answers: { ...state.answers, [field]: value },
        }));
      },

      nextQuestion: () => {
        set((state) => ({
          currentQuestion: Math.min(state.currentQuestion + 1, 6),
        }));
      },

      previousQuestion: () => {
        set((state) => ({
          currentQuestion: Math.max(state.currentQuestion - 1, 1),
        }));
      },

      resetQuestionnaire: () => {
        set({
          answers: {
            skinType: null,
            allergies: [],
            mainConcern: null,
            excludedIngredients: [],
            texturePreference: 'soft',
            deliveryAddress: '',
            deliveryCity: '',
            deliveryPostalCode: '',
            deliveryPhone: '',
          },
          currentQuestion: 1,
        });
      },
    }),
    {
      name: 'questionnaire-store',
    }
  )
);
