import type {
  SelectContentProps as $SelectContentProps,
  SelectItemProps as $SelectItemProps,
  SelectLabelProps as $SelectLabelProps,
  SelectTriggerProps as $SelectTriggerProps,
  SelectViewportProps as $SelectViewportProps,
  SelectPortalProps,
  SelectRootProps
} from 'radix-vue';
import type { SelectPosition, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue } from '../../types';

export type SelectContentProps = $SelectContentProps & {
  class?: ClassValue;
};

export type SelectTriggerProps = $SelectTriggerProps & {
  class?: ClassValue;
  size?: ThemeSize;
};

export type SelectViewportProps = $SelectViewportProps & {
  class?: ClassValue;
  position?: SelectPosition;
};

export type SelectItemProps = $SelectItemProps & {
  class?: ClassValue;
  size?: ThemeSize;
};

export type SelectItemIndicatorProps = {
  class?: ClassValue;
  size?: ThemeSize;
};

export type SelectIconProps = {
  class?: ClassValue;
  size?: ThemeSize;
};

export type SelectSeparatorProps = {
  class?: ClassValue;
};

export type SelectLabelProps = $SelectLabelProps & {
  class?: ClassValue;
  size?: ThemeSize;
};

export type SelectScrollUpButtonProps = {
  class?: ClassValue;
  size?: ThemeSize;
};

export type SelectScrollDownButtonProps = {
  class?: ClassValue;
  size?: ThemeSize;
};

export type SelectOption = Pick<$SelectItemProps, 'value' | 'disabled' | 'textValue'> & {
  /**
   * The label to display in the dropdown.
   *
   * if `textValue` is not provided, this will be as the `textValue`.
   */
  label: string;
  /** whether to show a separator above this option */
  separator?: boolean;
};

export type SelectGroupOption = {
  label: string;
  options: SelectOption[];
  groupId?: string;
} & Pick<SelectOption, 'separator'>;

export type SelectProps = SelectRootProps &
  Pick<SelectPortalProps, 'to'> &
  Omit<SelectContentProps, 'as' | 'asChild' | 'forceMount' | 'class'> &
  Pick<SelectViewportProps, 'nonce'> & {
    options: (SelectOption | SelectGroupOption)[];
    size?: ThemeSize;
    placeholder?: string;
    separator?: boolean;
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
    separatorClass?: ClassValue;
    groupClass?: ClassValue;
    groupLabelClass?: ClassValue;
  };

export type SelectItemOptionProps = {
  option: SelectOption;
} & Pick<SelectProps, 'size' | 'itemClass' | 'itemTextClass' | 'itemIndicatorClass' | 'separator' | 'separatorClass'>;

export type { SelectPosition, ThemeSize };
