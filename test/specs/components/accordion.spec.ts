import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SAccordion from '../../../src/components/accordion/accordion.vue';
import { getA11yViolations } from '../../shared/a11y';

const items = [
  { value: 'item-1', title: 'Section One', description: 'Content for section one.' },
  { value: 'item-2', title: 'Section Two', description: 'Content for section two.' },
  { value: 'item-3', title: 'Section Three', description: 'Content for section three.', disabled: true }
];

describe('SAccordion', () => {
  describe('rendering', () => {
    it('renders all items', () => {
      const wrapper = mount(SAccordion, {
        props: { items },
        attachTo: document.body
      });
      expect(wrapper.text()).toContain('Section One');
      expect(wrapper.text()).toContain('Section Two');
      expect(wrapper.text()).toContain('Section Three');
      wrapper.unmount();
    });

    it('renders trigger buttons for each item', () => {
      const wrapper = mount(SAccordion, {
        props: { items },
        attachTo: document.body
      });
      // AccordionTrigger renders as button
      const buttons = wrapper.findAll('button');
      expect(buttons).toHaveLength(items.length);
      wrapper.unmount();
    });

    it('content is hidden when item is closed', () => {
      const wrapper = mount(SAccordion, {
        props: { items },
        attachTo: document.body
      });
      const trigger = wrapper.findAll('button')[0];
      expect(trigger.attributes('aria-expanded')).toBe('false');
      wrapper.unmount();
    });
  });

  describe('open state', () => {
    it('shows item as expanded when modelValue matches', () => {
      const wrapper = mount(SAccordion, {
        props: { items, modelValue: 'item-1' },
        attachTo: document.body
      });
      const firstTrigger = wrapper.findAll('button')[0];
      expect(firstTrigger.attributes('aria-expanded')).toBe('true');
      wrapper.unmount();
    });

    it('emits update:modelValue when trigger is clicked', async () => {
      const wrapper = mount(SAccordion, {
        props: { items },
        attachTo: document.body
      });
      await wrapper.findAll('button')[0].trigger('click');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0][0]).toBe('item-1');
      wrapper.unmount();
    });

    it('supports multiple selection when multiple prop is true', () => {
      const wrapper = mount(SAccordion, {
        props: { items, multiple: true, modelValue: ['item-1', 'item-2'] },
        attachTo: document.body
      });
      const buttons = wrapper.findAll('button');
      expect(buttons[0].attributes('aria-expanded')).toBe('true');
      expect(buttons[1].attributes('aria-expanded')).toBe('true');
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('disables trigger for disabled items', () => {
      const wrapper = mount(SAccordion, {
        props: { items },
        attachTo: document.body
      });
      const disabledTrigger = wrapper.findAll('button')[2];
      expect(disabledTrigger.element.disabled).toBe(true);
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations in closed state', async () => {
      const wrapper = mount(SAccordion, {
        props: { items },
        attachTo: document.body
      });
      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });

    it('has no a11y violations with an item open', async () => {
      const wrapper = mount(SAccordion, {
        props: { items, modelValue: 'item-1' },
        attachTo: document.body
      });
      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
