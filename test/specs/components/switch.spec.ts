import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SSwitch from '../../../src/components/switch/switch.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SSwitch', () => {
  describe('rendering', () => {
    it('renders a switch control', () => {
      const wrapper = mount(SSwitch, { attachTo: document.body });
      expect(wrapper.find('[role="switch"]').exists()).toBe(true);
      wrapper.unmount();
    });

    it('renders leading and trailing slots', () => {
      const wrapper = mount(SSwitch, {
        slots: {
          leading: '<span data-testid="leading">Off</span>',
          trailing: '<span data-testid="trailing">On</span>'
        },
        attachTo: document.body
      });
      expect(wrapper.find('[data-testid="leading"]').exists()).toBe(true);
      expect(wrapper.find('[data-testid="trailing"]').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('checked state', () => {
    it('is unchecked by default', () => {
      const wrapper = mount(SSwitch, { attachTo: document.body });
      const control = wrapper.find('[role="switch"]');
      expect(control.attributes('aria-checked')).toBe('false');
      wrapper.unmount();
    });

    it('reflects modelValue=true as checked', () => {
      const wrapper = mount(SSwitch, {
        props: { modelValue: true },
        attachTo: document.body
      });
      const control = wrapper.find('[role="switch"]');
      expect(control.attributes('aria-checked')).toBe('true');
      wrapper.unmount();
    });

    it('emits update:modelValue on click', async () => {
      const wrapper = mount(SSwitch, {
        props: { modelValue: false },
        attachTo: document.body
      });
      await wrapper.find('[role="switch"]').trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      const [emittedValue] = wrapper.emitted('update:modelValue')![0];
      expect(emittedValue).toBe(true);
      wrapper.unmount();
    });

    it('toggles off when currently on', async () => {
      const wrapper = mount(SSwitch, {
        props: { modelValue: true },
        attachTo: document.body
      });
      await wrapper.find('[role="switch"]').trigger('click');
      const [emittedValue] = wrapper.emitted('update:modelValue')![0];
      expect(emittedValue).toBe(false);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('does not emit when disabled', async () => {
      const wrapper = mount(SSwitch, {
        props: { disabled: true, modelValue: false },
        attachTo: document.body
      });
      await wrapper.find('[role="switch"]').trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations in off state', async () => {
      const wrapper = mount(SSwitch, {
        // Pass aria-label directly to the inner control button
        props: { controlProps: { 'aria-label': 'Dark mode' } },
        attachTo: document.body
      });
      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });

    it('has no a11y violations in on state', async () => {
      const wrapper = mount(SSwitch, {
        props: { modelValue: true, controlProps: { 'aria-label': 'Dark mode' } },
        attachTo: document.body
      });
      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
