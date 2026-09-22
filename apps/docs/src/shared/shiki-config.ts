/**
 * Dual-theme pair mirrored in `markdown.theme`; `defaultColor: false` emits the
 * `--shiki-light` / `--shiki-dark` css vars consumed by src/styles/global.css.
 * Shared by the Node-side markdown highlight (build/highlight.ts) and the
 * client-side code surfaces (src/shared/highlight.ts).
 */
export const SHIKI_THEMES = { light: 'one-light', dark: 'one-dark-pro' } as const;

/**
 * Languages preloaded for the docs code surfaces. Unknown languages fall back to
 * `text`, a plain-text passthrough rather than a grammar, so it is listed for the
 * fallback target but has no grammar loader.
 */
export const SHIKI_LANGS = [
  'vue',
  'ts',
  'tsx',
  'js',
  'jsx',
  'bash',
  'json',
  'jsonc',
  'html',
  'css',
  'scss',
  'yaml',
  'markdown',
  'text'
] as const;
