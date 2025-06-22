import type { Component, VNode } from 'vue';
import type {
  ClassValue,
  DefinedValue,
  SelectArrowProps,
  SelectContentEmits,
  SelectContentProps,
  SelectGroupLabelProps,
  SelectGroupProps,
  SelectItemEmits,
  SelectItemIndicatorProps,
  SelectItemProps,
  SelectItemTextProps,
  SelectPortalProps,
  SelectRootEmits,
  SelectRootProps,
  SelectScrollDownButtonProps,
  SelectScrollUpButtonProps,
  SelectSeparatorProps,
  SelectSlot,
  SelectTriggerIconProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectViewportProps,
  SingleOrMultipleValue
} from '@headless';
import type { ThemeSize } from '@theme';

export interface SelectSingleOptionData<T extends DefinedValue = DefinedValue>
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

export interface SelectGroupOptionData<T extends DefinedValue = DefinedValue>
  extends Pick<SelectSingleOptionData, 'separator' | 'label'> {
  items: SelectSingleOptionData<T>[];
}

export type SelectOptionData<T extends DefinedValue = DefinedValue> =
  | SelectSingleOptionData<T>
  | SelectGroupOptionData<T>;

export interface SelectSingleOptionProps<T extends DefinedValue = DefinedValue> extends SelectItemProps<T> {
  item: SelectSingleOptionData<T>;
  itemTextProps?: SelectItemTextProps;
  itemIndicatorProps?: SelectItemIndicatorProps;
  separatorProps?: SelectSeparatorProps;
}

export type SelectSingleOptionEmits<T extends DefinedValue = DefinedValue> = SelectItemEmits<T>;

export interface SelectGroupOptionProps<T extends DefinedValue = DefinedValue> extends SelectGroupProps {
  item: SelectGroupOptionData<T>;
  groupLabelProps?: SelectGroupLabelProps;
  itemProps?: SelectItemProps;
  itemTextProps?: SelectItemTextProps;
  itemIndicatorProps?: SelectItemIndicatorProps;
  separatorProps?: SelectSeparatorProps;
}

export type SelectGroupOptionEmits<T extends DefinedValue = DefinedValue> = SelectItemEmits<T>;

export interface SelectOptionProps<T extends DefinedValue = DefinedValue> {
  item: SelectOptionData<T>;
  groupProps?: SelectGroupProps;
  groupLabelProps?: SelectGroupLabelProps;
  itemProps?: SelectItemProps;
  itemTextProps?: SelectItemTextProps;
  itemIndicatorProps?: SelectItemIndicatorProps;
  separatorProps?: SelectSeparatorProps;
}

export type SelectOptionEmits<T extends DefinedValue = DefinedValue> = SelectItemEmits<T>;

export type SelectUi = Partial<Record<SelectSlot, ClassValue>>;

export type GetSelectOptionValue<T> = T extends any[] ? T[number] : NonNullable<T>;

export interface SelectProps<
  T extends SingleOrMultipleValue = SingleOrMultipleValue,
  S extends SelectOptionData<GetSelectOptionValue<T>> = SelectOptionData<GetSelectOptionValue<T>>,
  M extends boolean = false
> extends SelectRootProps<T, M> {
  ui?: SelectUi;
  size?: ThemeSize;
  items: S[];
  showArrow?: boolean;
  triggerProps?: SelectTriggerProps;
  triggerIconProps?: SelectTriggerIconProps;
  valueProps?: SelectValueProps;
  portalProps?: SelectPortalProps;
  contentProps?: SelectContentProps;
  viewportProps?: SelectViewportProps;
  scrollDownButtonProps?: SelectScrollDownButtonProps;
  scrollUpButtonProps?: SelectScrollUpButtonProps;
  groupProps?: SelectGroupProps;
  groupLabelProps?: SelectGroupLabelProps;
  itemProps?: SelectItemProps;
  itemTextProps?: SelectItemTextProps;
  itemIndicatorProps?: SelectItemIndicatorProps;
  separatorProps?: SelectSeparatorProps;
  arrowProps?: SelectArrowProps;
}

export type SelectEmits<T extends SingleOrMultipleValue = SingleOrMultipleValue> = SelectRootEmits<T> &
  SelectContentEmits &
  SelectOptionEmits<GetSelectOptionValue<T>>;
