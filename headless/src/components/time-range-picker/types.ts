import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';

import type { DateStep, Formatter, HourCycle, TimeGranularity, TimeMatcher, TimeRange, TimeValue } from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { TimePickerOption } from '../../shared/time-picker';
import type { PrimitiveProps } from '../primitive/types';

export interface TimeRangePickerRootProps
  extends PrimitiveProps,
    FormFieldCommonProps,
    /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  defaultValue?: TimeRange;
  defaultPlaceholder?: TimeValue;
  placeholder?: TimeValue;
  modelValue?: TimeRange;
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

export type TimeRangePickerRootEmits = {
  'update:modelValue': [range: TimeRange];
  'update:placeholder': [time: TimeValue];
  'update:startValue': [time: TimeValue | undefined];
  'update:endValue': [time: TimeValue | undefined];
  'update:open': [open: boolean];
};

export interface TimeRangePickerTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}
export interface TimeRangePickerPopupProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

export interface TimeRangePickerRootContext extends PropsToContext<TimeRangePickerRootProps, 'disabled' | 'readonly'> {
  locale: ComputedRef<string>;
  dir: ComputedRef<Direction>;
  modelValue: ShallowRef<TimeRange>;
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
  hoveredTime: ShallowRef<TimeValue | undefined>;
  options: ComputedRef<TimePickerOption[]>;
  minValue: ComputedRef<TimeValue | undefined>;
  maxValue: ComputedRef<TimeValue | undefined>;
  onRangeChange: (time: TimeValue) => void;
  onPlaceholderChange: (time: TimeValue) => void;
  isTimeDisabled: (time: TimeValue) => boolean;
  isTimeSelected: (time: TimeValue) => boolean;
  isTimeHighlighted: (time: TimeValue) => boolean;
  isRangeStart: (time: TimeValue) => boolean;
  isRangeEnd: (time: TimeValue) => boolean;
  setOpen: (value: boolean) => void;
  setFocusedTime: (time: TimeValue) => void;
  setHoveredTime: (time: TimeValue | undefined) => void;
}

export type TimeRangePickerUiSlot = 'root' | 'trigger' | 'popup' | 'list' | 'cellTrigger';
export type TimeRangePickerUi = UiClass<TimeRangePickerUiSlot>;

export interface TimeRangePickerCompactProps extends TimeRangePickerRootProps {
  triggerProps?: TimeRangePickerTriggerProps;
  popupProps?: TimeRangePickerPopupProps;
}

export type TimeRangePickerCompactEmits = TimeRangePickerRootEmits;

export type TimeRangePickerCompactSlots = {
  default?: (props: {
    modelValue: TimeRange;
    placeholder: TimeValue;
    displayValue: string;
    open: boolean;
  }) => any;
  trigger?: (props: { displayValue: string; modelValue: TimeRange; open: boolean }) => any;
  time?: (props: {
    label: string;
    time: TimeValue;
    disabled: boolean;
    focused: boolean;
    highlighted: boolean;
    selected: boolean;
    rangeStart: boolean;
    rangeEnd: boolean;
  }) => any;
};
