import type { ShallowRef } from 'vue';
import type {
  AcceptableValue,
  CheckedState,
  ClassValueProp,
  EmitsToHookProps,
  ForceMountProps,
  FormFieldProps,
  PropsToContext,
  StringOrNumber
} from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { RovingFocusGroupProps } from '../roving-focus/types';
import type { LabelProps as CheckboxLabelProps } from '../label/types';

export interface CheckboxRootProps extends ClassValueProp, FormFieldProps {
  /** The controlled value of the checkbox. Can be bound with v-model. */
  modelValue?: CheckedState | null;
  /** The value of the checkbox when it is initially rendered. Use when you do not need to control its value. */
  defaultValue?: CheckedState;
  /**
   * The value given as data when submitted with a `name`.
   *
   * @defaultValue on
   */
  value?: StringOrNumber;
  /**
   * When `true`, prevents the user from interacting with the checkbox
   *
   * @defaultValue false
   */
  disabled?: boolean;
}

export type CheckboxRootEmits = {
  /** Event handler called when the value of the checkbox changes. */
  'update:modelValue': [value: CheckedState];
};

export interface CheckboxControlProps extends ClassValueProp {
  /** Id of the element */
  id?: string;
}

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
  'update:modelValue': [value: NonNullable<T>[]];
};

export type CheckboxGroupRootContextParams = PropsToContext<
  CheckboxGroupRootProps,
  'modelValue' | 'defaultValue' | 'rovingFocus' | 'disabled'
> &
  EmitsToHookProps<CheckboxGroupRootEmits>;

export type CheckboxRootContextParams = PropsToContext<Omit<CheckboxRootProps, 'class'>> &
  EmitsToHookProps<CheckboxRootEmits> & {
    groupModelValue?: ShallowRef<AcceptableValue[] | undefined>;
  };

export type { CheckboxLabelProps };
