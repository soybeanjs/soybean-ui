import { defineConfig } from 'vite-plus';
import fg from 'fast-glob';
import pkg from './package.json' with { type: 'json' };

const { dependencies = {}, devDependencies = {} } = pkg as {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

export default defineConfig({
  pack: {
    entry: ['src/index.ts', ...fg.sync('src/generated/**/*.ts')],
    platform: 'neutral',
    target: 'es2020',
    deps: {
      neverBundle: Object.keys({ ...dependencies, ...devDependencies })
    },
    clean: true,
    dts: true,
    unbundle: true,
    sourcemap: false,
    minify: true
  },
  test: {
    globals: true,
    include: ['test/**/*.spec.ts']
  }
});
