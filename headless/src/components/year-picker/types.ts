import type { DateValue } from '@internationalized/date';
import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { Formatter, Grid } from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface YearPickerRootProps
  extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  defaultValue?: DateValue;
  defaultPlaceholder?: DateValue;
  placeholder?: DateValue;
  modelValue?: DateValue;
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

export type YearPickerRootEmits = {
  'update:modelValue': [date: DateValue | undefined];
  'update:placeholder': [date: DateValue];
  'update:open': [open: boolean];
};

export interface YearPickerTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}
export interface YearPickerPopupProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface YearPickerRootContext extends PropsToContext<YearPickerRootProps, 'disabled' | 'readonly'> {
  locale: ComputedRef<string>;
  dir: ComputedRef<Direction>;
  modelValue: ShallowRef<DateValue | undefined>;
  placeholder: ShallowRef<DateValue>;
  isInvalid: ComputedRef<boolean>;
  formatter: Formatter;
  open: ShallowRef<boolean | undefined>;
  popupId: string;
  displayValue: ComputedRef<string>;
  headingValue: ComputedRef<string>;
  focusedYear: ShallowRef<DateValue>;
  yearGrid: ComputedRef<Grid<DateValue>>;
  minValue: ComputedRef<DateValue | undefined>;
  maxValue: ComputedRef<DateValue | undefined>;
  onYearChange: (date: DateValue) => void;
  onPlaceholderChange: (date: DateValue) => void;
  isYearDisabled: (date: DateValue) => boolean;
  isYearSelected: (date: DateValue) => boolean;
  setOpen: (value: boolean) => void;
  setFocusedYear: (date: DateValue) => void;
  prevPage: () => void;
  nextPage: () => void;
  isPrevButtonDisabled: () => boolean;
  isNextButtonDisabled: () => boolean;
}

export type YearPickerUiSlot =
  | 'root'
  | 'trigger'
  | 'popup'
  | 'header'
  | 'heading'
  | 'prev'
  | 'next'
  | 'grid'
  | 'cellTrigger';
export type YearPickerUi = UiClass<YearPickerUiSlot>;
