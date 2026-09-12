import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import SSheet from '@/components/sheet/sheet.vue';

describe('SSheet', () => {
  const slots = {
    trigger: '<button type="button">Open Sheet</button>',
    default: '<div data-content>Sheet content</div>'
  };

  describe('rendering', () => {
    it('renders sheet content when open', async () => {
      const wrapper = mount(SSheet, {
        props: {
          open: true,
          title: 'Sheet Title',
          portalProps: { disabled: true }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.text()).toContain('Sheet Title');
      expect(wrapper.text()).toContain('Sheet content');

      wrapper.unmount();
    });

    it('renders trigger slot', () => {
      const wrapper = mount(SSheet, {
        props: { title: 'Sheet' },
        slots,
        attachTo: document.body
      });

      expect(wrapper.find('button').exists()).toBe(true);

      wrapper.unmount();
    });

    it('applies custom class', async () => {
      const wrapper = mount(SSheet, {
        props: {
          open: true,
          class: 'my-sheet',
          portalProps: { disabled: true },
          title: 'Sheet'
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('.my-sheet').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('emits update:open when trigger is clicked', async () => {
      const wrapper = mount(SSheet, {
        props: { title: 'Sheet' },
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
      const wrapper = mount(SSheet, {
        props: {
          open: true,
          title: 'Accessible Sheet',
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
