import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
})
