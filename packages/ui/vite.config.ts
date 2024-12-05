import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      cleanVueFileName: true,
      bundledPackages: ['@soybean-ui/primitive'],
      rollupTypes: true,
      include: 'src/**/*'
    })
  ],
  build: {
    lib: {
      name: 'soybean-ui',
      entry: {
        index: fileURLToPath(new URL('src/index.ts', import.meta.url))
      },
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'mjs' : 'cjs';

        return `${entryName}.${ext}`;
      },
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue']
    }
  }
});
