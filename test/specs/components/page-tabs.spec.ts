import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SPageTabs from '../../../src/components/page-tabs/page-tabs.vue';
import { getA11yViolations } from '../../shared/a11y';

const items = [
  { value: 'home', label: 'Home', pinned: true, hidePinnedIcon: true },
  { value: 'profile', label: 'Profile' },
  { value: 'settings', label: 'Settings' }
];

describe('SPageTabs', () => {
  describe('rendering', () => {
    it('renders all page tab items', () => {
      const wrapper = mount(SPageTabs, {
        props: { items, modelValue: 'home' },
        attachTo: document.body
      });

      expect(wrapper.findAll('[data-soybean-page-tabs-item]')).toHaveLength(items.length);
      expect(wrapper.find('[data-soybean-page-tabs-root]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('renders tab labels', () => {
      const wrapper = mount(SPageTabs, {
        props: { items, modelValue: 'home' },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Home');
      expect(wrapper.text()).toContain('Profile');

      wrapper.unmount();
    });
  });

  describe('active state', () => {
    it('marks the active item with data-active="true"', () => {
      const wrapper = mount(SPageTabs, {
        props: { items, modelValue: 'home' },
        attachTo: document.body
      });

      expect(wrapper.findAll('[data-soybean-page-tabs-item]')[0].attributes('data-active')).toBe('true');
      expect(wrapper.findAll('[data-soybean-page-tabs-item]')[1].attributes('data-active')).toBe('false');

      wrapper.unmount();
    });

    it('emits update:modelValue and click when an item is clicked', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items, modelValue: 'home' },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-item]')[1].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0][0]).toBe('profile');
      expect(wrapper.emitted('click')).toBeTruthy();
      expect(wrapper.emitted('click')![0][0]).toMatchObject({ value: 'profile', label: 'Profile' });

      wrapper.unmount();
    });

    it('emits close on middle click for a closable item', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items, modelValue: 'home', middleClickClose: true },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-item]')[1].trigger('mousedown', { button: 1 });

      expect(wrapper.emitted('close')).toBeTruthy();
      expect(wrapper.emitted('close')![0][0]).toMatchObject({ value: 'profile', label: 'Profile' });

      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('does not emit close for a pinned item', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items, modelValue: 'home', middleClickClose: true },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-page-tabs-item]')[0].trigger('mousedown', { button: 1 });

      expect(wrapper.emitted('close')).toBeFalsy();

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SPageTabs, {
        props: { items, modelValue: 'home' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
