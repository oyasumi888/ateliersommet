# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page marketing site for the Atelier Sommet agency. Vite 8 + React 19 + TypeScript 6 (strict) + Tailwind CSS 4 + lucide-react. Full documentation lives in `DOCUMENTATION.md`.

## Commands

- `npm run dev`: dev server (http://localhost:5173)
- `npm run build`: `tsc -b` type-check, then a production build to `dist/`
- `npm run lint`: ESLint (flat config, `eslint.config.js`)
- `npm run typecheck`: TypeScript only
- `npm run preview`: serve the built `dist/` locally
- No test runner is set up yet.

## Architecture

- `src/constants/`: all copy and mock data, typed by `src/types/index.ts`. Edit content here, not in JSX.
- Bilingual (EN/ES): every visible string lives in `src/constants/i18n/en.ts` and `es.ts` (both implement `Dictionary`; add new strings to both). Components read them with `const { t } = useLocale()`. Policy text is in `src/constants/legal/en.ts` and `es.ts`. Language-independent data (ids, icons, stacks) stays in `services.ts`, `content.ts`, `site.ts`.
- `src/sections/`: one component per page section, composed in `src/App.tsx`.
- `src/components/`: reusable presentational pieces (Button, Section, Navbar, ThemeToggle, LanguageToggle...).
- `src/hooks/` and `src/lib/`: state and logic (theme and locale contexts, active-section tracking, class joiner).
- `src/index.css` holds every design token. Tailwind v4 is configured in CSS via `@theme` (there is no `tailwind.config.js`). Components use semantic utilities (`bg-bg`, `bg-surface`, `text-fg`, `text-muted`, `border-line`, `text-accent`, `bg-accent-strong`) that switch with `<html data-theme>`.
- The `@/` import alias maps to `src/`.
- Frontend only (no backend). Contact details come from `VITE_CONTACT_*` env vars read in `src/constants/site.ts` (see `.env.example`); unset ones are hidden.
- Multi-page build: `index.html` (landing) plus `privacy.html`, `terms.html`, `cookies.html` (entry `src/legal.tsx`, layout `src/pages/LegalPage.tsx`, text in `src/constants/legal/`), listed in `vite.config.ts` → `build.rollupOptions.input`. Nav links are root-relative (`/#services`) so they work from those pages.
