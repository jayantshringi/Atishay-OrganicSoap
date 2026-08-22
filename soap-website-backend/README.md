# Soap Website Backend

Node.js + Express.js backend for personalized soap e-commerce application.

## Features
- **JWT Authentication:** User registration, login, and token-based route protection.
- **Recipe Matching Service:** Matches quiz responses with tailored organic soap recipes (Haldi, Aloe Vera, Chandan, Kesar).
- **Order Management:** Create, track, and update custom soap orders.
- **Payment Gateway:** Razorpay order generation and HMAC SHA256 signature verification.
- **Email Notifications:** HTML email notifications for registration, order confirmation, and shipping updates.
- **Admin Dashboard API:** Revenue analytics summary and order fulfillment tracking.

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Copy `.env.example` to `.env` and configure your database and key values:
   ```bash
   cp .env.example .env
   ```

3. **Database Migration (Prisma + PostgreSQL):**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Start Server:**
   - Development Mode:
     ```bash
     npm run dev
     ```
   - Production Mode:
     ```bash
     npm start
     ```

## API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Health Check | No |
| POST | `/api/auth/register` | User Registration | No |
| POST | `/api/auth/login` | User Login | No |
| GET | `/api/auth/me` | Current User Info | Yes |
| POST | `/api/questionnaire/submit` | Submit Quiz & Match Recipe | Yes |
| GET | `/api/orders` | Customer Order History | Yes |
| GET | `/api/orders/:orderId` | Single Order Details | Yes |
| PUT | `/api/orders/:orderId` | Update Order Preferences | Yes |
| POST | `/api/payments/create-order` | Create Razorpay Order | Yes |
| POST | `/api/payments/verify` | Verify Razorpay Payment | Yes |
| GET | `/api/admin/analytics/summary` | Admin Sales Analytics | Admin |
| GET | `/api/admin/orders` | Admin List Orders | Admin |
| POST | `/api/admin/orders/:id/update-status` | Admin Update Status | Admin |
