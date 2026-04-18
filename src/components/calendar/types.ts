import type { DateValue } from '@internationalized/date';

import type {
  CalendarCellProps,
  CalendarCellTriggerProps,
  CalendarGridBodyProps,
  CalendarGridHeadProps,
  CalendarGridProps,
  CalendarGridRowProps,
  CalendarHeaderProps,
  CalendarHeadCellProps,
  CalendarHeadingProps,
  CalendarModelValue,
  CalendarNextProps,
  CalendarPrevProps,
  CalendarRootEmits,
  CalendarRootProps,
  CalendarUi
} from '@soybeanjs/headless/calendar';
import type { ClassValue } from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface CalendarProps<M extends boolean = false> extends CalendarRootProps<M> {
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<CalendarUi>;
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

export type CalendarEmits<M extends boolean = false> = CalendarRootEmits<M>;

export interface CalendarHeadCellSlotProps {
  date: DateValue;
  index: number;
  label: string;
}

export interface CalendarDaySlotProps {
  day: DateValue;
  dayValue: string;
  disabled: boolean;
  month: DateValue;
  outsideView: boolean;
  outsideVisibleView: boolean;
  selected: boolean;
  today: boolean;
  unavailable: boolean;
}

export type CalendarSlots<M extends boolean = false> = {
  heading?: (props: { headingValue: string }) => any;
  prev?: (props: { disabled: boolean }) => any;
  next?: (props: { disabled: boolean }) => any;
  'head-cell'?: (props: CalendarHeadCellSlotProps) => any;
  day?: (props: CalendarDaySlotProps) => any;
  default?: (props: { modelValue: CalendarModelValue<M> | undefined }) => any;
};
