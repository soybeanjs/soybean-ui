import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SSeparator from '../../../src/components/separator/separator.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SSeparator', () => {
  describe('rendering', () => {
    it('renders a separator with the default horizontal orientation', () => {
      const wrapper = mount(SSeparator, { attachTo: document.body });
      const separator = wrapper.get('[role="separator"]');

      expect(separator.attributes('data-orientation')).toBe('horizontal');
      expect(separator.attributes('data-soybean-separator-root')).toBe('');
      wrapper.unmount();
    });

    it('renders label text from the label prop', () => {
      const wrapper = mount(SSeparator, {
        props: { label: 'Section' },
        attachTo: document.body
      });

      expect(wrapper.get('[data-soybean-separator-label]').text()).toBe('Section');
      wrapper.unmount();
    });

    it('renders the default slot inside the label', () => {
      const wrapper = mount(SSeparator, {
        slots: { default: 'Slot label' },
        attachTo: document.body
      });

      expect(wrapper.get('[data-soybean-separator-label]').text()).toBe('Slot label');
      wrapper.unmount();
    });

    it('merges custom root and label classes', () => {
      const wrapper = mount(SSeparator, {
        props: {
          class: 'custom-root',
          ui: {
            label: 'custom-label'
          },
          label: 'Section'
        },
        attachTo: document.body
      });

      expect(wrapper.get('[data-soybean-separator-root]').classes()).toContain('custom-root');
      expect(wrapper.get('[data-soybean-separator-label]').classes()).toContain('custom-label');
      wrapper.unmount();
    });
  });

  describe('orientation state', () => {
    it('does not render a label for vertical separators', () => {
      const wrapper = mount(SSeparator, {
        props: {
          orientation: 'vertical',
          label: 'Section'
        },
        attachTo: document.body
      });

      expect(wrapper.get('[role="separator"]').attributes('data-orientation')).toBe('vertical');
      expect(wrapper.find('[data-soybean-separator-label]').exists()).toBe(false);
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations with a visible label', async () => {
      const wrapper = mount(SSeparator, {
        props: { label: 'Section' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
