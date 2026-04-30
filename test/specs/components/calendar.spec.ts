import type { DateValue } from '@internationalized/date';

import { CalendarDate } from '@internationalized/date';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import SCalendar from '../../../src/components/calendar/calendar.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SCalendar', () => {
  describe('rendering', () => {
    it('renders the current heading and weekday cells', () => {
      const wrapper = mount(SCalendar, {
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
      const wrapper = mount(SCalendar, {
        props: {
          class: 'calendar-root-test',
          defaultPlaceholder: new CalendarDate(2026, 4, 18)
        },
        attachTo: document.body
      });

      expect(wrapper.classes()).toContain('calendar-root-test');
      wrapper.unmount();
    });
  });

  describe('selected state', () => {
    it('marks the controlled date as selected', () => {
      const wrapper = mount(SCalendar, {
        props: {
          defaultPlaceholder: new CalendarDate(2026, 4, 18),
          modelValue: new CalendarDate(2026, 4, 18)
        },
        attachTo: document.body
      });

      const selected = wrapper.get('[data-value="2026-04-18"]');
      expect(selected.attributes('data-selected')).toBeDefined();
      wrapper.unmount();
    });

    it('emits update:modelValue when a date is clicked', async () => {
      const wrapper = mount(SCalendar, {
        props: {
          defaultPlaceholder: new CalendarDate(2026, 4, 18)
        },
        attachTo: document.body
      });

      await wrapper.get('[data-value="2026-04-20"]').trigger('click');
      const emitted = wrapper.emitted('update:modelValue');

      expect(emitted).toBeTruthy();
      expect(((emitted as NonNullable<typeof emitted>)[0][0] as CalendarDate).toString()).toBe('2026-04-20');
      wrapper.unmount();
    });

    it('updates multiple selection when a date is clicked', async () => {
      const wrapper = mount(SCalendar, {
        props: {
          multiple: true,
          defaultPlaceholder: new CalendarDate(2026, 4, 18),
          modelValue: [new CalendarDate(2026, 4, 18), new CalendarDate(2026, 4, 21)]
        },
        attachTo: document.body
      });

      await wrapper.get('[data-value="2026-04-20"]').trigger('click');

      const emitted = wrapper.emitted('update:modelValue');

      expect(emitted).toBeTruthy();
      expect(((emitted as NonNullable<typeof emitted>)[0][0] as CalendarDate[]).map(date => date.toString())).toEqual([
        '2026-04-18',
        '2026-04-21',
        '2026-04-20'
      ]);

      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('disables matching dates and prevents selection', async () => {
      const wrapper = mount(SCalendar, {
        props: {
          defaultPlaceholder: new CalendarDate(2026, 4, 18),
          isDateDisabled: (date: DateValue) => date.day === 18
        },
        attachTo: document.body
      });

      const disabled = wrapper.get('[data-value="2026-04-18"]');
      expect(disabled.attributes('data-disabled')).toBeDefined();
      expect((disabled.element as HTMLButtonElement).disabled).toBe(true);

      await disabled.trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations in the default state', async () => {
      const wrapper = mount(SCalendar, {
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
