import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { parseSiteEnv } from './src/lib/env.ts'

/** Fails the production build when a `VITE_*` value is invalid, instead of shipping it. */
function validateEnv(errors: string[]): Plugin {
  return {
    name: 'atelier:validate-env',
    apply: 'build',
    buildStart() {
      if (errors.length) this.error(`Invalid environment variables (see .env.example):\n- ${errors.join('\n- ')}`)
    },
  }
}

const SITE_NAME = 'Atelier Sommet'
const OG_IMAGE = { path: '/og-image.png', width: 1200, height: 630, alt: 'Atelier Sommet: websites that convert, software that scales.' }

const decode = (value: string) =>
  value.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Adds canonical, Open Graph and Twitter card tags to every page, reusing each page's <title>
 * and meta description. Crawlers that build link previews do not run JavaScript, so the tags must
 * be in the static HTML. URLs are absolute once `VITE_SITE_URL` is set (required by most platforms).
 */
function shareMeta(siteUrl: string): Plugin {
  return {
    name: 'atelier:share-meta',
    configResolved(config) {
      if (config.command === 'build' && !siteUrl) {
        config.logger.warn('VITE_SITE_URL is not set: share cards and canonical links will use relative URLs.')
      }
    },
    transformIndexHtml(html, ctx) {
      const page = ctx.path.replace(/^\/|\.html$/g, '')
      const path = page === 'index' ? '/' : `/${page}`
      const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? SITE_NAME)
      const description = decode(html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1] ?? '')
      const image = `${siteUrl}${OG_IMAGE.path}`

      const meta = (attr: 'name' | 'property', key: string, content: string | number) =>
        `<meta ${attr}="${key}" content="${escapeAttr(String(content))}" />`
      const tags = [
        siteUrl && `<link rel="canonical" href="${escapeAttr(siteUrl + path)}" />`,
        meta('property', 'og:type', 'website'),
        meta('property', 'og:site_name', SITE_NAME),
        meta('property', 'og:title', title),
        meta('property', 'og:description', description),
        siteUrl && meta('property', 'og:url', siteUrl + path),
        meta('property', 'og:image', image),
        meta('property', 'og:image:type', 'image/png'),
        meta('property', 'og:image:width', OG_IMAGE.width),
        meta('property', 'og:image:height', OG_IMAGE.height),
        meta('property', 'og:image:alt', OG_IMAGE.alt),
        meta('property', 'og:locale', 'en_US'),
        meta('property', 'og:locale:alternate', 'es_MX'),
        meta('name', 'twitter:card', 'summary_large_image'),
        meta('name', 'twitter:title', title),
        meta('name', 'twitter:description', description),
        meta('name', 'twitter:image', image),
        meta('name', 'twitter:image:alt', OG_IMAGE.alt),
      ].filter(Boolean)

      return html.replace('</head>', `    ${tags.join('\n    ')}\n  </head>`)
    },
  }
}

export default defineConfig(({ mode }) => {
  const { env, errors } = parseSiteEnv(loadEnv(mode, process.cwd(), 'VITE_'))

  return {
    plugins: [react(), tailwindcss(), validateEnv(errors), shareMeta(env.siteUrl)],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      rollupOptions: {
        // Multi-page build: the landing page plus one standalone page per legal document.
        input: Object.fromEntries(
          ['index', 'privacy', 'terms', 'cookies'].map((name) => [name, fileURLToPath(new URL(`./${name}.html`, import.meta.url))]),
        ),
      },
    },
  }
})
