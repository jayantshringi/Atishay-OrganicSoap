// src/app/page.jsx

'use client';

import HeroSection from '@/components/Sections/HeroSection';
import HowItWorks from '@/components/Sections/HowItWorks';
import QuizPreviewSection from '@/components/Sections/QuizPreviewSection';
import Testimonials from '@/components/Sections/Testimonials';
import BestSellers from '@/components/Sections/BestSellers';
import BrandStoryTrust from '@/components/Sections/BrandStoryTrust';

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <QuizPreviewSection />
      <BestSellers />
      <BrandStoryTrust />
      <Testimonials />
    </>
  );
}
