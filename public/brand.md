# Studio Thielman — Brand & UI guide

**Canonical URLs:** [brand.json](https://studiothielman.com/brand.json) · [llms.txt](https://studiothielman.com/llms.txt)  
**Live site:** https://studiothielman.com

Use this document when an AI or designer needs to match Studio Thielman’s huisstijl without scraping the React app.

---

## Brand essence

- **What:** Web design & development studio (sites, SEO, e-commerce, AI integrations).
- **Feel:** Professional, minimal, high-trust — black & white first, no flashy palette.
- **Audience:** Entrepreneurs and SMEs (Belgium + international).

---

## Color palette

| Token | Hex | Use |
|--------|-----|-----|
| Primary | `#000000` | Logo area, headings, primary/CTA buttons |
| Secondary | `#FFFFFF` | Main backgrounds, text on dark |
| Accent | `#F5F5F5` | Alternate sections, input backgrounds |
| Text primary | `#2D2D2D` | Body copy |
| Text secondary | `#666666` | Labels, captions, “ABOUT US”-style labels on light |
| Border | `#E5E5E5` | Cards, dividers |
| Hero/footer dark | `#111827` (`gray-900`) | Page heroes, footer |
| CTA | `#000000` | Same as primary — filled black buttons |

**Semantic:** success `#10B981`, error `#EF4444`, info `#3B82F6`.

**Hero overlay:** `from-black/80 to-black/40` gradient over dark hero.

---

## Typography

- **Family:** System stack — `-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, sans-serif`
- **No custom webfont** — clean, native, fast.
- **Weights:** 600 for headings, 400 for body; buttons often `font-semibold` or `font-bold` (CTA).

| Role | Size | Line height |
|------|------|-------------|
| H1 (hero) | 48–60px responsive | ~1.2 |
| H2 (section) | 36–48px | ~1.3 |
| H3 | 28px | ~1.3 |
| Body large | 18px | 1.6 |
| Body | 16px | 1.6 |
| Small | 14px | 1.5 |

**Section labels:** `text-sm uppercase tracking-wider` — on dark heroes `text-white/60`, on light `text-text-secondary`.

---

## Spacing & layout

- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Section rhythm:** `py-20` between major blocks
- **Grids:** 1 → 2 → 3 columns for cards (`gap-8`)
- **Hero:** Dark full-width block, centered headline + subtitle, overlaps fixed header (`-mt-20 pt-20`)

---

## Components

### Buttons

- **Shape:** `rounded-lg`
- **CTA:** Black background, white text, `border-2 border-cta`, `shadow-lg`, hover slightly darker + larger shadow
- **Outline:** Transparent, black border, black text
- **Motion:** Subtle scale on hover/tap (1.02 / 0.98)

### Cards

- White background, `border border-gray-200`, `rounded-xl`
- Padding `p-6`–`p-8`
- Hover: `shadow-xl`, `-translate-y-1`, title → black/cta accent

### Forms

- Inputs: `bg-gray-50`, `border-2 border-gray-300`, `rounded-lg`, focus `border-cta`
- Errors: red border + `bg-red-50`

### Accordions

- Process steps: large bold titles in bordered `rounded-2xl` panel
- FAQ: smaller `rounded-xl` rows, chevron rotation

---

## Page patterns

1. **Hero** — Dark gray-900, white H1, muted label above, optional background video (home).
2. **Content** — White or `gray-50` alternating sections.
3. **CTA band** — `bg-gray-900`, white headline, single CTA button.
4. **Footer** — Dark, 3-column links, copyright, privacy/terms.

---

## Motion

- Library: **Framer Motion**
- Entrance: fade + `y: 20` → `0`, ~0.6s, `viewport once`
- Lists: stagger `delay: index * 0.1`
- Marquee: horizontal infinite scroll (~25s) for service names

---

## Tone of voice (copy)

- Clear, direct, confident — no hype or jargon.
- Benefits for business owners (visibility, professionalism, growth).
- EN on `/`, NL (Belgium) on `/nl/`.

---

## Prompt for other AI tools

Copy into ChatGPT, Claude, Cursor, v0, etc.:

```
Follow Studio Thielman brand (studiothielman.com/brand.json):
Minimal black-and-white web studio UI. System sans-serif. Dark gray-900 heroes, white H1, uppercase tracked section labels. White cards, gray-200 borders, rounded-xl, hover lift + shadow. Black CTA buttons, white text, rounded-lg. Containers max-w-7xl, sections py-20. Text #2D2D2D / #666666. No bright accent colors.
```

---

## Maintenance

When you change `tailwind.config.js` or global UI patterns, update **brand.json** and this file so AI references stay accurate.
