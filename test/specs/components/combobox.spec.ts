import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SCombobox from '../../../src/components/combobox/combobox.vue';
import { getA11yViolations } from '../../shared/a11y';

const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' }
];

describe('SCombobox', () => {
  describe('rendering', () => {
    it('renders placeholder text', () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          placeholder: 'Select a fruit'
        },
        attachTo: document.body
      });

      expect(wrapper.get('[role="combobox"]').text()).toContain('Select a fruit');
      wrapper.unmount();
    });

    it('applies custom class', () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          class: 'my-combobox'
        },
        attachTo: document.body
      });

      expect(wrapper.get('[role="combobox"]').classes()).toContain('my-combobox');
      wrapper.unmount();
    });
  });

  describe('selection state', () => {
    it('reflects the selected label from modelValue', () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          modelValue: 'banana'
        },
        attachTo: document.body
      });

      expect(wrapper.get('[role="combobox"]').text()).toContain('Banana');
      wrapper.unmount();
    });

    it('emits update:modelValue and select on interaction', async () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          placeholder: 'Select a fruit'
        },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      const option = document.body.querySelector('[role="option"]') as HTMLElement | null;
      expect(option).not.toBeNull();

      option?.click();
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('select')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['apple']);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('prevents interaction when disabled', async () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          disabled: true,
          placeholder: 'Disabled'
        },
        attachTo: document.body
      });

      const trigger = wrapper.get('[role="combobox"]');
      expect(trigger.attributes('data-disabled')).toBe('');

      await trigger.trigger('click');
      expect(document.body.querySelector('[role="listbox"]')).toBeNull();
      expect(wrapper.emitted('update:open')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SCombobox, {
        props: {
          items,
          placeholder: 'Select a fruit'
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
