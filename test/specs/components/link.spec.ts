import { describe, expect, it } from 'vitest';
import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { getA11yViolations } from '../../shared/a11y';
import SConfigProvider from '../../../src/components/config-provider/config-provider.vue';
import SLink from '../../../src/components/link/link.vue';

describe('SLink', () => {
  describe('rendering', () => {
    it('renders an anchor element with default slot content', () => {
      const wrapper = mount(SConfigProvider, {
        slots: {
          default: '<a href="#" data-testid="link">Go to homepage</a>'
        },
        attachTo: document.body
      });

      const link = wrapper.get('[data-testid="link"]');
      expect(link.text()).toBe('Go to homepage');

      wrapper.unmount();
    });

    it('renders SLink inside ConfigProvider', () => {
      const wrapper = mount(SConfigProvider, {
        slots: {
          default: () => h(SLink, { class: 'custom-link' }, () => 'My Link')
        },
        attachTo: document.body
      });

      expect(wrapper.find('a').exists()).toBe(true);

      wrapper.unmount();
    });

    it('supports disabled state', () => {
      const wrapper = mount(SConfigProvider, {
        slots: {
          default: () => h(SLink, { disabled: true }, () => 'Disabled')
        },
        attachTo: document.body
      });

      const link = wrapper.get('a');
      expect(link.attributes('aria-disabled')).toBe('true');

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SConfigProvider, {
        slots: {
          default: () => h(SLink, {}, () => 'Accessible link')
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
