import type { ComputedRef, HTMLAttributes, InputHTMLAttributes, ShallowRef } from 'vue';
import type { FormFieldCommonProps, UiClass } from '../../types';

export type InputOtpInputMode = 'numeric' | 'text';

export type InputOtpPushPasswordManagerStrategy = 'increase-width' | 'none';

export interface InputOtpRootProps extends FormFieldCommonProps, /** @vue-ignore */ Omit<HTMLAttributes, 'onInput'> {
  /** The id of the native input element. */
  id?: string;
  /** Autocomplete hint passed to the native input. */
  autocomplete?: string;
  /** Whether the input should be focused on mount. */
  autofocus?: boolean;
  /** Whether the input is disabled. */
  disabled?: boolean;
  /** Minimum length forwarded to the native input. */
  minlength?: number;
  /** Placeholder characters used by the visual slots. */
  placeholder?: string;
  /** Whether the input is readonly. */
  readonly?: boolean;
  /** Accessible label forwarded to the native input. */
  'aria-label'?: string;
  /** The controlled value of the OTP input. */
  modelValue?: string;
  /** The uncontrolled default value of the OTP input. */
  defaultValue?: string;
  /** The number of OTP slots. */
  maxlength: number;
  /** Virtual keyboard mode for mobile devices. */
  inputmode?: InputOtpInputMode;
  /** Pattern used to validate the whole OTP value. */
  pattern?: string | RegExp;
  /** Strategy used to avoid overlapping password manager badges. */
  pushPasswordManagerStrategy?: InputOtpPushPasswordManagerStrategy;
  /** Transform pasted content before it is inserted. */
  pasteTransformer?: (pasted: string | undefined) => string;
}

export type InputOtpRootEmits = {
  'update:modelValue': [value: string];
  complete: [value: string];
  input: [value: string];
  change: [event: Event];
  select: [event: Event];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  mouseover: [event: MouseEvent];
  mouseleave: [event: MouseEvent];
  paste: [event: ClipboardEvent];
};

export interface InputOtpPositionerProps extends /** @vue-ignore */ HTMLAttributes {}

export interface InputOtpInputProps extends /** @vue-ignore */ InputHTMLAttributes {}

export interface InputOtpCompactProps extends InputOtpRootProps {}

export type InputOtpCompactEmits = InputOtpRootEmits;

export type InputOtpCompactSlots = {
  default?: (props: InputOtpRootSlotProps) => any;
};

export interface InputOtpSlotProps {
  /** The typed character at the current slot. */
  char: string | null;
  /** Placeholder character rendered when the slot is empty. */
  placeholderChar: string | null;
  /** Whether the slot is covered by the current selection or caret. */
  isActive: boolean;
  /** Whether the slot should render a fake caret. */
  hasFakeCaret: boolean;
}

export interface InputOtpRootSlotProps {
  slots: InputOtpSlotProps[];
  isFocused: boolean;
  isHovering: boolean;
}

export interface InputOtpRootContext {
  autocomplete: ComputedRef<string | undefined>;
  autofocus: ComputedRef<boolean | undefined>;
  disabled: ComputedRef<boolean | undefined>;
  inputAttrs: ComputedRef<Record<string, unknown>>;
  modelValue: ComputedRef<string>;
  slots: ComputedRef<InputOtpSlotProps[]>;
  willPushPWMBadge: ComputedRef<boolean>;
  isFocused: ShallowRef<boolean>;
  isHovering: ShallowRef<boolean>;
  inputElement: ShallowRef<HTMLInputElement | null>;
  inputmode: ComputedRef<InputOtpInputMode | undefined>;
  maxlength: ComputedRef<number>;
  minlength: ComputedRef<number | undefined>;
  mirrorSelectionStart: ShallowRef<number | null>;
  mirrorSelectionEnd: ShallowRef<number | null>;
  name: ComputedRef<string | undefined>;
  pattern: ComputedRef<string | undefined>;
  readonly: ComputedRef<boolean | undefined>;
  required: ComputedRef<boolean | undefined>;
  resolvedAccessibleLabel: ComputedRef<string>;
  resolvedId: ComputedRef<string | undefined>;
  resolvedPlaceholder: ComputedRef<string | undefined>;
  focus: () => void;
  blur: () => void;
  select: () => void;
  onBeforeInput: (event: InputEvent) => void;
  onNativeChange: (event: Event) => void;
  onNativeSelect: (event: Event) => void;
  onMouseOver: (event: MouseEvent) => void;
  onMouseLeave: (event: MouseEvent) => void;
  onPaste: (event: ClipboardEvent) => void;
  onInput: (event: Event) => void;
  onFocus: (event: FocusEvent) => void;
  onBlur: (event: FocusEvent) => void;
}

export type InputOtpUiSlot = 'root' | 'positioner' | 'input' | 'group' | 'slot' | 'char' | 'placeholder' | 'caret';

export type InputOtpUi = UiClass<InputOtpUiSlot>;
