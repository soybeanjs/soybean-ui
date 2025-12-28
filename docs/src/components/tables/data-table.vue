<script setup lang="tsx">
import { defineComponent } from 'vue';
import { toTypeAnchorId } from './type-anchor';

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
  return row?.[key];
}

type TypePart = { text: string; isLink?: boolean };

const BUILTIN_TYPE_NAMES = new Set([
  'Array',
  'Record',
  'Partial',
  'Pick',
  'Omit',
  'Exclude',
  'Extract',
  'NonNullable',
  'Readonly',
  'Required',
  'Promise',
  'Map',
  'Set',
  'Date',
  'RegExp',
  'VNode',
  'Component',
  'IconifyIcon',
  'MaybePromise'
]);

function splitTypeParts(typeText: string): TypePart[] {
  if (!typeText) {
    return [{ text: '—' }];
  }

  const parts: TypePart[] = [];

  const re = /\b[A-Z][A-Za-z0-9_]*\b/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(typeText))) {
    const [word] = match;
    const start = match.index;

    if (start > lastIndex) {
      parts.push({ text: typeText.slice(lastIndex, start) });
    }

    const isLink = !BUILTIN_TYPE_NAMES.has(word);
    parts.push({ text: word, isLink });
    lastIndex = start + word.length;
  }

  if (lastIndex < typeText.length) {
    parts.push({ text: typeText.slice(lastIndex) });
  }

  return parts.length ? parts : [{ text: typeText }];
}

function buildPresetColumns(preset: PropsPreset | undefined): DataTableColumn<any>[] {
  if (preset === 'props') {
    const cols: DataTableColumn<PropsRow>[] = [
      {
        key: 'name',
        title: 'Prop',
        cellWrapperClass: 'table-code-btn-primary',
        render: row => (
          <>
            <span>{row.name}</span>
            {row.required && <span class="ml-1 text-destructive/80">*</span>}
          </>
        )
      },
      {
        key: 'type',
        title: 'Type',
        cellWrapperClass: 'table-code-btn-outline',
        render: row => (
          <>
            {splitTypeParts(row.type).map((part, idx) =>
              part.isLink ? (
                <SLink
                  key={idx}
                  href={`#${toTypeAnchorId(part.text)}`}
                  target="_self"
                  class="text-primary border-b-2 border-dashed border-primary/50 hover:border-primary duration-200"
                >
                  {part.text}
                </SLink>
              ) : (
                <span key={idx}>{part.text}</span>
              )
            )}
          </>
        )
      },
      // {
      //   key: 'parameters',
      //   title: 'Parameters',
      //   cellWrapperClass: 'table-code-btn-outline',
      //   render: '——'
      // },
      {
        key: 'default',
        title: 'Default',
        cellWrapperClass: 'table-code-btn-outline'
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
        cellWrapperClass: 'table-code-btn-primary',
        render: row => (
          <>
            <span>{row.name}</span>
            {row.required && <span class="ml-1 text-destructive/80">*</span>}
          </>
        )
      },
      {
        key: 'parameters',
        title: 'Parameters',
        cellWrapperClass: 'table-code-btn-outline',
        render: row => row.parameters || '——'
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

const resolvedColumns = () => {
  if (props.columns?.length) {
    return props.columns;
  }
  return buildPresetColumns(props.preset);
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in resolvedColumns()" :key="col.key">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in props.data" :key="rowIndex">
        <td v-for="col in resolvedColumns()" :key="col.key">
          <div v-if="col.cellWrapperClass" :class="col.cellWrapperClass">
            <CellRenderer v-if="col.render" :render="col.render" :row="row" />
            <span v-else>{{ getCellValue(row, col.key) }}</span>
          </div>
          <template v-else>
            <CellRenderer v-if="col.render" :render="col.render" :row="row" />
            <span v-else>{{ getCellValue(row, col.key) }}</span>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
