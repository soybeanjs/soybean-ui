import type { DateValue } from '@internationalized/date';
import type { ButtonHTMLAttributes, ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { Formatter, Grid, Matcher, WeekDayFormat, WeekStartsOn } from '../../date';
import type { Direction, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';
import type { SelectOptionData } from '../select/types';

/**
 * Model value type for the calendar component.
 */
export type CalendarModelValue<M extends boolean = false> = M extends true
  ? DateValue[] | undefined
  : DateValue | undefined;

/**
 * Properties for the calendar root component.
 */
export interface CalendarRootProps<M extends boolean = false>
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  /**
   * Default value.
   */
  defaultValue?: CalendarModelValue<M>;
  /**
   * Default placeholder.
   */
  defaultPlaceholder?: DateValue;
  /**
   * Placeholder.
   */
  placeholder?: DateValue;
  /**
   * Whether paged navigation.
   */
  pagedNavigation?: boolean;
  /**
   * Whether prevent deselect.
   */
  preventDeselect?: boolean;
  /**
   * Week starts on.
   */
  weekStartsOn?: WeekStartsOn;
  /**
   * Weekday format.
   */
  weekdayFormat?: WeekDayFormat;
  /**
   * Calendar label.
   */
  calendarLabel?: string;
  /**
   * Whether fixed weeks.
   */
  fixedWeeks?: boolean;
  /**
   * Max value.
   */
  maxValue?: DateValue;
  /**
   * Min value.
   */
  minValue?: DateValue;
  /**
   * Locale.
   */
  locale?: string;
  /**
   * Number of months.
   */
  numberOfMonths?: number;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the component is readonly.
   */
  readonly?: boolean;
  /**
   * Whether initial focus.
   */
  initialFocus?: boolean;
  /**
   * Whether the date is disabled.
   */
  isDateDisabled?: Matcher;
  /**
   * Whether the date is unavailable.
   */
  isDateUnavailable?: Matcher;
  /**
   * Reading direction of the component.
   */
  dir?: Direction;
  /**
   * Next page.
   */
  nextPage?: (placeholder: DateValue) => DateValue;
  /**
   * Prev page.
   */
  prevPage?: (placeholder: DateValue) => DateValue;
  /**
   * Current model value.
   */
  modelValue?: CalendarModelValue<M>;
  /**
   * Whether multiple values are supported.
   */
  multiple?: M;
  /**
   * Whether to disable days outside current view.
   */
  disableDaysOutsideCurrentView?: boolean;
}

/**
 * Events for the calendar root component.
 */
export type CalendarRootEmits<M extends boolean = false> = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [date: CalendarModelValue<M>];
  /**
   * Emitted when the placeholder value changes.
   */
  'update:placeholder': [date: DateValue];
};

/**
 * Properties for the calendar header component.
 */
export interface CalendarHeaderProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
/**
 * Properties for the calendar heading component.
 */
export interface CalendarHeadingProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
/**
 * Properties for the calendar grid component.
 */
export interface CalendarGridProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
/**
 * Properties for the calendar grid head component.
 */
export interface CalendarGridHeadProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
/**
 * Properties for the calendar grid body component.
 */
export interface CalendarGridBodyProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
/**
 * Properties for the calendar grid row component.
 */
export interface CalendarGridRowProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}
/**
 * Properties for the calendar head cell component.
 */
export interface CalendarHeadCellProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {}

/**
 * Properties for the calendar cell component.
 */
export interface CalendarCellProps extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  /**
   * Date.
   */
  date: DateValue;
}

/**
 * Properties for the calendar cell trigger component.
 */
export interface CalendarCellTriggerProps
  extends PrimitiveProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  /**
   * Day.
   */
  day: DateValue;
  /**
   * Month.
   */
  month: DateValue;
}

/**
 * Properties for the calendar prev component.
 */
export interface CalendarPrevProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  /**
   * Prev page.
   */
  prevPage?: (placeholder: DateValue) => DateValue;
}

/**
 * Properties for the calendar next component.
 */
