# Atelier Sommet — Marketing Site Documentation

Single-page marketing site for a software development & technical marketing agency
(high-conversion web, technical SEO & analytics, bespoke software/ERP).
Built to be fast, accessible, typed end-to-end, and easy to iterate on before and after launch.

> The agency name "Atelier Sommet" comes from the repository name. Every brand string lives in
> `src/constants/site.ts`, so renaming is a one-file change. All visible copy is translated
> (English / Spanish) in `src/constants/i18n/`.

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
├── privacy.html, terms.html, cookies.html  # standalone legal pages (entry: src/legal.tsx)
├── public/
│   └── favicon.svg         # Summit glyph (olive on ink)
├── src/
│   ├── main.tsx            # Entry: fonts, global CSS, <App/>
│   ├── legal.tsx           # Entry for the legal pages: renders <LegalPage id={data-page}/>
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
│   │   ├── ThemeToggle.tsx     # dark/light icon button
│   │   ├── LanguageToggle.tsx  # EN/ES button next to the theme toggle
│   │   └── LocaleProvider.tsx  # React context provider for the site language
│   ├── pages/
│   │   └── LegalPage.tsx       # layout for /privacy, /terms, /cookies
│   ├── sections/           # One file per page section (compose components + constants)
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── CapabilityDemo.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── constants/          # ALL copy & mock data. Edit content here, not in JSX.
│   │   ├── i18n/               # en.ts / es.ts: every visible string, one Dictionary per language
│   │   ├── legal/              # en.ts / es.ts: policy text; shared.ts: entity & jurisdiction from env
│   │   ├── services.ts         # service ids, icons, stacks + getServices(t)
│   │   ├── content.ts          # principle icons + getPrinciples(t)
│   │   └── site.ts             # SITE, CONTACT (from env), getNavLinks / getContactDetails / getLegalLinks
│   ├── types/
│   │   └── index.ts        # Service, TeamMember, Testimonial, ContactInfo, ...
│   ├── hooks/
│   │   ├── useTheme.ts         # theme state, persistence, context consumer
│   │   ├── useLocale.ts        # language state, persistence, useDocumentMeta
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
  details are read from `VITE_CONTACT_*` env vars at build time (see "Contact details" below). The legal pages are standalone HTML pages (see "Legal pages").
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
| **Footer**           | —           | Logo/tagline, navigation, services, links to the legal pages, copyright, back-to-top.                                                                                       |

### Legal pages

`/privacy`, `/terms` and `/cookies` are separate pages, not sections of the landing page. Vite
builds them as extra HTML entry points (`build.rollupOptions.input` in `vite.config.ts`), each with
its own `<title>` and meta description. They share `src/legal.tsx` and `pages/LegalPage.tsx`; the
HTML file picks the document through `data-page` on `#root`.

- Text lives in `src/constants/legal/en.ts` and `es.ts` (one `LegalDocument` per policy: paragraphs, lists, a
  table, or a `{ contact: true }` block that renders the contact details from env vars).
- `VITE_LEGAL_ENTITY` (registered business name) and `VITE_LEGAL_JURISDICTION` (governing law)
  fill in the policies. Contact details reuse `VITE_CONTACT_*`.
- Bump `LEGAL_LAST_UPDATED` whenever a policy changes.
- The policies describe what the site does today: no forms, no analytics, no cookies, only the
  `theme` and `lang` keys in localStorage, hosted on Vercel. If you add analytics, embeds or a form, update
  them (and add a consent banner for any non-essential cookies).
- To add a page: add the id to `LegalDocumentId`, a document to both `legal/en.ts` and `legal/es.ts`, its id to
  `LEGAL_PAGES` in `site.ts` and `legal.links` in the dictionaries, an HTML file copied from `privacy.html` with the new `data-page`, and its name to
  the `input` list in `vite.config.ts`.

### Languages (English / Spanish)

The EN/ES button next to the theme toggle switches the whole site, legal pages included.

- `hooks/useLocale.ts` holds the language: it defaults to the browser language (Spanish if it
  starts with `es`, otherwise English), is saved in localStorage under `lang`, and sets
  `<html lang>`. Components read strings with `const { t } = useLocale()`.
- `constants/i18n/en.ts` and `es.ts` each implement the `Dictionary` type (`src/types/index.ts`),
  so TypeScript fails the build if a translation is missing.
- Language-independent data (ids, icons, tech stacks, hrefs) stays in `services.ts`,
  `content.ts` and `site.ts`; helpers such as `getServices(t)` merge it with the copy.
- The page `<title>` and meta description follow the language (`useDocumentMeta`). The static
  ones in the HTML files are the English fallback for crawlers.
- To add a language: add it to `Locale`, create `i18n/xx.ts` and `legal/xx.ts`, register them in
  `i18n/index.ts` and `legal/index.ts`, and turn the toggle into a menu.

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

### Deploying to Vercel

The repo is ready for Vercel: `vercel.json` pins the framework (Vite), install/build commands,
output directory (`dist`), clean URLs (`/privacy` serves `privacy.html`), long-term caching for
hashed `/assets/*` files, and security headers. `package.json` declares the Node version
(`engines`).

1. In Vercel, **Add New → Project** and import the GitHub repository. The settings are read from
   `vercel.json`, so leave the build options as detected.
