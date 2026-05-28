import { writeFile } from 'node:fs/promises';
import process from 'node:process';
import type { Options } from 'execa';
import headlessPkg from '../headless/package.json' with { type: 'json' };

const headlessExports = {
  '.': './src/index.ts',
  './constants': './src/constants/index.ts',
  './composables': './src/composables/index.ts',
  './date': './src/date/index.ts',
  './locale': './src/locale/index.ts',
  './locale/*': './src/locale/langs/*.ts',
  './shared': './src/shared/index.ts',
  './nuxt': './src/nuxt/index.ts',
  './resolver': './src/resolver/index.ts',
  './namespaced': './src/namespaced/index.ts',
  './types': './src/types/index.ts',
  './*': './src/components/*/index.ts'
};

const pkgPath = 'headless/package.json';

async function handleStub(reset?: boolean) {
  const pkgExports = reset ? headlessPkg.publishConfig.exports : headlessExports;

  (headlessPkg as any).exports = pkgExports;

  await writeFile(pkgPath, JSON.stringify(headlessPkg, null, 2));
}

async function execCommand(cmd: string, args: string[], options?: Options) {
  const { execa } = await import('execa');
  const res = await execa(cmd, args, options);
  return (res?.stdout as string)?.trim() || '';
}

async function start() {
  const isReset = process.argv.includes('--reset');

  await handleStub(isReset);
  await execCommand('pnpm', [`pnpm oxfmt ${pkgPath}`], { shell: true });
}

start();
