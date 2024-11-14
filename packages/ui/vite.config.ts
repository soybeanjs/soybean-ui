import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import UnoCSS from 'unocss/vite';

export default defineConfig({
  plugins: [vue(), vueJsx(), dts({ cleanVueFileName: true, rollupTypes: true, include: 'src/**/*' }), UnoCSS({})],
  build: {
    lib: {
      name: 'soybean-ui',
      entry: {
        index: fileURLToPath(new URL('src/index.ts', import.meta.url))
      },
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue']
    }
  }
});
