import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import {
  SInputOpt,
  SInputOptGroup,
  SInputOptSeparator,
  SInputOptSlot
} from '../../../src/components/input-opt';
import { getA11yViolations } from '../../shared/a11y';

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
  });

  describe('value state', () => {
    it('emits update:modelValue and complete on input', async () => {
      const wrapper = mount(DemoInputOpt, { attachTo: document.body });

      await wrapper.find('input').setValue('123456');

      expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['123456']);
      expect(wrapper.emitted('complete')?.[0]).toEqual(['123456']);
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
