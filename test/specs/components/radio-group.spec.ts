import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SRadioGroup from '../../../src/components/radio-group/radio-group.vue';
import { getA11yViolations } from '../../shared/a11y';

const items = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3', disabled: true }
];

describe('SRadioGroup', () => {
  describe('rendering', () => {
    it('renders a radio control for each item', () => {
      const wrapper = mount(SRadioGroup, {
        props: { items },
        attachTo: document.body
      });

      expect(wrapper.findAll('[role="radio"]')).toHaveLength(items.length);
      expect(wrapper.text()).toContain('Option 1');
      wrapper.unmount();
    });

    it('merges a custom class onto the root container', () => {
      const wrapper = mount(SRadioGroup, {
        props: { items, class: 'radio-group-root-class' },
        attachTo: document.body
      });

      expect(wrapper.find('.radio-group-root-class').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('active state', () => {
    it('reflects the checked item with aria-checked', () => {
      const wrapper = mount(SRadioGroup, {
        props: { items, modelValue: 'option-1' },
        attachTo: document.body
      });

      expect(wrapper.findAll('[role="radio"]')[0].attributes('aria-checked')).toBe('true');
      expect(wrapper.findAll('[role="radio"]')[1].attributes('aria-checked')).toBe('false');
      wrapper.unmount();
    });

    it('emits update:modelValue when a radio is clicked', async () => {
      const wrapper = mount(SRadioGroup, {
        props: { items, modelValue: 'option-1' },
        attachTo: document.body
      });

      await wrapper.findAll('[role="radio"]')[1].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0][0]).toBe('option-2');
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('applies disabled to disabled radio items', () => {
      const wrapper = mount(SRadioGroup, {
        props: { items },
        attachTo: document.body
      });

      const disabledControl = wrapper.findAll('[role="radio"]')[2];
      // @ts-expect-error - Vue Test Utils does not recognize the disabled property on role selectors
      expect(disabledControl.element.disabled).toBe(true);
      wrapper.unmount();
    });

    it('does not emit update:modelValue when a disabled radio is clicked', async () => {
      const wrapper = mount(SRadioGroup, {
        props: { items, modelValue: 'option-1' },
        attachTo: document.body
      });

      await wrapper.findAll('[role="radio"]')[2].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SRadioGroup, {
        props: { items, modelValue: 'option-1' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
