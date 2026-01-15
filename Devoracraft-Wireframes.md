# DEVORACRAFT WEBSITE WIREFRAMES & COMPONENT SPECS
## Detailed Page Layouts + Component Specifications

**Version:** 1.0  
**Date:** January 11, 2026  
**Status:** Ready for React Implementation  

---

## HOME PAGE DETAILED WIREFRAME

### Header (Sticky Navigation)
```
┌─────────────────────────────────────────────────────────────┐
│  [st LOGO]          Home | Packages | Portfolio | How It Works | About | Contact    [Book a Call] →  │
└─────────────────────────────────────────────────────────────┘

Height: 64px
Sticky: Yes (Z-index 100)
Background: White (#FFFFFF)
Border Bottom: 1px solid #E5E5E5
Padding: 16px 32px
Logo Size: 40x40px
Navigation Gap: 32px
Font: Body regular, 16px
```

### Hero Section
```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│                                                               │
│        Professional Websites.                                │
│        No Tech Knowledge Required.                           │
│                                                               │
│        Starting at €25/month. Built by a developer           │
│        who genuinely cares about your success.               │
│                                                               │
│                [Book Your Discovery Call] →                  │
│                                                               │
│                                                               │
└─────────────────────────────────────────────────────────────┘

Height: 600px
Background: White
Padding: 80px 32px
Text Alignment: Center
Max Width: 800px, centered

H1: 48px, 600 weight, #000000
Subheadline: 20px, 400 weight, #2D2D2D
CTA Button: Primary style
Spacing:
  - H1 to subheadline: 24px
  - Subheadline to button: 48px
```

### Why Devoracraft Section (4 Feature Cards)
```
┌─────────────────────────────────────────────────────────────┐
│                Why Devoracraft?                              │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │ 🎯 Card 1    │  │ 🧠 Card 2    │  │ ⚡ Card 3    │        │
│  │ Title        │  │ Title        │  │ Title        │        │
│  │              │  │              │  │              │        │
│  │ Description  │  │ Description  │  │ Description  │        │
│  │ text here    │  │ text here    │  │ text here    │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                               │
│  ┌──────────────┐                                            │
│  │ 🤝 Card 4    │                                            │
│  │ Title        │                                            │
│  │ Description  │                                            │
│  └──────────────┘                                            │
│                                                               │
└─────────────────────────────────────────────────────────────┘

Padding: 64px 32px
Background: White
Max Width: 1200px, centered
Grid: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
Card Style: Feature card component
Spacing: 24px between cards

Card Content:
- Icon: 40px, emoji or SVG
- Title: 20px, 600 weight, #000000
- Description: 16px, 400 weight, #2D2D2D
- Padding: 24px
- Border: 1px solid #E5E5E5
- Border Radius: 8px
```

### Packages Overview Section (3 Package Cards)
```
┌─────────────────────────────────────────────────────────────┐
│            Pick Your Perfect Plan                            │
│     Everything you need to grow online                       │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   STARTER    │  │  GROWTH ★    │  │  PRO MAX     │       │
│  │ €25/month    │  │ €40 + €250   │  │ €80 + €500   │       │
│  │              │  │              │  │              │       │
│  │ ✓ Feature 1  │  │ ✓ Feature 1  │  │ ✓ Feature 1  │       │
│  │ ✓ Feature 2  │  │ ✓ Feature 2  │  │ ✓ Feature 2  │       │
│  │ ✓ Feature 3  │  │ ✓ Feature 3  │  │ ✓ Feature 3  │       │
│  │ ✓ Feature 4  │  │ ✓ Feature 4  │  │ ✓ Feature 4  │       │
│  │              │  │ ✓ Feature 5  │  │ ✓ Feature 5+ │       │
│  │  [Get Stuff] │  │[Choose This] │  │  [Go All In] │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│                  [View Detailed Pricing →]                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘

Padding: 64px 32px
Background: #F5F5F5 (light gray background)
Max Width: 1200px, centered
Grid: 3 columns (desktop), 1 column (mobile)
Card Spacing: 32px
Growth Card: Slightly larger/highlighted (border or subtle shadow)

Card Layout:
- Title: 24px, 600 weight
- Price: 28px, 600 weight, #000000
- Description: 14px, 400 weight, #2D2D2D
- Features: Bulleted list, 16px, 400 weight
- CTA Button: Full width primary button
- Padding: 32px
- Border Radius: 8px
```

