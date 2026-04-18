import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SInputOtp from '../../../src/components/input-otp/input-otp.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SInputOtp', () => {
  describe('rendering', () => {
    it('renders slots based on maxlength', () => {
      const wrapper = mount(SInputOtp, {
        props: {
          maxlength: 6,
          placeholder: '123456',
          'aria-label': 'Verification code'
        },
        attachTo: document.body
      });

      expect(wrapper.findAll('[data-slot="slot"]')).toHaveLength(6);
      expect(
        wrapper
          .findAll('[data-slot="placeholder"]')
          .map(node => node.text())
          .join('')
      ).toBe('123456');
      wrapper.unmount();
    });

    it('applies custom class to the root container', () => {
      const wrapper = mount(SInputOtp, {
        props: {
          maxlength: 4,
          class: 'my-input-otp',
          'aria-label': 'Verification code'
        },
        attachTo: document.body
      });

      expect(wrapper.html()).toContain('my-input-otp');
      wrapper.unmount();
    });
  });

  describe('state', () => {
    it('emits update:modelValue and complete on valid input', async () => {
      const wrapper = mount(SInputOtp, {
        props: {
          maxlength: 6,
          'aria-label': 'Verification code'
        },
        attachTo: document.body
      });

      await wrapper.find('input').setValue('123456');

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['123456']);
      expect(wrapper.emitted('complete')?.[0]).toEqual(['123456']);
      wrapper.unmount();
    });

    it('rejects invalid values that do not match the pattern', async () => {
      const wrapper = mount(SInputOtp, {
        props: {
          maxlength: 4,
          pattern: '^\\d+$',
          'aria-label': 'Verification code'
        },
        attachTo: document.body
      });

      const input = wrapper.find('input');
      (input.element as HTMLInputElement).value = '12ab';
      await input.trigger('input');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      expect((input.element as HTMLInputElement).value).toBe('');
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('keeps the native input disabled and ignores updates', async () => {
      const wrapper = mount(SInputOtp, {
        props: {
          maxlength: 4,
          disabled: true,
          modelValue: '12',
          'aria-label': 'Verification code'
        },
        attachTo: document.body
      });

      const input = wrapper.find('input');
      expect((input.element as HTMLInputElement).disabled).toBe(true);

      (input.element as HTMLInputElement).value = '9999';
      await input.trigger('input');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when it has an accessible name', async () => {
      const wrapper = mount(
        {
          components: { SInputOtp },
          template: `
            <div>
              <SInputOtp :maxlength="6" aria-label="Verification code" />
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
