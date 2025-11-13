import type { MarkdownItAsync } from 'markdown-it-async';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';
import type { MarkdownEnv } from 'unplugin-vue-markdown/dist/types.js';

/**
 * 将 ```demo 代码块替换为 DemoGallery 组件以加载并渲染指定的 .vue 示例文件
 * @param md MarkdownIt 实例
 */
export function loadDemoModules(md: MarkdownItAsync) {
  const origFence = md.renderer.rules.fence?.bind(md.renderer.rules) as RenderRule | undefined;
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const info = (token.info || '').trim();
    if (info === 'demo') {
      const files = token.content
        .split('\n')
        .map((l: string) => l.trim())
        .filter(Boolean);
      const p = (env as Partial<MarkdownEnv>)?.id;
      let docsRoot = '';
      if (typeof p === 'string') {
        const match = p.match(/\/src\/content\/components\/([^/]+)\/index\.md$/);
        if (match) {
          const component = match[1];
          docsRoot = `/src/content/components/${component}`;
        }
      }
      const safeDocsRoot = (docsRoot || '').replace(/'/g, "\\'");
      console.log('safeDocsRoot', safeDocsRoot);
      return `<DemoGallery :docsRoot="'${safeDocsRoot}'" :files='${JSON.stringify(files)}' />`;
    }
    return origFence ? origFence(tokens, idx, options, env, slf) : slf.renderToken(tokens, idx, options);
  };
}
