import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import {
  STagsInput,
  STagsInputClear,
  STagsInputInput,
  STagsInputItem,
  STagsInputItemDelete,
  STagsInputItemText
} from '../../../src';
import { getA11yViolations } from '../../shared/a11y';

const TestTagsInput = {
  components: {
    STagsInput,
    STagsInputClear,
    STagsInputInput,
    STagsInputItem,
    STagsInputItemDelete,
    STagsInputItemText
  },
  props: {
    addOnBlur: Boolean,
    addOnTab: Boolean,
    disabled: Boolean,
    duplicate: Boolean,
    max: Number,
    customClass: String,
    modelValue: {
      type: Array,
      default: () => ['Vue', 'TypeScript']
    }
  },
  template: `
    <STagsInput
      :model-value="modelValue"
      :add-on-blur="addOnBlur"
      :add-on-tab="addOnTab"
      :disabled="disabled"
      :duplicate="duplicate"
      :max="max"
      :class="customClass"
      @update:model-value="$emit('update:modelValue', $event)"
      @invalid="$emit('invalid', $event)"
      @add-tag="$emit('addTag', $event)"
      @remove-tag="$emit('removeTag', $event)"
    >
      <template #default="{ modelValue: value }">
        <STagsInputItem v-for="tag in value" :key="String(tag)" :value="tag">
          <STagsInputItemText />
          <STagsInputItemDelete />
        </STagsInputItem>
        <STagsInputInput aria-label="Add tag" placeholder="Add a tag" />
        <STagsInputClear as="button">Clear</STagsInputClear>
      </template>
    </STagsInput>
  `
};

describe('STagsInput', () => {
  describe('rendering', () => {
    it('renders initial tags and input', () => {
      const wrapper = mount(TestTagsInput, { attachTo: document.body });
      expect(wrapper.text()).toContain('Vue');
      expect(wrapper.text()).toContain('TypeScript');
      expect(wrapper.find('input').exists()).toBe(true);
      wrapper.unmount();
    });

    it('applies custom class to the root element', () => {
      const wrapper = mount(TestTagsInput, {
        props: {
          customClass: 'my-tags-input'
        },
        attachTo: document.body
      });
      expect(wrapper.html()).toContain('my-tags-input');
      wrapper.unmount();
    });
  });

  describe('model value', () => {
    it('emits update:modelValue and addTag on enter', async () => {
      const wrapper = mount(TestTagsInput, { attachTo: document.body });
      const input = wrapper.find('input');
      await input.setValue('Nuxt');
      await input.trigger('keydown.enter');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('addTag')?.[0]).toEqual(['Nuxt']);
      wrapper.unmount();
    });

    it('emits removeTag when deleting the active tag with backspace', async () => {
      const wrapper = mount(TestTagsInput, { attachTo: document.body });
      const input = wrapper.find('input');
      await input.trigger('keydown', { key: 'ArrowLeft' });
      await input.trigger('keydown', { key: 'Backspace' });
      expect(wrapper.emitted('removeTag')?.[0]).toEqual(['TypeScript']);
      wrapper.unmount();
    });

    it('adds a tag on blur when addOnBlur is enabled', async () => {
      const wrapper = mount(TestTagsInput, {
        props: { addOnBlur: true },
        attachTo: document.body
      });
      const input = wrapper.find('input');
      await input.setValue('React');
      await input.trigger('blur');
      expect(wrapper.emitted('addTag')?.[0]).toEqual(['React']);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('prevents input interaction when disabled', async () => {
      const wrapper = mount(TestTagsInput, {
        props: { disabled: true },
        attachTo: document.body
      });
      const input = wrapper.find('input');
      expect((input.element as HTMLInputElement).disabled).toBe(true);
      await input.setValue('Blocked');
      await input.trigger('keydown.enter');
      expect(wrapper.emitted('addTag')).toBeFalsy();
      wrapper.unmount();
    });

    it('clears all tags when clear is clicked', async () => {
      const wrapper = mount(TestTagsInput, { attachTo: document.body });
      const clearButton = wrapper.findComponent(STagsInputClear);
      expect(clearButton.exists()).toBe(true);
      await clearButton.trigger('click');
      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]]);
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(TestTagsInput, { attachTo: document.body });
      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
