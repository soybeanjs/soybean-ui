import type { ComputedRef, ShallowRef } from 'vue';
import type {
  DateRange,
  DateStep,
  Formatter,
  Granularity,
  HourCycle,
  Matcher,
  SegmentPart,
  DateValue
} from '../../date';
import type { BaseProps, Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Properties for the DateRangePickerRoot component.
 */
export interface DateRangePickerRootProps extends PrimitiveProps, FormFieldCommonProps, Omit<BaseProps, 'placeholder'> {
  /**
   * Default value.
   */
  defaultValue?: DateRange;
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
  modelValue?: DateRange;
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
  /**
   * Whether the component is open by default.
   */
  defaultOpen?: boolean;
  /**
   * Whether the component is open.
   */
  open?: boolean;
  /**
   * Whether the popup is modal.
   */
  modal?: boolean;
}

/**
 * Events for the DateRangePickerRoot component.
 */
export type DateRangePickerRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [range: DateRange];
  /**
   * Emitted when the placeholder value changes.
   */
  'update:placeholder': [date: DateValue];
  /**
   * Emitted when the start value changes.
   */
  'update:startValue': [date: DateValue | undefined];
  /**
   * Emitted when the end value changes.
   */
  'update:endValue': [date: DateValue | undefined];
  /**
   * Emitted when the open state changes.
   */
  'update:open': [open: boolean];
};

/**
 * Properties for the DateRangePickerInput component.
 */
export interface DateRangePickerInputProps extends PrimitiveProps, BaseProps {
  /**
   * Part.
   */
  part: SegmentPart;
}

/**
 * Properties for the DateRangePickerTrigger component.
 */
export interface DateRangePickerTriggerProps extends PrimitiveProps, BaseProps {}

/**
 * Properties for the DateRangePickerPopup component.
 */
export interface DateRangePickerPopupProps extends PrimitiveProps, BaseProps {}

/**
 * Context for the DateRangePickerRoot component.
 */
export interface DateRangePickerRootContext extends PropsToContext<DateRangePickerRootProps, 'disabled' | 'readonly'> {
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
  modelValue: ShallowRef<DateRange>;
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
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
  /**
   * Whether the placeholder is focusable.
   */
  isPlaceholderFocusable: ComputedRef<boolean>;
  /**
   * Whether the component has selected range.
   */
  hasSelectedRange: ComputedRef<boolean>;
  /**
   * Whether the start date is disabled.
   */
  isStartDateDisabled: ComputedRef<boolean>;
  /**
   * Whether an end date disabled.
   */
  isEndDateDisabled: ComputedRef<boolean>;
  /**
   * Min value used by the component context.
   */
  minValue: ComputedRef<DateValue | undefined>;
  /**
   * Max value used by the component context.
   */
  maxValue: ComputedRef<DateValue | undefined>;
  /**
   * Callback invoked when the range changes.
   */
  onRangeChange: (range: DateRange) => void;
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
   * Whether the date is hovered.
   */
  isDateHovered: Matcher;
  /**
   * Set open used by the component context.
   */
  setOpen: (value: boolean) => void;
  /**
   * Set hovered date used by the component context.
   */
  setHoveredDate: (date: DateValue | undefined) => void;
  /**
   * Hovered date used by the component context.
   */
  hoveredDate: ShallowRef<DateValue | undefined>;
}

/**
 * Available UI slots for the DateRangePicker component.
 */
export type DateRangePickerUiSlot = 'root' | 'trigger' | 'popup' | 'input' | 'calendar';
/**
 * UI class overrides for the DateRangePicker component.
 */
export type DateRangePickerUi = UiClass<DateRangePickerUiSlot>;

/**
 * Properties for the DateRangePickerCompact component.
 */
export interface DateRangePickerCompactProps extends DateRangePickerRootProps {
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: DateRangePickerTriggerProps;
  /**
   * Properties forwarded to the popup element.
   */
  popupProps?: DateRangePickerPopupProps;
}

/**
 * Events for the DateRangePickerCompact component.
 */
export type DateRangePickerCompactEmits = DateRangePickerRootEmits;

/**
 * Slots for the DateRangePickerCompact component.
 */
export type DateRangePickerCompactSlots = {
  /**
   * Custom content for the default slot.
   */
  default?: (props: {
    modelValue: DateRange;
    placeholder: DateValue;
    setPlaceholder: (date: DateValue) => void;
    setRange: (range: DateRange) => void;
    open: boolean;
  }) => any;
  /**
   * Custom content for the trigger slot.
   */
  trigger?: (props: { modelValue: DateRange; open: boolean }) => any;
  /**
   * Custom content for the calendar slot.
   */
  calendar?: (props: {
    modelValue: DateRange;
    placeholder: DateValue;
    setPlaceholder: (date: DateValue) => void;
    setRange: (range: DateRange) => void;
  }) => any;
};
