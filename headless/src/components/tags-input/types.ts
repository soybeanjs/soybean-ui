import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { CollectionItemData } from '../../composables';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export type TagsInputAcceptableValue = string | number | bigint | Record<string, unknown>;

export interface TagsInputRootProps<T = TagsInputAcceptableValue>
  extends FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  /** Id of the input element. */
  id?: string;
  /** The controlled value of the tags input. */
  modelValue?: T[];
  /** The uncontrolled default value of the tags input. */
  defaultValue?: T[];
  /** Whether to add tags on paste. */
  addOnPaste?: boolean;
  /** Whether to add tags on tab. */
  addOnTab?: boolean;
  /** Whether to add tags on blur. */
  addOnBlur?: boolean;
  /** Whether to allow duplicated tags. */
  duplicate?: boolean;
  /** Whether to disable the tags input. */
  disabled?: boolean;
  /** The delimiter used to add tags. */
  delimiter?: string | RegExp;
  /** The reading direction of the tags input. */
  dir?: Direction;
  /** Maximum number of tags. Set to 0 for unlimited. */
  max?: number;
  /** Convert the raw input string into the tag value. */
  convertValue?: (value: string) => T;
  /** Display the tag value. */
  displayValue?: (value: T) => string;
}

export type TagsInputRootEmits<T = TagsInputAcceptableValue> = {
  'update:modelValue': [value: T[]];
  invalid: [value: T];
  addTag: [value: T];
  removeTag: [value: T];
};

export interface TagsInputInputProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  id?: string;
  placeholder?: string;
  autofocus?: boolean;
  maxlength?: number;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-controls'?: string;
}

export interface TagsInputItemProps<T = TagsInputAcceptableValue>
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'value'> {
  /** Value associated with the tag. */
  value: T;
  /** Whether to disable the tag item. */
  disabled?: boolean;
}

export interface TagsInputItemTextProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface TagsInputItemDeleteProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface TagsInputClearProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export type TagsInputCollectionItemData = {
  value: TagsInputAcceptableValue;
};

export interface TagsInputRootContext
  extends PropsToContext<TagsInputRootProps, 'id' | 'addOnPaste' | 'addOnTab' | 'addOnBlur' | 'disabled' | 'delimiter' | 'max'> {
  modelValue: ShallowRef<TagsInputAcceptableValue[]>;
  selectedElement: ShallowRef<HTMLElement | undefined>;
  isInvalidInput: ShallowRef<boolean>;
  dir: ComputedRef<Direction>;
  displayValue: (value: TagsInputAcceptableValue) => string;
  onAddValue: (value: string) => boolean;
  onRemoveValue: (index: number) => void;
  onInputKeydown: (event: KeyboardEvent) => void;
  onClear: () => void;
  getItems: () => CollectionItemData<TagsInputCollectionItemData>[];
}

export interface TagsInputItemContext {
  value: ComputedRef<TagsInputAcceptableValue>;
  displayValue: ComputedRef<string>;
  isSelected: ComputedRef<boolean>;
  disabled: ComputedRef<boolean>;
  itemElement: ShallowRef<HTMLElement | undefined>;
  textId: ShallowRef<string>;
}

export type TagsInputUiSlot = 'root' | 'item' | 'itemText' | 'itemDelete' | 'input' | 'clear';

export type TagsInputUi = UiClass<TagsInputUiSlot>;
