import process from 'node:process';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import type { Options } from 'execa';

export async function execCommand(cmd: string, args: string[], options?: Options) {
  const { execa } = await import('execa');
  const res = await execa(cmd, args, options);
  return (res?.stdout as string)?.trim() || '';
}

const cwd = process.cwd();

const devPkg = {
  exports: {
    '.': './src/index.ts'
  },
  typesVersions: {
    '*': {
      '*': ['./src/*']
    }
  }
};

const removedKeys = ['types', 'typings', 'main', 'module'];

const BACKUP_DIR = 'scripts/.json';

function getBackupPath(pkgName: string) {
  return path.join(cwd, BACKUP_DIR, `${pkgName}.json`);
}

function getPkgJsonPath(pkgPath: string) {
  return path.join(cwd, pkgPath, 'package.json');
}

async function backupPkgJson(pkgName: string, pkgPath: string) {
  const backupPath = getBackupPath(pkgName);

  const pkgJsonPath = getPkgJsonPath(pkgPath);

  const originalPkgJson = await readFile(pkgJsonPath, 'utf-8');

  await writeFile(backupPath, originalPkgJson);
}

async function writeDevPkgJson(pkgName: string, pkgPath: string) {
  const backupPath = getBackupPath(pkgName);

  const backup = await readFile(backupPath, 'utf-8');

  const pkgJson: Record<string, unknown> = JSON.parse(backup);

  pkgJson.exports = devPkg.exports;
  pkgJson.typesVersions = devPkg.typesVersions;

  for (const key of removedKeys) {
    if (removedKeys.includes(key)) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete pkgJson[key];
    }
  }

  const pkgJsonPath = getPkgJsonPath(pkgPath);

  await writeFile(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
}

export async function ensureBackupDir() {
  const backupDir = path.join(cwd, BACKUP_DIR);

  const existDir = existsSync(backupDir);

  if (!existDir) {
    await mkdir(backupDir);
  }
}

export async function handleStub(pkgName: string, pkgPath: string) {
  await backupPkgJson(pkgName, pkgPath);

  await writeDevPkgJson(pkgName, pkgPath);

  const pkgJsonPath = getPkgJsonPath(pkgPath);

  await execCommand('pnpm', [`eslint --fix ${pkgJsonPath}`], { shell: true });
}

export async function handleRestore(pkgName: string, pkgPath: string) {
  const backupPath = getBackupPath(pkgName);

  const backup = await readFile(backupPath, 'utf-8');

  const pkgJsonPath = getPkgJsonPath(pkgPath);

  await writeFile(pkgJsonPath, backup);

  await execCommand('pnpm', [`eslint --fix ${pkgJsonPath}`], { shell: true });
}

export function getPkgs() {
  const pkgs = {
    primitive: 'packages/primitive',
    'ui-variants': 'packages/ui-variants',
    color: 'packages/color',
    'unocss-preset': 'packages/unocss-preset',
    ui: 'packages/ui'
  };

  return Object.entries(pkgs).map(([pkgName, pkgPath]) => ({ pkgName, pkgPath }));
}
