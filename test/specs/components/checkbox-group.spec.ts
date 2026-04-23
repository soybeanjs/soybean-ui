import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SCheckboxCardGroup from '../../../src/components/checkbox/checkbox-card-group.vue';
import SCheckboxGroup from '../../../src/components/checkbox/checkbox-group.vue';
import { getA11yViolations } from '../../shared/a11y';

const items = [
  { value: 'option-1', label: 'Option 1' },
  { value: 'option-2', label: 'Option 2' },
  { value: 'option-3', label: 'Option 3', disabled: true }
];

const cardItems = [
  { value: 'option-1', label: 'Card 1', icon: 'lucide:star', description: 'First description' },
  { value: 'option-2', label: 'Card 2', icon: 'lucide:bolt', description: 'Second description', disabled: true }
];

describe('SCheckboxGroup', () => {
  describe('rendering', () => {
    it('renders a checkbox control for each item', () => {
      const wrapper = mount(SCheckboxGroup, {
        props: { items },
        attachTo: document.body
      });

      expect(wrapper.findAll('[role="checkbox"]')).toHaveLength(items.length);
      expect(wrapper.text()).toContain('Option 1');
      wrapper.unmount();
    });

    it('merges a custom class onto the group root', () => {
      const wrapper = mount(SCheckboxGroup, {
        props: { items, class: 'checkbox-group-root-class' },
        attachTo: document.body
      });

      expect(wrapper.find('.checkbox-group-root-class').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('checked state', () => {
    it('reflects modelValue items with aria-checked', () => {
      const wrapper = mount(SCheckboxGroup, {
        props: { items, modelValue: ['option-1'] },
        attachTo: document.body
      });

      expect(wrapper.findAll('[role="checkbox"]')[0].attributes('aria-checked')).toBe('true');
      expect(wrapper.findAll('[role="checkbox"]')[1].attributes('aria-checked')).toBe('false');
      wrapper.unmount();
    });

    it('emits update:modelValue when a checkbox is clicked', async () => {
      const wrapper = mount(SCheckboxGroup, {
        props: { items, modelValue: ['option-1'] },
        attachTo: document.body
      });

      await wrapper.findAll('[role="checkbox"]')[1].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0][0]).toEqual(['option-1', 'option-2']);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('applies disabled to disabled checkbox items', () => {
      const wrapper = mount(SCheckboxGroup, {
        props: { items },
        attachTo: document.body
      });

      const disabledControl = wrapper.findAll('[role="checkbox"]')[2];
      // @ts-expect-error - Vue Test Utils does not recognize the disabled property on role selectors
      expect(disabledControl.element.disabled).toBe(true);
      wrapper.unmount();
    });

    it('does not emit update:modelValue when a disabled checkbox is clicked', async () => {
      const wrapper = mount(SCheckboxGroup, {
        props: { items, modelValue: ['option-1'] },
        attachTo: document.body
      });

      await wrapper.findAll('[role="checkbox"]')[2].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SCheckboxGroup, {
        props: { items, modelValue: ['option-1'] },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});

describe('SCheckboxCardGroup', () => {
  describe('rendering', () => {
    it('renders checkbox cards with icon and description content', () => {
      const wrapper = mount(SCheckboxCardGroup, {
        props: { items: cardItems },
        attachTo: document.body
      });

      expect(wrapper.findAll('[role="checkbox"]')).toHaveLength(cardItems.length);
      expect(wrapper.text()).toContain('Card 1');
      expect(wrapper.text()).toContain('First description');
      wrapper.unmount();
    });
  });

  describe('checked state', () => {
    it('emits update:modelValue when a checkbox card is clicked', async () => {
      const wrapper = mount(SCheckboxCardGroup, {
        props: { items: cardItems, modelValue: [] },
        attachTo: document.body
      });

      await wrapper.findAll('[role="checkbox"]')[0].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0][0]).toEqual(['option-1']);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('does not emit update:modelValue when a disabled checkbox card is clicked', async () => {
      const wrapper = mount(SCheckboxCardGroup, {
        props: { items: cardItems, modelValue: [] },
        attachTo: document.body
      });

      await wrapper.findAll('[role="checkbox"]')[1].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });
});
