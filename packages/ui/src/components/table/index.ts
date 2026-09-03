export { default as STable } from './table.vue';
export { TableRow as STableRow, TableCell as STableCell } from '@soybeanjs/headless/table';
export { useTable, usePaginatedTable } from './hooks';

export type * from '@soybeanjs/headless/table';
export type { TableColumnCheck, TableColumnCheckTitle, PaginationResult } from './hooks';
export type * from './types';
