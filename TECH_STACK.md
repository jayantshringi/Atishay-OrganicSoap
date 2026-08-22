# Tech Stack Documentation - Personalized Soap Business Website

## Overview
A scalable, mobile-first web application for personalized soap ordering. Starts simple (MVP phase) and grows with your business.

---

## Frontend (User-Facing)

### MVP Phase (Launch - 0 to 100 customers)
**Framework:** React.js or Next.js
- **React:** Lighter, faster to build, easy learning curve
- **Next.js:** Better SEO, built-in server-side rendering, easier deployment to Vercel
- **Recommendation:** Next.js for first-mover advantage in search (people searching "personalized soap near me")

**UI/Component Library:** Material-UI (MUI) or Tailwind CSS
- **MUI:** Pre-built accessible components, faster prototyping
- **Tailwind:** Lighter bundle, more customizable design
- **Recommendation:** Tailwind CSS + shadcn/ui for lighter, faster load times on 4G Indian mobile

**State Management:** React Context API or Zustand
- For MVP, Context API is sufficient (questionnaire responses, order status)
- Zustand if you add features later (wishlist, saved preferences)

**Form Management:** React Hook Form
- Lightweight validation library for the questionnaire
- Handles complex forms without bloat

**HTTP Client:** Axios or Fetch API
- Simple, handles API calls to backend

---

### Key Libraries
```
"react": "^18.2.0",
"next": "^14.0.0",
"tailwindcss": "^3.3.0",
"react-hook-form": "^7.48.0",
"axios": "^1.5.0",
"zustand": "^4.4.0",
"framer-motion": "^10.16.0",  // Smooth animations
"date-fns": "^2.30.0",          // Date formatting
"react-toastify": "^9.1.0"      // Toast notifications
```

---

## Backend (Server Logic)

### MVP Phase
**Runtime:** Node.js (Express.js or Fastify)
- **Express:** Mature, vast ecosystem, simple to learn
- **Fastify:** Faster, lighter, good for scaling
- **Recommendation:** Express.js for MVP speed; switch to Fastify later if needed

**Framework:** Express.js
- Minimal setup, straightforward routing
- Easy to add middleware for auth, logging, error handling

**Key Backend Routes**
```
POST   /api/questionnaire/submit      → Save customer answers, generate order
GET    /api/orders/:orderId            → Retrieve order status
POST   /api/auth/register              → Customer signup
POST   /api/auth/login                 → Customer login
POST   /api/payments/verify            → Verify payment (webhook from Razorpay)
GET    /api/ingredients                → List available ingredients (for UI fallback)
POST   /api/contact                    → Contact form submission
```

---

### Database

**Database Choice:** PostgreSQL (preferred) or MongoDB
- **PostgreSQL:** Relational, ACID-compliant, good for orders & transactions (Razorpay payments)
- **MongoDB:** Document-based, easier to start with simple schema, scales well
- **Recommendation:** PostgreSQL for financial/order integrity

**ORM/Query Builder:** Prisma or Sequelize
- **Prisma:** Modern, type-safe, auto-migrations, excellent for Next.js
- **Sequelize:** Older, but stable and well-documented
- **Recommendation:** Prisma (easier for new developers)

**Database Schema (Key Tables)**

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(15) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  skin_type VARCHAR(50),  -- oily, dry, combination, sensitive
  allergies TEXT,          -- JSON or comma-separated
  excluded_ingredients TEXT,
  preferred_texture VARCHAR(50),
  price DECIMAL(10, 2),
  order_status VARCHAR(50),  -- pending, confirmed, processing, shipped, delivered
  delivery_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Ingredients Table
CREATE TABLE ingredients (
  id UUID PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  allergen_risk BOOLEAN,
  is_active BOOLEAN DEFAULT TRUE
);

-- Soap Recipes (Pre-tested combinations)
CREATE TABLE recipes (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  skin_type VARCHAR(50),
  ingredients TEXT,  -- JSON array of ingredient IDs
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE
);

-- Payments Table
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  amount DECIMAL(10, 2),
  payment_method VARCHAR(50),  -- razorpay, upi, card
  razorpay_payment_id VARCHAR(255),
  razorpay_order_id VARCHAR(255),
  status VARCHAR(50),  -- pending, success, failed
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Authentication & Security

**Session Management:** JWT (JSON Web Tokens)
- Stateless authentication
- Store token in httpOnly cookie (prevents XSS)

**Password Hashing:** bcrypt
```javascript
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10);
```

**HTTPS:** Mandatory
- All API calls encrypted
- No sensitive data in URLs

**Environment Variables:** .env file (never commit to Git)
```
NEXT_PUBLIC_API_URL=https://api.yoursite.com
DATABASE_URL=postgresql://user:pass@localhost:5432/soapdb
RAZORPAY_KEY_ID=xyz123
RAZORPAY_KEY_SECRET=abc456
JWT_SECRET=your_jwt_secret_here
```

---

## Payment Integration

**Payment Provider:** Razorpay (Best for India)
- Supports UPI, cards, netbanking, wallets
- Webhook support for order confirmation
- Settlement to your bank account

**Flow:**
1. Customer submits questionnaire → Backend creates order
2. Backend calls `razorpay.orders.create()` with amount
3. Frontend opens Razorpay checkout modal
4. Customer pays
5. Razorpay sends webhook to backend → Backend verifies & updates order status
6. Frontend shows confirmation

**Key Razorpay Functions**
```javascript
const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order
const order = await razorpay.orders.create({
  amount: 49900,  // ₹499 in paise
  currency: 'INR',
  receipt: `order_${Date.now()}`,
  notes: { order_id: orderId }
});

// Verify payment (after customer pays)
const verified = razorpay.payments.fetch(paymentId);
```

