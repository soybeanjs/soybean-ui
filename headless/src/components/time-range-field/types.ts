import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
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
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface TimeRangeFieldRootProps
  extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  defaultValue?: TimeRange;
  defaultPlaceholder?: TimeValue;
  placeholder?: TimeValue;
  modelValue?: TimeRange;
  hourCycle?: HourCycle;
  step?: DateStep;
  granularity?: TimeGranularity;
  hideTimeZone?: boolean;
  maxValue?: TimeValue;
  minValue?: TimeValue;
  locale?: string;
  disabled?: boolean;
  readonly?: boolean;
  isTimeUnavailable?: TimeMatcher;
  id?: string;
  dir?: Direction;
  startName?: string;
  endName?: string;
}

export type TimeRangeFieldRootEmits = {
  'update:modelValue': [range: TimeRange];
  'update:placeholder': [time: TimeValue];
  'update:startValue': [time: TimeValue | undefined];
  'update:endValue': [time: TimeValue | undefined];
};

export interface TimeRangeFieldInputProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  part: SegmentPart;
  type?: 'start' | 'end';
}

export interface TimeRangeFieldSegment {
  part: SegmentPart;
  value: string;
}

export interface TimeRangeFieldRootContext extends PropsToContext<TimeRangeFieldRootProps, 'disabled' | 'readonly'> {
  locale: ComputedRef<string>;
  dir: ComputedRef<Direction>;
  modelValue: ShallowRef<TimeRange>;
  placeholder: ShallowRef<TimeValue>;
  isTimeUnavailable?: TimeMatcher;
  isInvalid: ComputedRef<boolean>;
  formatter: Formatter;
  hourCycle: HourCycle;
  step: ComputedRef<DateStep>;
  startSegmentValues: ShallowRef<SegmentValueObj>;
  endSegmentValues: ShallowRef<SegmentValueObj>;
  startSegmentContents: ComputedRef<TimeRangeFieldSegment[]>;
  endSegmentContents: ComputedRef<TimeRangeFieldSegment[]>;
  startInputType: ComputedRef<TimeInputType>;
  endInputType: ComputedRef<TimeInputType>;
  startInputValue: ComputedRef<string>;
  endInputValue: ComputedRef<string>;
  inputMaxValue: ComputedRef<string | undefined>;
  inputMinValue: ComputedRef<string | undefined>;
  startElements: ShallowRef<HTMLElement[]>;
  endElements: ShallowRef<HTMLElement[]>;
  focusedType: ShallowRef<'start' | 'end'>;
  focusNext: (type: 'start' | 'end') => void;
  setFocusedElement: (el: HTMLElement, type: 'start' | 'end') => void;
}

export type TimeRangeFieldUiSlot = 'root' | 'input' | 'separator';
export type TimeRangeFieldUi = UiClass<TimeRangeFieldUiSlot>;

export interface TimeRangeFieldCompactProps extends TimeRangeFieldRootProps {
  inputProps?: Omit<TimeRangeFieldInputProps, 'part' | 'type'>;
  separator?: string;
}

export type TimeRangeFieldCompactEmits = TimeRangeFieldRootEmits;

export type TimeRangeFieldCompactSlots = {
  default?: (props: {
    startSegments: TimeRangeFieldSegment[];
    endSegments: TimeRangeFieldSegment[];
    modelValue: TimeRange;
    isInvalid: boolean;
  }) => any;
  separator?: () => any;
};
