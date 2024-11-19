import type { ComputedRef, Ref } from 'vue';
import type { PrimitiveProps } from '../primitive';
import type { AcceptableValue, DataOrientation, Direction, FormFieldProps, SelectEvent } from '../../types';

// Root
export interface RadioGroupRootProps extends FormFieldProps {
  /** The controlled value of the radio item to check. Can be bound as `v-model`. */
  modelValue?: AcceptableValue;
  /**
   * The value of the radio item that should be checked when initially rendered. Use when you do not need to control the
   * state of the radio items.
   */
  defaultValue?: AcceptableValue;
  /** When `true`, prevents the user from interacting with radio items. */
  disabled?: boolean;
  /** The orientation of the component. */
  orientation?: DataOrientation;
  /**
   * The reading direction of the combobox when applicable. If omitted, inherits globally from `ConfigProvider` or
   * assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
  /** When `true`, keyboard navigation will loop from last item to first, and vice versa. */
  loop?: boolean;
}

export type RadioGroupRootPropsWithPrimitive = RadioGroupRootProps & PrimitiveProps;

export type RadioGroupRootEmits = {
  /** Event handler called when the radio group value changes */
  'update:modelValue': [payload: string];
};

export type RadioGroupRootContext = {
  modelValue?: Readonly<Ref<AcceptableValue | undefined>>;
  changeModelValue: (value?: AcceptableValue) => void;
  disabled: Ref<boolean>;
  loop: Ref<boolean>;
  orientation: Ref<DataOrientation | undefined>;
  name?: string;
  required: Ref<boolean>;
};

// Item
export interface RadioGroupItemProps extends Omit<RadioProps, 'checked'> {}

export type RadioGroupItemEmits = {
  select: [event: SelectEvent];
};

export type RadioGroupItemContext = {
  disabled: ComputedRef<boolean>;
  checked: ComputedRef<boolean>;
};

// Indicator
export interface RadioGroupIndicatorProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}

export type RadioGroupIndicatorPropsWithPrimitive = RadioGroupIndicatorProps & PrimitiveProps;

// Radio
export interface RadioProps extends FormFieldProps {
  id?: string;
  /** The value given as data when submitted with a `name`. */
  value?: AcceptableValue;
  /** When `true`, prevents the user from interacting with the radio item. */
  disabled?: boolean;
  checked?: boolean;
}

export type RadioPropsWithPrimitive = RadioProps & PrimitiveProps;

export type RadioEmits = {
  'update:checked': [value: boolean];
  select: [SelectEvent];
};
