import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import STabs from '../../../src/components/tabs/tabs.vue';
import { getA11yViolations } from '../../shared/a11y';

const items = [
  { value: 'tab-1', label: 'Account' },
  { value: 'tab-2', label: 'Security' },
  { value: 'tab-3', label: 'Notifications', disabled: true }
];

describe('STabs', () => {
  describe('rendering', () => {
    it('renders all tab triggers', () => {
      const wrapper = mount(STabs, {
        props: { items },
        attachTo: document.body
      });
      const tabs = wrapper.findAll('[role="tab"]');
      expect(tabs).toHaveLength(items.length);
      wrapper.unmount();
    });

    it('renders tab labels', () => {
      const wrapper = mount(STabs, {
        props: { items },
        attachTo: document.body
      });
      expect(wrapper.text()).toContain('Account');
      expect(wrapper.text()).toContain('Security');
      wrapper.unmount();
    });

    it('renders a tablist', () => {
      const wrapper = mount(STabs, {
        props: { items },
        attachTo: document.body
      });
      expect(wrapper.find('[role="tablist"]').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('active state', () => {
    it('marks the active tab with aria-selected="true"', () => {
      const wrapper = mount(STabs, {
        props: { items, modelValue: 'tab-1' },
        attachTo: document.body
      });
      const firstTab = wrapper.findAll('[role="tab"]')[0];
      expect(firstTab.attributes('aria-selected')).toBe('true');
      wrapper.unmount();
    });

    it('marks inactive tabs with aria-selected="false"', () => {
      const wrapper = mount(STabs, {
        props: { items, modelValue: 'tab-1' },
        attachTo: document.body
      });
      const secondTab = wrapper.findAll('[role="tab"]')[1];
      expect(secondTab.attributes('aria-selected')).toBe('false');
      wrapper.unmount();
    });

    it('emits update:modelValue when tab is clicked', async () => {
      const wrapper = mount(STabs, {
        props: { items, modelValue: 'tab-1' },
        attachTo: document.body
      });
      // TabsTrigger activates on mousedown (left button), not click
      await wrapper.findAll('[role="tab"]')[1].trigger('mousedown', { button: 0 });
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0][0]).toBe('tab-2');
      wrapper.unmount();
    });

    it('shows the tabpanel for the active tab', () => {
      const wrapper = mount(STabs, {
        props: { items, modelValue: 'tab-1' },
        attachTo: document.body
      });
      const panels = wrapper.findAll('[role="tabpanel"]');
      expect(panels.length).toBeGreaterThan(0);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('marks disabled tabs with data-disabled', () => {
      const wrapper = mount(STabs, {
        props: { items },
        attachTo: document.body
      });
      // TabsTrigger uses data-disabled (not native disabled) to allow receiving focus
      const disabledTab = wrapper.findAll('[role="tab"]')[2];
      expect(disabledTab.attributes('data-disabled')).toBe('');
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(STabs, {
        props: { items, modelValue: 'tab-1' },
        attachTo: document.body
      });
      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
