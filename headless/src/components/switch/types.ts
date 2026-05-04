import type { ButtonHTMLAttributes, HTMLAttributes, HtmlHTMLAttributes, ShallowRef } from 'vue';
import type { AcceptableBooleanValue, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Type information for the switch value config component.
 */
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

/**
 * Properties for the switch root component.
 */
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

/**
 * Events for the switch root component.
 */
export type SwitchRootEmits<T extends AcceptableBooleanValue = boolean> = {
  /** Event handler called when the value of the switch changes. */
  'update:modelValue': [payload: NonNullable<T>];
};

/**
 * Properties for the switch control component.
 */
export interface SwitchControlProps extends /** @vue-ignore */ ButtonHTMLAttributes {
  /** Id of the element */
  id?: string;
}

/**
 * Properties for the switch thumb component.
 */
export interface SwitchThumbProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Parameters used to create the switch root context.
 */
export interface SwitchRootContextParams<T extends AcceptableBooleanValue = boolean> extends PropsToContext<
  SwitchRootProps<T>,
  'disabled' | 'required' | 'trueValue' | 'falseValue'
> {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<T>;
}

/**
 * Available UI slots for the switch component.
 */
export type SwitchUiSlot = 'root' | 'control' | 'thumb';

/**
 * UI class overrides for the switch component.
 */
export type SwitchUi = UiClass<SwitchUiSlot>;
