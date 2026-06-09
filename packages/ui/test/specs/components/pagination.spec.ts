import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SPagination from '@/components/pagination/pagination.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SPagination', () => {
  describe('rendering', () => {
    it('renders a nav element with pagination root', () => {
      const wrapper = mount(SPagination, {
        props: { total: 100, pageSize: 10 },
        attachTo: document.body
      });

      expect(wrapper.find('nav').exists()).toBe(true);

      wrapper.unmount();
    });

    it('applies custom root class', () => {
      const wrapper = mount(SPagination, {
        props: { total: 50, pageSize: 10, class: 'my-pagination' },
        attachTo: document.body
      });

      expect(wrapper.find('.my-pagination').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SPagination, {
        props: { total: 50, pageSize: 10 },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
