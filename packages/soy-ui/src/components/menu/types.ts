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
  MenuItemEmits,
  MenuPortalProps,
  MenuRadioItemEmits,
  MenuSubProps,
  PointerDownOutsideEvent,
  MenuCheckboxItemProps as _MenuCheckboxItemProps,
  MenuContentProps as _MenuContentProps,
  MenuItemIndicatorProps as _MenuItemIndicatorProps,
  MenuItemProps as _MenuItemProps,
  MenuLabelProps as _MenuLabelProps,
  MenuRadioItemProps as _MenuRadioItemProps,
  MenuSeparatorProps as _MenuSeparatorProps,
  MenuSubContentProps as _MenuSubContentProps,
  MenuSubTriggerProps as _MenuSubTriggerProps
} from '@soybean-ui/primitives';
import type { MenuSlots, ThemeSize } from '@soybean-ui/variants';
import type { LinkProps } from '../link';
import type { KeyboardKeyProps, KeyboardKeyValue } from '../keyboard-key';

// Label
export interface MenuLabelProps extends _MenuLabelProps {
  size?: ThemeSize;
  ui?: Pick<MenuUi, 'label' | 'itemIcon'>;
  /** The group label of the menu. */
  label: string;
  /** The icon to display prepended to the label. */
  icon?: Component;
}

// Item
export interface MenuItemProps extends _MenuItemProps {
  size?: ThemeSize;
  ui?: Pick<MenuUi, 'item' | 'itemIcon' | 'shortcut'>;
  /** The label of the menu. */
  label: string;
  /** The icon to display prepended to the label. */
  icon?: Component;
  /** The shortcut to display next to the label. */
  shortcut?: KeyboardKeyValue | KeyboardKeyValue[];
}

// ItemLink
export interface MenuItemLinkProps extends MenuItemProps, LinkProps {
  ui?: Pick<MenuUi, 'itemLink' | 'itemIcon' | 'itemLinkIcon'>;
  /** The group label of the menu. */
  label: string;
  /** The icon to display prepended to the label. */
  icon?: Component;
}
export type MenuItemLinkEmits = MenuItemEmits;

export interface MenuItemLinkIconProps extends ClassValueProp {
  size?: ThemeSize;
}

// Indicator
export interface MenuItemIndicatorProps extends _MenuItemIndicatorProps {
  size?: ThemeSize;
}

export interface MenuSeparatorProps extends _MenuSeparatorProps {
  size?: ThemeSize;
}

// SubTrigger
export interface MenuSubTriggerProps extends _MenuSubTriggerProps {
  size?: ThemeSize;
  ui?: Pick<MenuUi, 'subTrigger' | 'itemIcon' | 'subTriggerIcon'>;
  /** The group label of the menu. */
  label: string;
  /** The icon to display prepended to the label. */
  icon?: Component;
}

// MenuShortcut
export interface MenuShortcutProps<T extends KeyboardKeyValue | KeyboardKeyValue[] = KeyboardKeyValue>
  extends Omit<KeyboardKeyProps<T>, 'variant'> {}

export interface MenuContentProps extends _MenuContentProps {
  size?: ThemeSize;
}

export interface MenuSubContentProps extends _MenuSubContentProps {
  size?: ThemeSize;
}

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

export type MenuUi = Partial<Record<MenuSlots, ClassValue>>;

export interface MenuCommonProps {
  size?: ThemeSize;
  ui?: MenuUi;
  separator?: boolean;
}

export interface MenuPortalContentProps
  extends Pick<MenuPortalProps, 'to' | 'defer'>,
    Omit<MenuContentProps, 'forceMount'> {
  disabledPortal?: boolean;
  forceMountPortal?: boolean;
  forceMountContent?: boolean;
  showArrow?: boolean;
  arrowClass?: ClassValue;
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
  extends Pick<MenuPortalContentProps, 'to' | 'defer' | 'disabledPortal' | 'forceMountPortal'>,
    MenuCommonProps {
  item: MenuOptionData<T>;
  subContentProps?: MenuSubContentProps;
}

export type MenuOptionEmits<T extends AcceptableValue = AcceptableValue> = MenuSubEmits<T> &
  MenuSubContentEmits<T> & {
    select: [event: Event, item: MenuOptionData<T>];
  };

export interface MenuProps<T extends AcceptableValue = AcceptableValue>
  extends Omit<MenuPortalContentProps, 'arrowClass'>,
    Omit<MenuOptionProps, 'item'> {
  items?: MenuOptionData<T>[];
}
export type MenuEmits<T extends AcceptableValue = AcceptableValue> = MenuPortalContentEmits & MenuOptionEmits<T>;

// Checkbox
export interface MenuCheckboxItemProps extends _MenuCheckboxItemProps {
  size?: ThemeSize;
  ui?: Pick<MenuUi, 'checkboxItem' | 'itemIcon' | 'itemIndicator' | 'shortcut'>;
  /** The label of the menu. */
  label: string;
  /** The icon to display prepended to the label. */
  icon?: Component;
  /** The shortcut to display next to the label. */
  shortcut?: KeyboardKeyValue | KeyboardKeyValue[];
}
export interface MenuCheckboxGroupProps<T extends AcceptableValue = AcceptableValue> extends MenuCommonProps {
  class?: ClassValue;
  items?: MenuOptionData<T>[];
  modelValue?: T[] | null;
  defaultValue?: T[] | null;
}
export type MenuCheckboxGroupEmits<T extends AcceptableValue = AcceptableValue> = {
  'update:modelValue': [payload: T[], item: MenuOptionData<T>, action: CheckAction];
};
export interface MenuCheckboxProps<T extends AcceptableValue = AcceptableValue>
  extends MenuPortalContentProps,
    Omit<MenuCheckboxGroupProps<T>, 'class'> {}
export type MenuCheckboxEmits<T extends AcceptableValue = AcceptableValue> = MenuPortalContentEmits &
  MenuCheckboxGroupEmits<T>;

// Radio
export interface MenuRadioItemProps extends _MenuRadioItemProps {
  size?: ThemeSize;
  ui?: Pick<MenuUi, 'radioItem' | 'radioIndicatorIcon' | 'itemIcon' | 'itemIndicator' | 'shortcut'>;
  /** The label of the menu. */
  label: string;
  /** The icon to display prepended to the label. */
  icon?: Component;
  /** The shortcut to display next to the label. */
  shortcut?: KeyboardKeyValue | KeyboardKeyValue[];
}
export interface MenuRadioGroupProps<T extends AcceptableValue = AcceptableValue> extends MenuCommonProps {
  class?: ClassValue;
  items?: MenuOptionData<T>[];
  modelValue?: T | null;
  defaultValue?: T | null;
}
export type MenuRadioGroupEmits<T extends AcceptableValue = AcceptableValue> = {
  'update:modelValue': [payload: T];
};
export interface MenuRadioProps<T extends AcceptableValue = AcceptableValue>
  extends MenuPortalContentProps,
    Omit<MenuRadioGroupProps<T>, 'class'> {}
export type MenuRadioEmits<T extends AcceptableValue = AcceptableValue> = MenuPortalContentEmits &
  MenuRadioGroupEmits<T>;

export type {
  MenuPortalProps,
  MenuContentEmits,
  MenuItemEmits,
  MenuCheckboxItemEmits,
  MenuRadioItemEmits,
  MenuArrowProps,
  MenuSubProps
};
