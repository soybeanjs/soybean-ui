import type { Path, PathValue } from '@soybeanjs/headless';
import type { BaseTableData } from './types';

export function getTableRowValueByDataIndex<T extends BaseTableData, K extends Path<T>>(
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
