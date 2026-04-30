import { Time } from '@internationalized/date';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { STimeRangePicker } from '@soybeanjs/ui';

import { getA11yViolations } from '../../shared/a11y';

describe('STimeRangePicker', () => {
  describe('rendering', () => {
    it('renders the default trigger and root container', () => {
      const wrapper = mount(STimeRangePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new Time(9, 0, 0),
          'aria-label': 'Working hours'
        }
      });

      expect(wrapper.find('[data-slot="root"]').exists()).toBe(true);
      expect(wrapper.find('[data-slot="trigger"]').exists()).toBe(true);
      wrapper.unmount();
    });

    it('applies a custom class to the root', () => {
      const wrapper = mount(STimeRangePicker, {
        attachTo: document.body,
        props: {
          class: 'custom-time-range-picker',
          defaultPlaceholder: new Time(9, 0, 0),
          'aria-label': 'Working hours'
        }
      });

      expect(wrapper.find('[data-slot="root"]').classes()).toContain('custom-time-range-picker');
      wrapper.unmount();
    });

    it('does not render the popup by default', () => {
      const wrapper = mount(STimeRangePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new Time(9, 0, 0),
          'aria-label': 'Working hours'
        }
      });

      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(false);
      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('renders the popup when defaultOpen is true', async () => {
      const wrapper = mount(STimeRangePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new Time(9, 0, 0),
          defaultOpen: true,
          'aria-label': 'Working hours'
        }
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(true);
      wrapper.unmount();
    });

    it('toggles the popup when the trigger is clicked', async () => {
      const wrapper = mount(STimeRangePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new Time(9, 0, 0),
          'aria-label': 'Working hours'
        }
      });

      const trigger = wrapper.find('[data-slot="trigger"]');

      await trigger.trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(true);
      expect(trigger.attributes('aria-expanded')).toBe('true');
      wrapper.unmount();
    });

    it('emits update:open when the trigger is clicked', async () => {
      const wrapper = mount(STimeRangePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new Time(9, 0, 0),
          'aria-label': 'Working hours'
        }
      });

      await wrapper.find('[data-slot="trigger"]').trigger('click');

      expect(wrapper.emitted('update:open')).toBeTruthy();
      expect(wrapper.emitted('update:open')?.[0]).toEqual([true]);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('marks the root and trigger as disabled', () => {
      const wrapper = mount(STimeRangePicker, {
        attachTo: document.body,
        props: {
          disabled: true,
          defaultPlaceholder: new Time(9, 0, 0),
          'aria-label': 'Disabled working hours'
        }
      });

      expect(wrapper.find('[data-slot="root"]').attributes('data-disabled')).toBeDefined();
      expect(wrapper.find('[data-slot="trigger"]').attributes('aria-disabled')).toBe('true');
      wrapper.unmount();
    });

    it('does not open the popup when disabled', async () => {
      const wrapper = mount(STimeRangePicker, {
        attachTo: document.body,
        props: {
          disabled: true,
          defaultPlaceholder: new Time(9, 0, 0),
          'aria-label': 'Disabled working hours'
        }
      });

      await wrapper.find('[data-slot="trigger"]').trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(false);
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('emits update:modelValue when a time range is selected', async () => {
      const wrapper = mount(STimeRangePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new Time(9, 0, 0),
          defaultOpen: true,
          step: { hour: 1 },
          'aria-label': 'Working hours'
        }
      });

      await wrapper.vm.$nextTick();

      const triggers = wrapper.findAll('[data-slot="cell-trigger"]');

      await triggers[0].trigger('click');
      await triggers[2].trigger('click');

      const emissions = wrapper.emitted('update:modelValue');

      expect(emissions).toBeTruthy();
      expect(emissions?.at(-1)?.[0]).toEqual({
        start: new Time(0, 0, 0),
        end: new Time(2, 0, 0)
      });
      wrapper.unmount();
    });

    it('renders the formatted range in the trigger', () => {
      const wrapper = mount(STimeRangePicker, {
        attachTo: document.body,
        props: {
          modelValue: {
            start: new Time(9, 0, 0),
            end: new Time(17, 30, 0)
          },
          hourCycle: 24,
          'aria-label': 'Working hours'
        }
      });

      expect(wrapper.find('[data-slot="trigger"]').text()).toContain('9');
      expect(wrapper.find('[data-slot="trigger"]').text()).toContain('17');
      wrapper.unmount();
    });

    it('has no a11y violations in the default state', async () => {
      const wrapper = mount(STimeRangePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new Time(9, 0, 0),
          'aria-label': 'Working hours'
        }
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
