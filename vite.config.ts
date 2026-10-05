import { execFileSync } from 'node:child_process'
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

/**
 * Every HTML page: build entry, public path, and the files whose last commit dates its content
 * (used as the sitemap `<lastmod>`, which Google only trusts when it tracks real content changes).
 */
const LEGAL_SOURCES = ['src/constants/legal', 'src/pages/LegalPage.tsx']
const PAGES = [
  { name: 'index', path: '/', sources: ['index.html', 'src', 'public/og-image.png', ...LEGAL_SOURCES.map((p) => `:(exclude)${p}`)] },
  { name: 'privacy', path: '/privacy', sources: ['privacy.html', ...LEGAL_SOURCES] },
  { name: 'terms', path: '/terms', sources: ['terms.html', ...LEGAL_SOURCES] },
  { name: 'cookies', path: '/cookies', sources: ['cookies.html', ...LEGAL_SOURCES] },
] as const

const git = (...args: string[]) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()

/**
 * Date (YYYY-MM-DD) of the last commit touching `paths`, or '' when it cannot be known: no git, or
 * a shallow clone (where every file looks changed in the latest commit, which would fake freshness).
 */
function lastCommitDate(paths: readonly string[]): string {
  try {
    if (git('rev-parse', '--is-shallow-repository') === 'true') return ''
    return git('log', '-1', '--format=%cs', '--', ...paths)
  } catch {
    return ''
  }
}

/**
 * Emits `sitemap.xml` and `robots.txt`. The sitemap needs absolute URLs, so it is only written
 * when `VITE_SITE_URL` is set; URLs match the canonical links (clean paths, no `.html`).
 * `<priority>` and `<changefreq>` are left out on purpose: Google ignores them.
 */
function sitemap(siteUrl: string): Plugin {
  return {
    name: 'atelier:sitemap',
    apply: 'build',
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /']
      if (siteUrl) {
        const urls = PAGES.map(({ path, sources }) => {
          const lastmod = lastCommitDate(sources)
          return [`  <url>`, `    <loc>${escapeAttr(siteUrl + path)}</loc>`, lastmod && `    <lastmod>${lastmod}</lastmod>`, `  </url>`]
            .filter(Boolean)
            .join('\n')
        })
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
        })
        robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
      }
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.join('\n')}\n` })
    },
  }
}

export default defineConfig(({ mode }) => {
  const { env, errors } = parseSiteEnv(loadEnv(mode, process.cwd(), 'VITE_'))

  return {
    plugins: [react(), tailwindcss(), validateEnv(errors), shareMeta(env.siteUrl), sitemap(env.siteUrl)],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      rollupOptions: {
        // Multi-page build: the landing page plus one standalone page per legal document (PAGES).
        input: Object.fromEntries(PAGES.map(({ name }) => [name, fileURLToPath(new URL(`./${name}.html`, import.meta.url))])),
      },
    },
  }
})
