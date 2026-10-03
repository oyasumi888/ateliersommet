# Atelier Sommet — Marketing Site Documentation

Single-page marketing site for a software development & technical marketing agency
(high-conversion web, technical SEO & analytics, bespoke software/ERP).
Built to be fast, accessible, typed end-to-end, and easy to iterate on before and after launch.

> The agency name "Atelier Sommet" comes from the repository name. Every brand string lives in
> `src/constants/site.ts`, so renaming is a one-file change.

---

## 1. Project overview & architecture

### Tech stack

| Concern    | Choice                                                           |
| ---------- | ---------------------------------------------------------------- |
| Build tool | Vite 8 (`@vitejs/plugin-react`)                                  |
| UI         | React 19 + TypeScript 6 (strict mode)                            |
| Styling    | Tailwind CSS 4 via `@tailwindcss/vite`, configured in CSS        |
| Icons      | `lucide-react`                                                   |
| Fonts      | Self-hosted Inter Variable + JetBrains Mono Variable (Fontsource) |
| Linting    | ESLint 10 flat config + `typescript-eslint` + React Hooks rules  |

There are no runtime dependencies beyond React, React DOM, and Lucide. Theming and class
merging are small in-house modules, which keeps the JS bundle around 86 kB gzipped.

### Folder structure

```
.
├── index.html              # HTML shell: meta/SEO tags, favicon, pre-paint theme script
├── public/
│   └── favicon.svg         # Summit glyph (olive on ink)
├── src/
│   ├── main.tsx            # Entry: fonts, global CSS, <App/>
│   ├── env.d.ts            # Types for the VITE_* environment variables
│   ├── App.tsx             # Page composition: skip link, Navbar, sections, Footer
│   ├── index.css           # Tailwind import + ALL design tokens (palette, semantic theme vars)
│   ├── components/         # Reusable, content-agnostic UI building blocks
│   │   ├── Button.tsx          # primary / secondary / ghost; renders <a> when given href
│   │   ├── Container.tsx       # max-width + gutters
│   │   ├── Logo.tsx            # SVG mark + wordmark
│   │   ├── Navbar.tsx          # sticky header, active-section highlight, mobile menu
│   │   ├── Section.tsx         # <section> wrapper with anchor id + vertical rhythm
│   │   ├── SectionHeading.tsx  # eyebrow / title / description
│   │   ├── ThemeProvider.tsx   # React context provider for the site theme
│   │   └── ThemeToggle.tsx     # dark/light icon button
│   ├── sections/           # One file per page section (compose components + constants)
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── CapabilityDemo.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── constants/          # ALL copy & mock data. Edit content here, not in JSX.
│   │   ├── services.ts         # SERVICES[] + getServiceById()
│   │   ├── content.ts          # HERO, ABOUT, PRINCIPLES, STATS, TEAM, TESTIMONIALS
│   │   └── site.ts             # SITE config, CONTACT (from env), NAV_LINKS, CONTACT_DETAILS, LEGAL_LINKS
│   ├── types/
│   │   └── index.ts        # Service, TeamMember, Testimonial, ContactInfo, ...
│   ├── hooks/
│   │   ├── useTheme.ts         # theme state, persistence, context consumer
│   │   └── useActiveSection.ts # IntersectionObserver-driven nav highlighting
│   └── lib/
│       └── cn.ts               # className joiner
├── .env.example            # documented environment variables
├── eslint.config.js
├── tsconfig*.json          # project references: app (src) + node (vite.config.ts)
└── vite.config.ts          # React + Tailwind plugins, "@/..." → src alias
```

### How the pieces fit together

```
constants/*  ──(typed by types/*)──▶  sections/*  ──▶  App.tsx
                                         │
                       components/* ◀────┤  (presentational building blocks)
                       hooks/*, lib/* ◀──┘  (state + logic, no markup)
index.css design tokens ──▶ Tailwind utilities used everywhere
```

