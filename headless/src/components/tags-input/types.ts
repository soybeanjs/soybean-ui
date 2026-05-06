import type { ComputedRef, ShallowRef } from 'vue';
import type { CollectionItemData } from '../../composables';
import type { BaseProps, Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Type information for TagsInputAcceptableValue.
 */
export type TagsInputAcceptableValue = string | number | bigint | Record<string, unknown>;

/**
 * Properties for the TagsInputRoot component.
 */
export interface TagsInputRootProps<T = TagsInputAcceptableValue> extends FormFieldCommonProps, BaseProps {
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

/**
 * Events for the TagsInputRoot component.
 */
export type TagsInputRootEmits<T = TagsInputAcceptableValue> = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: T[]];
  /**
   * Emitted when invalid occurs.
   */
  invalid: [value: T];
  /**
   * Emitted when add tag occurs.
   */
  addTag: [value: T];
  /**
   * Emitted when remove tag occurs.
   */
  removeTag: [value: T];
};

/**
 * Properties for the TagsInputInput component.
 */
export interface TagsInputInputProps extends PrimitiveProps, BaseProps {
  /**
   * Id.
   */
  id?: string;
  /**
   * Placeholder.
   */
  placeholder?: string;
  /**
   * Whether autofocus.
   */
  autofocus?: boolean;
  /**
   * Maxlength.
   */
  maxlength?: number;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Aria label.
   */
  'aria-label'?: string;
  /**
   * Aria controls.
   */
  'aria-controls'?: string;
}

/**
 * Properties for the TagsInputItem component.
 */
export interface TagsInputItemProps<T = TagsInputAcceptableValue> extends PrimitiveProps, Omit<BaseProps, 'value'> {
  /** Value associated with the tag. */
  value: T;
  /** Whether to disable the tag item. */
  disabled?: boolean;
}

/**
 * Properties for the TagsInputItemText component.
 */
export interface TagsInputItemTextProps extends PrimitiveProps, BaseProps {}

/**
 * Properties for the TagsInputItemDelete component.
 */
export interface TagsInputItemDeleteProps extends PrimitiveProps, BaseProps {}

/**
 * Properties for the TagsInputClear component.
 */
export interface TagsInputClearProps extends PrimitiveProps, BaseProps {}

/**
 * Type information for TagsInputCollectionItemData.
 */
export type TagsInputCollectionItemData = {
  /**
   * Value associated with the current item.
   */
  value: TagsInputAcceptableValue;
};

/**
 * Context for the TagsInputRoot component.
 */
export interface TagsInputRootContext extends PropsToContext<
  TagsInputRootProps,
  'id' | 'addOnPaste' | 'addOnTab' | 'addOnBlur' | 'disabled' | 'delimiter' | 'max'
> {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<TagsInputAcceptableValue[]>;
  /**
   * Selected element used by the component context.
   */
  selectedElement: ShallowRef<HTMLElement | undefined>;
  /**
   * Whether an invalid input.
   */
  isInvalidInput: ShallowRef<boolean>;
  /**
   * Reading direction of the component.
   */
  dir: ComputedRef<Direction>;
  /**
   * Display value used by the component context.
   */
  displayValue: (value: TagsInputAcceptableValue) => string;
  /**
   * Callback invoked when the add value event fires.
   */
  onAddValue: (value: string) => boolean;
  /**
   * Callback invoked when the remove value event fires.
   */
  onRemoveValue: (index: number) => void;
  /**
   * Callback invoked when the input keydown event fires.
   */
  onInputKeydown: (event: KeyboardEvent) => void;
  /**
   * Callback invoked when the clear event fires.
   */
  onClear: () => void;
  /**
   * Get items used by the component context.
   */
  getItems: () => CollectionItemData<TagsInputCollectionItemData>[];
}

/**
 * Context for the TagsInputItem component.
 */
export interface TagsInputItemContext {
  /**
   * Value associated with the current item.
   */
  value: ComputedRef<TagsInputAcceptableValue>;
  /**
   * Display value used by the component context.
   */
  displayValue: ComputedRef<string>;
  /**
   * Whether a selected.
   */
  isSelected: ComputedRef<boolean>;
  /**
   * Whether the component is disabled.
   */
  disabled: ComputedRef<boolean>;
  /**
   * Item element used by the component context.
   */
  itemElement: ShallowRef<HTMLElement | undefined>;
  /**
   * Text id used by the component context.
   */
  textId: ShallowRef<string>;
}

/**
 * Available UI slots for the TagsInput component.
 */
export type TagsInputUiSlot = 'root' | 'item' | 'itemText' | 'itemDelete' | 'input' | 'clear';

/**
 * UI class overrides for the TagsInput component.
 */
export type TagsInputUi = UiClass<TagsInputUiSlot>;
