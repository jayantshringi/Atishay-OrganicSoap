/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5D7B6F', // Sage Green
          dark: '#4A6157',
          darker: '#3D5047',
          light: '#E8EAE1',
        },
        secondary: {
          DEFAULT: '#D4A574', // Warm Gold
          hover: '#C29463',
          light: '#F7EBDD',
          dark: '#B58552',
        },
        accent: {
          DEFAULT: '#8B7355', // Earth Brown
          light: '#E8D5CC', // Soft Blush
          dark: '#6E5B43',
        },
        cream: {
          DEFAULT: '#F9F7F2', // Background Off-White
          dark: '#EFECE4',
        },
        charcoal: {
          DEFAULT: '#2B3B3B', // Deep Charcoal Text
          light: '#6B7477', // Text Light/Muted
        },
        botanical: {
          aloe: '#C8E6E1',     // Pale Aqua
          haldi: '#E8B84F',    // Turmeric Yellow
          chandan: '#E8D4C4',  // Sandalwood Cream
          kesar: '#F4A64D',    // Saffron Orange
        },
        status: {
          error: '#D64545',
          success: '#5FA85F',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
        lora: ['var(--font-lora)', 'Lora', 'serif'],
      },
      boxShadow: {
        'subtle': '0px 2px 8px rgba(0, 0, 0, 0.06)',
        'medium': '0px 4px 16px rgba(0, 0, 0, 0.10)',
        'large': '0px 8px 24px rgba(0, 0, 0, 0.12)',
        'hover': '0px 4px 12px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'subtle': '4px',
        'default': '8px',
        'large': '12px',
        'extra': '16px',
      },
    },
  },
  plugins: [],
};
