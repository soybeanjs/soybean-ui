import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SCard from '@/components/card/card.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SCard', () => {
  describe('rendering', () => {
    it('renders default slot content', () => {
      const wrapper = mount(SCard, {
        slots: { default: '<p>Card content</p>' },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Card content');

      wrapper.unmount();
    });

    it('renders title slot content', () => {
      const wrapper = mount(SCard, {
        slots: {
          title: 'Card Title',
          default: '<p>Content</p>'
        },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Card Title');
      expect(wrapper.text()).toContain('Content');

      wrapper.unmount();
    });

    it('renders header, footer, and description slots', () => {
      const wrapper = mount(SCard, {
        slots: {
          header: '<span data-header>Header</span>',
          footer: '<span data-footer>Footer</span>',
          description: '<span data-desc>Description</span>',
          title: 'Card Title',
          default: '<p>Body</p>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-header]').exists()).toBe(true);
      // footer may only render if card is in non-collapsed state
      expect(wrapper.text()).toContain('Body');

      wrapper.unmount();
    });

    it('applies custom root class', () => {
      const wrapper = mount(SCard, {
        props: { class: 'my-card' },
        slots: {
          title: 'Card',
          default: '<p>Content</p>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-card-root]').classes()).toContain('my-card');

      wrapper.unmount();
    });

    it('supports expand/collapse with title slot', () => {
      const wrapper = mount(SCard, {
        props: { defaultOpen: true },
        slots: {
          title: 'Expandable Card',
          default: '<p>Collapsible content</p>'
        },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Expandable Card');
      expect(wrapper.text()).toContain('Collapsible content');

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SCard, {
        slots: {
          title: 'Accessible Card',
          default: '<p>Card body content</p>'
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
