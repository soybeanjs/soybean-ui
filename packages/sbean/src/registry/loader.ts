import fs from 'fs/promises';
import path from 'path';
import * as v from 'valibot';
import { registrySchema, registryItemSchema } from './schema';
import type { Registry, RegistryItem } from './schema';

const MAX_INCLUDE_DEPTH = 32;

export type RegistryLoadResult = {
  registry: Registry;
  usesInclude: boolean;
};

/**
 * Read registry.json, resolving any `include` references.
 */
export async function readRegistryWithIncludes(
  registryFile: string,
  options: { cwd: string }
): Promise<RegistryLoadResult> {
  const rootFile = path.resolve(options.cwd, registryFile);
  const content = await fs.readFile(rootFile, 'utf-8');
  const rootRegistry = JSON.parse(content) as Registry;

  // Validate basic structure
  v.parse(registrySchema, rootRegistry);

  const usesInclude = !!rootRegistry.include?.length;

  if (!usesInclude) {
    return { registry: rootRegistry, usesInclude: false };
  }

  // Merge included registries
  const mergedItems = [...rootRegistry.items];
  const included = await resolveIncludes(rootRegistry.include!, path.dirname(rootFile), 0);

  for (const inc of included) {
    for (const item of inc.items) {
      if (!mergedItems.find(i => i.name === item.name)) {
        mergedItems.push(item);
      }
    }
  }

  return {
    registry: {
      ...rootRegistry,
      items: mergedItems,
      include: undefined
    },
    usesInclude: true
  };
}

async function resolveIncludes(includes: string[], baseDir: string, depth: number): Promise<Registry[]> {
  if (depth > MAX_INCLUDE_DEPTH) {
    throw new Error('Max include depth exceeded');
  }

  const results: Registry[] = [];

  for (const includePath of includes) {
    const fullPath = path.resolve(baseDir, includePath);
    const content = await fs.readFile(fullPath, 'utf-8');
    const parsed = JSON.parse(content);
    const registry = v.parse(registrySchema, parsed);

    if (registry.include?.length) {
      const nested = await resolveIncludes(registry.include, path.dirname(fullPath), depth + 1);
      results.push(...nested);
    }

    results.push(registry);
  }

  return results;
}

/**
 * Create a registry item with resolved file contents.
 */
export async function createRegistryItem(item: RegistryItem, rootDir: string): Promise<RegistryItem> {
  const files = item.files
    ? await Promise.all(
        item.files.map(async file => {
          const filePath = path.resolve(rootDir, file.path);
          try {
            const content = await fs.readFile(filePath, 'utf-8');
            return { ...file, content };
          } catch {
            console.warn(`  ⚠ File not found: ${file.path}`);
            return file;
          }
        })
      )
    : [];

  return v.parse(registryItemSchema, {
    ...item,
    files
  });
}

/**
 * Create a registry catalog (without file contents, just metadata).
 */
export function createRegistryCatalog(result: RegistryLoadResult, rootDir: string): Registry {
  return {
    ...result.registry,
    items: result.registry.items.map(item => ({
      ...item,
      files: item.files?.map(f => ({
        path: path.relative(rootDir, path.resolve(rootDir, f.path)),
        type: f.type
      }))
    }))
  };
}