- **Content is data.** Sections never hard-code copy; they render typed objects from `src/constants`.
  Changing text, services, team members, or testimonials never requires touching JSX.
- **Frontend only.** The site is fully static: no forms, no API calls, no server. Contact
  details are read from `VITE_CONTACT_*` env vars at build time (see "Contact details" below).
- **Path alias.** `@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.app.json`).

---

## 2. Color palette & design tokens

Tailwind v4 is configured **in CSS**, not in a `tailwind.config.js`. Every variable declared
inside `@theme { … }` in `src/index.css` generates utilities automatically
(e.g. `--color-olive-600` → `bg-olive-600`, `text-olive-600`, `border-olive-600`, `ring-olive-600/30`).

### Brand palette

| Token                | Hex       | Role                                                 |
| -------------------- | --------- | ---------------------------------------------------- |
| `olive-50` … `olive-950` | —     | Full olive scale for tints, hovers, and accents      |
| **`olive-600`**      | `#556B2F` | **Primary brand olive**: solid buttons, active states |
| `olive-400`          | `#95AA5A` | Accent text/icons on dark backgrounds (contrast)     |
| `olive-700`          | `#445626` | Primary button hover                                 |
| `ink-50` … `ink-950` | —         | Neutral black/grey scale                             |
| **`ink-950`**        | `#0F0F0F` | **Dark base UI** background                          |
| **`paper`**          | `#FAFAFA` | **Light neutral**: light-theme background, text on dark |

### Semantic tokens (use these in components)

Components should almost always use semantic utilities, so they theme automatically:

| Utility                    | Dark theme (default) | Light theme   | Use for                         |
| -------------------------- | -------------------- | ------------- | ------------------------------- |
| `bg-bg`                    | ink-950              | paper         | page background                 |
| `bg-surface`               | ink-900              | white         | cards, panels                   |
| `bg-surface-2`             | ink-800              | ink-50        | nested surfaces, tracks         |
| `text-fg`                  | paper                | ink-950       | primary text                    |
| `text-muted`               | ink-300              | ink-500       | secondary text                  |
| `border-line`              | paper @ 10%          | ink-950 @ 10% | borders, dividers               |
| `text-accent` / `bg-accent`| olive-400            | olive-600     | accent text, icons, highlights  |
| `bg-accent-strong`         | olive-600            | olive-600     | solid CTA backgrounds           |
| `bg-accent-soft`           | olive-500 @ 18%      | olive-500 @ 14% | selected/tinted backgrounds   |

The values are declared under `:root, [data-theme='dark']` and `[data-theme='light']` in
`index.css`, and exposed to Tailwind via `@theme inline`.

### Theme switching

- `<html data-theme="dark|light">` drives the tokens. A custom `dark:` variant targets `[data-theme='dark']`.
- `useTheme()` (via `ThemeProvider`) sets the attribute, updates `<meta name="theme-color">`,
  and persists the choice to `localStorage`.
- An inline script in `index.html` applies the saved theme **before first paint** (no flash).
- First visit: follows the OS `prefers-color-scheme`, falling back to dark.

### Other tokens

- `--font-sans` (Inter Variable), `--font-mono` (JetBrains Mono Variable)
- `--radius-card` (1.25rem): large card radius, used as `rounded-[var(--radius-card)]`
- Animations: `animate-fade-up`, `animate-float`, `animate-pulse-soft`
  (all disabled under `prefers-reduced-motion`)
- `.bg-grid`: subtle grid backdrop utility

To **change the brand color**, edit the `--color-olive-*` values in `index.css`. Everything
(buttons, accents, focus rings, selection color, demo) follows automatically.

---

## 3. Components & sections

### Sections (`src/sections`)

