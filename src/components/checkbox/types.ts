import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { AcceptableValue, CheckedState, ForceMountProps, FormFieldProps, PropsToContext } from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { RovingFocusGroupProps } from '../roving-focus/types';
import type { LabelProps as CheckboxLabelProps } from '../label/types';

export interface CheckboxRootProps extends FormFieldProps, /** @vue-ignore */ HTMLAttributes {
  /** The controlled value of the checkbox. Can be bound with v-model. */
  modelValue?: CheckedState | null;
  /** The value of the checkbox when it is initially rendered. Use when you do not need to control its value. */
  defaultValue?: CheckedState;
  /**
   * The value given as data when submitted with a `name`.
   *
   * @defaultValue on
   */
  value?: NonNullable<AcceptableValue>;
  /**
   * When `true`, prevents the user from interacting with the checkbox
   *
   * @defaultValue false
   */
  disabled?: boolean;
}

export type CheckboxRootEmits = {
  /** Event handler called when the value of the checkbox changes. */
  'update:modelValue': [value: CheckedState | null];
};

export interface CheckboxControlProps extends /** @vue-ignore */ ButtonHTMLAttributes {
  /** Id of the element */
  id?: string;
}

export interface CheckboxIndicatorProps extends PrimitiveProps, ForceMountProps, /** @vue-ignore */ HTMLAttributes {}

export interface CheckboxGroupRootProps<T = NonNullable<AcceptableValue>>
  extends Omit<
      RovingFocusGroupProps,
      'currentTabStopId' | 'defaultCurrentTabStopId' | 'preventScrollOnEntryFocus' | 'as' | 'asChild'
    >,
    FormFieldProps {
  /** The controlled value of the checkbox. Can be bound with v-model. */
  modelValue?: T[];
  /** The value of the checkbox when it is initially rendered. Use when you do not need to control its value. */
  defaultValue?: T[];
  /**
   * When `false`, navigating through the items using arrow keys will be disabled.
   *
   * @defaultValue true
   */
  rovingFocus?: boolean;
  /**
   * When `true`, prevents the user from interacting with the checkboxes
   *
   * @defaultValue false
   */
  disabled?: boolean;
}

export type CheckboxGroupRootEmits<T = AcceptableValue> = {
  /** Event handler called when the value of the checkbox group changes. */
  'update:modelValue': [value: NonNullable<T>[]];
};

export type CheckboxGroupRootContextParams = PropsToContext<CheckboxGroupRootProps, 'rovingFocus' | 'disabled'> & {
  modelValue: ShallowRef<NonNullable<AcceptableValue>[] | undefined>;
};

export type CheckboxRootContextParams = PropsToContext<
  CheckboxRootProps,
  'value' | 'disabled' | 'name' | 'required'
> & {
  modelValue: ShallowRef<CheckedState | null | undefined>;
  state: ComputedRef<CheckedState>;
};

export type { CheckboxLabelProps };
