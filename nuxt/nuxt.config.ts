// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
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
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit']
    }
  }
});