| Section              | Anchor      | What it does                                                                                                                                                                 |
| -------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero**             | `#home`     | Headline (last sentence highlighted in olive), sub-headline, primary + secondary CTA, trust line. An interactive browser mock-up tilts toward the pointer, with floating metric cards. |
| **Services**         | `#services` | Accessible vertical **tabs** (WAI-ARIA pattern: arrow keys, Home/End) for the 3 services. Each panel shows summary, headline metric, features, deliverables, typical stack, and a CTA. |
| **CapabilityDemo**   | `#demo`     | "Proof of work" with two labs: **Theme lab** (live site theme switch, accent token swatches, corner radius, generated CSS snippet, live mini-site preview) and **Performance lab** (toggle optimizations to see LCP / TBT / CLS / page weight and an animated score ring react). |
| **About**            | `#about`    | Philosophy copy, stats grid, 4 working principles, team cards (initials fallback for avatars), testimonials linked to services.                                              |
| **Contact**          | `#contact`  | Static contact card (name, email, phone, location, response time) plus "Email us" (pre-filled `mailto:`), "Book a call" or "Call us" buttons. Values come from env vars; unset ones are hidden. |
| **Footer**           | —           | Logo/tagline, navigation, services, legal placeholder links, copyright, back-to-top.                                                                                        |

### Accessibility baseline

- Skip-to-content link, semantic landmarks (`header`, `nav`, `main`, `section[aria-labelledby]`, `footer`)
- Visible `:focus-visible` outlines in the accent color
- Tabs, radio-group and toggle patterns with correct ARIA roles/states
- Decorative graphics are `aria-hidden`; `prefers-reduced-motion` respected
- Mobile menu: `aria-expanded`/`aria-controls`, closes on Escape and on link click

### Contact details

The site has no backend, so the contact section only lists channels. They are set with env vars
(copy `.env.example` to `.env.local` locally, or add them in the hosting dashboard):

| Variable                   | Shown as                                  |
| -------------------------- | ----------------------------------------- |
| `VITE_CONTACT_NAME`        | "Contact" row (person or team name)       |
| `VITE_CONTACT_EMAIL`       | "Email" row + "Email us" button           |
| `VITE_CONTACT_PHONE`       | "Phone" row (+ "Call us" if no booking URL) |
| `VITE_CONTACT_ADDRESS`     | "Location" row                            |
| `VITE_CONTACT_BOOKING_URL` | "Book a call" button (opens in a new tab) |

Empty variables are simply not rendered. Vite inlines these values into the JavaScript bundle at
build time: this keeps them out of the git repository, but they are public on the live site
(they are displayed on it). Never put secrets in a `VITE_*` variable. Changing a value requires a
rebuild / redeploy.

---

## 4. Running, building & extending

### Commands

```bash
npm install         # install dependencies (Node 20.19+ / 22.12+ required by Vite 8)
npm run dev         # dev server with HMR → http://localhost:5173
npm run build       # type-check (tsc -b) + production build → dist/
npm run preview     # serve the production build locally
npm run lint        # ESLint
npm run typecheck   # TypeScript only
```

Environment variables: copy `.env.example` to `.env.local` and fill in values. Only variables
prefixed with `VITE_` are exposed to the client.

### Adding a new service

1. Add the id to the union in `src/types/index.ts`:
   ```ts
   export type ServiceId = 'web' | 'seo' | 'software' | 'ecommerce'
   ```
2. Append an object to `SERVICES` in `src/constants/services.ts` (TypeScript will flag any missing fields):
   ```ts
   {
     id: 'ecommerce',
     shortTitle: 'E-commerce',
     title: 'E-commerce Engineering',
     summary: '…',
     icon: ShoppingCart,              // any lucide-react icon
     features: [{ title: '…', description: '…' }],
     deliverables: ['…'],
     stack: ['Shopify Hydrogen', '…'],
     metric: { value: '+24%', label: 'avg. checkout conversion' },
   }
   ```
3. Done. The Services tabs and the footer list update automatically.

### Modifying content

