import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { getA11yViolations } from '../../shared/a11y';
import { SAspectRatio } from '../../../src/components/aspect-ratio';

describe('SAspectRatio', () => {
  describe('rendering', () => {
    it('renders with default 1:1 ratio', () => {
      const wrapper = mount(SAspectRatio, {
        slots: { default: '<img src="test.jpg" alt="test" />' },
        attachTo: document.body
      });

      const wrapperEl = wrapper.get('[data-soybean-aspect-ratio-wrapper]');
      // 1:1 ratio → paddingBottom = (1/1) * 100 = 100%
      expect(wrapperEl.attributes('style')).toContain('padding-bottom: 100%');

      wrapper.unmount();
    });

    it('renders with a custom ratio', () => {
      const wrapper = mount(SAspectRatio, {
        props: { ratio: 16 / 9 },
        slots: { default: '<img src="test.jpg" alt="test" />' },
        attachTo: document.body
      });

      const wrapperEl = wrapper.get('[data-soybean-aspect-ratio-wrapper]');
      // 16:9 ratio → paddingBottom = (9/16) * 100 ≈ 56.25%
      expect(wrapperEl.attributes('style')).toContain('padding-bottom: 56.25%');

      wrapper.unmount();
    });

    it('renders slot content inside the aspect ratio container', () => {
      const wrapper = mount(SAspectRatio, {
        slots: { default: '<span data-child>Content</span>' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-child]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-aspect-ratio]').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SAspectRatio, {
        slots: { default: '<img src="test.jpg" alt="A test image" />' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
