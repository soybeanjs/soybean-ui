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
  TimeValue
} from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface TimeFieldRootProps
  extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  defaultValue?: TimeValue;
  defaultPlaceholder?: TimeValue;
  placeholder?: TimeValue;
  modelValue?: TimeValue;
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
}

export type TimeFieldRootEmits = {
  'update:modelValue': [time: TimeValue | undefined];
  'update:placeholder': [time: TimeValue];
};

export interface TimeFieldInputProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  part: SegmentPart;
}

export interface TimeFieldSegment {
  part: SegmentPart;
  value: string;
}

export interface TimeFieldRootContext extends PropsToContext<TimeFieldRootProps, 'disabled' | 'readonly'> {
  locale: ComputedRef<string>;
  dir: ComputedRef<Direction>;
  modelValue: ShallowRef<TimeValue | undefined>;
  placeholder: ShallowRef<TimeValue>;
  isTimeUnavailable?: TimeMatcher;
  isInvalid: ComputedRef<boolean>;
  formatter: Formatter;
  hourCycle: HourCycle;
  step: ComputedRef<DateStep>;
  segmentValues: ShallowRef<SegmentValueObj>;
  segmentContents: ComputedRef<TimeFieldSegment[]>;
  inputType: ComputedRef<TimeInputType>;
  inputValue: ComputedRef<string>;
  inputMaxValue: ComputedRef<string | undefined>;
  inputMinValue: ComputedRef<string | undefined>;
  elements: ShallowRef<HTMLElement[]>;
  focusNext: () => void;
  setFocusedElement: (el: HTMLElement) => void;
}

export type TimeFieldUiSlot = 'root' | 'input';
export type TimeFieldUi = UiClass<TimeFieldUiSlot>;
