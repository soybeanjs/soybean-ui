/**
 * Transform import paths in component source code.
 *
 * This rewrites workspace-internal imports (like @/styles/button or
 * @/registry/ui/button) to match the user's configured aliases.
 */

export interface TransformContext {
  /** User's tsconfig alias for components, e.g. "@/components" */
  componentsAlias: string;
  /** User's tsconfig alias for ui, e.g. "@/components/ui" */
  uiAlias: string;
  /** User's tsconfig alias for utils, e.g. "@/lib/utils" */
  utilsAlias: string;
  /** User's tsconfig alias for lib, e.g. "@/lib" */
  libAlias: string;
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
 * Transform import paths in source code based on user config.
 *
 * @param source - The original source code
 * @param ctx - User's configured aliases
 * @param style - The style preset being used (e.g. "soybean")
 */
export function transformImports(source: string, ctx: TransformContext, style: string): string {
  let result = source;

  // Rewrite @/registry/<style>/ui → user's ui alias
  result = result.replace(new RegExp(`@/registry/${style}/ui`, 'g'), ctx.uiAlias);

  // Rewrite @/registry/<style>/components → user's components alias
  result = result.replace(new RegExp(`@/registry/${style}/components`, 'g'), ctx.componentsAlias);

  // Rewrite @/registry/<style>/lib → user's lib alias
  result = result.replace(new RegExp(`@/registry/${style}/lib`, 'g'), ctx.libAlias);

  // Rewrite @/registry/<style>/lib/utils → user's utils alias
  result = result.replace(new RegExp(`@/registry/${style}/lib/utils`, 'g'), ctx.utilsAlias);

  // Rewrite @/styles/ → user's ui alias/styles
  result = result.replace(/@\/styles\//g, `${ctx.uiAlias}/styles/`);

  // Rewrite @/theme → user's ui alias/theme
  result = result.replace(/@\/theme/g, `${ctx.uiAlias}/theme`);

  // Rewrite @/components/ → user's components alias
  if (ctx.componentsAlias !== '@/components') {
    result = result.replace(/@\/components\//g, `${ctx.componentsAlias}/`);
  }

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
