import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SxCodeBlock from '@/components/code-block/code-block.vue';

describe('SxCodeBlock', () => {
  it('renders code text without highlighting by default', () => {
    const wrapper = mount(SxCodeBlock, { props: { code: 'const a = 1;', language: 'ts' } });
    expect(wrapper.text()).toContain('const a = 1;');
    expect(wrapper.text()).toContain('ts');
  });

  it('does not crash when highlight is enabled but shiki is unavailable', async () => {
    const wrapper = mount(SxCodeBlock, { props: { code: 'x', language: 'ts', highlight: true } });
    await new Promise(resolve => setTimeout(resolve, 20));
    expect(wrapper.exists()).toBe(true);
  });
});
