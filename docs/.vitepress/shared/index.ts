import type { DropdownMenuOptionType } from 'soybean-ui';
import type { CustomNavItem } from '../types';

export function isNavItemWithLink(item: DropdownMenuOptionType<CustomNavItem>): item is CustomNavItem {
  return Boolean((item as CustomNavItem).link);
}
