import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import SColorSlider from '../../../src/components/color-slider/color-slider.vue';

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

function dispatchPointerEvent(target: EventTarget, type: string, init: PointerEventInit) {
  target.dispatchEvent(new PointerEvent(type, { bubbles: true, ...init }));
}

describe('SColorSlider', () => {
  describe('rendering', () => {
    it('renders a slider thumb', () => {
      const wrapper = mount(SColorSlider, {
        props: { modelValue: 'hsl(0 100% 50%)', channel: 'hue', format: 'hsl' },
        attachTo: document.body
      });

      expect(wrapper.find('[role="slider"]').exists()).toBe(true);
      wrapper.unmount();
    });

    it('renders a hidden input when a name is provided', () => {
      const wrapper = mount(
        {
          components: { SColorSlider },
          template: '<form><SColorSlider model-value="hsl(0 100% 50%)" channel="hue" format="hsl" name="hue" /></form>'
        },
        { attachTo: document.body }
      );

      expect(wrapper.find('input[name="hue"]').exists()).toBe(true);
      wrapper.unmount();
    });
  });

  describe('interaction', () => {
    it('emits updates on keyboard interaction', async () => {
      const wrapper = mount(SColorSlider, {
        props: { modelValue: 'hsl(0 100% 50%)', channel: 'hue', format: 'hsl' },
        attachTo: document.body
      });

      await wrapper.find('[role="slider"]').trigger('keydown', { key: 'End' });

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('changeEnd')).toBeTruthy();
      wrapper.unmount();
    });

    it('keeps alpha changes in a controlled setup when using rgb format', async () => {
      const wrapper = mount(
        {
          components: { SColorSlider },
          data() {
            return {
              value: 'rgba(236, 72, 153, 0.85)'
            };
          },
          template: '<SColorSlider v-model="value" channel="alpha" color-space="hsl" format="rgb" />'
        },
        { attachTo: document.body }
      );

      await wrapper.find('[role="slider"]').trigger('keydown', { key: 'ArrowLeft' });
      await nextTick();

      expect(wrapper.vm.value).toContain('rgb(');
      expect(wrapper.vm.value).toContain('/');
      expect(wrapper.vm.value).not.toContain('#');
      wrapper.unmount();
    });

    it('updates the controlled rgb string when dragging the hue slider', async () => {
      const wrapper = mount(
        {
          components: { SColorSlider },
          data() {
            return {
              value: 'rgba(236, 72, 153, 0.85)'
            };
          },
          template: '<SColorSlider v-model="value" channel="hue" color-space="hsl" format="rgb" />'
        },
        { attachTo: document.body }
      );

      const track = wrapper.findAll('[data-orientation="horizontal"]')[1]!;
      const thumb = wrapper.find('[role="slider"]');
      const initialValue = wrapper.vm.value;

      mockRect(track.element, { x: 0, y: 0, width: 100, height: 10 });
      dispatchPointerEvent(thumb.element, 'pointerdown', { clientX: 50, clientY: 5, pointerId: 1 });
      dispatchPointerEvent(document, 'pointermove', { clientX: 80, clientY: 5, pointerId: 1 });
      dispatchPointerEvent(document, 'pointerup', { clientX: 80, clientY: 5, pointerId: 1 });

      await nextTick();

      expect(wrapper.vm.value).not.toBe(initialValue);
      expect(wrapper.vm.value).toContain('rgb(');
      wrapper.unmount();
    });

    it('updates the shared color value when two color sliders are bound like the playground demo', async () => {
      const wrapper = mount(
        {
          components: { SColorSlider },
          data() {
            return {
              value: 'rgba(236, 72, 153, 0.85)'
            };
          },
          template: `
            <div>
              <SColorSlider v-model="value" channel="hue" color-space="hsl" format="rgb" />
              <SColorSlider v-model="value" channel="alpha" color-space="hsl" format="rgb" />
            </div>
          `
        },
        { attachTo: document.body }
      );

      const track = wrapper.findAll('[data-orientation="horizontal"]')[1]!;
      const thumb = wrapper.findAll('[role="slider"]')[0]!;
      const initialValue = wrapper.vm.value;

      mockRect(track.element, { x: 0, y: 0, width: 100, height: 10 });
      dispatchPointerEvent(thumb.element, 'pointerdown', { clientX: 50, clientY: 5, pointerId: 1 });
      dispatchPointerEvent(document, 'pointermove', { clientX: 80, clientY: 5, pointerId: 1 });
      dispatchPointerEvent(document, 'pointerup', { clientX: 80, clientY: 5, pointerId: 1 });

      await nextTick();

      expect(wrapper.vm.value).not.toBe(initialValue);
      expect(wrapper.vm.value).toContain('rgb(');
      wrapper.unmount();
    });

    it('does not reset to black on mount when hue and alpha sliders share an rgba source', async () => {
      const wrapper = mount(
        {
          components: { SColorSlider },
          data() {
            return {
              value: 'rgba(236, 72, 153, 0.85)'
            };
          },
          template: `
            <div>
              <SColorSlider v-model="value" channel="hue" color-space="hsl" format="hex" />
              <SColorSlider v-model="value" channel="alpha" color-space="hsl" format="hex" />
            </div>
          `
        },
        { attachTo: document.body }
      );

      await nextTick();

      expect(wrapper.vm.value).not.toBe('#000000');
      wrapper.unmount();
    });
  });
});
