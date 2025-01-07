import type {
  ClassValue,
  ClassValueProp,
  SelectContentEmits,
  SelectContentProps,
  SelectPortalProps,
  SelectRootEmits,
  SelectRootProps,
  SelectItemProps as _SelectItemProps,
  SelectLabelProps as _SelectLabelProps,
  SelectTriggerProps as _SelectTriggerProps,
  SelectViewportProps as _SelectViewportProps
} from '@soybean-ui/primitives';
import type { SelectPosition, ThemeSize } from '@soybean-ui/variants';

export interface SelectTriggerProps extends _SelectTriggerProps {
  size?: ThemeSize;
}

export interface SelectViewportProps extends _SelectViewportProps {
  position?: SelectPosition;
}

export interface SelectItemProps extends _SelectItemProps {
  size?: ThemeSize;
}

export interface SelectItemIndicatorProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface SelectIconProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface SelectSeparatorProps extends ClassValueProp {}

export interface SelectLabelProps extends _SelectLabelProps {
  size?: ThemeSize;
}

export interface SelectScrollUpButtonProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface SelectScrollDownButtonProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface SelectOption extends Pick<SelectItemProps, 'value' | 'disabled' | 'textValue'> {
  /**
   * The label to display in the dropdown.
   *
   * if `textValue` is not provided, this will be as the `textValue`.
   */
  label: string;
  /** whether to show a separator above this option */
  separator?: boolean;
}

export interface SelectGroupOption extends Pick<SelectOption, 'separator'> {
  label: string;
  items: SelectOption[];
  groupId?: string;
}

export type SelectProps = SelectRootProps &
  Pick<SelectPortalProps, 'to'> &
  Omit<SelectContentProps, 'class' | 'forceMount'> &
  Pick<SelectViewportProps, 'nonce'> & {
    items: (SelectOption | SelectGroupOption)[];
    size?: ThemeSize;
    placeholder?: string;
    separator?: boolean;
    separatorClass?: ClassValue;
    triggerClass?: ClassValue;
    triggerIconClass?: ClassValue;
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    contentClass?: ClassValue;
    forceMountContent?: boolean;
    scrollUpButtonClass?: ClassValue;
    scrollDownButtonClass?: ClassValue;
    itemClass?: ClassValue;
    itemTextClass?: ClassValue;
    itemIndicatorClass?: ClassValue;
    groupClass?: ClassValue;
    groupLabelClass?: ClassValue;
  };

export interface SelectItemOptionProps
  extends Pick<
    SelectProps,
    'size' | 'itemClass' | 'itemTextClass' | 'itemIndicatorClass' | 'separator' | 'separatorClass'
  > {
  option: SelectOption;
}

export type SelectEmits = SelectRootEmits & SelectContentEmits;

export type { SelectContentProps, SelectPosition, SelectContentEmits };
