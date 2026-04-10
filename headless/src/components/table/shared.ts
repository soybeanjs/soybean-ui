import type { Path, PathValue } from '../../types';
import type { BaseTableData } from './types';

/**
 * Get a human-readable row label for built-in table a11y text.
 *
 * Falls back to common display fields (`name`, `title`, `label`) before using the row key.
 */
export function getTableRowLabel<T extends BaseTableData, R extends string | number>(row: T, rowKey: (row: T) => R) {
  const candidate = row.name ?? row.title ?? row.label;

  if (typeof candidate === 'string' && candidate.trim().length > 0) {
    return candidate;
  }

  return String(rowKey(row));
}

export function getTableRowValueByDataIndex<T extends BaseTableData, K extends Path<T>>(row: T, dataIndex: K): PathValue<T, K> {
  const keys = dataIndex.split('.');
  let value: any = row;

  for (const key of keys) {
    if (value == null) {
      return undefined as PathValue<T, K>;
    }

    value = value[key];
  }

  return value as PathValue<T, K>;
}
