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
  });
});
