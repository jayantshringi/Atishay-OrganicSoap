# 🧼 Atishay — Personalized Organic Soap E-Commerce Platform

> ⚠️ **DISCLAIMER & PROJECT WARNING**  
> **This repository is strictly an educational demonstration / academic portfolio project.**  
> - It is **not** an active commercial skincare business or medical consultation service.  
> - Formulations, quiz outcomes, ingredient combinations, and prices displayed in this application are for demonstration, simulation, and showcase purposes only.  
> - Any real-world topical skincare product must always undergo professional dermatological testing and user patch tests before use.

---

## 📖 Overview

**Atishay** is a full-stack personalized skincare e-commerce web platform designed to provide bespoke, organic melt-and-pour glycerine soaps tailored to individual skin types, sensitivities, and botanical preferences. 

Through an interactive dynamic questionnaire, customers receive automated skin assessments and recipe matching from traditional botanical extracts (Haldi, Aloe Vera, Chandan, Kesar), while business managers can track real-time fulfillment through a dedicated administrative portal.

---

## ✨ Key Features & Capabilities

### 🧪 1. Interactive Skin Quiz & Formula Matching
- **Dynamic 6-Step Questionnaire**: Analyzes skin type (Oily, Dry, Combination, Sensitive), primary concerns (Acne, Hydration, Sensitivity, Glow), known allergies, and texture preferences (Soft lather, Hard bar, Exfoliating scrub).
- **Live 3D Soap Visualizer**: Dynamic visual representation updating soap hue, translucency, and active botanical tags in real-time as users customize their options.
- **Allergen Filtration Engine**: Automatic exclusion of specified botanical irritants.

### 🛍️ 2. Seamless Customer Journey
- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing.
- **Formula Re-Ordering**: One-click custom formula duplication and fast checkout from the customer dashboard.
- **Real-Time Order Tracking**: Order status progression (Confirmed → In Production → Shipped → Delivered) with tracking number visibility.

### 🛡️ 3. Comprehensive Admin Management Portal
- **Real-Time Metrics & KPIs**: Daily orders count, daily revenue tally, orders in production, and dispatched package stats.
- **Fulfillment & Dispatch Workflow**: Multi-status workflow transitions with automated courier tracking updates.
- **Advanced Filtering**: Filter orders by status categories with instant client-side and server-side querying.

### 🎨 4. Modern, Responsive & Animated Interface
- **Smooth Framer Motion Physics**: Interactive micro-animations, floating background elements, staggered scroll reveals, and responsive transitions.
- **Fully Responsive Architecture**: Custom-tailored layouts optimized across mobile, tablet, laptop, and ultra-wide screens.
- **Accessible & Aesthetic Design**: Curated warm earthen color palette, glassmorphism overlays, and modern typography.

---

## 🛠️ Architecture & Tech Stack

```
Atishay Architecture
├── soap-website-frontend/ (Next.js 14 / React / Tailwind CSS / Framer Motion / Zustand)
│   ├── Interactive Quiz Engine & Live Soap Preview
│   ├── Customer Dashboard & Order History
│   ├── Admin Management Portal & Analytics
│   └── Responsive Landing & Informational Sections
│
└── soap-website-backend/ (Node.js / Express / Prisma ORM / PostgreSQL)
    ├── Authentication & Authorization Services (JWT, bcrypt)
    ├── Skin Diagnostic & Matching Engine
    ├── Order Fulfillment & Admin Dispatch API
    └── Payment Gateway Integration (Razorpay Orders & Webhooks)
```

### Core Technologies
- **Frontend**: Next.js (App Router), React, Tailwind CSS, Framer Motion, Zustand, Axios
- **Backend**: Node.js, Express.js, Prisma ORM, PostgreSQL, Express-Validator
- **Integrations**: Razorpay Payment Gateway, Courier Tracking Webhook Handlers
