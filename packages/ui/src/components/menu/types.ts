import type { Component } from 'vue';
import type {
  AcceptableValue,
  CheckAction,
  ClassValue,
  ClassValueProp,
  FocusOutsideEvent,
  MenuArrowProps,
  MenuCheckboxItemEmits,
  MenuContentEmits,
  MenuContentProps,
  MenuItemEmits,
  MenuPortalProps,
  MenuRadioItemEmits,
  MenuSeparatorProps,
  MenuSubContentProps,
  MenuSubProps,
  PointerDownOutsideEvent,
  MenuCheckboxItemProps as _MenuCheckboxItemProps,
  MenuItemIndicatorProps as _MenuItemIndicatorProps,
  MenuItemProps as _MenuItemProps,
  MenuLabelProps as _MenuLabelProps,
  MenuRadioItemProps as _MenuRadioItemProps,
  MenuSubTriggerProps as _MenuSubTriggerProps
} from '@soybean-ui/primitive';
import type { ThemeSize } from '@soybean-ui/variants';
import type { LinkProps } from '../link';
import type { KeyboardKeyProps, KeyboardKeyValue } from '../keyboard-key';

// Label
export interface MenuLabelProps extends _MenuLabelProps {
  size?: ThemeSize;
}

// Item
export interface MenuItemProps extends _MenuItemProps {
  size?: ThemeSize;
}

// ItemLink
export interface MenuItemLinkProps extends MenuItemProps, LinkProps {}
export type MenuItemLinkEmits = MenuItemEmits;

export interface MenuItemLinkIconProps extends ClassValueProp {
  size?: ThemeSize;
}

// Indicator
export interface MenuItemIndicatorProps extends _MenuItemIndicatorProps {
  size?: ThemeSize;
}

// SubTrigger
export interface MenuSubTriggerProps extends _MenuSubTriggerProps {
  size?: ThemeSize;
  triggerIconClass?: ClassValue;
}

// MenuShortcut
export interface MenuShortcutProps<T extends KeyboardKeyValue | KeyboardKeyValue[] = KeyboardKeyValue>
  extends Omit<KeyboardKeyProps<T>, 'variant'> {}

// MenuOptionData
export interface MenuOptionData<T extends AcceptableValue = AcceptableValue>
  extends Pick<MenuItemProps, 'disabled' | 'textValue'>,
    Pick<MenuSubProps, 'defaultOpen' | 'open'> {
  /** The label to display in the menu. */
  label: string;
  /** The identifier for the option. */
  value: T;
  /**
   * whether is group label
   *
   * if true, the option will be a group label.
   */
  isGroupLabel?: boolean;
  /** whether to show a separator above this option */
  separator?: boolean;
  /** The icon to display prepended to the label. */
  icon?: Component;
  /** The shortcut to display next to the label. */
  shortcut?: KeyboardKeyValue | KeyboardKeyValue[];
  /**
   * The link props
   *
   * if provided, the option will be a link.
   */
  linkProps?: LinkProps;
  /**
   * The children of the option.
   *
   * only works when it is option.
   */
  children?: MenuOptionData<T>[];
}

export interface MenuCommonProps {
  size?: ThemeSize;
  separator?: boolean;
  groupLabelClass?: ClassValue;
  itemClass?: ClassValue;
  itemIconClass?: ClassValue;
  itemLinkClass?: ClassValue;
  itemLinkIconClass?: ClassValue;
  separatorClass?: ClassValue;
  shortcutClass?: ClassValue;
}

export interface MenuPortalContentProps
  extends Pick<MenuPortalProps, 'to'>,
    Omit<MenuContentProps, 'class' | 'forceMount'> {
  disabledPortal?: boolean;
  forceMountPortal?: boolean;
  contentClass?: ClassValue;
  forceMountContent?: boolean;
  showArrow?: boolean;
}
export type MenuPortalContentEmits = MenuContentEmits;

