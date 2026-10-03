import { Code2, Compass, Handshake, ShieldCheck, type LucideIcon } from 'lucide-react'
import type { Dictionary, Principle, PrincipleId } from '@/types'

/**
 * Page copy (hero, about, stats, team, testimonials...) lives in `constants/i18n/*.ts`.
 * This file holds the language-independent parts.
 */
const PRINCIPLE_ICONS: Record<PrincipleId, LucideIcon> = {
  measure: Compass,
  code: Code2,
  secure: ShieldCheck,
  ownership: Handshake,
}

export const getPrinciples = (t: Dictionary): Principle[] =>
  (Object.keys(PRINCIPLE_ICONS) as PrincipleId[]).map((id) => ({ ...t.about.principles[id], icon: PRINCIPLE_ICONS[id] }))
