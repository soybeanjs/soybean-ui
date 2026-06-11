import { existsSync, statSync } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchRegistryItem } from '../registry/fetcher';
import { readRegistryWithIncludes } from '../registry/loader';
import type { RegistryItem, RegistryItemFile } from '../registry/schema';
import type { Config } from './get-config';
import { updateDependencies } from './updaters/update-dependencies';
import { updateFiles } from './updaters/update-files';
import type { UpdateFilesOptions } from './updaters/update-files';

export interface AddComponentsOptions {
  overwrite: boolean;
  path?: string;
  dryRun?: boolean;
  diff?: boolean;
  silent?: boolean;
}

const WRITABLE_FILE_TYPES = new Set(['registry:ui', 'registry:style', 'registry:lib', 'registry:theme']);
const SOURCE_ROOT = findWorkspaceSourceRoot();

/**
 * Add components to a project — the core copy-paste engine.
 *
 * Supports multiple modes:
 * - Normal: write files to disk, install dependencies
 * - dry-run: preview what would be written without modifying files
 * - diff: show differences between existing files and registry
 *
 * First tries the local registry.json, then falls back to remote fetching
 * from https://ui.soybeanjs.cn/r/{name}.json.
 */
export async function addComponents(
  componentNames: string[],
  config: Config,
  options: AddComponentsOptions
): Promise<void> {
  const targetDir = options.path ? path.resolve(config.resolvedPaths.cwd, options.path) : config.resolvedPaths.ui;
  const silent = options.silent ?? false;

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
    transformCtx,
    libDir: config.resolvedPaths.lib,
    dryRun: options.dryRun,
    diff: options.diff,
    silent
  };

  const allDeps: string[] = [];
  const allDevDeps: string[] = [];

  // Try local registry first
  const registryFile = path.join(config.resolvedPaths.cwd, 'registry.json');
  let localItems: RegistryItem[] | null = null;

  try {
    const result = await readRegistryWithIncludes(registryFile, {
      cwd: config.resolvedPaths.cwd
    });
    localItems = result.registry.items;
  } catch {
    // No local registry — will use remote
  }

  let added = 0;
  const addedFiles: string[] = [];

  const resolveRegistryDependencyName = (dependencyName: string, item: RegistryItem): string => {
    if (dependencyName.startsWith('@')) {
      return dependencyName;
    }

    const registryNamespace = typeof item.meta?.registryNamespace === 'string' ? item.meta.registryNamespace : null;

    if (!registryNamespace || registryNamespace === '@soybean' || registryNamespace === '@sbean') {
      return dependencyName;
    }

    return `${registryNamespace}/${dependencyName}`;
  };

  const queue = [...componentNames];
  const queued = new Set(componentNames);
  const processed = new Set<string>();

  while (queue.length > 0) {
    const componentName = queue.shift();

    if (!componentName || processed.has(componentName)) {
      continue;
    }

    processed.add(componentName);

    const item = await loadRegistryItem(componentName, localItems, config);

    if (!item) {
      if (!silent) {
        console.warn(`  ⚠ Component "${componentName}" not found in local or remote registry.`);
        console.warn(`    Run "sbean search" to see available components.`);
      }
      continue;
    }

    collectPackageDependencies(item, allDeps, allDevDeps);

    const expandedFiles = item.files?.length ? await expandRegistryItemFiles(item.files) : [];
    const filesToAdd = expandedFiles.filter(file => WRITABLE_FILE_TYPES.has(file.type));

    if (filesToAdd.length > 0) {
      const filesAdded = await updateFiles(filesToAdd, targetDir, updateOpts);
      added += filesToAdd.length;
      addedFiles.push(...filesAdded);
    }

    const registryDependencies = [...(item.registryDependencies ?? []), ...inferRegistryDependencies(expandedFiles)];

    for (const dependencyName of registryDependencies) {
      const resolvedDependencyName = resolveRegistryDependencyName(dependencyName, item);

      if (processed.has(resolvedDependencyName) || queued.has(resolvedDependencyName)) {
        continue;
      }

      queue.push(resolvedDependencyName);
      queued.add(resolvedDependencyName);
    }
  }

  // Handle dry-run mode
  if (options.dryRun) {
    if (!silent) {
      console.log('\n📋 Dry-run preview: The following changes would be made:\n');
      if (addedFiles.length > 0) {
        console.log('📝 Files:');
        for (const file of addedFiles) {
          console.log(`   + ${file}`);
        }
      }
      if (allDeps.length > 0 || allDevDeps.length > 0) {
        console.log('\n📦 Dependencies:');
        if (allDeps.length > 0) {
          console.log(`   + ${allDeps.join(', ')}`);
        }
        if (allDevDeps.length > 0) {
          console.log(`   + ${allDevDeps.join(', ')} (dev)`);
        }
      }
      console.log(`\n✨ Use without --dry-run to apply these changes.`);
    }
    return;
  }

  // Install collected dependencies
  if (allDeps.length > 0 || allDevDeps.length > 0) {
    await updateDependencies(allDeps, allDevDeps, config);
  }

  if (!silent) {
    console.log(`\n✔ Added ${added} file(s) to ${path.relative(config.resolvedPaths.cwd, targetDir)}`);
  }
}

