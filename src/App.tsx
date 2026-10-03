import { LocaleProvider } from '@/components/LocaleProvider'
import { Navbar } from '@/components/Navbar'
import { ThemeProvider } from '@/components/ThemeProvider'
import { useDocumentMeta, useLocale } from '@/hooks/useLocale'
import { About } from '@/sections/About'
import { CapabilityDemo } from '@/sections/CapabilityDemo'
import { Contact } from '@/sections/Contact'
import { Footer } from '@/sections/Footer'
import { Hero } from '@/sections/Hero'
import { Services } from '@/sections/Services'

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <HomePage />
      </LocaleProvider>
    </ThemeProvider>
  )
}

function HomePage() {
  const { t } = useLocale()
  useDocumentMeta(t.meta.title, t.meta.description)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent-strong focus:px-4 focus:py-2 focus:text-paper"
      >
        {t.common.skipToContent}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <CapabilityDemo />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
