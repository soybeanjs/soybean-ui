import type { Ref } from 'vue';
import type {
  DateFormatter,
  DateStep,
  DateValue,
  HourCycle,
  SegmentPart,
  SegmentValueObj,
  TimeValue
} from '../../date';
import type { ClassValueProp, Direction, FormFieldProps, PrimitiveProps } from '../../types';

export interface TimeFieldRootProps extends ClassValueProp, FormFieldProps {
  /** The default value for the calendar */
  defaultValue?: TimeValue;
  /** The default placeholder date */
  defaultPlaceholder?: TimeValue;
  /**
   * The placeholder date, which is used to determine what time to display when no time is selected. This updates as the
   * user navigates the field
   */
  placeholder?: TimeValue;
  /** The controlled checked state of the field. Can be bound as `v-model`. */
  modelValue?: TimeValue | null;
  /** The hour cycle used for formatting times. Defaults to the local preference */
  hourCycle?: HourCycle;
  /** The stepping interval for the time fields. Defaults to `1`. */
  step?: DateStep;
  /**
   * The granularity to use for formatting times. Defaults to minute if a Time is provided, otherwise defaults to
   * minute. The field will render segments for each part of the date up to and including the specified granularity
   */
  granularity?: 'hour' | 'minute' | 'second';
  /** Whether or not to hide the time zone segment of the field */
  hideTimeZone?: boolean;
  /** The maximum date that can be selected */
  maxValue?: TimeValue;
  /** The minimum date that can be selected */
  minValue?: TimeValue;
  /** The locale to use for formatting dates */
  locale?: string;
  /** Whether or not the time field is disabled */
  disabled?: boolean;
  /** Whether or not the time field is readonly */
  readonly?: boolean;
  /** Id of the element */
  id?: string;
  /**
   * The reading direction of the time field when applicable. <br> If omitted, inherits globally from `ConfigProvider`
   * or assumes LTR (left-to-right) reading mode.
   */
  dir?: Direction;
}
export type TimeFieldRootPropsWithPrimitive = TimeFieldRootProps & PrimitiveProps;

export type TimeFieldRootEmits = {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [date: TimeValue | undefined];
  /** Event handler called whenever the placeholder value changes */
  'update:placeholder': [date: TimeValue];
};

export type TimeFieldRootContext = {
  locale: Ref<string>;
  modelValue: Ref<DateValue | undefined>;
  placeholder: Ref<DateValue>;
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

export interface TimeFieldInputProps extends ClassValueProp {
  /** The part of the date to render */
  part: SegmentPart;
}
export type TimeFieldInputPropsWithPrimitive = TimeFieldInputProps & PrimitiveProps;
