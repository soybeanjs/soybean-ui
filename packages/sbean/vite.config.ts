import { defineConfig } from 'vite-plus';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  pack: {
    entry: ['src/index.ts'],
    platform: 'node',
    target: 'esnext',
    unbundle: true,
    clean: true,
    dts: true,
    deps: {
      neverBundle: Object.keys({
        ...pkg.dependencies,
        ...pkg.devDependencies
      })
    },
    define: {
      'import.meta.env.DEV': 'undefined',
      'import.meta.env.MODE': 'undefined'
    },
    sourcemap: false,
    minify: true,
    fixedExtension: false
  },
  test: {
    globals: true,
    include: ['test/**/*.spec.ts']
  }
});