async function loadRegistryItem(
  componentName: string,
  localItems: RegistryItem[] | null,
  config: Config
): Promise<RegistryItem | null> {
  if (localItems) {
    const localItem = localItems.find(item => item.name === componentName);

    if (localItem) {
      return localItem;
    }
  }

  return fetchRegistryItem(componentName, config);
}

function collectPackageDependencies(item: RegistryItem, dependencies: string[], devDependencies: string[]) {
  for (const dependency of item.dependencies ?? []) {
    if (!dependencies.includes(dependency)) {
      dependencies.push(dependency);
    }
  }

  for (const dependency of item.devDependencies ?? []) {
    if (!devDependencies.includes(dependency)) {
      devDependencies.push(dependency);
    }
  }
}

export async function expandRegistryItemFiles(files: RegistryItemFile[]): Promise<RegistryItemFile[]> {
  if (!SOURCE_ROOT) {
    return files;
  }

  const expandedFiles = new Map(files.map(file => [normalizePath(file.path), file]));
  const queue = [...files];

  while (queue.length > 0) {
    const currentFile = queue.shift();

    if (!currentFile?.content) {
      continue;
    }

    const dependencyPaths = resolveSourceDependencyPaths(currentFile);

    for (const dependencyPath of dependencyPaths) {
      const normalizedDependencyPath = normalizePath(path.relative(SOURCE_ROOT, dependencyPath));

      if (expandedFiles.has(normalizedDependencyPath)) {
        continue;
      }

      const content = await readSourceFile(dependencyPath);

      if (!content) {
        continue;
      }

      const dependencyFile: RegistryItemFile = {
        path: normalizedDependencyPath,
        type: inferRegistryFileType(normalizedDependencyPath),
        content
      };

      expandedFiles.set(normalizedDependencyPath, dependencyFile);
      queue.push(dependencyFile);
    }
  }

  return [...expandedFiles.values()];
}

function inferRegistryDependencies(files: RegistryItemFile[]): string[] {
  const dependencies = new Set<string>();

  for (const file of files) {
    if (!file.content) {
      continue;
    }

    const importSpecifiers = extractImportSpecifiers(file.content);

    for (const specifier of importSpecifiers) {
      const dependencyName = resolveRegistryDependencyFromSpecifier(file.path, specifier);

      if (dependencyName) {
        dependencies.add(dependencyName);
      }
    }
  }

  return [...dependencies];
}

function resolveRegistryDependencyFromSpecifier(filePath: string, specifier: string): string | null {
  if (specifier === '@/theme' || specifier.startsWith('@/theme/')) {
    return 'theme';
  }

  if (!specifier.startsWith('.')) {
    return null;
  }

  const sourceRootPath = getComponentSourcePath(filePath);

  if (!sourceRootPath) {
    return null;
  }

  const resolvedPath = normalizePath(
    path.posix.normalize(path.posix.join(path.posix.dirname(sourceRootPath), specifier))
  );
  const componentsMarker = '/components/';
  const markerIndex = resolvedPath.indexOf(componentsMarker);

  if (markerIndex < 0) {
    return null;
  }

  const componentRelativePath = resolvedPath.slice(markerIndex + componentsMarker.length);
  const [componentName] = componentRelativePath.split('/');

  if (!componentName) {
    return null;
  }

  return componentName;
}

