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
      '@ui': fileURLToPath(new URL('./packages/shadcn-ui/src', import.meta.url))
    }
  },

  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    vueJsx(),
    unocss()
  ],
  server: {
    host: '0.0.0.0',
    port: 1997,
    open: true,
    fs: {
      cachedChecks: false
    }
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
