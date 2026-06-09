import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { CalendarDate } from '@internationalized/date';
import SDateRangePicker from '@/components/date-range-picker/date-range-picker.vue';
import { getA11yViolations } from '../../shared/a11y';

function getPopup() {
  return document.body.querySelector('[data-soybean-popover-popup]') as HTMLElement | null;
}

describe('SDateRangePicker', () => {
  describe('rendering', () => {
    it('renders correctly with default slot', () => {
      const wrapper = mount(SDateRangePicker, {
        attachTo: document.body,
        props: {
          'data-root': '',
          triggerProps: {
            'data-soybean-popover-trigger': ''
          }
        }
      });

      expect(wrapper.find('[data-soybean-date-range-field-root]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-popover-trigger]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('renders with custom class', () => {
      const wrapper = mount(SDateRangePicker, {
        props: {
          class: 'custom-class'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-date-range-field-root]').classes()).toContain('custom-class');

      wrapper.unmount();
    });

    it('renders custom trigger props', () => {
      const wrapper = mount(SDateRangePicker, {
        props: {
          triggerProps: {
            'data-soybean-popover-trigger': '',
            class: 'custom-trigger'
          }
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-popover-trigger]').classes()).toContain('custom-trigger');

      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('opens popup when trigger is clicked', async () => {
      const wrapper = mount(SDateRangePicker, {
        attachTo: document.body,
        props: {
          triggerProps: {
            'data-soybean-popover-trigger': ''
          },
          popupProps: {
            'data-soybean-popover-popup': ''
          }
        }
      });

      const trigger = wrapper.find('[data-soybean-popover-trigger]');

      expect(wrapper.find('[data-soybean-popover-popup]').exists()).toBe(false);

      await trigger.trigger('click');
      await nextTick();

      expect(getPopup()).not.toBeNull();
      expect(trigger.attributes('data-state')).toBe('open');
      expect(trigger.attributes('aria-expanded')).toBe('true');

      wrapper.unmount();
    });

    it('emits update:open event', async () => {
      const wrapper = mount(SDateRangePicker, {
        attachTo: document.body,
        props: {
          triggerProps: {
            'data-soybean-popover-trigger': ''
          }
        }
      });

      const trigger = wrapper.find('[data-soybean-popover-trigger]');

      await trigger.trigger('click');

      expect(wrapper.emitted('update:open')).toBeTruthy();
      expect(wrapper.emitted('update:open')?.[0]).toEqual([true]);

      wrapper.unmount();
    });

    it('respects controlled open state', async () => {
      const wrapper = mount(SDateRangePicker, {
        props: {
          open: false,
          triggerProps: {
            'data-soybean-popover-trigger': ''
          },
          popupProps: {
            'data-soybean-popover-popup': ''
          }
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-popover-popup]').exists()).toBe(false);

      await wrapper.setProps({ open: true });
      await nextTick();

      expect(getPopup()).not.toBeNull();

      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('renders disabled state correctly', () => {
      const wrapper = mount(SDateRangePicker, {
        props: {
          'data-soybean-date-range-field-root': '',
          disabled: true,
          triggerProps: {
            'data-soybean-popover-trigger': ''
          },
          popupProps: {
            'data-soybean-popover-popup': ''
          }
        },
        attachTo: document.body
      });

      const root = wrapper.find('[data-soybean-date-range-field-root]');
      const trigger = wrapper.find('[data-soybean-popover-trigger]');

      expect(root.attributes('data-disabled')).toBe('');
      expect(trigger.attributes('data-disabled')).toBe('');
      expect(trigger.attributes('aria-disabled')).toBe('true');

      wrapper.unmount();
    });

    it('does not open when disabled', async () => {
      const wrapper = mount(SDateRangePicker, {
        props: {
          disabled: true,
          triggerProps: {
            'data-soybean-popover-trigger': ''
          },
          popupProps: {
            'data-soybean-popover-popup': ''
          }
        },
        attachTo: document.body
      });

      const trigger = wrapper.find('[data-soybean-popover-trigger]');

      await trigger.trigger('click');

      expect(wrapper.find('[data-soybean-popover-popup]').exists()).toBe(false);
      expect(wrapper.emitted('update:open')).toBeFalsy();

      wrapper.unmount();
    });
  });

  describe('modelValue', () => {
    it('emits update:modelValue when range changes', async () => {
      const wrapper = mount(SDateRangePicker, {
        props: {
          defaultPlaceholder: new CalendarDate(2026, 4, 18),
          triggerProps: {
            'data-soybean-popover-trigger': ''
          },
          popupProps: {
            'data-soybean-popover-popup': ''
          }
        },
        attachTo: document.body
      });

      const trigger = wrapper.find('[data-soybean-popover-trigger]');

      await trigger.trigger('click');
      await nextTick();

      const startCell = document.body.querySelector('[data-value="2026-04-18"]') as HTMLButtonElement | null;
      const endCell = document.body.querySelector('[data-value="2026-04-20"]') as HTMLButtonElement | null;

      expect(startCell).not.toBeNull();
      expect(endCell).not.toBeNull();

      startCell?.click();
      await nextTick();
      endCell?.click();
      await nextTick();

      const emitted = wrapper.emitted('update:modelValue');

      expect(emitted).toBeTruthy();
      expect(
        (
          (emitted as NonNullable<typeof emitted>)[0][0] as {
            start?: CalendarDate;
            end?: CalendarDate;
          }
        ).start?.toString()
      ).toBe('2026-04-18');
      expect(
        (
          (emitted as NonNullable<typeof emitted>)[1][0] as {
            start?: CalendarDate;
            end?: CalendarDate;
          }
        ).end?.toString()
      ).toBe('2026-04-20');
      expect(getPopup()).toBeNull();

      wrapper.unmount();
    });

    it('displays formatted date range', () => {
      const start = new CalendarDate(2024, 1, 1);
      const end = new CalendarDate(2024, 1, 31);

      const wrapper = mount(SDateRangePicker, {
        props: {
          'data-soybean-date-range-field-root': '',
          modelValue: { start, end }
        },
        attachTo: document.body
      });

      const root = wrapper.find('[data-soybean-date-range-field-root]');

      expect(root.text()).toContain('2024');
      expect(root.text()).toContain('31');
      expect(root.text()).not.toContain('yyyy');

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SDateRangePicker, {
        props: {
          triggerProps: {
            'aria-label': 'Select date range'
          }
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element as HTMLElement);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });

    it('has proper ARIA attributes on trigger', () => {
      const wrapper = mount(SDateRangePicker, {
        attachTo: document.body,
        props: {
          triggerProps: {
            'data-soybean-popover-trigger': ''
          }
        }
      });

      const trigger = wrapper.find('[data-soybean-popover-trigger]');

      expect(trigger.attributes('aria-expanded')).toBe('false');
      expect(trigger.attributes('type')).toBe('button');

      wrapper.unmount();
    });

    it('popup has dialog role', async () => {
      const wrapper = mount(SDateRangePicker, {
        props: {
          open: true,
          triggerProps: {
            'data-soybean-popover-trigger': ''
          },
          popupProps: {
            'data-soybean-popover-popup': ''
          }
        },
        attachTo: document.body
      });

      await nextTick();

      const popup = getPopup();

      expect(popup?.getAttribute('role')).toBe('dialog');

      wrapper.unmount();
    });
  });
});
