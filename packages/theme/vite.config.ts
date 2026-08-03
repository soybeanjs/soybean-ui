import { defineConfig } from 'vite-plus';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  pack: {
    entry: ['src/index.ts'],
    platform: 'neutral',
    target: 'esnext',
    clean: true,
    dts: true,
    deps: {
      neverBundle: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)]
    },
    sourcemap: false,
    minify: false
  },
  test: {
    globals: true,
    include: ['test/**/*.spec.ts']
  }
});
