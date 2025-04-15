import type { Ref } from 'vue';
import type { DateRange, DateValue, Granularity, HourCycle, Matcher, WeekDayFormat } from '../../date';
import type { Direction, PrimitiveProps } from '../../types';
import type { DateRangeFieldInputProps, DateRangeFieldRootProps } from '../date-range-field';
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
  RangeCalendarRootProps
} from '../range-calendar';
import type {
  PopoverAnchorProps,
  PopoverArrowProps,
  PopoverCloseProps,
  PopoverContentEmits,
  PopoverContentProps,
  PopoverRootEmits,
  PopoverRootProps,
  PopoverTriggerProps
} from '../popover';
import type DateRangeFieldRoot from '../date-range-field/date-range-field-root.vue';

// DateRangePickerRoot
export type DateRangePickerRootProps = DateRangeFieldRootProps &
  PopoverRootProps &
  Pick<
    RangeCalendarRootProps,
    | 'isDateDisabled'
    | 'pagedNavigation'
    | 'weekStartsOn'
    | 'weekdayFormat'
    | 'fixedWeeks'
    | 'numberOfMonths'
    | 'preventDeselect'
    | 'isDateUnavailable'
    | 'isDateHighlightable'
    | 'allowNonContiguousRanges'
  >;

export type DateRangePickerRootEmits = PopoverRootEmits & {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [date: DateRange];
  /** Event handler called whenever the placeholder value changes */
  'update:placeholder': [date: DateValue];
  /** Event handler called whenever the start value changes */
  'update:startValue': [date: DateValue | undefined];
};

export type DateRangeFieldRootInstance = InstanceType<typeof DateRangeFieldRoot>;

export type DateRangePickerRootContext = {
  id: Ref<string | undefined>;
  name: Ref<string | undefined>;
  minValue: Ref<DateValue | undefined>;
  maxValue: Ref<DateValue | undefined>;
  hourCycle: Ref<HourCycle | undefined>;
  granularity: Ref<Granularity | undefined>;
  hideTimeZone: Ref<boolean>;
  required: Ref<boolean>;
  locale: Ref<string>;
  dateFieldRef: Ref<DateRangeFieldRootInstance | undefined>;
  modelValue: Ref<{ start: DateValue | undefined; end: DateValue | undefined }>;
  placeholder: Ref<DateValue>;
  pagedNavigation: Ref<boolean>;
  preventDeselect: Ref<boolean>;
  weekStartsOn: Ref<0 | 1 | 2 | 3 | 4 | 5 | 6>;
  weekdayFormat: Ref<WeekDayFormat>;
  fixedWeeks: Ref<boolean>;
  numberOfMonths: Ref<number>;
  disabled: Ref<boolean>;
  readonly: Ref<boolean>;
  isDateDisabled?: Matcher;
  isDateUnavailable?: Matcher;
  isDateHighlightable?: Matcher;
  defaultOpen: Ref<boolean>;
  open: Ref<boolean>;
  modal: Ref<boolean>;
  onDateChange: (date: DateRange) => void;
  onPlaceholderChange: (date: DateValue) => void;
  onStartValueChange: (date: DateValue | undefined) => void;
  dir: Ref<Direction>;
  allowNonContiguousRanges: Ref<boolean>;
};

// DateRangePickerTrigger
export type DateRangePickerTriggerProps = PopoverTriggerProps;
export type DateRangePickerTriggerPropsWithPrimitive = DateRangePickerTriggerProps & PrimitiveProps;

// DateRangePickerContent
export interface DateRangePickerContentProps extends PopoverContentProps {}
export type DateRangePickerContentPropsWithPrimitive = DateRangePickerContentProps & PrimitiveProps;
export type DateRangePickerContentEmits = PopoverContentEmits;

// DateRangePickerHeader
export interface DateRangePickerHeaderProps extends RangeCalendarHeaderProps {}
export type DateRangePickerHeaderPropsWithPrimitive = DateRangePickerHeaderProps & PrimitiveProps;

// DateRangePickerHeading
export interface DateRangePickerHeadingProps extends RangeCalendarHeadingProps {}
export type DateRangePickerHeadingPropsWithPrimitive = DateRangePickerHeadingProps & PrimitiveProps;

// DateRangePickerHeadCell
export interface DateRangePickerHeadCellProps extends RangeCalendarHeadCellProps {}
export type DateRangePickerHeadCellPropsWithPrimitive = DateRangePickerHeadCellProps & PrimitiveProps;

// DateRangePickerGrid
export interface DateRangePickerGridProps extends RangeCalendarGridProps {}
export type DateRangePickerGridPropsWithPrimitive = DateRangePickerGridProps & PrimitiveProps;

// DateRangePickerGridHead
export interface DateRangePickerGridHeadProps extends RangeCalendarGridHeadProps {}
export type DateRangePickerGridHeadPropsWithPrimitive = DateRangePickerGridHeadProps & PrimitiveProps;

// DateRangePickerGridBody
export interface DateRangePickerGridBodyProps extends RangeCalendarGridBodyProps {}
export type DateRangePickerGridBodyPropsWithPrimitive = DateRangePickerGridBodyProps & PrimitiveProps;

// DateRangePickerGridRow
export interface DateRangePickerGridRowProps extends RangeCalendarGridRowProps {}
export type DateRangePickerGridRowPropsWithPrimitive = DateRangePickerGridRowProps & PrimitiveProps;

// DateRangePickerCell
export interface DateRangePickerCellProps extends RangeCalendarCellProps {}
export type DateRangePickerCellPropsWithPrimitive = DateRangePickerCellProps & PrimitiveProps;

// DateRangePickerCellTrigger
export interface DateRangePickerCellTriggerProps extends RangeCalendarCellTriggerProps {}
export type DateRangePickerCellTriggerPropsWithPrimitive = DateRangePickerCellTriggerProps & PrimitiveProps;

// DateRangePickerInput
export interface DateRangePickerInputProps extends DateRangeFieldInputProps {}
export type DateRangePickerInputPropsWithPrimitive = DateRangePickerInputProps & PrimitiveProps;

// DateRangePickerPrev
export interface DateRangePickerPrevProps extends RangeCalendarPrevProps {}
export type DateRangePickerPrevPropsWithPrimitive = DateRangePickerPrevProps & PrimitiveProps;

// DateRangePickerNext
export interface DateRangePickerNextProps extends RangeCalendarNextProps {}
export type DateRangePickerNextPropsWithPrimitive = DateRangePickerNextProps & PrimitiveProps;

// DatePickerClose
export interface DateRangePickerCloseProps extends PopoverCloseProps {}
export type DateRangePickerClosePropsWithPrimitive = DateRangePickerCloseProps & PrimitiveProps;

// DateRangePickerArrow
export interface DateRangePickerArrowProps extends PopoverArrowProps {}
export type DateRangePickerArrowPropsWithPrimitive = DateRangePickerArrowProps & PrimitiveProps;

// DateRangePickerAnchor
export interface DateRangePickerAnchorProps extends PopoverAnchorProps {}
export type DateRangePickerAnchorPropsWithPrimitive = DateRangePickerAnchorProps & PrimitiveProps;
