import type { Component } from 'vue';
import type {
  DropdownMenuCheckboxItemProps as $DropdownMenuCheckboxItemProps,
  DropdownMenuContentProps as $DropdownMenuContentProps,
  DropdownMenuItemIndicatorProps as $DropdownMenuItemIndicatorProps,
  DropdownMenuItemProps as $DropdownMenuItemProps,
  DropdownMenuRadioItemProps as $DropdownMenuRadioItemProps,
  DropdownMenuSubContentProps as $DropdownMenuSubContentProps,
  DropdownMenuSubTriggerProps as $DropdownMenuSubTriggerProps,
  DropdownMenuContentEmits,
  DropdownMenuPortalProps,
  DropdownMenuRootEmits,
  DropdownMenuRootProps,
  DropdownMenuSubProps
} from 'radix-vue';
import type { ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, FocusOutsideEvent, PointerDownOutsideEvent } from '../../types';

export type DropdownMenuLabelProps = {
  class?: ClassValue;
  size?: ThemeSize;
};

export type DropdownMenuContentProps = $DropdownMenuContentProps & {
  class?: ClassValue;
};

export type DropdownMenuSubContentProps = $DropdownMenuSubContentProps & {
  class?: ClassValue;
};

export type DropdownMenuItemProps = $DropdownMenuItemProps & {
  class?: ClassValue;
  size?: ThemeSize;
  iconClass?: ClassValue;
};

export type DropdownMenuSubTriggerProps = $DropdownMenuSubTriggerProps & {
  class?: ClassValue;
  size?: ThemeSize;
  triggerIconClass?: ClassValue;
};

export type DropdownMenuShortcutProps = {
  class?: ClassValue;
  size?: ThemeSize;
};

export type DropdownMenuSeparatorProps = {
  class?: ClassValue;
};

export type DropdownMenuWrapperProps = DropdownMenuRootProps &
  Pick<DropdownMenuPortalProps, 'to'> &
  Omit<DropdownMenuContentProps, 'as' | 'asChild' | 'forceMount' | 'class'> & {
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

type DropdownMenuOptionCommon = Pick<$DropdownMenuItemProps, 'disabled' | 'textValue'> & {
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
    subContentProps?: $DropdownMenuSubContentProps;
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

export type DropdownMenuCheckboxItemProps = $DropdownMenuCheckboxItemProps & {
  class?: ClassValue;
  size?: ThemeSize;
};

export type DropdownMenuItemIndicatorProps = $DropdownMenuItemIndicatorProps & {
  class?: ClassValue;
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

export type DropdownMenuCheckboxEmits = {
  'update:modelValue': [payload: string[], item: DropdownMenuCheckboxOption, action: CheckAction];
};

export type DropdownMenuRadioItemProps = $DropdownMenuRadioItemProps & {
  class?: ClassValue;
  size?: ThemeSize;
};

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
    };

export type DropdownMenuArrowProps = {
  class?: ClassValue;
};
