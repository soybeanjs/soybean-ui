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

    it('opens on contextmenu and reveals the menu in the portal', async () => {
      const wrapper = mount(SContextMenu, {
        props: { items },
        slots,
        attachTo: document.body
      });

      await wrapper.find('button').trigger('contextmenu');
      await nextTick();

      // Context-menu content teleports to `document.body` via the portal.
      expect(document.body.querySelector('[role="menu"]')).toBeTruthy();

      wrapper.unmount();
    });

    it('mounts with custom class prop', () => {
      const wrapper = mount(SContextMenu, {
        props: {
          items,
          class: 'my-context-menu'
        },
        slots,
        attachTo: document.body
      });

      expect(wrapper.find('button').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('opens on a right-click of the trigger', async () => {
      const wrapper = mount(SContextMenu, {
        props: { items },
        slots,
        attachTo: document.body
      });

      await wrapper.find('button').trigger('contextmenu');
      await nextTick();

      expect(document.body.querySelector('[role="menu"]')).toBeTruthy();

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('renders a menu role when opened', async () => {
      const wrapper = mount(SContextMenu, {
        props: { items },
        slots: {
          trigger: '<button type="button">Trigger</button>'
        },
        attachTo: document.body
      });

      await wrapper.find('button').trigger('contextmenu');
      await nextTick();

      expect(wrapper.find('button').exists()).toBe(true);
      expect(document.body.querySelector('[role="menu"]')).toBeTruthy();

      wrapper.unmount();
    });
  });
});
