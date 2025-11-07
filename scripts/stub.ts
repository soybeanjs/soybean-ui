import process from 'node:process';
import { readFile, writeFile } from 'node:fs/promises';
import type { Options } from 'execa';

const originExports = {
  '.': {
    types: './dist/index.d.ts',
    import: './dist/index.js',
    require: './dist/index.js'
  },
  './constants': {
    types: './dist/constants/index.d.ts',
    import: './dist/constants/index.js',
    require: './dist/constants/index.js'
  },
  './composables': {
    types: './dist/composables/index.d.ts',
    import: './dist/composables/index.js',
    require: './dist/composables/index.js'
  },
  './shared': {
    types: './dist/shared/index.d.ts',
    import: './dist/shared/index.js',
    require: './dist/shared/index.js'
  },
  './forms': {
    types: './dist/forms/index.d.ts',
    import: './dist/forms/index.js',
    require: './dist/forms/index.js'
  },
  './nuxt': {
    types: './dist/nuxt/index.d.ts',
    import: './dist/nuxt/index.js',
    require: './dist/nuxt/index.js'
  },
  './resolver': {
    types: './dist/resolver/index.d.ts',
    import: './dist/resolver/index.js',
    require: './dist/resolver/index.js'
  },
  './namespaced': {
    types: './dist/namespaced/index.d.ts',
    import: './dist/namespaced/index.js',
    require: './dist/namespaced/index.js'
  },
  './*': {
    types: './dist/components/*/index.d.ts',
    import: './dist/components/*/index.js',
    require: './dist/components/*/index.js'
  }
};

const stubExports = {
  '.': './src/index.ts',
  './constants': './src/constants/index.ts',
  './composables': './src/composables/index.ts',
  './shared': './src/shared/index.ts',
  './forms': './src/forms/index.ts',
  './nuxt': './src/nuxt/index.ts',
  './resolver': './src/resolver/index.ts',
  './namespaced': './src/namespaced/index.ts',
  './*': './src/components/*/index.ts'
};

const pkgPath = 'headless/package.json';

async function handleStub(reset?: boolean) {
  const backup = await readFile(pkgPath, 'utf-8');

  const pkgJson: Record<string, unknown> = JSON.parse(backup);

  pkgJson.exports = reset ? originExports : stubExports;

  await writeFile(pkgPath, JSON.stringify(pkgJson, null, 2));
}

async function execCommand(cmd: string, args: string[], options?: Options) {
  const { execa } = await import('execa');
  const res = await execa(cmd, args, options);
  return (res?.stdout as string)?.trim() || '';
}

async function start() {
  const isReset = process.argv.includes('--reset');

  await handleStub(isReset);
  await execCommand('pnpm', [`eslint --fix ${pkgPath}`], { shell: true });
}

start();
