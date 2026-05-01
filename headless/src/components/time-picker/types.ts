import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { DateStep, Formatter, HourCycle, TimeGranularity, TimeMatcher, TimeValue } from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { TimePickerOption } from '../../shared/time-picker';
import type { PrimitiveProps } from '../primitive/types';

export interface TimePickerRootProps
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
  defaultOpen?: boolean;
  open?: boolean;
  modal?: boolean;
}

export type TimePickerRootEmits = {
  'update:modelValue': [time: TimeValue | undefined];
  'update:placeholder': [time: TimeValue];
  'update:open': [open: boolean];
};

export interface TimePickerTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}
export interface TimePickerPopupProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface TimePickerRootContext extends PropsToContext<TimePickerRootProps, 'disabled' | 'readonly'> {
  locale: ComputedRef<string>;
  dir: ComputedRef<Direction>;
  modelValue: ShallowRef<TimeValue | undefined>;
  placeholder: ShallowRef<TimeValue>;
  isTimeUnavailable?: TimeMatcher;
  isInvalid: ComputedRef<boolean>;
  formatter: Formatter;
  granularity: ComputedRef<TimeGranularity>;
  hourCycle: HourCycle;
  hideTimeZone: ComputedRef<boolean>;
  open: ShallowRef<boolean | undefined>;
  popupId: string;
  displayValue: ComputedRef<string>;
  focusedTime: ShallowRef<TimeValue>;
  options: ComputedRef<TimePickerOption[]>;
  minValue: ComputedRef<TimeValue | undefined>;
  maxValue: ComputedRef<TimeValue | undefined>;
  onTimeChange: (time: TimeValue) => void;
  onPlaceholderChange: (time: TimeValue) => void;
  isTimeDisabled: (time: TimeValue) => boolean;
  isTimeSelected: (time: TimeValue) => boolean;
  setOpen: (value: boolean) => void;
  setFocusedTime: (time: TimeValue) => void;
}

export type TimePickerUiSlot = 'root' | 'trigger' | 'popup' | 'list' | 'cellTrigger';
export type TimePickerUi = UiClass<TimePickerUiSlot>;
