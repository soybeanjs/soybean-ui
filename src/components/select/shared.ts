import type { DefinedValue } from '@soybeanjs/headless';
import type { SelectGroupOptionData, SelectOptionData } from './types';

export function isGroupOption<T extends DefinedValue = string>(
  item: SelectOptionData<T>
): item is SelectGroupOptionData<T> {
  return 'items' in item;
}
