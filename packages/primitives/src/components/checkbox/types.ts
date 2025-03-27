import type { Ref } from 'vue';
import type { AcceptableValue, ClassValueProp, FormFieldProps, PrimitiveProps } from '../../types';
import type { RovingFocusGroupProps } from '../roving-focus';

export type CheckedState = boolean | 'indeterminate';

// Checkbox Root
export interface CheckboxRootProps extends ClassValueProp, FormFieldProps {
  /** The value of the checkbox when it is initially rendered. Use when you do not need to control its value. */
  defaultValue?: CheckedState;
  /** The controlled value of the checkbox. Can be bound with v-model. */
  modelValue?: CheckedState | null;
  /** When `true`, prevents the user from interacting with the checkbox */
  disabled?: boolean;
  /**
   * The value given as data when submitted with a `name`.
   *
   * @defaultValue 'on'
   */
  value?: AcceptableValue;
  /** Id of the element */
  id?: string;
}

export type CheckboxRootPropsWithPrimitive = CheckboxRootProps & PrimitiveProps;

export interface CheckboxRootEmits {
  /** Event handler called when the value of the checkbox changes. */
  'update:modelValue': [value: CheckedState];
}

// Checkbox Root Context
export interface CheckboxRootContext {
  disabled: Ref<boolean>;
  state: Ref<CheckedState>;
}

// Checkbox Indicator
export interface CheckboxIndicatorProps extends ClassValueProp {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}

export type CheckboxIndicatorPropsWithPrimitive = CheckboxIndicatorProps & PrimitiveProps;

// Checkbox Group Root
export type CheckboxGroupRootProps<T = AcceptableValue> = ClassValueProp &
  FormFieldProps &
  Pick<RovingFocusGroupProps, 'dir' | 'orientation' | 'loop'> & {
    /** The value of the checkbox when it is initially rendered. Use when you do not need to control its value. */
    defaultValue?: T[];
    /** The controlled value of the checkbox. Can be bound with v-model. */
    modelValue?: T[];
    /** When `false`, navigating through the items using arrow keys will be disabled. */
    rovingFocus?: boolean;
    /** When `true`, prevents the user from interacting with the checkboxes */
    disabled?: boolean;
  };

export type CheckboxGroupRootPropsWithPrimitive<T = AcceptableValue> = CheckboxGroupRootProps<T> & PrimitiveProps;

export interface CheckboxGroupRootEmits<T = AcceptableValue> {
  /** Event handler called when the value of the checkbox changes. */
  'update:modelValue': [value: T[]];
}

export interface CheckboxGroupRootContextParams {
  modelValue: Ref<AcceptableValue[]>;
  rovingFocus: Ref<boolean>;
  disabled: Ref<boolean>;
}

export interface CheckboxGroupRootContext extends CheckboxGroupRootContextParams {
  updateModelValue: (value: AcceptableValue[]) => void;
}
