import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type {
  AcceptableBooleanValue,
  DataOrientation,
  Direction,
  EmitsToHookProps,
  ForceMountProps,
  FormFieldCommonProps,
  PropsToContext,
  UiClass
} from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { LabelProps as RadioGroupLabelProps } from '../label/types';

/**
 * Props for the radio group root component.
 */
export interface RadioGroupRootProps<T extends AcceptableBooleanValue = AcceptableBooleanValue>
  extends FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
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

/**
 * Emits for the radio group root component.
 */
export type RadioGroupRootEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> = {
  /** Event handler called when the radio group value changes */
  'update:modelValue': [payload: NonNullable<T>];
};

/**
 * Context for the radio group root component.
 */
export type RadioGroupRootContext = PropsToContext<
  RadioGroupRootProps,
  'disabled' | 'orientation' | 'dir' | 'loop' | 'name' | 'required'
> & {
  /**
   * Current model value.
   */
  modelValue: ShallowRef<AcceptableBooleanValue>;
};

/**
 * Props for the radio group item component.
 */
export interface RadioGroupItemProps extends FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  /** The value given as data when submitted with a `name`. */
  value: NonNullable<AcceptableBooleanValue>;
  /** When `true`, prevents the user from interacting with the radio item. */
  disabled?: boolean;
}

/**
 * Type information for the radio select event component.
 */
export type RadioSelectEvent = CustomEvent<{
  /**
   * Original event.
   */
  originalEvent: MouseEvent;
  /**
   * Value associated with the current item.
   */
  value: NonNullable<AcceptableBooleanValue>;
}>;

/**
 * Emits for the radio group item component.
 */
export type RadioGroupItemEmits = {
  /** Event handler called when the radio item is selected */
  select: [event: RadioSelectEvent];
};

/**
 * Props for the radio group control component.
 */
export interface RadioGroupControlProps extends /** @vue-ignore */ ButtonHTMLAttributes {
  /** Id of the element */
  id?: string;
}

/**
 * Props for the radio group indicator component.
 */
export interface RadioGroupIndicatorProps extends PrimitiveProps, ForceMountProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Option data for the radio group component.
 */
export interface RadioGroupOptionData<T extends AcceptableBooleanValue = AcceptableBooleanValue> {
  /**
   * Value associated with the current item.
   */
  value: NonNullable<T>;
  /**
   * Label text rendered by the component.
   */
  label: string;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
}

/**
 * Props for the radio group compact component.
 */
export interface RadioGroupCompactProps<
  T extends AcceptableBooleanValue = AcceptableBooleanValue,
  S extends RadioGroupOptionData<T> = RadioGroupOptionData<T>
> extends RadioGroupRootProps<T> {
  /**
   * Items rendered by the component.
   */
  items: S[];
  /**
   * Props forwarded to the item element.
   */
  itemProps?: RadioGroupItemProps;
  /**
   * Props forwarded to the control element.
   */
  controlProps?: RadioGroupControlProps;
  /**
   * Props forwarded to the indicator element.
   */
  indicatorProps?: RadioGroupIndicatorProps;
  /**
   * Props forwarded to the label element.
   */
  labelProps?: RadioGroupLabelProps;
}

/**
 * Emits for the radio group compact component.
 */
export type RadioGroupCompactEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> = RadioGroupRootEmits<T>;

/**
 * Parameters used to create the radio group item context.
 */
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

/**
 * Available UI slots for the radio group component.
 */
export type RadioGroupUiSlot = 'root' | 'item' | 'indicator' | 'label' | 'control';

/**
 * UI class overrides for the radio group component.
 */
export type RadioGroupUi = UiClass<RadioGroupUiSlot>;

export type { RadioGroupLabelProps };
