import type {
  DropdownMenuGroupOption,
  DropdownMenuItemOption,
  DropdownMenuOptionType,
  DropdownMenuSubOption
} from './types';

export function isGroupOption<T extends DropdownMenuItemOption>(
  option: DropdownMenuOptionType<T>
): option is DropdownMenuGroupOption<T> {
  return Boolean((option as DropdownMenuGroupOption<T>).groupId);
}

export function isSubOption<T extends DropdownMenuItemOption>(
  option: DropdownMenuOptionType<T>
): option is DropdownMenuSubOption<T> {
  return !isGroupOption(option) && (option as DropdownMenuSubOption<T>).options?.length > 0;
}

export function createOptionKey<T extends DropdownMenuItemOption>(item: DropdownMenuOptionType<T>, index?: number) {
  if (isGroupOption(item)) {
    return item.groupId;
  }

  if (isSubOption(item)) {
    let key = `subOption_${item.label}`;

    if (index !== undefined) {
      key += `_${index}`;
    }
    return key;
  }

  return item.value;
}
