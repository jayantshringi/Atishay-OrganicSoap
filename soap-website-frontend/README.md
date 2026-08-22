# Soap Website Frontend

Next.js 14 + React + Tailwind CSS frontend for personalized soap e-commerce application.

## Key Features
- **Skin Questionnaire:** Interactive 6-step questionnaire with visual progress bar, skin profile selection, and allergy exclusions.
- **Recipe Customization Summary:** Real-time formula breakdown, allergen safety highlights, and patch test warnings.
- **Razorpay Payment Integration:** Direct client-side integration with Razorpay Checkout API.
- **Order Tracking Dashboard:** Step-by-step visual fulfillment timeline (`Confirmed` -> `In Production` -> `Shipped` -> `Delivered`).
- **Responsive Aesthetics:** Styled using Tailwind CSS with glassmorphism, earthy brand palette, and custom Google Fonts (`Poppins` & `Open Sans`).

## Setup & Running Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Copy `.env.local.example` to `.env.local` and set API URL & Razorpay test keys:
   ```bash
   cp .env.local.example .env.local
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build:**
   ```bash
   npm run build
   npm start
   ```

## Pages Structure

- `/` - Homepage with Hero section, How It Works, Ingredients Showcase, Testimonials & FAQ
- `/register` - Customer Registration Form
- `/login` - User Login Page
- `/questionnaire` - 6-step Skin Quiz & Recipe Matcher
- `/order-confirmation` - Recipe Summary, Patch Test Warning & Razorpay Checkout
- `/dashboard` - Order History List & Status Badges
- `/dashboard/orders/[id]` - Visual Order Status Timeline & Delivery Details
- `/faq` - Comprehensive FAQ Accordion & Safety Instructions
- `/contact` - Contact Us Form
