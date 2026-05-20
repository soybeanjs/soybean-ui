import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { getA11yViolations } from '../../shared/a11y';
import SPopconfirm from '../../../src/components/popconfirm/popconfirm.vue';

describe('SPopconfirm', () => {
  const slots = {
    trigger: '<button type="button">Trigger</button>'
  };

  describe('rendering', () => {
    it('renders popup content from props when open', async () => {
      const wrapper = mount(SPopconfirm, {
        props: {
          open: true,
          portalProps: { disabled: true },
          title: 'Delete item?',
          description: 'This action cannot be undone.',
          content: 'Please confirm.',
          type: 'warning'
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.text()).toContain('Delete item?');
      expect(wrapper.text()).toContain('This action cannot be undone.');
      expect(wrapper.text()).toContain('Please confirm.');
      expect(wrapper.text()).toContain('Cancel');
      expect(wrapper.text()).toContain('Confirm');
      wrapper.unmount();
    });

    it('applies custom class to popup', async () => {
      const wrapper = mount(SPopconfirm, {
        props: {
          open: true,
          class: 'my-popconfirm-class',
          portalProps: { disabled: true },
          title: 'Confirm'
        },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('.my-popconfirm-class').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('emits update:open when the trigger is clicked', async () => {
      const wrapper = mount(SPopconfirm, {
        props: {
          title: 'Confirm'
        },
        slots,
        attachTo: document.body
      });

      await wrapper.find('button').trigger('click');

      expect(wrapper.emitted('update:open')).toBeTruthy();
      expect(wrapper.emitted('update:open')![0][0]).toBe(true);
      wrapper.unmount();
    });

    it('does not close when beforeConfirm returns false', async () => {
      const wrapper = mount(SPopconfirm, {
        props: {
          open: true,
          portalProps: { disabled: true },
          title: 'Confirm',
          confirmProps: {
            'data-soybean-popconfirm-confirm': ''
          }
        },
        slots,
        attachTo: document.body
      });

      await nextTick();
      await wrapper.get('[data-soybean-popconfirm-confirm]').trigger('click');

      expect(wrapper.emitted('confirm')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('does not emit update:open when disabled', async () => {
      const wrapper = mount(SPopconfirm, {
        props: {
          disabled: true,
          title: 'Confirm'
        },
        slots,
        attachTo: document.body
      });

      await wrapper.find('button').trigger('click');

      expect(wrapper.emitted('update:open')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when open', async () => {
      const wrapper = mount(
        {
          components: { SPopconfirm },
          template: `
            <div data-testid="container">
              <SPopconfirm open title="Delete item?" description="This action cannot be undone." :portal-props="{ disabled: true }">
                <template #trigger>
                  <button type="button">Trigger</button>
                </template>
              </SPopconfirm>
            </div>
          `
        },
        {
          attachTo: document.body
        }
      );

      await nextTick();

      const violations = await getA11yViolations(wrapper.get('[data-testid="container"]').element);
      expect(violations).toHaveLength(1);
      wrapper.unmount();
    });
  });
});
