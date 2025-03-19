import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import fg from 'fast-glob';
import pkg from './package.json';

export default defineConfig(() => {
  const variants = fg.sync('src/variants/*.ts');
  const names = variants.map(variant => {
    return variant.replace('.ts', '').replace('src/variants/', '');
  });

  const entry: Record<string, string> = {};
  const manualChunks: Record<string, string[]> = {};

  names.forEach(name => {
    entry[`variants/${name}`] = fileURLToPath(new URL(`src/variants/${name}.ts`, import.meta.url));
    manualChunks[`variants/${name}`] = [`src/variants/${name}.ts`];
  });

  return {
    plugins: [dts()],
    build: {
      minify: false,
      target: 'esnext',
      sourcemap: false,
      lib: {
        name: 'soybean-variants',
        formats: ['es'],
        fileName: (_format, entryName) => `${entryName}.mjs`,
        entry: {
          ...entry,
          index: fileURLToPath(new URL('src/index.ts', import.meta.url))
        }
      },
      rollupOptions: {
        external: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)],
        output: {
          manualChunks: {
            ...manualChunks,
            index: ['src/index.ts']
          }
        }
      }
    }
  };
});
