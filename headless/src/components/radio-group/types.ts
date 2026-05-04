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
 * Properties for the RadioGroupRoot component.
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
 * Events for the RadioGroupRoot component.
 */
export type RadioGroupRootEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> = {
  /** Event handler called when the radio group value changes */
  'update:modelValue': [payload: NonNullable<T>];
};

/**
 * Context for the RadioGroupRoot component.
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
 * Properties for the RadioGroupItem component.
 */
export interface RadioGroupItemProps extends FormFieldCommonProps, /** @vue-ignore */ HTMLAttributes {
  /** The value given as data when submitted with a `name`. */
  value: NonNullable<AcceptableBooleanValue>;
  /** When `true`, prevents the user from interacting with the radio item. */
  disabled?: boolean;
}

/**
 * Type information for RadioSelectEvent.
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
 * Events for the RadioGroupItem component.
 */
export type RadioGroupItemEmits = {
  /** Event handler called when the radio item is selected */
  select: [event: RadioSelectEvent];
};

/**
 * Properties for the RadioGroupControl component.
 */
export interface RadioGroupControlProps extends /** @vue-ignore */ ButtonHTMLAttributes {
  /** Id of the element */
  id?: string;
}

/**
 * Properties for the RadioGroupIndicator component.
 */
export interface RadioGroupIndicatorProps extends PrimitiveProps, ForceMountProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Option data for the RadioGroup component.
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
 * Properties for the RadioGroupCompact component.
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
   * Properties forwarded to the item element.
   */
  itemProps?: RadioGroupItemProps;
  /**
   * Properties forwarded to the control element.
   */
  controlProps?: RadioGroupControlProps;
  /**
   * Properties forwarded to the indicator element.
   */
  indicatorProps?: RadioGroupIndicatorProps;
  /**
   * Properties forwarded to the label element.
   */
  labelProps?: RadioGroupLabelProps;
}

/**
 * Events for the RadioGroupCompact component.
 */
export type RadioGroupCompactEmits<T extends AcceptableBooleanValue = AcceptableBooleanValue> = RadioGroupRootEmits<T>;

/**
 * Parameters used to create the RadioGroupItem context.
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
 * Available UI slots for the RadioGroup component.
 */
export type RadioGroupUiSlot = 'root' | 'item' | 'indicator' | 'label' | 'control';

/**
 * UI class overrides for the RadioGroup component.
 */
export type RadioGroupUi = UiClass<RadioGroupUiSlot>;

export type { RadioGroupLabelProps };
