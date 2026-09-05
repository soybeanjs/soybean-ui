import { codeToHtml } from 'shiki';
import type { ShikiTransformer } from 'shiki';
import { encodeBase64Utf8 } from '../shared/encode';

const SHIKI_THEMES = {
  light: 'one-light',
  dark: 'one-dark-pro'
} as const;

/**
 * markdown-exit `highlight` 选项，透传给 ubean 内置 markdown 通道：
 * 复刻 @shikijs/markdown-exit 的双主题渲染，并在 fence 输出中内联复制按钮。
 */
export function createMarkdownHighlight() {
  return async (source: string, lang = 'text', attrs = ''): Promise<string> => {
    const language = lang || 'text';
    const code = source.endsWith('\n') ? source.slice(0, -1) : source;
    const codeBase64 = encodeBase64Utf8(code);

    let html: string;
    try {
      html = await codeToHtml(code, {
        lang: language,
        defaultColor: false,
        themes: SHIKI_THEMES,
        meta: { __raw: attrs },
        transformers: [createBlockClassTransformer(language)]
      });
    } catch {
      // 未知语言回退为纯文本渲染
      html = await codeToHtml(code, {
        lang: 'text',
        defaultColor: false,
        themes: SHIKI_THEMES,
        transformers: [createBlockClassTransformer('text')]
      });
    }

    return withCopyButton(html, language, codeBase64);
  };
}

function createBlockClassTransformer(lang: string): ShikiTransformer {
  return {
    name: 'soybean-docs:block-class',
    code(node) {
      node.properties.class = `language-${lang}`;
    }
  };
}

/** markdown-exit fence 规则要求 highlight 返回值以 `<pre` 开头，这里就地改写 shiki 的 pre 开标签。 */
function withCopyButton(html: string, lang: string, codeBase64: string): string {
  if (html.includes('md-code-block')) return html;

  return html.replace(/^<pre([^>]*)>/, (_, attrs: string) => {
    const mergedClass = attrs.includes('class="')
      ? attrs.replace(/class="/, 'class="md-code-block ')
      : `${attrs} class="md-code-block"`;
    return `<pre${mergedClass} data-lang="${lang}"><CopyButton code-base64="${codeBase64}" />`;
  });
}
