import type { Component, VNode } from 'vue';
import type {
  AcceptableValue,
  ClassValue,
  ClassValueProp,
  ComboboxContentEmits,
  ComboboxInputEmits,
  ComboboxItemEmits,
  ComboboxLabelProps,
  ComboboxRootEmits,
  ComboboxTriggerPropsWithPrimitive,
  SelectEvent,
  ComboboxAnchorProps as _ComboboxAnchorProps,
  ComboboxContentProps as _ComboboxContentProps,
  ComboboxEmptyProps as _ComboboxEmptyProps,
  ComboboxGroupProps as _ComboboxGroupProps,
  ComboboxInputProps as _ComboboxInputProps,
  ComboboxItemIndicatorProps as _ComboboxItemIndicatorProps,
  ComboboxItemProps as _ComboboxItemProps,
  ComboboxRootProps as _ComboboxRootProps,
  ComboboxSeparatorProps as _ComboboxSeparatorProps
} from '@soybean-ui/primitives';
import type { ComboboxMode, ComboboxSlots, ThemeSize } from '@soybean-ui/variants';
import type { InputProps } from '../input';

export interface ComboboxRootProps<T extends AcceptableValue = AcceptableValue> extends _ComboboxRootProps<T> {
  size?: ThemeSize;
}

export interface ComboboxAnchorProps extends _ComboboxAnchorProps {}

export interface ComboboxEmptyProps extends _ComboboxEmptyProps {
  size?: ThemeSize;
}

export interface ComboboxGroupProps extends _ComboboxGroupProps {}

export interface ComboboxGroupLabelProps extends ComboboxLabelProps {
  size?: ThemeSize;
}

export interface ComboboxInputProps extends _ComboboxInputProps, InputProps {
  size?: ThemeSize;
  mode?: ComboboxMode;
  wrapperClass?: ClassValue;
}

export interface ComboboxTriggerProps extends ComboboxTriggerPropsWithPrimitive {
  size?: ThemeSize;
  mode?: ComboboxMode;
}

export interface ComboboxSearchIconProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface ComboboxItemProps<T extends AcceptableValue = AcceptableValue> extends _ComboboxItemProps<T> {
  size?: ThemeSize;
}

export interface ComboboxContentProps extends _ComboboxContentProps {
  size?: ThemeSize;
}

export interface ComboboxListProps extends ClassValueProp {
  size?: ThemeSize;
}

export interface ComboboxSeparatorProps extends _ComboboxSeparatorProps {
  size?: ThemeSize;
}

export interface ComboboxItemIndicatorProps extends _ComboboxItemIndicatorProps {}

export interface ComboboxOptionData<T extends AcceptableValue = AcceptableValue>
  extends Pick<ComboboxItemProps<T>, 'value' | 'disabled'> {
  /** The label to display in the command. */
  label: string;
  /** The icon to display in the command. */
  icon?: Component | VNode;
  /** whether to show a separator above this option */
  separator?: boolean;
}

export interface ComboboxGroupOptionData<T extends AcceptableValue = AcceptableValue>
  extends Pick<ComboboxOptionData, 'separator' | 'label'> {
  items: ComboboxOptionData<T>[];
}

export type ComboboxSingleOptionSlots = Extract<ComboboxSlots, 'item' | 'itemIcon' | 'itemIndicator' | 'separator'>;

export interface ComboboxSingleOptionProps<T extends AcceptableValue = AcceptableValue> {
  size?: ThemeSize;
  item: ComboboxOptionData<T>;
  ui?: Partial<Record<ComboboxSingleOptionSlots, ClassValue>>;
}
export type ComboboxSingleOptionEmits<T extends AcceptableValue = AcceptableValue> = ComboboxItemEmits<T>;

export type ComboboxOptionSlots = Extract<ComboboxSlots, 'group' | 'groupLabel' | 'item' | 'itemIcon' | 'separator'>;

export interface ComboboxOptionProps<T extends AcceptableValue = AcceptableValue> {
  size?: ThemeSize;
  item: ComboboxOptionData<T> | ComboboxGroupOptionData<T>;
  ui?: Partial<Record<ComboboxOptionSlots, ClassValue>>;
}

export type ComboboxOptionEmits<T extends AcceptableValue = AcceptableValue> = {
  select: [item: ComboboxOptionData<T>, event: SelectEvent<T>];
};

export interface ComboboxProps<T extends AcceptableValue = AcceptableValue> extends ComboboxRootProps<T> {
  size?: ThemeSize;
  mode?: ComboboxMode;
  items: (ComboboxOptionData<T> | ComboboxGroupOptionData<T>)[];
  ui?: Partial<Record<ComboboxSlots, ClassValue>>;
  inputProps?: Omit<ComboboxInputProps, 'class' | 'size' | 'wrapperClass' | 'modelValue'>;
  inputModelValue?: string;
  /**
   * The label to display in the trigger.
   *
   * @default 'Select an option'
   */
  triggerLabel?: string;
  /**
   * The label to display when the combobox is empty.
   *
   * @default 'Nothing found.'
   */
  emptyLabel?: string;
}

export type ComboboxEmits<T extends AcceptableValue = AcceptableValue> = ComboboxRootEmits<T> &
  ComboboxOptionEmits<T> & {
    'update:inputModelValue': [string];
  };

export type { ComboboxRootEmits, ComboboxItemEmits, ComboboxContentEmits, ComboboxInputEmits };
