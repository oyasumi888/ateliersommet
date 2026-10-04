import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import { LegalPage } from './pages/LegalPage'
import type { LegalDocumentId } from './types'

/** Entry for the standalone legal pages; each HTML file sets `data-page` on #root. */
const PAGES: readonly LegalDocumentId[] = ['privacy', 'terms', 'cookies']

const root = document.getElementById('root')!
const requested = root.dataset.page
const page = PAGES.find((p) => p === requested) ?? 'privacy'

createRoot(root).render(
  <StrictMode>
    <LegalPage id={page} />
  </StrictMode>,
)
