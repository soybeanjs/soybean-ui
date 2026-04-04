import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SCheckbox from '../../../src/components/checkbox/checkbox.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SCheckbox', () => {
  describe('rendering', () => {
    it('renders a checkbox control', () => {
      const wrapper = mount(SCheckbox, { attachTo: document.body });
      // CheckboxControl renders as a div with role="checkbox"
      expect(wrapper.find('[role="checkbox"]').exists()).toBe(true);
      wrapper.unmount();
    });

    it('renders label text when label prop is provided', () => {
      const wrapper = mount(SCheckbox, {
        props: { label: 'Accept terms' },
        attachTo: document.body
      });
      expect(wrapper.text()).toContain('Accept terms');
      wrapper.unmount();
    });

    it('renders default slot as label', () => {
      const wrapper = mount(SCheckbox, {
        slots: { default: 'My checkbox' },
        attachTo: document.body
      });
      expect(wrapper.text()).toContain('My checkbox');
      wrapper.unmount();
    });
  });

  describe('checked state', () => {
    it('is unchecked by default', () => {
      const wrapper = mount(SCheckbox, { attachTo: document.body });
      const control = wrapper.find('[role="checkbox"]');
      expect(control.attributes('aria-checked')).toBe('false');
      wrapper.unmount();
    });

    it('reflects modelValue=true as checked', () => {
      const wrapper = mount(SCheckbox, {
        props: { modelValue: true },
        attachTo: document.body
      });
      const control = wrapper.find('[role="checkbox"]');
      expect(control.attributes('aria-checked')).toBe('true');
      wrapper.unmount();
    });

    it('reflects modelValue="indeterminate" state', () => {
      const wrapper = mount(SCheckbox, {
        props: { modelValue: 'indeterminate' },
        attachTo: document.body
      });
      const control = wrapper.find('[role="checkbox"]');
      expect(control.attributes('aria-checked')).toBe('mixed');
      wrapper.unmount();
    });

    it('emits update:modelValue on click', async () => {
      const wrapper = mount(SCheckbox, {
        props: { modelValue: false },
        attachTo: document.body
      });
      await wrapper.find('[role="checkbox"]').trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('applies disabled to checkbox control when disabled', () => {
      const wrapper = mount(SCheckbox, {
        props: { disabled: true },
        attachTo: document.body
      });
      const control = wrapper.find('[role="checkbox"]');
      // CheckboxControl uses native disabled
      // @ts-expect-error - Vue Test Utils does not recognize the disabled attribute on non-native elements
      expect(control.element.disabled).toBe(true);
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations with a label prop', async () => {
      const wrapper = mount(SCheckbox, {
        props: { label: 'Accept terms' },
        attachTo: document.body
      });
      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
