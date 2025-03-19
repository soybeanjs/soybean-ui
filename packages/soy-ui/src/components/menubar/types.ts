import type {
  AcceptableValue,
  ClassValue,
  MenubarContentEmits,
  MenubarContentProps,
  MenubarRootEmits,
  MenubarRootProps,
  MenubarTriggerProps,
  MenubarMenuProps as _MenubarMenuProps
} from '@soybean-ui/primitives';
import type { ThemeSize } from '../../types';
import type {
  MenuEmits,
  MenuOptionData,
  MenuOptionEmits,
  MenuOptionProps,
  MenuPortalContentProps,
  MenuProps,
  MenuPortalContentEmits as MenubarPortalContentEmits,
  MenuPortalContentProps as MenubarPortalContentProps,
  MenuSubContentEmits as MenubarSubContentEmits,
  MenuSubContentProps as MenubarSubContentProps,
  MenuSubTriggerProps as MenubarSubTriggerProps
} from '../menu/types';
import type { LinkProps } from '../link';

// MenubarOption
export interface MenubarOptionProps<T extends AcceptableValue = AcceptableValue> extends MenuOptionProps<T> {}
export type MenubarOptionEmits<T extends AcceptableValue = AcceptableValue> = MenuOptionEmits<T>;

// MenubarItem
export interface MenubarItemProps<T extends AcceptableValue = AcceptableValue> extends MenuProps<T> {}
export type MenubarItemEmits<T extends AcceptableValue = AcceptableValue> = MenuEmits<T>;

// MenubarTriggerLink
export interface MenubarTriggerLinkProps extends LinkProps {}

// MenubarTriggerOption
export interface MenubarTriggerOptionProps<T extends AcceptableValue = AcceptableValue> extends MenubarTriggerProps {
  size?: ThemeSize;
  item: MenuOptionData<T>;
  itemLinkIconClass?: ClassValue;
  itemIconClass?: ClassValue;
  shortcutClass?: ClassValue;
}
export type MenubarTriggerOptionEmits<T extends AcceptableValue = AcceptableValue> = MenuOptionEmits<T>;

// MenubarMenu
export interface MenubarMenuProps<T extends AcceptableValue = AcceptableValue>
  extends _MenubarMenuProps,
    MenuPortalContentProps,
    MenuOptionProps<T> {
  triggerClass?: ClassValue;
}
export type MenubarMenuEmits<T extends AcceptableValue = AcceptableValue> = MenuEmits<T>;

export interface MenubarProps<T extends AcceptableValue = AcceptableValue> extends MenubarRootProps, MenuProps<T> {
  triggerClass?: ClassValue;
}
export type MenubarEmits<T extends AcceptableValue = AcceptableValue> = MenubarRootEmits & MenuEmits<T>;

export type {
  MenubarRootEmits,
  MenubarRootProps,
  MenubarContentProps,
  MenubarContentEmits,
  MenubarPortalContentProps,
  MenubarPortalContentEmits,
  MenubarSubContentProps,
  MenubarSubContentEmits,
  MenubarTriggerProps,
  MenubarSubTriggerProps
};
