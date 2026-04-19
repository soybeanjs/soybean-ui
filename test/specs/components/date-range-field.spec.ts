import { CalendarDate, CalendarDateTime } from '@internationalized/date';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import SDateRangeField from '../../../src/components/date-range-field/date-range-field.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SDateRangeField', () => {
  describe('rendering', () => {
    it('renders start and end date segments with custom class', () => {
      const wrapper = mount(SDateRangeField, {
        attachTo: document.body,
        props: {
          class: 'test-date-range-field',
          modelValue: {
            start: new CalendarDate(2026, 4, 19),
            end: new CalendarDate(2026, 4, 26)
          },
          'aria-label': 'Date range'
        }
      });

      expect(wrapper.classes()).toContain('test-date-range-field');
      expect(wrapper.findAll('[data-soybean-date-field-segment]').length).toBeGreaterThanOrEqual(10);
      
      const startPart = wrapper.find('[data-date-range-field-part="start"]');
      const endPart = wrapper.find('[data-date-range-field-part="end"]');
      
      expect(startPart.exists()).toBe(true);
      expect(endPart.exists()).toBe(true);
      wrapper.unmount();
    });

    it('renders time segments when using date-time values', () => {
      const wrapper = mount(SDateRangeField, {
        attachTo: document.body,
        props: {
          modelValue: {
            start: new CalendarDateTime(2026, 4, 19, 9, 0),
            end: new CalendarDateTime(2026, 4, 19, 17, 30)
          },
          granularity: 'minute',
          'aria-label': 'Time range'
        }
      });

      const hourSegments = wrapper.findAll('[data-segment="hour"]');
      const minuteSegments = wrapper.findAll('[data-segment="minute"]');
      
      expect(hourSegments.length).toBeGreaterThanOrEqual(2);
      expect(minuteSegments.length).toBeGreaterThanOrEqual(2);
      wrapper.unmount();
    });

    it('renders custom separator', () => {
      const wrapper = mount(SDateRangeField, {
        attachTo: document.body,
        props: {
          modelValue: {
            start: new CalendarDate(2026, 4, 19),
            end: new CalendarDate(2026, 4, 26)
          },
          separator: '→',
          'aria-label': 'Date range'
        }
      });

      expect(wrapper.text()).toContain('→');
      wrapper.unmount();
    });
  });

  describe('state', () => {
    it('emits update:modelValue when start date changes', async () => {
      const wrapper = mount(SDateRangeField, {
        attachTo: document.body,
        props: {
          modelValue: {
            start: new CalendarDate(2026, 4, 19),
            end: new CalendarDate(2026, 4, 26)
          },
          'aria-label': 'Date range'
        }
      });

      const startPart = wrapper.find('[data-date-range-field-part="start"]');
      const daySegment = startPart.find('[data-segment="day"]');

      await daySegment.trigger('focusin');
      await daySegment.trigger('keydown', { key: '2', preventDefault() {} });
      await daySegment.trigger('keydown', { key: '0', preventDefault() {} });

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      wrapper.unmount();
    });

    it('validates that end date is not before start date', () => {
      const wrapper = mount(SDateRangeField, {
        attachTo: document.body,
        props: {
          modelValue: {
            start: new CalendarDate(2026, 4, 26),
            end: new CalendarDate(2026, 4, 19)
          },
          'aria-label': 'Invalid date range'
        }
      });

      expect(wrapper.attributes('data-invalid')).toBeDefined();
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('marks all segments as disabled and prevents tab focus', () => {
      const wrapper = mount(SDateRangeField, {
        attachTo: document.body,
        props: {
          disabled: true,
          modelValue: {
            start: new CalendarDate(2026, 4, 19),
            end: new CalendarDate(2026, 4, 26)
          },
          'aria-label': 'Disabled date range'
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
      const wrapper = mount(SDateRangeField, {
        attachTo: document.body,
        props: {
          modelValue: {
            start: new CalendarDate(2026, 4, 19),
            end: new CalendarDate(2026, 4, 26)
          },
          'aria-label': 'Event date range'
        }
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toEqual([]);
      wrapper.unmount();
    });

    it('has proper role for the root container', () => {
      const wrapper = mount(SDateRangeField, {
        attachTo: document.body,
        props: {
          modelValue: {
            start: new CalendarDate(2026, 4, 19),
            end: new CalendarDate(2026, 4, 26)
          },
          'aria-label': 'Date range'
        }
      });

      expect(wrapper.attributes('role')).toBe('group');
      wrapper.unmount();
    });
  });
});
