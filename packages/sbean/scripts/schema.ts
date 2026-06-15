/**
 * Generate JSON Schema files from Valibot schema definitions.
 *
 * Converts the Valibot schemas in src/registry/ to JSON Schema (draft-07)
 * format, enriched with descriptions, and writes them to
 * apps/docs/public/schema/ for IDE validation and documentation.
 *
 * Usage:
 *   pnpm --filter sbean build:schema
 *   tsx packages/sbean/scripts/schema.ts --output apps/docs/public/schema
 */

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { toJsonSchema } from '@valibot/to-json-schema';
import type { JsonSchema } from '@valibot/to-json-schema';
import { rawConfigSchema } from '../src/registry/config';
import { registryItemSchema, registrySchema } from '../src/registry/schema';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Schema enrichment: descriptions and extra defaults that Valibot schemas don't
 * carry natively. The structure mirrors the JSON Schema properties tree.
 */
interface SchemaEnrichment {
  $schema?: string;
  description?: string;
  properties?: Record<string, SchemaEnrichment>;
  default?: unknown;
}

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const REPO_ROOT = path.resolve(fileURLToPath(import.meta.url), '../../../..');
const DEFAULT_OUTPUT_DIR = path.join(REPO_ROOT, 'apps/docs/public/schema');

// ---------------------------------------------------------------------------
// Enrichment data — descriptions & extra defaults
// ---------------------------------------------------------------------------

const SBEAN_ENRICHMENT: SchemaEnrichment = {
  description: 'SBean project configuration file. Defines component style, aliases, and UnoCSS settings.',
  properties: {
    $schema: {
      description:
        'JSON Schema reference for this config. Set to "https://ui.soybeanjs.cn/schema/sbean.json" for validation.'
    },
    style: {
      description:
        'The design style preset. "soybean" is the default — a balanced, modern look. "clean" is minimal with sharper corners. "dense" is compact for data-heavy interfaces.',
      default: 'soybean'
    },
    iconLibrary: {
      description: 'The Iconify icon set to use. Components use icons from this set via SIcon.',
      default: 'lucide'
    },
    uno: {
      description: 'UnoCSS theme configuration. Controls the CSS variable system via @soybeanjs/unocss-shadcn.',
      properties: {
        base: {
          description: 'Base color palette for backgrounds, borders, and muted elements.',
          default: 'zinc'
        },
        primary: {
          description: 'Primary brand color for buttons, links, and accents.',
          default: 'indigo'
        },
        feedback: {
          description: 'Feedback color preset for success, warning, error, and info states.',
          default: 'classic'
        },
        size: {
          description: 'Component size/density preset. Controls the base font size and spacing.',
          default: 'md'
        },
        radius: {
          description: 'Default border radius for components.',
          default: 'md'
        }
      }
    },
    font: {
      description: 'Font family configuration for the project.',
      properties: {
        sans: {
          description:
            'Sans-serif font family for body text. Set to a font key from the preset list to load it, or omit for system default.'
        },
        heading: {
          description: 'Heading font family. Set to "inherit" to use the sans font, or pick a specific font key.'
        }
      }
    },
    menu: {
      description: 'Navigation / sidebar menu styling configuration.',
      properties: {
        accent: {
          description: 'Menu accent style. "subtle" is a gentle highlight; "bold" uses stronger colors.'
        },
        color: {
          description: 'Menu color scheme for light/dark mode.'
        }
      }
    },
    registries: {
      description: 'Additional registry URLs for extending the component catalog.'
    }
  }
};

const REGISTRY_ITEM_ENRICHMENT: SchemaEnrichment = {
  description: 'A single item in the sbean registry. Represents a component, style, utility, or theme.',
  properties: {
    $schema: {
      description: 'JSON Schema reference for this item.'
    },
    name: {
      description:
        'The name of the item. Unique within the registry. This is the identifier used by `sbean add <name>`.'
    },
    type: {
      description: "The item type. Determines the target directory and how the item is resolved in the user's project."
    },
    title: {
      description: 'A human-readable title for the item.'
    },
    description: {
      description: 'A short description of the item, shown in search results and the UI.'
    },
    dependencies: {
      description: 'npm package dependencies required by this item.'
    },
    devDependencies: {
      description: 'npm package devDependencies required by this item.'
    },
    registryDependencies: {
      description:
        'Other registry items that this item depends on. They will be added automatically when this item is added.'
    },
    files: {
      description: 'The files that belong to this registry item.',
      properties: {
        path: {
          description: 'Relative path of the file within the UI source directory.'
        },
        type: {
          description: 'The file type. Determines the target sub-directory.'
        },
        target: {
          description: 'Optional override target path. If set, the file is written to this path instead of the default.'
        },
        content: {
          description: 'Inline file content. If omitted, the file is read from the local source path.'
        }
      }
    },
    meta: {
      description: 'Metadata for the registry item.',
      properties: {
        tags: {
          description: 'Tags for categorising the item.'
        }
      }
    },
    docs: {
      description: 'Documentation URL or inline documentation for the item.'
    },
    categories: {
      description: 'Categories for organising items in the registry UI.'
    },
    preview: {
      description: 'URL or path to a preview image for the item.'
    }
  }
};

