import type { Component } from 'vue';
import type {
  AcceptableValue,
  ClassValue,
  MenubarContentEmits,
  MenubarRootEmits,
  MenubarContentProps as _MenubarContentProps,
  MenubarMenuProps as _MenubarMenuProps,
  MenubarRootProps as _MenubarRootProps,
  MenubarTriggerProps as _MenubarTriggerProps
} from '@soybean-ui/primitives';
import type { MenuSlots, MenubarSlots } from '@soybean-ui/variants';
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
import type { KeyboardKeyValue } from '../keyboard-key';

export type MenubarUi = Partial<Record<MenubarSlots | MenuSlots, ClassValue>>;

export interface MenubarRootProps extends _MenubarRootProps {
  size?: ThemeSize;
}

export interface MenubarTriggerProps extends _MenubarTriggerProps {
  size?: ThemeSize;
  ui?: Pick<MenubarUi, 'trigger' | 'itemIcon' | 'shortcut'>;
  /** The group label of the menu. */
  label: string;
  /** The icon to display prepended to the label. */
  icon?: Component;
  /** The shortcut to display next to the label. */
  shortcut?: KeyboardKeyValue | KeyboardKeyValue[];
}

// MenubarContent
export interface MenubarContentProps extends _MenubarContentProps {
  size?: ThemeSize;
}

// MenubarOption
export interface MenubarOptionProps<T extends AcceptableValue = AcceptableValue> extends MenuOptionProps<T> {}
export type MenubarOptionEmits<T extends AcceptableValue = AcceptableValue> = MenuOptionEmits<T>;

// MenubarItem
export interface MenubarItemProps<T extends AcceptableValue = AcceptableValue> extends MenuProps<T> {}
export type MenubarItemEmits<T extends AcceptableValue = AcceptableValue> = MenuEmits<T>;

// MenubarTriggerLink
export interface MenubarTriggerLinkProps extends LinkProps {
  size?: ThemeSize;
  ui?: Pick<MenubarUi, 'triggerLink' | 'itemIcon' | 'itemLinkIcon'>;
  /** The group label of the menu. */
  label: string;
  /** The icon to display prepended to the label. */
  icon?: Component;
}

// MenubarTriggerOption
export interface MenubarTriggerOptionProps<T extends AcceptableValue = AcceptableValue> {
  size?: ThemeSize;
  ui?: MenubarUi;
  item: MenuOptionData<T>;
  disabled?: boolean;
}
export type MenubarTriggerOptionEmits<T extends AcceptableValue = AcceptableValue> = MenuOptionEmits<T>;

// MenubarMenu
export interface MenubarMenuProps<T extends AcceptableValue = AcceptableValue>
  extends _MenubarMenuProps,
    MenuPortalContentProps,
    MenuOptionProps<T> {
  size?: ThemeSize;
  ui?: MenubarUi;
}
export type MenubarMenuEmits<T extends AcceptableValue = AcceptableValue> = MenuEmits<T>;

export interface MenubarProps<T extends AcceptableValue = AcceptableValue> extends MenubarRootProps, MenuProps<T> {
  ui?: MenubarUi;
}
export type MenubarEmits<T extends AcceptableValue = AcceptableValue> = MenubarRootEmits & MenuEmits<T>;

export type {
  MenubarRootEmits,
  MenubarContentEmits,
  MenubarPortalContentProps,
  MenubarPortalContentEmits,
  MenubarSubContentProps,
  MenubarSubContentEmits,
  MenubarSubTriggerProps
};
