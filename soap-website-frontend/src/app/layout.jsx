// src/app/layout.jsx

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../styles/globals.css';

export const metadata = {
  title: 'SoapCo | Personalized Organic Soap Tailored to Your Skin',
  description: 'Custom handcrafted organic soap recipes designed for your unique skin type, concerns, and allergies in India.',
  keywords: 'custom soap, personalized skincare, organic soap, haldi soap, aloe vera soap, razorpay, handmade soap India',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className="font-opensans bg-neutral text-text min-h-screen flex flex-col justify-between antialiased">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
