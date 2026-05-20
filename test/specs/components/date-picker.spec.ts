import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { SDatePicker } from '@soybeanjs/ui';
import { CalendarDate } from '@internationalized/date';

describe('sDatePicker', () => {
  const findPopup = () => document.body.querySelector('[data-dismissable-layer][role="dialog"]');
  const findTrigger = (wrapper: ReturnType<typeof mount>) => wrapper.find('button[aria-haspopup="dialog"]');
  const waitForDismissableLayer = async () => new Promise(resolve => window.setTimeout(resolve, 0));

  describe('rendering', () => {
    it('should render with default slot', () => {
      const wrapper = mount(SDatePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new CalendarDate(2024, 1, 1)
        }
      });

      expect(wrapper.find('[data-soybean-date-field-root]').exists()).toBe(true);
      expect(findTrigger(wrapper).exists()).toBe(true);

      wrapper.unmount();
    });

    it('should render with custom class', () => {
      const wrapper = mount(SDatePicker, {
        attachTo: document.body,
        props: {
          class: 'custom-class',
          defaultPlaceholder: new CalendarDate(2024, 1, 1)
        }
      });

      const root = wrapper.find('[data-soybean-date-field-root]');

      expect(root.classes()).toContain('custom-class');

      wrapper.unmount();
    });

    it('should not show popup by default', () => {
      const wrapper = mount(SDatePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new CalendarDate(2024, 1, 1)
        }
      });

      expect(findPopup()).toBeNull();

      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('should show popup when open is true', async () => {
      const wrapper = mount(SDatePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new CalendarDate(2024, 1, 1),
          defaultOpen: true
        }
      });

      await wrapper.vm.$nextTick();

      expect(findPopup()).not.toBeNull();

      wrapper.unmount();
    });

    it('should toggle popup on trigger click', async () => {
      const wrapper = mount(SDatePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new CalendarDate(2024, 1, 1)
        }
      });

      const trigger = findTrigger(wrapper);

      await trigger.trigger('click');
      await wrapper.vm.$nextTick();

      expect(findPopup()).not.toBeNull();

      wrapper.unmount();
    });

    it('should emit update:open when trigger is clicked', async () => {
      const wrapper = mount(SDatePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new CalendarDate(2024, 1, 1)
        }
      });

      const trigger = findTrigger(wrapper);

      await trigger.trigger('click');

      expect(wrapper.emitted('update:open')).toBeTruthy();
      expect(wrapper.emitted('update:open')?.[0]).toEqual([true]);

      wrapper.unmount();
    });

    it('should close popup when clicking outside', async () => {
      const wrapper = mount(SDatePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new CalendarDate(2024, 1, 1),
          defaultOpen: true
        }
      });

      await nextTick();
      await waitForDismissableLayer();

      expect(findPopup()).not.toBeNull();

      document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await nextTick();

      expect(findPopup()).toBeNull();
      expect(wrapper.emitted('update:open')).toBeTruthy();

      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('should have data-disabled attribute when disabled', () => {
      const wrapper = mount(SDatePicker, {
        attachTo: document.body,
        props: {
          disabled: true,
          defaultPlaceholder: new CalendarDate(2024, 1, 1)
        }
      });

      const root = wrapper.find('[data-soybean-date-field-root]');

      expect(root.attributes('data-disabled')).toBe('');

      wrapper.unmount();
    });

    it('should have aria-disabled on trigger when disabled', () => {
      const wrapper = mount(SDatePicker, {
        attachTo: document.body,
        props: {
          disabled: true,
          defaultPlaceholder: new CalendarDate(2024, 1, 1)
        }
      });

      const trigger = findTrigger(wrapper);

      expect(trigger.attributes('aria-disabled')).toBe('true');

      wrapper.unmount();
    });

    it('should not open popup when disabled', async () => {
      const wrapper = mount(SDatePicker, {
        attachTo: document.body,
        props: {
          disabled: true,
          defaultPlaceholder: new CalendarDate(2024, 1, 1)
        }
      });

      const trigger = findTrigger(wrapper);

      await trigger.trigger('click');
      await wrapper.vm.$nextTick();

      expect(findPopup()).toBeNull();

      wrapper.unmount();
    });
  });

  describe('modelValue', () => {
    it('should emit update:modelValue and close popup when date is selected', async () => {
      const wrapper = mount(SDatePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new CalendarDate(2024, 1, 1),
          defaultOpen: true
        }
      });

      await nextTick();

      const calendarAction = document.body.querySelector('[data-value="2024-01-02"]');

      expect(calendarAction).not.toBeNull();

      calendarAction?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await nextTick();

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(findPopup()).toBeNull();

      wrapper.unmount();
    });
  });
});
