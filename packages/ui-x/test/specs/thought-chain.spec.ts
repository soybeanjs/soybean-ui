import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SxThoughtChain from '@/components/thought-chain/thought-chain.vue';

const items = [
  { key: '1', title: 'Step one', content: 'detail one', status: 'success' as const },
  { key: '2', title: 'Step two', status: 'loading' as const }
];

describe('SxThoughtChain', () => {
  it('renders each step title', () => {
    const wrapper = mount(SxThoughtChain, { props: { items } });

    expect(wrapper.text()).toContain('Step one');
    expect(wrapper.text()).toContain('Step two');
  });

  it('is collapsed by default and expands on click', async () => {
    const wrapper = mount(SxThoughtChain, { props: { items } });

    const firstItem = wrapper.find('li');
    expect(firstItem.find('[aria-expanded="false"]').exists()).toBe(true);

    await firstItem.find('button').trigger('click');

    expect(firstItem.find('[aria-expanded="true"]').exists()).toBe(true);
  });

  it('respects defaultExpand', () => {
    const wrapper = mount(SxThoughtChain, { props: { items, defaultExpand: true } });

    expect(wrapper.find('[aria-expanded="true"]').exists()).toBe(true);
  });
});
