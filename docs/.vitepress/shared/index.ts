import type { DropdownMenuOptionType } from 'soy-ui';
import type { NavItem } from '../types';

export function isNavItemWithLink(item: DropdownMenuOptionType<NavItem>): item is NavItem {
  return Boolean((item as NavItem).link);
}

export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function flatten<T extends Record<string, any>, U extends keyof T>(items: T[], key: U): T[] {
  return items.reduce((acc: any[], item: T) => {
    acc.push(item);
    if (item[key]) acc.push(...flatten(item[key], key as any));
    return acc;
  }, []);
}
