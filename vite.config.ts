import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import devtools from 'vite-plugin-vue-devtools';
import vue from 'unplugin-vue/vite';
import unocss from 'unocss/vite';

export default defineConfig({
  root: './playground',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@ui': fileURLToPath(new URL('./playground/src/ui', import.meta.url)),
      '@theme': fileURLToPath(new URL('./playground/src/theme', import.meta.url)),
      '@variants': fileURLToPath(new URL('./playground/src/variants', import.meta.url))
    }
  },
  plugins: [vue(), unocss(), devtools()],
  server: {
    open: true
  }
});
