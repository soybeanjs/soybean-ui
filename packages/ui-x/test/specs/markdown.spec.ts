import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SxMarkdown from '@/components/markdown/markdown.vue';

describe('SxMarkdown', () => {
  it('renders markdown content inside a root container', () => {
    const wrapper = mount(SxMarkdown, {
      props: {
        content: '# Title\n\nHello **world**'
      }
    });

    expect(wrapper.find('.markstream-vue').exists()).toBe(true);
  });

  it('accepts a final flag', () => {
    const wrapper = mount(SxMarkdown, {
      props: {
        content: 'done',
        final: true
      }
    });

    expect(wrapper.exists()).toBe(true);
  });
});
