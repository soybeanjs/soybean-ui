import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { STextareaClear } from '../../../src/components/textarea';
import STextarea from '../../../src/components/textarea/textarea.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('STextarea', () => {
  describe('rendering', () => {
    it('renders a textarea element', () => {
      const wrapper = mount(STextarea, { attachTo: document.body });

      expect(wrapper.find('textarea').exists()).toBe(true);

      wrapper.unmount();
    });

    it('forwards counter and footer slots through compact', () => {
      const wrapper = mount(
        {
          components: {
            STextarea
          },
          template: `
            <STextarea model-value="hello" show-counter :maxlength="10">
              <template #counter="{ count, maxlength }">{{ count }} / {{ maxlength }}</template>
              <template #footer="{ modelValue }">Footer: {{ modelValue }}</template>
            </STextarea>
          `
        },
        { attachTo: document.body }
      );

      expect(wrapper.text()).toContain('5 / 10');
      expect(wrapper.text()).toContain('Footer: hello');

      wrapper.unmount();
    });
  });

  describe('model value', () => {
    it('reflects modelValue in textarea', () => {
      const wrapper = mount(STextarea, {
        props: { modelValue: 'hello' },
        attachTo: document.body
      });

      expect(wrapper.find('textarea').element.value).toBe('hello');

      wrapper.unmount();
    });

    it('emits update:modelValue on input', async () => {
      const wrapper = mount(STextarea, { attachTo: document.body });

      await wrapper.find('textarea').setValue('typed text');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['typed text']);

      wrapper.unmount();
    });

    it('renders clear trigger and emits empty value when clearing', async () => {
      const wrapper = mount(STextarea, {
        props: {
          modelValue: 'hello',
          clearable: true
        },
        attachTo: document.body
      });

      await wrapper.find('[data-soybean-textarea-clearable]').trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['']);

      wrapper.unmount();
    });

    it('clears through STextareaClear in the clear slot', async () => {
      const wrapper = mount(
        {
          components: {
            STextarea,
            STextareaClear
          },
          template: `
            <STextarea model-value="hello" clearable @update:model-value="$emit('update:modelValue', $event)">
              <template #clear>
                <STextareaClear aria-label="Custom clear">Clear</STextareaClear>
              </template>
            </STextarea>
          `
        },
        { attachTo: document.body }
      );

      await wrapper.findComponent(STextareaClear).trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual(['']);

      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('disables the textarea and clear trigger', () => {
      const wrapper = mount(STextarea, {
        props: {
          disabled: true,
          clearable: true
        },
        attachTo: document.body
      });

      expect(wrapper.find('textarea').element.disabled).toBe(true);
      expect((wrapper.find('[data-soybean-textarea-clearable]').element as HTMLButtonElement).disabled).toBe(true);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when paired with a label', async () => {
      const wrapper = mount(
        {
          template: `
            <div>
              <label for="test-textarea">Description</label>
              <STextarea id="test-textarea" clearable show-counter :maxlength="20" />
            </div>
          `,
          components: { STextarea }
        },
        { attachTo: document.body }
      );

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
