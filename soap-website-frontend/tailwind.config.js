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
          DEFAULT: '#6B4423',
          dark: '#4A2E16',
          light: '#8C5A32',
        },
        secondary: {
          DEFAULT: '#A8D5BA',
          light: '#E2F0D9',
          dark: '#7BB594',
        },
        accent: {
          DEFAULT: '#D4AF37',
          hover: '#B59325',
          light: '#F4E8B8',
        },
        neutral: {
          DEFAULT: '#F9F6F0',
          dark: '#EFE7DA',
        },
        text: {
          DEFAULT: '#2C2A29',
          muted: '#6B6865',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        opensans: ['var(--font-opensans)', 'Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
