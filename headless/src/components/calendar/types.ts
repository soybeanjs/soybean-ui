import type { DateValue } from '@internationalized/date';
import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { Formatter, Grid, Matcher, WeekDayFormat, WeekStartsOn } from '../../date';
import type { Direction, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export type CalendarModelValue<M extends boolean = false> = M extends true
  ? DateValue[] | undefined
  : DateValue | undefined;

export interface CalendarRootProps<M extends boolean = false>
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  defaultValue?: CalendarModelValue<M>;
  defaultPlaceholder?: DateValue;
  placeholder?: DateValue;
  pagedNavigation?: boolean;
  preventDeselect?: boolean;
  weekStartsOn?: WeekStartsOn;
  weekdayFormat?: WeekDayFormat;
  calendarLabel?: string;
  fixedWeeks?: boolean;
  maxValue?: DateValue;
  minValue?: DateValue;
  locale?: string;
  numberOfMonths?: number;
  disabled?: boolean;
  readonly?: boolean;
  initialFocus?: boolean;
  isDateDisabled?: Matcher;
  isDateUnavailable?: Matcher;
  dir?: Direction;
  nextPage?: (placeholder: DateValue) => DateValue;
  prevPage?: (placeholder: DateValue) => DateValue;
  modelValue?: CalendarModelValue<M>;
  multiple?: M;
  disableDaysOutsideCurrentView?: boolean;
}

export type CalendarRootEmits<M extends boolean = false> = {
  'update:modelValue': [date: CalendarModelValue<M>];
  'update:placeholder': [date: DateValue];
};

export interface CalendarHeaderProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
export interface CalendarHeadingProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
export interface CalendarGridProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
export interface CalendarGridHeadProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
export interface CalendarGridBodyProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
export interface CalendarGridRowProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
export interface CalendarHeadCellProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}

export interface CalendarCellProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  date: DateValue;
}

export interface CalendarCellTriggerProps
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  day: DateValue;
  month: DateValue;
}

export interface CalendarPrevProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  prevPage?: (placeholder: DateValue) => DateValue;
}

export interface CalendarNextProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  nextPage?: (placeholder: DateValue) => DateValue;
}

export interface CalendarRootContext extends PropsToContext<
  CalendarRootProps,
  | 'disableDaysOutsideCurrentView'
  | 'disabled'
  | 'fixedWeeks'
  | 'initialFocus'
  | 'numberOfMonths'
  | 'pagedNavigation'
  | 'preventDeselect'
  | 'readonly'
> {
  locale: ComputedRef<string>;
  dir: ComputedRef<Direction>;
  weekStartsOn: ComputedRef<WeekStartsOn>;
  weekdayFormat: ComputedRef<WeekDayFormat>;
  modelValue: ShallowRef<DateValue | DateValue[] | undefined>;
  multiple: ComputedRef<boolean>;
  placeholder: ShallowRef<DateValue>;
  grid: ShallowRef<Grid<DateValue>[]>;
  parentElement: ShallowRef<HTMLElement | undefined>;
  fullCalendarLabel: ComputedRef<string>;
  headingValue: ComputedRef<string>;
  isInvalid: ComputedRef<boolean>;
  minValue: ComputedRef<DateValue | undefined>;
  maxValue: ComputedRef<DateValue | undefined>;
  isPlaceholderFocusable: ComputedRef<boolean>;
  firstFocusableDate: ComputedRef<DateValue | undefined>;
  hasSelectedDate: ComputedRef<boolean>;
  isSelectedDateDisabled: ComputedRef<boolean>;
  formatter: Formatter;
  onDateChange: (date: DateValue) => void;
  onPlaceholderChange: (date: DateValue) => void;
  isDateDisabled: Matcher;
  isDateSelected: Matcher;
  isDateUnavailable?: Matcher;
  isOutsideVisibleView: (date: DateValue) => boolean;
  prevPage: (prevPageFunc?: (date: DateValue) => DateValue) => void;
  nextPage: (nextPageFunc?: (date: DateValue) => DateValue) => void;
  isPrevButtonDisabled: (prevPageFunc?: (date: DateValue) => DateValue) => boolean;
  isNextButtonDisabled: (nextPageFunc?: (date: DateValue) => DateValue) => boolean;
}

export type CalendarUiSlot =
  | 'root'
  | 'header'
  | 'heading'
  | 'prev'
  | 'next'
  | 'grid'
  | 'gridHead'
  | 'gridBody'
  | 'gridRow'
  | 'headCell'
  | 'cell'
  | 'cellTrigger';

export type CalendarUi = UiClass<CalendarUiSlot>;

export interface CalendarCompactProps<M extends boolean = false> extends CalendarRootProps<M> {
  headerProps?: CalendarHeaderProps;
  headingProps?: CalendarHeadingProps;
  prevProps?: CalendarPrevProps;
  nextProps?: CalendarNextProps;
  gridProps?: CalendarGridProps;
  gridHeadProps?: CalendarGridHeadProps;
  gridBodyProps?: CalendarGridBodyProps;
  gridRowProps?: CalendarGridRowProps;
  headCellProps?: CalendarHeadCellProps;
  cellProps?: Omit<CalendarCellProps, 'date'>;
  cellTriggerProps?: Omit<CalendarCellTriggerProps, 'day' | 'month'>;
}

export type CalendarCompactEmits<M extends boolean = false> = CalendarRootEmits<M>;

export type CalendarCompactSlots<M extends boolean = false> = {
  default?: (props: { modelValue: CalendarModelValue<M> }) => any;
  prev?: (props: { disabled: boolean }) => any;
  heading?: (props: { headingValue: string }) => any;
  next?: (props: { disabled: boolean }) => any;
  'head-cell'?: (props: { date: DateValue; index: number; label: string }) => any;
  day?: (props: {
    day: DateValue;
    month: DateValue;
    dayValue: string;
    disabled: boolean;
    selected: boolean;
    unavailable: boolean;
    today: boolean;
    outsideView: boolean;
    outsideVisibleView: boolean;
  }) => any;
};
