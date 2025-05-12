// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@unocss/nuxt', 'soy-ui/nuxt'],
  css: ['@unocss/reset/tailwind.css'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  imports: {
    transform: {
      exclude: [/soy-ui\/dist/]
    }
  }
});