### Featured Portfolio Section
```
┌─────────────────────────────────────────────────────────────┐
│           See What's Possible                                │
│          Real websites built with care                       │
│                                                               │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐  │
│  │   [Image]      │ │   [Image]      │ │   [Image]      │  │
│  │                │ │                │ │                │  │
│  │ Freelancer     │ │ Solar Energy   │ │ E-Commerce     │  │
│  │ Portfolio      │ │ Company        │ │ Store          │  │
│  │                │ │                │ │                │  │
│  │ [View Site →]  │ │ [View Site →]  │ │ [View Site →]  │  │
│  └────────────────┘ └────────────────┘ └────────────────┘  │
│                                                               │
│              [View All Examples →]                           │
│                                                               │
└─────────────────────────────────────────────────────────────┘

Padding: 64px 32px
Background: White
Grid: 3 columns (desktop), 1 column (mobile)
Image Aspect Ratio: 16:9 or 4:3
Card Style: Portfolio card component

Card Content:
- Image: Cover, 300x200px (responsive)
- Badge: Package type (top-right, overlay)
- Title: 18px, 600 weight
- Description: 14px, 400 weight
- Link: "View Full Site →" inline link
```

### Testimonials Section
```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│   "They built exactly what we needed..."                     │
│                                                               │
│   - Client Name                                              │
│   ⭐ ⭐ ⭐ ⭐ ⭐                                                │
│                                                               │
│   [← Prev]                                           [Next →]│
│                                                               │
└─────────────────────────────────────────────────────────────┘

Padding: 64px 32px
Background: #F5F5F5
Max Width: 700px, centered
Carousel: 1 quote visible at a time

Content:
- Quote: 20px, 400 weight, #2D2D2D
- Attribution: 14px, 600 weight, #000000
- Stars: ⭐ emoji or SVG
- Navigation: Arrow buttons (subtle)
- Transition: Fade in/out (300ms)
```

### Final CTA Section
```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│      Ready to Transform Your Online Presence?                │
│                                                               │
│      Let's chat about what's possible for your business.     │
│                                                               │
│              [Book a Free Discovery Call] →                  │
│                                                               │
│                                                               │
└─────────────────────────────────────────────────────────────┘

Height: 300px
Background: Black (#000000)
Text Color: White (#FFFFFF)
Padding: 64px 32px
Text Alignment: Center

H2: 36px, 600 weight, white
Subtext: 18px, 400 weight, white
Button: Secondary style (white text, transparent background)
```

### Footer
```
┌─────────────────────────────────────────────────────────────┐
│ Packages | Portfolio | How It Works | About | Contact        │
│                                                               │
│ © 2026 Devoracraft. All rights reserved.                     │
│ Privacy Policy | Terms of Service                            │
│                                                               │
│ [GitHub] [LinkedIn] [Twitter]                               │
└─────────────────────────────────────────────────────────────┘

Height: Auto (200-250px)
Background: #F5F5F5
Padding: 48px 32px
Grid: 4-5 columns (links, legal, social)
Font: 14px, 400 weight, #2D2D2D

Structure:
- Section 1: Quick links (Packages, Portfolio, etc.)
- Section 2: Legal (Privacy, Terms)
- Section 3: Copyright
- Section 4: Social links
```

---

## CONTACT PAGE (FORM) DETAILED SPEC

### Form Container
```
┌──────────────────────────────────────────────────────────┐
│                  Let's Get Started                        │
│              Tell us about your project                   │
│                                                            │
│  [Progress Bar: 1/6 ▓░░░░░░░░░░░░░░░░░░░░]             │
│                                                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │ SECTION 1: BASIC INFORMATION                       │  │
│  │                                                    │  │
│  │ Business Name *                                    │  │
│  │ [________________________________________]         │  │
│  │                                                    │  │
│  │ Your Name *                                        │  │
│  │ [________________________________________]         │  │
│  │                                                    │  │
│  │ Email *                                            │  │
│  │ [________________________________________]         │  │
│  │                                                    │  │
│  │ Phone Number *                                     │  │
│  │ [________________________________________]         │  │
│  │                                                    │  │
│  │ Which package interests you? *                    │  │
│  │ ○ Starter  ○ Growth  ○ Pro Max                    │  │
│  │                                                    │  │
│  │                  [Continue →]                     │  │
│  └────────────────────────────────────────────────────┘  │
│                                                            │
└──────────────────────────────────────────────────────────┘

Max Width: 600px, centered
Background: White
Padding: 40px
Border: 1px solid #E5E5E5
Border Radius: 8px
Box Shadow: 0 2px 8px rgba(0,0,0,0.04)

Form Field Spacing: 24px between fields
Label: 14px, 600 weight, #2D2D2D, margin-bottom 8px
Input: 16px, 400 weight, #2D2D2D
Input Height: 44px
Input Padding: 12px 16px
Input Border: 2px solid #E5E5E5
Input Border Radius: 6px
Input Focus: Border #000000, box-shadow 0 0 0 3px rgba(0,0,0,0.1)

Button (Continue): 
- Full width
- Primary style (black, white text)
- Padding: 12px 24px
- Margin Top: 24px
```

