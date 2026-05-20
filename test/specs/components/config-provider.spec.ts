import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { getA11yViolations } from '../../shared/a11y';
import SConfigProvider from '../../../src/components/config-provider/config-provider.vue';

describe('SConfigProvider', () => {
  describe('rendering', () => {
    it('renders default slot content', () => {
      const wrapper = mount(SConfigProvider, {
        slots: { default: '<div data-child>Child content</div>' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-child]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('renders nested components', () => {
      const wrapper = mount(SConfigProvider, {
        slots: {
          default: '<button type="button" data-testid="btn">Click</button>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-testid="btn"]').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SConfigProvider, {
        slots: { default: '<div>Accessible provider content</div>' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
