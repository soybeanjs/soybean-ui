import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SCheckboxCard from '@/components/checkbox/checkbox-card.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SCheckboxCard', () => {
  describe('rendering', () => {
    it('renders label, icon and description content', () => {
      const wrapper = mount(SCheckboxCard, {
        props: { label: 'Card title', icon: 'lucide:star', description: 'Card description' },
        attachTo: document.body
      });

      expect(wrapper.find('[role="checkbox"]').exists()).toBe(true);
      expect(wrapper.text()).toContain('Card title');
      expect(wrapper.text()).toContain('Card description');
      wrapper.unmount();
    });

    it('renders the default slot as label content', () => {
      const wrapper = mount(SCheckboxCard, {
        slots: { default: 'Custom label' },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Custom label');
      wrapper.unmount();
    });
  });

  describe('checked state', () => {
    it('reflects modelValue=true as checked', () => {
      const wrapper = mount(SCheckboxCard, {
        props: { modelValue: true, label: 'Card' },
        attachTo: document.body
      });

      expect(wrapper.find('[role="checkbox"]').attributes('aria-checked')).toBe('true');
      wrapper.unmount();
    });

    it('emits update:modelValue on click', async () => {
      const wrapper = mount(SCheckboxCard, {
        props: { modelValue: false, label: 'Card' },
        attachTo: document.body
      });

      await wrapper.find('[role="checkbox"]').trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0][0]).toBe(true);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('applies disabled to the card control', () => {
      const wrapper = mount(SCheckboxCard, {
        props: { disabled: true, label: 'Card' },
        attachTo: document.body
      });

      // @ts-expect-error - Vue Test Utils does not recognize the disabled attribute on non-native elements
      expect(wrapper.find('[role="checkbox"]').element.disabled).toBe(true);
      wrapper.unmount();
    });

    it('does not emit update:modelValue when disabled', async () => {
      const wrapper = mount(SCheckboxCard, {
        props: { disabled: true, modelValue: false, label: 'Card' },
        attachTo: document.body
      });

      await wrapper.find('[role="checkbox"]').trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('class overrides', () => {
    it('merges a custom class onto the root', () => {
      const wrapper = mount(SCheckboxCard, {
        props: { label: 'Card', class: 'checkbox-card-root-class' },
        attachTo: document.body
      });

      expect(wrapper.find('.checkbox-card-root-class').exists()).toBe(true);
      wrapper.unmount();
    });

    it('applies per-slot ui overrides to the content and control', () => {
      const wrapper = mount(SCheckboxCard, {
        props: {
          label: 'Card',
          ui: { content: 'custom-content-class', control: 'custom-control-class' }
        },
        attachTo: document.body
      });

      expect(wrapper.find('.custom-content-class').exists()).toBe(true);
      expect(wrapper.find('[role="checkbox"]').classes()).toContain('custom-control-class');
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SCheckboxCard, {
        props: { label: 'Card', icon: 'lucide:star', description: 'Card description', modelValue: true },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
