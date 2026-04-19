import type { DateValue } from '@internationalized/date';

import { CalendarDate } from '@internationalized/date';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import SRangeCalendar from '../../../src/components/range-calendar/range-calendar.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SRangeCalendar', () => {
  describe('rendering', () => {
    it('renders the current heading and weekday cells', () => {
      const wrapper = mount(SRangeCalendar, {
        props: {
          defaultPlaceholder: new CalendarDate(2026, 4, 18)
        },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('April 2026');
      expect(wrapper.text()).toContain('S');
      wrapper.unmount();
    });

    it('applies custom root classes', () => {
      const wrapper = mount(SRangeCalendar, {
        props: {
          class: 'range-calendar-root-test',
          defaultPlaceholder: new CalendarDate(2026, 4, 18)
        },
        attachTo: document.body
      });

      expect(wrapper.classes()).toContain('range-calendar-root-test');
      wrapper.unmount();
    });
  });

  describe('selected state', () => {
    it('marks the controlled range as selected', () => {
      const wrapper = mount(SRangeCalendar, {
        props: {
          defaultPlaceholder: new CalendarDate(2026, 4, 18),
          modelValue: {
            start: new CalendarDate(2026, 4, 18),
            end: new CalendarDate(2026, 4, 20)
          }
        },
        attachTo: document.body
      });

      expect(wrapper.get('[data-value="2026-04-18"]').attributes('data-selection-start')).toBeDefined();
      expect(wrapper.get('[data-value="2026-04-20"]').attributes('data-selection-end')).toBeDefined();
      expect(wrapper.get('[data-value="2026-04-19"]').attributes('data-selected')).toBeDefined();
      wrapper.unmount();
    });

    it('emits update:modelValue after selecting a range', async () => {
      const wrapper = mount(SRangeCalendar, {
        props: {
          defaultPlaceholder: new CalendarDate(2026, 4, 18)
        },
        attachTo: document.body
      });

      await wrapper.get('[data-value="2026-04-18"]').trigger('click');
      await wrapper.get('[data-value="2026-04-21"]').trigger('click');
      const emitted = wrapper.emitted('update:modelValue');

      expect(emitted).toBeTruthy();
      const hasCompleteRange = (emitted as NonNullable<typeof emitted>).some(([value]) => {
        const range = value as { start?: CalendarDate; end?: CalendarDate };
        return range.start?.toString() === '2026-04-18' && range.end?.toString() === '2026-04-21';
      });

      expect(hasCompleteRange).toBe(true);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('disables matching dates and prevents range completion', async () => {
      const wrapper = mount(SRangeCalendar, {
        props: {
          defaultPlaceholder: new CalendarDate(2026, 4, 18),
          isDateDisabled: (date: DateValue) => date.day === 19
        },
        attachTo: document.body
      });

      const disabled = wrapper.get('[data-value="2026-04-19"]');
      expect(disabled.attributes('data-disabled')).toBeDefined();
      expect((disabled.element as HTMLButtonElement).disabled).toBe(true);

      await wrapper.get('[data-value="2026-04-18"]').trigger('click');
      await disabled.trigger('click');
      const emitted = wrapper.emitted('update:modelValue');
      const last = emitted?.at(-1)?.[0] as { start?: CalendarDate; end?: CalendarDate } | undefined;
      expect(last?.end).toBeUndefined();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations in the default state', async () => {
      const wrapper = mount(SRangeCalendar, {
        props: {
          defaultPlaceholder: new CalendarDate(2026, 4, 18)
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
