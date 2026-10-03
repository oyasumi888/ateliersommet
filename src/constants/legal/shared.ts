import type { LegalDocument, LegalDocumentId } from '@/types'
import { SITE } from '../site'

const env = (value: string | undefined) => value?.trim() ?? ''

/**
 * Legal identity used in the policies. Set `VITE_LEGAL_ENTITY` to the registered business name
 * and `VITE_LEGAL_JURISDICTION` to the governing law (e.g. "the State of Jalisco, Mexico").
 * The jurisdiction is inserted as written in both languages, so a place name works best.
 */
export const ENTITY = env(import.meta.env.VITE_LEGAL_ENTITY) || SITE.name
export const JURISDICTION_SET = env(import.meta.env.VITE_LEGAL_JURISDICTION)
export const JURISDICTION = JURISDICTION_SET || `the country in which ${ENTITY} is established`
export const WEBSITE = SITE.url.replace(/^https?:\/\//, '')

export interface LegalContent {
  /** Bump this whenever a policy changes. */
  lastUpdated: string
  documents: Record<LegalDocumentId, LegalDocument>
}
