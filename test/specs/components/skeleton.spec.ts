import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SSkeleton from '../../../src/components/skeleton/skeleton.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SSkeleton', () => {
  describe('rendering', () => {
    it('renders as a div by default', () => {
      const wrapper = mount(SSkeleton, { attachTo: document.body });

      expect(wrapper.find('div').exists()).toBe(true);
      expect(wrapper.find('div').attributes('aria-hidden')).toBe('true');

      wrapper.unmount();
    });

    it('applies custom class', () => {
      const wrapper = mount(SSkeleton, {
        props: { class: 'w-80' },
        attachTo: document.body
      });

      expect(wrapper.find('div').classes()).toContain('w-80');

      wrapper.unmount();
    });

    it('supports preset shape and animation variants', () => {
      const wrapper = mount(SSkeleton, {
        props: { shape: 'rounded', animated: false },
        attachTo: document.body
      });

      const classes = wrapper.find('div').classes();

      expect(classes).toContain('rounded-full');
      expect(classes).not.toContain('animate-pulse');

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SSkeleton, { attachTo: document.body });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
