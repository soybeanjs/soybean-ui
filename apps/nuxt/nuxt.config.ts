import { URL, fileURLToPath } from 'node:url';
import { createThemeInitScript } from '@soybeanjs/theme/ssr';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: 'https://r2.soybeanjs.tech/soybeanjs/logo-soybean-ui.svg' }],
      // Applies the persisted theme (from localStorage) to <html> before first
      // paint and mirrors it into a cookie so SSR renders the same theme on the
      // next request — this removes the theme flash on refresh.
      script: [{ innerHTML: createThemeInitScript(), tagPosition: 'head' }]
    }
  },
  devtools: { enabled: true },
  css: ['@soybeanjs/ui/styles.css'],
  modules: ['@nuxt/icon', '@nuxtjs/i18n', '@unocss/nuxt', '@soybeanjs/ui/nuxt'],
  imports: {
    transform: {
      exclude: [/headless\/dist\//]
    }
  },
  i18n: {
    defaultLocale: 'zh-CN',
    locales: [
      { code: 'zh-CN', name: '中文', file: 'zh-CN.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ]
  },
  vite: {
    resolve: {
      tsconfigPaths: true,
      alias: [
        // The UI package is a linked workspace package. Point it (and its
        // internal `@/styles/*` imports) at the sources so the SSR bundle keeps
        // a single UI instance: playground sources already reference the UI
        // sources, and mixing src + dist would duplicate contexts.
        {
          find: /^@soybeanjs\/ui$/,
          replacement: fileURLToPath(new URL('../../packages/ui/src/index.ts', import.meta.url))
        },
        { find: '@', replacement: fileURLToPath(new URL('../../packages/ui/src', import.meta.url)) }
      ]
    },
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit']
    }
  },
  alias: {
    '@docs': fileURLToPath(new URL('../docs/src', import.meta.url))
  }
});