2. Under **Settings → Environment Variables**, add the variables from `.env.example`
   (`VITE_SITE_URL`, `VITE_CONTACT_NAME`, `VITE_CONTACT_EMAIL`, `VITE_CONTACT_PHONE`,
   `VITE_CONTACT_ADDRESS`, `VITE_CONTACT_BOOKING_URL`, `VITE_LEGAL_ENTITY`,
   `VITE_LEGAL_JURISDICTION`). Enable them for **Production** and,
   if you want, **Preview**.
3. Set the **Production Branch** to `main` (Settings → Git). Pushes to `main` deploy to
   production; pushes to other branches (e.g. `dev`) get preview URLs.
4. Deploy. After changing any env var, **redeploy**: `VITE_*` values are baked in at build time.
5. Attach your domain under **Settings → Domains**, then set `VITE_SITE_URL` to it and redeploy.

CLI alternative: `npm i -g vercel`, then `vercel link`, `vercel env pull .env.local`
(downloads the variables for local dev) and `vercel --prod`.

### Adding a new service

1. Add the id to the union in `src/types/index.ts`:
   ```ts
   export type ServiceId = 'web' | 'seo' | 'software' | 'ecommerce'
   ```
2. Append the language-independent part to `SERVICE_BASE` in `src/constants/services.ts`:
   ```ts
   { id: 'ecommerce', icon: ShoppingCart, stack: ['Shopify Hydrogen', '…'] }
   ```
3. Add its copy under `services.items` in `src/constants/i18n/en.ts` and `es.ts` (TypeScript
   flags any missing fields or language):
   ```ts
   ecommerce: {
     shortTitle: 'E-commerce',
     title: 'E-commerce Engineering',
     summary: '…',
     features: [{ title: '…', description: '…' }],
     deliverables: ['…'],
     metric: { value: '+24%', label: 'avg. checkout conversion' },
   },
   ```
4. Done. The Services tabs and the footer list update automatically.

### Modifying content

| To change…                          | Edit                                             |
| ----------------------------------- | ------------------------------------------------ |
| Any visible text (both languages)   | `src/constants/i18n/en.ts` and `es.ts`           |
| Company name                        | `SITE` in `src/constants/site.ts`                |
| Production URL                      | `VITE_SITE_URL` env var                          |
| Contact name, email, phone, address | `VITE_CONTACT_*` in `.env.local` / host env vars |
| Nav links                           | `NAV_SECTIONS` in `site.ts` + `nav.links` in the dictionaries |
| Hero, about, stats, testimonials    | `hero` / `about` in the dictionaries             |
| Team                                | `about.members` in the dictionaries (photos go in `public/team/`, then set `avatarUrl: '/team/name.jpg'`) |
| Colors / fonts / radii              | `src/index.css`                                  |
| Page title & meta description       | `meta` in the dictionaries (static fallback in `index.html`) |
| Privacy / Terms / Cookie policies   | `src/constants/legal/en.ts` and `es.ts`          |

### Adding a new section

1. Add the id to `SectionId` in `src/types/index.ts`.
2. Create `src/sections/MySection.tsx` using `<Section id="…" labelledBy="…">` and `<SectionHeading>`.
3. Put its copy in the `Dictionary` type and both `src/constants/i18n` files.
4. Render it in `App.tsx`. Optionally add it to `NAV_SECTIONS` in `site.ts` and `nav.links` in both dictionaries; nav highlighting picks it up automatically.

### Conventions

- Use semantic color utilities (`bg-surface`, `text-muted`, `text-accent`), not raw hex values.
- Keep sections thin. Repeated UI goes to `components/`, logic to `hooks/` or `lib/`.
- Don't put `hidden`/`flex` display overrides on `<Button>` via `className` (its base class is
  `inline-flex`). Wrap it in an element that controls visibility instead.

---

## 5. Pre-launch checklist

### Domain & hosting
- [ ] Import the repo in Vercel and add the env vars (see "Deploying to Vercel").
- [ ] Attach the custom domain, configure DNS (apex `A`/`ALIAS` + `www` `CNAME`), and pick a canonical (apex vs `www`) with a 301 redirect for the other.
- [ ] Confirm HTTPS/TLS is issued and HSTS is enabled.
- [ ] Set `VITE_SITE_URL` to the production URL and redeploy.

### Contact details
- [ ] Set the `VITE_CONTACT_*` variables in the host's environment variables and redeploy.
- [ ] Check the "Email us" link opens a pre-filled email and the phone link dials correctly on mobile.

### Content
- [ ] Replace placeholder team members, add photos.
- [ ] Replace placeholder testimonials with real, approved quotes (or remove them until available).
- [ ] Verify every number in `STATS` and service `metric`s is true and defensible.
- [ ] Final logo: replace the SVG in `Logo.tsx` and `public/favicon.svg`. Add `apple-touch-icon` and a web manifest.

### Legal & privacy
- [ ] Set `VITE_LEGAL_ENTITY` and `VITE_LEGAL_JURISDICTION`, then have a lawyer review `src/constants/legal/` (both languages) for your jurisdiction (in Mexico: the LFPDPPP and its aviso de privacidad requirements).
- [ ] Add a cookie-consent banner if analytics or marketing tags set cookies (GDPR / ePrivacy), with Consent Mode v2 for Google tags, and update the Cookie Policy.
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
