import type { MarkdownExit, PluginSimple } from 'markdown-exit';
import { encodeBase64Utf8 } from '../shared/encode';

export const customMarkdownPlugin: PluginSimple = md => {
  copyCodePlugin(md);
};

function copyCodePlugin(md: MarkdownExit) {
  const origFence = md.renderer.rules.fence?.bind(md.renderer.rules);

  const wrapRenderedHtml = (renderedHtml: string, tokenInfo: string, rawCode: string) => {
    if (!renderedHtml) return renderedHtml;

    // Avoid double-wrapping
    if (renderedHtml.includes('md-code-block') || renderedHtml.includes('md-code-copy')) return renderedHtml;

    const lang = (tokenInfo || '').trim().split(/\s+/)[0] || '';
    const codeBase64 = encodeBase64Utf8(rawCode);

    return `\n<div class="md-code-block" data-lang="${lang}">\n  <CopyButton code-base64="${codeBase64}" />\n  ${renderedHtml}\n</div>\n`;
  };

  const wrapWithCopyButton = (renderedHtml: string | Promise<string>, tokenInfo: string, rawCode: string) => {
    if (typeof renderedHtml === 'string') {
      return wrapRenderedHtml(renderedHtml, tokenInfo, rawCode);
    }

    return renderedHtml.then(html => wrapRenderedHtml(html, tokenInfo, rawCode));
  };

  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const info = (token.info || '').trim();

    // Only handle triple-backtick fenced blocks (```), ignore ~~~ and other forms
    if (token.markup !== '```') {
      return origFence ? origFence(tokens, idx, options, env, slf) : slf.renderToken(tokens, idx, options);
    }

    const rendered = origFence ? origFence(tokens, idx, options, env, slf) : slf.renderToken(tokens, idx, options);

    return wrapWithCopyButton(rendered, info, token.content);
  };
}
