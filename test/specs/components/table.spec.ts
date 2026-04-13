import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import STable from '../../../src/components/table/table.vue';
import type { TableColumn } from '../../../src/components/table/types';
import { MockResizeObserver, createMockResizeObserverEntry, delay, setupMock } from '../../shared';
import { getA11yViolations } from '../../shared/a11y';

interface TableRowData {
  id: number;
  name: string;
  age: number;
}

const columns: TableColumn<TableRowData>[] = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age', align: 'center' as const }
];

const groupedColumns: TableColumn<TableRowData>[] = [
  {
    title: 'Profile',
    key: 'profile',
    children: [
      { title: 'Name', dataIndex: 'name' },
      { title: 'Age', dataIndex: 'age', align: 'center' }
    ]
  }
];

const sortableColumns: TableColumn<TableRowData>[] = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age', align: 'center', sorter: true }
];

const filterableColumns: TableColumn<TableRowData>[] = [
  { title: 'Name', dataIndex: 'name', filter: true },
  { title: 'Age', dataIndex: 'age', align: 'center' }
];

const fixedColumns: TableColumn<TableRowData>[] = [
  { title: 'Name', dataIndex: 'name', width: '140px', fixed: 'left' },
  { title: 'Age', dataIndex: 'age', width: '96px', align: 'center', fixed: 'right' }
];

const resizableColumns: TableColumn<TableRowData>[] = [
  { title: 'Name', dataIndex: 'name', width: '140px', minWidth: '100px', resizable: true },
  { title: 'Age', dataIndex: 'age', align: 'center', width: '96px' }
];

const selectionColumns = [
  { type: 'selection' as const, width: '48px' },
  ...columns
];

const expandableColumns = [
  { type: 'expand' as const, width: '48px' },
  ...columns
];

const data: TableRowData[] = [
  { id: 1, name: 'Ada', age: 32 },
  { id: 2, name: 'Linus', age: 28 }
];

const virtualizedData: TableRowData[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  age: 20 + (index % 10)
}));

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

