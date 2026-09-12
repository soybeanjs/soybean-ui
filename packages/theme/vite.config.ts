import { existsSync, readdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite-plus';
import pkg from './package.json' with { type: 'json' };

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/** a stray declaration is a generated `.d.ts` sitting beside its `.ts` source */
const strayDeclarationsIn = (dir: string) =>
  readdirSync(dir)
    .filter(file => file.endsWith('.d.ts') && existsSync(path.join(dir, `${file.slice(0, -5)}.ts`)))
    .map(file => path.join(dir, file));

/**
 * declaration emit writes `.d.ts` beside sources pulled in from outside this
 * package (tsconfig `#shared/*` → headless); remove those strays after build.
 */
const removeStrayDeclarations = (moduleIds: string[]) => {
  moduleIds
    .filter(moduleId => moduleId.endsWith('.ts') && !moduleId.startsWith(rootDir) && existsSync(moduleId))
    .map(moduleId => path.dirname(moduleId))
    .flatMap(strayDeclarationsIn)
    .forEach(file => {
      rmSync(file, { force: true });
    });
};

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
        removeStrayDeclarations(chunks.flatMap(chunk => (chunk.type === 'chunk' ? Object.keys(chunk.modules) : [])));
      }
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['test/**/*.spec.ts']
  }
});
