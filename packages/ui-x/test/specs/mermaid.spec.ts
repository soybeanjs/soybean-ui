import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SxMermaid from '@/components/mermaid/mermaid.vue';

describe('SxMermaid', () => {
  it('renders the diagram / code toggle', () => {
    const wrapper = mount(SxMermaid, { props: { code: 'graph TD; A-->B' } });

    expect(wrapper.text()).toContain('Diagram');
    expect(wrapper.text()).toContain('Code');
  });

  it('renders source code in code mode', () => {
    const wrapper = mount(SxMermaid, { props: { code: 'graph TD; A-->B', mode: 'code' } });

    expect(wrapper.find('pre').text()).toContain('graph TD');
  });

  it('renders an svg diagram when mermaid resolves', async () => {
    const wrapper = mount(SxMermaid, { props: { code: 'graph TD; A-->B' } });

    // let the async mermaid render settle
    await new Promise(resolve => setTimeout(resolve, 50));

    const diagram = wrapper.find('[data-mode="diagram"]');
    expect(diagram.exists()).toBe(true);
  });
});
