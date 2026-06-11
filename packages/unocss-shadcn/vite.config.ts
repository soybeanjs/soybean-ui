import { defineConfig } from 'vite-plus';
import { cssRawPlugin } from '../_shared/css';
import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  pack: {
    entry: ['src/index.ts'],
    platform: 'neutral',
    deps: {
      neverBundle: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)]
    },
    plugins: [cssRawPlugin()],
    clean: true,
    dts: true,
    sourcemap: false,
    minify: true
  }
});
