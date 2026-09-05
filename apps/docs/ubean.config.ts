import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'ubean';
import { createMarkdownHighlight } from './src/modules/markdown';

/**
 * SoybeanUI docs — ubean `mode: 'ssg'`.
 *
 * 双语由 vue-i18n locale 状态驱动（非 URL 前缀），因此关闭 ubean i18n；
 * markdown 编译走 ubean 内置通道（Shiki highlight + 复制按钮见 src/modules/markdown.ts），
 * 组件自动导入走 ubean 内置 Components（含 .md，UiResolver 在 vite.config 注册）。
 */
export default defineConfig({
  mode: 'ssg',
  srcDir: 'src',
  i18n: false,
  markdown: {
    wrapperClass: 'markdown-wrapper',
    markdownExit: {
      highlight: createMarkdownHighlight()
    }
  },
  imports: { autoImport: false },
  components: { autoImport: true },
  pinia: true,
  prerender: {
    all: false,
    include: collectDocsRoutes(),
    crawlLinks: true,
    failOnError: false
  }
});

/** 枚举静态页面 + 内容树具象化动态段，供 SSG 预渲染；crawlLinks 兜底遗漏路由。 */
function collectDocsRoutes(): string[] {
  const routes = [
    '/',
    '/about',
    '/releases',
    '/sbean',
    '/overview',
    '/overview/introduction',
    '/overview/quick-start',
    '/overview/installation',
    '/overview/theming',
    '/overview/skills',
    '/overview/llms',
    '/components',
    ...listContentSlugs('ui', 'components').map(slug => `/components/${slug}`),
    '/ui-x',
    '/ui-x/i18n',
    '/ui-x/installation',
    '/ui-x/quick-start',
    '/ui-x/theming',
    ...listContentSlugs('ui-x', 'components').map(slug => `/ui-x/${slug}`),
    '/admin',
    '/admin/installation',
    '/admin/quick-start',
    ...listContentSlugs('admin', 'components').map(slug => `/admin/${slug}`),
    '/chart',
    '/chart/installation',
    '/chart/quick-start',
    ...listContentSlugs('chart', 'components').map(slug => `/chart/${slug}`)
  ];

  return Array.from(new Set(routes));
}

function listContentSlugs(...segments: string[]): string[] {
  const dir = fileURLToPath(new URL(`./src/docs/en/${segments.join('/')}`, import.meta.url));

  try {
    return readdirSync(dir)
      .filter(name => name.endsWith('.md'))
      .map(name => name.slice(0, -'.md'.length));
  } catch {
    return [];
  }
}
