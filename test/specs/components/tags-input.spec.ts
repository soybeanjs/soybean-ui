import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { STagsInput } from '../../../src';
import { getA11yViolations } from '../../shared/a11y';

const mountCompactTagsInput = (props: Record<string, unknown> = {}) => {
  return mount(STagsInput, {
    props: {
      modelValue: ['Vue', 'TypeScript'],
      clearable: true,
      inputProps: {
        'aria-label': 'Add tag',
        placeholder: 'Add a tag'
      },
      ...props
    },
    attachTo: document.body
  });
};

const ManualTagsInput = {
  components: {
    STagsInput
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
    />
  `
};

const ControlledCompactTagsInput = {
  components: {
    STagsInput
  },
  data() {
    return {
      tags: ['Vue', 'React', 'Angular']
    };
  },
  template: `
    <STagsInput
      v-model="tags"
      :input-props="{ 'aria-label': 'Add tag', placeholder: 'Add a tag' }"
    />
  `
};

describe('STagsInput', () => {
  describe('rendering', () => {
    it('renders initial tags and input', () => {
      const wrapper = mountCompactTagsInput();

      expect(wrapper.text()).toContain('Vue');
      expect(wrapper.text()).toContain('TypeScript');
      expect(wrapper.find('input').exists()).toBe(true);

      wrapper.unmount();
    });

    it('applies custom class to the root element', () => {
      const wrapper = mountCompactTagsInput({ class: 'my-tags-input' });

      expect(wrapper.html()).toContain('my-tags-input');

      wrapper.unmount();
    });

    it('keeps manual default-slot composition working', () => {
      const wrapper = mount(ManualTagsInput, { attachTo: document.body });

      expect(wrapper.text()).toContain('Vue');

      wrapper.unmount();
    });
  });

  describe('model value', () => {
    it('emits update:modelValue and addTag on enter', async () => {
      const wrapper = mountCompactTagsInput();
      const input = wrapper.find('input');

      await input.setValue('Nuxt');
      await input.trigger('keydown.enter');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('addTag')?.[0]).toEqual(['Nuxt']);

      wrapper.unmount();
    });

    it('emits removeTag when deleting the active tag with backspace', async () => {
      const wrapper = mountCompactTagsInput();
      const input = wrapper.find('input');

      await input.trigger('keydown', { key: 'ArrowLeft' });
      await input.trigger('keydown', { key: 'Backspace' });

      expect(wrapper.emitted('removeTag')?.[0]).toEqual(['TypeScript']);

      wrapper.unmount();
    });

    it('removes the first tag on delete click without recursive updates', async () => {
      const wrapper = mount(ControlledCompactTagsInput, { attachTo: document.body });

      await wrapper.findAll('[data-slot="item-delete"]')[0].trigger('click');

      expect(wrapper.text()).not.toContain('Vue');
      expect(wrapper.text()).toContain('React');
      expect(wrapper.text()).toContain('Angular');

      wrapper.unmount();
    });

    it('adds a tag on blur when addOnBlur is enabled', async () => {
      const wrapper = mountCompactTagsInput({ addOnBlur: true });
      const input = wrapper.find('input');

      await input.setValue('React');
      await input.trigger('blur');

      expect(wrapper.emitted('addTag')?.[0]).toEqual(['React']);

      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('prevents input interaction when disabled', async () => {
      const wrapper = mountCompactTagsInput({ disabled: true });
      const input = wrapper.find('input');

      expect((input.element as HTMLInputElement).disabled).toBe(true);
      await input.setValue('Blocked');
      await input.trigger('keydown.enter');
      expect(wrapper.emitted('addTag')).toBeFalsy();

      wrapper.unmount();
    });

    it('clears all tags when clear is clicked', async () => {
      const wrapper = mountCompactTagsInput();

      await wrapper.find('[data-slot="clear"]').trigger('click');

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]]);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(
        {
          components: { STagsInput },
          template: `
            <div>
              <label for="test-tags-input">Tags</label>
              <STagsInput id="test-tags-input" clearable :model-value="['Vue', 'TypeScript']" />
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
