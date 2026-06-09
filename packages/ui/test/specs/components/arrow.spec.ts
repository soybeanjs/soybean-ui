import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { SArrow } from '@/components/arrow';
import { getA11yViolations } from '../../shared/a11y';

describe('SArrow', () => {
  describe('rendering', () => {
    it('renders an SVG arrow element', () => {
      const wrapper = mount(SArrow, { attachTo: document.body });

      const svg = wrapper.get('svg');
      expect(svg.attributes('data-soybean-arrow')).toBe('');
      expect(svg.attributes('viewBox')).toBe('0 0 12 6');

      wrapper.unmount();
    });

    it('renders the arrow path', () => {
      const wrapper = mount(SArrow, { attachTo: document.body });

      const path = wrapper.get('path');
      expect(path.attributes('d')).toBe('M 0,0 L 6,6 L 12,0');

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SArrow, {
        attrs: { 'aria-hidden': 'true' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
