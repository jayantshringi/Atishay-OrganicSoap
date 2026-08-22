// src/app/page.jsx

'use client';

import HeroSection from '@/components/Sections/HeroSection';
import HowItWorks from '@/components/Sections/HowItWorks';
import IngredientsShowcase from '@/components/Sections/IngredientsShowcase';
import Testimonials from '@/components/Sections/Testimonials';
import FAQSection from '@/components/Sections/FAQSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <IngredientsShowcase />
      <Testimonials />
      <FAQSection />
    </>
  );
}
