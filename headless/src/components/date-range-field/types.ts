import type { DateValue } from '@internationalized/date';
import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';

import type { DateInputType, DateRange, DateStep, Formatter, Granularity, HourCycle, Matcher, SegmentPart, SegmentValueObj } from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface DateRangeFieldRootProps
  extends PrimitiveProps,
    FormFieldCommonProps,
    /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  defaultValue?: DateRange;
  defaultPlaceholder?: DateValue;
  placeholder?: DateValue;
  modelValue?: DateRange;
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
  startName?: string;
  endName?: string;
}

export type DateRangeFieldRootEmits = {
  'update:modelValue': [range: DateRange];
  'update:placeholder': [date: DateValue];
  'update:startValue': [date: DateValue | undefined];
  'update:endValue': [date: DateValue | undefined];
};

export interface DateRangeFieldInputProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  part: SegmentPart;
  type?: 'start' | 'end';
}

export interface DateRangeFieldSegment {
  part: SegmentPart;
  value: string;
}

export interface DateRangeFieldRootContext extends PropsToContext<DateRangeFieldRootProps, 'disabled' | 'readonly'> {
  locale: ComputedRef<string>;
  dir: ComputedRef<Direction>;
  modelValue: ShallowRef<DateRange>;
  placeholder: ShallowRef<DateValue>;
  isDateUnavailable?: Matcher;
  isInvalid: ComputedRef<boolean>;
  formatter: Formatter;
  hourCycle: HourCycle;
  step: ComputedRef<DateStep>;
  startSegmentValues: ShallowRef<SegmentValueObj>;
  endSegmentValues: ShallowRef<SegmentValueObj>;
  startSegmentContents: ComputedRef<DateRangeFieldSegment[]>;
  endSegmentContents: ComputedRef<DateRangeFieldSegment[]>;
  startInputType: ComputedRef<DateInputType>;
  endInputType: ComputedRef<DateInputType>;
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

export type DateRangeFieldUiSlot = 'root' | 'input' | 'separator';
export type DateRangeFieldUi = UiClass<DateRangeFieldUiSlot>;

export interface DateRangeFieldCompactProps extends DateRangeFieldRootProps {
  inputProps?: Omit<DateRangeFieldInputProps, 'part' | 'type'>;
  separator?: string;
}

export type DateRangeFieldCompactEmits = DateRangeFieldRootEmits;

export type DateRangeFieldCompactSlots = {
  default?: (props: {
    startSegments: DateRangeFieldSegment[];
    endSegments: DateRangeFieldSegment[];
    modelValue: DateRange;
  }) => any;
  separator?: () => any;
};
