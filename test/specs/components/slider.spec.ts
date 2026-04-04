import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import SSlider from '../../../src/components/slider/slider.vue';
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

function mockPointerCapture(element: Element) {
  const pointerIds = new Set<number>();
  const target = element as HTMLElement & {
    setPointerCapture?: (pointerId: number) => void;
    releasePointerCapture?: (pointerId: number) => void;
    hasPointerCapture?: (pointerId: number) => boolean;
  };

  target.setPointerCapture = vi.fn(pointerId => {
    pointerIds.add(pointerId);
  });
  target.releasePointerCapture = vi.fn(pointerId => {
    pointerIds.delete(pointerId);
  });
  target.hasPointerCapture = vi.fn(pointerId => pointerIds.has(pointerId));
}

describe('SSlider', () => {
  describe('rendering', () => {
    it('renders a single thumb by default', () => {
      const wrapper = mount(SSlider, {
        props: { thumbProps: { 'aria-label': 'Volume' } },
        attachTo: document.body
      });

      expect(wrapper.findAll('[role="slider"]')).toHaveLength(1);
      wrapper.unmount();
    });

    it('applies custom class to the root element', () => {
      const wrapper = mount(SSlider, {
        props: { class: 'my-slider', thumbProps: { 'aria-label': 'Volume' } },
        attachTo: document.body
      });

      expect(wrapper.html()).toContain('my-slider');
      wrapper.unmount();
    });

    it('renders multiple thumbs for range values', () => {
      const wrapper = mount(SSlider, {
        props: { modelValue: [20, 80] },
        attachTo: document.body
      });

      const thumbs = wrapper.findAll('[role="slider"]');

      expect(thumbs).toHaveLength(2);
      expect(thumbs[0]?.attributes('aria-label')).toBe('Minimum');
      expect(thumbs[1]?.attributes('aria-label')).toBe('Maximum');
      wrapper.unmount();
    });
  });

  describe('value state', () => {
    it('reflects modelValue on aria-valuenow', () => {
      const wrapper = mount(SSlider, {
        props: { modelValue: [35], thumbProps: { 'aria-label': 'Volume' } },
        attachTo: document.body
      });

      expect(wrapper.find('[role="slider"]').attributes('aria-valuenow')).toBe('35');
      wrapper.unmount();
    });

    it('emits update:modelValue and valueCommit on keyboard interaction', async () => {
      const wrapper = mount(SSlider, {
        props: { modelValue: [20], thumbProps: { 'aria-label': 'Volume' } },
        attachTo: document.body
      });

      await wrapper.find('[role="slider"]').trigger('keydown', { key: 'End' });

      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual([100]);
      expect(wrapper.emitted('valueCommit')?.[0]?.[0]).toEqual([100]);
      wrapper.unmount();
    });

    it('emits update:modelValue from track pointer interaction', async () => {
      const wrapper = mount(SSlider, {
        props: { modelValue: [0], thumbProps: { 'aria-label': 'Volume' } },
        attachTo: document.body
      });

      const track = wrapper.find('[data-slot="slider-track"]');

      mockRect(track.element, { x: 0, y: 0, width: 100, height: 10 });
      mockPointerCapture(track.element);

      await track.trigger('pointerdown', { clientX: 75, clientY: 5, pointerId: 1 });
      await track.trigger('pointerup', { clientX: 75, clientY: 5, pointerId: 1 });

      expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual([75]);
      expect(wrapper.emitted('valueCommit')?.[0]?.[0]).toEqual([75]);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('prevents keyboard interaction when disabled', async () => {
      const wrapper = mount(SSlider, {
        props: { disabled: true, modelValue: [10], thumbProps: { 'aria-label': 'Volume' } },
        attachTo: document.body
      });

      await wrapper.find('[role="slider"]').trigger('keydown', { key: 'End' });

      expect(wrapper.find('[role="slider"]').attributes('aria-disabled')).toBe('true');
      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(SSlider, {
        props: { thumbProps: { 'aria-label': 'Volume' } },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
