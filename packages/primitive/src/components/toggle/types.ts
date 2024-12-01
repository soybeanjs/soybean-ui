import type { ClassValueProp, FormFieldProps } from '../../types';
import type { PrimitiveProps } from '../primitive';

export type ToggleEmits = {
  /** Event handler called when the value of the toggle changes. */
  'update:modelValue': [value: boolean];
};

export interface ToggleProps extends ClassValueProp, FormFieldProps {
  /** The pressed state of the toggle when it is initially rendered. Use when you do not need to control its open state. */
  defaultValue?: boolean;
  /** The controlled pressed state of the toggle. Can be bind as `v-model`. */
  modelValue?: boolean;
  /** When `true`, prevents the user from interacting with the toggle. */
  disabled?: boolean;
}
export type TogglePropsWithPrimitive = ToggleProps & PrimitiveProps;
