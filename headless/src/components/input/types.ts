import type { HTMLAttributes, InputHTMLAttributes, ShallowRef } from 'vue';
import type { FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { ButtonProps } from '../button/types';

/**
 * Properties for the input base component.
 */
export interface InputBaseProps {
  /** Id of the input element */
  id?: string;
  /** When `true`, the input is auto-focused. */
  autofocus?: boolean;
  /** When `true`, prevents the user from interacting with the input. */
  disabled?: boolean;
  /** The maximum number of characters allowed in the input */
  maxlength?: number;
  /** The minimum number of characters allowed in the input */
  minlength?: number;
  /** The pattern attribute of the input */
  pattern?: string;
  /** The placeholder of the input */
  placeholder?: string;
  /** When `true`, the input is read-only. */
  readonly?: boolean;
}

/**
 * Properties for the input root component.
 */
export interface InputRootProps extends InputBaseProps, FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  /** The default value of the input */
  defaultValue?: string;
  /** The controlled value of the input */
  modelValue?: string;
}

/**
 * Events for the input root component.
 */
export type InputRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [value: string];
};

/**
 * Properties for the input control component.
 */
export interface InputControlProps extends /** @vue-ignore */ InputHTMLAttributes {}

/**
 * Context for the input root component.
 */
export interface InputRootContext extends PropsToContext<InputBaseProps & FormFieldCommonProps> {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<string | undefined>;
  /**
   * Clear handler.
   */
  onClear: () => void;
}

/**
 * Properties for the input clear component.
 */
export interface InputClearProps extends ButtonProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Events for the input clear component.
 */
export type InputClearEmits = {
  /**
   * Emitted when the clear button is clicked.
   */
  clear: [event: PointerEvent];
};

/**
 * Available UI slots for the input component.
 */
export type InputUiSlot = 'root' | 'control' | 'clearable';

/**
 * UI class overrides for the input component.
 */
export type InputUi = UiClass<InputUiSlot>;

/**
 * Slot properties for the input compact component.
 */
export interface InputCompactSlotProps {
  /**
   * Current model value.
   */
  modelValue?: string;
  /**
   * Clear handler.
   */
  clear: () => void;
}

/**
 * Properties for the input compact component.
 */
export interface InputCompactProps extends InputRootProps {
  /**
   * Whether to show the clear trigger.
   *
   * @defaultValue false
   */
  clearable?: boolean;
  /**
   * The function to set the input element.
   */
  inputRef?: (el: HTMLInputElement) => void;
  /**
   * Properties forwarded to the control element.
   */
  controlProps?: InputControlProps;
  /**
   * Properties forwarded to the clear element.
   */
  clearProps?: InputClearProps;
}

/**
 * Events for the input compact component.
 */
export type InputCompactEmits = InputRootEmits & InputClearEmits;

/**
 * Slots for the input compact component.
 */
export type InputCompactSlots = {
  /**
   * Custom content for the leading slot.
   */
  leading?: (props: InputCompactSlotProps) => any;
  /**
   * Custom content for the trailing slot.
   */
  trailing?: (props: InputCompactSlotProps) => any;
  /**
   * Custom content for the clear slot.
   */
  clear?: (props: InputCompactSlotProps) => any;
};
