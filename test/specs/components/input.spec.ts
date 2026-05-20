import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { getA11yViolations } from '../../shared/a11y';
import { SInputClear } from '../../../src/components/input';
import SInput from '../../../src/components/input/input.vue';

describe('SInput', () => {
  describe('rendering', () => {
    it('renders an input element', () => {
      const wrapper = mount(SInput, { attachTo: document.body });
      expect(wrapper.find('input').exists()).toBe(true);
      wrapper.unmount();
    });

    it('passes placeholder attribute', () => {
      const wrapper = mount(SInput, {
        attrs: { placeholder: 'Enter text' },
        attachTo: document.body
      });
      expect(wrapper.find('input').attributes('placeholder')).toBe('Enter text');
      wrapper.unmount();
    });

    it('passes type attribute', () => {
      const wrapper = mount(SInput, {
        props: {
          controlProps: {
            type: 'email'
          }
        },
        attachTo: document.body
      });

      expect(wrapper.find('input').attributes('type')).toBe('email');

      wrapper.unmount();
    });

    it('applies custom class to root element', () => {
      const wrapper = mount(SInput, {
        props: { class: 'my-input' },
        attachTo: document.body
      });
      // Root element should carry the custom class
      expect(wrapper.html()).toContain('my-input');
      wrapper.unmount();
    });
  });

  describe('model value', () => {
    it('reflects modelValue in input', () => {
      const wrapper = mount(SInput, {
        props: { modelValue: 'hello' },
        attachTo: document.body
      });
      expect(wrapper.find('input').element.value).toBe('hello');
      wrapper.unmount();
    });

    it('emits update:modelValue on input', async () => {
      const wrapper = mount(SInput, { attachTo: document.body });
      await wrapper.find('input').setValue('typed text');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['typed text']);
      wrapper.unmount();
    });

    it('renders clear trigger and emits empty value when clearing', async () => {
      const wrapper = mount(SInput, {
        props: {
          modelValue: 'hello',
          clearable: true
        },
        attachTo: document.body
      });

      await wrapper.find('[data-soybean-input-clearable]').trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['']);

      wrapper.unmount();
    });

    it('clears through SInputClear in the clear slot', async () => {
      const wrapper = mount(
        {
          components: {
            SInput,
            SInputClear
          },
          template: `
            <SInput model-value="hello" clearable @update:model-value="$emit('update:modelValue', $event)">
              <template #clear>
                <SInputClear aria-label="Custom clear">Clear</SInputClear>
              </template>
            </SInput>
          `
        },
        { attachTo: document.body }
      );

      await wrapper.findComponent(SInputClear).trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['']);

      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('applies disabled attribute', () => {
      const wrapper = mount(SInput, {
        props: { disabled: true },
        attachTo: document.body
      });
      expect(wrapper.find('input').element.disabled).toBe(true);
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when paired with a label', async () => {
      // Wrap in a labelled form field to satisfy a11y rules
      const wrapper = mount(
        {
          template: `
            <div>
              <label for="test-input">Name</label>
              <SInput id="test-input" />
            </div>
          `,
          components: { SInput }
        },
        { attachTo: document.body }
      );
      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