### Form Field Types

**Text Input:**
```
[Input field 44px height, 2px border, 6px radius]
```

**Textarea:**
```
[
Multi-line input field
Min height 120px
Resizable vertical only
]
```

**Radio Buttons:**
```
○ Option 1    ○ Option 2    ○ Option 3
```

**File Upload:**
```
┌──────────────────────────────────────┐
│    📄 Drag files here or click       │
│                                      │
│           [Choose Files]             │
│                                      │
│  Max 5 files, JPG/PNG/PDF/DOC       │
└──────────────────────────────────────┘

Dashed border 2px
Padding: 32px
Cursor: Pointer
Hover: Background #F5F5F5
```

**Checkboxes:**
```
☑ I understand the pricing
☑ I'm ready to discuss
☑ I accept the Privacy Policy
```

### Form Progress Flow

**Section 1 → Section 2 → Section 3 → Section 4 → Section 5 → Section 6**

Each section:
- Shows 1/6, 2/6 progress
- Validates on Continue
- Shows friendly errors inline
- Progress bar fills incrementally
- Mobile: Single column
- Desktop: Full width form

### Success State

```
┌──────────────────────────────────────────────────────────┐
│                                                            │
│                    ✓ Success!                             │
│                                                            │
│      We've received your information.                      │
│      Check your email to book a call.                      │
│                                                            │
│      You can expect to hear from us within 24 hours.     │
│                                                            │
│          [Back to Home]  [View Packages →]               │
│                                                            │
└──────────────────────────────────────────────────────────┘

Checkmark: Large, green (#10B981)
Message: 18px, centered
Animation: Fade in + scale (300ms)
Buttons: Secondary style
```

---

## PACKAGES PAGE DETAILED SPEC

### Page Structure
```
HERO (Small)
│
├── STARTER SECTION
│   ├── Content (left)
│   ├── Features (checkmarks)
│   └── CTA Button
│
├── GROWTH SECTION (Highlighted)
│   ├── "MOST POPULAR" Badge
│   ├── Content (left)
│   ├── Features (checkmarks)
│   └── CTA Button
│
├── PRO MAX SECTION
│   ├── Content (left)
│   ├── Features (checkmarks)
│   └── CTA Button
│
└── FAQ SECTION
```

### Package Detail Layout (Example: Growth Package)

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│   GROWTH                                      [MOST POPULAR] │
│   €40/month + €250 startup                                   │
│                                                               │
│   Scale your online presence. Convert visitors into          │
│   customers. Stay ahead of competitors.                      │
│                                                               │
│   WHAT'S INCLUDED:                                           │
│   ✓ Dynamic website with interactive elements               │
│   ✓ Advanced email service (unlimited)                       │
│   ✓ Optimized conversion funnels                            │
│   ✓ Simple CMS system                                       │
│   ✓ Full SEO optimization                                   │
│   ✓ Basic analytics & monthly reports                       │
│   ✓ Priority email & chat support                           │
│                                                               │
│   PERFECT FOR:                                               │
│   • Established small businesses (10-50 employees)          │
│   • E-service providers (consultants, trainers)             │
│   • Businesses with customer acquisition focus              │
│   • Companies looking to modernize                          │
│                                                               │
│   EXAMPLE WEBSITES:                                          │
│   [Example 1 Link] [Example 2 Link] [Example 3 Link]       │
│                                                               │
│   [Choose This Package →]                                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘

Layout: 2-column (content left, visual right on desktop)
Padding: 64px 32px
Divider: 1px solid #E5E5E5 between packages
Max Width: 1200px

