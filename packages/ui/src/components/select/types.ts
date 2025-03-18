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

export interface SelectOptionData<T extends AcceptableValue = AcceptableValue>
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

export interface SelectGroupOptionData<T extends AcceptableValue = AcceptableValue>
  extends Pick<SelectOptionData, 'separator' | 'label'> {
  items: SelectOptionData<T>[];
}

export type SelectSingleOptionSlots = Extract<SelectSlots, 'item' | 'itemText' | 'itemIndicator' | 'separator'>;

export interface SelectSingleOptionProps<T extends AcceptableValue = AcceptableValue> {
  size?: ThemeSize;
  item: SelectOptionData<T>;
  ui?: Partial<Record<SelectSingleOptionSlots, ClassValue>>;
  separator?: boolean;
}

export type SelectOptionSlots = Extract<
  SelectSlots,
  'group' | 'groupLabel' | 'item' | 'itemText' | 'itemIndicator' | 'separator'
>;

export interface SelectOptionProps<T extends AcceptableValue = AcceptableValue> {
  size?: ThemeSize;
  item: SelectOptionData<T> | SelectGroupOptionData<T>;
  ui?: Partial<Record<SelectOptionSlots, ClassValue>>;
  separator?: boolean;
}

export type SelectUi = Partial<Record<SelectSlots, ClassValue>>;

export type SelectProps<T extends AcceptableValue = AcceptableValue> = SelectRootProps<T> &
  Pick<SelectPortalProps, 'to' | 'defer'> &
  Omit<SelectContentProps, 'forceMount'> &
  SelectViewportProps & {
    size?: ThemeSize;
    items?: (SelectGroupOptionData<T> | SelectOptionData<T>)[];
    placeholder?: string;
    separator?: boolean;
    disabledPortal?: boolean;
    forceMountPortal?: boolean;
    forceMountContent?: boolean;
    ui?: SelectUi;
  };

export type SelectEmits<T extends AcceptableValue = AcceptableValue> = SelectRootEmits<T> & SelectContentEmits;

export type { SelectContentProps, SelectPosition, SelectContentEmits };