export interface CalendarNextProps extends PrimitiveProps, /** @vue-ignore */ ButtonHTMLAttributes {
  /**
   * Next page.
   */
  nextPage?: (placeholder: DateValue) => DateValue;
}

/**
 * Context for the calendar root component.
 */
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
  /**
   * Locale used by the component context.
   */
  locale: ComputedRef<string>;
  /**
   * Reading direction of the component.
   */
  dir: ComputedRef<Direction>;
  /**
   * Week starts on used by the component context.
   */
  weekStartsOn: ComputedRef<WeekStartsOn>;
  /**
   * Weekday format used by the component context.
   */
  weekdayFormat: ComputedRef<WeekDayFormat>;
  /**
   * Current model value.
   */
  modelValue: ShallowRef<DateValue | DateValue[] | undefined>;
  /**
   * Whether multiple values are supported.
   */
  multiple: ComputedRef<boolean>;
  /**
   * Placeholder used by the component context.
   */
  placeholder: ShallowRef<DateValue>;
  /**
   * Grid used by the component context.
   */
  grid: ShallowRef<Grid<DateValue>[]>;
  /**
   * Parent element used by the component context.
   */
  parentElement: ShallowRef<HTMLElement | undefined>;
  /**
   * Full calendar label used by the component context.
   */
  fullCalendarLabel: ComputedRef<string>;
  /**
   * Heading value used by the component context.
   */
  headingValue: ComputedRef<string>;
  /**
   * Whether the current value is invalid.
   */
  isInvalid: ComputedRef<boolean>;
  /**
   * Min value used by the component context.
   */
  minValue: ComputedRef<DateValue | undefined>;
  /**
   * Max value used by the component context.
   */
  maxValue: ComputedRef<DateValue | undefined>;
  /**
   * Whether the placeholder is focusable.
   */
  isPlaceholderFocusable: ComputedRef<boolean>;
  /**
   * First focusable date used by the component context.
   */
  firstFocusableDate: ComputedRef<DateValue | undefined>;
  /**
   * Whether the component has selected date.
   */
  hasSelectedDate: ComputedRef<boolean>;
  /**
   * Whether the selected date is disabled.
   */
  isSelectedDateDisabled: ComputedRef<boolean>;
  /**
   * Formatter used by the component context.
   */
  formatter: Formatter;
  /**
   * Callback invoked when the date changes.
   */
  onDateChange: (date: DateValue) => void;
  /**
   * Callback invoked when the placeholder changes.
   */
  onPlaceholderChange: (date: DateValue) => void;
  /**
   * Whether the date is disabled.
   */
  isDateDisabled: Matcher;
  /**
   * Whether the date is selected.
   */
  isDateSelected: Matcher;
  /**
   * Whether the date is unavailable.
   */
  isDateUnavailable?: Matcher;
  /**
   * Whether an outside visible view.
   */
  isOutsideVisibleView: (date: DateValue) => boolean;
  /**
   * Prev page used by the component context.
   */
  prevPage: (prevPageFunc?: (date: DateValue) => DateValue) => void;
  /**
   * Next page used by the component context.
   */
  nextPage: (nextPageFunc?: (date: DateValue) => DateValue) => void;
  /**
   * Whether the previous button is disabled.
   */
  isPrevButtonDisabled: (prevPageFunc?: (date: DateValue) => DateValue) => boolean;
  /**
   * Whether the next button is disabled.
   */
  isNextButtonDisabled: (nextPageFunc?: (date: DateValue) => DateValue) => boolean;
}

/**
 * Slot properties for the calendar root component.
 */
