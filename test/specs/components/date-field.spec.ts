import { CalendarDate, CalendarDateTime } from '@internationalized/date';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import SDateField from '../../../src/components/date-field/date-field.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SDateField', () => {
  describe('rendering', () => {
    it('renders the default date segments and custom class', () => {
      const wrapper = mount(SDateField, {
        attachTo: document.body,
        props: {
          class: 'test-date-field',
          modelValue: new CalendarDate(2026, 4, 19),
          'aria-label': 'Event date'
        }
      });

      expect(wrapper.classes()).toContain('test-date-field');
      expect(wrapper.findAll('[data-soybean-date-field-segment]').length).toBeGreaterThanOrEqual(5);
      expect(wrapper.find('[data-segment="month"]').text()).toContain('4');
      wrapper.unmount();
    });

    it('renders time segments when using date-time values', () => {
      const wrapper = mount(SDateField, {
        attachTo: document.body,
        props: {
          modelValue: new CalendarDateTime(2026, 4, 19, 14, 30, 0),
          granularity: 'second',
          'aria-label': 'Meeting time'
        }
      });

      expect(wrapper.find('[data-segment="hour"]').exists()).toBe(true);
      expect(wrapper.find('[data-segment="minute"]').exists()).toBe(true);
      expect(wrapper.find('[data-segment="second"]').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('state', () => {
    it('emits update:modelValue after keyboard editing a segment', async () => {
      const wrapper = mount(SDateField, {
        attachTo: document.body,
        props: {
          modelValue: new CalendarDate(2026, 4, 19),
          'aria-label': 'Event date'
        }
      });

      const day = wrapper.find('[data-segment="day"]');

      await day.trigger('focusin');
      await day.trigger('keydown', { key: '2', preventDefault() {} });
      await day.trigger('keydown', { key: '0', preventDefault() {} });

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('marks segments as disabled and prevents tab focus', () => {
      const wrapper = mount(SDateField, {
        attachTo: document.body,
        props: {
          disabled: true,
          modelValue: new CalendarDate(2026, 4, 19),
          'aria-label': 'Disabled date'
        }
      });

      const day = wrapper.find('[data-segment="day"]');

      expect(wrapper.attributes('data-disabled')).toBeDefined();
      expect(day.attributes('data-disabled')).toBeDefined();
      expect(day.attributes('tabindex')).toBeUndefined();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations in the default state', async () => {
      const wrapper = mount(SDateField, {
        attachTo: document.body,
        props: {
          modelValue: new CalendarDate(2026, 4, 19),
          'aria-label': 'Accessible event date'
        }
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
