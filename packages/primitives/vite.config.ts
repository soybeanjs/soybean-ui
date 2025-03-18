import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import fg from 'fast-glob';
import pkg from './package.json';

export default defineConfig(() => {
  const components = fg.sync('src/components/**/index.ts');
  const names = components.map(component => {
    return component.replace('/index.ts', '').replace('src/components/', '');
  });

  const entry: Record<string, string> = {};
  const manualChunks: Record<string, string[]> = {};

  names.forEach(name => {
    entry[`components/${name}/index`] = fileURLToPath(new URL(`src/components/${name}/index.ts`, import.meta.url));
    manualChunks[`components/${name}/index`] = [`src/components/${name}/index.ts`];
  });

  return {
    plugins: [vue(), vueJsx(), dts({ cleanVueFileName: true, include: 'src/**/*' })],
    build: {
      minify: false,
      target: 'esnext',
      sourcemap: true,
      lib: {
        name: 'soybean-primitives',
        formats: ['es'],
        fileName: (_format, entryName) => `${entryName}.mjs`,
        entry: {
          constant: fileURLToPath(new URL('src/constant/index.ts', import.meta.url)),
          date: fileURLToPath(new URL('src/date/index.ts', import.meta.url)),
          composables: fileURLToPath(new URL('src/composables/index.ts', import.meta.url)),
          ...entry,
          index: fileURLToPath(new URL('src/index.ts', import.meta.url)),
          nuxt: fileURLToPath(new URL('src/nuxt/index.ts', import.meta.url)),
          resolver: fileURLToPath(new URL('src/resolver/index.ts', import.meta.url))
        }
      },
      rollupOptions: {
        external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)],
        output: {
          manualChunks: {
            constant: ['src/constant/index.ts'],
            date: ['src/date/index.ts'],
            composables: ['src/composables/index.ts'],
            ...manualChunks,
            index: ['src/index.ts'],
            nuxt: ['src/nuxt/index.ts'],
            resolver: ['src/resolver/index.ts']
          }
        }
      }
    }
  };
});
