import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SRating from '@/components/rating/rating.vue';
import { getA11yViolations } from '../../shared/a11y';

describe('SRating', () => {
  describe('rendering', () => {
    it('renders a slider with aria-valuenow 0 by default', () => {
      const wrapper = mount(SRating, { attachTo: document.body });

      const slider = wrapper.find('[role="slider"]');

      expect(slider.attributes('aria-valuenow')).toBe('0');
      expect(slider.attributes('aria-valuemin')).toBe('0');
      expect(slider.attributes('aria-valuemax')).toBe('5');
      wrapper.unmount();
    });

    it('renders max items by default', () => {
      const wrapper = mount(SRating, { attachTo: document.body });

      expect(wrapper.findAll('[data-soybean-rating-item]')).toHaveLength(5);
      wrapper.unmount();
    });

    it('applies custom class to the root element', () => {
      const wrapper = mount(SRating, {
        props: { class: 'my-rating' },
        attachTo: document.body
      });

      expect(wrapper.html()).toContain('my-rating');
      wrapper.unmount();
    });

    it('reflects modelValue on aria-valuenow', () => {
      const wrapper = mount(SRating, {
        props: { modelValue: 3 },
        attachTo: document.body
      });

      expect(wrapper.find('[role="slider"]').attributes('aria-valuenow')).toBe('3');
      wrapper.unmount();
    });

    it('reflects item state via data-state', () => {
      const wrapper = mount(SRating, {
        props: { modelValue: 3 },
        attachTo: document.body
      });

      const items = wrapper.findAll('[data-soybean-rating-item]');

      expect(items[0]?.attributes('data-state')).toBe('full');
      expect(items[2]?.attributes('data-state')).toBe('full');
      expect(items[3]?.attributes('data-state')).toBe('empty');
      wrapper.unmount();
    });
  });

  describe('hover preview', () => {
    it('previews the hovered item via data-state on hover', async () => {
      const wrapper = mount(SRating, {
        props: { modelValue: 1 },
        attachTo: document.body
      });

      const items = wrapper.findAll('[data-soybean-rating-item]');

      await items[2]?.trigger('pointerenter');

      expect(items[0]?.attributes('data-state')).toBe('full');
      expect(items[1]?.attributes('data-state')).toBe('full');
      expect(items[2]?.attributes('data-state')).toBe('full');
      expect(items[3]?.attributes('data-state')).toBe('empty');
      wrapper.unmount();
    });

    it('resets the preview to the model value on pointer leave of the root', async () => {
      const wrapper = mount(SRating, {
        props: { modelValue: 1 },
        attachTo: document.body
      });

      const items = wrapper.findAll('[data-soybean-rating-item]');

      await items[2]?.trigger('pointerenter');
      await wrapper.find('[role="slider"]').trigger('pointerleave');

      expect(items[0]?.attributes('data-state')).toBe('full');
      expect(items[1]?.attributes('data-state')).toBe('empty');
      expect(items[2]?.attributes('data-state')).toBe('empty');
      expect(items[3]?.attributes('data-state')).toBe('empty');
      wrapper.unmount();
    });
  });

  describe('value state', () => {
    it('emits update:modelValue and valueCommit on ArrowRight', async () => {
      const wrapper = mount(SRating, {
        props: { modelValue: 0 },
        attachTo: document.body
      });

      await wrapper.find('[role="slider"]').trigger('keydown', { key: 'ArrowRight' });

      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(1);
      expect(wrapper.emitted('valueCommit')?.[0]?.[0]).toBe(1);
      wrapper.unmount();
    });

    it('sets value to 0 on Home', async () => {
      const wrapper = mount(SRating, {
        props: { modelValue: 3 },
        attachTo: document.body
      });

      await wrapper.find('[role="slider"]').trigger('keydown', { key: 'Home' });

      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(0);
      expect(wrapper.emitted('valueCommit')?.[0]?.[0]).toBe(0);
      wrapper.unmount();
    });

    it('sets value to max on End', async () => {
      const wrapper = mount(SRating, {
        props: { modelValue: 0 },
        attachTo: document.body
      });

      await wrapper.find('[role="slider"]').trigger('keydown', { key: 'End' });

      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(5);
      expect(wrapper.emitted('valueCommit')?.[0]?.[0]).toBe(5);
      wrapper.unmount();
    });

    it('increments by 0.5 when allowHalf on ArrowRight', async () => {
      const wrapper = mount(SRating, {
        props: { modelValue: 0, allowHalf: true },
        attachTo: document.body
      });

      await wrapper.find('[role="slider"]').trigger('keydown', { key: 'ArrowRight' });

      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(0.5);
      expect(wrapper.emitted('valueCommit')?.[0]?.[0]).toBe(0.5);
      wrapper.unmount();
    });

    it('clears to 0 when clicking the current value with allowClear', async () => {
      const wrapper = mount(SRating, {
        props: { modelValue: 3, allowClear: true },
        attachTo: document.body
      });

      const items = wrapper.findAll('[data-soybean-rating-item]');

      await items[2]?.trigger('click');

      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toBe(0);
      expect(wrapper.emitted('valueCommit')?.[0]?.[0]).toBe(0);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('prevents keyboard interaction when disabled', async () => {
      const wrapper = mount(SRating, {
        props: { disabled: true, modelValue: 2 },
        attachTo: document.body
      });

      await wrapper.find('[role="slider"]').trigger('keydown', { key: 'End' });

      expect(wrapper.find('[role="slider"]').attributes('aria-disabled')).toBe('true');
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('readonly state', () => {
    it('exposes aria-readonly and skips hover preview', async () => {
      const wrapper = mount(SRating, {
        props: { readonly: true, modelValue: 3 },
        attachTo: document.body
      });

      expect(wrapper.find('[role="slider"]').attributes('aria-readonly')).toBe('true');

      await wrapper.find('[data-soybean-rating-item]').trigger('pointermove', { clientX: 10 });

      expect(wrapper.emitted('hoverChange')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SRating, {
        props: { modelValue: 3 },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
