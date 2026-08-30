// src/app/layout.jsx

import { Poppins, Inter, Lora } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata = {
  title: 'Atishay | Luxury Personalized Organic Soap Tailored to Your Skin',
  description: 'Custom handcrafted organic soap recipes designed for your unique skin type, concerns, and allergies in India.',
  keywords: 'custom soap, personalized skincare, organic soap, haldi soap, aloe vera soap, razorpay, handmade soap India, ayurvedic skincare',
  openGraph: {
    title: 'Atishay | Bespoke Organic Skincare Crafted Just For You',
    description: 'Answer 5 questions. Receive clinically tailored organic glycerine soap bars with pure Haldi, Aloe, Chandan, and Kesar.',
    type: 'website',
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} ${lora.variable} scroll-smooth`}>
      <body className="font-inter bg-cream text-charcoal min-h-screen flex flex-col justify-between antialiased selection:bg-primary/20 selection:text-primary">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
