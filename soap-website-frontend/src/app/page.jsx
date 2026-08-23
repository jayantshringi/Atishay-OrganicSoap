// src/app/page.jsx

'use client';

import HeroSection from '@/components/Sections/HeroSection';
import HowItWorks from '@/components/Sections/HowItWorks';
import IngredientsShowcase from '@/components/Sections/IngredientsShowcase';
import QuizPreviewSection from '@/components/Sections/QuizPreviewSection';
import Testimonials from '@/components/Sections/Testimonials';
import BestSellers from '@/components/Sections/BestSellers';
import BrandStoryTrust from '@/components/Sections/BrandStoryTrust';
import FAQSection from '@/components/Sections/FAQSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <IngredientsShowcase />
      <QuizPreviewSection />
      <BestSellers />
      <BrandStoryTrust />
      <Testimonials />
      <FAQSection />
    </>
  );
}
