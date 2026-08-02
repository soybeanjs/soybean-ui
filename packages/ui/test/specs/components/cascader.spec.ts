import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { DOMWrapper, flushPromises, mount } from '@vue/test-utils';
import SCascader from '@/components/cascader/cascader.vue';
import { MockResizeObserver, setupMock } from '../../shared';
import { getA11yViolations } from '../../shared/a11y';

const options = [
  {
    label: '浙江',
    value: 'zhejiang',
    children: [
      {
        label: '杭州',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '滨江区', value: 'binjiang' }
        ]
      },
      { label: '宁波', value: 'ningbo', children: [{ label: '海曙区', value: 'haishu' }] }
    ]
  },
  {
    label: '江苏',
    value: 'jiangsu',
    children: [
      {
        label: '南京',
        value: 'nanjing',
        children: [
          { label: '鼓楼区', value: 'gulou' },
          { label: '玄武区', value: 'xuanwu' }
        ]
      }
    ]
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

const findTreeItem = (text: string) =>
  Array.from(document.body.querySelectorAll('[role="treeitem"]')).find(node => node.textContent?.includes(text));

describe('SCascader', () => {
  describe('rendering', () => {
    it('renders placeholder text', () => {
      const wrapper = mount(SCascader, {
        props: {
          options,
          placeholder: '请选择区域'
        },
        attachTo: document.body
      });

      expect(wrapper.get('[role="combobox"]').text()).toContain('请选择区域');
      wrapper.unmount();
    });
  });

  describe('state', () => {
    it('opens the panel and shows the root column on click', async () => {
      const wrapper = mount(SCascader, {
        props: { options },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      expect(document.body.querySelector('[role="tree"]')).toBeTruthy();
      expect(document.body.textContent).toContain('浙江');
      expect(document.body.textContent).toContain('江苏');
      wrapper.unmount();
    });

    it('expands the linked column and emits update:modelValue when selecting a leaf', async () => {
      const wrapper = mount(SCascader, {
        props: { options },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      const province = findTreeItem('浙江');
      expect(province).toBeTruthy();

      await new DOMWrapper(province as Element).trigger('click');
      await nextTick();

      // The children column of 浙江 appears next to the root column.
      expect(document.body.textContent).toContain('杭州');
      expect(document.body.textContent).toContain('宁波');

      const city = findTreeItem('宁波');
      await new DOMWrapper(city as Element).trigger('click');
      await nextTick();

      const district = findTreeItem('海曙区');
      expect(district).toBeTruthy();

      await new DOMWrapper(district as Element).trigger('click');
      await flushPromises();
      await nextTick();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['haishu']);
      wrapper.unmount();
    });

    it('emits a path value in path mode', async () => {
      const wrapper = mount(SCascader, {
        props: {
          options,
          pathMode: true
        },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      const province = findTreeItem('江苏');
      await new DOMWrapper(province as Element).trigger('click');
      await nextTick();

      const city = findTreeItem('南京');
      await new DOMWrapper(city as Element).trigger('click');
      await nextTick();

      const district = findTreeItem('鼓楼区');
      await new DOMWrapper(district as Element).trigger('click');
      await flushPromises();
      await nextTick();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['jiangsu', 'nanjing', 'gulou']]);
      wrapper.unmount();
    });

    it('treats a bare `path-mode` attribute as enabled (generic boolean casting)', async () => {
      const wrapper = mount(SCascader, {
        props: {
          options,
          pathMode: '' as unknown as boolean
        },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      const province = findTreeItem('浙江');
      await new DOMWrapper(province as Element).trigger('click');
      await nextTick();

      const city = findTreeItem('杭州');
      await new DOMWrapper(city as Element).trigger('click');
      await nextTick();

      const district = findTreeItem('西湖区');
      await new DOMWrapper(district as Element).trigger('click');
      await flushPromises();
      await nextTick();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['zhejiang', 'hangzhou', 'xihu']]);
      wrapper.unmount();
    });

    it('closes the panel after selecting a leaf in single mode', async () => {
      const wrapper = mount(SCascader, {
        props: { options },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      const province = findTreeItem('浙江');
      await new DOMWrapper(province as Element).trigger('click');
      await nextTick();

      const city = findTreeItem('宁波');
      await new DOMWrapper(city as Element).trigger('click');
      await nextTick();

      const district = findTreeItem('海曙区');
      await new DOMWrapper(district as Element).trigger('click');
      await flushPromises();
      await nextTick();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['haishu']);
      // Single selection of a leaf closes the panel.
      expect(document.body.querySelector('[role="tree"]')).toBeNull();
      wrapper.unmount();
    });

    it('selects a node with ArrowDown + Enter in checkStrictly mode', async () => {
      const wrapper = mount(SCascader, {
        props: {
          options,
          checkStrictly: true
        },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      const trigger = wrapper.get('[role="combobox"]');
      await trigger.trigger('keydown', { key: 'ArrowDown' });
      await trigger.trigger('keydown', { key: 'Enter' });
      await flushPromises();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['zhejiang']);
      wrapper.unmount();
    });
  });

  describe('multiple', () => {
    it('toggles sibling nodes independently and emits an array', async () => {
      const wrapper = mount(SCascader, {
        props: {
          options,
          multiple: true,
          checkStrictly: true
        },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      const zhejiang = findTreeItem('浙江');
      await new DOMWrapper(zhejiang as Element).trigger('click');
      await nextTick();
      await nextTick();

      const jiangsu = findTreeItem('江苏');
      await new DOMWrapper(jiangsu as Element).trigger('click');
      await flushPromises();
      await nextTick();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['zhejiang', 'jiangsu']]);
      wrapper.unmount();
    });

    it('treats a bare `multiple` attribute as enabled (generic boolean casting)', async () => {
      // Vue cannot infer a runtime Boolean type for generic `M`, so a bare attribute
      // reaches the component as `''`; it must be treated as `true`.
      const wrapper = mount(SCascader, {
        props: {
          options,
          multiple: '' as unknown as boolean,
          checkStrictly: true
        },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      const zhejiang = findTreeItem('浙江');
      await new DOMWrapper(zhejiang as Element).trigger('click');
      await flushPromises();
      await nextTick();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['zhejiang']]);
      wrapper.unmount();
    });

    it('renders a tag remove button with a localized accessible label', async () => {
      const wrapper = mount(SCascader, {
        props: {
          options,
          multiple: true,
          checkStrictly: true
        },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      const zhejiang = findTreeItem('浙江');
      await new DOMWrapper(zhejiang as Element).trigger('click');
      await flushPromises();
      await nextTick();
      await nextTick();

      const removeButton = document.body.querySelector('[data-soybean-cascader-tag] button');
      expect(removeButton).toBeTruthy();
      // Default locale is `en`: the template substitutes `{label}` with the node label.
      expect(removeButton?.getAttribute('aria-label')).toBe('Remove 浙江');
      wrapper.unmount();
    });

    it('removes a single tag and updates the model value', async () => {
      const wrapper = mount(SCascader, {
        props: {
          options,
          multiple: true,
          checkStrictly: true
        },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      const zhejiang = findTreeItem('浙江');
      await new DOMWrapper(zhejiang as Element).trigger('click');
      await nextTick();

      const jiangsu = findTreeItem('江苏');
      await new DOMWrapper(jiangsu as Element).trigger('click');
      await flushPromises();
      await nextTick();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['zhejiang', 'jiangsu']]);

      // Remove the 浙江 tag: the 江苏 selection remains.
      const zhejiangRemove = Array.from(document.body.querySelectorAll('[data-soybean-cascader-tag] button')).find(
        button => button.getAttribute('aria-label') === 'Remove 浙江'
      );
      await new DOMWrapper(zhejiangRemove as Element).trigger('click');
      await flushPromises();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([['jiangsu']]);
      wrapper.unmount();
    });

    it('clears all tags via the clear button and emits clear', async () => {
      const wrapper = mount(SCascader, {
        props: {
          options,
          multiple: true,
          checkStrictly: true
        },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      const zhejiang = findTreeItem('浙江');
      await new DOMWrapper(zhejiang as Element).trigger('click');
      await flushPromises();
      await nextTick();
      await nextTick();

      expect(document.body.querySelector('[data-soybean-cascader-tag]')).toBeTruthy();

      const clearButton = document.body.querySelector('[data-soybean-cascader-clear]');
      expect(clearButton).toBeTruthy();
      await new DOMWrapper(clearButton as Element).trigger('click');
      await flushPromises();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([[]]);
      expect(wrapper.emitted('clear')).toHaveLength(1);
      expect(document.body.querySelector('[data-soybean-cascader-tag]')).toBeNull();
      wrapper.unmount();
    });
  });

  describe('filterable', () => {
    it('filters the flat results while typing', async () => {
      const wrapper = mount(SCascader, {
        props: {
          options,
          filterable: true
        },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      const input = document.body.querySelector<HTMLInputElement>('input');
      expect(input).toBeTruthy();

      await new DOMWrapper(input as Element).setValue('西湖');
      await flushPromises();
      await nextTick();

      expect(document.body.querySelector('[role="treeitem"]')?.textContent).toContain('西湖区');
      expect(document.body.textContent).not.toContain('宁波');
      wrapper.unmount();
    });

    it('labels the search input with an accessible name', async () => {
      const wrapper = mount(SCascader, {
        props: {
          options,
          filterable: true
        },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      const input = document.body.querySelector<HTMLInputElement>('[data-soybean-cascader-search-input]');
      expect(input).toBeTruthy();
      // Default locale is `en`.
      expect(input?.getAttribute('aria-label')).toBe('Search');
      wrapper.unmount();
    });

    it('shows the localized empty text when no result matches', async () => {
      const wrapper = mount(SCascader, {
        props: {
          options,
          filterable: true
        },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      const input = document.body.querySelector<HTMLInputElement>('input');
      await new DOMWrapper(input as Element).setValue('不存在的节点');
      await flushPromises();
      await nextTick();

      // Default locale is `en`.
      expect(document.body.querySelector('[data-soybean-cascader-empty]')?.textContent).toContain('No data');
      wrapper.unmount();
    });

    it('shows a custom empty label when emptyLabel is provided', async () => {
      const wrapper = mount(SCascader, {
        props: {
          options,
          filterable: true,
          emptyLabel: '没有匹配项'
        },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      const input = document.body.querySelector<HTMLInputElement>('input');
      await new DOMWrapper(input as Element).setValue('不存在的节点');
      await flushPromises();
      await nextTick();

      expect(document.body.querySelector('[data-soybean-cascader-empty]')?.textContent).toContain('没有匹配项');
      wrapper.unmount();
    });
  });

  describe('clearable', () => {
    it('clears the single selection via the clear button and emits clear', async () => {
      const wrapper = mount(SCascader, {
        props: {
          options,
          checkStrictly: true
        },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      const zhejiang = findTreeItem('浙江');
      await new DOMWrapper(zhejiang as Element).trigger('click');
      await flushPromises();
      await nextTick();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual(['zhejiang']);

      const clearButton = document.body.querySelector<HTMLButtonElement>('[data-soybean-cascader-clear]');
      expect(clearButton).toBeTruthy();
      // Default locale is `en`.
      expect(clearButton?.getAttribute('aria-label')).toBe('Clear value');

      await new DOMWrapper(clearButton as Element).trigger('click');
      await flushPromises();
      await nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([undefined]);
      expect(wrapper.emitted('clear')).toHaveLength(1);
      wrapper.unmount();
    });

    it('uses the clearLabel prop for the clear button aria-label', async () => {
      const wrapper = mount(SCascader, {
        props: {
          options,
          checkStrictly: true,
          clearLabel: '清空选择'
        },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();

      const zhejiang = findTreeItem('浙江');
      await new DOMWrapper(zhejiang as Element).trigger('click');
      await flushPromises();
      await nextTick();
      await nextTick();

      const clearButton = document.body.querySelector<HTMLButtonElement>('[data-soybean-cascader-clear]');
      expect(clearButton?.getAttribute('aria-label')).toBe('清空选择');
      wrapper.unmount();
    });
  });

  describe('disabled state', () => {
    it('prevents opening when disabled', async () => {
      const wrapper = mount(SCascader, {
        props: {
          options,
          disabled: true
        },
        attachTo: document.body
      });

      const trigger = wrapper.get('[role="combobox"]');

      await trigger.trigger('click');
      await nextTick();

      expect(document.body.querySelector('[role="tree"]')).toBeNull();
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations when paired with a label', async () => {
      const wrapper = mount(
        {
          components: { SCascader },
          data() {
            return { options };
          },
          template: `
            <div>
              <label for="cascader-trigger">区域</label>
              <SCascader :options="options" :trigger-props="{ id: 'cascader-trigger', 'aria-label': '区域' }" />
            </div>
          `
        },
        { attachTo: document.body }
      );

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });

    it('has no a11y violations when open (filterable mode)', async () => {
      const wrapper = mount(SCascader, {
        props: {
          options,
          filterable: true,
          triggerProps: { 'aria-label': '区域' }
        },
        attachTo: document.body
      });

      await wrapper.get('[role="combobox"]').trigger('click');
      await nextTick();
      await nextTick();

      const violations = await getA11yViolations(document.body, {
        rules: {
          region: { enabled: false }
        }
      });

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
