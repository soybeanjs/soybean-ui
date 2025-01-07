import type { Ref } from 'vue';
import type { ClassValueProp, FormFieldProps } from '../../types';
import type { PrimitiveProps } from '../primitive';

export interface SwitchRootProps extends ClassValueProp, FormFieldProps {
  /** The state of the switch when it is initially rendered. Use when you do not need to control its state. */
  defaultValue?: boolean;
  /** The controlled state of the switch. Can be bind as `v-model`. */
  modelValue?: boolean | null;
  /** When `true`, prevents the user from interacting with the switch. */
  disabled?: boolean;
  id?: string;
  /** The value given as data when submitted with a `name`. */
  value?: string;
}
export type SwitchRootPropsWithPrimitive = SwitchRootProps & PrimitiveProps;

export type SwitchRootEmits = {
  /** Event handler called when the value of the switch changes. */
  'update:modelValue': [payload: boolean];
};

export interface SwitchRootContextParams {
  modelValue?: Ref<boolean>;
  disabled: Ref<boolean>;
}

export interface SwitchRootContext extends SwitchRootContextParams {
  toggleCheck: () => void;
}

export interface SwitchThumbProps extends ClassValueProp {}
export type SwitchThumbPropsWithPrimitive = SwitchThumbProps & PrimitiveProps;
