import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import SDialog from '../../../src/components/dialog/dialog.vue';

describe('SDialog', () => {
  const slots = {
    trigger: '<button type="button">Open Dialog</button>',
    default: '<div data-content>Dialog content</div>'
  };

  describe('rendering', () => {
    it('renders dialog content when open', async () => {
      const wrapper = mount(SDialog, {
        props: {
          open: true,
          title: 'Dialog Title',
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.text()).toContain('Dialog Title');
      expect(wrapper.text()).toContain('Dialog content');

      wrapper.unmount();
    });

    it('renders trigger slot', () => {
      const wrapper = mount(SDialog, {
        props: { title: 'Dialog' },
        slots,
        attachTo: document.body
      });

      expect(wrapper.find('button').exists()).toBe(true);
      expect(wrapper.text()).toContain('Open Dialog');

      wrapper.unmount();
    });

    it('applies custom class to popup', async () => {
      const wrapper = mount(SDialog, {
        props: {
          open: true,
          class: 'my-dialog',
          portalProps: { disabled: true },
          title: 'Dialog'
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('.my-dialog').exists()).toBe(true);

      wrapper.unmount();
    });

    it('shows close button by default', async () => {
      const wrapper = mount(SDialog, {
        props: {
          open: true,
          title: 'Dialog',
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('[data-soybean-dialog-close]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('hides close button when showClose is false', async () => {
      const wrapper = mount(SDialog, {
        props: {
          open: true,
          title: 'Dialog',
          showClose: false,
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('[data-soybean-dialog-close]').exists()).toBe(false);

      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('emits update:open when trigger is clicked', async () => {
      const wrapper = mount(SDialog, {
        props: { title: 'Dialog' },
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
    it('renders with accessible dialog role when open', async () => {
      const wrapper = mount(SDialog, {
        props: {
          open: true,
          title: 'Accessible Dialog',
          description: 'Dialog description',
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
