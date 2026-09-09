import { createHighlighter } from 'shiki';
import { encodeBase64Utf8 } from '../src/shared/encode';

/** shiki languages preloaded for docs code fences (unknown langs fall back to `text`). */
const SHIKI_LANGS = [
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
];

/** Dual-theme pair mirrored in `markdown.theme`; `defaultColor: false` emits --shiki-light/--shiki-dark css vars consumed by src/styles/global.css. */
export const SHIKI_THEMES = { light: 'one-light', dark: 'one-dark-pro' } as const;

/** markdown-it `highlight` hook signature (`str`, `lang`, `attrs`). */
export type HighlightCode = (code: string, lang: string) => string;

/**
 * Creates the markdown-it `highlight` hook wired through `markdown.markdownExit`.
 *
 * ubean@0.4.1 does not wire `markdown.theme` to shiki itself, so dual-theme
 * highlighting is provided here (same one-light / one-dark-pro pair the old
 * site used via @shikijs/markdown-exit). `codeToHtml` is sync once the
 * highlighter exists, so callers may top-level await this factory and then
 * use the returned hook synchronously.
 */
export async function createMarkdownHighlight(): Promise<HighlightCode> {
  const highlighter = await createHighlighter({
    themes: Object.values(SHIKI_THEMES),
    langs: SHIKI_LANGS
  });
  const loadedLanguages = highlighter.getLoadedLanguages();

  return (code, lang) => {
    const language = loadedLanguages.includes(lang) ? lang : 'text';
    const normalized = code.replace(/\n$/, '');

    const html = highlighter.codeToHtml(normalized, {
      lang: language,
      themes: SHIKI_THEMES,
      defaultColor: false
    });

    return wrapFenceWithCopyButton(html, lang, normalized);
  };
}

/**
 * Fence-level CopyButton injection. ubean only spreads `markdownExit` into the
 * MarkdownIt constructor and never forwards `setupMarkdown`, so the old site's
 * `md.renderer.rules.fence` override is not available. markdown-exit renders a
 * `highlight()` result verbatim when it starts with `<pre`, so the panel
 * wrapper (`md-code-block` + `data-lang` badge) and the `<CopyButton>` usage
 * are injected here; `unplugin-vue-markdown` + component auto-import resolve
 * `<CopyButton>` when the `.md` is compiled into a Vue SFC.
 */
function wrapFenceWithCopyButton(shikiHtml: string, lang: string, code: string): string {
  const openTag = shikiHtml.match(/^<pre([^>]*)>/);
  if (!openTag) {
    return shikiHtml;
  }

  const attrs = openTag[1]
    .replace(/^ class="([^"]*)"/, ` class="$1 md-code-block" data-lang="${lang}"`)
    .replace(/ tabindex="0"/, '');

  const codeBase64 = encodeBase64Utf8(code);

  return `<pre${attrs}><CopyButton code-base64="${codeBase64}" />${shikiHtml.slice(openTag[0].length)}`;
}
