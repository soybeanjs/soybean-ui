import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import DataTableRoot from '../../../headless/src/components/data-table/data-table-root.vue';

interface DataTableRow {
  id: number;
  name: string;
}

const columns = [{ type: 'selection' as const }, { title: 'Name', dataIndex: 'name' as const }];

const data: DataTableRow[] = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Linus' }
];

describe('DataTableRoot', () => {
  it('marks the fallback header checkbox as indeterminate for partial selection', () => {
    const wrapper = mount(DataTableRoot, {
      props: {
        columns,
        data,
        rowKey: row => row.id,
        selected: [1]
      },
      attachTo: document.body
    });

    const headerCheckbox = wrapper.get('input[aria-label="Select all rows"]').element as HTMLInputElement;

    expect(headerCheckbox.checked).toBe(false);
    expect(headerCheckbox.indeterminate).toBe(true);
    wrapper.unmount();
  });

  it('clears single selection when clicking the already-selected fallback radio', async () => {
    const wrapper = mount(DataTableRoot, {
      props: {
        columns,
        data,
        rowKey: row => row.id,
        multiple: false,
        defaultSelected: 1
      },
      attachTo: document.body
    });

    const radio = wrapper.get('input[aria-label="Select row Ada"]');

    await radio.trigger('click');

    expect(wrapper.emitted('update:selected')?.[0]).toEqual([undefined]);
    expect((radio.element as HTMLInputElement).checked).toBe(false);

    await radio.trigger('click');

    expect(wrapper.emitted('update:selected')?.[1]).toEqual([1]);
    wrapper.unmount();
  });
});
