import type { Component } from 'vue';
import type {
  ClassValue,
  ClassValueProp,
  DropdownMenuArrowProps,
  DropdownMenuCheckboxItemEmits,
  DropdownMenuContentEmits,
  DropdownMenuContentProps,
  DropdownMenuPortalProps,
  DropdownMenuRadioGroupEmits,
  DropdownMenuRadioItemEmits,
  DropdownMenuRootEmits,
  DropdownMenuRootProps,
  DropdownMenuSubContentProps,
  DropdownMenuSubProps,
  MenuItemImplProps,
  DropdownMenuCheckboxItemProps as _DropdownMenuCheckboxItemProps,
  DropdownMenuItemIndicatorProps as _DropdownMenuItemIndicatorProps,
  DropdownMenuItemProps as _DropdownMenuItemProps,
  DropdownMenuLabelProps as _DropdownMenuLabelProps,
  DropdownMenuRadioItemProps as _DropdownMenuRadioItemProps,
  DropdownMenuSubTriggerProps as _DropdownMenuSubTriggerProps
} from '@soybean-ui/primitive';
import type { ThemeSize } from '@soybean-ui/variants';

export interface DropdownMenuLabelProps extends _DropdownMenuLabelProps {
  size?: ThemeSize;
}

export interface DropdownMenuItemProps extends MenuItemImplProps {
  size?: ThemeSize;
  iconClass?: ClassValue;
}

export interface DropdownMenuSubTriggerProps extends _DropdownMenuSubTriggerProps {
  size?: ThemeSize;
  triggerIconClass?: ClassValue;
}

export interface DropdownMenuShortcutProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface DropdownMenuSeparatorProps extends ClassValueProp {}

export type DropdownMenuWrapperProps = DropdownMenuRootProps &
  Pick<DropdownMenuPortalProps, 'to'> &
  Omit<DropdownMenuContentProps, 'class' | 'forceMount'> & {
    size?: ThemeSize;
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    contentClass?: ClassValue;
    forceMountContent?: boolean;
    showArrow?: boolean;
  };

export type DropdownMenuWrapperEmits = DropdownMenuRootEmits & DropdownMenuContentEmits;

export type DropdownMenuCommonProps = {
  separator?: boolean;
  groupLabelClass?: ClassValue;
  itemClass?: ClassValue;
  itemIconClass?: ClassValue;
  separatorClass?: ClassValue;
  shortcutClass?: ClassValue;
};

export interface DropdownMenuOptionCommon extends Omit<MenuItemImplProps, 'class'> {
  /**
   * The label to display in the dropdown.
   *
   * if `textValue` is not provided, this will be as the `textValue`.
   */
  label: string;
  /** whether to show a separator above this option */
  separator?: boolean;
  /** The icon to display prepended to the label. */
  icon?: Component;
}

export type DropdownMenuItemOption = DropdownMenuOptionCommon & {
  /** The identifier for the option. */
  value: string;
  /** The shortcut to display next to the label. */
  shortcut?: string;
};

export type DropdownMenuSubOption<T extends DropdownMenuItemOption = DropdownMenuItemOption> =
  DropdownMenuOptionCommon &
    Pick<DropdownMenuSubProps, 'defaultOpen' | 'open'> & {
      /** The items to display in the sub-menu. */
      items: (DropdownMenuSubOption<T> | T)[];
    };

export type DropdownMenuGroupOption<T extends DropdownMenuItemOption = DropdownMenuItemOption> = Pick<
  DropdownMenuOptionCommon,
  'label' | 'separator'
> & {
  groupId: string;
  items: (DropdownMenuSubOption<T> | T)[];
};

export type DropdownMenuOptionType<T extends DropdownMenuItemOption = DropdownMenuItemOption> =
  | T
  | DropdownMenuSubOption<T>
  | DropdownMenuGroupOption<T>;

export type DropdownMenuProps<T extends DropdownMenuItemOption = DropdownMenuItemOption> = DropdownMenuWrapperProps &
  DropdownMenuCommonProps & {
    items: DropdownMenuOptionType<T>[];
    groupClass?: ClassValue;
    subTriggerClass?: ClassValue;
    subTriggerIconClass?: ClassValue;
    subContentClass?: ClassValue;
    /** if not provided, it will extend from `DropdownMenuContentProps` */
    subContentProps?: DropdownMenuSubContentProps;
  };

export type DropdownMenuOptionProps<T extends DropdownMenuItemOption = DropdownMenuItemOption> = {
  option: DropdownMenuOptionType<T>;
} & Pick<
  DropdownMenuProps,
  | 'to'
  | 'size'
  | 'separator'
  | 'disabledPortal'
  | 'forceMountPortal'
  | 'groupClass'
  | 'groupLabelClass'
  | 'subTriggerClass'
  | 'subTriggerIconClass'
  | 'subContentClass'
  | 'subContentProps'
  | 'itemClass'
  | 'itemIconClass'
  | 'separatorClass'
  | 'shortcutClass'
