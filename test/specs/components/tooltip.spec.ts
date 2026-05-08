import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import STooltip from '../../../src/components/tooltip/tooltip.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('STooltip', () => {
  const slots = {
    trigger: '<button type="button">Trigger</button>',
    default: '<div>Tooltip content</div>'
  };

  describe('rendering', () => {
    it('renders the trigger slot', () => {
      const wrapper = mount(STooltip, {
        slots,
        attachTo: document.body
      });

      expect(wrapper.find('button').text()).toBe('Trigger');
      expect(document.body.textContent).not.toContain('Tooltip content');
      wrapper.unmount();
    });

    it('renders popup content when open is true', async () => {
      const wrapper = mount(STooltip, {
        props: { open: true, portalProps: { disabled: true } },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.text()).toContain('Tooltip content');
      wrapper.unmount();
    });

    it('falls back to the content prop when the default slot is absent', async () => {
      const wrapper = mount(STooltip, {
        props: { open: true, content: 'Tooltip from prop', portalProps: { disabled: true } },
        slots: {
          trigger: slots.trigger
        },
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.text()).toContain('Tooltip from prop');
      wrapper.unmount();
    });

    it('applies a custom class to the popup', async () => {
      const wrapper = mount(STooltip, {
        props: { open: true, class: 'my-tooltip-class', portalProps: { disabled: true } },
        slots,
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('.my-tooltip-class').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('emits update:open when the trigger receives focus', async () => {
      const wrapper = mount(STooltip, {
        slots,
        attachTo: document.body
      });

      await wrapper.find('button').trigger('focus');

      expect(wrapper.emitted('update:open')).toBeTruthy();
      expect(wrapper.emitted('update:open')![0][0]).toBe(true);
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when closed', async () => {
      const wrapper = mount(STooltip, {
        slots,
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });

    it('has no a11y violations when open', async () => {
      const wrapper = mount(
        {
          components: { STooltip },
          template: `
            <div data-testid="container">
              <STooltip :open="true" :portal-props="{ disabled: true }">
                <template #trigger>
                  <button type="button">Trigger</button>
                </template>
                <div>Tooltip content</div>
              </STooltip>
            </div>
          `
        },
        {
          attachTo: document.body
        }
      );

      await nextTick();

      const violations = await getA11yViolations(wrapper.get('[data-testid="container"]').element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