| To change…                          | Edit                                             |
| ----------------------------------- | ------------------------------------------------ |
| Company name, URL, response time    | `SITE` in `src/constants/site.ts`                |
| Contact name, email, phone, address | `VITE_CONTACT_*` in `.env.local` / host env vars |
| Nav links                           | `NAV_LINKS` in `src/constants/site.ts` (`href` must be a `SectionId`) |
| Hero headline / CTAs                | `HERO` in `src/constants/content.ts`             |
| About copy, principles, stats       | `ABOUT`, `PRINCIPLES`, `STATS` in `content.ts`   |
| Team                                | `TEAM` in `content.ts` (photos go in `public/team/`, then set `avatarUrl: '/team/name.jpg'`) |
| Testimonials                        | `TESTIMONIALS` in `content.ts`                   |
| Colors / fonts / radii              | `src/index.css`                                  |
| Page title & meta description       | `index.html`                                     |

### Adding a new section

1. Add the id to `SectionId` in `src/types/index.ts`.
2. Create `src/sections/MySection.tsx` using `<Section id="…" labelledBy="…">` and `<SectionHeading>`.
3. Put its content in `src/constants/content.ts` (with a type in `src/types` if it is structured).
4. Render it in `App.tsx`. Optionally add it to `NAV_LINKS`; nav highlighting picks it up automatically.

### Conventions

- Use semantic color utilities (`bg-surface`, `text-muted`, `text-accent`), not raw hex values.
- Keep sections thin. Repeated UI goes to `components/`, logic to `hooks/` or `lib/`.
- Don't put `hidden`/`flex` display overrides on `<Button>` via `className` (its base class is
  `inline-flex`). Wrap it in an element that controls visibility instead.

---

## 5. Pre-launch checklist

### Domain & hosting
- [ ] Choose a host (Vercel, Netlify, Cloudflare Pages). Build command `npm run build`, output dir `dist`.
- [ ] Attach the custom domain, configure DNS (apex `A`/`ALIAS` + `www` `CNAME`), and pick a canonical (apex vs `www`) with a 301 redirect for the other.
- [ ] Confirm HTTPS/TLS is issued and HSTS is enabled.
- [ ] Set `SITE.url` in `src/constants/site.ts` to the production URL.

### Contact details
- [ ] Set the `VITE_CONTACT_*` variables in the host's environment variables and redeploy.
- [ ] Check the "Email us" link opens a pre-filled email and the phone link dials correctly on mobile.

### Content
- [ ] Replace placeholder team members, add photos.
- [ ] Replace placeholder testimonials with real, approved quotes (or remove them until available).
- [ ] Verify every number in `STATS` and service `metric`s is true and defensible.
- [ ] Final logo: replace the SVG in `Logo.tsx` and `public/favicon.svg`. Add `apple-touch-icon` and a web manifest.

### Legal & privacy
- [ ] Write and publish the Privacy Policy, Terms and Cookie Policy (update `LEGAL_LINKS`; currently `#` placeholders).
- [ ] Add a cookie-consent banner if analytics or marketing tags set cookies (GDPR / ePrivacy), with Consent Mode v2 for Google tags.
- [ ] Add company legal details (registered name, address, tax ID) to the footer if required in your jurisdiction.

### SEO & analytics
- [ ] Add `<link rel="canonical">`, `og:url`, `og:image` (1200×630) and Twitter card tags in `index.html`.
- [ ] Add `robots.txt` and `sitemap.xml` to `public/`.
- [ ] Add `Organization` / `ProfessionalService` JSON-LD structured data.
- [ ] Set up GA4 (or Plausible/Fathom) and track clicks on the email / booking links as leads.
- [ ] Verify the domain in Google Search Console and Bing Webmaster Tools, then submit the sitemap.

### Quality gates
- [ ] Run Lighthouse / PageSpeed Insights on the production URL (target 95+ in all categories).
- [ ] Test on real iOS Safari and Android Chrome, plus keyboard-only and screen-reader passes.
- [ ] Add a CI workflow (GitHub Actions) running `npm ci && npm run lint && npm run build` on PRs.
- [ ] Optional: add Vitest + Testing Library. Add uptime monitoring.
- [ ] Add a custom 404 page / SPA fallback if you later add client-side routes.
