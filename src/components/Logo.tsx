import { SITE } from '@/constants/site'

/** Wordmark + summit glyph. Swap the SVG for the final logo when it exists. */
export function Logo() {
  return (
    <a href="/#home" className="group inline-flex items-center gap-2.5" aria-label={`${SITE.name}, home`}>
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <rect width="32" height="32" rx="8" className="fill-fg" />
        <path
          d="M6 24 L13.5 10 L18 18 L20.5 14 L26 24 Z"
          className="fill-olive-400 transition-colors group-hover:fill-olive-300"
        />
      </svg>
      <span className="text-base font-semibold tracking-tight whitespace-nowrap">{SITE.name}</span>
    </a>
  )
}
