import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SEmpty from '../../../src/components/empty/empty.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SEmpty', () => {
  describe('rendering', () => {
    it('renders title, description, default slot, and media slot content', () => {
      const wrapper = mount(SEmpty, {
        props: {
          title: 'No results',
          description: 'Try adjusting your filters.'
        },
        slots: {
          default: '<button type="button">Reset filters</button>',
          media: '<span data-testid="media">M</span>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('h3').text()).toBe('No results');
      expect(wrapper.find('p').text()).toBe('Try adjusting your filters.');
      expect(wrapper.text()).toContain('Reset filters');
      expect(wrapper.html()).toContain('data-testid="media"');

      wrapper.unmount();
    });

    it('applies custom root class', () => {
      const wrapper = mount(SEmpty, {
        props: { class: 'min-h-72' },
        attachTo: document.body
      });

      expect(wrapper.html()).toContain('min-h-72');

      wrapper.unmount();
    });

    it('applies icon media variant styles', () => {
      const wrapper = mount(SEmpty, {
        props: {
          mediaVariant: 'icon'
        },
        slots: {
          media: '<span>Media</span>'
        },
        attachTo: document.body
      });

      expect(wrapper.html()).toContain('bg-muted');

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SEmpty, {
        props: {
          title: 'No projects',
          description: 'Create one to get started.'
        },
        slots: {
          default: '<button type="button">Create project</button>'
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
