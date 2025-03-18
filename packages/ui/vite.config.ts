import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import fg from 'fast-glob';
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
    plugins: [
      vue(),
      vueJsx(),
      dts({
        cleanVueFileName: true,
        bundledPackages: ['@soybean-ui/primitives'],
        include: 'src/**/*'
      })
    ],
    build: {
      lib: {
        name: 'soy-ui',
        formats: ['es'],
        fileName: (_format, entryName) => `${entryName}.mjs`,
        entry: {
          ...entry,
          index: fileURLToPath(new URL('src/index.ts', import.meta.url)),
          nuxt: fileURLToPath(new URL('src/nuxt/index.ts', import.meta.url)),
          resolver: fileURLToPath(new URL('src/resolver/index.ts', import.meta.url))
        }
      },
      rollupOptions: {
        external: ['vue', 'vue-router', 'lucide-vue-next', '@nuxt/schema', '@nuxt/kit'],
        output: {
          manualChunks: {
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
