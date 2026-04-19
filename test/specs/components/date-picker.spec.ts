import { mount } from '@vue/test-utils';
import { CalendarDate } from '@internationalized/date';
import { describe, expect, it } from 'vitest';

import { SDatePicker } from '@soybeanjs/ui';

describe('sDatePicker', () => {
  describe('rendering', () => {
    it('should render with default slot', () => {
      const wrapper = mount(SDatePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new CalendarDate(2024, 1, 1)
        }
      });

      expect(wrapper.find('[data-slot="root"]').exists()).toBe(true);
      expect(wrapper.find('[data-slot="trigger"]').exists()).toBe(true);

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

      const root = wrapper.find('[data-slot="root"]');

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

      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(false);

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

      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('should toggle popup on trigger click', async () => {
      const wrapper = mount(SDatePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new CalendarDate(2024, 1, 1)
        }
      });

      const trigger = wrapper.find('[data-slot="trigger"]');

      await trigger.trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('should emit update:open when trigger is clicked', async () => {
      const wrapper = mount(SDatePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new CalendarDate(2024, 1, 1)
        }
      });

      const trigger = wrapper.find('[data-slot="trigger"]');

      await trigger.trigger('click');

      expect(wrapper.emitted('update:open')).toBeTruthy();
      expect(wrapper.emitted('update:open')?.[0]).toEqual([true]);

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

      const root = wrapper.find('[data-slot="root"]');

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

      const trigger = wrapper.find('[data-slot="trigger"]');

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

      const trigger = wrapper.find('[data-slot="trigger"]');

      await trigger.trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.find('[data-slot="popup"]').exists()).toBe(false);

      wrapper.unmount();
    });
  });

  describe('modelValue', () => {
    it('should emit update:modelValue when date is selected', async () => {
      const wrapper = mount(SDatePicker, {
        attachTo: document.body,
        props: {
          defaultPlaceholder: new CalendarDate(2024, 1, 1),
          defaultOpen: true
        }
      });

      await wrapper.vm.$nextTick();

      const cellTrigger = wrapper.find('[data-slot="cellTrigger"]');

      if (cellTrigger.exists()) {
        await cellTrigger.trigger('click');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      }

      wrapper.unmount();
    });
  });
});
