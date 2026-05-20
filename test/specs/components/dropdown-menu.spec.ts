import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import SDropdownMenu from '../../../src/components/dropdown-menu/dropdown-menu.vue';

describe('SDropdownMenu', () => {
  const items = [
    { value: 'action-1', label: 'Action 1' },
    { value: 'action-2', label: 'Action 2' }
  ];

  const slots = {
    trigger: '<button type="button">Open Menu</button>'
  };

  describe('rendering', () => {
    it('renders trigger slot', () => {
      const wrapper = mount(SDropdownMenu, {
        props: { items },
        slots,
        attachTo: document.body
      });

      expect(wrapper.find('button').exists()).toBe(true);

      wrapper.unmount();
    });

    it('renders menu content when open', async () => {
      const wrapper = mount(SDropdownMenu, {
        props: {
          open: true,
          items,
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('[role="menu"]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('applies custom class to content', async () => {
      const wrapper = mount(SDropdownMenu, {
        props: {
          open: true,
          items,
          class: 'my-dropdown',
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('.my-dropdown').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('emits update:open when trigger is clicked', async () => {
      const wrapper = mount(SDropdownMenu, {
        props: { items },
        slots,
        attachTo: document.body
      });

      await wrapper.find('button').trigger('click');

      expect(wrapper.emitted('update:open')).toBeTruthy();

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has menu role when open', async () => {
      const wrapper = mount(SDropdownMenu, {
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

      expect(wrapper.find('[role="menu"]').exists()).toBe(true);

      wrapper.unmount();
    });
  });
});
