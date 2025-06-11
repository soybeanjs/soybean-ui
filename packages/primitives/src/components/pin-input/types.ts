import type { ComputedRef, Ref } from 'vue';
import type { ClassValueProp, Direction, FormFieldProps, PrimitiveProps } from '../../types';

export type PinInputType = 'text' | 'number';

export type PinInputValue<Type extends PinInputType = 'text'> = Type extends 'number' ? number[] : string[];

export type PinInputRootEmits<T extends PinInputType = 'text'> = {
  'update:modelValue': [value: PinInputValue<T>];
  complete: [value: PinInputValue<T>];
};

export interface PinInputRootProps<T extends PinInputType = 'text'> extends ClassValueProp, FormFieldProps {
  /** The controlled checked state of the pin input. Can be bound as `v-model`. */
  modelValue?: PinInputValue<T> | null;
  /**
   * The default value of the pin inputs when it is initially rendered. Use when you do not need to control its checked
   * state.
   */
  defaultValue?: PinInputValue<T>[];
  /** The placeholder character to use for empty pin-inputs. */
  placeholder?: string;
  /** When `true`, pin inputs will be treated as password. */
  mask?: boolean;
  /** When `true`, mobile devices will autodetect the OTP from messages or clipboard, and enable the autocomplete field. */
  otp?: boolean;
  /** Input type for the inputs. */
  type?: T;
  /**
   * The reading direction of the combobox when applicable. <br> If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** When `true`, prevents the user from interacting with the pin input */
  disabled?: boolean;
  /** Id of the element */
  id?: string;
}
export type PinInputRootPropsWithPrimitive<T extends PinInputType = 'text'> = PinInputRootProps<T> & PrimitiveProps;

export interface PinInputRootContext<T extends PinInputType = 'text'> {
  modelValue: Ref<PinInputValue<T>>;
  currentModelValue: ComputedRef<PinInputValue<T>>;
  mask: Ref<boolean>;
  otp: Ref<boolean>;
  placeholder: Ref<string>;
  type: Ref<PinInputType>;
  dir: Ref<Direction>;
  disabled: Ref<boolean>;
  isCompleted: ComputedRef<boolean>;
  inputElements?: Ref<Set<HTMLInputElement>>;
  onInputElementChange: (el: HTMLInputElement) => void;
  isNumericMode: ComputedRef<boolean>;
}

export interface PinInputInputProps extends ClassValueProp {
  /** Position of the value this input binds to. */
  index: number;
  /** When `true`, prevents the user from interacting with the pin input */
  disabled?: boolean;
}
export type PinInputInputPropsWithPrimitive = PinInputInputProps & PrimitiveProps;
