<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
import type { TableColumn } from '@soybeanjs/ui';
import { typeToVNode } from './type-anchor';

type PropsPreset = 'props' | 'emits' | 'slots';

export type DataTableColumn<Row> = {
  key: string;
  title: string;
  cellWrapperClass?: string;
  render?: (row: Row) => any;
};

type PropsRow = {
  name: string;
  required?: boolean;
  default?: string | boolean;
  type: string;
  typeSimple?: string;
  description: string;
};

type EmitsOrSlotsRow = {
  name: string;
  parameters?: string;
  description: string;
  required?: boolean;
};

interface Props<Row = any> {
  preset?: PropsPreset;
  columns?: DataTableColumn<Row>[];
  data: Row[];
}

const props = defineProps<Props>();

type TableRow = Record<string, unknown> & {
  __rowKey: string;
};

const CellRenderer = defineComponent({
  name: 'DataTableCellRenderer',
  props: {
    render: {
      type: Function,
      required: true
    },
    row: {
      type: Object,
      required: true
    }
  },
  setup(cellProps) {
    return () => (cellProps.render as any)(cellProps.row);
  }
});

function getCellValue(row: any, key: string) {
  return row?.[key] ?? '—';
}

function buildPresetColumns(preset: PropsPreset | undefined): DataTableColumn<any>[] {
  if (preset === 'props') {
    const cols: DataTableColumn<PropsRow>[] = [
      {
        key: 'name',
        title: 'Prop',
        cellWrapperClass: 'code-btn',
        render: row => [row.name, row.required ? ' *' : '']
      },
      {
        key: 'type',
        title: 'Type',
        cellWrapperClass: 'code-btn-outline',
        render: row => typeToVNode(row.type)
      },
      {
        key: 'default',
        title: 'Default',
        cellWrapperClass: 'code-btn-outline'
      },
      {
        key: 'description',
        title: 'Description'
      }
    ];

    return cols;
  }

  if (preset === 'emits' || preset === 'slots') {
    const title = preset === 'emits' ? 'Emit Name' : 'Slot Name';
    const cols: DataTableColumn<EmitsOrSlotsRow>[] = [
      {
        key: 'name',
        title,
        cellWrapperClass: 'code-btn',
        render: row => [row.name, row.required ? ' *' : '']
      },
      {
        key: 'parameters',
        title: 'Parameters',
        cellWrapperClass: 'code-btn-outline',
        render: row => typeToVNode(row.parameters)
      },
      {
        key: 'description',
        title: 'Description'
      }
    ];
    return cols;
  }

  return [];
}

const resolvedColumns = computed<DataTableColumn<any>[]>(() => {
  if (props.columns?.length) {
    return props.columns;
  }

  return buildPresetColumns(props.preset);
});

const tableColumns = computed<TableColumn<TableRow>[]>(() => {
  return resolvedColumns.value.map(column => ({
    key: column.key,
    dataIndex: column.key,
    title: column.title,
    minWidth: column.key === 'description' ? '320px' : '160px'
  }));
});

const tableData = computed<TableRow[]>(() => {
  return props.data.map((item, index) => ({
    ...(item as Record<string, unknown>),
    __rowKey: `${index}`
  }));
});

function getColumnRender(column: DataTableColumn<any>) {
  return column.render ?? ((row: TableRow) => getCellValue(row, column.key));
}
</script>

<template>
  <STable :columns="tableColumns" :data="tableData" :row-key="row => row.__rowKey" size="sm" bordered>
    <template v-for="col in resolvedColumns" :key="col.key" #[col.key]="{ row }">
      <div v-if="col.cellWrapperClass" :class="col.cellWrapperClass">
        <CellRenderer :render="getColumnRender(col)" :row="row" />
      </div>
      <CellRenderer v-else :render="getColumnRender(col)" :row="row" />
    </template>
  </STable>
</template>
