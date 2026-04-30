import { mount } from '@vue/test-utils';
import { CalendarDate } from '@internationalized/date';
import { describe, expect, it } from 'vitest';

import SDateRangePicker from '../../../src/components/date-range-picker/date-range-picker.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SDateRangePicker', () => {
  describe('rendering', () => {
    it('renders correctly with default slot', () => {
      const wrapper = mount(SDateRangePicker, {
        attachTo: document.body
      });

      expect(wrapper.find('[data-slot="root"]').exists()).toBe(true);
      expect(wrapper.find('[data-slot="trigger"]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('renders with custom class', () => {
      const wrapper = mount(SDateRangePicker, {
        props: {
          class: 'custom-class'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-slot="root"]').classes()).toContain('custom-class');

      wrapper.unmount();
    });

    it('renders trigger slot', () => {
      const wrapper = mount(SDateRangePicker, {
        slots: {
          trigger: '<button>Custom Trigger</button>'
        },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Custom Trigger');

      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('opens popup when trigger is clicked', async () => {
      const wrapper = mount(SDateRangePicker, {
        attachTo: document.body
      });

      const trigger = wrapper.find('[data-slot="trigger"]');

      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(false);

      await trigger.trigger('click');

      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(true);
      expect(trigger.attributes('data-state')).toBe('open');
      expect(trigger.attributes('aria-expanded')).toBe('true');

      wrapper.unmount();
    });

    it('emits update:open event', async () => {
      const wrapper = mount(SDateRangePicker, {
        attachTo: document.body
      });

      const trigger = wrapper.find('[data-slot="trigger"]');

      await trigger.trigger('click');

      expect(wrapper.emitted('update:open')).toBeTruthy();
      expect(wrapper.emitted('update:open')?.[0]).toEqual([true]);

      wrapper.unmount();
    });

    it('respects controlled open state', async () => {
      const wrapper = mount(SDateRangePicker, {
        props: {
          open: false
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(false);

      await wrapper.setProps({ open: true });

      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('renders disabled state correctly', () => {
      const wrapper = mount(SDateRangePicker, {
        props: {
          disabled: true
        },
        attachTo: document.body
      });

      const root = wrapper.find('[data-slot="root"]');
      const trigger = wrapper.find('[data-slot="trigger"]');

      expect(root.attributes('data-disabled')).toBe('');
      expect(trigger.attributes('data-disabled')).toBe('');
      expect(trigger.attributes('aria-disabled')).toBe('true');

      wrapper.unmount();
    });

    it('does not open when disabled', async () => {
      const wrapper = mount(SDateRangePicker, {
        props: {
          disabled: true
        },
        attachTo: document.body
      });

      const trigger = wrapper.find('[data-slot="trigger"]');

      await trigger.trigger('click');

      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(false);
      expect(wrapper.emitted('update:open')).toBeFalsy();

      wrapper.unmount();
    });
  });

  describe('modelValue', () => {
    it('emits update:modelValue when range changes', async () => {
      const wrapper = mount(SDateRangePicker, {
        props: {
          defaultPlaceholder: new CalendarDate(2026, 4, 18)
        },
        attachTo: document.body
      });

      const trigger = wrapper.find('[data-slot="trigger"]');

      await trigger.trigger('click');
      await wrapper.get('[data-value="2026-04-18"]').trigger('click');
      await wrapper.get('[data-value="2026-04-20"]').trigger('click');

      const emitted = wrapper.emitted('update:modelValue');

      expect(emitted).toBeTruthy();
      expect(((emitted as NonNullable<typeof emitted>)[0][0] as { start?: CalendarDate; end?: CalendarDate }).start?.toString()).toBe('2026-04-18');
      expect(((emitted as NonNullable<typeof emitted>)[1][0] as { start?: CalendarDate; end?: CalendarDate }).end?.toString()).toBe('2026-04-20');
      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(false);

      wrapper.unmount();
    });

    it('displays formatted date range', () => {
      const start = new CalendarDate(2024, 1, 1);
      const end = new CalendarDate(2024, 1, 31);

      const wrapper = mount(SDateRangePicker, {
        props: {
          modelValue: { start, end }
        },
        attachTo: document.body
      });

      const trigger = wrapper.find('[data-slot="trigger"]');

      expect(trigger.text()).toContain('2024-01-01');
      expect(trigger.text()).toContain('2024-01-31');

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SDateRangePicker, {
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element as HTMLElement);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });

    it('has proper ARIA attributes on trigger', () => {
      const wrapper = mount(SDateRangePicker, {
        attachTo: document.body
      });

      const trigger = wrapper.find('[data-slot="trigger"]');

      expect(trigger.attributes('aria-expanded')).toBe('false');
      expect(trigger.attributes('type')).toBe('button');

      wrapper.unmount();
    });

    it('popup has dialog role', async () => {
      const wrapper = mount(SDateRangePicker, {
        props: {
          open: true
        },
        attachTo: document.body
      });

      const popup = wrapper.find('[data-slot="popup"]');

      expect(popup.attributes('role')).toBe('dialog');

      wrapper.unmount();
    });
  });
});