function resolveSourceDependencyPaths(file: RegistryItemFile): string[] {
  return extractImportSpecifiers(file.content ?? '')
    .map(specifier => resolveSourceDependencyPath(file.path, specifier))
    .filter((dependencyPath): dependencyPath is string => Boolean(dependencyPath));
}

function resolveSourceDependencyPath(filePath: string, specifier: string): string | null {
  if (!SOURCE_ROOT) {
    return null;
  }

  const sourceFilePath = path.join(SOURCE_ROOT, filePath);

  if (specifier.startsWith('.')) {
    return resolveWithExtensions(path.resolve(path.dirname(sourceFilePath), specifier));
  }

  if (specifier === '@/theme') {
    return resolveWithExtensions(path.join(SOURCE_ROOT, 'packages/ui/src/theme/index'));
  }

  if (specifier.startsWith('@/theme/')) {
    return resolveWithExtensions(path.join(SOURCE_ROOT, 'packages/ui/src/theme', specifier.slice('@/theme/'.length)));
  }

  if (specifier.startsWith('@/styles/')) {
    return resolveWithExtensions(path.join(SOURCE_ROOT, 'packages/ui/src/styles', specifier.slice('@/styles/'.length)));
  }

  if (specifier.startsWith('@/components/')) {
    return resolveWithExtensions(
      path.join(SOURCE_ROOT, 'packages/ui/src/components', specifier.slice('@/components/'.length))
    );
  }

  return null;
}

function resolveWithExtensions(basePath: string): string | null {
  const candidates = [
    `${basePath}.ts`,
    `${basePath}.vue`,
    `${basePath}.js`,
    path.join(basePath, 'index.ts'),
    path.join(basePath, 'index.vue'),
    path.join(basePath, 'index.js'),
    basePath
  ];

  return candidates.find(candidate => isExistingFile(candidate)) ?? null;
}

function inferRegistryFileType(filePath: string): RegistryItemFile['type'] {
  const normalizedPath = normalizePath(filePath);

  if (normalizedPath.includes('/styles/')) {
    return 'registry:style';
  }

  if (normalizedPath.includes('/theme/')) {
    return 'registry:theme';
  }

  if (normalizedPath.endsWith('.vue')) {
    return 'registry:ui';
  }

  return 'registry:lib';
}

function extractImportSpecifiers(source: string): string[] {
  const importMatches = source.matchAll(/(?:import|export)\s+(?:[^'";]+?\s+from\s+)?['"]([^'"]+)['"]/g);
  const dynamicImportMatches = source.matchAll(/import\(\s*['"]([^'"]+)['"]\s*\)/g);

  return [...importMatches, ...dynamicImportMatches].map(match => match[1]);
}

function getComponentSourcePath(filePath: string): string | null {
  const normalizedPath = normalizePath(filePath);
  const componentMarker = 'packages/ui/src';

  if (!normalizedPath.startsWith(componentMarker)) {
    return null;
  }

  return normalizedPath.slice(componentMarker.length + 1);
}

function normalizePath(filePath: string): string {
  return filePath.replace(/\\/g, '/');
}

async function readSourceFile(filePath: string): Promise<string | null> {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch {
    return null;
  }
}

function findWorkspaceSourceRoot(): string | null {
  let currentDir = path.dirname(fileURLToPath(import.meta.url));

  while (true) {
    if (existsSync(path.join(currentDir, 'packages/ui/src'))) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);

    if (parentDir === currentDir) {
      return null;
    }

    currentDir = parentDir;
  }
}

function isExistingFile(filePath: string): boolean {
  if (!existsSync(filePath)) {
    return false;
  }

  try {
    return statSync(filePath).isFile();
  } catch {
    return false;
  }
}
