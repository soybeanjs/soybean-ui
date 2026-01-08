/// <reference types="vitest/config" />
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import devtools from 'vite-plugin-vue-devtools';
import vue from 'unplugin-vue/vite';
import unocss from 'unocss/vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@soybeanjs/ui': fileURLToPath(new URL('./src/index.ts', import.meta.url))
    }
  },
  plugins: [vue(), unocss(), devtools()],
  server: {
    open: true
  },
  test: {
    globals: true,
    include: ['test/specs/**/*.spec.ts'],
    environment: 'happy-dom'
  }
});
