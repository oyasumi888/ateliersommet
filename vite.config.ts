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

export default defineConfig(({ mode }) => {
  const { errors } = parseSiteEnv(loadEnv(mode, process.cwd(), 'VITE_'))

  return {
    plugins: [react(), tailwindcss(), validateEnv(errors)],
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
