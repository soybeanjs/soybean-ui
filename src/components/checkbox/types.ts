import type { Ref } from 'vue';
import type {
  AcceptableValue,
  ClassValueProp,
  DataOrientation,
  Direction,
  ForceMountProps,
  FormFieldProps
} from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { CheckedState } from './shared';

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
   * @defaultValue 'on'
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

export interface CheckboxGroupRootProps<T = AcceptableValue> extends ClassValueProp, FormFieldProps {
  /** The value of the checkbox when it is initially rendered. Use when you do not need to control its value. */
  defaultValue?: T[];
  /** The controlled value of the checkbox. Can be bound with v-model. */
  modelValue?: T[];
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
  /**
   * The reading direction of the checkbox group when applicable.
   *
   * @defaultValue 'ltr'
   */
  dir?: Direction;
  /**
   * The orientation of the checkbox group.
   *
   * @defaultValue 'vertical'
   */
  orientation?: DataOrientation;
  /**
   * When `true`, keyboard navigation will loop from last item to first, and vice versa.
   *
   * @defaultValue false
   */
  loop?: boolean;
  /** The name of the checkbox group. Submitted with its owning form as part of a name/value pair. */
  name?: string;
  /**
   * When `true`, indicates that the user must check at least one checkbox before the owning form can be submitted.
   *
   * @defaultValue false
   */
  required?: boolean;
}

export type CheckboxGroupRootEmits<T = AcceptableValue> = {
  /** Event handler called when the value of the checkbox group changes. */
  'update:modelValue': [value: T[]];
};

export interface CheckboxRootContextParams {
  disabled: Ref<boolean>;
  state: Ref<CheckedState>;
}

export interface CheckboxGroupRootContextParams {
  modelValue: Ref<AcceptableValue[]>;
  rovingFocus: Ref<boolean>;
  disabled: Ref<boolean>;
  dir: Ref<Direction>;
  orientation: Ref<DataOrientation>;
  loop: Ref<boolean>;
}
