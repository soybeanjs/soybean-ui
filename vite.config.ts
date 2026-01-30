/// <reference types="vitest/config" />
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from 'unplugin-vue/vite';
import unocss from 'unocss/vite';
import VueRouter from 'vue-router/vite';
import { VueRouterAutoImports } from 'vue-router/unplugin';
import MetaLayouts from 'vite-plugin-vue-meta-layouts';
import AutoImport from 'unplugin-auto-import/vite';
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
    vue(),
    unocss(),
    VueRouter({
      routesFolder: 'playground/pages',
      dts: 'playground/typings/typed-router.d.ts'
    }),
    AutoImport({
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /headless[\\/]dist/],
      imports: [
        'vue',
        'vue-i18n',
        VueRouterAutoImports,
        {
          'vue-router/auto': ['useLink']
        }
      ],
      dts: 'playground/typings/auto-imports.d.ts'
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