describe('STable', () => {
  describe('rendering', () => {
    it('renders column headers and cell values', () => {
      const wrapper = mount(STable, {
        props: {
          columns: columns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Name');
      expect(wrapper.text()).toContain('Age');
      expect(wrapper.text()).toContain('Ada');
      expect(wrapper.text()).toContain('Linus');
      wrapper.unmount();
    });

    it('renders grouped headers within a single semantic table', () => {
      const wrapper = mount(STable, {
        props: {
          columns: groupedColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      expect(wrapper.findAll('table')).toHaveLength(1);
      expect(wrapper.findAll('thead tr')).toHaveLength(2);
      expect(wrapper.get('th[colspan="2"]').text()).toContain('Profile');
      wrapper.unmount();
    });

    it('forwards custom cell slots to the headless data table', () => {
      const wrapper = mount(STable, {
        props: {
          columns: columns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        slots: {
          age: props => {
            const { value } = props as { value: number };

            return h('span', { 'data-testid': 'age-cell' }, `Age: ${value}`);
          }
        },
        attachTo: document.body
      });

      expect(wrapper.findAll('[data-testid="age-cell"]')).toHaveLength(2);
      expect(wrapper.text()).toContain('Age: 32');
      wrapper.unmount();
    });
  });

  describe('selection state', () => {
    it('emits update:selected when a row checkbox is clicked', async () => {
      const wrapper = mount(STable, {
        props: {
          columns: selectionColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      await wrapper.get('[aria-label="Select row Ada"]').trigger('click');

      expect(wrapper.emitted('update:selected')).toBeTruthy();
      expect(wrapper.emitted('update:selected')?.[0]?.[0]).toEqual([1]);
      wrapper.unmount();
    });

    it('uses pressed button semantics for single-selection controls', () => {
      const wrapper = mount(STable, {
        props: {
          columns: selectionColumns as TableColumn[],
          data,
          rowKey: row => row.id,
          multiple: false,
          selected: 1
        },
        attachTo: document.body
      });

      const control = wrapper.get('button[aria-label="Select row Ada"]');

      expect(control.attributes('aria-pressed')).toBe('true');
      expect(control.attributes('role')).toBeUndefined();
      wrapper.unmount();
    });
  });

  describe('sorting and filtering', () => {
    it('sorts rows when a sortable header is activated', async () => {
      const wrapper = mount(STable, {
        props: {
          columns: sortableColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      await wrapper.get('button[aria-label="Sort by Age"]').trigger('click');

      expect(wrapper.emitted('update:sortState')?.[0]?.[0]).toEqual({ key: 'age', order: 'asc' });
      expect(wrapper.findAll('tbody tr')[0].text()).toContain('Linus');
      wrapper.unmount();
    });

    it('filters rows when a filterable header input changes', async () => {
      const wrapper = mount(STable, {
        props: {
          columns: filterableColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      await wrapper.get('input[aria-label="Filter Name"]').setValue('Lin');

      expect(wrapper.emitted('update:filterState')?.[0]?.[0]).toEqual({ name: 'Lin' });
      expect(wrapper.findAll('tbody tr')).toHaveLength(1);
      expect(wrapper.text()).toContain('Linus');
      expect(wrapper.text()).not.toContain('Ada');
      wrapper.unmount();
    });
  });

  describe('fixed and resizable columns', () => {
    it('applies sticky offsets to fixed columns', () => {
      const wrapper = mount(STable, {
        props: {
          columns: fixedColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      const leftHead = wrapper.get('th[data-fixed-side="left"]');
      const rightHead = wrapper.get('th[data-fixed-side="right"]');

      expect(leftHead.attributes('style')).toContain('position: sticky;');
      expect(leftHead.attributes('style')).toContain('left: 0px;');
      expect(rightHead.attributes('style')).toContain('right: 0px;');
      expect(wrapper.get('td[data-fixed-side="left"]').attributes('style')).toContain('left: 0px;');
      wrapper.unmount();
    });

    it('updates column widths when a resize handle is dragged', async () => {
      const wrapper = mount(STable, {
        props: {
          columns: resizableColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      const head = wrapper.get('th');
      const handle = wrapper.get('button[aria-label="Resize Name column"]');

      mockRect(head.element, { x: 0, y: 0, width: 140, height: 40 });

      dispatchPointerEvent(handle.element, 'pointerdown', { clientX: 140, clientY: 20, pointerId: 1 });
      dispatchPointerEvent(document, 'pointermove', { clientX: 180, clientY: 20, pointerId: 1 });
      dispatchPointerEvent(document, 'pointerup', { clientX: 180, clientY: 20, pointerId: 1 });

      await nextTick();

      expect(wrapper.emitted('update:columnWidths')?.at(-1)?.[0]).toEqual({ name: '180px' });
      expect(head.attributes('style')).toContain('width: 180px;');
      wrapper.unmount();
    });
  });

  describe('virtualized rows', () => {
    it('renders a virtualized subset and updates on scroll', async () => {
      class TestResizeObserver extends MockResizeObserver {
        static instance: MockResizeObserver | null = null;

        constructor(callback: ResizeObserverCallback) {
          super(callback);
          TestResizeObserver.instance = this;
        }
      }

      const cleanup = setupMock(
        'ResizeObserver',
        TestResizeObserver as unknown as typeof ResizeObserver
      );
      const wrapper = mount(STable, {
        props: {
          virtual: true,
          height: 120,
          estimateSize: 30,
          columns: columns as TableColumn[],
          data: virtualizedData,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      const root = wrapper.element as HTMLElement;
      let scrollTop = 0;

      Object.defineProperties(root, {
        clientHeight: { configurable: true, value: 120 },
        scrollHeight: { configurable: true, value: 3000 },
        scrollTop: {
          configurable: true,
          get: () => scrollTop,
          set: value => {
            scrollTop = value;
          }
        },
        getBoundingClientRect: {
          configurable: true,
          value: () => ({
            x: 0,
            y: 0,
            top: 0,
            left: 0,
            right: 400,
            bottom: 120,
            width: 400,
            height: 120,
            toJSON: () => ({})
          })
        }
      });

      TestResizeObserver.instance?.trigger([createMockResizeObserverEntry(root, { width: 400, height: 120 })]);

      await delay(30);
      await nextTick();

      expect(wrapper.text()).toContain('User 1');
      expect(wrapper.text()).not.toContain('User 100');
      expect(wrapper.findAll('tbody tr').length).toBeLessThan(virtualizedData.length);
      expect(wrapper.find('tbody tr[aria-hidden="true"] td').attributes('style')).toContain('height: 2610px;');

      root.scrollTop = 900;
      root.dispatchEvent(new Event('scroll'));

      await delay(30);
      await nextTick();

      expect(wrapper.text()).toContain('User 30');
      expect(wrapper.find('tbody tr[aria-hidden="true"] td').attributes('style')).toContain('height: 660px;');

      wrapper.unmount();
      cleanup();
    });
  });

  describe('expanded state', () => {
    it('emits update:expanded and renders expanded row content', async () => {
      const wrapper = mount(STable, {
        props: {
          columns: expandableColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        slots: {
          'expanded-row': props => {
            const { row } = props as { row: Record<string, any> };

            return h('div', { 'data-testid': `expanded-${row.id}` }, `Expanded ${row.name}`);
          }
        },
        attachTo: document.body
      });

      await wrapper.find('[aria-label="Expand row"]').trigger('click');

      expect(wrapper.emitted('update:expanded')).toBeTruthy();
      expect(wrapper.emitted('update:expanded')?.[0]?.[0]).toEqual([1]);
      expect(wrapper.find('[data-testid="expanded-1"]').text()).toContain('Expanded Ada');
      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations', async () => {
      const wrapper = mount(STable, {
        props: {
          columns: selectionColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);
      wrapper.unmount();
    });
  });
});
