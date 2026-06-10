import { execSync } from 'child_process';
import type { Config } from '../get-config';
import { getProjectInfo } from '../get-project-info';

export interface UpdateDependenciesOptions {
  silent?: boolean;
}

/**
 * Install npm dependencies for added components.
 *
 * Detects the user's package manager and runs the appropriate install command.
 */
export async function updateDependencies(
  dependencies: string[] | undefined,
  devDependencies: string[] | undefined,
  config: Config,
  options: UpdateDependenciesOptions = {}
): Promise<void> {
  const deps = dependencies ?? [];
  const devDeps = devDependencies ?? [];

  if (deps.length === 0 && devDeps.length === 0) {
    return;
  }

  const projectInfo = await getProjectInfo(config.resolvedPaths.cwd);
  const pm = projectInfo?.packageManager ?? 'npm';

  if (!options.silent) {
    console.log(`  Installing ${deps.length + devDeps.length} package(s) via ${pm}...`);
  }

  if (deps.length > 0) {
    const cmd = buildInstallCommand(pm, deps, false);
    try {
      execSync(cmd, { cwd: config.resolvedPaths.cwd, stdio: options.silent ? 'pipe' : 'inherit' });
    } catch {
      console.warn(`  ⚠ Failed to install: ${deps.join(', ')}`);
      console.warn(`    Run: ${cmd}`);
    }
  }

  if (devDeps.length > 0) {
    const cmd = buildInstallCommand(pm, devDeps, true);
    try {
      execSync(cmd, { cwd: config.resolvedPaths.cwd, stdio: options.silent ? 'pipe' : 'inherit' });
    } catch {
      console.warn(`  ⚠ Failed to install dev: ${devDeps.join(', ')}`);
      console.warn(`    Run: ${cmd}`);
    }
  }
}

function buildInstallCommand(pm: string, packages: string[], isDev: boolean): string {
  const pkgList = packages.join(' ');

  switch (pm) {
    case 'pnpm':
      return `pnpm add ${isDev ? '-D ' : ''}${pkgList}`;
    case 'yarn':
      return `yarn add ${isDev ? '-D ' : ''}${pkgList}`;
    case 'bun':
      return `bun add ${isDev ? '-d ' : ''}${pkgList}`;
    case 'npm':
    default:
      return `npm install ${isDev ? '--save-dev ' : ''}${pkgList}`;
  }
}
