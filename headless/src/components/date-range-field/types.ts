import type { DateValue } from '@internationalized/date';
import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type {
  DateInputType,
  DateRange,
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
 * Props for the date range field root component.
 */
export interface DateRangeFieldRootProps
  extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
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
   * Start name.
   */
  startName?: string;
  /**
   * End name.
   */
  endName?: string;
}

/**
 * Emits for the date range field root component.
 */
export type DateRangeFieldRootEmits = {
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
};

/**
 * Props for the date range field input component.
 */
export interface DateRangeFieldInputProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
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
 * Type information for the date range field segment component.
 */
export interface DateRangeFieldSegment {
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
 * Context for the date range field root component.
 */
export interface DateRangeFieldRootContext extends PropsToContext<DateRangeFieldRootProps, 'disabled' | 'readonly'> {
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
  startSegmentContents: ComputedRef<DateRangeFieldSegment[]>;
  /**
   * End segment contents used by the component context.
   */
  endSegmentContents: ComputedRef<DateRangeFieldSegment[]>;
  /**
   * Start input type used by the component context.
   */
  startInputType: ComputedRef<DateInputType>;
  /**
   * End input type used by the component context.
   */
  endInputType: ComputedRef<DateInputType>;
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
 * Available UI slots for the date range field component.
 */
export type DateRangeFieldUiSlot = 'root' | 'input' | 'separator';
/**
 * UI class overrides for the date range field component.
 */
export type DateRangeFieldUi = UiClass<DateRangeFieldUiSlot>;

/**
 * Props for the date range field compact component.
 */
export interface DateRangeFieldCompactProps extends DateRangeFieldRootProps {
  /**
   * Props forwarded to the input element.
   */
  inputProps?: Omit<DateRangeFieldInputProps, 'part' | 'type'>;
  /**
   * Separator.
   */
  separator?: string;
}

/**
 * Emits for the date range field compact component.
 */
export type DateRangeFieldCompactEmits = DateRangeFieldRootEmits;

/**
 * Slots for the date range field compact component.
 */
export type DateRangeFieldCompactSlots = {
  /**
   * Custom content for the default slot.
   */
  default?: (props: {
    startSegments: DateRangeFieldSegment[];
    endSegments: DateRangeFieldSegment[];
    modelValue: DateRange;
    isInvalid: boolean;
  }) => any;
  /**
   * Custom content for the separator slot.
   */
  separator?: () => any;
};
