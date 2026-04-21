import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SSegment from '../../../src/components/segment/segment.vue';
import { getA11yViolations } from '../../shared/a11y';

const items = [
  { value: 'segment-1', label: 'Daily' },
  { value: 'segment-2', label: 'Weekly' },
  { value: 'segment-3', label: 'Monthly', disabled: true }
];

describe('SSegment', () => {
  describe('rendering', () => {
    it('renders all segment triggers', () => {
      const wrapper = mount(SSegment, {
        props: { items },
        attachTo: document.body
      });

      expect(wrapper.findAll('[role="tab"]')).toHaveLength(items.length);
      wrapper.unmount();
    });

    it('renders custom item slot content', () => {
      const wrapper = mount(
        {
          components: { SSegment },
          data() {
            return { items };
          },
          template: `
            <SSegment :items="items" model-value="segment-1">
              <template #item="{ label, active }">
                <span :data-test="'segment-item-' + label">{{ active ? 'active' : 'idle' }}-{{ label }}</span>
              </template>
            </SSegment>
          `
        },
        { attachTo: document.body }
      );

      expect(wrapper.find('[data-test="segment-item-Daily"]').text()).toBe('active-Daily');
      wrapper.unmount();
    });

    it('merges custom class onto the root container', () => {
      const wrapper = mount(SSegment, {
        props: { items, class: 'segment-root-class' },
        attachTo: document.body
      });

      expect(wrapper.find('.segment-root-class').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('active state', () => {
    it('marks the active segment with aria-selected="true"', () => {
      const wrapper = mount(SSegment, {
        props: { items, modelValue: 'segment-1' },
        attachTo: document.body
      });

      expect(wrapper.findAll('[role="tab"]')[0].attributes('aria-selected')).toBe('true');
      wrapper.unmount();
    });

    it('emits update:modelValue when a segment is selected', async () => {
      const wrapper = mount(SSegment, {
        props: { items, modelValue: 'segment-1' },
        attachTo: document.body
      });

      await wrapper.findAll('[role="tab"]')[1].trigger('mousedown', { button: 0 });

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0][0]).toBe('segment-2');
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('marks disabled segments with data-disabled', () => {
      const wrapper = mount(SSegment, {
        props: { items },
        attachTo: document.body
      });

      expect(wrapper.findAll('[role="tab"]')[2].attributes('data-disabled')).toBe('');
      wrapper.unmount();
    });

    it('does not emit update:modelValue when a disabled segment is selected', async () => {
      const wrapper = mount(SSegment, {
        props: { items, modelValue: 'segment-1' },
        attachTo: document.body
      });

      await wrapper.findAll('[role="tab"]')[2].trigger('mousedown', { button: 0 });

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SSegment, {
        props: { items, modelValue: 'segment-1' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);
      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
