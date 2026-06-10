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
 * Find and read sbean.json from the project root.
 */
export async function getConfig(cwd: string): Promise<Config | null> {
  const configPath = path.join(cwd, 'sbean.json');

  try {
    await fs.access(configPath);
  } catch {
    return null;
  }

  const raw = await fs.readFile(configPath, 'utf-8');
  const parsed = JSON.parse(raw);

  const rawConfig = v.parse(rawConfigSchema, parsed);

  return resolveConfigPaths(cwd, rawConfig);
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
      radius: 'md',
      cssVariables: true
    },
    font: {},
    menu: {
      accent: 'subtle',
      color: 'default'
    },
    rtl: false,
    pointer: false,
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
