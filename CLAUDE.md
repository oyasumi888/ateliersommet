# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page marketing site for the Atelier Sommet agency. Vite 8 + React 19 + TypeScript 6 (strict) + Tailwind CSS 4 + lucide-react. Full documentation lives in `DOCUMENTATION.md`.

## Commands

- `npm run dev`: dev server (http://localhost:5173)
- `npm run build`: `tsc -b` type-check, then a production build to `dist/`
- `npm run lint`: ESLint (flat config, `eslint.config.js`)
- `npm run typecheck`: TypeScript only
- No test runner is set up yet.

## Architecture

- `src/constants/`: all copy and mock data (`services.ts`, `content.ts`, `site.ts`), typed by `src/types/index.ts`. Edit content here, not in JSX.
- `src/sections/`: one component per page section, composed in `src/App.tsx`.
- `src/components/`: reusable presentational pieces (Button, Section, FormField, Navbar...).
- `src/hooks/` and `src/lib/`: state and logic (theme context, contact form state machine, pure validators, form submission).
- `src/index.css` holds every design token. Tailwind v4 is configured in CSS via `@theme` (there is no `tailwind.config.js`). Components use semantic utilities (`bg-bg`, `bg-surface`, `text-fg`, `text-muted`, `border-line`, `text-accent`, `bg-accent-strong`) that switch with `<html data-theme>`.
- The `@/` import alias maps to `src/`.
- The contact form POSTs to `VITE_CONTACT_ENDPOINT`, or uses a mock when it is unset (see `.env.example`).
