import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { getA11yViolations } from '../../shared/a11y';
import SInputNumber from '../../../src/components/input-number/input-number.vue';

describe('SInputNumber', () => {
  describe('rendering', () => {
    it('renders a spinbutton input', () => {
      const wrapper = mount(SInputNumber, { attachTo: document.body });

      expect(wrapper.find('input[role="spinbutton"]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('forwards the increment slot', () => {
      const wrapper = mount(SInputNumber, {
        slots: {
          increment: '<button type="button" data-test="custom-increment">Add</button>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-test="custom-increment"]').text()).toContain('Add');

      wrapper.unmount();
    });
  });

  describe('model value', () => {
    it('emits update:modelValue when the increment trigger is clicked', async () => {
      const wrapper = mount(SInputNumber, { attachTo: document.body });

      await wrapper.find('[data-soybean-input-number-increment]').trigger('pointerdown', { button: 0 });

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([0]);

      wrapper.unmount();
    });

    it('emits null when the clear trigger is clicked', async () => {
      const wrapper = mount(SInputNumber, {
        props: {
          modelValue: 12,
          clearable: true
        },
        attachTo: document.body
      });

      await wrapper.find('[data-soybean-input-number-clear]').trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([null]);

      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('disables the input and control triggers', () => {
      const wrapper = mount(SInputNumber, {
        props: {
          disabled: true,
          clearable: true
        },
        attachTo: document.body
      });

      expect(wrapper.find('input').element.disabled).toBe(true);
      expect((wrapper.find('[aria-label="Increase"]').element as HTMLButtonElement).disabled).toBe(true);
      expect((wrapper.find('[aria-label="Decrease"]').element as HTMLButtonElement).disabled).toBe(true);
      expect((wrapper.find('[data-soybean-input-number-clear]').element as HTMLButtonElement).disabled).toBe(true);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when paired with a label', async () => {
      const wrapper = mount(
        {
          components: { SInputNumber },
          template: `
            <div>
              <label for="test-input-number">Amount</label>
              <SInputNumber id="test-input-number" clearable />
            </div>
          `
        },
        { attachTo: document.body }
      );

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
