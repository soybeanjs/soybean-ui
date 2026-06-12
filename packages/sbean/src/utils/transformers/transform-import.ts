/**
 * Transform import paths in component source code.
 *
 * All workspace-internal imports (like @/styles/button, @/theme,
 * @/components/icon) are rewritten to use the single `#ui/` namespace.
 */

export interface TransformContext {
  /** User's tsconfig alias prefix for ui, e.g. "#ui" */
  uiAlias: string;
  /** Iconify prefix to use, e.g. "lucide" / "material-symbols" */
  iconLibrary: string;
}

const ICONIFY_PREFIX_MAP: Record<string, string> = {
  lucide: 'lucide',
  'material-symbols': 'material-symbols',
  ph: 'ph',
  tabler: 'tabler',
  solar: 'solar',
  'radix-icons': 'radix-icons'
};

/**
 * Transform import paths in source code based on a single `#ui/` alias.
 *
 * All sub-aliases are derived from the single prefix:
 *   components → {uiAlias}/components
 *   styles     → {uiAlias}/styles
 *   theme      → {uiAlias}/theme
 *
 * @param source - The original source code
 * @param ctx - User's configured aliases (just uiAlias + iconLibrary)
 * @param style - The style preset being used (e.g. "soybean")
 */
export function transformImports(source: string, ctx: TransformContext, style: string): string {
  const a = ctx.uiAlias;
  const comp = `${a}/components`;

  let result = source;

  // Rewrite @/registry/<style>/ui → user's ui alias
  result = result.replace(new RegExp(`@/registry/${style}/ui`, 'g'), a);

  // Rewrite @/registry/<style>/components → {a}/components
  result = result.replace(new RegExp(`@/registry/${style}/components`, 'g'), comp);

  // Rewrite @/registry/<style>/lib → {a}/lib
  result = result.replace(new RegExp(`@/registry/${style}/lib`, 'g'), `${a}/lib`);

  // Rewrite @/registry/<style>/lib/utils → {a}/lib/utils
  result = result.replace(new RegExp(`@/registry/${style}/lib/utils`, 'g'), `${a}/lib/utils`);

  // Rewrite @/styles/ → {a}/styles/
  result = result.replace(/@\/styles\//g, `${a}/styles/`);

  // Rewrite @/theme → {a}/theme
  result = result.replace(/@\/theme/g, `${a}/theme`);

  // Rewrite @/components/ → {a}/components/
  result = result.replace(/@\/components\//g, `${comp}/`);

  return result;
}

/**
 * Transform icon library prefix in source code.
 *
 * Replaces the iconify prefix used in component source (e.g. "lucide:chevron-left")
 * with the user's chosen icon library prefix.
 */
export function transformIcons(source: string, iconLibrary: string): string {
  const newPrefix = ICONIFY_PREFIX_MAP[iconLibrary] || iconLibrary;

  // Replace known iconify prefixes with the user's choice
  const KNOWN_PREFIXES = Object.values(ICONIFY_PREFIX_MAP);

  for (const prefix of KNOWN_PREFIXES) {
    if (prefix === newPrefix) continue;
    // Match iconify string references like "prefix:icon-name"
    const regex = new RegExp(`(["'])${prefix}:`, 'g');
    source = source.replace(regex, `$1${newPrefix}:`);
  }

  return source;
}
