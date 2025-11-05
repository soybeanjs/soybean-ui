import type { DefinedValue } from '@headless';
import type { SelectGroupOptionData, SelectOptionData } from './types';

export function isGroupOption<T extends DefinedValue = string>(
  item: SelectOptionData<T>
): item is SelectGroupOptionData<T> {
  return 'items' in item;
}
