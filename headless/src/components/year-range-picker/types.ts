import type { DateValue } from '@internationalized/date';
import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { DateRange, Formatter, Grid } from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface YearRangePickerRootProps
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

export type YearRangePickerRootEmits = {
  'update:modelValue': [range: DateRange];
  'update:placeholder': [date: DateValue];
  'update:startValue': [date: DateValue | undefined];
  'update:endValue': [date: DateValue | undefined];
  'update:open': [open: boolean];
};

export interface YearRangePickerTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}
export interface YearRangePickerPopupProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface YearRangePickerRootContext extends PropsToContext<YearRangePickerRootProps, 'disabled' | 'readonly'> {
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
  focusedYear: ShallowRef<DateValue>;
  hoveredYear: ShallowRef<DateValue | undefined>;
  yearGrid: ComputedRef<Grid<DateValue>>;
  minValue: ComputedRef<DateValue | undefined>;
  maxValue: ComputedRef<DateValue | undefined>;
  hasSelectedRange: ComputedRef<boolean>;
  onRangeChange: (date: DateValue) => void;
  onPlaceholderChange: (date: DateValue) => void;
  isYearDisabled: (date: DateValue) => boolean;
  isYearSelected: (date: DateValue) => boolean;
  isYearHighlighted: (date: DateValue) => boolean;
  isRangeStart: (date: DateValue) => boolean;
  isRangeEnd: (date: DateValue) => boolean;
  setOpen: (value: boolean) => void;
  setFocusedYear: (date: DateValue) => void;
  setHoveredYear: (date: DateValue | undefined) => void;
  prevPage: () => void;
  nextPage: () => void;
  isPrevButtonDisabled: () => boolean;
  isNextButtonDisabled: () => boolean;
}

export type YearRangePickerUiSlot =
  | 'root'
  | 'trigger'
  | 'popup'
  | 'header'
  | 'heading'
  | 'prev'
  | 'next'
  | 'grid'
  | 'cellTrigger';
export type YearRangePickerUi = UiClass<YearRangePickerUiSlot>;
