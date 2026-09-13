/**
 * Bundle fixture build (v0.50.0 T8.3) — performs the actual bundling and prints
 * captured chunk info as JSON on stdout.
 *
 * Runs as a plain Node child process instead of inside Vitest: rolldown-vite applies its
 * built-in .vue compilation in a standalone build, but inside the Vitest worker the .vue
 * modules reach the bundler untransformed (parsed as JSX) and the build fails.
 */
import { build } from 'vite';

const uiRoot = new URL('../..', import.meta.url).pathname;

const chunks = [];
const capture = {
  name: 'bundle-fixture:capture',
  generateBundle(_options, bundle) {
    for (const [fileName, item] of Object.entries(bundle)) {
      if (item.type === 'chunk') {
        chunks.push({ fileName, code: item.code, moduleIds: Object.keys(item.modules ?? {}) });
      }
    }
  }
};

await build({
  root: uiRoot,
  logLevel: 'silent',
  plugins: [capture],
  define: {
    'import.meta.env.DEV': 'undefined',
    'import.meta.env.MODE': 'undefined'
  },
  build: {
    write: false,
    minify: false,
    rollupOptions: {
      input: { fixture: `${uiRoot}test/bundle/entry-sbutton.ts` },
      output: { format: 'es' }
    }
  }
});

console.log(JSON.stringify(chunks));
