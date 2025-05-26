import type { ComputedRef } from 'vue';
import type {
  AcceptableValue,
  ClassValueProp,
  DataOrientation,
  Direction,
  EmitsToHookProps,
  ForceMountProps,
  FormFieldProps,
  PropsToContext,
  StringOrNumber
} from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface RadioGroupRootProps<T = AcceptableValue> extends ClassValueProp, FormFieldProps {
  /** The controlled value of the radio item to check. Can be bound as `v-model`. */
  modelValue?: T;
  /**
   * The value of the radio item that should be checked when initially rendered. Use when you do not need to control the
   * state of the radio items.
   */
  defaultValue?: T;
  /** When `true`, prevents the user from interacting with radio items. */
  disabled?: boolean;
  /** The orientation of the component. */
  orientation?: DataOrientation;
  /** The reading direction of the radio group when applicable. */
  dir?: Direction;
  /** When `true`, keyboard navigation will loop from last item to first, and vice versa. */
  loop?: boolean;
}

export type RadioGroupRootEmits<T = AcceptableValue> = {
  /** Event handler called when the radio group value changes */
  'update:modelValue': [payload: T];
};

export type RadioGroupRootContextParams = PropsToContext<Omit<RadioGroupRootProps, 'class'>> &
  EmitsToHookProps<RadioGroupRootEmits>;

export interface RadioGroupItemProps extends ClassValueProp, FormFieldProps {
  /** Id of the element */
  id?: string;
  /** The value given as data when submitted with a `name`. */
  value?: StringOrNumber;
  /** When `true`, prevents the user from interacting with the radio item. */
  disabled?: boolean;
}

export type RadioSelectEvent = CustomEvent<{
  originalEvent: MouseEvent;
  value?: AcceptableValue;
}>;

export type RadioGroupItemEmits = {
  /** Event handler called when the radio item is selected */
  select: [event: RadioSelectEvent];
};

export interface RadioGroupItemContextParams {
  /** Whether the radio item is disabled */
  disabled: ComputedRef<boolean>;
  /** Whether the radio item is checked */
  checked: ComputedRef<boolean>;
}

export interface RadioGroupIndicatorProps extends ClassValueProp, PrimitiveProps, ForceMountProps {}
