import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { getA11yViolations } from '../../shared/a11y';
import SColorSwatch from '../../../src/components/color-swatch/color-swatch.vue';

describe('SColorSwatch', () => {
  describe('rendering', () => {
    it('renders an accessible color image', () => {
      const wrapper = mount(SColorSwatch, {
        props: { color: '#7c3aed', label: 'Accent' },
        attachTo: document.body
      });

      const swatch = wrapper.find('[role="img"]');

      expect(swatch.exists()).toBe(true);
      expect(swatch.attributes('aria-label')).toBe('Accent');
      wrapper.unmount();
    });

    it('marks empty colors as no-color', () => {
      const wrapper = mount(SColorSwatch, {
        props: { color: '' },
        attachTo: document.body
      });

      expect(wrapper.find('[role="img"]').attributes('data-no-color')).toBe('');
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SColorSwatch, {
        props: { color: '#7c3aed', label: 'Accent' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
