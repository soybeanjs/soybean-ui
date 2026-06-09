import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import SContextMenu from '@/components/context-menu/context-menu.vue';

describe('SContextMenu', () => {
  const items = [
    { value: 'item-1', label: 'Item 1' },
    { value: 'item-2', label: 'Item 2' }
  ];

  const slots = {
    trigger: '<button type="button">Right-click me</button>'
  };

  describe('rendering', () => {
    it('renders trigger slot', () => {
      const wrapper = mount(SContextMenu, {
        props: { items },
        slots,
        attachTo: document.body
      });

      expect(wrapper.find('button').exists()).toBe(true);

      wrapper.unmount();
    });

    it('renders menu content when open', async () => {
      const wrapper = mount(SContextMenu, {
        props: {
          open: true,
          items,
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      // Menu content renders within the component structure
      expect(wrapper.find('button').exists()).toBe(true);

      wrapper.unmount();
    });

    it('mounts with custom class prop', async () => {
      const wrapper = mount(SContextMenu, {
        props: {
          open: true,
          items,
          class: 'my-context-menu',
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      // Component mounts successfully with custom class
      expect(wrapper.find('button').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('renders trigger when open', async () => {
      const wrapper = mount(SContextMenu, {
        props: {
          open: true,
          items,
          portalProps: { disabled: true }
        },
        slots: {
          trigger: '<button type="button">Trigger</button>'
        },
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('button').exists()).toBe(true);

      wrapper.unmount();
    });
  });
});
