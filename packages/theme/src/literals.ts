import type { LiteralToken, TokenPrefix } from './types';

/**
 * The literal (non-color) layer (docs/theme.md §4.9).
 *
 * Dimension, elevation shadows, motion and layering tokens. These are plain CSS
 * values (not palette references), which is why they live beside — not inside —
 * the color maps.
 */

/**
 * the default literal values, in declaration order.
 *
 * `radius` is a seed: the scale is derived from it with `calc()` so a single
 * knob keeps inner/outer radii consistent (this also fixes the pre-refactor
 * mismatch where the token and the utility scale disagreed).
 */
export const LITERAL_DEFAULTS: Record<LiteralToken, string> = {
  size: '16px',
  radius: '0.625rem',
  'radius-2xs': 'calc(var(--radius) - 8px)',
  'radius-xs': 'calc(var(--radius) - 6px)',
  'radius-sm': 'calc(var(--radius) - 4px)',
  'radius-md': 'calc(var(--radius) - 2px)',
  'radius-lg': 'var(--radius)',
  'radius-xl': 'calc(var(--radius) + 4px)',
  'radius-2xl': 'calc(var(--radius) + 8px)',
  'control-height-sm': '2rem',
  'control-height': '2.25rem',
  'control-height-lg': '2.5rem',
  'space-gutter': '1rem',
  'space-section': '1.5rem',
  'space-gap': '0.5rem',
  'space-control-x': '0.75rem',
  'space-control-y': '0.375rem',
  'shadow-color': 'rgb(0 0 0 / 0.1)',
  'shadow-xs': '0 1px 2px 0 var(--shadow-color)',
  'shadow-sm': '0 1px 3px 0 var(--shadow-color), 0 1px 2px -1px var(--shadow-color)',
  'shadow-md': '0 4px 6px -1px var(--shadow-color), 0 2px 4px -2px var(--shadow-color)',
  'shadow-lg': '0 10px 15px -3px var(--shadow-color), 0 4px 6px -4px var(--shadow-color)',
  'duration-fast': '100ms',
  'duration-base': '150ms',
  'duration-slow': '250ms',
  'ease-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
  'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'ease-spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  'z-layout': '10',
  'z-base': '50',
  'z-toast': '100',
  'z-max': '2147483647',
  'border-width': '1px',
  'border-width-strong': '2px',
  'ring-width': '3px',
  'ring-offset-width': '2px',
  'font-sans': `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
  'font-heading': `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif`,
  'font-mono': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  'text-4xs': '0.375rem',
  'text-3xs': '0.5rem',
  'text-2xs': '0.625rem',
  'text-xs': '0.75rem',
  'text-sm': '0.875rem',
  'text-base': '1rem',
  'text-lg': '1.125rem',
  'text-xl': '1.25rem',
  'text-2xl': '1.5rem',
  'leading-4xs': '0.5rem',
  'leading-3xs': '0.625rem',
  'leading-2xs': '0.75rem',
  'leading-xs': '1rem',
  'leading-sm': '1.25rem',
  'leading-base': '1.5rem',
  'leading-lg': '1.75rem',
  'leading-xl': '1.75rem',
  'leading-2xl': '2rem',
  'line-height-normal': '1.5'
};

/**
 * literal tokens whose value differs between modes.
 */
export const DARK_LITERALS: Partial<Record<LiteralToken, string>> = {
  'shadow-color': 'rgb(0 0 0 / 0.4)'
};

/**
 * the CSS variable name of a literal token, honoring the prefix.
 */
export function literalVar(token: LiteralToken, prefix: TokenPrefix): string {
  return prefix ? `--${prefix}-${token}` : `--${token}`;
}

/**
 * resolve the literal layer for a theme.
 *
 * `size` / `radius` are the resolved base tokens; every `calc()` in the scale is
 * rewritten to the actual radius variable so the derivation survives prefixing.
 */
export function literalTokens(input: {
  size: string;
  radius: string;
  prefix?: TokenPrefix;
}): Record<LiteralToken, string> {
  const { size, radius, prefix = 'vean' } = input;
  const radiusRef = `var(${literalVar('radius', prefix)})`;
  const shadowColorRef = `var(${literalVar('shadow-color', prefix)})`;

  return Object.entries({ ...LITERAL_DEFAULTS, size, radius }).reduce<Record<string, string>>(
    (acc, [token, value]) =>
      Object.assign(acc, {
        [token]: value.replaceAll('var(--radius)', radiusRef).replaceAll('var(--shadow-color)', shadowColorRef)
      }),
    {}
  ) as Record<LiteralToken, string>;
}
