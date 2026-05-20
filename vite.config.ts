import path from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import VueDevtools from 'vite-plugin-vue-devtools';
import MetaLayouts from 'vite-plugin-vue-meta-layouts';
import Components from 'unplugin-vue-components/vite';
import VueRouter from 'vue-router/vite';
import Unocss from 'unocss/vite';
import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import UiResolver from './src/resolver/index';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@soybeanjs/ui': fileURLToPath(new URL('./src/index.ts', import.meta.url))
    }
  },
  plugins: [
    Vue(),
    VueJsx(),
    Unocss(),
    VueRouter({
      routesFolder: 'playground/pages',
      dts: 'playground/typings/typed-router.d.ts'
    }),
    MetaLayouts({
      target: 'playground/layouts'
    }),
    Components({
      dirs: ['playground/components'],
      dts: 'playground/typings/components.d.ts',
      resolvers: [UiResolver()]
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'docs/locales/**')]
    }),
    VueDevtools()
  ],
  server: {
    open: true
  }
});
