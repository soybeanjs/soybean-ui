import type {
  SelectContentEmits,
  SelectPortalProps,
  SelectRootEmits,
  SelectRootProps,
  SelectContentProps as _SelectContentProps,
  SelectItemProps as _SelectItemProps,
  SelectLabelProps as _SelectLabelProps,
  SelectTriggerProps as _SelectTriggerProps,
  SelectViewportProps as _SelectViewportProps
} from '@soybean-ui/primitive';
import type { SelectPosition, ThemeSize } from '@soybean-ui/variants';
import type { ClassValue, ClassValueProp } from '../../types';

export type SelectContentProps = ClassValueProp & Omit<_SelectContentProps, 'as' | 'asChild'>;

export type SelectTriggerProps = ClassValueProp &
  Pick<_SelectTriggerProps, 'disabled'> & {
    size?: ThemeSize;
  };

export type SelectViewportProps = ClassValueProp &
  Pick<_SelectViewportProps, 'nonce'> & {
    position?: SelectPosition;
  };

export type SelectItemProps = ClassValueProp &
  Omit<_SelectItemProps, 'as' | 'asChild'> & {
    size?: ThemeSize;
  };

export type SelectItemIndicatorProps = ClassValueProp & {
  size?: ThemeSize;
};

export type SelectIconProps = ClassValueProp & {
  size?: ThemeSize;
};

export type SelectSeparatorProps = ClassValueProp;

export type SelectLabelProps = ClassValueProp &
  Pick<_SelectLabelProps, 'for'> & {
    size?: ThemeSize;
  };

export type SelectScrollUpButtonProps = ClassValueProp & {
  size?: ThemeSize;
};

export type SelectScrollDownButtonProps = ClassValueProp & {
  size?: ThemeSize;
};

export type SelectOption = Pick<SelectItemProps, 'value' | 'disabled' | 'textValue'> & {
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
  items: SelectOption[];
  groupId?: string;
} & Pick<SelectOption, 'separator'>;

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

export type SelectItemOptionProps = {
  option: SelectOption;
} & Pick<SelectProps, 'size' | 'itemClass' | 'itemTextClass' | 'itemIndicatorClass' | 'separator' | 'separatorClass'>;

export type SelectEmits = SelectRootEmits & SelectContentEmits;

export type { SelectPosition, SelectContentEmits };
