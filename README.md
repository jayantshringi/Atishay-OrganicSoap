<div align="center">
  <img src="soap-website-frontend/public/images/logo.png" alt="Atishay Botanical Seal" width="110" height="110" style="border-radius: 50%;" />
  
  # 🌿 ATISHAY — Bespoke Ayurvedic & Organic Skincare

  <p align="center">
    <strong>Science-Backed Personalized Formulations • 100% Vegetable Glycerine Base • Preservative & Sulfate Free</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase" />
    <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" alt="Node.js" />
    <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
  </p>
</div>

---

> ### ⚠️ PORTFOLIO & DEMONSTRATION NOTICE
> **This project was engineered and developed as an end-to-end full-stack portfolio showcase.**
> - **Cash on Delivery (COD) Only**: The checkout pipeline exclusively uses Cash on Delivery so that the complete customer order lifecycle, administrative dispatch workflows, and courier tracking progression can be demoed without requiring external merchant payment gateway accounts (Stripe / Razorpay).
> - All formulations, clinical quiz outcomes, and botanical profiles are designed for high-aesthetic showcase and engineering demonstration.

---

## 📖 About Atishay

**Atishay** is a personalized Ayurvedic e-commerce platform designed to address the reality of modern skin health: *no two skin profiles are identical*. Conventional mass-market soaps frequently rely on synthetic sulfates, parabens, and harsh detergents that strip the skin's natural lipid barrier.

Atishay combines **ancient Indian Ayurveda** with **modern cosmetic dermatology** to deliver small-batch, melt-and-pour vegetable glycerine bars customized to individual skin types, specific sensitivities, and allergen triggers.

### 🌿 Brand & Formulation Philosophy
- **pH 5.5 Balanced**: Formulated to match the acid mantle of human skin, protecting against microbial irritation.
- **Cold-Crafted Vegetable Glycerine**: Superior humectant properties lock in trans-epidermal moisture for 24 hours.
- **Strict Allergen Exclusion**: Proprietary diagnostic matcher filters out user-specified sensitivities (such as essential oil triggers or botanical extracts).
- **Cruelty-Free & Sustainable**: 100% plant-based formulation, zero animal testing, and biodegradable packaging.

---

## 🧪 Flagship Botanical Formulations

| Formulation | Category | Target Skin | Key Actives | Benefits |
|---|---|---|---|---|
| **Aloe Vera & Shea Intense Hydration Bar** | `Hydration` | Dry & Dehydrated | Cold-Pressed Aloe Gel, Raw African Shea, Sweet Almond Oil, Vitamin E | Restores compromised lipid barrier, soothes flakiness, deep cellular moisture. |
| **Haldi & Neem Clarifying Anti-Acne Bar** | `Acne & Clarity` | Oily & Acne-Prone | Wild Kasturi Turmeric (*Kasturi Manjal*), Steam-Distilled Neem, Tea Tree, Jojoba Oil | Clarifies clogged pores, balances excess sebum, natural antimicrobial protection. |

---

## ✨ Key System Features & Highlights

### 1. 🧬 5-Step Clinical Skin Diagnostic Engine (`/quiz`)
- Comprehensive diagnostic evaluating skin profile (Dry, Oily, Combination, Sensitive), primary concerns, allergen triggers, and lather preference.
- **Live 3D Soap Visualizer**: Dynamic visual representation reflecting soap hue, translucency, and botanical infusion in real time.
- Automated algorithmic recipe matching with allergen exclusion guarantees.

### 2. 🛍️ High-Performance Storefront & Catalog (`/products`, `/products/[slug]`)
- Multi-category filtering (`All Soaps`, `Aloe Vera Hydration`, `Haldi Neem Anti-Acne`).
- Debounced real-time search synced with URL search parameters for shareable bookmarking.
- In-depth product detail pages featuring full ingredient transparency, skin benefits, verified customer star ratings, and review submissions.

### 3. 🛒 Dynamic Cart & Promo Engine (`/cart`)
- Instant item quantity adjustment and automatic subtotal computation.
- Free Express Delivery threshold calculator (automated free shipping on orders over ₹499).
- Dynamic coupon code validator (e.g., `WELCOME10` for a 10% discount).

### 4. 🚚 Frictionless COD Checkout & Order Tracking (`/checkout`, `/orders`, `/orders/[id]`)
- Streamlined Cash on Delivery address form with saved address pre-fill.
- Instant order confirmation receipts with tracking ID generation.
- **4-Step Live Fulfillment Timeline**: Real-time status progression (`Confirmed` → `In Production` → `Shipped` → `Delivered`) with postal AWB tracking numbers.

