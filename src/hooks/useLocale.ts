import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { DICTIONARIES } from '@/constants/i18n'
import type { Dictionary, Locale } from '@/types'

export interface LocaleContextValue {
  locale: Locale
  /** Every translated string for the current locale. */
  t: Dictionary
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const STORAGE_KEY = 'lang'

export const LocaleContext = createContext<LocaleContextValue | null>(null)

function readInitialLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'es') return saved
  } catch {
    /* storage unavailable */
  }
  return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en'
}

/**
 * Language state owned by <LocaleProvider>. Defaults to the browser language, is written
 * to `<html lang>` and persisted to localStorage.
 */
export function useLocaleState(): LocaleContextValue {
  const [locale, setLocaleState] = useState<Locale>(readInitialLocale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable (private mode) — language still applies for this visit */
    }
  }, [])

  const toggleLocale = useCallback(() => setLocale(locale === 'en' ? 'es' : 'en'), [locale, setLocale])

  return { locale, t: DICTIONARIES[locale], setLocale, toggleLocale }
}

/** Read and change the site language from any component under <LocaleProvider>. */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>')
  return ctx
}

/** Sets the document title and meta description for the current page. */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
