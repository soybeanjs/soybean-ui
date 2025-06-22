import type { SelectGroupOptionData, SelectOptionData } from './types';

export function isGroupOption(item: SelectOptionData): item is SelectGroupOptionData {
  return 'items' in item;
}
