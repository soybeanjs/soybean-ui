import type { ComputedRef } from 'vue';
import type {
  AcceptableBooleanValue,
  DefinedValue,
  KbdValue,
  LinkBaseProps,
  MenuCheckboxGroupEmits,
  MenuCheckboxGroupProps,
  MenuCheckboxItemProps,
  MenuGroupLabelProps,
  MenuGroupProps,
  MenuItemIndicatorProps,
  MenuItemProps,
  MenuPortalProps,
  MenuRadioGroupEmits,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuSeparatorProps,
  MenuSubContentEmits,
  MenuSubContentProps,
  MenuSubEmits,
  MenuSubProps,
  MenuSubTriggerProps,
  MenuUi,
  UiClass
} from '@soybeanjs/headless';
import type { LinkProps } from '../link/types';
import type { KbdProps } from '../kbd/types';
import type { IconValue } from '../icon/types';

export interface MenuOptionData<T = DefinedValue> extends Pick<MenuItemProps, 'disabled' | 'textValue'>, LinkBaseProps {
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
  icon?: IconValue;
  /** Whether to show a separator above this option. */
  separator?: boolean;
  /** The shortcut of the option. */
  shortcut?: KbdValue | KbdValue[];
  /** The children of the option. */
  children?: MenuOptionData<T>[];
}

export interface MenuShortcutProps extends Omit<KbdProps, 'value'> {}

export type MenuExtraUiSlot = 'subTriggerIcon' | 'itemLinkIcon' | 'shortcut';

export type MenuExtraUi = UiClass<MenuExtraUiSlot>;

export type MenuExtendedUi = MenuUi & MenuExtraUi;

export interface MenuOptionProps<T extends DefinedValue = DefinedValue> {
  item: MenuOptionData<T>;
  itemProps?: MenuItemProps;
  linkProps?: LinkProps;
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
  /**
   * The active value of the menu.
   */
  activeValue?: DefinedValue;
}

export type MenuOptionsEmits<T extends MenuOptionData = MenuOptionData> = MenuOptionEmits<T>;

export interface MenuCheckboxOptionData<T extends DefinedValue = DefinedValue> extends Omit<
  MenuOptionData<T>,
  'linkProps' | 'children'
> {}

export interface MenuCheckboxOptionsProps<
  T extends DefinedValue = DefinedValue,
  S extends MenuCheckboxOptionData<T> = MenuCheckboxOptionData<T>
> extends Omit<MenuCheckboxGroupProps<T>, 'dir' | 'onSelect'> {
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

export interface MenuRadioOptionData<T extends AcceptableBooleanValue = AcceptableBooleanValue> extends Omit<
  MenuOptionData<NonNullable<T>>,
  'linkProps' | 'children'
> {}

export interface MenuRadioOptionsProps<
  T extends AcceptableBooleanValue = AcceptableBooleanValue,
  S extends MenuRadioOptionData<T> = MenuRadioOptionData<T>
> extends Omit<MenuRadioGroupProps<T>, 'dir' | 'onSelect'> {
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
  T extends AcceptableBooleanValue = AcceptableBooleanValue,
  S extends MenuRadioOptionData<T> = MenuRadioOptionData<T>
> = MenuRadioGroupEmits<T> & MenuRadioSelectEmits<S>;

export interface MenuOptionsContextParams {
  activeValue: ComputedRef<DefinedValue | undefined>;
  activePaths: ComputedRef<DefinedValue[]>;
}
