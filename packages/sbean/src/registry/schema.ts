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
  meta: v.optional(v.record(v.string(), v.any())),
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
