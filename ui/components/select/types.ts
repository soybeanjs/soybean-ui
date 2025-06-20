import type { Component, VNode } from 'vue';
import type {
  AcceptableValue,
  ClassValue,
  SelectArrowProps,
  SelectContentEmits,
  SelectContentProps,
  SelectGroupProps,
  SelectIconProps,
  SelectItemIndicatorProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectLabelProps,
  SelectPortalProps,
  SelectRootEmits,
  SelectRootProps,
  SelectScrollDownButtonProps,
  SelectScrollUpButtonProps,
  SelectSeparatorProps,
  SelectSlot,
  SelectTriggerProps,
  SelectViewportProps
} from '@headless';
import type { ThemeSize } from '@theme';

export interface SelectSingleOptionData<T extends AcceptableValue = AcceptableValue>
  extends Pick<SelectItemProps<T>, 'value' | 'disabled' | 'textValue'> {
  /**
   * The icon of the dropdown item.
   *
   * if it is a string, it will be used as the icon name of the iconify.
   */
  icon?: VNode | Component | string;
  /** The label to display in the dropdown. */
  label: string;
  /** whether to show a separator above this option */
  separator?: boolean;
}

export interface SelectGroupOptionData<T extends AcceptableValue = AcceptableValue>
  extends Pick<SelectSingleOptionData, 'separator' | 'label'> {
  items: SelectSingleOptionData<T>[];
}

export type SelectOptionData<T extends AcceptableValue = AcceptableValue> =
  | SelectSingleOptionData<T>
  | SelectGroupOptionData<T>;

export interface SelectSingleOptionProps<T extends AcceptableValue = AcceptableValue> extends SelectItemProps<T> {
  item: SelectSingleOptionData<T>;
  itemTextProps?: SelectItemTextProps;
  itemIndicatorProps?: SelectItemIndicatorProps;
  separatorProps?: SelectSeparatorProps;
}

export interface SelectGroupOptionProps<T extends AcceptableValue = AcceptableValue> extends SelectGroupProps {
  item: SelectGroupOptionData<T>;
  labelProps?: SelectLabelProps;
  itemTextProps?: SelectItemTextProps;
  itemIndicatorProps?: SelectItemIndicatorProps;
  separatorProps?: SelectSeparatorProps;
}

export type SelectUi = Partial<Record<SelectSlot, ClassValue>>;

export interface SelectProps<T extends AcceptableValue, S extends SelectOptionData<T>, M extends boolean>
  extends SelectRootProps<T, M> {
  ui?: SelectUi;
  size?: ThemeSize;
  items: S[];
  triggerProps?: SelectTriggerProps;
  iconProps?: SelectIconProps;
  portalProps?: SelectPortalProps;
  contentProps?: SelectContentProps;
  viewportProps?: SelectViewportProps;
  scrollDownButtonProps?: SelectScrollDownButtonProps;
  scrollUpButtonProps?: SelectScrollUpButtonProps;
  groupProps?: SelectGroupProps;
  labelProps?: SelectLabelProps;
  itemProps?: SelectItemProps;
  itemTextProps?: SelectItemTextProps;
  itemIndicatorProps?: SelectItemIndicatorProps;
  separatorProps?: SelectSeparatorProps;
  arrowProps?: SelectArrowProps;
}

export type SelectEmits<T extends AcceptableValue | NonNullable<AcceptableValue>[]> = SelectRootEmits<T> &
  SelectContentEmits;