Title: 36px, 600 weight
Price: 28px, 600 weight
Description: 18px, 400 weight, #2D2D2D
Badge: "MOST POPULAR" - green badge, top-right
Features: Bulleted list, 16px
Perfect For: Bulleted list, 16px
Examples: Inline links with thumbnails
CTA: Full width primary button
```

---

## PORTFOLIO PAGE DETAILED SPEC

### Grid Layout
```
┌─────────────────────────────────────────────────────────────┐
│          See What's Possible                                 │
│         Real websites built with care                        │
│                                                               │
│   All | Starter | Growth | Pro Max                           │
│                                                               │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│   │ Example 1│ │ Example 2│ │ Example 3│                    │
│   └──────────┘ └──────────┘ └──────────┘                    │
│                                                               │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│   │ Example 4│ │ Example 5│ │ Example 6│                    │
│   └──────────┘ └──────────┘ └──────────┘                    │
│                                                               │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│   │ Example 7│ │ Example 8│ │ Example 9│                    │
│   └──────────┘ └──────────┘ └──────────┘                    │
│                                                               │
└─────────────────────────────────────────────────────────────┘

Grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
Card Width: Equal, responsive
Spacing: 24px between cards
Padding: 64px 32px
Max Width: 1200px, centered
```

### Example Card Detail
```
┌──────────────────┐
│   [Screenshot]   │
│                  │ ← Image, 16:9 aspect ratio, cover
│                  │
├──────────────────┤
│ 🔷 Starter       │ ← Package badge (top-right corner)
│                  │
│ Freelancer       │ ← Title
│ Portfolio        │
│                  │
│ A clean,         │ ← Description
│ minimal          │
│ portfolio to     │
│ showcase work    │
│                  │
│ [View Site →]    │ ← CTA link
└──────────────────┘

Card Dimensions: ~350px width, responsive
Image Height: 200px
Padding (content): 16px
Font sizes: Title 16px, Description 14px
Badge: Position absolute, top-right, 12px
```

---

## ABOUT PAGE DETAILED SPEC

### Founder Story Section
```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│                 We're Here to Make Web Simple               │
│                       And Powerful                          │
│                                                               │
│  Ruben Thielman - 22 years old, passionate developer        │
│                                                               │
│  I'm a software and web developer dedicated to creating     │
│  exceptional digital experiences. With a focus on clean     │
│  code, innovative solutions, and user-centered design,      │
│  I bring ideas to life through technology.                  │
│                                                               │
│  My work combines technical expertise with creative         │
│  problem-solving to deliver projects that make an impact.   │
│                                                               │
│  Whether it's building responsive web applications,         │
│  developing robust software solutions, or crafting          │
│  intuitive user interfaces, I approach each project with    │
│  attention to detail and a commitment to excellence.        │
│                                                               │
└─────────────────────────────────────────────────────────────┘

Padding: 64px 32px
Text Alignment: Center
Max Width: 700px, centered
Subheading: 28px, 600 weight
Body: 18px, 400 weight, line-height 1.8
```

### Team Section
```
┌─────────────────────────────────────────────────────────────┐
│              Meet the Team                                   │
│   Young, passionate, dedicated to excellence                 │
│                                                               │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐                   │
│  │ [Photo] │   │ [Photo] │   │ [Photo] │                   │
│  │         │   │         │   │         │                   │
│  │ Name    │   │ Name    │   │ Name    │                   │
│  │ Role    │   │ Role    │   │ Role    │                   │
│  │ Bio     │   │ Bio     │   │ Bio     │                   │
│  │ text    │   │ text    │   │ text    │                   │
│  └─────────┘   └─────────┘   └─────────┘                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘

Grid: 3 columns (desktop), 1 column (mobile)
Card Width: Equal, responsive
Spacing: 32px
Padding: 64px 32px

Card Content:
- Photo: Circular or square, 200x200px
- Name: 18px, 600 weight
- Role: 14px, 400 weight, #666666
- Bio: 14px, 400 weight, #2D2D2D
```

---

## COMPONENT SPECIFICATIONS

### Button Component

```typescript
// Button.tsx
type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

// Tailwind Classes:
// Primary: bg-black text-white hover:bg-gray-900
// Secondary: bg-gray-100 text-black hover:bg-gray-200
// Outline: border-2 border-black text-black hover:bg-gray-50