### 5. 🛡️ Administrative Operations Portal (`/admin`, `/admin/orders`, `/admin/products`)
- Real-time KPI analytics (Total Orders, Today's Studio Revenue, In-Production Batches, Dispatched Shipments).
- Order fulfillment progression selector and courier tracking assignment.
- Product catalog overview and inventory monitoring.

---

## 🛠️ Technology Stack

```
Atishay Full-Stack Architecture
│
├── Frontend Layer (soap-website-frontend)
│   ├── Framework: Next.js 14 (App Router) & React 18
│   ├── Styling: Tailwind CSS & Lucide Icons
│   ├── Motion & Animation: Framer Motion
│   ├── State Management: React Context API (AuthContext, CartContext)
│   └── Client Services: Supabase JS Client & Axios
│
├── Backend API Layer (soap-website-backend)
│   ├── Runtime: Node.js & Express.js
│   ├── Database ORM: Prisma Client
│   └── Security & Middleware: JWT Auth, CORS, Helmet
│
└── Cloud & Database Infrastructure
    ├── Authentication: Supabase Auth (User sessions, JWT tokens)
    ├── Primary Database: Supabase PostgreSQL (Profiles, Products, Orders, Reviews)
    └── Deployment Hosting: Vercel (Frontend)
```

---

## 📂 Repository Folder Structure

```
Atishay-OrganicSoap/
├── soap-website-frontend/             # Next.js 14 Client Storefront
│   ├── public/                        # Static assets & product imagery
│   │   └── images/
│   │       ├── logo.png               # Brand emblem
│   │       └── products/              # High-res botanical soap photography
│   ├── src/
│   │   ├── app/                       # Next.js App Router pages
│   │   │   ├── page.jsx               # Home Landing Page (Hero, Best Sellers, Trust)
│   │   │   ├── products/              # Catalog list & [slug] product details
│   │   │   ├── cart/                  # Shopping cart & coupon checkout
│   │   │   ├── checkout/              # Cash on Delivery checkout
│   │   │   ├── quiz/                  # 5-Step Diagnostic & 3D Soap Visualizer
│   │   │   ├── orders/                # Customer order history & live [id] tracking
│   │   │   ├── account/               # Customer profile & address management
│   │   │   ├── admin/                 # Operations dashboard, orders & catalog
│   │   │   ├── login/ & register/     # Authentication pages
│   │   │   └── order-confirmation/    # Post-order success summary
│   │   ├── components/                # Reusable UI components
│   │   │   ├── Header.jsx             # Navigation bar with dynamic cart badge
│   │   │   ├── Footer.jsx             # Brand footer & links
│   │   │   ├── ProductCard.jsx        # Product display card with Add-to-Cart
│   │   │   ├── Rating.jsx             # Interactive & display star ratings
│   │   │   ├── PriceTag.jsx           # Currency & discount badge formatter
│   │   │   ├── Spinner.jsx            # Minimalist loading state
│   │   │   └── EmptyState.jsx         # Fallback empty view container
│   │   ├── context/                   # Global React State Contexts
│   │   │   ├── AuthContext.jsx        # Supabase Auth session & profile hook
│   │   │   └── CartContext.jsx        # Cart state, shipping threshold & coupons
│   │   ├── lib/
│   │   │   └── supabase.js            # Supabase frontend client instance
│   │   └── services/
│   │       └── api.js                 # API service layer with offline demo fallbacks
│   ├── next.config.js                 # Next.js configuration & image remote patterns
│   └── tailwind.config.js             # Brand palette, typography & animations
│
└── soap-website-backend/              # Express.js REST API Server
    ├── src/
    │   ├── config/
    │   │   └── supabase.js            # Supabase service role client instance
    │   ├── controllers/               # Business logic controllers
    │   │   ├── productController.js   # Product catalog & reviews
    │   │   ├── orderController.js     # Cash on Delivery order processing
    │   │   ├── authController.js      # Auth & user session handler
    │   │   └── adminController.js     # Admin KPI analytics & status updates
    │   ├── middleware/
    │   │   └── auth.js                # Supabase & JWT token verification guards
    │   ├── routes/                    # API Route definitions
    │   │   ├── products.js            # /api/products
    │   │   ├── orders.js              # /api/orders
    │   │   ├── coupons.js             # /api/coupons
    │   │   ├── quiz.js                # /api/quiz
    │   │   └── admin.js               # /api/admin
    │   └── server.js                  # Server entrypoint & middleware mounting
    └── package.json
```

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**

### 2. Clone the Repository
```bash
git clone https://github.com/jayantshringi/Atishay-OrganicSoap.git
cd Atishay-OrganicSoap
```

### 3. Backend Setup
```bash
cd soap-website-backend
npm install
npm run dev
# Backend server runs on http://localhost:5000
```
> *The backend includes built-in in-memory fallback stores, allowing the full application to run locally even if an external database server is disconnected.*

### 4. Frontend Setup
```bash
cd ../soap-website-frontend
npm install
npm run dev
# Storefront runs on http://localhost:3000
```

---

## 📋 Definition of Done / Quality Assurance Checklist

- [x] **Zero Errors**: Clean compilation on Next.js production builds (`npm run build`).
- [x] **Authentication**: User registration, login, and session persistence powered by Supabase Auth.
- [x] **Storefront Catalog**: Category filtering, sorting by price/rating, and debounced keyword search.
- [x] **Product Details**: Ingredients spotlight, customer star ratings, and review submission forms.
- [x] **Cart & Promotions**: Item quantity stepper, free delivery progress bar (over ₹499), and coupon discount validation (`WELCOME10`).
- [x] **Doorstep Checkout**: Frictionless Cash on Delivery (COD) address entry with saved address book auto-fill.
- [x] **Fulfillment Tracking**: 4-step status timeline with live tracking ID display.
- [x] **Diagnostic Quiz**: 5-step diagnostic with live 3D visual preview and automatic prescription matcher.
- [x] **Admin Operations**: Operations dashboard with KPI metrics, status updates, and tracking number assignment.
- [x] **Responsive Design**: 100% mobile-friendly and optimized across mobile, tablet, and desktop viewports.

---

## 📄 License & Attribution

This project is developed and maintained by **Jayant Shringi**.

```
Copyright (c) 2026 Jayant Shringi. All rights reserved.
Licensed under the MIT License.
```

Distributed for educational, portfolio, and demonstration purposes.
