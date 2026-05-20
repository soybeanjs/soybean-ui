import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { getA11yViolations } from '../../shared/a11y';
import STabs from '../../../src/components/tabs/tabs.vue';

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

    it('forwards custom trigger and content slots', async () => {
      const wrapper = mount(
        {
          components: { STabs },
          data() {
            return { currentValue: 'tab-1', items };
          },
          template: `
            <STabs v-model="currentValue" :items="items">
              <template #trigger="{ label, active }">
                <span :data-test="'custom-trigger-' + label">{{ active ? 'active' : 'idle' }}-{{ label }}</span>
              </template>
              <template #content="{ value, active }">
                <div :data-test="'custom-content-' + value">{{ active }}-{{ value }}</div>
              </template>
            </STabs>
          `
        },
        { attachTo: document.body }
      );

      await nextTick();
      expect(wrapper.find('[data-test="custom-trigger-Account"]').exists()).toBe(true);
      expect(wrapper.find('[data-test="custom-content-tab-1"]').exists()).toBe(true);
      expect(wrapper.find('[data-test="custom-trigger-Account"]').text()).toBe('active-Account');
      expect(wrapper.find('[data-test="custom-content-tab-1"]').text()).toBe('true-tab-1');

      await wrapper.findAll('[role="tab"]')[1].trigger('mousedown', { button: 0 });
      await nextTick();

      expect(wrapper.find('[data-test="custom-trigger-Security"]').text()).toBe('active-Security');
      expect(wrapper.find('[data-test="custom-content-tab-2"]').text()).toBe('true-tab-2');
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

    it('positions the indicator from inline-start in rtl mode', async () => {
      const wrapper = mount(STabs, {
        props: { items, modelValue: 'tab-1', dir: 'rtl' },
        attachTo: document.body
      });

      const list = wrapper.find('[role="tablist"]').element;
      const tabs = wrapper.findAll('[role="tab"]').map(tab => tab.element);

      Object.defineProperty(list, 'clientWidth', {
        configurable: true,
        get: () => 300
      });

      Object.defineProperty(tabs[0], 'offsetWidth', {
        configurable: true,
        get: () => 80
      });
      Object.defineProperty(tabs[0], 'offsetLeft', {
        configurable: true,
        get: () => 200
      });
      Object.defineProperty(tabs[1], 'offsetWidth', {
        configurable: true,
        get: () => 90
      });
      Object.defineProperty(tabs[1], 'offsetLeft', {
        configurable: true,
        get: () => 110
      });

      await wrapper.setProps({ modelValue: 'tab-2' });
      await nextTick();

      const indicator = wrapper.find('[data-soybean-tabs-indicator]');

      expect(indicator.attributes('style')).toContain('--soybean-tabs-indicator-size: 90px;');
      expect(indicator.attributes('style')).toContain('--soybean-tabs-indicator-position: 100px;');

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
