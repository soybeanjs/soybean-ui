import fs from 'fs/promises';
import path from 'path';
import * as v from 'valibot';
import { rawConfigSchema, configSchema } from '../registry/config';
import type { Config } from '../registry/config';

export type { Config };

/**
 * Walk up from `cwd` to find the nearest `sbean.json`.
 */
export async function findConfigFile(cwd: string): Promise<{ configPath: string; configDir: string } | null> {
  let dir = path.resolve(cwd);
  const root = path.parse(dir).root;

  while (true) {
    const configPath = path.join(dir, 'sbean.json');
    try {
      await fs.access(configPath);
      return { configPath, configDir: dir };
    } catch {}

    if (dir === root) break;
    dir = path.dirname(dir);
  }

  return null;
}

/**
 * Detect if the project is a monorepo.
 */
export async function detectMonorepo(cwd: string): Promise<boolean> {
  let dir = path.resolve(cwd);
  const root = path.parse(dir).root;

  while (true) {
    try {
      await fs.access(path.join(dir, 'pnpm-workspace.yaml'));
      return true;
    } catch {}

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
 * Find and read sbean.json.
 */
export async function getConfig(cwd: string): Promise<Config | null> {
  const found = await findConfigFile(cwd);
  if (!found) return null;

  const raw = await fs.readFile(found.configPath, 'utf-8');
  const parsed = JSON.parse(raw);
  const rawConfig = v.parse(rawConfigSchema, parsed);

  return resolveConfigPaths(found.configDir, rawConfig);
}

/**
 * Resolve uiDir to an absolute path. Always defaults to `src/ui`.
 */
export async function resolveConfigPaths(cwd: string, config: v.InferOutput<typeof rawConfigSchema>): Promise<Config> {
  const uiAbs = path.resolve(cwd, 'src/ui');

  return v.parse(configSchema, {
    ...config,
    resolvedPaths: {
      cwd,
      ui: uiAbs
    }
  });
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
