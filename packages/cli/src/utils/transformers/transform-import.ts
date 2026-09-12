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
 */
export function transformImports(source: string, ctx: TransformContext): string {
  const a = ctx.uiAlias;

  let result = source;

  // Rewrite @/styles/ → {a}/styles/
  result = result.replace(/@\/styles\//g, `${a}/styles/`);

  // Rewrite @/theme → {a}/theme
  result = result.replace(/@\/theme/g, `${a}/theme`);

  // Rewrite @/components/ → {a}/components/
  result = result.replace(/@\/components\//g, `${a}/components/`);

  return result;
}

/**
 * Transform icon library prefix in source code.
 */
export function transformIcons(source: string, iconLibrary: string): string {
  const newPrefix = ICONIFY_PREFIX_MAP[iconLibrary] || iconLibrary;

  for (const prefix of Object.values(ICONIFY_PREFIX_MAP)) {
    if (prefix === newPrefix) continue;
    source = source.replace(new RegExp(`(["'])${prefix}:`, 'g'), `$1${newPrefix}:`);
  }

  return source;
}
