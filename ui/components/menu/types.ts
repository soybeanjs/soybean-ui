import type { Component, VNode } from 'vue';
import type {
  AcceptableValue,
  ClassValue,
  DefinedValue,
  KbdValue,
  MenuArrowProps,
  MenuCheckboxGroupEmits,
  MenuCheckboxGroupProps,
  MenuCheckboxItemProps,
  MenuContentEmits,
  MenuContentProps,
  MenuGroupLabelProps,
  MenuGroupProps,
  MenuItemIndicatorProps,
  MenuItemProps,
  MenuPortalProps,
  MenuRadioGroupEmits,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuRootEmits,
  MenuRootProps,
  MenuSeparatorProps,
  MenuSubContentEmits,
  MenuSubContentProps,
  MenuSubEmits,
  MenuSubProps,
  MenuSubTriggerProps,
  MenuThemeSlot
} from '@headless';
import type { ThemeSize } from '@theme';
import type { LinkProps } from '../link/types';
import type { KbdProps } from '../kbd/types';

export interface MenuOptionData<T extends DefinedValue = DefinedValue>
  extends Pick<MenuItemProps, 'disabled' | 'textValue'> {
  /** The label to display in the menu. */
  label: string;
  /** The value of the option. */
  value: T;
  /**
   * whether is group label
   *
   * if true, the option will be a group label.
   */
  isGroupLabel?: boolean;
  /**
   * The icon of the dropdown item.
   *
   * if it is a string, it will be used as the icon name of the iconify.
   */
  icon?: VNode | Component | string;
  /** Whether to show a separator above this option. */
  separator?: boolean;
  /** The shortcut of the option. */
  shortcut?: KbdValue | KbdValue[];
  /**
   * The link props
   *
   * if provided, the option will be a link.
   */
  linkProps?: LinkProps;
  /** The children of the option. */
  children?: MenuOptionData<T>[];
}

export interface MenuShortcutProps extends Omit<KbdProps, 'value'> {}

export type MenuUi = Partial<
  Record<MenuThemeSlot | 'subTriggerIcon' | 'itemLinkIcon' | 'shortcut' | 'radioIndicatorIcon', ClassValue>
>;

export interface MenuOptionProps<T extends DefinedValue = DefinedValue> {
  ui?: MenuUi;
  item: MenuOptionData<T>;
  itemProps?: MenuItemProps;
  groupProps?: MenuGroupProps;
  groupLabelProps?: MenuGroupLabelProps;
  subProps?: MenuSubProps;
  subTriggerProps?: MenuSubTriggerProps;
  portalProps?: MenuPortalProps;
  subContentProps?: MenuSubContentProps;
  separatorProps?: MenuSeparatorProps;
  shortcutProps?: MenuShortcutProps;
}

export type MenuOptionSelectEmits<T extends MenuOptionData = MenuOptionData> = {
  select: [item: T, event: Event];
};

export type MenuOptionEmits<T extends MenuOptionData = MenuOptionData> = MenuSubEmits &
  MenuSubContentEmits &
  MenuOptionSelectEmits<T>;

export interface MenuOptionsProps<
  T extends DefinedValue = DefinedValue,
  S extends MenuOptionData<T> = MenuOptionData<T>
> extends Omit<MenuOptionProps<T>, 'item'> {
  items: S[];
}

export type MenuOptionsEmits<T extends MenuOptionData = MenuOptionData> = MenuOptionEmits<T>;

/**
 * The props of the menu wrapper.
 *
 * @description This is a wrapper component for the menu, it is combined with MenuRoot, MenuContent, MenuPortal, MenuArrow.
 */
export interface MenuWrapperProps extends MenuRootProps {
  size?: ThemeSize;
  ui?: MenuUi;
  showArrow?: boolean;
  portalProps?: MenuPortalProps;
  contentProps?: MenuContentProps;
  arrowProps?: MenuArrowProps;
}

export type MenuWrapperEmits = MenuRootEmits & MenuContentEmits;

export interface MenuProps<T extends DefinedValue = DefinedValue, S extends MenuOptionData<T> = MenuOptionData<T>>
  extends MenuWrapperProps,
    MenuOptionsProps<T, S> {}

export type MenuEmits<T extends MenuOptionData = MenuOptionData> = MenuRootEmits & MenuOptionsEmits<T>;

export interface MenuCheckboxOptionData<T extends DefinedValue = DefinedValue>
  extends Omit<MenuOptionData<T>, 'linkProps' | 'children'> {}

export interface MenuCheckboxOptionsProps<
  T extends DefinedValue = DefinedValue,
  S extends MenuCheckboxOptionData<T> = MenuCheckboxOptionData<T>
> extends Omit<MenuCheckboxGroupProps<T>, 'dir' | 'onSelect'> {
  ui?: MenuUi;
  items: S[];
  groupLabelProps?: MenuGroupLabelProps;
  checkboxItemProps?: MenuCheckboxItemProps;
  indicatorProps?: MenuItemIndicatorProps;
  shortcutProps?: MenuShortcutProps;
  separatorProps?: MenuSeparatorProps;
}

export type MenuCheckboxSelectEmits<T extends MenuCheckboxOptionData = MenuCheckboxOptionData> = {
  select: [item: T, event: Event];
};
export type MenuCheckboxOptionsEmits<
  T extends DefinedValue = DefinedValue,
  S extends MenuCheckboxOptionData<T> = MenuCheckboxOptionData<T>
> = MenuCheckboxGroupEmits<T> & MenuCheckboxSelectEmits<S>;

export type MenuRadioOptionData<T extends DefinedValue = DefinedValue> = MenuCheckboxOptionData<T>;

export interface MenuRadioOptionsProps<
  T extends AcceptableValue = AcceptableValue,
  S extends MenuRadioOptionData<NonNullable<T>> = MenuRadioOptionData<NonNullable<T>>
> extends Omit<MenuRadioGroupProps<T>, 'dir' | 'onSelect'> {
  ui?: MenuUi;
  items: S[];
  groupLabelProps?: MenuGroupLabelProps;
  radioItemProps?: MenuRadioItemProps;
  indicatorProps?: MenuItemIndicatorProps;
  shortcutProps?: MenuShortcutProps;
  separatorProps?: MenuSeparatorProps;
}

export type MenuRadioSelectEmits<T extends MenuRadioOptionData = MenuRadioOptionData> = {
  select: [item: T, event: Event];
};
export type MenuRadioOptionsEmits<
  T extends DefinedValue = DefinedValue,
  S extends MenuRadioOptionData<T> = MenuRadioOptionData<T>
> = MenuRadioGroupEmits<T> & MenuRadioSelectEmits<S>;
