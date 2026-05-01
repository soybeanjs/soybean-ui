import type { DateValue } from '@internationalized/date';
import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { Grid, Matcher, WeekDayFormat, WeekStartsOn, DateRange, Formatter } from '../../date';
import type { Direction, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

export interface RangeCalendarRootProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  defaultValue?: DateRange;
  defaultPlaceholder?: DateValue;
  placeholder?: DateValue;
  modelValue?: DateRange;
  allowNonContiguousRanges?: boolean;
  pagedNavigation?: boolean;
  preventDeselect?: boolean;
  maximumDays?: number;
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
  isDateHighlightable?: Matcher;
  dir?: Direction;
  nextPage?: (placeholder: DateValue) => DateValue;
  prevPage?: (placeholder: DateValue) => DateValue;
  disableDaysOutsideCurrentView?: boolean;
  fixedDate?: 'start' | 'end';
}

export type RangeCalendarRootEmits = {
  'update:modelValue': [range: DateRange];
  'update:placeholder': [date: DateValue];
  'update:startValue': [date: DateValue | undefined];
};

export interface RangeCalendarHeaderProps
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
export interface RangeCalendarHeadingProps
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
export interface RangeCalendarGridProps
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
export interface RangeCalendarGridHeadProps
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
export interface RangeCalendarGridBodyProps
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
export interface RangeCalendarGridRowProps
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
export interface RangeCalendarHeadCellProps
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}

export interface RangeCalendarCellProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  date: DateValue;
}

export interface RangeCalendarCellTriggerProps
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  day: DateValue;
  month: DateValue;
}

export interface RangeCalendarPrevProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  prevPage?: (placeholder: DateValue) => DateValue;
}

export interface RangeCalendarNextProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  nextPage?: (placeholder: DateValue) => DateValue;
}

export interface RangeCalendarRootContext extends PropsToContext<
  RangeCalendarRootProps,
  | 'allowNonContiguousRanges'
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
  modelValue: ShallowRef<DateRange>;
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
  selectedFocusableDate: ComputedRef<DateValue | undefined>;
  formatter: Formatter;
  highlightedRange: ComputedRef<DateRange | null>;
  fixedDate: ComputedRef<'start' | 'end' | undefined>;
  maximumDays: ComputedRef<number | undefined>;
  isDateUnavailable?: Matcher;
  isDateHighlightable?: Matcher;
  onDateChange: (date: DateValue) => void;
  onPlaceholderChange: (date: DateValue) => void;
  isDateDisabled: Matcher;
  isDateSelected: Matcher;
  isSelectionStart: Matcher;
  isSelectionEnd: Matcher;
  isHighlightedStart: Matcher;
  isHighlightedEnd: Matcher;
  isOutsideVisibleView: (date: DateValue) => boolean;
  setHoveredDate: (date?: DateValue) => void;
  hoveredDate: ShallowRef<DateValue | undefined>;
  prevPage: (prevPageFunc?: (date: DateValue) => DateValue) => void;
  nextPage: (nextPageFunc?: (date: DateValue) => DateValue) => void;
  isPrevButtonDisabled: (prevPageFunc?: (date: DateValue) => DateValue) => boolean;
  isNextButtonDisabled: (nextPageFunc?: (date: DateValue) => DateValue) => boolean;
}

export type RangeCalendarUiSlot =
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

export type RangeCalendarUi = UiClass<RangeCalendarUiSlot>;

export interface RangeCalendarCompactProps extends RangeCalendarRootProps {
  headerProps?: RangeCalendarHeaderProps;
  headingProps?: RangeCalendarHeadingProps;
  prevProps?: RangeCalendarPrevProps;
  nextProps?: RangeCalendarNextProps;
  gridProps?: RangeCalendarGridProps;
  gridHeadProps?: RangeCalendarGridHeadProps;
  gridBodyProps?: RangeCalendarGridBodyProps;
  gridRowProps?: RangeCalendarGridRowProps;
  headCellProps?: RangeCalendarHeadCellProps;
  cellProps?: Omit<RangeCalendarCellProps, 'date'>;
  cellTriggerProps?: Omit<RangeCalendarCellTriggerProps, 'day' | 'month'>;
}

export type RangeCalendarCompactEmits = RangeCalendarRootEmits;

export type RangeCalendarCompactSlots = {
  default?: (props: { modelValue: DateRange }) => any;
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
    selectionStart: boolean;
    selectionEnd: boolean;
    highlighted: boolean;
    highlightedStart: boolean;
    highlightedEnd: boolean;
    unavailable: boolean;
    today: boolean;
    outsideView: boolean;
    outsideVisibleView: boolean;
  }) => any;
};