// Sizes:
// sm: px-4 py-2 text-sm
// md: px-8 py-3 text-base
// lg: px-8 py-4 text-lg
```

### Card Component

```typescript
// Card.tsx
interface CardProps {
  children: ReactNode;
  hover?: boolean;
  className?: string;
}

// Tailwind Classes:
// Base: bg-white border border-gray-200 rounded-lg p-6
// Hover: hover:shadow-lg transition-shadow duration-200
```

### Form Input Component

```typescript
// Input.tsx
interface InputProps {
  label?: string;
  type?: 'text' | 'email' | 'tel' | 'number';
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Tailwind Classes:
// Base: w-full px-4 py-3 border-2 border-gray-300 rounded-lg
// Focus: focus:border-black focus:outline-none focus:ring-3 focus:ring-black/10
// Error: border-red-500 focus:border-red-500
```

---

## ANIMATION SPECIFICATIONS (Framer Motion)

### Page Entrance
```typescript
// fade-in: opacity 0 → 1 (300ms, ease-in-out)
// slide-up: translateY 20px → 0 (400ms, ease-out)
// combined: both apply

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

### Hover Animations
```typescript
// Button hover: scale 1 → 1.02 (150ms)
// Card hover: shadow increase + translateY -4px (200ms)

const buttonVariants = {
  hover: { scale: 1.02 },
  transition: { duration: 0.15 }
};

const cardVariants = {
  hover: { y: -4, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" },
  transition: { duration: 0.2 }
};
```

### Form Validation
```typescript
// Error shake: translateX -2px → 2px → 0 (200ms)
// Success checkmark: scale 0 → 1, rotate 0 → 360 (300ms)

const errorVariants = {
  shake: {
    x: [-2, 2, -2, 2, 0],
    transition: { duration: 0.2 }
  }
};
```

---

## RESPONSIVE BREAKPOINTS

```
Mobile First:
- Start with base styles (mobile)
- Add md: for tablets (768px+)
- Add lg: for desktop (1024px+)
- Add xl: for large desktop (1280px+)

Tailwind Breakpoint Usage:
md:grid-cols-2          // 2 columns on tablet
lg:grid-cols-3          // 3 columns on desktop
md:px-8 lg:px-12        // Padding adjustments

Container Queries:
Max width: 1200px for content containers
Centered with mx-auto
Padding: 32px (mobile), 48px (desktop)
```

---

## ACCESSIBILITY CHECKLIST

- [ ] Color contrast: 4.5:1 for text
- [ ] Focus indicators: Visible on all interactive elements
- [ ] Keyboard navigation: Tab through all elements
- [ ] ARIA labels: Forms, icons, regions
- [ ] Semantic HTML: `<header>`, `<main>`, `<nav>`, `<section>`
- [ ] Alternative text: Images have alt attributes
- [ ] Form validation: Clear error messages, inline feedback
- [ ] Mobile: Touch targets 44x44px minimum
- [ ] Page title: Descriptive, unique per page
- [ ] Skip links: Skip to main content option

---

## SEO SPECIFICATIONS

**Meta Tags:**
```html
<title>Devoracraft | Professional Websites Starting at €25/month</title>
<meta name="description" content="Professional websites, no technical knowledge required. AI-powered solutions from €25/month. Book your free discovery call today.">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Open Graph (Social Sharing) -->
<meta property="og:title" content="Devoracraft | Professional Websites">
<meta property="og:description" content="...">
<meta property="og:image" content="https://...">

<!-- Canonical -->
<link rel="canonical" href="https://studiothielman.com/">

<!-- Sitemap -->
/sitemap.xml
```

**Structured Data:**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Devoracraft",
  "url": "https://studiothielman.com",
  "telephone": "+32 493 50 56 41",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BE"
  }
}
```

---

## PERFORMANCE TARGETS

- **PageSpeed Score:** >90 (Google Lighthouse)
- **Time to First Contentful Paint:** <1.5s
- **Largest Contentful Paint:** <2.5s
- **Cumulative Layout Shift:** <0.1
- **First Input Delay:** <100ms
- **Bundle Size:** <150KB (gzipped)

**Optimizations:**
- Image lazy loading
- Code splitting (React components)
- Minify CSS/JS
- Compress images (WebP format)
- Cache headers
- CDN for static assets

---

## VERSION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 11, 2026 | Complete wireframes and component specs |

---

**Ready to code! All specifications locked and clear. 🚀**