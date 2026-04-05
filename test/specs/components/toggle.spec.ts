import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SToggle from '../../../src/components/toggle/toggle.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SToggle', () => {
  describe('rendering', () => {
    it('renders default slot content', () => {
      const wrapper = mount(SToggle, {
        slots: { default: 'Bold' },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Bold');
      wrapper.unmount();
    });

    it('applies custom class', () => {
      const wrapper = mount(SToggle, {
        props: { class: 'my-toggle-class' },
        attachTo: document.body
      });

      expect(wrapper.find('button').classes()).toContain('my-toggle-class');
      wrapper.unmount();
    });
  });

  describe('pressed state', () => {
    it('is off by default', () => {
      const wrapper = mount(SToggle, {
        attachTo: document.body
      });

      const button = wrapper.find('button');

      expect(button.attributes('aria-pressed')).toBe('false');
      expect(button.attributes('data-state')).toBe('off');
      wrapper.unmount();
    });

    it('reflects modelValue as on state', () => {
      const wrapper = mount(SToggle, {
        props: { modelValue: true },
        attachTo: document.body
      });

      const button = wrapper.find('button');

      expect(button.attributes('aria-pressed')).toBe('true');
      expect(button.attributes('data-state')).toBe('on');
      wrapper.unmount();
    });

    it('emits update:modelValue on click', async () => {
      const wrapper = mount(SToggle, {
        props: { modelValue: false },
        attachTo: document.body
      });

      await wrapper.find('button').trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('prevents interaction when disabled', async () => {
      const wrapper = mount(SToggle, {
        props: { disabled: true, modelValue: false },
        attachTo: document.body
      });

      const button = wrapper.find('button');

      expect(button.attributes('disabled')).toBe('');
      await button.trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SToggle, {
        slots: { default: 'Bold' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
