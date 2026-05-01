import type { DateValue } from '@internationalized/date';
import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { DateStep, Formatter, Granularity, HourCycle, Matcher, SegmentPart } from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface DatePickerRootProps
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
  defaultOpen?: boolean;
  open?: boolean;
  modal?: boolean;
}

export type DatePickerRootEmits = {
  'update:modelValue': [date: DateValue | undefined];
  'update:placeholder': [date: DateValue];
  'update:open': [open: boolean];
};

export interface DatePickerInputProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {
  part: SegmentPart;
}

export interface DatePickerTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface DatePickerPopupProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface DatePickerRootContext extends PropsToContext<DatePickerRootProps, 'disabled' | 'readonly'> {
  locale: ComputedRef<string>;
  dir: ComputedRef<Direction>;
  modelValue: ShallowRef<DateValue | undefined>;
  placeholder: ShallowRef<DateValue>;
  isDateUnavailable?: Matcher;
  isInvalid: ComputedRef<boolean>;
  formatter: Formatter;
  hourCycle: HourCycle;
  step: ComputedRef<DateStep>;
  open: ShallowRef<boolean | undefined>;
  isPlaceholderFocusable: ComputedRef<boolean>;
  hasSelectedDate: ComputedRef<boolean>;
  isSelectedDateDisabled: ComputedRef<boolean>;
  minValue: ComputedRef<DateValue | undefined>;
  maxValue: ComputedRef<DateValue | undefined>;
  onDateChange: (date: DateValue) => void;
  onPlaceholderChange: (date: DateValue) => void;
  isDateDisabled: Matcher;
  isDateSelected: Matcher;
  setOpen: (value: boolean) => void;
}

export type DatePickerUiSlot = 'root' | 'trigger' | 'popup' | 'input' | 'calendar';
export type DatePickerUi = UiClass<DatePickerUiSlot>;
