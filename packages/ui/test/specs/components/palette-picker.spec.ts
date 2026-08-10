import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { DOMWrapper, flushPromises, mount } from '@vue/test-utils';
import { colord } from '@soybeanjs/colord';
import { tailwindPalette } from '@soybeanjs/colord/palette';
import SColorPicker from '@/components/color-picker/color-picker.vue';
import SConfigProvider from '@/components/config-provider/config-provider.vue';
import SPalettePicker from '@/components/palette-picker/palette-picker.vue';
import {
  DEFAULT_LEVEL,
  PALETTE_LEVELS,
  deriveNearestLevel,
  deriveSelectValue,
  deriveTailLevel,
  parseTailwindValue,
  serializeColor,
  toCssColor
} from '@/components/palette-picker/shared';
import { MockResizeObserver, setupMock } from '../../shared';

const mousePointerDown = {
  button: 0,
  ctrlKey: false,
  pageX: 0,
  pageY: 0,
  pointerId: 1,
  pointerType: 'mouse'
};

const mockHTMLElementProp = <K extends keyof HTMLElement>(property: K, value: HTMLElement[K]) => {
  const descriptor = Object.getOwnPropertyDescriptor(window.HTMLElement.prototype, property);

  Object.defineProperty(window.HTMLElement.prototype, property, {
    configurable: true,
    value
  });

  return () => {
    if (descriptor) {
      Object.defineProperty(window.HTMLElement.prototype, property, descriptor);
      return;
    }

    Reflect.deleteProperty(window.HTMLElement.prototype, property);
  };
};

let cleanupFunctions: Array<() => void> = [];

beforeEach(() => {
  cleanupFunctions = [
    mockHTMLElementProp('releasePointerCapture', vi.fn() as HTMLElement['releasePointerCapture']),
    mockHTMLElementProp('hasPointerCapture', vi.fn(() => false) as HTMLElement['hasPointerCapture']),
    mockHTMLElementProp('scrollIntoView', vi.fn() as HTMLElement['scrollIntoView'])
  ];
  cleanupFunctions.push(setupMock('ResizeObserver', MockResizeObserver as typeof ResizeObserver));
});

afterEach(() => {
  while (cleanupFunctions.length) {
    cleanupFunctions.pop()?.();
  }

  document.body.innerHTML = '';
  window.localStorage.clear();
});

