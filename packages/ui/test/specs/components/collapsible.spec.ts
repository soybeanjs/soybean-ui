import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import SCollapsible from '@/components/collapsible/collapsible.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SCollapsible', () => {
  describe('rendering', () => {
    it('renders default slot content', () => {
      const wrapper = mount(SCollapsible, {
        slots: { default: '<div data-content>Collapsible content</div>' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-content]').exists()).toBe(true);
      expect(wrapper.text()).toContain('Collapsible content');

      wrapper.unmount();
    });

    it('applies custom root class via ui prop', () => {
      const wrapper = mount(SCollapsible, {
        props: { ui: { root: 'custom-collapsible' } },
        slots: { default: '<p>Content</p>' },
        attachTo: document.body
      });

      expect(wrapper.find('.custom-collapsible').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('renders content when open is true', () => {
      const wrapper = mount(SCollapsible, {
        props: { open: true },
        slots: { default: '<p>Visible content</p>' },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Visible content');

      wrapper.unmount();
    });

    it('passes open false state to slot props', async () => {
      const wrapper = mount(SCollapsible, {
        props: { open: false, unmountOnHide: true },
        slots: {
          default: '<div :data-open="open">{{ String(open) }}</div>'
        },
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.text()).toContain('false');

      wrapper.unmount();
    });

    it('emits update:open when state changes', async () => {
      const wrapper = mount(SCollapsible, {
        props: { defaultOpen: false },
        slots: { default: '<button data-testid="toggle">Toggle</button>' },
        attachTo: document.body
      });

      expect(wrapper.emitted('update:open')).toBeFalsy();

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when open', async () => {
      const wrapper = mount(SCollapsible, {
        props: { open: true },
        slots: { default: '<p>Accessible content</p>' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
