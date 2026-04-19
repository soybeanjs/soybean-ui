import type { DateValue } from '@internationalized/date';

import type {
  RangeCalendarCellProps,
  RangeCalendarCellTriggerProps,
  RangeCalendarGridBodyProps,
  RangeCalendarGridHeadProps,
  RangeCalendarGridProps,
  RangeCalendarGridRowProps,
  RangeCalendarHeadCellProps,
  RangeCalendarHeaderProps,
  RangeCalendarHeadingProps,
  RangeCalendarNextProps,
  RangeCalendarPrevProps,
  RangeCalendarRootEmits,
  RangeCalendarRootProps,
  RangeCalendarUi
} from '@soybeanjs/headless/range-calendar';
import type { ClassValue } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface RangeCalendarProps extends RangeCalendarRootProps {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<RangeCalendarUi>;
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

export type RangeCalendarEmits = RangeCalendarRootEmits;

export interface RangeCalendarHeadCellSlotProps {
  date: DateValue;
  index: number;
  label: string;
}

export interface RangeCalendarDaySlotProps {
  day: DateValue;
  dayValue: string;
  disabled: boolean;
  highlighted: boolean;
  highlightedEnd: boolean;
  highlightedStart: boolean;
  month: DateValue;
  outsideView: boolean;
  outsideVisibleView: boolean;
  selected: boolean;
  selectionEnd: boolean;
  selectionStart: boolean;
  today: boolean;
  unavailable: boolean;
}

export type RangeCalendarSlots = {
  heading?: (props: { headingValue: string }) => any;
  prev?: (props: { disabled: boolean }) => any;
  next?: (props: { disabled: boolean }) => any;
  'head-cell'?: (props: RangeCalendarHeadCellSlotProps) => any;
  day?: (props: RangeCalendarDaySlotProps) => any;
  default?: (props: { modelValue: RangeCalendarRootProps['modelValue'] | undefined }) => any;
};
