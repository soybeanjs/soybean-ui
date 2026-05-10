import { CalendarDate } from '@internationalized/date';
import type { DateValue } from '@internationalized/date';
import { DOMWrapper, flushPromises, mount } from '@vue/test-utils';
import { defineComponent, nextTick, shallowRef } from 'vue';
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
    it('switches the visible month and year from compact heading controls', async () => {
      const wrapper = mount(SCalendar, {
        props: {
          defaultPlaceholder: new CalendarDate(2026, 4, 18)
        },
        attachTo: document.body
      });

      await wrapper.get('button[aria-label="Select year"]').trigger('pointerdown', {
        button: 0,
        ctrlKey: false,
        pageX: 0,
        pageY: 0,
        pointerId: 1,
        pointerType: 'mouse'
      });
      await nextTick();

      const yearOption = Array.from(document.body.querySelectorAll('[role="option"]')).find(node =>
        node.textContent?.includes('2027')
      );

      expect(yearOption).toBeTruthy();

      await new DOMWrapper(yearOption as Element).trigger('keydown', { key: 'Enter' });
      await flushPromises();
      await nextTick();

      expect(wrapper.text()).toContain('April');
      expect(wrapper.text()).toContain('2027');

      await wrapper.get('button[aria-label="Select month"]').trigger('pointerdown', {
        button: 0,
        ctrlKey: false,
        pageX: 0,
        pageY: 0,
        pointerId: 2,
        pointerType: 'mouse'
      });
      await nextTick();

      const monthOption = Array.from(document.body.querySelectorAll('[role="option"]')).find(node =>
        node.textContent?.includes('May')
      );

      expect(monthOption).toBeTruthy();

      await new DOMWrapper(monthOption as Element).trigger('keydown', { key: 'Enter' });
      await flushPromises();
      await nextTick();

      expect(wrapper.text()).toContain('May');
      expect(wrapper.text()).toContain('2027');
      wrapper.unmount();
    });

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

    it('supports boolean shorthand multiple in template usage', async () => {
      const Demo = defineComponent({
        components: {
          SCalendar
        },
        setup() {
          const value = shallowRef([new CalendarDate(2026, 4, 18), new CalendarDate(2026, 4, 21)]);

          return {
            value
          };
        },
        template: '<SCalendar v-model="value" multiple :default-placeholder="value[0]" />'
      });

      const wrapper = mount(Demo, {
        attachTo: document.body
      });

      await wrapper.get('[data-soybean-calendar-cell-trigger][data-value="2026-04-20"]').trigger('click');
      await nextTick();

      const selected = wrapper
        .findAll('[data-soybean-calendar-cell-trigger][data-selected]')
        .map(node => node.attributes('data-value'));

      expect(selected).toEqual(['2026-04-18', '2026-04-20', '2026-04-21']);
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
