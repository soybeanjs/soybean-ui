import type { MarkdownRenderer } from 'vitepress';
import { pascalCase } from 'es-toolkit';
import { parseProps } from './shared';

function ComponentPreview(md: MarkdownRenderer) {
  function addRenderRule(type: string) {
    const defaultRender = md.renderer.rules[type];
    md.renderer.rules[type] = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const content = token.content.trim();
      if (!content.match(/^<ComponentPreview\s/) || !content.endsWith('/>'))
        return defaultRender!(tokens, idx, options, env, self);

      const props = parseProps(content);

      const componentName = pascalCase(`Demo${props.name}`);

      const demoScripts = `<ComponentPreview name="${props.name}"><${componentName} /></ComponentPreview>`;
      return demoScripts;
    };
  }
  addRenderRule('html_block');
  addRenderRule('html_inline');
}

export default ComponentPreview;
