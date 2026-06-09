import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import STree from '@/components/tree/tree.vue';

describe('STree', () => {
  const treeItems = [
    {
      value: '1',
      label: 'Item 1',
      children: [
        { value: '1-1', label: 'Item 1-1' },
        { value: '1-2', label: 'Item 1-2' }
      ]
    },
    {
      value: '2',
      label: 'Item 2'
    }
  ];

  describe('rendering', () => {
    it('renders with tree items data', () => {
      const wrapper = mount(STree, {
        props: { items: treeItems },
        slots: {
          item: '<span>{{ item.label }}</span>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-tree-root]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('renders top and bottom slots', () => {
      const wrapper = mount(STree, {
        props: { items: treeItems },
        slots: {
          top: '<div data-top>Top</div>',
          bottom: '<div data-bottom>Bottom</div>',
          item: '<span>{{ item.label }}</span>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-top]').exists()).toBe(true);
      expect(wrapper.find('[data-bottom]').exists()).toBe(true);

      wrapper.unmount();
    });
  });
});
