import { Time } from '@internationalized/date';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { STimePicker } from '@soybeanjs/ui';

import { getA11yViolations } from '../../shared/a11y';

describe('STimePicker', () => {
  describe('rendering', () => {
    it('renders the default trigger and root container', () => {
      const wrapper = mount(STimePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new Time(9, 30, 0),
          'aria-label': 'Meeting time'
        }
      });

      expect(wrapper.find('[data-slot="root"]').exists()).toBe(true);
      expect(wrapper.find('[data-slot="trigger"]').exists()).toBe(true);
      wrapper.unmount();
    });

    it('applies a custom class to the root', () => {
      const wrapper = mount(STimePicker, {
        attachTo: document.body,
        props: {
          class: 'custom-time-picker',
          defaultPlaceholder: new Time(9, 30, 0),
          'aria-label': 'Meeting time'
        }
      });

      expect(wrapper.find('[data-slot="root"]').classes()).toContain('custom-time-picker');
      wrapper.unmount();
    });

    it('does not render the popup by default', () => {
      const wrapper = mount(STimePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new Time(9, 30, 0),
          'aria-label': 'Meeting time'
        }
      });

      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(false);
      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('renders the popup when defaultOpen is true', async () => {
      const wrapper = mount(STimePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new Time(9, 30, 0),
          defaultOpen: true,
          'aria-label': 'Meeting time'
        }
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(true);
      wrapper.unmount();
    });

    it('toggles the popup when the trigger is clicked', async () => {
      const wrapper = mount(STimePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new Time(9, 30, 0),
          'aria-label': 'Meeting time'
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
      const wrapper = mount(STimePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new Time(9, 30, 0),
          'aria-label': 'Meeting time'
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
      const wrapper = mount(STimePicker, {
        attachTo: document.body,
        props: {
          disabled: true,
          defaultPlaceholder: new Time(9, 30, 0),
          'aria-label': 'Disabled meeting time'
        }
      });

      expect(wrapper.find('[data-slot="root"]').attributes('data-disabled')).toBeDefined();
      expect(wrapper.find('[data-slot="trigger"]').attributes('aria-disabled')).toBe('true');
      wrapper.unmount();
    });

    it('does not open the popup when disabled', async () => {
      const wrapper = mount(STimePicker, {
        attachTo: document.body,
        props: {
          disabled: true,
          defaultPlaceholder: new Time(9, 30, 0),
          'aria-label': 'Disabled meeting time'
        }
      });

      await wrapper.find('[data-slot="trigger"]').trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(false);
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('emits update:modelValue when a time is selected', async () => {
      const wrapper = mount(STimePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new Time(9, 30, 0),
          defaultOpen: true,
          step: { hour: 1 },
          'aria-label': 'Meeting time'
        }
      });

      await wrapper.vm.$nextTick();
      await wrapper.find('[data-slot="cell-trigger"]').trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      wrapper.unmount();
    });

    it('has no a11y violations in the default state', async () => {
      const wrapper = mount(STimePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new Time(9, 30, 0),
          'aria-label': 'Meeting time'
        }
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
