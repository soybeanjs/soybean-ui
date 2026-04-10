import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import SAutocomplete from '../../../src/components/autocomplete/autocomplete.vue';
import { getA11yViolations } from '../../shared/a11y';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' }
];

Object.defineProperty(window.HTMLElement.prototype, 'releasePointerCapture', {
  configurable: true,
  value: vi.fn()
});
Object.defineProperty(window.HTMLElement.prototype, 'hasPointerCapture', {
  configurable: true,
  value: vi.fn(() => false)
});
Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
  configurable: true,
  value: vi.fn()
});
Object.defineProperty(globalThis, 'ResizeObserver', {
  configurable: true,
  value: class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
});

describe('SAutocomplete', () => {
  describe('rendering', () => {
    it('renders an input element', () => {
      const wrapper = mount(SAutocomplete, {
        props: { items },
        attachTo: document.body
      });
      expect(wrapper.find('input').exists()).toBe(true);
      wrapper.unmount();
    });

    it('applies custom class to the root element', () => {
      const wrapper = mount(SAutocomplete, {
        props: { items, class: 'my-autocomplete' },
        attachTo: document.body
      });
      expect(wrapper.html()).toContain('my-autocomplete');
      wrapper.unmount();
    });
  });

  describe('model value', () => {
    it('reflects modelValue in the input', () => {
      const wrapper = mount(SAutocomplete, {
        props: { items, modelValue: 'banana' },
        attachTo: document.body
      });
      expect(wrapper.find('input').element.value).toBe('banana');
      wrapper.unmount();
    });

    it('emits update:modelValue when typing', async () => {
      const wrapper = mount(SAutocomplete, {
        props: { items },
        attachTo: document.body
      });
      await wrapper.find('input').setValue('blue');
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['blue']);
      wrapper.unmount();
    });

    it('opens the popup when typing', async () => {
      const wrapper = mount(SAutocomplete, {
        props: { items },
        attachTo: document.body
      });

      await wrapper.find('input').setValue('app');
      await nextTick();

      expect(wrapper.emitted('update:open')?.at(-1)).toEqual([true]);
      expect(document.body.querySelector('[role="listbox"]')).toBeTruthy();
      wrapper.unmount();
    });

    it('emits select with the selected item', async () => {
      const wrapper = mount(SAutocomplete, {
        props: { items, open: true },
        attachTo: document.body
      });
      await nextTick();
      const option = Array.from(document.body.querySelectorAll('[role="option"]')).find(node => node.textContent?.includes('Banana'));
      expect(option).toBeTruthy();
      option?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await Promise.resolve();
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['banana']);
      expect(wrapper.emitted('select')?.[0]).toEqual([{ value: 'banana', label: 'Banana' }]);
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('disables input and trigger interactions', () => {
      const wrapper = mount(SAutocomplete, {
        props: { items, disabled: true },
        attachTo: document.body
      });
      expect(wrapper.find('input').element.disabled).toBe(true);
      expect(wrapper.find('button').element.disabled).toBe(true);
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when paired with a label', async () => {
      const wrapper = mount(
        {
          components: { SAutocomplete },
          data() {
            return { items };
          },
          template: `
            <div>
              <label for="autocomplete-input">Fruit</label>
              <SAutocomplete :items="items" :input-props="{ id: 'autocomplete-input', controlProps: { 'aria-label': 'Fruit' } }" />
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
