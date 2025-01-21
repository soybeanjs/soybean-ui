import type {
  AcceptableValue,
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
import type { SelectPosition, SelectSlots, ThemeSize } from '@soybean-ui/variants';

export interface SelectTriggerProps extends _SelectTriggerProps {
  size?: ThemeSize;
}

export interface SelectViewportProps extends _SelectViewportProps {
  position?: SelectPosition;
}

export interface SelectItemProps<T extends AcceptableValue = AcceptableValue> extends _SelectItemProps<T> {
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

export interface SelectOptionType<T extends AcceptableValue = AcceptableValue>
  extends Pick<SelectItemProps<T>, 'value' | 'disabled' | 'textValue'> {
  /**
   * The label to display in the dropdown.
   *
   * if `textValue` is not provided, this will be as the `textValue`.
   */
  label: string;
  /** whether to show a separator above this option */
  separator?: boolean;
}

export interface SelectGroupOptionType<T extends AcceptableValue = AcceptableValue>
  extends Pick<SelectOptionType, 'separator' | 'label'> {
  items: SelectOptionType<T>[];
}

export type SelectSingleOptionSlots = Extract<SelectSlots, 'item' | 'itemText' | 'itemIndicator' | 'separator'>;

export interface SelectSingleOptionProps<T extends AcceptableValue = AcceptableValue> {
  size?: ThemeSize;
  item: SelectOptionType<T>;
  ui?: Record<SelectSingleOptionSlots, ClassValue>;
}

export type SelectOptionSlots = Extract<
  SelectSlots,
  'group' | 'groupLabel' | 'item' | 'itemText' | 'itemIndicator' | 'separator'
>;

export interface SelectOptionProps<T extends AcceptableValue = AcceptableValue> {
  size?: ThemeSize;
  item: SelectOptionType<T> | SelectGroupOptionType<T>;
  ui?: Record<SelectOptionSlots, ClassValue>;
}

export type SelectProps<T extends AcceptableValue = AcceptableValue> = SelectRootProps<T> &
  Pick<SelectPortalProps, 'to'> &
  Omit<SelectContentProps, 'forceMount'> &
  SelectViewportProps & {
    size?: ThemeSize;
    items?: (SelectGroupOptionType<T> | SelectOptionType<T>)[];
    placeholder?: string;
    separator?: boolean;
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    forceMountContent?: boolean;
    ui?: Record<SelectSlots, ClassValue>;
  };

export type SelectEmits = SelectRootEmits & SelectContentEmits;

export type { SelectContentProps, SelectPosition, SelectContentEmits };
