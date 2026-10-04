/**
 * Validation for the `VITE_*` build-time variables. Every value is untrusted input: it ends up
 * in link targets (`href`), the page text and the share-card meta tags.
 *
 * Pure and dependency-free so both the app (`constants/site.ts`) and the build
 * (`vite.config.ts`, which fails the build on invalid values) use the same rules.
 */

export interface SiteEnv {
  siteUrl: string
  contactName: string
  contactEmail: string
  contactPhone: string
  contactAddress: string
  bookingUrl: string
  legalEntity: string
  legalJurisdiction: string
}

/** `import.meta.env` or Vite's `loadEnv()` result; non-string values are ignored. */
export type RawEnv = Record<string, unknown>

// Code-point ranges never legitimate in this copy: C0/C1 control characters, zero-width
// characters, bidi overrides/isolates and the byte-order mark.
const UNSAFE_RANGES: readonly [number, number][] = [
  [0x00, 0x1f],
  [0x7f, 0x9f],
  [0x200b, 0x200f],
  [0x202a, 0x202e],
  [0x2066, 0x2069],
  [0xfeff, 0xfeff],
]

const isSafeChar = (char: string) => {
  const code = char.codePointAt(0) ?? 0
  return !UNSAFE_RANGES.some(([from, to]) => code >= from && code <= to)
}

/** Trims, strips invisible/control characters and collapses whitespace. */
export function cleanText(value: string | undefined, maxLength = 120): string {
  return Array.from(value ?? '').filter(isSafeChar).join('').replace(/\s+/g, ' ').trim().slice(0, maxLength)
}

const EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/
const PHONE = /^\+?[\d\s().-]{6,24}$/

/** Absolute https URL without credentials, or null. */
function httpsUrl(value: string): URL | null {
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' || url.username || url.password) return null
    return url
  } catch {
    return null
  }
}

type Rule = (value: string) => string | null

const rules: Record<keyof SiteEnv, [envKey: string, rule: Rule]> = {
  // Origin only: it prefixes canonical and share-card URLs.
  siteUrl: [
    'VITE_SITE_URL',
    (v) => {
      const url = httpsUrl(v)
      return url && url.pathname === '/' && !url.search && !url.hash ? url.origin : null
    },
  ],
  contactName: ['VITE_CONTACT_NAME', (v) => v],
  contactEmail: ['VITE_CONTACT_EMAIL', (v) => (v.length <= 254 && EMAIL.test(v) ? v : null)],
  contactPhone: ['VITE_CONTACT_PHONE', (v) => (PHONE.test(v) ? v : null)],
  contactAddress: ['VITE_CONTACT_ADDRESS', (v) => v],
  bookingUrl: ['VITE_CONTACT_BOOKING_URL', (v) => httpsUrl(v)?.href ?? null],
  legalEntity: ['VITE_LEGAL_ENTITY', (v) => v],
  legalJurisdiction: ['VITE_LEGAL_JURISDICTION', (v) => v],
}

/**
 * Cleans and validates every variable. Invalid values are replaced by '' (so the UI hides them)
 * and reported in `errors`; empty values are fine.
 */
export function parseSiteEnv(raw: RawEnv): { env: SiteEnv; errors: string[] } {
  const env = {} as SiteEnv
  const errors: string[] = []
  for (const [field, [key, rule]] of Object.entries(rules) as [keyof SiteEnv, [string, Rule]][]) {
    const input = raw[key]
    const value = cleanText(typeof input === 'string' ? input : '', field === 'bookingUrl' || field === 'siteUrl' ? 500 : 120)
    const result = value ? rule(value) : ''
    if (result === null) errors.push(`${key} is invalid: ${JSON.stringify(value)}`)
    env[field] = result ?? ''
  }
  return { env, errors }
}
