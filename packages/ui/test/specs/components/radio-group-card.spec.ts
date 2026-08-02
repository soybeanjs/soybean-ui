import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SRadioGroupCard from '@/components/radio-group/radio-group-card.vue';
import { getA11yViolations } from '../../shared/a11y';

const items = [
  { value: 'card-1', label: 'Card 1', description: 'First card' },
  { value: 'card-2', label: 'Card 2' },
  { value: 'card-3', label: 'Card 3', disabled: true }
];

describe('SRadioGroupCard', () => {
  describe('rendering', () => {
    it('renders a radio control and label for each item', () => {
      const wrapper = mount(SRadioGroupCard, {
        props: { items },
        attachTo: document.body
      });

      expect(wrapper.findAll('[role="radio"]')).toHaveLength(items.length);
      expect(wrapper.text()).toContain('Card 1');
      wrapper.unmount();
    });

    it('renders the item description', () => {
      const wrapper = mount(SRadioGroupCard, {
        props: { items },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('First card');
      wrapper.unmount();
    });

    it('merges a custom class onto the root container', () => {
      const wrapper = mount(SRadioGroupCard, {
        props: { items, class: 'radio-card-root-class' },
        attachTo: document.body
      });

      expect(wrapper.find('.radio-card-root-class').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('active state', () => {
    it('reflects the checked card with aria-checked', () => {
      const wrapper = mount(SRadioGroupCard, {
        props: { items, modelValue: 'card-1' },
        attachTo: document.body
      });

      expect(wrapper.findAll('[role="radio"]')[0].attributes('aria-checked')).toBe('true');
      expect(wrapper.findAll('[role="radio"]')[1].attributes('aria-checked')).toBe('false');
      wrapper.unmount();
    });

    it('emits update:modelValue when a card is clicked', async () => {
      const wrapper = mount(SRadioGroupCard, {
        props: { items, modelValue: 'card-1' },
        attachTo: document.body
      });

      await wrapper.findAll('[role="radio"]')[1].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0][0]).toBe('card-2');
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('does not emit update:modelValue when a disabled card is clicked', async () => {
      const wrapper = mount(SRadioGroupCard, {
        props: { items, modelValue: 'card-1' },
        attachTo: document.body
      });

      await wrapper.findAll('[role="radio"]')[2].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('class overrides', () => {
    it('applies per-slot ui overrides to the content', () => {
      const wrapper = mount(SRadioGroupCard, {
        props: { items, ui: { content: 'custom-content-class' } },
        attachTo: document.body
      });

      expect(wrapper.find('.custom-content-class').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SRadioGroupCard, {
        props: { items, modelValue: 'card-1' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
