import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SLabel from '@/components/label/label.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SLabel', () => {
  describe('rendering', () => {
    it('renders a native label element with default slot content', () => {
      const wrapper = mount(SLabel, {
        slots: { default: 'Email address' },
        attachTo: document.body
      });

      const label = wrapper.get('label');
      expect(label.attributes('data-soybean-label')).toBe('');
      expect(label.text()).toBe('Email address');

      wrapper.unmount();
    });

    it('renders the for attribute on the label', () => {
      const wrapper = mount(SLabel, {
        props: { for: 'email-input' },
        slots: { default: 'Email' },
        attachTo: document.body
      });

      expect(wrapper.get('label').attributes('for')).toBe('email-input');

      wrapper.unmount();
    });

    it('applies custom root class', () => {
      const wrapper = mount(SLabel, {
        props: { class: 'custom-label' },
        slots: { default: 'Label' },
        attachTo: document.body
      });

      expect(wrapper.get('label').classes()).toContain('custom-label');

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SLabel, {
        props: { for: 'test-input' },
        slots: { default: 'Test Label' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
