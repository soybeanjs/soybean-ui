export { TableRow as STableRow, TableCell as STableCell } from '@soybeanjs/headless';
export type { TableColumnCheck } from '@soybeanjs/hooks';
export { default as STable } from './table.vue';
export { useTable, usePaginatedTable } from './hooks';

export type {
  TableEmits as HeadlessTableEmits,
  TableProps as HeadlessTableProps,
  TableSlots as HeadlessTableSlots
} from '@soybeanjs/headless/table';
export type * from './types';
