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
          hover: '#4E6A5F',
          dark: '#3D5047',
          darker: '#2E3D36',
          light: '#E8EAE1',
          surface: '#F2F4EE',
        },
        secondary: {
          DEFAULT: '#D4A574', // Warm Gold
          hover: '#C29463',
          light: '#F7EBDD',
          dark: '#B58552',
        },
        accent: {
          DEFAULT: '#8B7355', // Earth Brown
          hover: '#7A6449',
          light: '#E8D5CC',   // Soft Blush
          dark: '#5D4E39',
        },
        cream: {
          DEFAULT: '#F9F7F2', // Background Off-White
          light: '#FCFBF8',
          dark: '#EFECE4',
          muted: '#E5E1D5',
        },
        charcoal: {
          DEFAULT: '#2B3B3B', // Deep Charcoal Text
          light: '#596565',   // Body Subtitle
          muted: '#8C9797',   // Borders & Placeholders
        },
        botanical: {
          aloe: '#78B89E',
          haldi: '#E8B84F',
          chandan: '#D4A882',
          kesar: '#F48E4D',
          neem: '#4E8A63',
        },
        status: {
          error: '#D64545',
          'error-bg': '#FDF2F2',
          success: '#4E9E67',
          'success-bg': '#F0F9F3',
          warning: '#D97706',
          'warning-bg': '#FEF3C7',
          info: '#2563EB',
          'info-bg': '#EFF6FF',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
        lora: ['var(--font-lora)', 'Lora', 'serif'],
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(43, 59, 59, 0.05)',
        'medium': '0 8px 24px -4px rgba(43, 59, 59, 0.08)',
        'large': '0 16px 40px -8px rgba(43, 59, 59, 0.12)',
        'antigravity': '0 20px 40px -10px rgba(43, 59, 59, 0.10)',
        'soap-glow': '0 20px 50px -10px rgba(93, 123, 111, 0.35)',
        'inner-light': 'inset 0 1px 2px 0 rgba(255, 255, 255, 0.6)',
      },
      borderRadius: {
        'subtle': '6px',
        'default': '10px',
        'large': '14px',
        'extra': '20px',
        'pill': '9999px',
      },
    },
  },
  plugins: [],
};
