import type { ComputedRef, Ref } from 'vue';
import type { ClassValueProp, Direction, FormFieldProps } from '../../types';
import type { PrimitiveProps } from '../primitive';

export type PinInputRootEmits = {
  'update:modelValue': [value: string[]];
  complete: [value: string[]];
};

export interface PinInputRootProps extends ClassValueProp, FormFieldProps {
  /** The controlled checked state of the pin input. Can be bound as `v-model`. */
  modelValue?: string[];
  /**
   * The default value of the pin inputs when it is initially rendered. Use when you do not need to control its checked
   * state.
   */
  defaultValue?: string[];
  /** The placeholder character to use for empty pin-inputs. */
  placeholder?: string;
  /** When `true`, pin inputs will be treated as password. */
  mask?: boolean;
  /** When `true`, mobile devices will autodetect the OTP from messages or clipboard, and enable the autocomplete field. */
  otp?: boolean;
  /** Input type for the inputs. */
  type?: 'text' | 'number';
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
export type PinInputRootPropsWithPrimitive = PinInputRootProps & PrimitiveProps;

export interface PinInputRootContext {
  modelValue: Ref<string[]>;
  mask: Ref<boolean>;
  otp: Ref<boolean>;
  placeholder: Ref<string>;
  type: Ref<PinInputRootProps['type']>;
  dir: Ref<Direction>;
  disabled: Ref<boolean>;
  isCompleted: ComputedRef<boolean>;
  inputElements?: Ref<Set<HTMLInputElement>>;
  onInputElementChange: (el: HTMLInputElement) => void;
}

export interface PinInputInputProps extends ClassValueProp {
  /** Position of the value this input binds to. */
  index: number;
  /** When `true`, prevents the user from interacting with the pin input */
  disabled?: boolean;
}
export type PinInputInputPropsWithPrimitive = PinInputInputProps & PrimitiveProps;
