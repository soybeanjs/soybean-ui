import type { ComputedRef } from 'vue';
import type {
  AcceptableValue,
  CheckedState,
  ClassValueProp,
  EmitsToHookProps,
  ForceMountProps,
  FormFieldProps,
  PropsToContext
} from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { RovingFocusGroupProps } from '../roving-focus/types';

export interface CheckboxRootProps extends ClassValueProp, FormFieldProps {
  /** The controlled value of the checkbox. Can be bound with v-model. */
  modelValue?: CheckedState | null;
  /** The value of the checkbox when it is initially rendered. Use when you do not need to control its value. */
  defaultValue?: CheckedState;
  /**
   * When `true`, prevents the user from interacting with the checkbox
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * The value given as data when submitted with a `name`.
   *
   * @defaultValue on
   */
  value?: AcceptableValue;
  /** Id of the element */
  id?: string;
}

export type CheckboxRootEmits = {
  /** Event handler called when the value of the checkbox changes. */
  'update:modelValue': [value: CheckedState];
};

export interface CheckboxIndicatorProps extends ClassValueProp, PrimitiveProps, ForceMountProps {}

export interface CheckboxGroupRootProps<T = AcceptableValue>
  extends ClassValueProp,
    Pick<RovingFocusGroupProps, 'dir' | 'orientation' | 'loop'>,
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
  'update:modelValue': [value: T[]];
};

export type CheckboxGroupRootContextParams = PropsToContext<
  Pick<CheckboxGroupRootProps, 'modelValue' | 'defaultValue' | 'rovingFocus' | 'disabled'>
> &
  EmitsToHookProps<CheckboxGroupRootEmits>;

export interface CheckboxRootContextParams {
  disabled: ComputedRef<boolean>;
  state: ComputedRef<CheckedState>;
}
