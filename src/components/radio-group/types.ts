import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes } from 'vue';
import type {
  AcceptableValue,
  DataOrientation,
  Direction,
  EmitsToHookProps,
  ForceMountProps,
  FormFieldProps,
  PropsToContext,
  StringOrNumber
} from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { LabelProps as RadioGroupLabelProps } from '../label/types';

export interface RadioGroupRootProps<T = AcceptableValue> extends FormFieldProps, /** @vue-ignore */ HTMLAttributes {
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

export type RadioGroupRootContextParams = PropsToContext<
  RadioGroupRootProps,
  'modelValue' | 'defaultValue' | 'disabled' | 'orientation' | 'dir' | 'loop' | 'name' | 'required'
> &
  EmitsToHookProps<RadioGroupRootEmits>;

export interface RadioGroupItemProps extends FormFieldProps, /** @vue-ignore */ HTMLAttributes {
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

export interface RadioGroupControlProps extends /** @vue-ignore */ ButtonHTMLAttributes {
  /** Id of the element */
  id?: string;
}

export type RadioGroupItemContextParams = PropsToContext<
  Pick<RadioGroupItemProps, 'name' | 'required' | 'value' | 'disabled'>
> &
  EmitsToHookProps<RadioGroupItemEmits> & {
    /** Whether the radio item is checked */
    checked: ComputedRef<boolean>;
    /**
     * Event handler called when the radio item is selected
     *
     * @param event - The event object
     */
    onSelect: (event: RadioSelectEvent) => void;
  };

export interface RadioGroupIndicatorProps extends PrimitiveProps, ForceMountProps, /** @vue-ignore */ HTMLAttributes {}

export type { RadioGroupLabelProps };