---

## Hosting & Deployment

### Frontend Hosting
**Option 1: Vercel (Recommended for Next.js)**
- Automatic deployments from GitHub
- Built-in serverless functions
- Free tier includes generous limits
- Custom domain support
- https://vercel.com

**Option 2: Netlify**
- Similar to Vercel, also great for React/Next.js
- Free tier suitable for MVP

### Backend Hosting
**Option 1: Railway or Render (Recommended)**
- Auto-deploy from GitHub
- PostgreSQL database included
- Free tier sufficient for 100-1000 users
- https://railway.app or https://render.com

**Option 2: Heroku**
- Straightforward, easy, but now paid-only

**Option 3: Self-Hosted (AWS/DigitalOcean)**
- More control, but requires DevOps knowledge
- Not recommended for MVP

### Database Hosting
**If using Railway/Render:** Database included
**Standalone PostgreSQL:**
- Neon (serverless, free tier: https://neon.tech)
- Supabase (PostgreSQL + auth, https://supabase.com)
- AWS RDS (paid, but scalable)

---

## Email Service

**Email Provider:** SendGrid or Mailgun
- Welcome email after signup
- Order confirmation
- Shipping notifications
- Reset password link

**Key Emails**
1. Welcome email (post-signup)
2. Order confirmation (post-payment)
3. Soap in production (24h after payment)
4. Shipment notification with tracking
5. Delivery confirmation

**Template Example:**
```
Subject: Your Custom Soap is Ready! 🧼

Hi [Customer Name],

Your personalized soap has been confirmed and is being crafted just for you.

Order Details:
- Skin Type: [Skin Type]
- Allergies Avoided: [List]
- Expected Delivery: [Date]

[Patch Test Reminder + Link to FAQ]

Thank you for choosing us!
```

---

## Analytics & Monitoring

**Product Analytics:** Plausible Analytics or Fathom Analytics
- Privacy-focused (GDPR compliant)
- Track questionnaire completion rate, drop-off points
- Don't need Google Analytics creepy tracking

**Error Tracking:** Sentry
- Catch and log JavaScript errors in production
- Alert you to critical issues

**Basic Setup:**
```javascript
// In Next.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

---

## APIs & Integrations

### Third-Party Services Needed
1. **Razorpay** → Payments
2. **Twilio** (optional) → SMS order updates
3. **Shiprocket** (optional) → Shipping label generation & tracking
4. **SendGrid/Mailgun** → Transactional emails
5. **Plausible/Fathom** → Analytics

---

## Development Workflow

### Version Control
- **Git** on GitHub
- Branch strategy: `main` (production), `dev` (staging), feature branches
- Protect `main` branch (require pull request reviews)

### Testing
**Frontend:** Jest + React Testing Library
```bash
npm test -- --coverage
```

**Backend:** Jest + Supertest
```bash
npm run test:backend
```

### Code Quality
- **Linting:** ESLint
- **Formatting:** Prettier
- **Pre-commit hooks:** Husky (run tests before committing)

---

## Scalability Roadmap

### Phase 1 (MVP): Single Next.js app + PostgreSQL
- Single server, all logic in one place
- ~1000-5000 active customers

### Phase 2 (100K+ customers): Separate frontend & backend
- Dedicated Node.js backend API
- PostgreSQL database
- Redis cache for frequent queries
- CDN for images

### Phase 3 (1M+ customers): Microservices
- Order service, Payment service, Notification service
- Message queue (RabbitMQ/Kafka)
- Distributed database (read replicas)

---

## Development Environment Setup

### Prerequisites
```bash
# Install Node.js (v18 or higher)
node --version

# Install npm or yarn
npm --version
```

### Initial Setup
```bash
# Clone repo
git clone <repo-url>
cd soap-website

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local
# Edit .env.local with your keys

# Run local dev server
npm run dev
# Open http://localhost:3000

# Run backend (if separate)
cd backend
npm run dev
# Backend runs on http://localhost:5000
```

---

## Security Checklist

- [ ] HTTPS enabled on all domains
- [ ] Environment variables not committed to Git
- [ ] Password hashing with bcrypt (rounds ≥10)
- [ ] JWT secret securely stored
- [ ] CORS configured (only allow your domain)
- [ ] SQL injection prevention (use Prisma, parameterized queries)
- [ ] XSS prevention (sanitize user inputs, escape output)
- [ ] Rate limiting on API endpoints (prevent brute-force)
- [ ] Regular security updates (npm audit)
- [ ] Backup strategy for database

---

## Cost Estimate (Monthly)

| Service | MVP | Scale |
|---------|-----|-------|
| Hosting (Frontend) | $0-10 (Vercel free) | $20-50 |
| Hosting (Backend) | $5-15 (Railway) | $50-200 |
| Database | $0 (Neon free) | $20-100 |
| Email | $0-10 (SendGrid free tier) | $20-50 |
| Payments | 2% + ₹3 per transaction | 2% + ₹3 |
| Analytics | $0 (Plausible free tier) | $10-20 |
| **Total** | **~₹500-1000** | **~₹3000-8000** |

---

## Summary Checklist

- [ ] Choose Next.js for frontend
- [ ] Choose Express.js for backend
- [ ] Set up PostgreSQL database
- [ ] Integrate Razorpay for payments
- [ ] Deploy to Vercel + Railway
- [ ] Set up email service (SendGrid)
- [ ] Configure Sentry for error tracking
- [ ] Add Plausible analytics
- [ ] Test on real 4G mobile connection
- [ ] Security audit before launch
