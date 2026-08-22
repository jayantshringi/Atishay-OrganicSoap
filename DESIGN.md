# Design Documentation - Personalized Soap Business Website

## Brand Identity

### Brand Name & Tagline
- **Name:** [Your Brand Name] (e.g., "SkinSoap Co." / "Haldi & Chandan Co.")
- **Tagline:** "Soap Made Just For Your Skin"
- **Core Message:** Natural, organic, personalized skincare tailored to your allergies and skin type

### Color Palette
- **Primary:** Deep Earth Brown (#6B4423) - represents natural, organic ingredients
- **Secondary:** Soft Green (#A8D5BA) - health, nature, freshness
- **Accent:** Golden Yellow (#D4AF37) - represents turmeric (haldi), premium feel
- **Neutral:** Warm Cream (#F5E6D3) - background, soap texture feel
- **Text:** Charcoal (#333333) - readability, professional

### Typography
- **Headlines:** Poppins Bold (18px - 32px) - modern, friendly, accessible
- **Body Text:** Open Sans Regular (14px - 16px) - clean, easy to read on mobile
- **Labels/CTA:** Roboto Medium (12px - 14px) - actionable, clear

---

## Visual Style & Aesthetics

### Photography & Imagery
- **Product Photos:** Close-up, natural lighting of actual soap bars showing texture
- **Ingredient Shots:** Raw ingredients (aloe vera leaf, turmeric root, sandalwood, saffron) in natural settings
- **Lifestyle:** Hands washing, bathroom shelf, customer testimonial photos
- **Avoid:** Stock photo look; aim for authentic, handmade feel

### Iconography
- Leaf icon for organic/natural
- Droplet for aloe vera/hydration
- Flower for botanical ingredients
- Skin/face icon for personalization step
- Checkmark for confirmation/safety
- Style: Rounded, minimalist line icons (2px stroke)

---

## Website Layout & Structure

### Homepage
**Hero Section**
- Headline: "Soap Made Just For Your Skin"
- Subheadline: "Answer a few simple questions. We'll create your perfect soap."
- CTA Button: "Start Your Questionnaire" (Golden Yellow, prominent)
- Background: Soft gradient (cream to light green) with subtle soap texture or ingredient imagery

**How It Works Section**
- 3-Step Process (icons + text)
  1. Answer Questions (about skin type, allergies)
  2. We Create Your Recipe (show ingredient combinations)
  3. Receive Custom Soap (with delivery timeline)
- Visual: Timeline with connecting lines, icons

**Why Personalized Soap?**
- 2-3 benefit cards:
  - "No Wasted Products" - no more buying wrong soap
  - "Allergy-Safe" - only ingredients you can use
  - "100% Organic" - natural ingredients, no chemicals
- Each card has an icon + short copy (max 15 words)

**Ingredients Showcase**
- 4 ingredient cards displayed (Aloe Vera, Haldi, Chandan, Kesar)
- Each card: large image + ingredient name + 1-2 benefits
- Scrollable on mobile, grid layout on desktop

**Customer Testimonials Section**
- 3-4 review cards with star rating, customer name, short quote
- Authentic, real reviews from early customers

**FAQ Section**
- 5-6 common questions with expandable answers
- Topics: how customization works, ingredient safety, shipping, returns, shelf life

**Footer**
- Quick links (Home, How It Works, FAQ, Contact)
- Social links (Instagram, WhatsApp, Facebook)
- Newsletter signup: "Get skin tips & new ingredient updates"
- Contact info & business hours
- Disclaimer: "Patch test recommended for all new skincare products"

---

### Questionnaire/Quiz Page
**Single-Page Form (Progressive Disclosure)**
- One question per view, progresses to next on selection
- No scroll fatigue; smooth transitions between questions
- Progress bar at top showing completion (e.g., "Question 2 of 6")

**Question Sequence**
1. "What's your skin type?" (Oily / Dry / Combination / Sensitive)
2. "Do you have any known allergies?" (Dropdown + text input for specifics)
3. "What's your main skin concern?" (Acne / Dryness / Sensitivity / General Care)
4. "Any ingredients to avoid?" (Checkboxes: Fragrance / Nuts / Specific herbs)
5. "Preferred soap texture?" (Hard bar / Soft bar / Exfoliating)
6. "Delivery address & contact" (Text inputs)

**Design Details**
- Large, readable question text (20px+)
- Radio buttons/checkboxes with full-width clickable area
- "Next" button disabled until selection made
- "Back" button to edit previous answers
- Progress visual (e.g., filled circles or percentage)
- Encouraging, friendly tone in copy

---

### Results/Confirmation Page
**After Questionnaire Completion**
- Headline: "We're Creating Your Perfect Soap!"
- Summary of customization: "Your soap will be: [Skin type]-friendly, [specific allergens]-free, [texture preference]"
- Visual: Stylized soap bar with personalization callouts
- Order details card:
  - Expected delivery: 3-5 business days
  - Price: ₹[X] (show amount)
  - "Proceed to Payment" button (bright accent color)
- Reassurance text: "Patch test recommended. See FAQ for allergy info."

---

### Product Page (Optional, for browsing)
- Grid layout: 4 columns (desktop), 2 columns (mobile), 1 column (small mobile)
- Each product card shows:
  - Soap image
  - Customization profile (skin type, key ingredients)
  - Price
  - "View Details" link
- Filter sidebar: by skin type, ingredients, price range

---

## Mobile-First Design Principles

- **Touch Targets:** All buttons ≥44px height, spaced ≥8px apart
- **Font Sizes:** Min 16px for body text (prevents zoom on iOS)
- **Viewport:** Responsive design, tested at 320px, 375px, 768px, 1024px+
- **Navigation:** Hamburger menu on mobile, sticky header with logo + menu on desktop
- **Forms:** Full-width inputs, large touch areas, single-column layout
- **Images:** Lazy-load, optimized for mobile bandwidth

---

## Accessibility & Inclusion

- **Color Contrast:** All text ≥4.5:1 ratio (WCAG AA standard)
- **Alt Text:** All product images have descriptive alt text
- **Form Labels:** Associated with inputs, not just placeholders
- **Keyboard Navigation:** Fully navigable via Tab key, visible focus states
- **Language:** Simple, jargon-free copy; explain "melt-and-pour" or "patch test" if used

---

## Visual Hierarchy & CTA Strategy

**Primary CTA:** "Start Your Questionnaire" (appears on homepage hero, sticky button on scroll)
**Secondary CTA:** "Learn More" (FAQ, ingredient details)
**Tertiary CTA:** Social sharing, newsletter signup

- CTA buttons: High contrast (golden yellow on cream/brown)
- CTA text: Action-oriented ("Start," "Order Now," "Save My Preferences")
- Avoid multiple competing buttons on one screen

---

## Performance & Loading States

- **Loading Indicators:** Spinner or progress bar during form submission
- **Confirmation Messages:** Toast notification or confirmation page after payment
- **Error Handling:** Clear, red-tinted error messages (e.g., "Please select a skin type to continue")
- **Page Load:** Target <3s on 4G mobile; optimize images, minimize CSS/JS

---

## Branding Applications

- **Logo Placement:** Top-left on desktop, center on mobile hero
- **Logo Style:** Simple, mark-based (e.g., soap bar + leaf silhouette)
- **Favicon:** Logo simplified to 16x16px
- **Social Media Kit:** Cover photo template, post templates in brand colors
- **Email Templates:** Confirmation & shipping emails use brand colors, simple layout

---

## Summary Design Checklist

- [ ] Color palette finalized and accessible
- [ ] Typography system tested at multiple sizes
- [ ] Mobile mockups for all key pages
- [ ] Questionnaire UX validated with 3+ test users
- [ ] Image optimization strategy defined
- [ ] Accessibility audit completed
- [ ] Brand guidelines document created for team/future designers
