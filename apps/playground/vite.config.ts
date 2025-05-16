import process from 'node:process';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import unocss from 'unocss/vite';

export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~packages': fileURLToPath(new URL('../../packages', import.meta.url))
    }
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  },
  plugins: [vue({ include: ['**/*.vue', 'packages/**/*.vue'] }), vueJsx(), unocss()],
  server: {
    host: '0.0.0.0',
    port: 1997,
    open: true
  },
  preview: {
    port: 9725
  },
  build: {
    reportCompressedSize: false,
    sourcemap: true,
    commonjsOptions: {
      ignoreTryCatch: false
    }
  }
});
