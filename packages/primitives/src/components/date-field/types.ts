import type { Ref } from 'vue';
import type {
  DateFormatter,
  DateStep,
  DateValue,
  Granularity,
  HourCycle,
  Matcher,
  SegmentPart,
  SegmentValueObj
} from '../../date';
import type { ClassValueProp, Direction, FormFieldProps, PrimitiveProps } from '../../types';

// DateFieldRoot
export interface DateFieldRootProps extends ClassValueProp, FormFieldProps {
  /** The default value for the calendar */
  defaultValue?: DateValue;
  /** The default placeholder date */
  defaultPlaceholder?: DateValue;
  /**
   * The placeholder date, which is used to determine what month to display when no date is selected. This updates as
   * the user navigates the calendar and can be used to programmatically control the calendar view
   */
  placeholder?: DateValue;
  /** The controlled checked state of the calendar. Can be bound as `v-model`. */
  modelValue?: DateValue | null;
  /** The hour cycle used for formatting times. Defaults to the local preference */
  hourCycle?: HourCycle;
  /** The stepping interval for the time fields. Defaults to `1`. */
  step?: DateStep;
  /**
   * The granularity to use for formatting times. Defaults to day if a CalendarDate is provided, otherwise defaults to
   * minute. The field will render segments for each part of the date up to and including the specified granularity
   */
  granularity?: Granularity;
  /** Whether or not to hide the time zone segment of the field */
  hideTimeZone?: boolean;
  /** The maximum date that can be selected */
  maxValue?: DateValue;
  /** The minimum date that can be selected */
  minValue?: DateValue;
  /** The locale to use for formatting dates */
  locale?: string;
  /** Whether or not the date field is disabled */
  disabled?: boolean;
  /** Whether or not the date field is readonly */
  readonly?: boolean;
  /** A function that returns whether or not a date is unavailable */
  isDateUnavailable?: Matcher;
  /** Id of the element */
  id?: string;
  /**
   * The reading direction of the date field when applicable. <br> If omitted, inherits globally from `ConfigProvider`
   * or assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
}
export type DateFieldRootPropsWithPrimitive = DateFieldRootProps & PrimitiveProps;

export type DateFieldRootEmits = {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [date: DateValue | undefined];
  /** Event handler called whenever the placeholder value changes */
  'update:placeholder': [date: DateValue];
};

export type DateFieldRootContext = {
  locale: Ref<string>;
  modelValue: Ref<DateValue | undefined>;
  placeholder: Ref<DateValue>;
  isDateUnavailable?: Matcher;
  isInvalid: Ref<boolean>;
  disabled: Ref<boolean>;
  readonly: Ref<boolean>;
  formatter: DateFormatter;
  hourCycle: HourCycle;
  step: Ref<DateStep>;
  segmentValues: Ref<SegmentValueObj>;
  segmentContents: Ref<{ part: SegmentPart; value: string }[]>;
  elements: Ref<Set<HTMLElement>>;
  focusNext: () => void;
  setFocusedElement: (el: HTMLElement) => void;
};

// DateFieldInput
export interface DateFieldInputProps extends ClassValueProp {
  /** The part of the date to render */
  part: SegmentPart;
}
export type DateFieldInputPropsWithPrimitive = DateFieldInputProps & PrimitiveProps;
