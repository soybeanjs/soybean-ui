import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import SDrawer from '@/components/drawer/drawer.vue';

describe('SDrawer', () => {
  const slots = {
    trigger: '<button type="button">Open Drawer</button>',
    default: '<div data-content>Drawer content</div>'
  };

  describe('rendering', () => {
    it('renders drawer content when open', async () => {
      const wrapper = mount(SDrawer, {
        props: {
          open: true,
          title: 'Drawer Title',
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.text()).toContain('Drawer Title');
      expect(wrapper.text()).toContain('Drawer content');

      wrapper.unmount();
    });

    it('renders trigger slot', () => {
      const wrapper = mount(SDrawer, {
        props: { title: 'Drawer' },
        slots,
        attachTo: document.body
      });

      expect(wrapper.find('button').exists()).toBe(true);

      wrapper.unmount();
    });

    it('applies custom class', async () => {
      const wrapper = mount(SDrawer, {
        props: {
          open: true,
          class: 'my-drawer',
          portalProps: { disabled: true },
          title: 'Drawer'
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('.my-drawer').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('emits update:open when trigger is clicked', async () => {
      const wrapper = mount(SDrawer, {
        props: { title: 'Drawer' },
        slots,
        attachTo: document.body
      });

      await wrapper.find('button').trigger('click');

      expect(wrapper.emitted('update:open')).toBeTruthy();
      expect(wrapper.emitted('update:open')![0][0]).toBe(true);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('renders with dialog role when open', async () => {
      const wrapper = mount(SDrawer, {
        props: {
          open: true,
          title: 'Accessible Drawer',
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('[role="dialog"]').exists()).toBe(true);

      wrapper.unmount();
    });
  });
});
