import { useLocale } from '@/hooks/useLocale'

/** Switches between English and Spanish; shows the code of the language it switches to. */
export function LanguageToggle() {
  const { locale, t, toggleLocale } = useLocale()
  const next = locale === 'en' ? 'es' : 'en'
  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={t.common.switchLanguage}
      title={t.common.switchLanguage}
      lang={next}
      className="grid size-10 place-items-center rounded-full border border-line font-mono text-xs font-semibold text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {t.common.languageButton}
    </button>
  )
}
