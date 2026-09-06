import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite-plus';
import { removeStrayDeclarations } from '@soybeanjs/shared/vite';
import pkg from './package.json' with { type: 'json' };

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  pack: {
    entry: ['src/index.ts', 'src/storage.ts', 'src/ssr.ts'],
    platform: 'neutral',
    target: 'esnext',
    clean: true,
    dts: true,
    deps: {
      neverBundle: [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)]
    },
    sourcemap: false,
    minify: false,
    hooks: {
      'build:done': ({ chunks }) => {
        removeStrayDeclarations(
          rootDir,
          chunks.flatMap(chunk => (chunk.type === 'chunk' ? Object.keys(chunk.modules) : []))
        );
      }
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['test/**/*.spec.ts']
  }
});
