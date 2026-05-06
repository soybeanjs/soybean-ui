import type { DateValue } from '@internationalized/date';
import type { ComputedRef, ShallowRef } from 'vue';
import type { Grid, Matcher, WeekDayFormat, WeekStartsOn, DateRange, Formatter } from '../../date';
import type { BaseProps, Direction, PropsToContext, UiClass } from '../../types';
import type { ButtonProps } from '../button/types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Properties for the RangeCalendarRoot component.
 */
export interface RangeCalendarRootProps extends PrimitiveProps, Omit<BaseProps, 'placeholder'> {
  /**
   * Default value.
   */
  defaultValue?: DateRange;
  /**
   * Default placeholder.
   */
  defaultPlaceholder?: DateValue;
  /**
   * Placeholder.
   */
  placeholder?: DateValue;
  /**
   * Current model value.
   */
  modelValue?: DateRange;
  /**
   * Whether to allow non contiguous ranges.
   */
  allowNonContiguousRanges?: boolean;
  /**
   * Whether paged navigation.
   */
  pagedNavigation?: boolean;
  /**
   * Whether prevent deselect.
   */
  preventDeselect?: boolean;
  /**
   * Maximum days.
   */
  maximumDays?: number;
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
   * Whether a date highlightable.
   */
  isDateHighlightable?: Matcher;
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
   * Whether to disable days outside current view.
   */
  disableDaysOutsideCurrentView?: boolean;
  /**
   * Fixed date.
   */
  fixedDate?: 'start' | 'end';
}

/**
 * Events for the RangeCalendarRoot component.
 */
export type RangeCalendarRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [range: DateRange];
  /**
   * Emitted when the placeholder value changes.
   */
  'update:placeholder': [date: DateValue];
  /**
   * Emitted when the start value changes.
   */
  'update:startValue': [date: DateValue | undefined];
};

/**
 * Properties for the RangeCalendarHeader component.
 */
export interface RangeCalendarHeaderProps extends PrimitiveProps, BaseProps {}
/**
 * Properties for the RangeCalendarHeading component.
 */
export interface RangeCalendarHeadingProps extends PrimitiveProps, BaseProps {}
/**
 * Properties for the RangeCalendarGrid component.
 */
export interface RangeCalendarGridProps extends PrimitiveProps, BaseProps {}
/**
 * Properties for the RangeCalendarGridHead component.
 */
export interface RangeCalendarGridHeadProps extends PrimitiveProps, BaseProps {}
/**
 * Properties for the RangeCalendarGridBody component.
 */
export interface RangeCalendarGridBodyProps extends PrimitiveProps, BaseProps {}
/**
 * Properties for the RangeCalendarGridRow component.
 */
export interface RangeCalendarGridRowProps extends PrimitiveProps, BaseProps {}
/**
 * Properties for the RangeCalendarHeadCell component.
 */
export interface RangeCalendarHeadCellProps extends PrimitiveProps, BaseProps {}

/**
 * Properties for the RangeCalendarCell component.
 */
export interface RangeCalendarCellProps extends PrimitiveProps, BaseProps {
  /**
   * Date.
   */
  date: DateValue;
}

/**
 * Properties for the RangeCalendarCellTrigger component.
 */
export interface RangeCalendarCellTriggerProps extends PrimitiveProps, BaseProps {
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
 * Properties for the RangeCalendarPrev component.
 */
export interface RangeCalendarPrevProps extends ButtonProps {
  /**
   * Prev page.
   */
  prevPage?: (placeholder: DateValue) => DateValue;
}

/**
 * Properties for the RangeCalendarNext component.
 */
export interface RangeCalendarNextProps extends ButtonProps {
  /**
   * Next page.
   */
  nextPage?: (placeholder: DateValue) => DateValue;
}

/**
 * Context for the RangeCalendarRoot component.
 */
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
  modelValue: ShallowRef<DateRange>;
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
   * Selected focusable date used by the component context.
   */
  selectedFocusableDate: ComputedRef<DateValue | undefined>;
  /**
   * Formatter used by the component context.
   */
  formatter: Formatter;
  /**
   * Highlighted range used by the component context.
   */
  highlightedRange: ComputedRef<DateRange | null>;
  /**
   * Fixed date used by the component context.
   */
  fixedDate: ComputedRef<'start' | 'end' | undefined>;
  /**
   * Maximum days used by the component context.
   */
  maximumDays: ComputedRef<number | undefined>;
  /**
   * Whether the date is unavailable.
   */
  isDateUnavailable?: Matcher;
  /**
   * Whether a date highlightable.
   */
  isDateHighlightable?: Matcher;
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
   * Whether a selection start.
   */
  isSelectionStart: Matcher;
  /**
   * Whether a selection end.
   */
  isSelectionEnd: Matcher;
  /**
   * Whether a highlighted start.
   */
  isHighlightedStart: Matcher;
  /**
   * Whether a highlighted end.
   */
  isHighlightedEnd: Matcher;
  /**
   * Whether an outside visible view.
   */
  isOutsideVisibleView: (date: DateValue) => boolean;
  /**
   * Set hovered date used by the component context.
   */
  setHoveredDate: (date?: DateValue) => void;
  /**
   * Hovered date used by the component context.
   */
  hoveredDate: ShallowRef<DateValue | undefined>;
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
 * Available UI slots for the RangeCalendar component.
 */
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

/**
 * UI class overrides for the RangeCalendar component.
 */
export type RangeCalendarUi = UiClass<RangeCalendarUiSlot>;

/**
 * Properties for the RangeCalendarCompact component.
 */
export interface RangeCalendarCompactProps extends RangeCalendarRootProps {
  /**
   * Properties forwarded to the header element.
   */
  headerProps?: RangeCalendarHeaderProps;
  /**
   * Properties forwarded to the heading element.
   */
  headingProps?: RangeCalendarHeadingProps;
  /**
   * Properties forwarded to the prev element.
   */
  prevProps?: RangeCalendarPrevProps;
  /**
   * Properties forwarded to the next element.
   */
  nextProps?: RangeCalendarNextProps;
  /**
   * Properties forwarded to the grid element.
   */
  gridProps?: RangeCalendarGridProps;
  /**
   * Properties forwarded to the grid head element.
   */
  gridHeadProps?: RangeCalendarGridHeadProps;
  /**
   * Properties forwarded to the grid body element.
   */
  gridBodyProps?: RangeCalendarGridBodyProps;
  /**
   * Properties forwarded to the grid row element.
   */
  gridRowProps?: RangeCalendarGridRowProps;
  /**
   * Properties forwarded to the head cell element.
   */
  headCellProps?: RangeCalendarHeadCellProps;
  /**
   * Properties forwarded to the cell element.
   */
  cellProps?: Omit<RangeCalendarCellProps, 'date'>;
  /**
   * Properties forwarded to the cell trigger element.
   */
  cellTriggerProps?: Omit<RangeCalendarCellTriggerProps, 'day' | 'month'>;
}

/**
 * Events for the RangeCalendarCompact component.
 */
export type RangeCalendarCompactEmits = RangeCalendarRootEmits;

/**
 * Slots for the RangeCalendarCompact component.
 */
export type RangeCalendarCompactSlots = {
  /**
   * Custom content for the default slot.
   */
  default?: (props: { modelValue: DateRange }) => any;
  /**
   * Custom content for the prev slot.
   */
  prev?: (props: { disabled: boolean }) => any;
  /**
   * Custom content for the heading slot.
   */
  heading?: (props: { headingValue: string }) => any;
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
