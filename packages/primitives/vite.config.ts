import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import pkg from './package.json';

export default defineConfig({
  plugins: [vue(), vueJsx(), dts({ cleanVueFileName: true, rollupTypes: true, include: 'src/**/*' })],
  build: {
    lib: {
      name: 'soybean-primitives',
      entry: {
        index: fileURLToPath(new URL('src/index.ts', import.meta.url)),
        date: fileURLToPath(new URL('src/date/index.ts', import.meta.url))
      },
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'mjs' : 'cjs';

        return `${entryName}.${ext}`;
      },
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue', ...Object.keys(pkg.dependencies)]
    }
  }
});
