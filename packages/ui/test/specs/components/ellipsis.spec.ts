import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SEllipsis from '@/components/ellipsis/ellipsis.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SEllipsis', () => {
  describe('rendering', () => {
    it('renders the slot content', () => {
      const wrapper = mount(SEllipsis, {
        slots: { default: 'A long text that should truncate' },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('A long text that should truncate');

      wrapper.unmount();
    });

    it('applies the root class to the ellipsis element', () => {
      const wrapper = mount(SEllipsis, {
        props: { class: 'my-ellipsis' },
        slots: { default: 'Text' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-ellipsis-root]').classes()).toContain('my-ellipsis');

      wrapper.unmount();
    });

    it('sets the data-lines attribute', () => {
      const wrapper = mount(SEllipsis, {
        props: { lines: 3 },
        slots: { default: 'Text' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-ellipsis-root]').attributes('data-lines')).toBe('3');

      wrapper.unmount();
    });
  });

  describe('expandable state', () => {
    it('toggles expanded state on click and emits update:expanded', async () => {
      const wrapper = mount(SEllipsis, {
        props: { expandable: true },
        slots: { default: 'Expandable text' },
        attachTo: document.body
      });

      const root = wrapper.find('[data-soybean-ellipsis-root]');

      expect(root.attributes('data-expanded')).toBeUndefined();

      await root.trigger('click');

      expect(root.attributes('data-expanded')).toBe('');
      expect(wrapper.emitted('update:expanded')?.[0]?.[0]).toBe(true);

      wrapper.unmount();
    });

    it('reflects aria-expanded on the root when expandable', () => {
      const wrapper = mount(SEllipsis, {
        props: { expandable: true },
        slots: { default: 'Text' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-ellipsis-root]').attributes('aria-expanded')).toBe('false');

      wrapper.unmount();
    });

    it('does not emit update:expanded when not expandable', async () => {
      const wrapper = mount(SEllipsis, {
        slots: { default: 'Plain text' },
        attachTo: document.body
      });

      await wrapper.find('[data-soybean-ellipsis-root]').trigger('click');

      expect(wrapper.emitted('update:expanded')).toBeFalsy();

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SEllipsis, {
        props: { lines: 2 },
        slots: { default: 'An ellipsis paragraph that clamps to two lines' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
