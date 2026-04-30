import { CalendarDateTime, Time } from '@internationalized/date';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import STimeField from '../../../src/components/time-field/time-field.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('STimeField', () => {
  describe('rendering', () => {
    it('renders the default time segments and custom class', () => {
      const wrapper = mount(STimeField, {
        attachTo: document.body,
        props: {
          class: 'test-time-field',
          modelValue: new Time(9, 30, 0),
          'aria-label': 'Meeting time'
        }
      });

      expect(wrapper.classes()).toContain('test-time-field');
      expect(wrapper.find('[data-segment="hour"]').exists()).toBe(true);
      expect(wrapper.find('[data-segment="minute"]').exists()).toBe(true);
      wrapper.unmount();
    });

    it('renders second and day-period segments when needed', () => {
      const wrapper = mount(STimeField, {
        attachTo: document.body,
        props: {
          modelValue: new CalendarDateTime(2026, 4, 19, 14, 30, 15),
          granularity: 'second',
          'aria-label': 'Precise meeting time'
        }
      });

      expect(wrapper.find('[data-segment="second"]').exists()).toBe(true);
      expect(wrapper.find('[data-segment="dayPeriod"]').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('state', () => {
    it('emits update:modelValue after keyboard editing a segment', async () => {
      const wrapper = mount(STimeField, {
        attachTo: document.body,
        props: {
          modelValue: new Time(9, 30, 0),
          'aria-label': 'Meeting time'
        }
      });

      const minute = wrapper.find('[data-segment="minute"]');

      await minute.trigger('focusin');
      await minute.trigger('keydown', { key: '4', preventDefault() {} });
      await minute.trigger('keydown', { key: '5', preventDefault() {} });

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('marks segments as disabled and prevents tab focus', () => {
      const wrapper = mount(STimeField, {
        attachTo: document.body,
        props: {
          disabled: true,
          modelValue: new Time(9, 30, 0),
          'aria-label': 'Disabled time'
        }
      });

      const hour = wrapper.find('[data-segment="hour"]');

      expect(wrapper.attributes('data-disabled')).toBeDefined();
      expect(hour.attributes('data-disabled')).toBeDefined();
      expect(hour.attributes('tabindex')).toBeUndefined();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations in the default state', async () => {
      const wrapper = mount(STimeField, {
        attachTo: document.body,
        props: {
          modelValue: new Time(9, 30, 0),
          'aria-label': 'Accessible meeting time'
        }
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
