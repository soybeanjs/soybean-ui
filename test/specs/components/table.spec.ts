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
  children?: TableRowData[];
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
  { title: 'Name', dataIndex: 'name', width: '140px', fixed: 'start' },
  { title: 'Age', dataIndex: 'age', width: '96px', align: 'center', fixed: 'end' }
];

const resizableColumns: TableColumn<TableRowData>[] = [
  { title: 'Name', dataIndex: 'name', width: '140px', minWidth: '100px', resizable: true },
  { title: 'Age', dataIndex: 'age', align: 'center', width: '96px' }
];

const selectionColumns = [{ type: 'selection' as const, width: '48px' }, ...columns];

const expandableColumns = [{ type: 'expand' as const, width: '48px' }, ...columns];

const data: TableRowData[] = [
  { id: 1, name: 'Ada', age: 32 },
  { id: 2, name: 'Linus', age: 28 }
];

const virtualizedData: TableRowData[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  age: 20 + (index % 10)
}));

const treeData: TableRowData[] = [
  {
    id: 1,
    name: 'Ada',
    age: 32,
    children: [
      { id: 11, name: 'Ada Child', age: 8 },
      { id: 12, name: 'Ada Child 2', age: 6 }
    ]
  },
  { id: 2, name: 'Linus', age: 28 }
];

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

async function openTableFilter(wrapper: ReturnType<typeof mount>, columnLabel: string) {
  await wrapper.get(`button[aria-label="Filter ${columnLabel}"]`).trigger('click');
  await nextTick();
}

async function setTeleportedInputValue(label: string, value: string) {
  const input = document.body.querySelector(`input[aria-label="${label}"]`) as HTMLInputElement | null;

  expect(input).toBeTruthy();

  if (!input) {
    return;
  }

  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));

  await nextTick();
  await nextTick();
}

