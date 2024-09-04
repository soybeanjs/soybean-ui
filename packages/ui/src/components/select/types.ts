import type {
  SelectContentProps as $SelectContentProps,
  SelectItemProps as $SelectItemProps,
  SelectLabelProps as $SelectLabelProps,
  SelectTriggerProps as $SelectTriggerProps,
  SelectViewportProps as $SelectViewportProps,
  SelectPortalProps,
  SelectRootProps
} from 'radix-vue';
import type { ClassValue, SelectPosition, SelectSize } from '@soybean-ui/variants';
import type { PrimitivePropsWithClass } from '../../types';

export type SelectContentProps = $SelectContentProps & {
  class?: ClassValue;
};

export type SelectTriggerProps = $SelectTriggerProps & {
  class?: ClassValue;
  size?: SelectSize;
};

export type SelectViewportProps = $SelectViewportProps & {
  class?: ClassValue;
  position?: SelectPosition;
};

export type SelectItemProps = $SelectItemProps & {
  class?: ClassValue;
};

export type SelectItemIndicatorProps = PrimitivePropsWithClass;

export type SelectIconProps = PrimitivePropsWithClass & {
  size?: SelectSize;
};

export type SelectSeparatorProps = PrimitivePropsWithClass;

export type SelectLabelProps = $SelectLabelProps & {
  class?: ClassValue;
};

export type SelectScrollUpButtonProps = PrimitivePropsWithClass;

export type SelectScrollDownButtonProps = PrimitivePropsWithClass;

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
    size?: SelectSize;
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
} & Pick<SelectProps, 'itemClass' | 'itemTextClass' | 'itemIndicatorClass' | 'separator' | 'separatorClass'>;
