import type { Path, PathValue } from '../../types';
import type { BaseDataTableRow } from './types';

export function getDataTableRowValueByDataIndex<T extends BaseDataTableRow, K extends Path<T>>(
  row: T,
  dataIndex: K
): PathValue<T, K> {
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
