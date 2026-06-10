import path from 'path';
import { createRegistryItem, readRegistryWithIncludes } from '../registry/loader';
import type { RegistryItem } from '../registry/schema';
import type { Config } from './get-config';
import { updateDependencies } from './updaters/update-dependencies';
import { updateFiles } from './updaters/update-files';
import type { UpdateFilesOptions } from './updaters/update-files';

export interface AddComponentsOptions {
  overwrite: boolean;
  path?: string;
}

/**
 * Add components to a project — the core copy-paste engine.
 *
 * Reads the registry, resolves each component's files, transforms imports,
 * and writes them to the user's project directory.
 */
export async function addComponents(
  componentNames: string[],
  config: Config,
  options: AddComponentsOptions
): Promise<void> {
  const registryFile = path.join(config.resolvedPaths.cwd, 'registry.json');

  // Load registry
  let registryResult;
  try {
    registryResult = await readRegistryWithIncludes(registryFile, {
      cwd: config.resolvedPaths.cwd
    });
  } catch {
    console.error('No registry.json found in project. Run "sbean build" first.');
    process.exit(1);
  }

  const rootDir = registryResult.usesInclude ? path.dirname(registryFile) : config.resolvedPaths.cwd;

  // Resolve target directory
  const targetDir = options.path ? path.resolve(config.resolvedPaths.cwd, options.path) : config.resolvedPaths.ui;

  const transformCtx = {
    componentsAlias: config.aliases.components,
    uiAlias: config.aliases.ui ?? `${config.aliases.components}/ui`,
    utilsAlias: config.aliases.utils,
    libAlias: config.aliases.lib ?? '',
    iconLibrary: config.iconLibrary
  };

  const updateOpts: UpdateFilesOptions = {
    overwrite: options.overwrite,
    style: config.style,
    transformCtx
  };

  let added = 0;

  // Collect all dependencies and devDependencies
  const allDeps: string[] = [];
  const allDevDeps: string[] = [];
  for (const componentName of componentNames) {
    // Resolve dependencies first
    const tree = await resolveDependencies(componentName, registryResult.registry.items, rootDir);

    for (const item of tree) {
      if (!item.files?.length) continue;

      const filesToAdd = item.files.filter(
        f => f.type === 'registry:ui' || f.type === 'registry:style' || f.type === 'registry:lib'
      );

      // Collect dependencies
      if (item.dependencies) {
        for (const dep of item.dependencies) {
          if (!allDeps.includes(dep)) allDeps.push(dep);
        }
      }
      if (item.devDependencies) {
        for (const dep of item.devDependencies) {
          if (!allDevDeps.includes(dep)) allDevDeps.push(dep);
        }
      }
      if (filesToAdd.length > 0) {
        await updateFiles(filesToAdd, targetDir, updateOpts);
        added += filesToAdd.length;
      }
    }
  }

  // Install collected dependencies
  if (allDeps.length > 0 || allDevDeps.length > 0) {
    await updateDependencies(allDeps, allDevDeps, config);
  }
  console.log(`\n✔ Added ${added} file(s) to ${path.relative(config.resolvedPaths.cwd, targetDir)}`);
}

/**
 * Resolve a component and its registry dependencies into a flat list.
 */
async function resolveDependencies(
  componentName: string,
  allItems: RegistryItem[],
  rootDir: string
): Promise<RegistryItem[]> {
  const resolved = new Map<string, RegistryItem>();
  const queue = [componentName];

  while (queue.length > 0) {
    const name = queue.shift()!;
    if (resolved.has(name)) continue;

    const item = allItems.find(i => i.name === name);
    if (!item) {
      console.warn(`  ⚠ Component not found in registry: ${name}`);
      continue;
    }

    const resolvedItem = await createRegistryItem(item, rootDir);
    resolved.set(name, resolvedItem);

    // Queue dependencies
    if (item.registryDependencies) {
      for (const dep of item.registryDependencies) {
        if (!resolved.has(dep)) {
          queue.push(dep);
        }
      }
    }
  }

  return Array.from(resolved.values());
}
