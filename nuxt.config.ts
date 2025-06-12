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
  }
});