export interface CalendarRootSlotProps<M extends boolean = false> {
  /**
   * Date exposed in the slot scope.
   */
  date: DateValue;
  /**
   * Placeholder exposed in the slot scope.
   */
  placeholder: DateValue;
  /**
   * Grid exposed in the slot scope.
   */
  grid: Grid<DateValue>[];
  /**
   * Week days exposed in the slot scope.
   */
  weekDays: string[];
  /**
   * Week starts on exposed in the slot scope.
   */
  weekStartsOn: number;
  /**
   * Locale exposed in the slot scope.
   */
  locale: string;
  /**
   * Whether fixed weeks.
   */
  fixedWeeks: boolean;
  /**
   * Current model value.
   */
  modelValue: CalendarModelValue<M>;
  /**
   * Formatter exposed in the slot scope.
   */
  formatter: Formatter;
  /**
   * Min value exposed in the slot scope.
   */
  minValue: DateValue | undefined;
  /**
   * Max value exposed in the slot scope.
   */
  maxValue: DateValue | undefined;
  /**
   * Whether the component is disabled.
   */
  disabled: boolean;
  /**
   * Callback invoked when the placeholder changes.
   */
  onPlaceholderChange: (date: DateValue) => void;
}

/**
 * Slot properties for the calendar heading component.
 */
export interface CalendarHeadingSlotProps {
  /**
   * Heading value exposed in the slot scope.
   */
  headingValue: string;
  /**
   * Month value exposed in the slot scope.
   */
  monthValue: string;
  /**
   * Year value exposed in the slot scope.
   */
  yearValue: string;
  /**
   * Selected month exposed in the slot scope.
   */
  selectedMonth: number;
  /**
   * Selected year exposed in the slot scope.
   */
  selectedYear: number;
  /**
   * Month options exposed in the slot scope.
   */
  monthOptions: SelectOptionData<number>[];
  /**
   * Year options exposed in the slot scope.
   */
  yearOptions: SelectOptionData<number>[];
  /**
   * Callback invoked when the month changes.
   */
  onMonthChange: (value: number | undefined) => void;
  /**
   * Callback invoked when the year changes.
   */
  onYearChange: (value: number | undefined) => void;
}

/**
 * Available UI slots for the calendar component.
 */
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

/**
 * UI class overrides for the calendar component.
 */
export type CalendarUi = UiClass<CalendarUiSlot>;

/**
 * Properties for the calendar compact component.
 */
export interface CalendarCompactProps<M extends boolean = false> extends CalendarRootProps<M> {
  /**
   * Properties forwarded to the header element.
   */
  headerProps?: CalendarHeaderProps;
  /**
   * Properties forwarded to the heading element.
   */
  headingProps?: CalendarHeadingProps;
  /**
   * Properties forwarded to the prev element.
   */
  prevProps?: CalendarPrevProps;
  /**
   * Properties forwarded to the next element.
   */
  nextProps?: CalendarNextProps;
  /**
   * Properties forwarded to the grid element.
   */
  gridProps?: CalendarGridProps;
  /**
   * Properties forwarded to the grid head element.
   */
  gridHeadProps?: CalendarGridHeadProps;
  /**
   * Properties forwarded to the grid body element.
   */
  gridBodyProps?: CalendarGridBodyProps;
  /**
   * Properties forwarded to the grid row element.
   */
  gridRowProps?: CalendarGridRowProps;
  /**
   * Properties forwarded to the head cell element.
   */
  headCellProps?: CalendarHeadCellProps;
  /**
   * Properties forwarded to the cell element.
   */
  cellProps?: Omit<CalendarCellProps, 'date'>;
  /**
   * Properties forwarded to the cell trigger element.
   */
  cellTriggerProps?: Omit<CalendarCellTriggerProps, 'day' | 'month'>;
}

/**
 * Events for the calendar compact component.
 */
export type CalendarCompactEmits<M extends boolean = false> = CalendarRootEmits<M>;

/**
 * Slots for the calendar compact component.
 */
export type CalendarCompactSlots<M extends boolean = false> = {
  /**
   * Custom content for the default slot.
   */
  default?: (props: { modelValue: CalendarModelValue<M> }) => any;
  /**
   * Custom content for the prev slot.
   */
  prev?: (props: { disabled: boolean }) => any;
  /**
   * Custom content for the heading slot.
   */
  heading?: (props: CalendarHeadingSlotProps) => any;
  /**
   * Custom content for the next slot.
   */
  next?: (props: { disabled: boolean }) => any;
  /**
   * Custom content for the head cell slot.
   */
  'head-cell'?: (props: { date: DateValue; index: number; label: string }) => any;
  /**
   * Custom content for the day slot.
   */
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
