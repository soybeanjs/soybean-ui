import { defineConfig } from 'tsdown';
import unpluginVue from 'unplugin-vue/rolldown';
import unpluginVueJsx from 'unplugin-vue-jsx/rolldown';

export default defineConfig({
  entry: ['src/index.ts'],
  platform: 'neutral',
  external: [
    '@floating-ui/core',
    '@floating-ui/vue',
    '@formkit/auto-animate',
    '@iconify/vue',
    '@internationalized/date',
    '@internationalized/number',
    '@nuxt/kit',
    '@nuxt/schema',
    '@soybeanjs/color-palette',
    '@soybeanjs/unocss-shadcn',
    '@standard-schema/spec',
    '@tanstack/vue-virtual',
    '@vue/shared',
    '@vueuse/core',
    '@vueuse/integrations',
    '@vueuse/integrations/useFuse',
    '@vueuse/router',
    '@vueuse/shared',
    'aria-hidden',
    'clsx',
    'defu',
    'fuse.js',
    'klona',
    'nuxt',
    'ohash',
    'tailwind-merge',
    'tailwind-variants',
    'valibot',
    'vue',
    'vue-router',
    'zod'
  ],
  clean: true,
  dts: {
    vue: true
  },
  unbundle: true,
  plugins: [unpluginVue({ isProduction: true }), unpluginVueJsx()],
  sourcemap: false,
  minify: true
});
