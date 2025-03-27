import type { ComputedRef, Ref } from 'vue';
import type { ClassValueProp, Direction, FormFieldProps, PrimitiveProps } from '../../types';

export type AcceptableInputValue = string | Record<string, any>;

// Root
export interface TagsInputRootProps<T = AcceptableInputValue> extends ClassValueProp, FormFieldProps {
  /** The controlled value of the tags input. Can be bind as `v-model`. */
  modelValue?: Array<T> | null;
  /** The value of the tags that should be added. Use when you do not need to control the state of the tags input */
  defaultValue?: Array<T>;
  /** When `true`, allow adding tags on paste. Work in conjunction with delimiter prop. */
  addOnPaste?: boolean;
  /** When `true` allow adding tags on tab keydown */
  addOnTab?: boolean;
  /** When `true` allow adding tags blur input */
  addOnBlur?: boolean;
  /** When `true`, allow duplicated tags. */
  duplicate?: boolean;
  /** When `true`, prevents the user from interacting with the tags input. */
  disabled?: boolean;
  /**
   * The character or regular expression to trigger the addition of a new tag. Also used to split tags for `@paste`
   * event
   */
  delimiter?: string | RegExp;
  /**
   * The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** Maximum number of tags. */
  max?: number;
  id?: string;
  /** Convert the input value to the desired type. Mandatory when using objects as values and using `TagsInputInput` */
  convertValue?: (value: string) => T;
  /**
   * Display the value of the tag. Useful when you want to apply modifications to the value like adding a suffix or when
   * using object as values
   */
  displayValue?: (value: T) => string;
}
export type TagsInputRootPropsWithPrimitive<T = AcceptableInputValue> = TagsInputRootProps<T> & PrimitiveProps;

export type TagsInputRootEmits<T = AcceptableInputValue> = {
  /** Event handler called when the value changes */
  'update:modelValue': [payload: Array<T>];
  /** Event handler called when the value is invalid */
  invalid: [payload: T];
  /** Event handler called when tag is added */
  addTag: [payload: T];
  /** Event handler called when tag is removed */
  removeTag: [payload: T];
};

export type TagsInputRootContext<T = AcceptableInputValue> = {
  modelValue: Ref<Array<T>>;
  onAddValue: (payload: string) => boolean;
  onRemoveValue: (index: number) => void;
  onInputKeydown: (event: KeyboardEvent) => void;
  selectedElement: Ref<HTMLElement | undefined>;
  isInvalidInput: Ref<boolean>;
  addOnPaste: Ref<boolean>;
  addOnTab: Ref<boolean>;
  addOnBlur: Ref<boolean>;
  disabled: Ref<boolean>;
  delimiter: Ref<string | RegExp>;
  dir: Ref<Direction>;
  max: Ref<number>;
  id: Ref<string | undefined> | undefined;
  displayValue: (value: T) => string;
};

// Item
export interface TagsInputItemProps extends ClassValueProp {
  /** Value associated with the tags */
  value: AcceptableInputValue;
  /** When `true`, prevents the user from interacting with the tags input. */
  disabled?: boolean;
}
export type TagsInputItemPropsWithPrimitive = TagsInputItemProps & PrimitiveProps;

export interface TagsInputItemContext {
  value: Ref<AcceptableInputValue>;
  displayValue: ComputedRef<string>;
  isSelected: Ref<boolean>;
  disabled?: Ref<boolean>;
  textId: string;
}

// Input
export interface TagsInputInputProps extends ClassValueProp {
  /** The placeholder character to use for empty tags input. */
  placeholder?: string;
  /** Focus on element when mounted. */
  autoFocus?: boolean;
  /** Maximum number of character allowed. */
  maxLength?: number;
}
export type TagsInputInputPropsWithPrimitive = TagsInputInputProps & PrimitiveProps;

// ItemText
export interface TagsInputItemTextProps extends ClassValueProp {}
export type TagsInputItemTextPropsWithPrimitive = TagsInputItemTextProps & PrimitiveProps;

// ItemDelete
export interface TagsInputItemDeleteProps extends ClassValueProp {}
export type TagsInputItemDeletePropsWithPrimitive = TagsInputItemDeleteProps & PrimitiveProps;

// Clear
export interface TagsInputClearProps extends ClassValueProp {}
export type TagsInputClearPropsWithPrimitive = TagsInputClearProps & PrimitiveProps;
