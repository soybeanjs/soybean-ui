import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SToggleGroup from '../../../src/components/toggle-group/toggle-group.vue';
import SToggleGroupItem from '../../../src/components/toggle-group/toggle-group-item.vue';
import { getA11yViolations } from '../../shared/a11y';

function mountToggleGroup(props?: Record<string, unknown>) {
  return mount(SToggleGroup, {
    props,
    slots: {
      default: `
        <SToggleGroupItem value="bold">Bold</SToggleGroupItem>
        <SToggleGroupItem value="italic">Italic</SToggleGroupItem>
        <SToggleGroupItem value="underline" disabled>Underline</SToggleGroupItem>
      `
    },
    global: {
      components: {
        SToggleGroupItem
      }
    },
    attachTo: document.body
  });
}

describe('SToggleGroup', () => {
  describe('rendering', () => {
    it('renders all toggle items', () => {
      const wrapper = mountToggleGroup();
      expect(wrapper.findAll('button')).toHaveLength(3);
      wrapper.unmount();
    });

    it('renders group role and orientation', () => {
      const wrapper = mountToggleGroup({ orientation: 'vertical' });
      expect(wrapper.attributes('role')).toBe('group');
      expect(wrapper.attributes('data-orientation')).toBe('vertical');
      wrapper.unmount();
    });
  });

  describe('pressed state', () => {
    it('reflects the selected item via aria-pressed', () => {
      const wrapper = mountToggleGroup({ modelValue: 'bold' });
      const [boldButton, italicButton] = wrapper.findAll('button');
      expect(boldButton.attributes('aria-pressed')).toBe('true');
      expect(italicButton.attributes('aria-pressed')).toBe('false');
      wrapper.unmount();
    });

    it('emits update:modelValue when an item is clicked', async () => {
      const wrapper = mountToggleGroup({ modelValue: 'bold' });
      await wrapper.findAll('button')[1].trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0][0]).toBe('italic');
      wrapper.unmount();
    });

    it('emits an array in multiple mode', async () => {
      const wrapper = mountToggleGroup({ multiple: true, modelValue: ['bold'] });
      await wrapper.findAll('button')[1].trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0][0]).toEqual(['bold', 'italic']);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('prevents interaction when the whole group is disabled', async () => {
      const wrapper = mountToggleGroup({ disabled: true, modelValue: 'bold' });
      await wrapper.findAll('button')[1].trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });

    it('marks disabled items with native disabled attribute', () => {
      const wrapper = mountToggleGroup();
      expect(wrapper.findAll('button')[2].attributes('disabled')).toBe('');
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mountToggleGroup({ modelValue: 'bold' });
      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
