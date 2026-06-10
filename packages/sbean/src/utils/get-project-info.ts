import fs from 'fs/promises';
import path from 'path';

export interface ProjectInfo {
  framework: 'vue' | 'nuxt' | 'unknown';
  usesTypeScript: boolean;
  usesUnoCSS: boolean;
  unoConfigPath: string | null;
  packageManager: 'pnpm' | 'npm' | 'yarn' | 'bun';
}

/**
 * Detect project framework and tooling.
 */
export async function getProjectInfo(cwd: string): Promise<ProjectInfo | null> {
  const pkgPath = path.join(cwd, 'package.json');

  try {
    await fs.access(pkgPath);
  } catch {
    return null;
  }

  const pkg = JSON.parse(await fs.readFile(pkgPath, 'utf-8'));

  const framework = detectFramework(pkg);
  const usesTypeScript = await fileExists(path.join(cwd, 'tsconfig.json'));
  const { usesUnoCSS, unoConfigPath } = await detectUnoCSS(cwd);
  const packageManager = await detectPackageManager(cwd);

  return {
    framework,
    usesTypeScript,
    usesUnoCSS,
    unoConfigPath,
    packageManager
  };
}

type PkgInfo = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: unknown;
};

function detectFramework(pkg: PkgInfo): ProjectInfo['framework'] {
  const deps = {
    ...pkg.dependencies,
    ...pkg.devDependencies
  };

  if ('nuxt' in deps || '@nuxt/kit' in deps) {
    return 'nuxt';
  }
  if ('vue' in deps) {
    return 'vue';
  }
  return 'unknown';
}

async function detectUnoCSS(cwd: string): Promise<{ usesUnoCSS: boolean; unoConfigPath: string | null }> {
  const candidates = [
    'uno.config.ts',
    'uno.config.js',
    'uno.config.mjs',
    'unocss.config.ts',
    'unocss.config.js',
    'unocss.config.mjs'
  ];

  for (const candidate of candidates) {
    const fullPath = path.join(cwd, candidate);
    if (await fileExists(fullPath)) {
      return { usesUnoCSS: true, unoConfigPath: fullPath };
    }
  }

  return { usesUnoCSS: false, unoConfigPath: null };
}

async function detectPackageManager(cwd: string): Promise<ProjectInfo['packageManager']> {
  if (await fileExists(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (await fileExists(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (await fileExists(path.join(cwd, 'bun.lockb'))) return 'bun';
  return 'npm';
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
