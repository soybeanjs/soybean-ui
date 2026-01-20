import type { MarkdownItAsync, PluginSimple } from 'markdown-it-async';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';
import type { MarkdownEnv } from 'unplugin-vue-markdown/dist/types.js';

function encodeBase64Utf8(raw: string): string {
  if (typeof btoa === 'function' && typeof TextEncoder !== 'undefined') {
    const bytes = new TextEncoder().encode(raw);
    let binary = '';
    for (const b of bytes) binary += String.fromCharCode(b);
    return btoa(binary);
  }

  return raw;
}

export const customMarkdownPlugin: PluginSimple = md => {
  playgroundPlugin(md);
  copyCodePlugin(md);
  tooltipPlugin(md);
};

function playgroundPlugin(md: MarkdownItAsync) {
  const origFence = md.renderer.rules.fence?.bind(md.renderer.rules) as RenderRule | undefined;

  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const info = (token.info || '').trim();

    if (info === 'playground') {
      const files = token.content
        .split('\n')
        .map((l: string) => l.trim())
        .filter(Boolean);

      const id = (env as Partial<MarkdownEnv>)?.id;

      let component = '';
      if (typeof id === 'string') {
        const match = id.match(/\/src\/docs\/(.+)\/components\/(.+)$/);
        if (match?.[2]) {
          component = match[2].replace('.md', '') ?? '';
        }
      }

      return `<PlaygroundGallery :component="'${component}'" :files='${JSON.stringify(files)}' />`;
    }

    const rendered = origFence ? origFence(tokens, idx, options, env, slf) : slf.renderToken(tokens, idx, options);

    return rendered;
  };
}

function copyCodePlugin(md: MarkdownItAsync) {
  const origFence = md.renderer.rules.fence?.bind(md.renderer.rules) as RenderRule | undefined;

  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const info = (token.info || '').trim();

    // Only handle triple-backtick fenced blocks (```), ignore ~~~ and other forms
    if (token.markup !== '```') {
      return origFence ? origFence(tokens, idx, options, env, slf) : slf.renderToken(tokens, idx, options);
    }

    const wrapWithCopyButton = (renderedHtml: string, tokenInfo: string, rawCode: string) => {
      if (!renderedHtml) return renderedHtml;

      // Avoid double-wrapping
      if (renderedHtml.includes('md-code-block') || renderedHtml.includes('md-code-copy')) return renderedHtml;

      const lang = (tokenInfo || '').trim().split(/\s+/)[0] || '';
      const codeBase64 = encodeBase64Utf8(rawCode);

      return `\n<div class="md-code-block" data-lang="${lang}">\n  <CopyButton code-base64="${codeBase64}" />\n  ${renderedHtml}\n</div>\n`;
    };

    const rendered = origFence ? origFence(tokens, idx, options, env, slf) : slf.renderToken(tokens, idx, options);

    // Let playgroundPlugin fully control ```playground blocks
    if (info === 'playground') {
      return rendered;
    }

    return wrapWithCopyButton(rendered, info, token.content);
  };
}

/**
 * replaces the syntax {? tooltip content } with a PlaygroundTooltip component.
 * @param md
 */
function tooltipPlugin(md: MarkdownItAsync) {
  const defaultRule = md.renderer.rules.text;

  md.renderer.rules.text = (tokens, idx, options, env, self) => {
    const content = tokens[idx].content;

    const prefixIdx = content.indexOf('{?');
    const suffixIdx = content.lastIndexOf('}');
    if (prefixIdx !== -1 && suffixIdx !== -1) {
      const contentBefore = content.slice(0, prefixIdx);
      const tooltipContent = content.slice(prefixIdx + 2, suffixIdx);
      return `${contentBefore} <PlaygroundTooltip :content="'${tooltipContent}'" />`;
    }

    return defaultRule ? defaultRule(tokens, idx, options, env, self) : self.renderToken(tokens, idx, options);
  };
}
