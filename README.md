# 🧼 Atishay — Personalized Ayurvedic & Organic Soap E-Commerce Platform

> 🌿 **PORTFOLIO & DEMONSTRATION NOTICE**  
> **This repository is a full-stack academic & professional portfolio piece.**  
> - **Cash on Delivery (COD) Only**: The checkout pipeline exclusively supports Cash on Delivery so the complete customer order flow, admin fulfillment updates, and courier tracking can be demoed without requiring external payment gateway credentials (Razorpay/Stripe keys).  
> - Formulations, quiz outcomes, ingredient diagnostics, and prices are built for high-aesthetic showcase and demonstration purposes.

---

## 📖 Project Overview

**Atishay** is a full-stack personalized Ayurvedic soap e-commerce storefront designed to provide bespoke, organic melt-and-pour glycerine soaps tailored to individual skin profiles (Dry, Oily, Sensitive, Combination), sensitivities, and botanical preferences.

Through an interactive 5-step clinical diagnostic questionnaire, customers receive automated skin assessments and personalized recipe prescriptions from pure botanical extracts (Haldi, Aloe Vera, Chandan, Kashmiri Kesar), while operations managers track live fulfillment and batch dispatch through an integrated administrative operations portal.

---

## ✨ Key Features & Capabilities

### 🧪 1. 5-Step Skin Diagnostic & Recipe Matcher (`/quiz`)
- **Clinical Questionnaire Engine**: Evaluates skin type (Oily, Dry, Combination, Sensitive), concerns (Acne, Hydration, Sensitivity, Radiance), known botanical allergies, and bar texture preferences (Cream lather, Exfoliating scrub).
- **Live 3D Soap Visualizer**: Dynamic visual representation updating soap hue, translucency, and botanical tags in real-time.
- **Strict Allergen Exclusion**: Filters out user-specified sensitivities from the prescription.

### 🛍️ 2. Comprehensive Storefront & Cart (`/products`, `/products/[slug]`, `/cart`)
- **Product Catalog**: Filter by category (`Hydration`, `Acne`, `Sensitive`, `Radiance`), sort by price/rating, and debounced search with bookmarkable URL search params.
- **Product Details & Customer Reviews**: In-depth ingredients breakdown, skin benefits, verified customer star ratings, and review submission.
- **Dynamic Shopping Cart**: Instant quantity adjustment, subtotal computation, automated free delivery threshold (over ₹499), and coupon code validation (`WELCOME10` for 10% discount).

### 🚚 3. Frictionless COD Checkout & Order Tracking (`/checkout`, `/orders`, `/orders/[id]`)
- **Cash on Delivery (COD) Checkout**: Address form with saved address auto-fill and instant order placement.
- **Live Fulfillment Progression Stepper**: Status progression (`Confirmed` → `In Production` → `Shipped` → `Delivered`) with courier AWB tracking numbers.
- **Soap Longevity Guide**: Storage tips for preservative-free artisan bars.

### 🛡️ 4. Administrator Fulfillment Operations (`/admin`, `/admin/orders`, `/admin/products`)
- **Real-Time KPI Metrics**: Orders count, daily revenue tally, studio in-production batches, and dispatched shipments.
- **Fulfillment Progression Control**: Multi-status workflow transitions (`in-production` → `shipped` → `delivered`) with tracking ID assignment.
- **Catalog Management**: View and manage all flagship soap formulations.

---

## 🛠️ Architecture & Tech Stack

```
Atishay E-Commerce Platform
├── soap-website-frontend/ (Next.js 14/15 App Router / Tailwind CSS / Framer Motion / Context API)
│   ├── src/app/
│   │   ├── page.jsx                   ← Home landing page with Best Sellers & Trust props
│   │   ├── products/                  ← Catalog listing with category filters & sort
│   │   │   └── [slug]/                ← Product detail page with reviews & ingredients
│   │   ├── cart/                      ← Shopping cart with coupon discount calculator
│   │   ├── checkout/                  ← Cash on Delivery address & order placement
│   │   ├── quiz/                      ← 5-step diagnostic quiz & live 3D visual preview
│   │   ├── orders/                    ← Customer order history & [id] tracking stepper
│   │   ├── account/                   ← Customer profile & saved address management
│   │   ├── admin/                     ← Admin KPI dashboard, orders & products tables
│   │   ├── login/ & register/         ← JWT authentication & redirect handling
│   │   └── order-confirmation/        ← Post-checkout success receipt
│   ├── src/context/                   ← AuthContext (useAuth) & CartContext (useCart)
│   └── src/services/api.js            ← Axios client with resilient offline/demo fallback
│
└── soap-website-backend/ (Node.js / Express.js / Prisma ORM / JWT Auth)
    ├── src/controllers/               ← Product, Order (COD), Quiz, Auth & Admin controllers
    ├── src/routes/                    ← /api/products, /api/coupons, /api/quiz, /api/orders, /api/admin
    └── src/middleware/                ← JWT authentication & role-based admin guards
```

### Core Technologies
- **Frontend**: Next.js (App Router), React, Tailwind CSS, Framer Motion, Axios, Lucide React
- **Backend**: Node.js, Express.js, JWT, bcrypt, Prisma ORM
- **State Management**: React Context API (`AuthContext`, `CartContext`)

---

## 🚀 Local Setup & Running Instructions

### 1. Prerequisites
- **Node.js**: v18 or higher
- **npm** or **yarn**

### 2. Backend Setup
```bash
cd soap-website-backend
npm install
npm run dev
# Backend API runs on http://localhost:5000
```
> *Note: The backend includes built-in in-memory fallback mechanisms, allowing the entire application to run and process orders without requiring a live PostgreSQL/MongoDB database server.*

### 3. Frontend Setup
```bash
cd soap-website-frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

### 4. Admin Credentials for Testing
- **Email**: `admin@atishay.com`
- **Password**: `admin123` (or any password in dev mode)
- **Role**: Unlocks full access to `/admin`, `/admin/orders`, and `/admin/products`.

---

## 📋 Definition of Done / Verification Checklist

- [x] Backend and Frontend build and start cleanly with 0 console errors.
- [x] Register new accounts, log in, log out, and persist JWT sessions.
- [x] Browse products catalog, filter by category (`Hydration`, `Acne`, `Sensitive`, `Radiance`), sort by price/rating, and search with debounce.
- [x] Product detail pages with ingredients spotlight, customer reviews, and review submission.
- [x] Dynamic cart with item quantity stepper, removal, and free delivery calculation over ₹499.
- [x] Coupon `WELCOME10` applies 10% discount dynamically.
- [x] Complete Cash on Delivery checkout and receive order confirmation receipt.
- [x] Order history (`/orders`) and live tracking stepper (`/orders/[id]`).
- [x] 5-step interactive skin diagnostic quiz with live 3D visual preview.
- [x] Admin dashboard (`/admin`) with KPI metrics, status dropdown updates, and AWB tracking numbers.
- [x] 100% responsive design across mobile (375px+), tablet, and desktop viewports.
- [x] Zero external payment gateway dependencies.
