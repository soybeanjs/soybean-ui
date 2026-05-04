import type { DateValue } from '@internationalized/date';
import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type {
  DateInputType,
  DateStep,
  Formatter,
  Granularity,
  HourCycle,
  Matcher,
  SegmentPart,
  SegmentValueObj
} from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Properties for the date field root component.
 */
export interface DateFieldRootProps
  extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
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
 * Events for the date field root component.
 */
export type DateFieldRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [date: DateValue | undefined];
  /**
   * Emitted when the placeholder value changes.
   */
  'update:placeholder': [date: DateValue];
};

/**
 * Properties for the date field input component.
 */
export interface DateFieldInputProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  /**
   * Part.
   */
  part: SegmentPart;
}

/**
 * Type information for the date field segment component.
 */
export interface DateFieldSegment {
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
 * Properties for the date field compact component.
 */
export interface DateFieldCompactProps extends DateFieldRootProps {
  /**
   * Properties forwarded to the input element.
   */
  inputProps?: Omit<DateFieldInputProps, 'part'>;
}

/**
 * Events for the date field compact component.
 */
export type DateFieldCompactEmits = DateFieldRootEmits;

/**
 * Context for the date field root component.
 */
export interface DateFieldRootContext extends PropsToContext<DateFieldRootProps, 'disabled' | 'readonly'> {
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
   * Segment values used by the component context.
   */
  segmentValues: ShallowRef<SegmentValueObj>;
  /**
   * Segment contents used by the component context.
   */
  segmentContents: ComputedRef<DateFieldSegment[]>;
  /**
   * Input type used by the component context.
   */
  inputType: ComputedRef<DateInputType>;
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
 * Available UI slots for the date field component.
 */
export type DateFieldUiSlot = 'root' | 'input';
/**
 * UI class overrides for the date field component.
 */
export type DateFieldUi = UiClass<DateFieldUiSlot>;
