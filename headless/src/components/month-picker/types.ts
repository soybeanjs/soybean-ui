import type { DateValue } from '@internationalized/date';
import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { Formatter } from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface MonthPickerRootProps
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

export type MonthPickerRootEmits = {
  'update:modelValue': [date: DateValue | undefined];
  'update:placeholder': [date: DateValue];
  'update:open': [open: boolean];
};

export interface MonthPickerTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}
export interface MonthPickerPopupProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface MonthPickerRootContext extends PropsToContext<MonthPickerRootProps, 'disabled' | 'readonly'> {
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
  focusedMonth: ShallowRef<DateValue>;
  minValue: ComputedRef<DateValue | undefined>;
  maxValue: ComputedRef<DateValue | undefined>;
  onMonthChange: (date: DateValue) => void;
  onPlaceholderChange: (date: DateValue) => void;
  isMonthDisabled: (date: DateValue) => boolean;
  isMonthSelected: (date: DateValue) => boolean;
  setOpen: (value: boolean) => void;
  setFocusedMonth: (date: DateValue) => void;
  prevPage: () => void;
  nextPage: () => void;
  isPrevButtonDisabled: () => boolean;
  isNextButtonDisabled: () => boolean;
}

export type MonthPickerUiSlot =
  | 'root'
  | 'trigger'
  | 'popup'
  | 'header'
  | 'heading'
  | 'prev'
  | 'next'
  | 'grid'
  | 'cellTrigger';
export type MonthPickerUi = UiClass<MonthPickerUiSlot>;
