import type { HTMLAttributes } from 'vue';
import type {
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
  SelectTriggerIconProps,
  SelectTriggerProps,
  SelectUi,
  SelectValueProps,
  SelectViewportProps
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';
import type { IconValue } from '../icon/types';

export interface SelectSingleOptionData<T extends DefinedValue = DefinedValue>
  extends Pick<SelectItemProps, 'disabled' | 'textValue'> {
  value: T;
  /**
   * The icon of the dropdown item.
   *
   * if it is a string, it will be used as the icon name of the iconify.
   */
  icon?: IconValue;
  /** The label to display in the dropdown. */
  label: string;
  /** whether to show a separator above this option */
  separator?: boolean;
}

export interface SelectGroupOptionData<T extends DefinedValue = DefinedValue>
  extends Pick<SelectSingleOptionData<T>, 'separator' | 'label'> {
  items: SelectSingleOptionData<T>[];
}

export type SelectOptionData<T extends DefinedValue = DefinedValue> =
  | SelectSingleOptionData<T>
  | SelectGroupOptionData<T>;

export interface SelectSingleOptionProps<T extends DefinedValue = DefinedValue>
  extends /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect'> {
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

export interface SelectOptionProps<T extends DefinedValue = DefinedValue>
  extends /** @vue-ignore */ Omit<HTMLAttributes, 'onSelect'> {
  item: SelectOptionData<T>;
  groupProps?: SelectGroupProps;
  groupLabelProps?: SelectGroupLabelProps;
  itemProps?: SelectItemProps;
  itemTextProps?: SelectItemTextProps;
  itemIndicatorProps?: SelectItemIndicatorProps;
  separatorProps?: SelectSeparatorProps;
}

export type SelectOptionEmits<T extends DefinedValue = DefinedValue> = SelectItemEmits<T>;

export interface SelectProps<
  T extends DefinedValue = DefinedValue,
  M extends boolean = false,
  S extends SelectOptionData<T> = SelectOptionData<T>
> extends SelectRootProps<T, M> {
  ui?: Partial<SelectUi>;
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

export type SelectEmits<T extends DefinedValue = DefinedValue, M extends boolean = false> = SelectRootEmits<T, M> &
  SelectContentEmits &
  SelectOptionEmits<T>;
