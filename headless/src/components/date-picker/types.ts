import type { DateValue } from '@internationalized/date';
import type { ComputedRef, ShallowRef } from 'vue';
import type { DateStep, Formatter, Granularity, HourCycle, Matcher, SegmentPart } from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type {
  PopoverRootProps,
  PopoverPositionerProps as DatePickerPositionerProps,
  PopoverPositionerEmits as DatePickerPositionerEmits,
  PopoverPopupProps as DatePickerPopupProps,
  PopoverTriggerProps as DatePickerTriggerProps,
  PopoverUiSlot
} from '../popover/types';
import type { PortalProps as DatePickerPortalProps } from '../portal/types';
import type { PrimitiveWithBaseProps } from '../primitive/types';

/**
 * Properties for the DatePickerRoot component.
 */
export interface DatePickerRootProps
  extends FormFieldCommonProps, PopoverRootProps, Omit<PrimitiveWithBaseProps, 'placeholder'> {
  /**
   * Default value.
   */
  defaultValue?: DateValue;
  /**
   * Default placeholder.
   */
  defaultPlaceholder?: DateValue;
  /**
   * Placeholder.
   */
  placeholder?: DateValue;
  /**
   * Current model value.
   */
  modelValue?: DateValue;
  /**
   * Hour cycle.
   */
  hourCycle?: HourCycle;
  /**
   * Step.
   */
  step?: DateStep;
  /**
   * Granularity.
   */
  granularity?: Granularity;
  /**
   * Whether hide time zone.
   */
  hideTimeZone?: boolean;
  /**
   * Max value.
   */
  maxValue?: DateValue;
  /**
   * Min value.
   */
  minValue?: DateValue;
  /**
   * Locale.
   */
  locale?: string;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the component is readonly.
   */
  readonly?: boolean;
  /**
   * Whether the date is unavailable.
   */
  isDateUnavailable?: Matcher;
  /**
   * Id.
   */
  id?: string;
  /**
   * Reading direction of the component.
   */
  dir?: Direction;
}

/**
 * Events for the DatePickerRoot component.
 */
export type DatePickerRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [date: DateValue | undefined];
  /**
   * Emitted when the placeholder value changes.
   */
  'update:placeholder': [date: DateValue];
  /**
   * Emitted when the open state changes.
   */
  'update:open': [open: boolean];
};

/**
 * Slot properties for the DatePicker component.
 */
export interface DatePickerSlotProps {
  /**
   * Current model value.
   */
  modelValue: DateValue | undefined;
  /**
   * Placeholder exposed in the slot scope.
   */
  placeholder: DateValue;
  /**
   * Set placeholder exposed in the slot scope.
   */
  setPlaceholder: (date: DateValue) => void;
  /**
   * Set date exposed in the slot scope.
   */
  setDate: (date: DateValue | undefined) => void;
  /**
   * Whether the component is open.
   */
  open?: boolean;
}

/**
 * Slots for the DatePickerRoot component.
 */
export type DatePickerRootSlots = {
  /**
   * Custom content for the default slot.
   */
  default?: (props: DatePickerSlotProps) => any;
};

/**
 * Properties for the DatePickerInput component.
 */
export interface DatePickerInputProps extends PrimitiveWithBaseProps {
  /**
   * Part.
   */
  part: SegmentPart;
}

/**
 * Context for the DatePickerRoot component.
 */
export interface DatePickerRootContext extends PropsToContext<DatePickerRootProps, 'disabled' | 'readonly'> {
  /**
   * Locale used by the component context.
   */
  locale: ComputedRef<string>;
  /**
   * Reading direction of the component.
   */
  dir: ComputedRef<Direction>;
  /**
   * Current model value.
   */
  modelValue: ShallowRef<DateValue | undefined>;
  /**
   * Placeholder used by the component context.
   */
  placeholder: ShallowRef<DateValue>;
  /**
   * Whether the date is unavailable.
   */
  isDateUnavailable?: Matcher;
  /**
   * Whether the current value is invalid.
   */
  isInvalid: ComputedRef<boolean>;
  /**
   * Formatter used by the component context.
   */
  formatter: Formatter;
  /**
   * Hour cycle used by the component context.
   */
  hourCycle: HourCycle;
  /**
   * Step used by the component context.
   */
  step: ComputedRef<DateStep>;
  /**
   * Whether the placeholder is focusable.
   */
  isPlaceholderFocusable: ComputedRef<boolean>;
  /**
   * Whether the component has selected date.
   */
  hasSelectedDate: ComputedRef<boolean>;
  /**
   * Whether the selected date is disabled.
   */
  isSelectedDateDisabled: ComputedRef<boolean>;
  /**
   * Min value used by the component context.
   */
  minValue: ComputedRef<DateValue | undefined>;
  /**
   * Max value used by the component context.
   */
  maxValue: ComputedRef<DateValue | undefined>;
  /**
   * Callback invoked when the date changes.
   */
  onDateChange: (date: DateValue | undefined) => void;
  /**
   * Callback invoked when the placeholder changes.
   */
  onPlaceholderChange: (date: DateValue) => void;
  /**
   * Whether the date is disabled.
   */
  isDateDisabled: Matcher;
  /**
   * Whether the date is selected.
   */
  isDateSelected: Matcher;
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
  /**
   * Set open used by the component context.
   */
  setOpen: (value: boolean) => void;
}

/**
 * Properties for the DatePickerContent component.
 */
export interface DatePickerContentProps extends DatePickerPositionerProps {
  /**
   * Properties forwarded to the popup element.
   */
  popupProps?: DatePickerPopupProps;
  /**
   * Properties forwarded to the portal element.
   */
  portalProps?: DatePickerPortalProps;
}

/**
 * Events for the DatePickerContent component.
 */
export type DatePickerContentEmits = DatePickerPositionerEmits;

/**
 * Slots for the DatePickerContent component.
 */
export type DatePickerContentSlots = {
  /**
   * Custom content for the default slot.
   */
  default?: (props: DatePickerSlotProps) => any;
};

/**
 * Properties for the DatePickerCompact component.
 */
export interface DatePickerCompactProps extends DatePickerRootProps {
  /**
   * Trigger placeholder.
   */
  triggerPlaceholder?: string;
  /**
   * Properties forwarded to the positioner element.
   */
  positionerProps?: DatePickerPositionerProps;
  /**
   * Properties forwarded to the popup element.
   */
  popupProps?: DatePickerPopupProps;
  /**
   * Properties forwarded to the portal element.
   */
  portalProps?: DatePickerPortalProps;
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: DatePickerTriggerProps;
}

/**
 * Events for the DatePickerCompact component.
 */
export type DatePickerCompactEmits = DatePickerRootEmits;

/**
 * Slots for the DatePickerCompact component.
 */
export type DatePickerCompactSlots = DatePickerContentSlots & {
  /**
   * Custom content for the trigger slot.
   */
  trigger?: (props: { modelValue: DateValue | undefined; open?: boolean }) => any;
};

/**
 * Available UI slots for the DatePicker component.
 */
export type DatePickerUiSlot = PopoverUiSlot | 'root';

/**
 * UI class overrides for the DatePicker component.
 */
export type DatePickerUi = UiClass<DatePickerUiSlot>;

export type {
  DatePickerPortalProps,
  DatePickerPositionerProps,
  DatePickerPositionerEmits,
  DatePickerPopupProps,
  DatePickerTriggerProps
};
