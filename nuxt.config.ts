import { URL, fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-12',
  srcDir: './docs',
  ignore: ['**/extensions/**', '**/uploads/**', '**/database/**', '**/node_modules/**', '**/.git/**', '**/dist/**'],
  modules: ['@unocss/nuxt'],
  css: ['@unocss/reset/tailwind.css'],
  devtools: { enabled: true },
  alias: {
    '@headless': '../src/index.ts',
    '@headless/*': '../src/*',
    '@ui': '../ui/index.ts',
    '@ui/*': '../ui/*',
    '@theme': '../ui/theme/index.ts',
    '@variants/*': '../ui/variants/*'
  },
  imports: {
    autoImport: false,
    global: false,
    scan: false,
    dirs: []
  },
  vite: {
    resolve: {
      alias: {
        '@headless': fileURLToPath(new URL('./src', import.meta.url)),
        '@ui': fileURLToPath(new URL('./ui', import.meta.url)),
        '@theme': fileURLToPath(new URL('./ui/theme', import.meta.url)),
        '@variants': fileURLToPath(new URL('./ui/variants', import.meta.url))
      }
    }
  }
});
