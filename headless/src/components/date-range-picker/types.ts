import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';

import type { DateRange, DateStep, Formatter, Granularity, HourCycle, Matcher, SegmentPart, DateValue } from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface DateRangePickerRootProps
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
  defaultOpen?: boolean;
  open?: boolean;
  modal?: boolean;
}

export type DateRangePickerRootEmits = {
  'update:modelValue': [range: DateRange];
  'update:placeholder': [date: DateValue];
  'update:startValue': [date: DateValue | undefined];
  'update:endValue': [date: DateValue | undefined];
  'update:open': [open: boolean];
};

export interface DateRangePickerInputProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  part: SegmentPart;
}

export interface DateRangePickerTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface DateRangePickerPopupProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface DateRangePickerRootContext extends PropsToContext<DateRangePickerRootProps, 'disabled' | 'readonly'> {
  locale: ComputedRef<string>;
  dir: ComputedRef<Direction>;
  modelValue: ShallowRef<DateRange>;
  placeholder: ShallowRef<DateValue>;
  isDateUnavailable?: Matcher;
  isInvalid: ComputedRef<boolean>;
  formatter: Formatter;
  hourCycle: HourCycle;
  step: ComputedRef<DateStep>;
  open: ShallowRef<boolean | undefined>;
  isPlaceholderFocusable: ComputedRef<boolean>;
  hasSelectedRange: ComputedRef<boolean>;
  isStartDateDisabled: ComputedRef<boolean>;
  isEndDateDisabled: ComputedRef<boolean>;
  minValue: ComputedRef<DateValue | undefined>;
  maxValue: ComputedRef<DateValue | undefined>;
  onRangeChange: (range: DateRange) => void;
  onPlaceholderChange: (date: DateValue) => void;
  isDateDisabled: Matcher;
  isDateSelected: Matcher;
  isDateHovered: Matcher;
  setOpen: (value: boolean) => void;
  setHoveredDate: (date: DateValue | undefined) => void;
  hoveredDate: ShallowRef<DateValue | undefined>;
}

export type DateRangePickerUiSlot = 'root' | 'trigger' | 'popup' | 'input' | 'calendar';
export type DateRangePickerUi = UiClass<DateRangePickerUiSlot>;

export interface DateRangePickerCompactProps extends DateRangePickerRootProps {
  triggerProps?: DateRangePickerTriggerProps;
  popupProps?: DateRangePickerPopupProps;
}

export type DateRangePickerCompactEmits = DateRangePickerRootEmits;

export type DateRangePickerCompactSlots = {
  default?: (props: {
    modelValue: DateRange;
    placeholder: DateValue;
    setPlaceholder: (date: DateValue) => void;
    setRange: (range: DateRange) => void;
    open: boolean;
  }) => any;
  trigger?: (props: { modelValue: DateRange; open: boolean }) => any;
  calendar?: (props: {
    modelValue: DateRange;
    placeholder: DateValue;
    setPlaceholder: (date: DateValue) => void;
    setRange: (range: DateRange) => void;
  }) => any;
};
