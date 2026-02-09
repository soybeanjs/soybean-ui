/// <reference types="vitest/config" />
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import Vue from 'unplugin-vue/vite';
import Unocss from 'unocss/vite';
import VueRouter from 'vue-router/vite';
import MetaLayouts from 'vite-plugin-vue-meta-layouts';
import Components from 'unplugin-vue-components/vite';
import UiResolver from './src/resolver/index.ts';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@soybeanjs/ui': fileURLToPath(new URL('./src/index.ts', import.meta.url))
    }
  },
  plugins: [
    Vue(),
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
    })
  ],
  server: {
    open: true
  },
  test: {
    globals: true,
    include: ['test/specs/**/*.spec.ts'],
    environment: 'happy-dom'
  }
});
