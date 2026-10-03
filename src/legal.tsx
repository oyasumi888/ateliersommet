import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'
import './index.css'
import { LegalPage } from './pages/LegalPage'
import type { LegalDocumentId } from './types'

/** Entry for the standalone legal pages; each HTML file sets `data-page` on #root. */
const root = document.getElementById('root')!
const page = root.dataset.page as LegalDocumentId

createRoot(root).render(
  <StrictMode>
    <LegalPage id={page} />
  </StrictMode>,
)
