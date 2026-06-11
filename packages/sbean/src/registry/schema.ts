import * as v from 'valibot';

// ---------------------------------------------------------------------------
// Registry item file schema
// ---------------------------------------------------------------------------

export const registryItemFileSchema = v.object({
  path: v.string(),
  type: v.picklist([
    'registry:ui',
    'registry:component',
    'registry:style',
    'registry:lib',
    'registry:hook',
    'registry:theme'
  ]),
  target: v.optional(v.string()),
  content: v.optional(v.string())
});

export type RegistryItemFile = v.InferOutput<typeof registryItemFileSchema>;

// ---------------------------------------------------------------------------
// Registry item type
// ---------------------------------------------------------------------------

export const registryItemTypeSchema = v.picklist([
  'registry:ui',
  'registry:component',
  'registry:style',
  'registry:lib',
  'registry:hook',
  'registry:theme',
  'registry:base',
  'registry:font',
  'registry:block'
]);

export type RegistryItemType = v.InferOutput<typeof registryItemTypeSchema>;

// ---------------------------------------------------------------------------
// CSS variables
// ---------------------------------------------------------------------------

export const registryItemCssVarsSchema = v.optional(
  v.object({
    light: v.optional(v.record(v.string(), v.string())),
    dark: v.optional(v.record(v.string(), v.string()))
  })
);

// ---------------------------------------------------------------------------
// Registry metadata (common metadata for all registry items)
// ---------------------------------------------------------------------------

export const registryItemMetaSchema = v.object({
  registryNamespace: v.optional(v.string()),
  registryUrl: v.optional(v.string()),
  tags: v.optional(v.array(v.string())),
  updated: v.optional(v.string()),
  created: v.optional(v.string()),
  author: v.optional(v.string()),
  source: v.optional(v.string())
});

export type RegistryItemMeta = v.InferOutput<typeof registryItemMetaSchema>;

// ---------------------------------------------------------------------------
// Tailwind/UnoCSS config (for sbean, this is UnoCSS config)
// ---------------------------------------------------------------------------

export const registryItemUnoSchema = v.optional(
  v.object({
    config: v.optional(v.object({}))
  })
);

// ---------------------------------------------------------------------------
// Font schema (for registry:font items)
// ---------------------------------------------------------------------------

export const registryItemFontSchema = v.object({
  family: v.string(),
  weight: v.optional(v.string()),
  style: v.optional(v.string()),
  display: v.optional(v.string()),
  src: v.string()
});

// ---------------------------------------------------------------------------
// Common fields shared by all registry items
// ---------------------------------------------------------------------------

export const registryItemCommonSchema = v.object({
  $schema: v.optional(v.string()),
  extends: v.optional(v.string()),
  name: v.string(),
  title: v.optional(v.string()),
  author: v.optional(v.pipe(v.string(), v.minLength(2))),
  description: v.optional(v.string()),
  keywords: v.optional(v.array(v.string())),
  license: v.optional(v.string()),
  version: v.optional(v.string()),
  dependencies: v.optional(v.array(v.string())),
  devDependencies: v.optional(v.array(v.string())),
  registryDependencies: v.optional(v.array(v.string())),
  files: v.optional(v.array(registryItemFileSchema)),
  uno: registryItemUnoSchema,
  cssVars: registryItemCssVarsSchema,
  css: v.optional(v.string()),
  meta: v.optional(registryItemMetaSchema),
  docs: v.optional(v.string()),
  categories: v.optional(v.array(v.string())),
  tags: v.optional(v.array(v.string())),
  preview: v.optional(v.string()),
  deprecated: v.optional(v.boolean())
});

// ---------------------------------------------------------------------------
// Discriminated union: registry:base | registry:font | everything else
// ---------------------------------------------------------------------------

export const registryItemSchema = v.variant('type', [
  v.object({
    ...registryItemCommonSchema.entries,
    type: v.literal('registry:base'),
    config: v.optional(v.object({}))
  }),
  v.object({
    ...registryItemCommonSchema.entries,
    type: v.literal('registry:font'),
    font: registryItemFontSchema
  }),
  v.object({
    ...registryItemCommonSchema.entries,
    type: v.picklist([
      'registry:ui',
      'registry:component',
      'registry:style',
      'registry:lib',
      'registry:hook',
      'registry:theme',
      'registry:block'
    ])
  })
]);

export type RegistryItem = v.InferOutput<typeof registryItemSchema>;

// ---------------------------------------------------------------------------
// Registry (registry.json)
// ---------------------------------------------------------------------------

export const registrySchema = v.object({
  $schema: v.optional(v.string()),
  name: v.string(),
  homepage: v.string(),
  include: v.optional(v.array(v.string())),
  items: v.array(registryItemSchema)
});

