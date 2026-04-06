import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SColorArea from '../../../src/components/color-area/color-area.vue';

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
  let capturedPointerId: number | null = null;

  Object.defineProperty(element, 'setPointerCapture', {
    configurable: true,
    value: (pointerId: number) => {
      capturedPointerId = pointerId;
    }
  });

  Object.defineProperty(element, 'hasPointerCapture', {
    configurable: true,
    value: (pointerId: number) => capturedPointerId === pointerId
  });

  Object.defineProperty(element, 'releasePointerCapture', {
    configurable: true,
    value: (pointerId: number) => {
      if (capturedPointerId === pointerId) {
        capturedPointerId = null;
      }
    }
  });
}

function dispatchPointerEvent(target: EventTarget, type: string, init: PointerEventInit) {
  target.dispatchEvent(new PointerEvent(type, { bubbles: true, ...init }));
}

describe('SColorArea', () => {
  describe('rendering', () => {
    it('renders an interactive color area and thumb', () => {
      const wrapper = mount(SColorArea, {
        props: { modelValue: 'hsl(0 50% 50%)', format: 'hsl' },
        attachTo: document.body
      });

      expect(wrapper.find('[role="application"]').exists()).toBe(true);
      expect(wrapper.find('[role="slider"]').exists()).toBe(true);
      wrapper.unmount();
    });

    it('renders hidden x and y inputs inside a form', () => {
      const wrapper = mount(
        {
          components: { SColorArea },
          template: '<form><SColorArea model-value="hsl(0 50% 50%)" format="hsl" x-name="s" y-name="l" /></form>'
        },
        { attachTo: document.body }
      );

      const inputs = wrapper.findAll('input');

      expect(inputs.map(input => input.attributes('name'))).toEqual(['s', 'l']);
      wrapper.unmount();
    });
  });

  describe('interaction', () => {
    it('emits updates on keyboard interaction', async () => {
      const wrapper = mount(SColorArea, {
        props: { modelValue: 'hsl(0 50% 50%)', format: 'hsl' },
        attachTo: document.body
      });

      await wrapper.find('[role="application"]').trigger('keydown', { key: 'ArrowRight' });

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(String(wrapper.emitted('update:modelValue')?.[0]?.[0])).toContain('hsl');
      expect(wrapper.emitted('changeEnd')).toBeTruthy();
      wrapper.unmount();
    });

    it('keeps OKLCH lightness in percentage space when updating the thumb position', async () => {
      const wrapper = mount(SColorArea, {
        props: {
          modelValue: 'oklch(62% 0.22 312)',
          colorSpace: 'oklch',
          format: 'oklch',
          xChannel: 'chroma',
          yChannel: 'lightness'
        },
        attachTo: document.body
      });

      await wrapper.find('[role="application"]').trigger('keydown', { key: 'ArrowUp' });

      expect(String(wrapper.emitted('update:modelValue')?.[0]?.[0])).toContain('oklch(63%');
      wrapper.unmount();
    });

    it('does not shift the thumb when clicking the existing thumb', () => {
      const wrapper = mount(SColorArea, {
        props: {
          modelValue: 'oklch(62% 0.22 312)',
          colorSpace: 'oklch',
          format: 'oklch',
          xChannel: 'chroma',
          yChannel: 'lightness'
        },
        attachTo: document.body
      });

      const area = wrapper.find('[role="application"]');
      const thumb = wrapper.find('[role="slider"]');

      mockRect(area.element, { x: 0, y: 0, width: 100, height: 100 });
      mockRect(thumb.element, { x: 51, y: 34, width: 22, height: 22 });
      mockPointerCapture(area.element);

      dispatchPointerEvent(thumb.element, 'pointerdown', { clientX: 55, clientY: 40, pointerId: 1 });
      dispatchPointerEvent(area.element, 'pointerup', { clientX: 55, clientY: 40, pointerId: 1 });

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();
      wrapper.unmount();
    });
  });
});
