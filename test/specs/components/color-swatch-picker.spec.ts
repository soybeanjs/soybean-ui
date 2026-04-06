import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SColorSwatchPicker from '../../../src/components/color-swatch-picker/color-swatch-picker.vue';

describe('SColorSwatchPicker', () => {
  describe('rendering', () => {
    it('renders all provided swatches as options', () => {
      const wrapper = mount(SColorSwatchPicker, {
        props: { colors: ['#7c3aed', '#06b6d4', '#10b981'] },
        attachTo: document.body
      });

      expect(wrapper.find('[role="listbox"]').exists()).toBe(true);
      expect(wrapper.findAll('[role="option"]')).toHaveLength(3);
      wrapper.unmount();
    });

    it('renders visible swatch content for each option', () => {
      const wrapper = mount(SColorSwatchPicker, {
        props: { colors: ['#7c3aed', '#06b6d4'] },
        attachTo: document.body
      });

      const swatch = wrapper.find('[role="img"]');

      expect(swatch.exists()).toBe(true);
      expect(swatch.findAll('span')).toHaveLength(2);
      wrapper.unmount();
    });
  });

  describe('selection', () => {
    it('emits update:modelValue when an option is clicked', async () => {
      const wrapper = mount(SColorSwatchPicker, {
        props: { colors: ['#7c3aed', '#06b6d4', '#10b981'] },
        attachTo: document.body
      });

      await wrapper.findAll('[role="option"]')[1]!.trigger('click');

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['#06b6d4']);
      wrapper.unmount();
    });
  });
});