export type Registry = v.InferOutput<typeof registrySchema>;

// ---------------------------------------------------------------------------
// Registry index (array of items)
// ---------------------------------------------------------------------------

export const registryIndexSchema = v.array(registryItemSchema);

// ---------------------------------------------------------------------------
// Resolved tree (after dependency resolution)
// ---------------------------------------------------------------------------

export const registryResolvedItemsTreeSchema = v.pick(registryItemCommonSchema, [
  'dependencies',
  'devDependencies',
  'files',
  'uno',
  'cssVars',
  'css',
  'docs'
]);

export type RegistryResolvedItemsTree = v.InferOutput<typeof registryResolvedItemsTreeSchema>;

// ---------------------------------------------------------------------------
// Registry dependency graph types
// ---------------------------------------------------------------------------

/**
 * An edge in the registry dependency graph.
 */
export interface RegistryDependencyEdge {
  /** The dependent component name */
  from: string;
  /** The dependency component name */
  to: string;
  /** Type of dependency */
  type: 'registry' | 'file' | 'package';
}

/**
 * Result of validating registry dependencies.
 */
export interface RegistryDependencyValidation {
  /** Whether the dependency graph is valid */
  valid: boolean;
  /** Detected circular dependencies, if any */
  circularDependencies: string[][];
  /** Missing dependencies (referenced but not declared) */
  missingDependencies: string[];
  /** File-level dependency nodes */
  fileDependencies: RegistryDependencyEdge[];
}

/**
 * Validate registry item dependencies.
 * Checks for circular dependencies and missing references.
 */
export function validateRegistryDependencies(items: RegistryItem[]): RegistryDependencyValidation {
  const itemNames = new Set(items.map(i => i.name));
  const edges: RegistryDependencyEdge[] = [];
  const missingDeps = new Set<string>();

  // Build dependency graph
  for (const item of items) {
    // Registry dependencies
    for (const dep of item.registryDependencies ?? []) {
      edges.push({ from: item.name, to: dep, type: 'registry' });

      if (!itemNames.has(dep)) {
        missingDeps.add(dep);
      }
    }

    // Package dependencies (informational only)
    for (const dep of item.dependencies ?? []) {
      edges.push({ from: item.name, to: dep, type: 'package' });
    }

    // File-level dependencies
    for (const file of item.files ?? []) {
      const importedPaths = extractImportPaths(file.content ?? '');
      for (const importedPath of importedPaths) {
        if (importedPath.startsWith('.')) {
          edges.push({ from: item.name, to: importedPath, type: 'file' });
        }
      }
    }
  }

  // Detect circular dependencies
  const circularDeps = detectCircularDependencies(edges, itemNames);

  return {
    valid: circularDeps.length === 0 && missingDeps.size === 0,
    circularDependencies: circularDeps,
    missingDependencies: [...missingDeps],
    fileDependencies: edges.filter(e => e.type === 'file')
  };
}

/**
 * Extract import paths from source code content.
 */
function extractImportPaths(content: string): string[] {
  const importMatches = content.matchAll(/(?:import|export)\s+(?:[^'";]+?\s+from\s+)?['"]([^'"]+)['"]/g);
  return [...importMatches].map(match => match[1]);
}

/**
 * Detect circular dependencies in the registry dependency graph.
 */
function detectCircularDependencies(edges: RegistryDependencyEdge[], itemNames: Set<string>): string[][] {
  // Build adjacency list (registry + file deps only)
  const graph = new Map<string, Set<string>>();
  for (const name of itemNames) {
    graph.set(name, new Set());
  }

  for (const edge of edges) {
    if (edge.type === 'registry' || edge.type === 'file') {
      const deps = graph.get(edge.from);
      if (deps) {
        // For file deps, resolve to closest registry item
        const resolved = edge.type === 'registry' ? edge.to : findMatchingItem(edge.to, itemNames);
        if (resolved) {
          deps.add(resolved);
        }
      }
    }
  }

  // Find cycles using DFS
  const cycles: string[][] = [];
  const visited = new Set<string>();
  const stack = new Set<string>();

  function dfs(node: string): void {
    visited.add(node);
    stack.add(node);

    const neighbors = graph.get(node);
    if (neighbors) {
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        } else if (stack.has(neighbor)) {
          cycles.push([neighbor, node]);
        }
      }
    }

    stack.delete(node);
  }

  for (const name of itemNames) {
    if (!visited.has(name)) {
      dfs(name);
    }
  }

  return cycles;
}

/**
 * Find a matching registry item name from a file path.
 */
function findMatchingItem(path: string, itemNames: Set<string>): string | null {
  const segments = path.replace(/^\.\//, '').split('/');
  for (const segment of segments) {
    if (itemNames.has(segment)) {
      return segment;
    }
  }
  return null;
}
