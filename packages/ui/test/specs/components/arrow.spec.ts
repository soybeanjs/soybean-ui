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
      expect(svg.attributes('preserveAspectRatio')).toBe('none');

      wrapper.unmount();
    });

    it('renders the arrow path', () => {
      const wrapper = mount(SArrow, { attachTo: document.body });

      const path = wrapper.get('path');
      expect(path.attributes('d')).toBe('M 0,0 L 6,6 L 12,0');

      wrapper.unmount();
    });

    it('forwards class to the svg element', () => {
      const wrapper = mount(SArrow, {
        props: { class: 'w-8 h-4 fill-popover' },
        attachTo: document.body
      });

      const svg = wrapper.get('svg');
      expect(svg.classes()).toContain('w-8');
      expect(svg.classes()).toContain('h-4');
      expect(svg.classes()).toContain('fill-popover');

      wrapper.unmount();
    });

    it('forwards style to the svg element', () => {
      const wrapper = mount(SArrow, {
        attrs: { style: 'color: red' },
        attachTo: document.body
      });

      expect(wrapper.get('svg').attributes('style')).toContain('color: red');

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('defaults to aria-hidden="true"', () => {
      const wrapper = mount(SArrow, { attachTo: document.body });

      expect(wrapper.get('svg').attributes('aria-hidden')).toBe('true');
      wrapper.unmount();
    });

    it('sets focusable="false" to prevent focus on legacy browsers', () => {
      const wrapper = mount(SArrow, { attachTo: document.body });

      expect(wrapper.get('svg').attributes('focusable')).toBe('false');
      wrapper.unmount();
    });

    it('has no a11y violations', async () => {
      const wrapper = mount(SArrow, {
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
