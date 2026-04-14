import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SStepper from '../../../src/components/stepper/stepper.vue';
import { getA11yViolations } from '../../shared/a11y';

const items = [
  { title: 'Account', description: 'Set up your account' },
  { title: 'Profile', description: 'Fill in your profile' },
  { title: 'Review', description: 'Confirm your details' }
];

describe('SStepper', () => {
  describe('rendering', () => {
    it('renders all step triggers', () => {
      const wrapper = mount(SStepper, {
        props: { items },
        attachTo: document.body
      });

      expect(wrapper.findAll('button')).toHaveLength(items.length);
      wrapper.unmount();
    });

    it('renders step titles', () => {
      const wrapper = mount(SStepper, {
        props: { items },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Account');
      expect(wrapper.text()).toContain('Profile');
      wrapper.unmount();
    });

    it('derives step numbers from item order', async () => {
      const customStepItems = [
        { description: 'First step', step: 4 },
        { description: 'Second step', step: 9 }
      ];
      const wrapper = mount(SStepper, {
        props: { items: customStepItems, modelValue: 1 },
        attachTo: document.body
      });
      const buttons = wrapper.findAll('button');

      expect(buttons[0].text()).toContain('Step 1');
      expect(buttons[0].text()).not.toContain('Step 4');
      expect(buttons[1].text()).toContain('Step 2');

      await buttons[1].trigger('mousedown', { button: 0 });

      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(2);
      wrapper.unmount();
    });

    it('stacks the connector under the indicator in vertical orientation', () => {
      const wrapper = mount(SStepper, {
        props: { items, orientation: 'vertical' },
        attachTo: document.body
      });
      const activeItem = wrapper.find('[aria-current="step"]');
      const itemChildren = Array.from(activeItem.element.children);
      const activeSeparator = itemChildren[1] as HTMLElement | undefined;

      expect(wrapper.find('[role="group"]').classes()).toContain('gap-0');
      expect(activeItem.classes()).toContain('flex-col');
      expect(itemChildren[0]?.tagName).toBe('BUTTON');
      expect(activeSeparator?.getAttribute('role')).toBe('none');
      expect(activeSeparator?.dataset.orientation).toBe('vertical');
      expect(activeSeparator?.className).toContain('ms-4');
      wrapper.unmount();
    });
  });

  describe('active state', () => {
    it('marks the active step with aria-current="step"', () => {
      const wrapper = mount(SStepper, {
        props: { items, modelValue: 2 },
        attachTo: document.body
      });

      expect(wrapper.findAll('[aria-current="step"]')).toHaveLength(1);
      expect(wrapper.findAll('[aria-current="step"]')[0].attributes('data-state')).toBe('active');
      wrapper.unmount();
    });

    it('emits update:modelValue when the next step is clicked', async () => {
      const wrapper = mount(SStepper, {
        props: { items, modelValue: 1 },
        attachTo: document.body
      });

      await wrapper.findAll('button')[1].trigger('mousedown', { button: 0 });

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0][0]).toBe(2);
      wrapper.unmount();
    });

    it('prevents skipping steps in linear mode', async () => {
      const wrapper = mount(SStepper, {
        props: { items, modelValue: 1, linear: true },
        attachTo: document.body
      });

      await wrapper.findAll('button')[2].trigger('mousedown', { button: 0 });

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('disables inaccessible future steps', () => {
      const wrapper = mount(SStepper, {
        props: { items, modelValue: 1, linear: true },
        attachTo: document.body
      });

      const thirdStep = wrapper.findAll('button')[2].element as HTMLButtonElement;

      expect(thirdStep.disabled).toBe(true);
      wrapper.unmount();
    });

    it('prevents interaction when a step is disabled', async () => {
      const wrapper = mount(SStepper, {
        props: {
          items: [{ title: 'Account' }, { title: 'Profile', disabled: true }, { title: 'Review' }],
          modelValue: 1,
          linear: false
        },
        attachTo: document.body
      });

      await wrapper.findAll('button')[1].trigger('mousedown', { button: 0 });

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('allows overriding the group aria-label', () => {
      const wrapper = mount(SStepper, {
        props: { items, 'aria-label': 'Checkout progress' },
        attachTo: document.body
      });

      expect(wrapper.find('[role="group"]').attributes('aria-label')).toBe('Checkout progress');
      wrapper.unmount();
    });

    it('has no a11y violations', async () => {
      const wrapper = mount(SStepper, {
        props: { items, modelValue: 2 },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