describe('shared helpers', () => {
  it('parses a tailwind color value', () => {
    expect(parseTailwindValue('indigo.500')).toEqual({ key: 'indigo', level: 500 });
    expect(parseTailwindValue('hsl(240 50% 30%)')).toBeNull();
    expect(parseTailwindValue('black')).toBeNull();
  });

  it('derives the select value from a ColorValue', () => {
    expect(deriveSelectValue('indigo.500')).toBe('indigo');
    expect(deriveSelectValue('black')).toBe('black');
    expect(deriveSelectValue('hsl(240 50% 30%)')).toBe('custom');
    expect(deriveSelectValue('oklch(50% 0.1 240)')).toBe('custom');
  });

  it('derives the tailwind level with a 500 default', () => {
    expect(deriveTailLevel('indigo.700')).toBe(700);
    expect(deriveTailLevel('hsl(240 50% 30%)')).toBe(DEFAULT_LEVEL);
  });

  it('serializes a color into the requested format', () => {
    expect(serializeColor('#6366f1', 'hsl')).toMatch(/^hsl\(/);
    expect(serializeColor('#ffffff', 'oklch')).toMatch(/^oklch\(/);
  });

  it('resolves a ColorValue to a CSS color', () => {
    expect(toCssColor('indigo.500')).toMatch(/^hsl\(/);
    expect(toCssColor('black')).toBe('#000000');
    expect(toCssColor('transparent')).toBe('transparent');
  });

  it('derives the nearest palette level for a raw color', () => {
    // a mid-tone indigo maps to level 500
    expect(deriveNearestLevel('#6366f1', 'hsl')).toBe(500);
    // invalid colors fall back to the default level
    expect(deriveNearestLevel('not-a-color', 'hsl')).toBe(DEFAULT_LEVEL);
  });
});

const mountPicker = (modelValue: string) =>
  mount(
    {
      components: { SConfigProvider, SPalettePicker },
      data: () => ({ modelValue }),
      template: '<SConfigProvider><SPalettePicker v-model="modelValue" /></SConfigProvider>'
    },
    { attachTo: document.body }
  );

const openListbox = async (wrapper: ReturnType<typeof mount>) => {
  await wrapper.get('button').trigger('pointerdown', mousePointerDown);
  await nextTick();
};

const selectOption = async (label: string) => {
  const option = Array.from(document.body.querySelectorAll('[role="option"]')).find(node =>
    node.textContent?.includes(label)
  );

  expect(option, `option "${label}" should be rendered`).toBeTruthy();

  await new DOMWrapper(option as Element).trigger('keydown', { key: 'Enter' });
  await flushPromises();
  await nextTick();
  await nextTick();
};

describe('SPalettePicker', () => {
  it('renders a select trigger', () => {
    const wrapper = mountPicker('indigo.500');
    expect(wrapper.get('button')).toBeTruthy();
    wrapper.unmount();
  });

  it('renders Custom and palette key options when opened', async () => {
    const wrapper = mountPicker('indigo.500');
    await openListbox(wrapper);

    const labels = Array.from(document.body.querySelectorAll('[role="option"]')).map(node => node.textContent ?? '');

    expect(labels.some(text => text.includes('Custom'))).toBe(true);
    expect(labels.some(text => text.includes('Indigo'))).toBe(true);
    expect(labels.some(text => text.includes('Black'))).toBe(true);

    wrapper.unmount();
  });

  it('selecting a simple key updates the model value', async () => {
    const wrapper = mountPicker('indigo.500');
    await openListbox(wrapper);
    await selectOption('Black');

    expect(wrapper.vm.modelValue).toBe('black');
    wrapper.unmount();
  });

  it('clicking a custom palette swatch re-bases it as the new main color (500)', async () => {
    const wrapper = mountPicker('hsl(238.732 83.529% 66.667%)');
    await nextTick();

    const levelButtons = wrapper.findAll('button[aria-label^="level"]');
    expect(levelButtons.length).toBe(PALETTE_LEVELS.length);

    // default active level is 500
    expect(levelButtons[5].classes()).toContain('ring-primary');

    await levelButtons[7].trigger('click'); // level 700
    await nextTick();

    // the clicked color becomes the new main color, so the highlight moves to 500
    expect(levelButtons[5].classes()).toContain('ring-primary');
    expect(levelButtons[7].classes()).not.toContain('ring-primary');

    // recommended is off, so the raw color is still committed
    expect(wrapper.vm.modelValue).toMatch(/^hsl\(/);
    wrapper.unmount();
  });

  it('with the recommended palette, picking a custom level commits key.level', async () => {
    const wrapper = mountPicker('hsl(238.732 83.529% 66.667%)');
    await nextTick();

    const recommendedSwitch = wrapper.find('[role="switch"]');
    await recommendedSwitch.trigger('click');
    await flushPromises();
    await nextTick();

    const level700 = wrapper.find('button[aria-label="level 700"]');
    await level700.trigger('click');
    await flushPromises();
    await nextTick();

    expect(wrapper.vm.modelValue).toMatch(/\.700$/);
    wrapper.unmount();
  });

  it('with the recommended palette, picking a swatch syncs the color picker to that level color', async () => {
    const wrapper = mountPicker('hsl(238.732 83.529% 66.667%)');
    await nextTick();

    const recommendedSwitch = wrapper.find('[role="switch"]');
    await recommendedSwitch.trigger('click');
    await flushPromises();
    await nextTick();

    // capture the initial color-picker value (the base color)
    const picker = wrapper.findComponent(SColorPicker);
    const before = picker.props('modelValue');

    await wrapper.find('button[aria-label="level 700"]').trigger('click');
    await flushPromises();
    await nextTick();

    // the color picker now reflects the level-700 swatch color
    const after = wrapper.findComponent(SColorPicker).props('modelValue');
    expect(after).not.toBe(before);

    // the picker color equals the level-700 swatch color (stored as oklch)
    expect(colord(after).toHex()).toBe(colord(tailwindPalette.indigo['700'].oklch).toHex());
    wrapper.unmount();
  });

  it('selecting a built-in color resets the tailwind level to 500', async () => {
    const wrapper = mountPicker('indigo.700');
    await nextTick();

    // switch to another tailwind key
    await openListbox(wrapper);
    await selectOption('Teal');
    await nextTick();

    expect(wrapper.vm.modelValue).toBe('teal.500');
    wrapper.unmount();
  });

  it('clicking a custom palette swatch syncs the color picker and re-bases to 500', async () => {
    const wrapper = mountPicker('hsl(238.732 83.529% 66.667%)');
    await nextTick();

    const level700 = wrapper.find('button[aria-label="level 700"]');
    await level700.trigger('click');
    await flushPromises();
    await nextTick();

    // the committed value is the swatch color at level 700 (still a raw hsl)
    expect(wrapper.vm.modelValue).toMatch(/^hsl\(/);
    // the clicked color becomes the new main color, so 500 is highlighted
    expect(wrapper.find('button[aria-label="level 500"]').classes()).toContain('ring-primary');
    wrapper.unmount();
  });

  it('switching to custom carries over the previously selected color as the initial custom color', async () => {
    const wrapper = mountPicker('indigo.700');
    await nextTick();

    await openListbox(wrapper);
    await selectOption('Custom');
    await nextTick();

    // the custom color initializes from the previously selected indigo.700 color
    expect(wrapper.vm.modelValue).toBe(serializeColor(tailwindPalette.indigo['700'].hsl, 'hsl'));
    wrapper.unmount();
  });

  it('turning the recommended palette off re-generates and resets the highlight to 500', async () => {
    const wrapper = mountPicker('hsl(238.732 83.529% 66.667%)');
    await nextTick();

    const recommendedSwitch = wrapper.find('[role="switch"]');
    await recommendedSwitch.trigger('click'); // on
    await flushPromises();
    await nextTick();

    const level700 = wrapper.find('button[aria-label="level 700"]');
    await level700.trigger('click'); // highlight 700 in recommended mode
    await flushPromises();
    await nextTick();
    expect(level700.classes()).toContain('ring-primary');

    await recommendedSwitch.trigger('click'); // off
    await flushPromises();
    await nextTick();

    // the palette re-generates from the current color; highlight resets to the main color 500
    expect(wrapper.find('button[aria-label="level 500"]').classes()).toContain('ring-primary');
    expect(level700.classes()).not.toContain('ring-primary');
    wrapper.unmount();
  });
});
