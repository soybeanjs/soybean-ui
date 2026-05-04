import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { DateStep, Formatter, HourCycle, TimeGranularity, TimeMatcher, TimeRange, TimeValue } from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { TimePickerOption } from '../../shared/time-picker';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Properties for the time range picker root component.
 */
export interface TimeRangePickerRootProps
  extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  /**
   * Default value.
   */
  defaultValue?: TimeRange;
  /**
   * Default placeholder.
   */
  defaultPlaceholder?: TimeValue;
  /**
   * Placeholder.
   */
  placeholder?: TimeValue;
  /**
   * Current model value.
   */
  modelValue?: TimeRange;
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
  granularity?: TimeGranularity;
  /**
   * Whether hide time zone.
   */
  hideTimeZone?: boolean;
  /**
   * Max value.
   */
  maxValue?: TimeValue;
  /**
   * Min value.
   */
  minValue?: TimeValue;
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
   * Whether the time is unavailable.
   */
  isTimeUnavailable?: TimeMatcher;
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
 * Events for the time range picker root component.
 */
export type TimeRangePickerRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [range: TimeRange];
  /**
   * Emitted when the placeholder value changes.
   */
  'update:placeholder': [time: TimeValue];
  /**
   * Emitted when the start value changes.
   */
  'update:startValue': [time: TimeValue | undefined];
  /**
   * Emitted when the end value changes.
   */
  'update:endValue': [time: TimeValue | undefined];
  /**
   * Emitted when the open state changes.
   */
  'update:open': [open: boolean];
};

/**
 * Properties for the time range picker trigger component.
 */
export interface TimeRangePickerTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}
/**
 * Properties for the time range picker popup component.
 */
export interface TimeRangePickerPopupProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Context for the time range picker root component.
 */
export interface TimeRangePickerRootContext extends PropsToContext<TimeRangePickerRootProps, 'disabled' | 'readonly'> {
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
  modelValue: ShallowRef<TimeRange>;
  /**
   * Placeholder used by the component context.
   */
  placeholder: ShallowRef<TimeValue>;
  /**
   * Whether the time is unavailable.
   */
  isTimeUnavailable?: TimeMatcher;
  /**
   * Whether the current value is invalid.
   */
  isInvalid: ComputedRef<boolean>;
  /**
   * Formatter used by the component context.
   */
  formatter: Formatter;
  /**
   * Granularity used by the component context.
   */
  granularity: ComputedRef<TimeGranularity>;
  /**
   * Hour cycle used by the component context.
   */
  hourCycle: HourCycle;
  /**
   * Whether hide time zone.
   */
  hideTimeZone: ComputedRef<boolean>;
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
  /**
   * Popup id used by the component context.
   */
  popupId: string;
  /**
   * Display value used by the component context.
   */
  displayValue: ComputedRef<string>;
  /**
   * Focused time used by the component context.
   */
  focusedTime: ShallowRef<TimeValue>;
  /**
   * Hovered time used by the component context.
   */
  hoveredTime: ShallowRef<TimeValue | undefined>;
  /**
   * Options used by the component context.
   */
  options: ComputedRef<TimePickerOption[]>;
  /**
   * Min value used by the component context.
   */
  minValue: ComputedRef<TimeValue | undefined>;
  /**
   * Max value used by the component context.
   */
  maxValue: ComputedRef<TimeValue | undefined>;
  /**
   * Callback invoked when the range changes.
   */
  onRangeChange: (time: TimeValue) => void;
  /**
   * Callback invoked when the placeholder changes.
   */
  onPlaceholderChange: (time: TimeValue) => void;
  /**
   * Whether the time is disabled.
   */
  isTimeDisabled: (time: TimeValue) => boolean;
  /**
   * Whether the time is selected.
   */
  isTimeSelected: (time: TimeValue) => boolean;
  /**
   * Whether the time is highlighted.
   */
  isTimeHighlighted: (time: TimeValue) => boolean;
  /**
   * Whether a range start.
   */
  isRangeStart: (time: TimeValue) => boolean;
  /**
   * Whether a range end.
   */
  isRangeEnd: (time: TimeValue) => boolean;
  /**
   * Set open used by the component context.
   */
  setOpen: (value: boolean) => void;
  /**
   * Set focused time used by the component context.
   */
  setFocusedTime: (time: TimeValue) => void;
  /**
   * Set hovered time used by the component context.
   */
  setHoveredTime: (time: TimeValue | undefined) => void;
}

/**
 * Available UI slots for the time range picker component.
 */
export type TimeRangePickerUiSlot = 'root' | 'trigger' | 'popup' | 'list' | 'cellTrigger';
/**
 * UI class overrides for the time range picker component.
 */
export type TimeRangePickerUi = UiClass<TimeRangePickerUiSlot>;

/**
 * Properties for the time range picker compact component.
 */
export interface TimeRangePickerCompactProps extends TimeRangePickerRootProps {
  /**
   * Properties forwarded to the trigger element.
   */
  triggerProps?: TimeRangePickerTriggerProps;
  /**
   * Properties forwarded to the popup element.
   */
  popupProps?: TimeRangePickerPopupProps;
}

/**
 * Events for the time range picker compact component.
 */
export type TimeRangePickerCompactEmits = TimeRangePickerRootEmits;

/**
 * Slots for the time range picker compact component.
 */
export type TimeRangePickerCompactSlots = {
  /**
   * Custom content for the default slot.
   */
  default?: (props: { modelValue: TimeRange; placeholder: TimeValue; displayValue: string; open: boolean }) => any;
  /**
   * Custom content for the trigger slot.
   */
  trigger?: (props: { displayValue: string; modelValue: TimeRange; open: boolean }) => any;
  /**
   * Custom content for the time slot.
   */
  time?: (props: {
    label: string;
    time: TimeValue;
    disabled: boolean;
    focused: boolean;
    highlighted: boolean;
    selected: boolean;
    rangeStart: boolean;
    rangeEnd: boolean;
  }) => any;
};