const REGISTRY_ENRICHMENT: SchemaEnrichment = {
  description: 'A sbean registry of components, styles, utilities, and themes.',
  properties: {
    $schema: {
      description:
        'JSON Schema reference for this registry. Set to "https://ui.soybeanjs.cn/schema/registry.json" for validation.'
    },
    name: {
      description:
        'The registry name. Required when this file is used as the root registry, optional for included registry chunks.'
    },
    homepage: {
      description: 'The registry homepage URL. Required when this file is used as the root registry.'
    },
    include: {
      description:
        'An array of relative paths to registry.json files to include. The included items are merged into this registry.'
    },
    items: {
      description: 'The registry items — components, styles, utilities, and themes.'
    }
  }
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function deepMergeJsonSchema(base: JsonSchema, enrichment: SchemaEnrichment): JsonSchema {
  const result: JsonSchema = { ...base };

  if (enrichment.description !== undefined) {
    result.description = enrichment.description;
  }

  if (enrichment.default !== undefined) {
    result.default = enrichment.default as JsonSchema['default'];
  }

  if (enrichment.properties && typeof result.properties === 'object' && result.properties !== null) {
    const mergedProperties: Record<string, JsonSchema> = {};
    const baseProps = result.properties as Record<string, JsonSchema>;

    for (const [key, baseProp] of Object.entries(baseProps)) {
      const enrichmentProp = enrichment.properties[key];
      mergedProperties[key] = enrichmentProp ? deepMergeJsonSchema(baseProp, enrichmentProp) : baseProp;
    }

    // Also add any enrichment-only properties that might not be in the auto-generated schema
    for (const [key, enrichmentProp] of Object.entries(enrichment.properties)) {
      if (!(key in mergedProperties)) {
        mergedProperties[key] = enrichmentProp as unknown as JsonSchema;
      }
    }

    result.properties = mergedProperties;
  }

  return result;
}

function addSchemaRef(schema: JsonSchema): JsonSchema {
  const { $schema: _, description, ...rest } = schema;
  const result: JsonSchema = {
    $schema: 'https://json-schema.org/draft-07/schema#'
  };
  if (description) {
    result.description = description;
  }
  Object.assign(result, rest);
  return result;
}

/**
 * Add `anyOf` condition to the registry JSON schema: must have either `items` or `include`.
 */
function addRegistryConstraints(schema: JsonSchema): JsonSchema {
  const result: JsonSchema = { ...schema };
  result.anyOf = [{ required: ['items'] } as JsonSchema, { required: ['include'] } as JsonSchema];
  return result;
}

// ---------------------------------------------------------------------------
// Generation
// ---------------------------------------------------------------------------

export async function generateSchemas(outputDir: string): Promise<void> {
  await mkdir(outputDir, { recursive: true });

  // 1. sbean.json — from rawConfigSchema
  const sbeanSchema = addSchemaRef(
    deepMergeJsonSchema(toJsonSchema(rawConfigSchema, { target: 'draft-07' }), SBEAN_ENRICHMENT)
  );
  await writeFile(path.join(outputDir, 'sbean.json'), JSON.stringify(sbeanSchema, null, 2), 'utf-8');
  console.log(`✔ Generated ${path.join(outputDir, 'sbean.json')}`);

  // 2. registry-item.json — from registryItemSchema
  const registryItemSchemaResult = addSchemaRef(
    deepMergeJsonSchema(
      toJsonSchema(registryItemSchema, { target: 'draft-07', errorMode: 'ignore' }),
      REGISTRY_ITEM_ENRICHMENT
    )
  );
  await writeFile(
    path.join(outputDir, 'registry-item.json'),
    JSON.stringify(registryItemSchemaResult, null, 2),
    'utf-8'
  );
  console.log(`✔ Generated ${path.join(outputDir, 'registry-item.json')}`);

  // 3. registry.json — from registrySchema
  const registrySchemaResult = addRegistryConstraints(
    addSchemaRef(
      deepMergeJsonSchema(
        toJsonSchema(registrySchema, { target: 'draft-07', errorMode: 'ignore' }),
        REGISTRY_ENRICHMENT
      )
    )
  );
  await writeFile(path.join(outputDir, 'registry.json'), JSON.stringify(registrySchemaResult, null, 2), 'utf-8');
  console.log(`✔ Generated ${path.join(outputDir, 'registry.json')}`);
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const outputIndex = args.indexOf('--output');
  const outputDir =
    outputIndex >= 0 && outputIndex + 1 < args.length ? path.resolve(args[outputIndex + 1]) : DEFAULT_OUTPUT_DIR;

  console.log(`Generating JSON Schemas → ${outputDir}`);
  await generateSchemas(outputDir);
  console.log('\nDone!');
}

const modulePath = fileURLToPath(import.meta.url);
const entryPath = path.resolve(process.argv[1] ?? '');

if (path.resolve(entryPath) === path.resolve(modulePath)) {
  main().catch(error => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}

export { generateSchemas as generateSchemaData };
