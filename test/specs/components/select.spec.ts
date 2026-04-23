import { DOMWrapper, flushPromises, mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SSelect from '../../../src/components/select/select.vue';
import { MockResizeObserver, setupMock } from '../../shared';
import { getA11yViolations } from '../../shared/a11y';

const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' }
];

const groupedItems = [
  {
    label: 'Fruits',
    items: [{ label: 'Apple', value: 'apple' }]
  },
  {
    label: 'Vegetables',
    items: [{ label: 'Carrot', value: 'carrot' }]
  }
];

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
});

describe('SSelect', () => {
  describe('rendering', () => {
    it('renders placeholder text', () => {
      const wrapper = mount(SSelect, {
        props: {
          items,
          placeholder: 'Select a fruit'
        },
        attachTo: document.body
      });

      expect(wrapper.get('button').text()).toContain('Select a fruit');
      wrapper.unmount();
    });

    it('renders grouped options when opened', async () => {
      const wrapper = mount(SSelect, {
        props: {
          items: groupedItems
        },
        attachTo: document.body
      });

      await wrapper.get('button').trigger('pointerdown', {
        button: 0,
        ctrlKey: false,
        pageX: 0,
        pageY: 0,
        pointerId: 1,
        pointerType: 'mouse'
      });
      await nextTick();

      expect(document.body.textContent).toContain('Fruits');
      expect(document.body.textContent).toContain('Vegetables');
      expect(document.body.textContent).toContain('Carrot');
      wrapper.unmount();
    });
  });

  describe('state', () => {
    it('emits update:modelValue and select on option click', async () => {
      const wrapper = mount(SSelect, {
        props: {
          items
        },
        attachTo: document.body
      });

      await wrapper.get('button').trigger('pointerdown', {
        button: 0,
        ctrlKey: false,
        pageX: 0,
        pageY: 0,
        pointerId: 1,
        pointerType: 'mouse'
      });
      await nextTick();

      const option = Array.from(document.body.querySelectorAll('[role="option"]')).find(node =>
        node.textContent?.includes('Banana')
      );

      expect(option).toBeTruthy();

      await new DOMWrapper(option as Element).trigger('keydown', { key: 'Enter' });
      await flushPromises();
      await nextTick();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['banana']);
      expect(wrapper.emitted('select')).toBeTruthy();
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('prevents opening when disabled', async () => {
      const wrapper = mount(SSelect, {
        props: {
          items,
          disabled: true
        },
        attachTo: document.body
      });

      const trigger = wrapper.get('button');

      expect(trigger.attributes('disabled')).toBeDefined();

      await trigger.trigger('pointerdown', {
        button: 0,
        ctrlKey: false,
        pageX: 0,
        pageY: 0,
        pointerId: 1,
        pointerType: 'mouse'
      });
      await nextTick();

      expect(document.body.querySelector('[role="listbox"]')).toBeNull();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when paired with a label', async () => {
      const wrapper = mount(
        {
          components: { SSelect },
          data() {
            return { items };
          },
          template: `
            <div>
              <label for="select-trigger">Fruit</label>
              <SSelect :items="items" :trigger-props="{ id: 'select-trigger', 'aria-label': 'Fruit' }" />
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
