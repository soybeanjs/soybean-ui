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

function transformValuePair(subKey: string, subValue: string): string {
  if (subKey === 'import') {
    return subValue.replace(/^\.\/dist\//, './src/').replace(/\.mjs$/, '.ts');
  }
  if (subKey === 'types') {
    return subValue.replace(/^\.\/dist\//, './src/').replace(/\.d\.ts$/, '.ts');
  }
  return subValue;
}

function transformExportsToDevMode(exports: Record<string, any>): Record<string, any> {
  const devExports: Record<string, any> = {};

  for (const [key, value] of Object.entries(exports)) {
    if (typeof value === 'string') {
      devExports[key] = value.replace(/^\.\/dist\//, './src/').replace(/\.mjs$/, '.ts');
    } else if (typeof value === 'object' && value !== null) {
      const transformedValue: Record<string, any> = {};

      for (const [subKey, subValue] of Object.entries(value)) {
        if (typeof subValue === 'string') {
          transformedValue[subKey] = transformValuePair(subKey, subValue);
        } else {
          transformedValue[subKey] = subValue;
        }
      }

      devExports[key] = transformedValue;
    } else {
      devExports[key] = value;
    }
  }

  return devExports;
}

function generateTypesVersions(exports: Record<string, any>): Record<string, any> {
  const typesVersions: Record<string, any> = {
    '*': {}
  };

  for (const key of Object.keys(exports)) {
    if (key === '.') {
      typesVersions['*']['*'] = ['./src/*'];
    } else if (key.startsWith('./')) {
      const cleanKey = key.replace(/^\.\//, '');
      if (cleanKey.endsWith('/*')) {
        const baseKey = cleanKey.replace(/\/\*$/, '');
        typesVersions['*'][`${baseKey}/*`] = [`./src/${baseKey}/*`];
      } else {
        typesVersions['*'][cleanKey] = [`./src/${cleanKey}/index.ts`];
      }
    }
  }

  return typesVersions;
}

async function writeDevPkgJson(pkgName: string, pkgPath: string) {
  const backupPath = getBackupPath(pkgName);

  const backup = await readFile(backupPath, 'utf-8');

  const pkgJson: Record<string, unknown> = JSON.parse(backup);

  if (pkgJson.exports && typeof pkgJson.exports === 'object') {
    pkgJson.exports = transformExportsToDevMode(pkgJson.exports as Record<string, any>);
    pkgJson.typesVersions = generateTypesVersions(pkgJson.exports as Record<string, any>);
  } else {
    pkgJson.exports = { '.': './src/index.ts' };
    pkgJson.typesVersions = {
      '*': {
        '*': ['./src/*']
      }
    };
  }

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
    primitives: 'packages/primitives',
    variants: 'packages/ui-variants',
    color: 'packages/color',
    'unocss-preset': 'packages/unocss-preset',
    ui: 'packages/soy-ui'
  };

  return Object.entries(pkgs).map(([pkgName, pkgPath]) => ({ pkgName, pkgPath }));
}

export function toKebabCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function toPascalCase(str: string) {
  return str.replace(/(^\w|-\w)/g, letter => letter.toUpperCase()).replace(/-/g, '');
}

export function toCamelCase(str: string) {
  const res = str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  return res.charAt(0).toLowerCase() + res.slice(1);
}
