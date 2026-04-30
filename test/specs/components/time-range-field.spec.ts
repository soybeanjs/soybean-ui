import { CalendarDateTime, Time } from '@internationalized/date';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import STimeRangeField from '../../../src/components/time-range-field/time-range-field.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('STimeRangeField', () => {
  describe('rendering', () => {
    it('renders start and end time segments with custom class', () => {
      const wrapper = mount(STimeRangeField, {
        attachTo: document.body,
        props: {
          class: 'test-time-range-field',
          modelValue: {
            start: new Time(9, 0, 0),
            end: new Time(17, 30, 0)
          },
          'aria-label': 'Time range'
        }
      });

      expect(wrapper.classes()).toContain('test-time-range-field');
      expect(wrapper.findAll('[data-soybean-date-field-segment]').length).toBeGreaterThanOrEqual(6);

      const startPart = wrapper.find('[data-time-range-field-part="start"]');
      const endPart = wrapper.find('[data-time-range-field-part="end"]');

      expect(startPart.exists()).toBe(true);
      expect(endPart.exists()).toBe(true);
      wrapper.unmount();
    });

    it('renders second segments when using second granularity', () => {
      const wrapper = mount(STimeRangeField, {
        attachTo: document.body,
        props: {
          modelValue: {
            start: new CalendarDateTime(2026, 4, 19, 9, 0, 15),
            end: new CalendarDateTime(2026, 4, 19, 17, 30, 45)
          },
          granularity: 'second',
          'aria-label': 'Precise time range'
        }
      });

      const secondSegments = wrapper.findAll('[data-segment="second"]');

      expect(secondSegments.length).toBeGreaterThanOrEqual(2);
      wrapper.unmount();
    });

    it('renders custom separator', () => {
      const wrapper = mount(STimeRangeField, {
        attachTo: document.body,
        props: {
          modelValue: {
            start: new Time(9, 0, 0),
            end: new Time(17, 30, 0)
          },
          separator: '→',
          'aria-label': 'Time range'
        }
      });

      expect(wrapper.text()).toContain('→');
      wrapper.unmount();
    });
  });

  describe('state', () => {
    it('emits update:modelValue when start time changes', async () => {
      const wrapper = mount(STimeRangeField, {
        attachTo: document.body,
        props: {
          modelValue: {
            start: new Time(9, 0, 0),
            end: new Time(17, 30, 0)
          },
          'aria-label': 'Time range'
        }
      });

      const startPart = wrapper.find('[data-time-range-field-part="start"]');
      const minuteSegment = startPart.find('[data-segment="minute"]');

      await minuteSegment.trigger('focusin');
      await minuteSegment.trigger('keydown', { key: '4', preventDefault() {} });
      await minuteSegment.trigger('keydown', { key: '5', preventDefault() {} });

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      wrapper.unmount();
    });

    it('validates that end time is not before start time', () => {
      const wrapper = mount(STimeRangeField, {
        attachTo: document.body,
        props: {
          modelValue: {
            start: new Time(17, 30, 0),
            end: new Time(9, 0, 0)
          },
          'aria-label': 'Invalid time range'
        }
      });

      expect(wrapper.attributes('data-invalid')).toBeDefined();
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('marks all segments as disabled and prevents tab focus', () => {
      const wrapper = mount(STimeRangeField, {
        attachTo: document.body,
        props: {
          disabled: true,
          modelValue: {
            start: new Time(9, 0, 0),
            end: new Time(17, 30, 0)
          },
          'aria-label': 'Disabled time range'
        }
      });

      expect(wrapper.attributes('data-disabled')).toBeDefined();

      const segments = wrapper.findAll('[data-segment]:not([data-segment="literal"])');

      segments.forEach(segment => {
        expect(segment.attributes('data-disabled')).toBeDefined();
        expect(segment.attributes('tabindex')).toBeUndefined();
      });

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('passes basic a11y checks', async () => {
      const wrapper = mount(STimeRangeField, {
        attachTo: document.body,
        props: {
          modelValue: {
            start: new Time(9, 0, 0),
            end: new Time(17, 30, 0)
          },
          'aria-label': 'Working hours range'
        }
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toEqual([]);
      wrapper.unmount();
    });

    it('has proper role for the root container', () => {
      const wrapper = mount(STimeRangeField, {
        attachTo: document.body,
        props: {
          modelValue: {
            start: new Time(9, 0, 0),
            end: new Time(17, 30, 0)
          },
          'aria-label': 'Time range'
        }
      });

      expect(wrapper.attributes('role')).toBe('group');
      wrapper.unmount();
    });
  });
});
