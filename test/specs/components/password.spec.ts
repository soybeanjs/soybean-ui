import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SPassword from '../../../src/components/password/password.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SPassword', () => {
  describe('rendering', () => {
    it('renders a password input by default', () => {
      const wrapper = mount(SPassword, { attachTo: document.body });

      expect(wrapper.find('input').attributes('type')).toBe('password');

      wrapper.unmount();
    });

    it('forwards the visible slot with scoped state', async () => {
      const wrapper = mount(
        {
          components: { SPassword },
          template: `
            <SPassword>
              <template #visible="{ visible, toggle }">
                <button type="button" data-test="toggle" @click="toggle">{{ visible ? 'visible' : 'hidden' }}</button>
              </template>
            </SPassword>
          `
        },
        { attachTo: document.body }
      );

      expect(wrapper.find('[data-test="toggle"]').text()).toBe('hidden');

      await wrapper.find('[data-test="toggle"]').trigger('click');

      expect(wrapper.find('[data-test="toggle"]').text()).toBe('visible');

      wrapper.unmount();
    });
  });

  describe('visible state', () => {
    it('toggles the input type and emits update:visible', async () => {
      const wrapper = mount(SPassword, { attachTo: document.body });

      await wrapper.find('[data-slot="visible"]').trigger('click');

      expect(wrapper.find('input').attributes('type')).toBe('text');
      expect(wrapper.emitted('update:visible')).toBeTruthy();
      expect(wrapper.emitted('update:visible')![0]).toEqual([true]);

      wrapper.unmount();
    });

    it('emits an empty string when the clear trigger is clicked', async () => {
      const wrapper = mount(SPassword, {
        props: {
          modelValue: 'abc123',
          clearable: true
        },
        attachTo: document.body
      });

      await wrapper.find('[data-slot="clearable"]').trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['']);

      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('disables the input and visible trigger', () => {
      const wrapper = mount(SPassword, {
        props: {
          disabled: true,
          clearable: true
        },
        attachTo: document.body
      });

      expect(wrapper.find('input').element.disabled).toBe(true);
      expect((wrapper.find('[data-slot="visible"]').element as HTMLButtonElement).disabled).toBe(true);
      expect((wrapper.find('[data-slot="clearable"]').element as HTMLButtonElement).disabled).toBe(true);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when paired with a label', async () => {
      const wrapper = mount(
        {
          components: { SPassword },
          template: `
            <div>
              <label for="test-password">Password</label>
              <SPassword id="test-password" clearable />
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
