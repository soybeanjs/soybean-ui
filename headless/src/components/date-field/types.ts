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

export interface DateFieldRootProps
  extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  defaultValue?: DateValue;
  defaultPlaceholder?: DateValue;
  placeholder?: DateValue;
  modelValue?: DateValue;
  hourCycle?: HourCycle;
  step?: DateStep;
  granularity?: Granularity;
  hideTimeZone?: boolean;
  maxValue?: DateValue;
  minValue?: DateValue;
  locale?: string;
  disabled?: boolean;
  readonly?: boolean;
  isDateUnavailable?: Matcher;
  id?: string;
  dir?: Direction;
}

export type DateFieldRootEmits = {
  'update:modelValue': [date: DateValue | undefined];
  'update:placeholder': [date: DateValue];
};

export interface DateFieldInputProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  part: SegmentPart;
}

export interface DateFieldSegment {
  part: SegmentPart;
  value: string;
}

export interface DateFieldRootContext extends PropsToContext<DateFieldRootProps, 'disabled' | 'readonly'> {
  locale: ComputedRef<string>;
  dir: ComputedRef<Direction>;
  modelValue: ShallowRef<DateValue | undefined>;
  placeholder: ShallowRef<DateValue>;
  isDateUnavailable?: Matcher;
  isInvalid: ComputedRef<boolean>;
  formatter: Formatter;
  hourCycle: HourCycle;
  step: ComputedRef<DateStep>;
  segmentValues: ShallowRef<SegmentValueObj>;
  segmentContents: ComputedRef<DateFieldSegment[]>;
  inputType: ComputedRef<DateInputType>;
  inputValue: ComputedRef<string>;
  inputMaxValue: ComputedRef<string | undefined>;
  inputMinValue: ComputedRef<string | undefined>;
  elements: ShallowRef<HTMLElement[]>;
  focusNext: () => void;
  setFocusedElement: (el: HTMLElement) => void;
}

export type DateFieldUiSlot = 'root' | 'input';
export type DateFieldUi = UiClass<DateFieldUiSlot>;
