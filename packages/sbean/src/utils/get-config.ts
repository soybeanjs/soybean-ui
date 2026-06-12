import fs from 'fs/promises';
import path from 'path';
import * as v from 'valibot';
import { rawConfigSchema, configSchema } from '../registry/config';
import type { Config } from '../registry/config';

export const DEFAULT_COMPONENTS = '@/components';
export const DEFAULT_UTILS = '@/lib/utils';
export const DEFAULT_UI = '@/components/ui';
export const DEFAULT_LIB = '@/lib';

export type { Config };

/**
 * Walk up from `cwd` to find the nearest `sbean.json`.
 * Returns the config file path and the config directory (where sbean.json lives).
 * Returns null if no sbean.json is found in the directory tree.
 */
export async function findConfigFile(cwd: string): Promise<{ configPath: string; configDir: string } | null> {
  let dir = path.resolve(cwd);
  const root = path.parse(dir).root;

  while (true) {
    const configPath = path.join(dir, 'sbean.json');
    try {
      await fs.access(configPath);
      return { configPath, configDir: dir };
    } catch {
      // Not found here — go up
    }

    if (dir === root) break;
    dir = path.dirname(dir);
  }

  return null;
}

/**
 * Detect if the project is a monorepo (has a pnpm-workspace.yaml or similar workspace config).
 */
export async function detectMonorepo(cwd: string): Promise<boolean> {
  let dir = path.resolve(cwd);
  const root = path.parse(dir).root;

  while (true) {
    // pnpm workspace
    try {
      await fs.access(path.join(dir, 'pnpm-workspace.yaml'));
      return true;
    } catch {}

    // npm/yarn workspaces are in package.json
    try {
      const pkg = JSON.parse(await fs.readFile(path.join(dir, 'package.json'), 'utf-8'));
      if (pkg.workspaces) return true;
    } catch {}

    if (dir === root) break;
    dir = path.dirname(dir);
  }

  return false;
}

/**
 * Find and read sbean.json from the project root.
 * Walks up directories to find the nearest sbean.json (monorepo-friendly).
 */
export async function getConfig(cwd: string): Promise<Config | null> {
  const found = await findConfigFile(cwd);
  if (!found) return null;

  const raw = await fs.readFile(found.configPath, 'utf-8');
  const parsed = JSON.parse(raw);

  const rawConfig = v.parse(rawConfigSchema, parsed);

  // Resolve paths relative to the config file's directory
  return resolveConfigPaths(found.configDir, rawConfig);
}

/**
 * Resolve alias paths to absolute paths.
 */
export async function resolveConfigPaths(cwd: string, config: v.InferOutput<typeof rawConfigSchema>): Promise<Config> {
  const componentsDir = resolveAlias(cwd, config.aliases.components);
  const utilsPath = resolveAlias(cwd, config.aliases.utils);
  const uiDir = config.aliases.ui ? resolveAlias(cwd, config.aliases.ui) : path.join(componentsDir, 'ui');
  const libDir = config.aliases.lib ? resolveAlias(cwd, config.aliases.lib) : path.dirname(utilsPath);

  return v.parse(configSchema, {
    ...config,
    resolvedPaths: {
      cwd,
      components: componentsDir,
      utils: utilsPath,
      ui: uiDir,
      lib: libDir
    }
  });
}

/**
 * Convert a tsconfig alias like "@/components" to an absolute path.
 */
function resolveAlias(cwd: string, alias: string): string {
  if (alias.startsWith('@/')) {
    return path.join(cwd, 'src', alias.slice(2));
  }
  if (alias.startsWith('~/')) {
    return path.join(cwd, alias.slice(2));
  }
  return path.resolve(cwd, alias);
}

/**
 * Create a minimal default config.
 */
export async function createDefaultConfig(
  cwd: string,
  overrides?: Partial<v.InferOutput<typeof rawConfigSchema>>
): Promise<Config> {
  const raw: v.InferOutput<typeof rawConfigSchema> = {
    style: 'soybean',
    iconLibrary: 'lucide',
    uno: {
      base: 'zinc',
      primary: 'indigo',
      radius: 'md'
    },
    font: {},
    menu: {
      accent: 'subtle',
      color: 'default'
    },
    registries: {},
    aliases: {
      components: DEFAULT_COMPONENTS,
      utils: DEFAULT_UTILS,
      ui: DEFAULT_UI,
      lib: DEFAULT_LIB
    },
    ...overrides
  };

  return resolveConfigPaths(cwd, raw);
}

/**
 * Write sbean.json to disk.
 */
export async function writeConfig(cwd: string, config: Config): Promise<void> {
  const configPath = path.join(cwd, 'sbean.json');
  const { resolvedPaths: _, ...rest } = config;
  await fs.writeFile(configPath, JSON.stringify(rest, null, 2), 'utf-8');
}
