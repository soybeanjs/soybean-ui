import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { DateRange, DateValue, Formatter } from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface MonthRangePickerRootProps
  extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  defaultValue?: DateRange;
  defaultPlaceholder?: DateValue;
  placeholder?: DateValue;
  modelValue?: DateRange;
  minValue?: DateValue;
  maxValue?: DateValue;
  locale?: string;
  disabled?: boolean;
  readonly?: boolean;
  id?: string;
  dir?: Direction;
  defaultOpen?: boolean;
  open?: boolean;
  modal?: boolean;
}

export type MonthRangePickerRootEmits = {
  'update:modelValue': [range: DateRange];
  'update:placeholder': [date: DateValue];
  'update:startValue': [date: DateValue | undefined];
  'update:endValue': [date: DateValue | undefined];
  'update:open': [open: boolean];
};

export interface MonthRangePickerTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}
export interface MonthRangePickerPopupProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface MonthRangePickerRootContext extends PropsToContext<
  MonthRangePickerRootProps,
  'disabled' | 'readonly'
> {
  locale: ComputedRef<string>;
  dir: ComputedRef<Direction>;
  modelValue: ShallowRef<DateRange>;
  placeholder: ShallowRef<DateValue>;
  isInvalid: ComputedRef<boolean>;
  formatter: Formatter;
  open: ShallowRef<boolean | undefined>;
  popupId: string;
  displayValue: ComputedRef<string>;
  headingValue: ComputedRef<string>;
  focusedMonth: ShallowRef<DateValue>;
  hoveredMonth: ShallowRef<DateValue | undefined>;
  minValue: ComputedRef<DateValue | undefined>;
  maxValue: ComputedRef<DateValue | undefined>;
  hasSelectedRange: ComputedRef<boolean>;
  onRangeChange: (month: DateValue) => void;
  onPlaceholderChange: (date: DateValue) => void;
  isMonthDisabled: (date: DateValue) => boolean;
  isMonthSelected: (date: DateValue) => boolean;
  isMonthHighlighted: (date: DateValue) => boolean;
  isRangeStart: (date: DateValue) => boolean;
  isRangeEnd: (date: DateValue) => boolean;
  setOpen: (value: boolean) => void;
  setFocusedMonth: (date: DateValue) => void;
  setHoveredMonth: (date: DateValue | undefined) => void;
  prevPage: () => void;
  nextPage: () => void;
  isPrevButtonDisabled: () => boolean;
  isNextButtonDisabled: () => boolean;
}

export type MonthRangePickerUiSlot =
  | 'root'
  | 'trigger'
  | 'popup'
  | 'header'
  | 'heading'
  | 'prev'
  | 'next'
  | 'grid'
  | 'cellTrigger';
export type MonthRangePickerUi = UiClass<MonthRangePickerUiSlot>;
