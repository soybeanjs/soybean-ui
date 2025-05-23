// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@unocss/nuxt', 'soy-ui/nuxt'],
  css: ['@unocss/reset/tailwind.css'],
  devtools: { enabled: true }
});
