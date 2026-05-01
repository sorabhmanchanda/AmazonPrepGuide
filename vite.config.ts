import path from 'node:path'
import { copyFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

/** GitHub Pages project site: `/repo-name/`; root site: `/` */
function normalizeBase(raw: string | undefined): string {
  if (!raw || raw === '/') return '/'
  let b = raw.trim()
  if (!b.startsWith('/')) b = `/${b}`
  if (!b.endsWith('/')) b = `${b}/`
  return b
}

/** Copy `index.html` → `404.html` so client routes work on GitHub Pages after refresh. */
function ghPagesSpaFallback(): Plugin {
  return {
    name: 'gh-pages-spa-fallback',
    closeBundle() {
      if (process.env.GITHUB_PAGES !== '1') return
      const out = path.resolve(__dirname, 'dist')
      const index = path.join(out, 'index.html')
      const notFound = path.join(out, '404.html')
      copyFileSync(index, notFound)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(() => {
  const base = normalizeBase(process.env.BASE_PATH)

  return {
    base,
    plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'content/prep-guide.md'],
      manifest: {
        name: 'AMXL L6 Prep',
        short_name: 'L6 Prep',
        description: 'Amazon L6 AMXL JP interview prep — sections, STAR stories, quizzes, notes.',
        theme_color: '#0a0f16',
        background_color: '#0a0f16',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: './',
        scope: './',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg,woff2,md}'],
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
    ghPagesSpaFallback(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}
})
