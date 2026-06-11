import { defineConfig } from 'vite-plus';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  pack: {
    entry: ['src/index.ts'],
    platform: 'node',
    target: 'esnext',
    clean: true,
    dts: true,
    deps: {
      neverBundle: Object.keys({
        ...pkg.dependencies,
        ...pkg.devDependencies
      })
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
