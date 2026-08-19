import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import STreeSelect from '@/components/tree-select/tree-select.vue';
import { getA11yViolations } from '../../shared/a11y';

const items = [
  {
    value: 'parent-1',
    label: 'Parent 1',
    children: [
      { value: 'child-1', label: 'Child 1' },
      { value: 'child-2', label: 'Child 2' }
    ]
  },
  { value: 'parent-2', label: 'Parent 2' }
];

describe('STreeSelect', () => {
  describe('rendering', () => {
    it('renders the placeholder when nothing is selected', () => {
      const wrapper = mount(STreeSelect, {
        props: { items, placeholder: 'Select a node' },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Select a node');

      wrapper.unmount();
    });

    it('applies custom class to the trigger', () => {
      const wrapper = mount(STreeSelect, {
        props: { items, class: 'my-tree-select' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-tree-select-trigger]').classes()).toContain('my-tree-select');

      wrapper.unmount();
    });

    it('shows the selected label in the trigger', () => {
      const wrapper = mount(STreeSelect, {
        props: { items, modelValue: 'parent-2' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-tree-select-trigger]').text()).toContain('Parent 2');

      wrapper.unmount();
    });
  });

  describe('popup and selection', () => {
    it('opens the popup and selects a node on click', async () => {
      const wrapper = mount(STreeSelect, {
        props: { items, placeholder: 'Select' },
        attachTo: document.body
      });

      await wrapper.find('[data-soybean-tree-select-trigger]').trigger('click');
      await new Promise(resolve => setTimeout(resolve, 0));

      const panel = document.querySelector('[data-soybean-tree-select-panel]');
      expect(panel).toBeTruthy();

      const node = Array.from(panel!.querySelectorAll('[data-soybean-tree-item]')).find(
        el => el.textContent === 'Parent 2'
      );

      node?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe('parent-2');

      wrapper.unmount();
    });

    it('emits an array when multiple', async () => {
      const wrapper = mount(STreeSelect, {
        props: { items, multiple: true, placeholder: 'Select' },
        attachTo: document.body
      });

      await wrapper.find('[data-soybean-tree-select-trigger]').trigger('click');
      await new Promise(resolve => setTimeout(resolve, 0));

      const panel = document.querySelector('[data-soybean-tree-select-panel]');
      const node = Array.from(panel!.querySelectorAll('[data-soybean-tree-item]')).find(
        el => el.textContent === 'Parent 2'
      );

      node?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(Array.isArray(wrapper.emitted('update:modelValue')?.[0]?.[0])).toBe(true);
      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual(['parent-2']);

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(STreeSelect, {
        props: { items, placeholder: 'Select a node' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
