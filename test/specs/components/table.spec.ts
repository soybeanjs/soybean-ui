import { h } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import STable from '../../../src/components/table/table.vue';
import { getA11yViolations } from '../../shared/a11y';

interface TableRowData {
  id: number;
  name: string;
  age: number;
}

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age', align: 'center' as const }
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
          columns,
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

    it('forwards custom cell slots to the headless data table', () => {
      const wrapper = mount(STable, {
        props: {
          columns,
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
          columns: selectionColumns,
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
  });

  describe('expanded state', () => {
    it('emits update:expanded and renders expanded row content', async () => {
      const wrapper = mount(STable, {
        props: {
          columns: expandableColumns,
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
          columns: selectionColumns,
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