async function clickTeleportedControl(label: string) {
  const labeledControl = document.body.querySelector(`[aria-label="${label}"]`) as HTMLElement | null;
  const textControl = Array.from(document.body.querySelectorAll('button')).find(
    button => button.textContent?.trim() === label
  );
  const control = labeledControl ?? textControl ?? null;

  expect(control).toBeTruthy();

  control?.click();
  await nextTick();
  await nextTick();
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

    it('renders the default empty state when there are no rows', () => {
      const wrapper = mount(STable, {
        props: {
          columns: columns as TableColumn[],
          data: [],
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('No data');
      expect(wrapper.text()).toContain('There is no data to display.');
      expect(wrapper.get('tbody td[colspan="2"]').text()).toContain('No data');
      expect(wrapper.findAll('tbody tr')).toHaveLength(1);

      wrapper.unmount();
    });

    it('allows overriding the empty state with the empty slot', () => {
      const wrapper = mount(STable, {
        props: {
          columns: columns as TableColumn[],
          data: [],
          rowKey: row => row.id
        },
        slots: {
          empty: ({ columnSize }: any) => {
            return h('div', { 'data-testid': 'table-empty', 'data-column-size': columnSize }, 'Custom empty');
          }
        },
        attachTo: document.body
      });

      expect(wrapper.get('[data-testid="table-empty"]').attributes('data-column-size')).toBe('2');
      expect(wrapper.text()).toContain('Custom empty');
      expect(wrapper.text()).not.toContain('No data');

      wrapper.unmount();
    });

    it('uses dir on the root element and css text-align for logical alignment', () => {
      const alignedColumns: TableColumn<TableRowData>[] = [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Age', dataIndex: 'age', align: 'end' },
        { title: 'Index', type: 'index', width: '48px' }
      ];

      const wrapper = mount(STable, {
        props: {
          dir: 'rtl',
          columns: alignedColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      const heads = wrapper.findAll('th');
      const cells = wrapper.findAll('td');

      expect(wrapper.get('div[dir="rtl"]')).toBeTruthy();
      expect(heads[0].attributes('style')).toContain('text-align: start;');
      expect(heads[1].attributes('style')).toContain('text-align: end;');
      expect(heads[2].attributes('style')).toContain('text-align: center;');
      expect(heads[0].attributes('align')).toBeUndefined();
      expect(cells[0].attributes('style')).toContain('text-align: start;');
      expect(cells[1].attributes('style')).toContain('text-align: end;');
      expect(cells[2].attributes('style')).toContain('text-align: center;');

      wrapper.unmount();
    });
  });

  describe('selection state', () => {
    it('uses the UI header-selection slot to toggle all visible rows', async () => {
      const wrapper = mount(STable, {
        props: {
          columns: selectionColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      await wrapper.get('[aria-label="Select all rows"]').trigger('click');

      expect(wrapper.emitted('update:selected')?.[0]?.[0]).toEqual([1, 2]);
      wrapper.unmount();
    });

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
    it('forwards custom sort slots with live sort state', async () => {
      const customSortSlots: Record<string, (props: any) => any> = {
        'header-sort': (props: { sortOrder?: 'asc' | 'desc'; ariaLabel?: string; toggleSort?: () => void }) => {
          const { sortOrder, ariaLabel, toggleSort } = props;

          return h(
            'button',
            {
              type: 'button',
              'data-testid': 'sort-trigger',
              'aria-label': ariaLabel,
              onClick: () => toggleSort?.()
            },
            [h('span', { 'data-testid': 'sort-indicator' }, sortOrder ?? 'none')]
          );
        }
      };

      const wrapper = mount(STable, {
        props: {
          columns: sortableColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        slots: customSortSlots,
        attachTo: document.body
      });

      expect(wrapper.get('[data-testid="sort-indicator"]').text()).toBe('none');

      await wrapper.get('[data-testid="sort-trigger"]').trigger('click');

      expect(wrapper.get('[data-testid="sort-indicator"]').text()).toBe('asc');
      wrapper.unmount();
    });

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

    it('emits undefined when clearing sort state after cycling the sortable header', async () => {
      const wrapper = mount(STable, {
        props: {
          columns: sortableColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      const sortTrigger = wrapper.get('button[aria-label="Sort by Age"]');

      await sortTrigger.trigger('click');
      await sortTrigger.trigger('click');
      await sortTrigger.trigger('click');

      expect(wrapper.emitted('update:sortState')?.[2]?.[0]).toBeUndefined();
      wrapper.unmount();
    });

    it('filters rows when using the floating filter search input', async () => {
      const wrapper = mount(STable, {
        props: {
          columns: filterableColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      await openTableFilter(wrapper, 'Name');
      await setTeleportedInputValue('Search filter options for Name', 'Lin');

      expect(wrapper.emitted('update:filterState')?.[0]?.[0]).toEqual({ name: 'Lin' });
      expect(wrapper.findAll('tbody tr')).toHaveLength(1);
      expect(wrapper.get('tbody').text()).toContain('Linus');
      expect(wrapper.get('tbody').text()).not.toContain('Ada');
      wrapper.unmount();
    });

    it('filters rows when selecting options from the floating filter panel', async () => {
      const wrapper = mount(STable, {
        props: {
          columns: filterableColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      await openTableFilter(wrapper, 'Name');
      await clickTeleportedControl('Select Linus');

      expect(wrapper.emitted('update:filterState')?.[0]?.[0]).toEqual({
        name: {
          values: ['Linus']
        }
      });
      expect(wrapper.findAll('tbody tr')).toHaveLength(1);
      expect(wrapper.get('tbody').text()).toContain('Linus');
      expect(wrapper.get('tbody').text()).not.toContain('Ada');
      wrapper.unmount();
    });

    it('clears floating filter selections when clicking clear', async () => {
      const wrapper = mount(STable, {
        props: {
          columns: filterableColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      await openTableFilter(wrapper, 'Name');
      await clickTeleportedControl('Select Linus');
      await clickTeleportedControl('Clear');

      expect(wrapper.emitted('update:filterState')?.at(-1)?.[0]).toEqual({});
      expect(wrapper.findAll('tbody tr')).toHaveLength(2);
      expect(wrapper.get('tbody').text()).toContain('Ada');
      expect(wrapper.get('tbody').text()).toContain('Linus');
      wrapper.unmount();
    });

    it('supports custom filter slots with option toggles', async () => {
      const customFilterSlots = {
        'header-filter': (props: {
          filterOptions: Array<{ label: string; value: string }>;
          toggleFilterOption: (value: string) => void;
          isFilterOptionSelected: (value: string) => boolean;
        }) => {
          const { filterOptions, toggleFilterOption, isFilterOptionSelected } = props;

          return h(
            'div',
            { 'data-testid': 'custom-filter' },
            filterOptions.map(option =>
              h(
                'button',
                {
                  type: 'button',
                  'data-testid': `filter-option-${option.value}`,
                  'data-selected': isFilterOptionSelected(option.value),
                  onClick: () => toggleFilterOption(option.value)
                },
                option.label
              )
            )
          );
        }
      } as any;

      const wrapper = mount(STable, {
        props: {
          columns: filterableColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        slots: customFilterSlots,
        attachTo: document.body
      });

      await wrapper.get('[data-testid="filter-option-Linus"]').trigger('click');

      expect(wrapper.emitted('update:filterState')?.[0]?.[0]).toEqual({
        name: {
          values: ['Linus']
        }
      });
      expect(wrapper.findAll('tbody tr')).toHaveLength(1);
      expect(wrapper.get('tbody').text()).toContain('Linus');
      expect(wrapper.get('tbody').text()).not.toContain('Ada');
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

      const startHead = wrapper.get('th[data-fixed-side="start"]');
      const endHead = wrapper.get('th[data-fixed-side="end"]');

      expect(startHead.attributes('style')).toContain('position: sticky;');
      expect(startHead.attributes('style')).toContain('inset-inline-start: 0px;');
      expect(endHead.attributes('style')).toContain('inset-inline-end: 0px;');
      expect(wrapper.get('td[data-fixed-side="start"]').attributes('style')).toContain('inset-inline-start: 0px;');
      wrapper.unmount();
    });

    it('keeps logical fixed sides in rtl and lets css mirror them', () => {
      const wrapper = mount(STable, {
        props: {
          dir: 'rtl',
          columns: fixedColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      const startHead = wrapper.get('th[data-fixed-side="start"]');
      const endHead = wrapper.get('th[data-fixed-side="end"]');

      expect(startHead.attributes('style')).toContain('inset-inline-start: 0px;');
      expect(endHead.attributes('style')).toContain('inset-inline-end: 0px;');
      expect(wrapper.get('td[data-fixed-side="start"]').attributes('style')).toContain('inset-inline-start: 0px;');

      wrapper.unmount();
    });

    it('uses measured widths when calculating offsets for multiple left fixed columns', async () => {
      class TestResizeObserver extends MockResizeObserver {
        static instance: MockResizeObserver | null = null;

        constructor(callback: ResizeObserverCallback) {
          super(callback);
          TestResizeObserver.instance = this;
        }
      }

      const measuredFixedColumns: TableColumn<TableRowData>[] = [
        { title: 'Name', dataIndex: 'name', width: '140px', fixed: 'start' },
        { title: 'Age', dataIndex: 'age', width: '96px', align: 'center', fixed: 'start' },
        { title: 'Id', dataIndex: 'id', width: '120px' }
      ];

      const cleanup = setupMock('ResizeObserver', TestResizeObserver as unknown as typeof ResizeObserver);
      const wrapper = mount(STable, {
        props: {
          columns: measuredFixedColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      const heads = wrapper.findAll('th');
      const table = wrapper.get('table').element;

      mockRect(heads[0].element, { x: 0, y: 0, width: 176, height: 40 });
      mockRect(heads[1].element, { x: 176, y: 0, width: 108, height: 40 });
      mockRect(heads[2].element, { x: 284, y: 0, width: 120, height: 40 });

      TestResizeObserver.instance?.trigger([createMockResizeObserverEntry(table, { width: 404, height: 120 })]);

      await delay(30);
      await nextTick();

      expect(heads[0].attributes('style')).toContain('inset-inline-start: 0px;');
      expect(heads[1].attributes('style')).toContain('inset-inline-start: 176px;');
      expect(heads[0].attributes('data-fixed-last-start')).toBeUndefined();
      expect(heads[1].attributes('data-fixed-last-start')).toBe('');
      expect(wrapper.findAll('td[data-fixed-side="start"]')[1]?.attributes('style')).toContain(
        'inset-inline-start: 176px;'
      );
      expect(wrapper.findAll('td[data-fixed-side="start"]')[0]?.attributes('data-fixed-last-start')).toBeUndefined();
      expect(wrapper.findAll('td[data-fixed-side="start"]')[1]?.attributes('data-fixed-last-start')).toBe('');

      wrapper.unmount();
      cleanup();
    });

    it('uses logical start offsets for multiple fixed columns in rtl', async () => {
      class TestResizeObserver extends MockResizeObserver {
        static instance: MockResizeObserver | null = null;

        constructor(callback: ResizeObserverCallback) {
          super(callback);
          TestResizeObserver.instance = this;
        }
      }

      const measuredFixedColumns: TableColumn<TableRowData>[] = [
        { title: 'Name', dataIndex: 'name', width: '140px', fixed: 'start' },
        { title: 'Age', dataIndex: 'age', width: '96px', align: 'center', fixed: 'start' },
        { title: 'Id', dataIndex: 'id', width: '120px' }
      ];

      const cleanup = setupMock('ResizeObserver', TestResizeObserver as unknown as typeof ResizeObserver);
      const wrapper = mount(STable, {
        props: {
          dir: 'rtl',
          columns: measuredFixedColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      const heads = wrapper.findAll('th');
      const table = wrapper.get('table').element;

      mockRect(heads[0].element, { x: 0, y: 0, width: 176, height: 40 });
      mockRect(heads[1].element, { x: 176, y: 0, width: 108, height: 40 });
      mockRect(heads[2].element, { x: 284, y: 0, width: 120, height: 40 });

      TestResizeObserver.instance?.trigger([createMockResizeObserverEntry(table, { width: 404, height: 120 })]);

      await delay(30);
      await nextTick();

      expect(heads[0].attributes('style')).toContain('inset-inline-start: 0px;');
      expect(heads[1].attributes('style')).toContain('inset-inline-start: 176px;');
      expect(heads[0].attributes('data-fixed-last-start')).toBeUndefined();
      expect(heads[1].attributes('data-fixed-last-start')).toBe('');
      expect(wrapper.findAll('td[data-fixed-side="start"]')[1]?.attributes('style')).toContain(
        'inset-inline-start: 176px;'
      );
      expect(wrapper.findAll('td[data-fixed-side="start"]')[0]?.attributes('data-fixed-last-start')).toBeUndefined();
      expect(wrapper.findAll('td[data-fixed-side="start"]')[1]?.attributes('data-fixed-last-start')).toBe('');

      wrapper.unmount();
      cleanup();
    });

    it('marks the last start fixed and first end fixed columns for styling', () => {
      const bidirectionalFixedColumns: TableColumn<TableRowData>[] = [
        { title: 'Name', dataIndex: 'name', width: '140px', fixed: 'start' },
        { title: 'Age', dataIndex: 'age', width: '96px', align: 'center', fixed: 'start' },
        { title: 'Id', dataIndex: 'id', width: '120px' },
        { title: 'Name Copy', dataIndex: 'name', width: '140px', fixed: 'end' },
        { title: 'Id', dataIndex: 'id', width: '120px', fixed: 'end' }
      ];

      const wrapper = mount(STable, {
        props: {
          columns: bidirectionalFixedColumns as TableColumn[],
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      const startHeads = wrapper.findAll('th[data-fixed-side="start"]');
      const endHeads = wrapper.findAll('th[data-fixed-side="end"]');
      const startCells = wrapper.findAll('td[data-fixed-side="start"]');
      const endCells = wrapper.findAll('td[data-fixed-side="end"]');

      expect(startHeads[0]?.attributes('data-fixed-last-start')).toBeUndefined();
      expect(startHeads[1]?.attributes('data-fixed-last-start')).toBe('');
      expect(endHeads[0]?.attributes('data-fixed-first-end')).toBe('');
      expect(endHeads[1]?.attributes('data-fixed-first-end')).toBeUndefined();
      expect(startCells[0]?.attributes('data-fixed-last-start')).toBeUndefined();
      expect(startCells[1]?.attributes('data-fixed-last-start')).toBe('');
      expect(endCells[0]?.attributes('data-fixed-first-end')).toBe('');
      expect(endCells[1]?.attributes('data-fixed-first-end')).toBeUndefined();

      wrapper.unmount();
    });

    it('adapts pointer resizing to rtl logical direction', async () => {
      const wrapper = mount(STable, {
        props: {
          dir: 'rtl',
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
      dispatchPointerEvent(document, 'pointermove', { clientX: 100, clientY: 20, pointerId: 1 });
      dispatchPointerEvent(document, 'pointerup', { clientX: 100, clientY: 20, pointerId: 1 });

      await nextTick();

      expect(wrapper.emitted('update:columnWidths')?.at(-1)?.[0]).toEqual({ name: '180px' });
      expect(head.attributes('style')).toContain('width: 180px;');
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

      const cleanup = setupMock('ResizeObserver', TestResizeObserver as unknown as typeof ResizeObserver);
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

      const root = wrapper.findComponent({ name: 'TableRoot' }).element as HTMLElement;
      const scroll = wrapper.findComponent({ name: 'TableScroll' }).element as HTMLElement;
      let scrollTop = 0;

      Object.defineProperties(scroll, {
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

      TestResizeObserver.instance?.trigger([createMockResizeObserverEntry(scroll, { width: 400, height: 120 })]);

      await delay(30);
      await nextTick();

      expect(root.getAttribute('style')).toBeNull();
      expect(scroll.getAttribute('style')).toContain('height: 120px;');
      expect(wrapper.text()).toContain('User 1');
      expect(wrapper.text()).not.toContain('User 100');
      expect(wrapper.findAll('tbody tr').length).toBeLessThan(virtualizedData.length);
      expect(wrapper.find('tbody tr[aria-hidden="true"] td').attributes('style')).toContain('height: 2610px;');

      scroll.scrollTop = 900;
      scroll.dispatchEvent(new Event('scroll'));

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

      await wrapper.find('[aria-label="Expand row Ada"]').trigger('click');

      expect(wrapper.emitted('update:expanded')).toBeTruthy();
      expect(wrapper.emitted('update:expanded')?.[0]?.[0]).toEqual([1]);
      expect(wrapper.find('[data-testid="expanded-1"]').text()).toContain('Expanded Ada');
      wrapper.unmount();
    });
  });

  describe('tree rows', () => {
    it('renders nested rows and toggles children from the first data column', async () => {
      const wrapper = mount(STable, {
        props: {
          columns: columns as TableColumn[],
          data: treeData,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Ada');
      expect(wrapper.text()).not.toContain('Ada Child');

      await wrapper.get('[aria-label="Expand row Ada"]').trigger('click');

      expect(wrapper.emitted('update:expanded')?.[0]?.[0]).toEqual([1]);
      expect(wrapper.text()).toContain('Ada Child');
      expect(wrapper.get('tbody tr[data-level="2"]').text()).toContain('Ada Child');

      wrapper.unmount();
    });

    it('keeps ancestor rows visible when filtering matches descendants', async () => {
      const wrapper = mount(STable, {
        props: {
          columns: filterableColumns as TableColumn[],
          data: treeData,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      await openTableFilter(wrapper, 'Name');
      await setTeleportedInputValue('Search filter options for Name', 'Child 2');

      expect(wrapper.text()).toContain('Ada');
      expect(wrapper.text()).toContain('Ada Child 2');
      expect(wrapper.text()).not.toContain('Linus');

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
