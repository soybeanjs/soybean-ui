import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, HtmlHTMLAttributes, ShallowRef } from 'vue';
import type { AcceptableBooleanValue, ClassValue, FormFieldCommonProps, PropsToContext } from '../../types';
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
  extends FormFieldCommonProps, SwitchValueConfig<T>, /** @vue-ignore */ HtmlHTMLAttributes {
  /** The state of the switch when it is initially rendered. Use when you do not need to control its state. */
  defaultValue?: NonNullable<T>;
  /** The controlled state of the switch. Can be bind as `v-model`. */
  modelValue?: T;
  /** When `true`, prevents the user from interacting with the switch. */
  disabled?: boolean;
  /** The value given as data when submitted with a `name`. */
  value?: string;
}

export type SwitchRootEmits<T extends AcceptableBooleanValue = boolean> = {
  /** Event handler called when the value of the switch changes. */
  'update:modelValue': [payload: NonNullable<T>];
};

export interface SwitchControlProps extends /** @vue-ignore */ ButtonHTMLAttributes {
  /** Id of the element */
  id?: string;
}

export interface SwitchThumbProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface SwitchRootContextParams<T extends AcceptableBooleanValue = boolean> extends PropsToContext<
  SwitchRootProps<T>,
  'disabled' | 'required' | 'trueValue' | 'falseValue'
> {
  modelValue: ShallowRef<T>;
}

export type SwitchThemeSlot = 'root' | 'control' | 'thumb';

export type SwitchUi = Record<SwitchThemeSlot, ClassValue>;

export interface SwitchThemeContextParams {
  ui: ComputedRef<SwitchUi>;
}
