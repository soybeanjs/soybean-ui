<script setup lang="ts">
import { STable } from '@soybeanjs/ui';
import type { TableColumn } from '@soybeanjs/ui';
import { typeToVNode } from './type-anchor';
import { useApiI18n } from './use-api-i18n';

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
  descriptionKey?: string | null;
};

type EmitsOrSlotsRow = {
  name: string;
  parameters?: string;
  description: string;
  descriptionKey?: string | null;
  required?: boolean;
};

interface Props<Row = any> {
  preset?: PropsPreset;
  columns?: DataTableColumn<Row>[];
  data: Row[];
}

const props = defineProps<Props>();
const { resolveApiText, t } = useApiI18n();

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
        title: t('api.columns.prop_name'),
        cellWrapperClass: 'code-btn',
        render: row => [row.name, row.required ? ' *' : '']
      },
      {
        key: 'type',
        title: t('api.columns.type'),
        cellWrapperClass: 'code-btn-outline',
        render: row => typeToVNode(row.type)
      },
      {
        key: 'default',
        title: t('api.columns.default'),
        cellWrapperClass: 'code-btn-outline'
      },
      {
        key: 'description',
        title: t('api.columns.description'),
        cellWrapperClass: 'max-w-[20rem] whitespace-pre-wrap break-words'
      }
    ];

    return cols;
  }

  if (preset === 'emits' || preset === 'slots') {
    const title = preset === 'emits' ? t('api.columns.emit_name') : t('api.columns.slot_name');
    const cols: DataTableColumn<EmitsOrSlotsRow>[] = [
      {
        key: 'name',
        title,
        cellWrapperClass: 'code-btn',
        render: row => [row.name, row.required ? ' *' : '']
      },
      {
        key: 'parameters',
        title: t('api.columns.parameters'),
        cellWrapperClass: 'code-btn-outline',
        render: row => typeToVNode(row.parameters)
      },
      {
        key: 'description',
        title: t('api.columns.description'),
        cellWrapperClass: 'max-w-[20rem] whitespace-pre-wrap break-words'
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

const columnMinWidthMap: Record<string, string> = {
  name: '144px',
  type: '176px',
  parameters: '176px',
  default: '136px',
  description: '240px'
};

const tableColumns = computed<TableColumn<TableRow>[]>(() => {
  return resolvedColumns.value.map(column => ({
    key: column.key,
    dataIndex: column.key,
    title: column.title,
    minWidth: columnMinWidthMap[column.key] ?? '140px'
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

function getDescriptionText(row: { description?: string; descriptionKey?: string | null }) {
  return resolveApiText(row.description, row.descriptionKey) || '—';
}
</script>

<template>
  <div class="min-w-0 overflow-x-auto">
    <STable :columns="tableColumns" :data="tableData" :row-key="row => row.__rowKey" size="sm" bordered>
      <template v-for="col in resolvedColumns" :key="col.key" #[col.key]="{ row }">
        <div v-if="col.cellWrapperClass" :class="col.cellWrapperClass">
          <CellRenderer :render="getColumnRender(col)" :row="row" />
        </div>
        <CellRenderer v-else :render="getColumnRender(col)" :row="row" />
      </template>

      <template #description="{ row }">
        <div class="max-w-[20rem] whitespace-pre-wrap break-words">
          {{ getDescriptionText(row) }}
        </div>
      </template>
    </STable>
  </div>
</template>
