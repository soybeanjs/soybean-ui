import type { Component } from 'vue';
import type {
  DropdownMenuCheckboxItemEmits,
  DropdownMenuContentEmits,
  DropdownMenuPortalProps,
  DropdownMenuRadioGroupEmits,
  DropdownMenuRadioItemEmits,
  DropdownMenuRootEmits,
  DropdownMenuRootProps,
  DropdownMenuSubProps,
  DropdownMenuCheckboxItemProps as _DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps as _DropdownMenuContentProps,
  DropdownMenuItemIndicatorProps as _DropdownMenuItemIndicatorProps,
  DropdownMenuItemProps as _DropdownMenuItemProps,
  DropdownMenuRadioItemProps as _DropdownMenuRadioItemProps,
  DropdownMenuSubContentProps as _DropdownMenuSubContentProps,
  DropdownMenuSubTriggerProps as _DropdownMenuSubTriggerProps
} from 'radix-vue';
import type { MenuItemProps } from 'radix-vue/dist/Menu';
import type { ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp, FocusOutsideEvent, PointerDownOutsideEvent } from '../../types';

export type DropdownMenuLabelProps = ClassValueProp & {
  size?: ThemeSize;
};

export type DropdownMenuContentProps = ClassValueProp & Omit<_DropdownMenuContentProps, 'as' | 'asChild'>;

export type DropdownMenuSubContentProps = ClassValueProp & Omit<_DropdownMenuSubContentProps, 'as' | 'asChild'>;

type MenuItemImplProps = Pick<MenuItemProps, 'disabled' | 'textValue'>;

type MenuItemImplWithClassProps = ClassValueProp & MenuItemImplProps;

export type DropdownMenuItemProps = MenuItemImplWithClassProps & {
  size?: ThemeSize;
  iconClass?: ClassValue;
};

export type DropdownMenuSubTriggerProps = MenuItemImplWithClassProps & {
  size?: ThemeSize;
  triggerIconClass?: ClassValue;
};

export type DropdownMenuShortcutProps = ClassValueProp & {
  size?: ThemeSize;
};

export type DropdownMenuSeparatorProps = ClassValueProp;

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

type DropdownMenuOptionCommon = MenuItemImplProps & {
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
};

export type DropdownMenuItemOption = DropdownMenuOptionCommon & {
  /** The identifier for the option. */
  value: string;
  /** The shortcut to display next to the label. */
  shortcut?: string;
};

export type DropdownMenuSubOption<T extends DropdownMenuItemOption = DropdownMenuItemOption> =
  DropdownMenuOptionCommon &
    Pick<DropdownMenuSubProps, 'defaultOpen' | 'open'> & {
      /** The options to display in the sub-menu. */
      options: (DropdownMenuSubOption<T> | T)[];
    };

export type DropdownMenuGroupOption<T extends DropdownMenuItemOption = DropdownMenuItemOption> = Pick<
  DropdownMenuOptionCommon,
  'label' | 'separator'
> & {
  groupId: string;
  options: (DropdownMenuSubOption<T> | T)[];
};

export type DropdownMenuOptionType<T extends DropdownMenuItemOption = DropdownMenuItemOption> =
  | T
  | DropdownMenuSubOption<T>
  | DropdownMenuGroupOption<T>;

export type DropdownMenuProps<T extends DropdownMenuItemOption = DropdownMenuItemOption> = DropdownMenuWrapperProps &
  DropdownMenuCommonProps & {
    options: DropdownMenuOptionType<T>[];
    groupClass?: ClassValue;
    subTriggerClass?: ClassValue;
    subTriggerIconClass?: ClassValue;
    subContentClass?: ClassValue;
    /** if not provided, it will extend from `DropdownMenuContentProps` */
    subContentProps?: _DropdownMenuSubContentProps;
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

export type DropdownMenuCheckboxItemProps = MenuItemImplWithClassProps &
  Pick<_DropdownMenuCheckboxItemProps, 'checked'> & {
    size?: ThemeSize;
    indicatorClass?: ClassValue;
  };

export type DropdownMenuItemIndicatorProps = ClassValueProp &
  Pick<_DropdownMenuItemIndicatorProps, 'forceMount'> & {
    size?: ThemeSize;
  };

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

export type DropdownMenuRadioItemProps = MenuItemImplWithClassProps &
  Pick<_DropdownMenuRadioItemProps, 'value'> & {
    size?: ThemeSize;
    indicatorClass?: ClassValue;
    indicatorIconRootClass?: ClassValue;
    indicatorIconClass?: ClassValue;
  };

export type DropdownMenuRadioIndicatorIconRootProps = ClassValueProp;

export type DropdownMenuRadioIndicatorIconProps = ClassValueProp;

export type DropdownMenuRadioOption = DropdownMenuOptionCommon & {
  value: string;
  /** The shortcut to display next to the label. */
  shortcut?: string;
};

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

export type DropdownMenuArrowProps = ClassValueProp;

export type {
  DropdownMenuContentEmits,
  DropdownMenuCheckboxItemEmits,
  DropdownMenuRadioGroupEmits,
  DropdownMenuRadioItemEmits
};
