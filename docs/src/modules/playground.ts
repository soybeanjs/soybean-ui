import type { MarkdownItAsync } from 'markdown-it-async';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';
import type { MarkdownEnv } from 'unplugin-vue-markdown/dist/types.js';

/**
 * 将 ```playground 代码块替换为 PlaygroundGallery 组件以加载并渲染指定的 .vue 示例文件
 * @param md MarkdownIt 实例
 */
export function loadPlaygroundModules(md: MarkdownItAsync) {
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
        const match = id.match(/\/src\/docs\/(.+)$/);
        if (match?.[1]) {
          component = match[1].split('/')?.[1]?.replace('.md', '') ?? '';
        }
      }

      return `<PlaygroundGallery :component="'${component}'" :files='${JSON.stringify(files)}' />`;
    }

    return origFence ? origFence(tokens, idx, options, env, slf) : slf.renderToken(tokens, idx, options);
  };
}
