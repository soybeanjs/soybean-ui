import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SInput from '../../../src/components/input/input.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SInput', () => {
  describe('rendering', () => {
    it('renders an input element', () => {
      const wrapper = mount(SInput, { attachTo: document.body });
      expect(wrapper.find('input').exists()).toBe(true);
      wrapper.unmount();
    });

    it('passes placeholder attribute', () => {
      const wrapper = mount(SInput, {
        attrs: { placeholder: 'Enter text' },
        attachTo: document.body
      });
      expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text');
      wrapper.unmount();
    });

    it('passes type attribute', () => {
      const wrapper = mount(SInput, {
        attrs: { type: 'email' },
        attachTo: document.body
      });
      expect(wrapper.find('input').attributes('type')).toBe('email');
      wrapper.unmount();
    });

    it('applies custom class to root element', () => {
      const wrapper = mount(SInput, {
        props: { class: 'my-input' },
        attachTo: document.body
      });
      // Root element should carry the custom class
      expect(wrapper.html()).toContain('my-input');
      wrapper.unmount();
    });
  });

  describe('model value', () => {
    it('reflects modelValue in input', () => {
      const wrapper = mount(SInput, {
        props: { modelValue: 'hello' },
        attachTo: document.body
      });
      expect(wrapper.find('input').element.value).toBe('hello');
      wrapper.unmount();
    });

    it('emits update:modelValue on input', async () => {
      const wrapper = mount(SInput, { attachTo: document.body });
      await wrapper.find('input').setValue('typed text');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['typed text']);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('applies disabled attribute', () => {
      const wrapper = mount(SInput, {
        props: { disabled: true },
        attachTo: document.body
      });
      expect(wrapper.find('input').element.disabled).toBe(true);
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when paired with a label', async () => {
      // Wrap in a labelled form field to satisfy a11y rules
      const wrapper = mount(
        {
          template: `
            <div>
              <label for="test-input">Name</label>
              <SInput id="test-input" />
            </div>
          `,
          components: { SInput }
        },
        { attachTo: document.body }
      );
      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
