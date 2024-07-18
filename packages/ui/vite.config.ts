import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import unocss from 'unocss/vite';

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    vueJsx(),
    unocss(),
    dts({ rollupTypes: true, include: 'src/**/*' })
  ],
  build: {
    reportCompressedSize: false,
    sourcemap: false,
    commonjsOptions: {
      ignoreTryCatch: false
    },
    lib: {
      entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
      name: 'soybean-ui',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue', 'radix-vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});
