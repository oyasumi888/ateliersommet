import type { Dictionary, Locale } from '@/types'
import { en } from './en'
import { es } from './es'

export const LOCALES: readonly Locale[] = ['en', 'es']

export const DICTIONARIES: Record<Locale, Dictionary> = { en, es }
