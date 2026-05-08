# Jesus Loves You City Church — MVP Website

A premium, production-quality church/non-profit landing page built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

---

## 📁 Project Structure

```
JLYCC/
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, global components
│   ├── page.tsx            # Main page — assembles all sections
│   └── globals.css         # Design system — tokens, component classes, utilities
│
├── components/
│   ├── Navbar.tsx              # Sticky/transparent navbar with mobile menu
│   ├── Footer.tsx              # Dark footer with newsletter + social links
│   ├── ScrollToTop.tsx         # Floating scroll-to-top button
│   ├── AnnouncementBanner.tsx  # Dismissable event announcement bar
│   ├── FloatingLiveButton.tsx  # Persistent "Watch Live" floating button
│   └── sections/
│       ├── Hero.tsx            # Full-screen hero with animated stats
│       ├── About.tsx           # Ministry story with image + feature list
│       ├── Pillars.tsx         # Three core values cards
│       ├── Services.tsx        # Video player + weekly schedule
│       ├── CallToAction.tsx    # Impact section with parallax + testimonial
│       ├── Community.tsx       # Social platform outreach cards
│       ├── Leadership.tsx      # Leader profiles grid
│       ├── Donate.tsx          # Three giving tier cards
│       └── Contact.tsx         # Contact info + map placeholder
│
├── next.config.ts          # Next.js config (image domains)
├── tailwind.config.ts      # Custom colours, fonts, animations
├── tsconfig.json           # TypeScript config
└── package.json
```

---

## 🎨 Design System

### Colour Palette
| Token | Value | Usage |
|-------|-------|-------|
| `navy-950` | `#040d1a` | Page background |
| `navy-900` | `#071428` | Section alternates |
| `navy-800` | `#0d1f3c` | Card backgrounds |
| `crimson-500` | `#dc2626` | Primary accent / CTAs |
| `crimson-400` | `#ef4444` | Labels / hover states |
| `gold-400` | `#fbbf24` | Featured / highlighted cards |

### Fonts
- **Headings**: Montserrat (800–900 weight) via `font-heading` class
- **Body**: Inter (400–600 weight) via `font-sans` class

### Component Classes (in `globals.css`)
```css
.btn-primary     /* Red filled CTA button */
.btn-outline     /* White bordered button */
.btn-ghost       /* Subtle transparent button */
.card-glass      /* Frosted glass card style */
.section-label   /* Red uppercase section tag */
.section-title   /* Large bold section heading */
.section-divider /* Red underline accent bar */
.container-section /* Responsive centered container */
```

---

## ✏️ Where to Replace Content

| Section | File | What to Update |
|---------|------|---------------|
| Site metadata | `app/layout.tsx` | Title, description, OG tags |
| Announcement | `components/AnnouncementBanner.tsx` | Event text, date, link |
| Navbar | `components/Navbar.tsx` | Logo text, nav links |
| Hero | `components/sections/Hero.tsx` | Headline, stats, background image URL |
| About | `components/sections/About.tsx` | Story copy, image URL, year |
| Pillars | `components/sections/Pillars.tsx` | Pillar titles, descriptions, features |
| Services | `components/sections/Services.tsx` | Video thumbnail, schedule, address |
| CTA | `components/sections/CallToAction.tsx` | Body copy, testimonial quote + photo |
| Community | `components/sections/Community.tsx` | Platform names, links, follower counts |
| Leadership | `components/sections/Leadership.tsx` | Pastor names, titles, portraits, bios |
| Donate | `components/sections/Donate.tsx` | Tier names, descriptions, giving links |
| Contact | `components/sections/Contact.tsx` | Address, phone, email, office hours |
| Footer | `components/Footer.tsx` | Links, social handles, copyright year |

---

## 🖼️ Replacing Images

All images currently use **Unsplash** and **RandomUser.me** URLs. To replace:

1. Upload your images to a CDN or `/public` folder
2. Update `src` or `href` attributes in the relevant section component
3. If using `/public`, reference as `/your-image.jpg` (no domain needed)
4. External domains must be added to `next.config.ts`:

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "your-cdn.com" },
  ],
},
```

---

## 🔗 Replacing Links

- **Giving / Donate**: Replace `href="#"` in `Donate.tsx` with your Tithe.ly, Stripe, or PayPal link
- **Social media**: Update all `href="#"` in `Community.tsx` and `Footer.tsx`
- **Google Maps**: Replace the map link in `Contact.tsx` with your actual Google Maps embed or `<iframe>`
- **YouTube / Livestream**: Replace the video block in `Services.tsx` with an actual `<iframe>` embed

---

## ⚡ Performance Notes

- All images use `loading="lazy"` for non-critical sections
- Fonts load with `display: swap` to prevent FOIT
- Animations use `once: true` — they only play on first scroll into view
- Framer Motion animations use `will-change-transform` for GPU acceleration
- No unused dependencies bundled

---

## 🔐 Accessibility

- Skip-to-content link (keyboard visible)
- All sections have `aria-labelledby` headings
- Images have descriptive `alt` text
- Interactive elements have `aria-label` attributes
- Focus-visible outlines on all focusable elements
- Semantic HTML5 landmark elements (`header`, `main`, `section`, `footer`, `nav`)

---

## 🔧 Suggested Next Improvements

1. **CMS Integration** — Connect to Sanity, Contentful, or Strapi for editable content
2. **Real Map Embed** — Replace the placeholder map with a Google Maps `<iframe>`
3. **Payment Integration** — Connect Tithe.ly, Stripe, or PayPal for live donations
4. **Authentication** — Add member login area with sermon archives
5. **Events Calendar** — Add a dynamic events section pulling from a calendar API
6. **SEO Enhancements** — Add structured JSON-LD schema for local business/church
7. **Analytics** — Integrate Google Analytics 4 or Plausible
8. **Blog / Sermon Series** — Add dynamic routes `/sermons/[slug]` using Next.js App Router
9. **Multi-Language** — Add i18n support via `next-intl`
10. **PWA** — Add `next-pwa` for offline capability and mobile app-like experience

---

## 📦 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 16.x | Framework, routing, image optimization |
| React | 19.x | UI components |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.4.x | Utility-first styling |
| Framer Motion | 11.x | Animations & scroll effects |
| Lucide React | 0.479+ | Icon library |

---

*Built with ❤️ for Jesus Loves You City Church. All content is placeholder and ready to replace.*
