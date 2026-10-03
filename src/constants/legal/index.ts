import type { Locale } from '@/types'
import { legalEn } from './en'
import { legalEs } from './es'
import type { LegalContent } from './shared'

export { ENTITY as LEGAL_ENTITY } from './shared'

export const LEGAL: Record<Locale, LegalContent> = { en: legalEn, es: legalEs }
