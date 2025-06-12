import { URL, fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: './docs',
  // modules: ['@unocss/nuxt', 'soy-ui/nuxt'],
  // css: ['@unocss/reset/tailwind.css'],
  devtools: { enabled: true },
  alias: {
    '@headless': '../src/index.ts',
    '@headless/*': '../src/*',
    '@ui': '../ui/index.ts',
    '@ui/*': '../ui/*',
    '@theme': '../ui/theme/index.ts',
    '@variants/*': '../ui/variants/*'
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
