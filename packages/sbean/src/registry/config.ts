import * as v from 'valibot';

// ---------------------------------------------------------------------------
// SBean config (sbean.json) — the user-facing project config
// ---------------------------------------------------------------------------

export const PRESET_ICON_LIBRARIES = ['lucide', 'material-symbols', 'ph', 'tabler', 'solar', 'radix-icons'] as const;

export const PRESET_RADII = ['md', 'none', '2xs', 'xs', 'sm', 'lg', 'xl', '2xl'] as const;

export const PRESET_BASE_COLORS = ['zinc', 'neutral', 'stone', 'slate', 'gray'] as const;

export const PRESET_PRIMARY_COLORS = [
  'indigo',
  'blue',
  'green',
  'red',
  'amber',
  'cyan',
  'emerald',
  'fuchsia',
  'lime',
  'orange',
  'pink',
  'purple',
  'rose',
  'sky',
  'teal',
  'violet',
  'yellow'
] as const;

export const PRESET_STYLES = ['soybean', 'clean', 'dense'] as const;

export const PRESET_FONTS = [
  'inter',
  'noto-sans',
  'roboto',
  'raleway',
  'dm-sans',
  'public-sans',
  'outfit',
  'jetbrains-mono',
  'geist',
  'montserrat',
  'ibm-plex-sans',
  'source-sans-3',
  'instrument-sans'
] as const;

export const rawConfigSchema = v.object({
  $schema: v.optional(v.string()),
  style: v.picklist(PRESET_STYLES),
  iconLibrary: v.picklist(PRESET_ICON_LIBRARIES),
  uno: v.object({
    base: v.picklist(PRESET_BASE_COLORS),
    primary: v.picklist(PRESET_PRIMARY_COLORS),
    chart: v.optional(v.picklist(PRESET_PRIMARY_COLORS)),
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
  aliases: v.object({
    components: v.string(),
    utils: v.string(),
    ui: v.optional(v.string()),
    lib: v.optional(v.string())
  })
});

export type RawConfig = v.InferOutput<typeof rawConfigSchema>;

// ---------------------------------------------------------------------------
// Resolved config — with resolved absolute paths
// ---------------------------------------------------------------------------

export const configSchema = v.object({
  ...rawConfigSchema.entries,
  resolvedPaths: v.object({
    cwd: v.string(),
    components: v.string(),
    utils: v.string(),
    ui: v.string(),
    lib: v.string()
  })
});

export type Config = v.InferOutput<typeof configSchema>;
