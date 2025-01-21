import type { SelectGroupOptionType, SelectOptionType } from './types';

export function isGroupOption(opt: SelectOptionType | SelectGroupOptionType): opt is SelectGroupOptionType {
  return (opt as SelectGroupOptionType).items !== undefined;
}
