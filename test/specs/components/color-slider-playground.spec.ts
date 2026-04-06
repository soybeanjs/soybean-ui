import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import DemoColorSliderBasic from '../../../playground/examples/color-slider/basic.vue';
import SColorSlider from '../../../src/components/color-slider/color-slider.vue';

describe('ColorSlider playground demo', () => {
  it('does not reset displayed color text to #000000 after mount', async () => {
    const wrapper = mount(DemoColorSliderBasic, {
      attachTo: document.body
    });

    await nextTick();
    await nextTick();

    expect(wrapper.text()).not.toContain('#000000');
    expect(wrapper.text()).toContain('#ec4899');

    wrapper.unmount();
  });

  it('does not emit color updates from child sliders during initial mount', async () => {
    const wrapper = mount(DemoColorSliderBasic, {
      attachTo: document.body
    });

    await nextTick();
    await nextTick();

    const sliderWrappers = wrapper.findAllComponents(SColorSlider);

    expect(sliderWrappers[0]?.emitted('update:color')).toBeUndefined();
    expect(sliderWrappers[1]?.emitted('update:color')).toBeUndefined();

    wrapper.unmount();
  });
});
