import type { SelectGroupOptionData, SelectOptionData } from './types';

export function isGroupOption(opt: SelectOptionData | SelectGroupOptionData): opt is SelectGroupOptionData {
  return (opt as SelectGroupOptionData).items !== undefined;
}
