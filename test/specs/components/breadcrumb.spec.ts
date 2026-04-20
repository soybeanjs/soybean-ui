import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SBreadcrumb from '../../../src/components/breadcrumb/breadcrumb.vue';
import SConfigProvider from '../../../src/components/config-provider/config-provider.vue';
import { getA11yViolations } from '../../shared/a11y';

const items = [
  { href: '/', label: 'Home', value: 'home' },
  { href: '/components', label: 'Components', value: 'components' },
  { label: 'Breadcrumb', value: 'breadcrumb' }
];

const ellipsisItems = [
  { href: '/', label: 'Home', value: 'home' },
  { href: '/guides', label: 'Guides', value: 'guides' },
  { href: '/patterns', label: 'Patterns', value: 'patterns' },
  { href: '/components', label: 'Components', value: 'components' },
  { label: 'Breadcrumb', value: 'breadcrumb' }
];

const BreadcrumbHarness = {
  components: {
    SBreadcrumb,
    SConfigProvider
  },
  emits: ['click'],
  props: ['breadcrumbProps'],
  template: `
    <SConfigProvider>
      <SBreadcrumb v-bind="breadcrumbProps" @click="$emit('click', $event)" />
    </SConfigProvider>
  `
};

function mountBreadcrumb(breadcrumbProps: Record<string, unknown>) {
  return mount(BreadcrumbHarness, {
    props: { breadcrumbProps },
    attachTo: document.body
  });
}

describe('SBreadcrumb', () => {
  describe('rendering', () => {
    it('renders breadcrumb links, current page, and custom root class', () => {
      const wrapper = mountBreadcrumb({
          class: 'custom-breadcrumb',
          items
      });

      expect(wrapper.find('nav').classes()).toContain('custom-breadcrumb');
      expect(wrapper.findAll('a')).toHaveLength(2);
      expect(wrapper.find('[aria-current="page"]').text()).toBe('Breadcrumb');

      wrapper.unmount();
    });
  });

  describe('ellipsis state', () => {
    it('collapses middle items when ellipsis is enabled', () => {
      const wrapper = mountBreadcrumb({
        ellipsis: true,
        items: ellipsisItems
      });
      const text = wrapper.find('nav').text();

      expect(text).toContain('Home');
      expect(text).toContain('Components');
      expect(text).toContain('Breadcrumb');
      expect(text).not.toContain('Guides');
      expect(text).not.toContain('Patterns');
      expect(wrapper.findAll('a')).toHaveLength(2);
      expect(wrapper.find('[aria-current="page"]').text()).toBe('Breadcrumb');

      wrapper.unmount();
    });

    it('emits click when a breadcrumb item is activated', async () => {
      const wrapper = mountBreadcrumb({ items });

      await wrapper.find('a').trigger('click');

      expect(wrapper.emitted('click')).toEqual([[items[0]]]);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations in the default state', async () => {
      const wrapper = mountBreadcrumb({ items });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
