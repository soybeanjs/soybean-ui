import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import STable from '../../../src/components/table/table.vue';
import type { TableColumn } from '../../../src/components/table/types';
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

describe('STable', () => {
  describe('rendering', () => {
    it('renders column headers and cell values', () => {
      const wrapper = mount(STable, {
        props: {
          columns: columns as any,
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
          columns: groupedColumns as any,
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
          columns: columns as any,
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
          columns: selectionColumns as any,
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      const controls = wrapper.findAll('[role="checkbox"]');

      await controls[1].trigger('click');

      expect(wrapper.emitted('update:selected')).toBeTruthy();
      expect(wrapper.emitted('update:selected')?.[0]?.[0]).toEqual([1]);
      wrapper.unmount();
    });

    it('uses pressed button semantics for single-selection controls', () => {
      const wrapper = mount(STable, {
        props: {
          columns: selectionColumns as any,
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
          columns: sortableColumns as any,
          data,
          rowKey: row => row.id
        },
        attachTo: document.body
      });

      await wrapper.get('button').trigger('click');

      expect(wrapper.emitted('update:sortState')?.[0]?.[0]).toEqual({ key: 'age', order: 'asc' });
      expect(wrapper.findAll('tbody tr')[0].text()).toContain('Linus');
      wrapper.unmount();
    });

    it('filters rows when a filterable header input changes', async () => {
      const wrapper = mount(STable, {
        props: {
          columns: filterableColumns as any,
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

  describe('expanded state', () => {
    it('emits update:expanded and renders expanded row content', async () => {
      const wrapper = mount(STable, {
        props: {
          columns: expandableColumns as any,
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
          columns: selectionColumns as any,
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
