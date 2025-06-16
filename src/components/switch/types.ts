import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { AcceptableBooleanValue, ClassValue, FormFieldProps, PropsToContext } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface SwitchValueConfig<T extends AcceptableBooleanValue = boolean> {
  /**
   * The value given as data when submitted with a `name`.
   *
   * @default true
   */
  trueValue?: NonNullable<T>;
  /**
   * The value given as data when submitted with a `name`.
   *
   * @default false
   */
  falseValue?: NonNullable<T>;
}

export interface SwitchRootProps<T extends AcceptableBooleanValue>
  extends FormFieldProps,
    SwitchValueConfig<T>,
    /** @vue-ignore */ ButtonHTMLAttributes {
  /** The state of the switch when it is initially rendered. Use when you do not need to control its state. */
  defaultValue?: NonNullable<T>;
  /** The controlled state of the switch. Can be bind as `v-model`. */
  modelValue?: T;
  /** When `true`, prevents the user from interacting with the switch. */
  disabled?: boolean;
  /** The id of the switch. */
  id?: string;
  /** The value given as data when submitted with a `name`. */
  value?: string;
}

export type SwitchRootEmits<T extends AcceptableBooleanValue = boolean> = {
  /** Event handler called when the value of the switch changes. */
  'update:modelValue': [payload: NonNullable<T>];
};

export interface SwitchThumbProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface SwitchRootContextParams<T extends AcceptableBooleanValue = boolean>
  extends PropsToContext<SwitchRootProps<T>, 'disabled' | 'trueValue' | 'falseValue'> {
  modelValue: ShallowRef<T>;
}

export type SwitchSlot = 'root' | 'thumb';

export interface SwitchThemeContextParams {
  ui: ComputedRef<Record<SwitchSlot, ClassValue>>;
}
