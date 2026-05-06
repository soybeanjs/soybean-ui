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
  TimeValue
} from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveWithBaseProps } from '../primitive/types';

/**
 * Properties for the TimeFieldRoot component.
 */
export interface TimeFieldRootProps extends FormFieldCommonProps, Omit<PrimitiveWithBaseProps, 'placeholder'> {
  /**
   * Default value.
   */
  defaultValue?: TimeValue;
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
  modelValue?: TimeValue;
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
}

/**
 * Events for the TimeFieldRoot component.
 */
export type TimeFieldRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [time: TimeValue | undefined];
  /**
   * Emitted when the placeholder value changes.
   */
  'update:placeholder': [time: TimeValue];
};

/**
 * Properties for the TimeFieldInput component.
 */
export interface TimeFieldInputProps extends PrimitiveWithBaseProps {
  /**
   * Part.
   */
  part: SegmentPart;
}

/**
 * Type information for TimeFieldSegment.
 */
export interface TimeFieldSegment {
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
 * Context for the TimeFieldRoot component.
 */
export interface TimeFieldRootContext extends PropsToContext<TimeFieldRootProps, 'disabled' | 'readonly'> {
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
  modelValue: ShallowRef<TimeValue | undefined>;
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
   * Segment values used by the component context.
   */
  segmentValues: ShallowRef<SegmentValueObj>;
  /**
   * Segment contents used by the component context.
   */
  segmentContents: ComputedRef<TimeFieldSegment[]>;
  /**
   * Input type used by the component context.
   */
  inputType: ComputedRef<TimeInputType>;
  /**
   * Input value used by the component context.
   */
  inputValue: ComputedRef<string>;
  /**
   * Input max value used by the component context.
   */
  inputMaxValue: ComputedRef<string | undefined>;
  /**
   * Input min value used by the component context.
   */
  inputMinValue: ComputedRef<string | undefined>;
  /**
   * Elements used by the component context.
   */
  elements: ShallowRef<HTMLElement[]>;
  /**
   * Focus next used by the component context.
   */
  focusNext: () => void;
  /**
   * Set focused element used by the component context.
   */
  setFocusedElement: (el: HTMLElement) => void;
}

/**
 * Available UI slots for the TimeField component.
 */
export type TimeFieldUiSlot = 'root' | 'input';
/**
 * UI class overrides for the TimeField component.
 */
export type TimeFieldUi = UiClass<TimeFieldUiSlot>;
