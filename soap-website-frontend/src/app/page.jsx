// src/app/page.jsx

import dynamic from 'next/dynamic';
import HeroSection from '@/components/Sections/HeroSection';

// Dynamically import below-the-fold components to reduce initial JS payload
const HowItWorks = dynamic(() => import('@/components/Sections/HowItWorks'));
const QuizPreviewSection = dynamic(() => import('@/components/Sections/QuizPreviewSection'));
const Testimonials = dynamic(() => import('@/components/Sections/Testimonials'));
const BestSellers = dynamic(() => import('@/components/Sections/BestSellers'));
const BrandStoryTrust = dynamic(() => import('@/components/Sections/BrandStoryTrust'));

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
