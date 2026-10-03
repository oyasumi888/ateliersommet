/// <reference types="vite/client" />

/**
 * Build-time environment variables (see `.env.example`). Vite inlines every `VITE_*` value
 * into the client bundle, so never put secrets here.
 */
interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_CONTACT_NAME?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_CONTACT_PHONE?: string
  readonly VITE_CONTACT_ADDRESS?: string
  readonly VITE_CONTACT_BOOKING_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
