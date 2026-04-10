import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import {
  SInputOpt,
  SInputOptGroup,
  SInputOptSeparator,
  SInputOptSlot
} from '../../../src/components/input-opt';
import { getA11yViolations } from '../../shared/a11y';

function mockRect(element: Element, rect: { x?: number; y?: number; width?: number; height?: number }) {
  Object.defineProperty(element, 'getBoundingClientRect', {
    configurable: true,
    value: () => ({
      x: rect.x ?? 0,
      y: rect.y ?? 0,
      top: rect.y ?? 0,
      left: rect.x ?? 0,
      right: (rect.x ?? 0) + (rect.width ?? 0),
      bottom: (rect.y ?? 0) + (rect.height ?? 0),
      width: rect.width ?? 0,
      height: rect.height ?? 0,
      toJSON: () => ({})
    })
  });
}

const DemoInputOpt = {
  components: {
    SInputOpt,
    SInputOptGroup,
    SInputOptSeparator,
    SInputOptSlot
  },
  props: {
    disabled: { type: Boolean, default: false },
    id: { type: String, default: undefined },
    modelValue: { type: String, default: undefined }
  },
  emits: ['update:modelValue', 'complete'],
  template: `
    <SInputOpt :id="id" :disabled="disabled" :maxlength="6" :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      @complete="$emit('complete', $event)"
    >
      <SInputOptGroup>
        <SInputOptSlot v-for="index in 3" :key="index" :index="index - 1" />
      </SInputOptGroup>
      <SInputOptSeparator />
      <SInputOptGroup>
        <SInputOptSlot v-for="index in 3" :key="index" :index="index + 2" />
      </SInputOptGroup>
    </SInputOpt>
  `
};

describe('SInputOpt', () => {
  describe('rendering', () => {
    it('renders six opt slots', () => {
      const wrapper = mount(DemoInputOpt, { attachTo: document.body });

      expect(wrapper.findAll('[data-slot="input-opt-slot"]')).toHaveLength(6);
      wrapper.unmount();
    });

    it('applies custom class to the root element', () => {
      const wrapper = mount(SInputOpt, {
        props: { class: 'my-input-opt', maxlength: 6 },
        slots: {
          default: `
            <SInputOptGroup>
              <SInputOptSlot v-for="index in 6" :key="index" :index="index - 1" />
            </SInputOptGroup>
          `
        },
        global: {
          components: { SInputOptGroup, SInputOptSlot }
        },
        attachTo: document.body
      });

      expect(wrapper.html()).toContain('my-input-opt');
      wrapper.unmount();
    });

    it('renders controlled values into the slots', () => {
      const wrapper = mount(DemoInputOpt, {
        props: { modelValue: '123456' },
        attachTo: document.body
      });

      const slots = wrapper.findAll('[data-slot="input-opt-slot"]');

      expect(slots[0]?.text()).toBe('1');
      expect(slots[5]?.text()).toBe('6');
      wrapper.unmount();
    });

    it('renders a styled separator without icon markup', () => {
      const wrapper = mount(DemoInputOpt, { attachTo: document.body });

      expect(wrapper.find('[data-slot="input-opt-separator"] img').exists()).toBe(false);
      wrapper.unmount();
    });
  });

  describe('value state', () => {
    it('emits update:modelValue and complete on input', async () => {
      const wrapper = mount(DemoInputOpt, { attachTo: document.body });

      await wrapper.find('input').setValue('123456');

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['123456']);
      expect(wrapper.emitted('complete')?.[0]).toEqual(['123456']);
      wrapper.unmount();
    });

    it('replaces a filled slot after reselection', async () => {
      const wrapper = mount(DemoInputOpt, { attachTo: document.body });

      const input = wrapper.find('input');

      await input.trigger('focus');
      await input.setValue('123456');

      const slots = wrapper.findAll('[data-slot="input-opt-slot"]');

      slots.forEach((slot, index) => {
        mockRect(slot.element, { x: index * 10, y: 0, width: 10, height: 10 });
      });

      await input.trigger('pointerdown', { button: 0, clientX: 5, clientY: 5 });

      const element = input.element as HTMLInputElement;

      expect(element.selectionStart).toBe(0);
      expect(element.selectionEnd).toBe(1);

      element.setRangeText('9', element.selectionStart ?? 0, element.selectionEnd ?? 0, 'end');
      element.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise(resolve => setTimeout(resolve, 0));

      const updatedSlots = wrapper.findAll('[data-slot="input-opt-slot"]');

      expect(updatedSlots[0]?.text()).toBe('9');
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['923456']);
      wrapper.unmount();
    });

    it('updates the active slot when navigating with the keyboard', async () => {
      const wrapper = mount(DemoInputOpt, {
        props: { modelValue: '123456' },
        attachTo: document.body
      });

      const input = wrapper.find('input');

      await input.trigger('focus');
      (input.element as HTMLInputElement).setSelectionRange(4, 4);
      await input.trigger('keydown', { key: 'ArrowLeft' });
      await new Promise(resolve => setTimeout(resolve, 0));

      const slots = wrapper.findAll('[data-slot="input-opt-slot"]');

      expect(slots[4]?.attributes('data-active')).toBe('true');
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('renders a disabled input', () => {
      const wrapper = mount(DemoInputOpt, {
        props: { disabled: true },
        attachTo: document.body
      });

      expect(wrapper.find('input').element.disabled).toBe(true);
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when paired with a label', async () => {
      const wrapper = mount(
        {
          components: { DemoInputOpt },
          template: `
            <div>
              <label for="opt-input">Verification code</label>
              <DemoInputOpt id="opt-input" />
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
