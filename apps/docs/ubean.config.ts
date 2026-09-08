import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'ubean';
import UiResolver from '../../packages/ui/src/resolver';
import { encodeBase64Utf8 } from './src/shared/encode';
import { collectDocsRoutes } from './build/docs-routes';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

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
const SHIKI_THEMES = { light: 'one-light', dark: 'one-dark-pro' } as const;

// Top-level await: shiki's codeToHtml is sync once the highlighter exists.
const { createHighlighter } = await import('shiki');
const shikiHighlighter = await createHighlighter({
  themes: Object.values(SHIKI_THEMES),
  langs: SHIKI_LANGS
});

/**
 * markdown-it `highlight` hook wired through `markdown.markdownExit`.
 * ubean@0.4.1 does not wire `markdown.theme` to shiki itself, so dual-theme
 * highlighting is provided here (same one-light / one-dark-pro pair the old
 * site used via @shikijs/markdown-exit; `defaultColor: false` emits
 * --shiki-light/--shiki-dark css vars consumed by src/styles/global.css).
 */
function highlightCode(code: string, lang: string) {
  const loaded = shikiHighlighter.getLoadedLanguages() as string[];
  const language = loaded.includes(lang) ? lang : 'text';
  const normalized = code.replace(/\n$/, '');

  const html = shikiHighlighter.codeToHtml(normalized, {
    lang: language,
    themes: SHIKI_THEMES,
    defaultColor: false
  });

  return wrapFenceWithCopyButton(html, lang, normalized);
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
function wrapFenceWithCopyButton(shikiHtml: string, lang: string, code: string) {
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

/**
 * Concrete prerender routes: static shell pages + every content slug mapped
 * through the shared route model in `build/docs-routes.ts` (content lives under
 * `src/content/{en,zh}` with section folders; dynamic param routes are not
 * expanded by `prerender.all`).
 */
const prerenderRoutes = await collectDocsRoutes(rootDir);

export default defineConfig({
  mode: 'ssg',
  favicon: 'https://r2.soybeanjs.tech/soybeanjs/logo-soybean-ui.svg?v=202608192144',
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en', name: 'English' },
      { code: 'zh', language: 'zh-CN', name: '中文', dir: 'ltr' }
    ],
    strategy: 'prefix_except_default'
  },
  markdown: {
    enabled: true,
    theme: {
      light: SHIKI_THEMES.light,
      dark: SHIKI_THEMES.dark
    },
    markdownExit: {
      highlight: highlightCode
    },
    wrapperClass: 'markdown-wrapper',
    components: {
      // allow <UsageCode /> / <PlaygroundGallery /> / <ComponentApi /> in .md
      autoImport: true
    }
  },
  components: {
    dirs: ['src/components'],
    resolvers: [UiResolver()]
  },
  autoImports: {
    // NOTE: `vue: true` injects a `vue/macros` preset that vue@3.5 does not
    // export under node conditions (breaks SSR). Import vue APIs explicitly.
    vueRouter: true,
    vueI18n: true
  },
  // Theme state is owned by @soybeanjs/theme (createThemeInitScript in app.ts);
  // disabling the built-in colorMode avoids a second, conflicting source.
  colorMode: false,
  prerender: {
    all: false,
    include: prerenderRoutes,
    crawlLinks: true,
    failOnError: false
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'connect-src': ["'self'", 'ws:', 'wss:', 'https://api.iconify.design']
      }
    }
  }
});
