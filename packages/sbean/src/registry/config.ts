import {
  themeSizeKeys,
  themeRadiusKeys,
  builtinBasePresetKeys,
  builtinPrimaryPresetKeys,
  builtinFeedbackPresetKeys
} from '@soybeanjs/shadcn-theme';
import * as v from 'valibot';

// ---------------------------------------------------------------------------
// SBean config (sbean.json) — the user-facing project config
// ---------------------------------------------------------------------------

export const PRESET_ICON_LIBRARIES = ['lucide', 'material-symbols', 'ph', 'tabler', 'solar', 'radix-icons'] as const;

export const PRESET_RADII = themeRadiusKeys;

export const PRESET_BASE_COLORS = builtinBasePresetKeys;

export const PRESET_PRIMARY_COLORS = builtinPrimaryPresetKeys;

export const PRESET_STYLES = ['soybean', 'clean', 'dense'] as const;

export const PRESET_FEEDBACK_COLORS = builtinFeedbackPresetKeys;

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
  style: v.picklist(PRESET_STYLES),
  isMonorepo: v.optional(v.boolean(), false),
  isNuxt: v.optional(v.boolean(), false),
  iconLibrary: v.picklist(PRESET_ICON_LIBRARIES),
  uno: v.object({
    base: v.picklist(PRESET_BASE_COLORS),
    primary: v.picklist(PRESET_PRIMARY_COLORS),
    feedback: v.optional(v.picklist(PRESET_FEEDBACK_COLORS)),
    size: v.optional(v.picklist(PRESET_SIZES)),
    radius: v.picklist(PRESET_RADII)
  }),
  font: v.object({
    sans: v.optional(v.picklist(PRESET_FONTS)),
    heading: v.optional(v.picklist(['inherit' as const, ...PRESET_FONTS]))
  }),
  menu: v.object({
    accent: v.picklist(['subtle', 'bold'] as const),
    color: v.picklist(['default', 'inverted', 'default-translucent', 'inverted-translucent'] as const)
  }),
  registries: v.optional(v.record(v.string(), v.string())),
  /** Directory where component sources are placed. Default: src/ui (single) or packages/ui (monorepo). */
  uiDir: v.optional(v.string())
});

export type RawConfig = v.InferOutput<typeof rawConfigSchema>;

// ---------------------------------------------------------------------------
// Resolved config — with resolved absolute paths
// ---------------------------------------------------------------------------

export const configSchema = v.object({
  ...rawConfigSchema.entries,
  resolvedPaths: v.object({
    cwd: v.string(),
    ui: v.string()
  })
});

export type Config = v.InferOutput<typeof configSchema>;
