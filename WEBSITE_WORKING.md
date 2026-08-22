# Website Working Documentation - Personalized Soap Business

## Table of Contents
1. [User Flows](#user-flows)
2. [Feature Breakdown](#feature-breakdown)
3. [Page-by-Page Functionality](#page-by-page-functionality)
4. [Backend API Endpoints](#backend-api-endpoints)
5. [Database Interactions](#database-interactions)
6. [Error Handling & Edge Cases](#error-handling--edge-cases)
7. [Notification System](#notification-system)

---

## User Flows

### Flow 1: First-Time Customer → Order Custom Soap

```
1. User lands on Homepage
   ↓
2. Clicks "Start Your Questionnaire"
   ↓
3. Creates account (email, phone, password) OR signs in if existing
   ↓
4. Fills questionnaire (6 questions, 2-3 min)
   ↓
5. Reviews custom soap summary
   ↓
6. Proceeds to payment
   ↓
7. Completes Razorpay checkout
   ↓
8. Receives order confirmation email
   ↓
9. Order status updates: Confirmed → In Production → Shipped → Delivered
```

### Flow 2: Returning Customer → Reorder

```
1. User logs in
   ↓
2. Dashboard shows "Order Again" for previous orders
   ↓
3. Can reuse previous questionnaire answers OR modify
   ↓
4. Skips to payment
   ↓
5. Same confirmation & tracking as new customer
```

### Flow 3: Customer Checks Order Status

```
1. User logs in → Dashboard
   ↓
2. Sees list of all orders (status, delivery date)
   ↓
3. Clicks on order → Order Detail page
   ↓
4. Sees full details: customization, price, tracking link, expected delivery
   ↓
5. Receives email notification when status changes (auto via webhook)
```

---

## Feature Breakdown

### 1. User Authentication & Accounts

**Registration:**
- Email + Phone + Password required
- Email verification (link sent, not required for MVP but recommended)
- Phone validation via OTP (optional for MVP, useful for future SMS updates)

**Login:**
- Email + Password
- "Remember me" checkbox (persistent login for 30 days)
- "Forgot Password" flow (send reset link via email)

**User Profile:**
- View saved addresses
- View all past orders
- Edit phone/name/default address
- Delete account (if no active orders)

**Backend Logic:**
```javascript
// Registration
POST /api/auth/register
{
  email: "user@example.com",
  phone: "9876543210",
  name: "Priya",
  password: "secure123"
}
Response: { userId, token, message: "Account created" }

// Login
POST /api/auth/login
{
  email: "user@example.com",
  password: "secure123"
}
Response: { token, userId, name }

// Password reset
POST /api/auth/forgot-password
{ email: "user@example.com" }
→ Sends reset link to email
→ User clicks link, gets temp token
→ POST /api/auth/reset-password { token, newPassword }
```

---

### 2. Questionnaire System

**Purpose:** Gather enough info to create a customized soap recipe.

**Questions & Logic:**

**Q1: Skin Type** (Required)
```
Options:
- Oily skin (excess sebum, prone to acne)
- Dry skin (tight, flaky, itchy)
- Combination (T-zone oily, cheeks dry)
- Sensitive (irritates easily, redness)

Backend:
- Filters which base soaps/actives are suitable
- Oily → less glycerin, more haldi
- Dry → more glycerin + aloe vera
- Sensitive → gentle base, avoid stimulating actives
```

**Q2: Known Allergies** (Required)
```
Input: Dropdown + text field
Options in dropdown:
- None
- Fragrance/Perfume
- Tree nuts/peanuts (if soap contains nut oils)
- Specific herbs (haldi, chandan, etc.)
- Other (text input)

Backend:
- Stores as JSON: { hasAllergies: true, allergens: ["haldi", "fragrance"] }
- Blocks recipes containing those ingredients
```

**Q3: Main Skin Concern** (Required)
```
Options:
- Acne-prone (needs haldi, less heavy)
- Dryness (needs aloe + glycerin)
- Sensitivity/redness (needs chandan, calming)
- General care (balanced formula)

Backend:
- Determines which active ingredients to emphasize
```

**Q4: Ingredients to Avoid** (Optional)
```
Checkboxes:
- Artificial fragrance
- Any essential oils
- Specific herbs (list all 4: haldi, chandan, kesar, aloe)
- Exfoliants

Backend:
- Additional filter on top of allergen list
```

**Q5: Preferred Soap Texture** (Optional)
```
Options:
- Soft bar (easy to lather, good for dry skin)
- Hard bar (long-lasting, good for oily skin)
- Exfoliating (contains microbeads or seeds, optional add-on ₹50 extra)

Backend:
- Changes soap density, affects shelf life communication
```

**Q6: Delivery Address & Phone** (Required)
```
Text inputs:
- Street address
- City
- Postal code
- Phone number (confirm same as registered)

Backend:
- Validates postal code (within delivery area)
- Validates phone format
```

**Questionnaire Flow (Frontend):**
```javascript
// State management (Zustand)
const useQuestionnaireStore = create((set) => ({
  answers: {
    skinType: null,
    allergies: [],
    mainConcern: null,
    avoidIngredients: [],
    texturePreference: "soft",
    address: {},
    phone: ""
  },
  updateAnswer: (field, value) => set(state => ({
    answers: { ...state.answers, [field]: value }
  })),
  currentQuestion: 1,
  nextQuestion: () => set(state => ({
    currentQuestion: Math.min(state.currentQuestion + 1, 6)
  }))
}));

// Each question component:
<div>
  <ProgressBar current={1} total={6} />
  <h2>What's your skin type?</h2>
  <RadioGroup onChange={handleSelect}>
    <Radio value="oily">Oily skin...</Radio>
    {/* etc */}
  </RadioGroup>
  <Button onClick={nextQuestion}>Next</Button>
</div>
```

---

### 3. Recipe Generation & Matching

**Backend Algorithm:**

After questionnaire submission, backend runs a matching algorithm:

```javascript
// POST /api/questionnaire/submit

async function generateSoapRecipe(answers) {
  // Step 1: Load all available recipes from DB
  const baseRecipes = await db.recipes.findAll({ is_active: true });
  
  // Step 2: Filter by skin type
  let candidates = baseRecipes.filter(r => r.skin_type === answers.skinType);
  
  // Step 3: Filter out recipes with allergens
  candidates = candidates.filter(recipe => {
    const recipeIngredients = JSON.parse(recipe.ingredients);
    return !answers.allergies.some(allergen => 
      recipeIngredients.includes(allergen)
    );
  });
  
  // Step 4: Prioritize by main concern
  const scored = candidates.map(recipe => {
    let score = 0;
    if (recipe.addresses_concern === answers.mainConcern) score += 10;
    if (recipe.is_premium) score += 2;
    return { ...recipe, score };
  });
  
  // Step 5: Pick best recipe
  const selectedRecipe = scored.sort((a, b) => b.score - a.score)[0];
  
  // Step 6: Determine price based on texture
  const basePrice = 399; // ₹399
  const textureAddOn = answers.texturePreference === "exfoliating" ? 50 : 0;
  const totalPrice = basePrice + textureAddOn;
  
  // Step 7: Create order in DB
  const order = await db.orders.create({
    userId: req.user.id,
    recipeId: selectedRecipe.id,
    skinType: answers.skinType,
    allergies: JSON.stringify(answers.allergies),
    mainConcern: answers.mainConcern,
    texturePreference: answers.texturePreference,
    address: answers.address,
    phone: answers.phone,
    price: totalPrice,
    orderStatus: "pending",
    deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    createdAt: new Date()
  });
  
  return { order, recipe: selectedRecipe };
}
```

**Recipe Data Structure:**
```javascript
{
  id: "recipe_001",
  name: "Oily Skin Haldi Soap",
  skinType: "oily",
  addresses_concern: "acne-prone",
  ingredients: JSON.stringify(["haldi", "glycerine_base", "aloe_vera"]),
  description: "Turmeric-based soap for oily, acne-prone skin",
  allergen_risk: false,
  is_premium: false
}
```

**Pre-tested Recipes (MVP):**
```
1. Oily Skin: Haldi + Glycerine base (acne-focused)
2. Dry Skin: Aloe + Chandan + Extra Glycerine (hydrating)
3. Sensitive: Chandan + Aloe + Glycerine (calming, no haldi/kesar)
4. Combination: Haldi + Aloe + Balanced (mixed benefits)
5. Premium: Kesar + Chandan + Aloe (all skin types, luxury)
6. Exfoliating: Base + Coffee (oily/dry, add-on)
```

---

### 4. Order Confirmation & Payment

**Confirmation Page (Before Payment):**
```
Summary Card:
┌─────────────────────────────────────┐
│  Your Custom Soap                   │
│  ─────────────────────────────────  │
│  Skin Type: Oily                    │
│  Main Concern: Acne-prone           │
│  Ingredients: Haldi, Glycerine      │
│  Allergies Avoided: Fragrance       │
│  Texture: Hard bar                  │
│  ─────────────────────────────────  │
│  Expected Delivery: 15 Aug 2026     │
│  Price: ₹449                        │
│  ─────────────────────────────────  │
│  [Proceed to Payment] [Edit]        │
└─────────────────────────────────────┘

Legal Notice:
"Patch test recommended. See FAQ for allergy info."
```

**Payment Flow (Razorpay Integration):**

```javascript
// Frontend: Trigger payment
async function handlePayment() {
  const orderId = order.id;
  const amount = order.price * 100; // Convert to paise
  
  // Step 1: Create Razorpay order on backend
  const response = await axios.post('/api/payments/create-order', {
    orderId,
    amount
  });
  
  const razorpayOrderId = response.data.razorpayOrderId;
  
  // Step 2: Open Razorpay checkout
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    amount,
    currency: 'INR',
    order_id: razorpayOrderId,
    handler: async (response) => {
      // Step 3: Verify payment on backend
      const verified = await axios.post('/api/payments/verify', {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        orderId
      });
      
      if (verified.data.success) {
        // Step 4: Show success
        showSuccessPage(orderId);
        // Send email confirmation (via backend)
      }
    },
    prefill: {
      email: user.email,
      contact: user.phone
    },
    theme: { color: "#D4AF37" } // Golden yellow
  };
  
  const razorpay = new window.Razorpay(options);
  razorpay.open();
}
```

**Backend Payment Verification:**
```javascript
// POST /api/payments/verify

const crypto = require('crypto');

async function verifyPayment(req) {
  const { 
    razorpay_order_id, 
    razorpay_payment_id, 
    razorpay_signature,
    orderId 
  } = req.body;
  
  // Step 1: Verify signature (ensures payment is authentic)
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');
  
  const isValid = expectedSignature === razorpay_signature;
  
  if (!isValid) {
    throw new Error('Invalid payment signature');
  }
  
  // Step 2: Fetch payment details from Razorpay API
  const payment = await razorpay.payments.fetch(razorpay_payment_id);
  
  if (payment.status !== 'captured') {
    throw new Error('Payment not captured');
  }
  
  // Step 3: Update order status in DB
  await db.orders.update(orderId, {
    orderStatus: 'confirmed',
    updatedAt: new Date()
  });
  
  // Step 4: Save payment record
  await db.payments.create({
    orderId,
    razorpayPaymentId: razorpay_payment_id,
    razorpayOrderId: razorpay_order_id,
    amount: payment.amount / 100,
    status: 'success',
    createdAt: new Date()
  });
  
  // Step 5: Send confirmation email (async)
  sendOrderConfirmationEmail(orderId);
  
  // Step 6: Notify admin (optional)
  notifyAdminNewOrder(orderId);
  
  return { success: true, orderId };
}
```

---

### 5. Order Status Tracking

**Customer Dashboard:**
```
Orders List:
┌──────────────────────────────┐
│ Order #ORD-20260815-001      │
│ Status: In Production 🔄     │
│ Expected Delivery: 16 Aug    │
│ [View Details]               │
└──────────────────────────────┘

Order Details Page:
┌──────────────────────────────┐
│ Order #ORD-20260815-001      │
│ ────────────────────────────  │
│ Customization:               │
│ • Skin Type: Oily            │
│ • Ingredients: Haldi, Aloe   │
│ • Allergies Avoided: None    │
│ ────────────────────────────  │
│ Timeline:                    │
│ ✓ Confirmed (15 Aug, 2:30 PM)
│ 🔄 In Production (Started)   │
│ ◯ Ready to Ship (Est. 16 Aug)
│ ◯ Shipped (Est. 17 Aug)      │
│ ◯ Delivered (Est. 18 Aug)    │
│ ────────────────────────────  │
│ Price: ₹449                  │
│ [Track Package]              │
└──────────────────────────────┘
```

**Status Update Mechanism:**

```javascript
// Admin backend: Update order status
POST /api/orders/:orderId/update-status

{
  status: "shipped",
  trackingNumber: "SHIP123456",
  carrier: "India Post" // or courier name
}

// This triggers:
// 1. Update DB
// 2. Send email to customer
// 3. If shipped: send tracking link

async function updateOrderStatus(orderId, newStatus, trackingNumber) {
  // Update DB
  await db.orders.update(orderId, {
    orderStatus: newStatus,
    trackingNumber,
    updatedAt: new Date()
  });
  
  // Get order & customer details
  const order = await db.orders.findById(orderId);
  const customer = await db.users.findById(order.userId);
  
  // Send email notification
  const emailTemplate = STATUS_EMAIL_TEMPLATES[newStatus];
  await sendEmail({
    to: customer.email,
    subject: emailTemplate.subject,
    body: emailTemplate.body({
      customerName: customer.name,
      orderId: order.id,
      trackingNumber,
      trackingLink: `https://track.example.com?ref=${trackingNumber}`
    })
  });
}
```

---

### 6. Admin Dashboard (For Business Owner)

**Screens:**
1. **Orders Overview** - List of all orders, filter by status
2. **New Orders Today** - Quick list of today's confirmed orders
3. **Production Queue** - Orders to be made today
4. **Shipments** - Orders ready to ship, bulk label printing
5. **Analytics** - Revenue, top skin types, trending concerns

**Key Features:**
```
Dashboard Widget: Today's Orders
┌────────────────────────────────┐
│ 🆕 New Orders: 3               │
│ 🏭 In Production: 5            │
│ 📦 Ready to Ship: 2            │
│ 🚚 Shipped Today: 1            │
└────────────────────────────────┘

Production Queue:
Order #001 | Oily + Haldi | Qty: 1 | [Start]
Order #002 | Dry + Aloe | Qty: 1 | [Start]
...
```

**Backend Routes for Admin:**
```
GET    /api/admin/orders?status=pending&date=today
GET    /api/admin/analytics/revenue?period=month
POST   /api/admin/orders/:id/mark-shipped
POST   /api/admin/batch/print-labels (bulk)
```

---

## Page-by-Page Functionality

### Homepage
- **Load:** 0.5s target on 4G
- **Components:**
  - Hero (CTA button, background image)
  - How It Works (3-step timeline)
  - Ingredients showcase (4 cards)
  - Testimonials (3-4 reviews, auto-scroll carousel)
  - FAQ (6 questions, expandable)
  - Footer
- **Interactions:**
  - CTA button → Smooth scroll to questionnaire OR redirect if logged in
  - Testimonial carousel auto-plays every 5s, clickable arrows
  - FAQ accordion expand/collapse

### Questionnaire Page
- **URL:** `/questionnaire`
- **Auth:** User must be logged in (redirect to login if not)
- **State:** Form answers saved to Zustand store, persist to localStorage (so refreshing doesn't lose progress)
- **Validation:** Question not marked as answered until selection made
- **Interactions:**
  - Back button (go to previous Q, keep answers)
  - Next button (only enabled if Q answered)
  - Progress bar (animated fill)
  - On last Q → "Submit" button instead of "Next"

### Results/Confirmation Page
- **URL:** `/order-confirmation?orderId=xyz`
- **Load:** Show custom summary + price
- **CTA:** "Proceed to Payment" button
- **Security:** Only show if user owns this order

### Order Status Dashboard
- **URL:** `/dashboard`
- **Auth:** Must be logged in
- **Load:** Fetch all orders for logged-in user
- **Display:** List view (mobile) or card grid (desktop)
- **Details:** Clicking order → detail page

### Admin Dashboard
- **URL:** `/admin`
- **Auth:** Admin-only access (JWT role check)
- **Load:** Stats, order list, production queue
- **Interactions:** Bulk select orders → print labels, mark shipped

---

## Backend API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/me (get current user)
```

### Questionnaire & Orders
```
POST   /api/questionnaire/submit
GET    /api/orders
GET    /api/orders/:orderId
PUT    /api/orders/:orderId (edit before payment)
```

### Payments
```
POST   /api/payments/create-order
POST   /api/payments/verify
GET    /api/payments/:orderId
```

### Admin
```
GET    /api/admin/orders?status=pending
POST   /api/admin/orders/:id/update-status
GET    /api/admin/analytics/summary
POST   /api/admin/bulk-export-labels
```

### Public
```
GET    /api/ingredients (list for fallback UI)
POST   /api/contact (contact form)
```

---

## Database Interactions

### On User Signup
```
1. Create users row
2. Hash password (bcrypt)
3. Create JWT token
4. Send welcome email (async)
```

### On Questionnaire Submit
```
1. Validate answers
2. Load matching recipes
3. Create orders row
4. Save payment record (status=pending)
5. Return order with price
```

### On Payment Success (Webhook)
```
1. Verify Razorpay signature
2. Update orders.orderStatus = "confirmed"
3. Update payments.status = "success"
4. Send confirmation email
5. Create notification (for admin)
6. Trigger async job: "Make soap for this order"
```

### On Order Status Update
```
1. Update orders.orderStatus
2. Send customer email
3. If shipped: send tracking info
```

---

## Error Handling & Edge Cases

### Questionnaire Errors
```
Error: Postal code out of delivery area
Response: 400 Bad Request
Message: "We deliver to [list areas]. Your area isn't covered yet."
Action: Show map/list of covered areas

Error: User tries to submit without skin type
Response: 400 Bad Request
Message: "Please select a skin type to continue"
Action: Highlight missing question

Error: Network timeout during submit
Response: Retry button + local cache
Action: Save form to localStorage, auto-retry on reconnect
```

### Payment Errors
```
Error: Payment failed/cancelled by user
Response: Show retry button
Action: Order stays in "pending" status, customer can retry

Error: Signature mismatch (security issue)
Response: 403 Forbidden
Action: Log incident, alert admin, do NOT create order

Error: Razorpay API timeout
Response: Manual verification later
Action: Store razorpay_order_id, cron job checks after 10 mins
```

### Order Errors
```
Error: Customer tries to view another user's order
Response: 403 Forbidden
Action: Redirect to own dashboard

Error: Customer deletes account with active order
Response: Warning: "You have active orders. Cancellation not allowed."
Action: Only allow deletion after all orders delivered
```

---

## Notification System

### Email Notifications

**1. Welcome Email (Post-Signup)**
```
Subject: Welcome to [Brand]! 🧼
Content:
- Greeting
- Why personalized soap
- Link to start questionnaire
- FAQ link
```

**2. Order Confirmation (Post-Payment)**
```
Subject: Your Custom Soap Order Confirmed #ORD-001 ✓
Content:
- Order number
- Customization summary
- Expected delivery date
- Price paid
- Link to track
- Patch test reminder + FAQ link
```

**3. Production Started**
```
Subject: Your Soap is Being Crafted! 🧼
Content:
- Order number
- "We've started making your custom soap"
- Expected ready date
- Link to dashboard
```

**4. Ready to Ship**
```
Subject: Your Soap is Ready! 📦
Content:
- Order number
- Summary
- "Packing for shipment"
- Estimated ship date
```

**5. Shipped (With Tracking)**
```
Subject: Your Soap is on the Way! 🚚
Content:
- Order number
- Tracking link/number
- Carrier name
- Estimated delivery date
- Instructions for delivery
```

**6. Delivered**
```
Subject: Your Soap Has Arrived! 🎉
Content:
- Order number
- Delivery confirmation
- Request for review
- Link to reorder
- Link to care instructions
```

**7. Password Reset**
```
Subject: Reset Your Password
Content:
- "You requested a password reset"
- One-time link (valid 24h)
- If not requested: link to contact support
```

### In-App Notifications
- Toast notifications (top-right corner)
- Success: Green background, checkmark icon
- Error: Red background, X icon
- Info: Blue background, i icon
- Warning: Orange background, ! icon

### SMS Notifications (Future)
- Opt-in after order confirmation
- Ship notification with tracking
- Delivery confirmation
- (Optional: order ready, production started)

---

## Performance Optimization

### Frontend
- Image lazy-loading
- Code splitting (separate chunk per page)
- CSS-in-JS to avoid layout shift
- Minify + gzip all assets

### Backend
- Database indexing on frequently queried fields (userId, orderStatus)
- Redis caching for ingredient list, recipe list
- Pagination on order list (10 per page)
- API response gzip compression

### Database
- Connection pooling (Prisma default)
- Archive old orders to separate table (>1 year)
- Regular backups (daily)

---

## Testing Checklist

**Manual Testing (Before Launch):**
- [ ] Sign up → Login → Logout flow
- [ ] Complete questionnaire end-to-end
- [ ] Test payment with Razorpay test mode
- [ ] Verify order confirmation email
- [ ] Check order status updates
- [ ] Test on mobile (iPhone + Android)
- [ ] Test on slow 4G connection
- [ ] Test accessibility (keyboard nav, screen reader)
- [ ] Test edge cases (empty form, max allergens, etc.)

**Automated Testing:**
- [ ] Unit tests for auth functions
- [ ] Unit tests for recipe matching algorithm
- [ ] Integration tests for payment flow
- [ ] E2E tests for critical user journeys

---

## Deployment Checklist

- [ ] All env variables set (.env.production)
- [ ] Database migrations run
- [ ] SSL certificate installed
- [ ] Backup strategy configured
- [ ] Error monitoring (Sentry) activated
- [ ] Analytics (Plausible) installed
- [ ] Email service configured
- [ ] Payment (Razorpay) in live mode
- [ ] Admin user created
- [ ] CORS, CSP headers configured
- [ ] Rate limiting enabled
- [ ] Load testing done
- [ ] Security audit completed
- [ ] Marketing assets ready (email template, social posts)

---

## Summary

This website is designed as a straightforward, mobile-first questionnaire → custom soap order flow. The backend handles complex logic (recipe matching, payment verification, notifications), while the frontend focuses on smooth UX. All components are designed to work offline-first where possible, with graceful error handling for real-world conditions (poor connectivity, payment failures, etc.).