>;

export type DropdownMenuSubEmits<T extends DropdownMenuItemOption = DropdownMenuItemOption> = {
  'update:subOpen': [payload: boolean, item: DropdownMenuSubOption<T>];
};

type FocusOutsideEvent = CustomEvent<{
  originalEvent: FocusEvent;
}>;

type PointerDownOutsideEvent = CustomEvent<{
  originalEvent: PointerEvent;
}>;

export type DropdownMenuSubContentEmits<T extends DropdownMenuItemOption = DropdownMenuItemOption> = {
  closeAutoFocusSub: [event: Event, item: DropdownMenuSubOption<T>];
  entryFocusSub: [event: Event, item: DropdownMenuSubOption<T>];
  escapeKeyDownSub: [event: KeyboardEvent, item: DropdownMenuSubOption<T>];
  focusOutsideSub: [event: FocusOutsideEvent, item: DropdownMenuSubOption<T>];
  interactOutsideSub: [event: FocusOutsideEvent | PointerDownOutsideEvent, item: DropdownMenuSubOption<T>];
  openAutoFocusSub: [event: Event, item: DropdownMenuSubOption<T>];
  pointerDownOutsideSub: [event: PointerDownOutsideEvent, item: DropdownMenuSubOption<T>];
};

export type DropdownMenuItemEmits<T extends DropdownMenuItemOption = DropdownMenuItemOption> = {
  select: [item: T, event: Event];
};

export type DropdownMenuOptionEmits<T extends DropdownMenuItemOption = DropdownMenuItemOption> =
  DropdownMenuSubEmits<T> & DropdownMenuSubContentEmits<T> & DropdownMenuItemEmits<T>;

export type DropdownMenuEmits<T extends DropdownMenuItemOption = DropdownMenuItemOption> = DropdownMenuWrapperEmits &
  DropdownMenuOptionEmits<T>;

export interface DropdownMenuCheckboxItemProps extends _DropdownMenuCheckboxItemProps {
  size?: ThemeSize;
  indicatorClass?: ClassValue;
}

export interface DropdownMenuItemIndicatorProps extends _DropdownMenuItemIndicatorProps {
  size?: ThemeSize;
}

export type DropdownMenuCheckboxOption = DropdownMenuOptionCommon & {
  value: string;
  /** The shortcut to display next to the label. */
  shortcut?: string;
};

export type DropdownMenuCheckboxProps<T extends DropdownMenuCheckboxOption = DropdownMenuCheckboxOption> =
  DropdownMenuWrapperProps &
    DropdownMenuCommonProps & {
      items?: T[] | null;
      modelValue?: string[] | null;
      defaultValue?: string[] | null;
      groupLabel?: string;
      groupSeparator?: boolean;
    };

export type CheckAction = 'check' | 'uncheck';

export type DropdownMenuCheckboxGroupEmits = {
  'update:modelValue': [payload: string[], item: DropdownMenuCheckboxOption, action: CheckAction];
};

export type DropdownMenuCheckboxEmits = DropdownMenuWrapperEmits & DropdownMenuCheckboxGroupEmits;

export interface DropdownMenuRadioItemProps extends _DropdownMenuRadioItemProps {
  size?: ThemeSize;
  indicatorClass?: ClassValue;
  indicatorIconRootClass?: ClassValue;
  indicatorIconClass?: ClassValue;
}

export interface DropdownMenuRadioIndicatorIconRootProps extends ClassValueProp {}

export interface DropdownMenuRadioIndicatorIconProps extends ClassValueProp {}

export interface DropdownMenuRadioOption extends DropdownMenuOptionCommon {
  value: string;
  /** The shortcut to display next to the label. */
  shortcut?: string;
}

export type DropdownMenuRadioProps<T extends DropdownMenuRadioOption = DropdownMenuRadioOption> =
  DropdownMenuWrapperProps &
    DropdownMenuCommonProps & {
      items?: T[] | null;
      modelValue?: string | null;
      defaultValue?: string | null;
      groupLabel?: string;
      groupSeparator?: boolean;
      indicatorClass?: ClassValue;
      indicatorIconRootClass?: ClassValue;
      indicatorIconClass?: ClassValue;
    };

export type DropdownMenuRadioEmits = DropdownMenuWrapperEmits & DropdownMenuRadioGroupEmits;

export type {
  DropdownMenuContentEmits,
  DropdownMenuCheckboxItemEmits,
  DropdownMenuRadioGroupEmits,
  DropdownMenuRadioItemEmits,
  DropdownMenuContentProps,
  DropdownMenuSubContentProps,
  DropdownMenuArrowProps
};
