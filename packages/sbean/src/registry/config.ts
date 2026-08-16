import { themeSizeKeys, themeRadiusKeys, builtinBasePresetKeys, builtinPrimaryPresetKeys } from '@soybeanjs/theme';
import * as v from 'valibot';

// ---------------------------------------------------------------------------
// SBean config (sbean.json) — the user-facing project config
// ---------------------------------------------------------------------------

export const PRESET_ICON_LIBRARIES = ['lucide', 'material-symbols', 'ph', 'tabler', 'solar', 'radix-icons'] as const;

export const PRESET_RADII = themeRadiusKeys;

export const PRESET_BASE_COLORS = builtinBasePresetKeys;

export const PRESET_PRIMARY_COLORS = builtinPrimaryPresetKeys;

export const PRESET_SIZES = themeSizeKeys;

export const PRESET_FONTS = [
  // sans-serif
  'inter',
  'noto-sans',
  'nunito-sans',
  'figtree',
  'roboto',
  'raleway',
  'dm-sans',
  'public-sans',
  'outfit',
  'oxanium',
  'manrope',
  'space-grotesk',
  'geist',
  'montserrat',
  'ibm-plex-sans',
  'source-sans-3',
  'instrument-sans',
  // monospace
  'jetbrains-mono',
  'geist-mono',
  // serif
  'noto-serif',
  'roboto-slab',
  'merriweather',
  'lora',
  'playfair-display',
  'eb-garamond',
  'instrument-serif'
] as const;

export const rawConfigSchema = v.object({
  $schema: v.optional(v.string()),
  iconLibrary: v.picklist(PRESET_ICON_LIBRARIES),
  uno: v.object({
    base: v.picklist(PRESET_BASE_COLORS),
    primary: v.picklist(PRESET_PRIMARY_COLORS),
    size: v.optional(v.picklist(PRESET_SIZES)),
    radius: v.picklist(PRESET_RADII)
  }),
  font: v.object({
    sans: v.optional(v.picklist(PRESET_FONTS)),
    heading: v.optional(v.picklist(['inherit' as const, ...PRESET_FONTS]))
  }),
  /**
   * Import aliases per package (shadcn-vue style, EC-E03). Key = package
   * namespace (ui, ui-x, admin, chart); value = import alias prefix such as
   * `#ui` / `#ui-x` / `@/ui`. The CLI resolves each alias to an output
   * directory (via tsconfig paths, else `src/<package>`).
   */
  aliases: v.optional(v.record(v.string(), v.string())),
  registries: v.optional(v.record(v.string(), v.string()))
});

export type RawConfig = v.InferOutput<typeof rawConfigSchema>;

// ---------------------------------------------------------------------------
// Resolved config — with resolved absolute paths
// ---------------------------------------------------------------------------

export const configSchema = v.object({
  ...rawConfigSchema.entries,
  resolvedPaths: v.object({
    cwd: v.string(),
    /** Core `ui` package output dir (alias `ui`, default `src/ui`). */
    ui: v.string(),
    /** Per-package output dirs: package namespace → absolute directory. */
    packages: v.record(v.string(), v.string())
  })
});

export type Config = v.InferOutput<typeof configSchema>;
