import type { ComputedRef, ShallowRef } from 'vue';
import type {
  DateStep,
  Formatter,
  HourCycle,
  SegmentPart,
  SegmentValueObj,
  TimeGranularity,
  TimeInputType,
  TimeMatcher,
  TimeRange,
  TimeValue
} from '../../date';
import type { BaseProps, Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Properties for the TimeRangeFieldRoot component.
 */
export interface TimeRangeFieldRootProps extends PrimitiveProps, FormFieldCommonProps, Omit<BaseProps, 'placeholder'> {
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
   * Start name.
   */
  startName?: string;
  /**
   * End name.
   */
  endName?: string;
}

/**
 * Events for the TimeRangeFieldRoot component.
 */
export type TimeRangeFieldRootEmits = {
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
};

/**
 * Properties for the TimeRangeFieldInput component.
 */
export interface TimeRangeFieldInputProps extends PrimitiveProps, BaseProps {
  /**
   * Part.
   */
  part: SegmentPart;
  /**
   * Type.
   */
  type?: 'start' | 'end';
}

/**
 * Type information for TimeRangeFieldSegment.
 */
export interface TimeRangeFieldSegment {
  /**
   * Part.
   */
  part: SegmentPart;
  /**
   * Value associated with the current item.
   */
  value: string;
}

/**
 * Context for the TimeRangeFieldRoot component.
 */
export interface TimeRangeFieldRootContext extends PropsToContext<TimeRangeFieldRootProps, 'disabled' | 'readonly'> {
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
   * Hour cycle used by the component context.
   */
  hourCycle: HourCycle;
  /**
   * Step used by the component context.
   */
  step: ComputedRef<DateStep>;
  /**
   * Start segment values used by the component context.
   */
  startSegmentValues: ShallowRef<SegmentValueObj>;
  /**
   * End segment values used by the component context.
   */
  endSegmentValues: ShallowRef<SegmentValueObj>;
  /**
   * Start segment contents used by the component context.
   */
  startSegmentContents: ComputedRef<TimeRangeFieldSegment[]>;
  /**
   * End segment contents used by the component context.
   */
  endSegmentContents: ComputedRef<TimeRangeFieldSegment[]>;
  /**
   * Start input type used by the component context.
   */
  startInputType: ComputedRef<TimeInputType>;
  /**
   * End input type used by the component context.
   */
  endInputType: ComputedRef<TimeInputType>;
  /**
   * Start input value used by the component context.
   */
  startInputValue: ComputedRef<string>;
  /**
   * End input value used by the component context.
   */
  endInputValue: ComputedRef<string>;
  /**
   * Input max value used by the component context.
   */
  inputMaxValue: ComputedRef<string | undefined>;
  /**
   * Input min value used by the component context.
   */
  inputMinValue: ComputedRef<string | undefined>;
  /**
   * Start elements used by the component context.
   */
  startElements: ShallowRef<HTMLElement[]>;
  /**
   * End elements used by the component context.
   */
  endElements: ShallowRef<HTMLElement[]>;
  /**
   * Focused type used by the component context.
   */
  focusedType: ShallowRef<'start' | 'end'>;
  /**
   * Focus next used by the component context.
   */
  focusNext: (type: 'start' | 'end') => void;
  /**
   * Set focused element used by the component context.
   */
  setFocusedElement: (el: HTMLElement, type: 'start' | 'end') => void;
}

/**
 * Available UI slots for the TimeRangeField component.
 */
export type TimeRangeFieldUiSlot = 'root' | 'input' | 'separator';
/**
 * UI class overrides for the TimeRangeField component.
 */
export type TimeRangeFieldUi = UiClass<TimeRangeFieldUiSlot>;

/**
 * Properties for the TimeRangeFieldCompact component.
 */
export interface TimeRangeFieldCompactProps extends TimeRangeFieldRootProps {
  /**
   * Properties forwarded to the input element.
   */
  inputProps?: Omit<TimeRangeFieldInputProps, 'part' | 'type'>;
  /**
   * Separator.
   */
  separator?: string;
}

/**
 * Events for the TimeRangeFieldCompact component.
 */
export type TimeRangeFieldCompactEmits = TimeRangeFieldRootEmits;

/**
 * Slots for the TimeRangeFieldCompact component.
 */
export type TimeRangeFieldCompactSlots = {
  /**
   * Custom content for the default slot.
   */
  default?: (props: {
    startSegments: TimeRangeFieldSegment[];
    endSegments: TimeRangeFieldSegment[];
    modelValue: TimeRange;
    isInvalid: boolean;
  }) => any;
  /**
   * Custom content for the separator slot.
   */
  separator?: () => any;
};