export type MenuSubEmits<T extends AcceptableValue = AcceptableValue> = {
  'update:subOpen': [payload: boolean, item: MenuOptionData<T>];
};
export type MenuSubContentEmits<T extends AcceptableValue = AcceptableValue> = {
  closeAutoFocusSub: [event: Event, item: MenuOptionData<T>];
  entryFocusSub: [event: Event, item: MenuOptionData<T>];
  escapeKeyDownSub: [event: KeyboardEvent, item: MenuOptionData<T>];
  focusOutsideSub: [event: FocusOutsideEvent, item: MenuOptionData<T>];
  interactOutsideSub: [event: FocusOutsideEvent | PointerDownOutsideEvent, item: MenuOptionData<T>];
  openAutoFocusSub: [event: Event, item: MenuOptionData<T>];
  pointerDownOutsideSub: [event: PointerDownOutsideEvent, item: MenuOptionData<T>];
};

export interface MenuOptionProps<T extends AcceptableValue = AcceptableValue>
  extends Pick<MenuPortalContentProps, 'to' | 'disabledPortal' | 'forceMountPortal'>,
    MenuCommonProps {
  item: MenuOptionData<T>;
  groupClass?: ClassValue;
  subContentClass?: ClassValue;
  subContentProps?: MenuSubContentProps;
  subTriggerClass?: ClassValue;
  subTriggerIconClass?: ClassValue;
}

export type MenuOptionEmits<T extends AcceptableValue = AcceptableValue> = MenuSubEmits<T> &
  MenuSubContentEmits<T> & {
    select: [event: Event, item: MenuOptionData<T>];
  };

export interface MenuProps<T extends AcceptableValue = AcceptableValue>
  extends MenuPortalContentProps,
    Omit<MenuOptionProps, 'item'> {
  items?: MenuOptionData<T>[];
}
export type MenuEmits<T extends AcceptableValue = AcceptableValue> = MenuPortalContentEmits & MenuOptionEmits<T>;

// Checkbox
export interface MenuCheckboxItemProps extends _MenuCheckboxItemProps {
  size?: ThemeSize;
  indicatorClass?: ClassValue;
}
export interface MenuCheckboxGroupProps<T extends AcceptableValue = AcceptableValue> extends MenuCommonProps {
  class?: ClassValue;
  items?: MenuOptionData<T>[];
  modelValue?: T[] | null;
  defaultValue?: T[] | null;
  itemIndicatorClass?: ClassValue;
}
export type MenuCheckboxGroupEmits<T extends AcceptableValue = AcceptableValue> = {
  'update:modelValue': [payload: T[], item: MenuOptionData<T>, action: CheckAction];
};
export interface MenuCheckboxProps<T extends AcceptableValue = AcceptableValue>
  extends MenuPortalContentProps,
    Omit<MenuCheckboxGroupProps<T>, 'class'> {
  groupClass?: ClassValue;
}
export type MenuCheckboxEmits<T extends AcceptableValue = AcceptableValue> = MenuPortalContentEmits &
  MenuCheckboxGroupEmits<T>;

// Radio
export interface MenuRadioItemProps extends _MenuRadioItemProps {
  size?: ThemeSize;
  indicatorClass?: ClassValue;
}
export interface MenuRadioGroupProps<T extends AcceptableValue = AcceptableValue> extends MenuCommonProps {
  class?: ClassValue;
  items?: MenuOptionData<T>[];
  modelValue?: T | null;
  defaultValue?: T | null;
  itemIndicatorClass?: ClassValue;
}
export type MenuRadioGroupEmits<T extends AcceptableValue = AcceptableValue> = {
  'update:modelValue': [payload: T];
};
export interface MenuRadioProps<T extends AcceptableValue = AcceptableValue>
  extends MenuPortalContentProps,
    Omit<MenuRadioGroupProps<T>, 'class'> {
  groupClass?: ClassValue;
}
export type MenuRadioEmits<T extends AcceptableValue = AcceptableValue> = MenuPortalContentEmits &
  MenuRadioGroupEmits<T>;

export type {
  MenuPortalProps,
  MenuContentProps,
  MenuContentEmits,
  MenuSubContentProps,
  MenuItemEmits,
  MenuCheckboxItemEmits,
  MenuRadioItemEmits,
  MenuArrowProps,
  MenuSeparatorProps,
  MenuSubProps
};
