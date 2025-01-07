import type { Ref } from 'vue';
import type { DateValue, Granularity, HourCycle, Matcher, WeekDayFormat } from '../../date';
import type { Direction } from '../../types';
import type { PrimitiveProps } from '../primitive';
import type { DateFieldInputProps, DateFieldRootProps } from '../date-field';
import type {
  CalendarCellProps,
  CalendarCellTriggerProps,
  CalendarGridBodyProps,
  CalendarGridHeadProps,
  CalendarGridProps,
  CalendarGridRowProps,
  CalendarHeadCellProps,
  CalendarHeaderProps,
  CalendarHeadingProps,
  CalendarNextProps,
  CalendarPrevProps,
  CalendarRootProps
} from '../calendar';
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
import type DateFieldRoot from '../date-field/date-field-root.vue';

// DatePickerRoot
export type DatePickerRootProps = DateFieldRootProps &
  PopoverRootProps &
  Pick<
    CalendarRootProps,
    | 'isDateDisabled'
    | 'pagedNavigation'
    | 'weekStartsOn'
    | 'weekdayFormat'
    | 'fixedWeeks'
    | 'numberOfMonths'
    | 'preventDeselect'
  >;

export type DatePickerRootEmits = PopoverRootEmits & {
  /** Event handler called whenever the model value changes */
  'update:modelValue': [date: DateValue | undefined];
  /** Event handler called whenever the placeholder value changes */
  'update:placeholder': [date: DateValue];
};

export type DateFieldInstance = InstanceType<typeof DateFieldRoot>;

export type DatePickerRootContext = {
  id: Ref<string | undefined>;
  name: Ref<string | undefined>;
  minValue: Ref<DateValue | undefined>;
  maxValue: Ref<DateValue | undefined>;
  hourCycle: Ref<HourCycle | undefined>;
  granularity: Ref<Granularity | undefined>;
  hideTimeZone: Ref<boolean>;
  required: Ref<boolean>;
  locale: Ref<string>;
  dateFieldRef: Ref<DateFieldInstance | undefined>;
  modelValue: Ref<DateValue | null | undefined>;
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
  defaultOpen: Ref<boolean>;
  open: Ref<boolean>;
  modal: Ref<boolean>;
  onDateChange: (date: DateValue | undefined) => void;
  onPlaceholderChange: (date: DateValue) => void;
  dir: Ref<Direction>;
};

// DatePickerTrigger
export interface DatePickerTriggerProps extends PopoverTriggerProps {}
export type DatePickerTriggerPropsWithPrimitive = DatePickerTriggerProps & PrimitiveProps;

// DatePickerContent
export interface DatePickerContentProps extends PopoverContentProps {}
export type DatePickerContentPropsWithPrimitive = DatePickerContentProps & PrimitiveProps;
export type DatePickerContentEmits = PopoverContentEmits;

// DatePickerHeader
export interface DatePickerHeaderProps extends CalendarHeaderProps {}
export type DatePickerHeaderPropsWithPrimitive = DatePickerHeaderProps & PrimitiveProps;

// DatePickerHeading
export interface DatePickerHeadingProps extends CalendarHeadingProps {}
export type DatePickerHeadingPropsWithPrimitive = DatePickerHeadingProps & PrimitiveProps;

// DatePickerHeadCell
export interface DatePickerHeadCellProps extends CalendarHeadCellProps {}
export type DatePickerHeadCellPropsWithPrimitive = DatePickerHeadCellProps & PrimitiveProps;

// DatePickerGrid
export interface DatePickerGridProps extends CalendarGridProps {}
export type DatePickerGridPropsWithPrimitive = DatePickerGridProps & PrimitiveProps;

// DatePickerGridHead
export interface DatePickerGridHeadProps extends CalendarGridHeadProps {}
export type DatePickerGridHeadPropsWithPrimitive = DatePickerGridHeadProps & PrimitiveProps;

// DatePickerGridBody
export interface DatePickerGridBodyProps extends CalendarGridBodyProps {}
export type DatePickerGridBodyPropsWithPrimitive = DatePickerGridBodyProps & PrimitiveProps;

// DatePickerGridRow
export interface DatePickerGridRowProps extends CalendarGridRowProps {}
export type DatePickerGridRowPropsWithPrimitive = DatePickerGridRowProps & PrimitiveProps;

// DatePickerCell
export interface DatePickerCellProps extends CalendarCellProps {}
export type DatePickerCellPropsWithPrimitive = DatePickerCellProps & PrimitiveProps;

// DatePickerCellTrigger
export interface DatePickerCellTriggerProps extends CalendarCellTriggerProps {}
export type DatePickerCellTriggerPropsWithPrimitive = DatePickerCellTriggerProps & PrimitiveProps;

// DatePickerInput
export interface DatePickerInputProps extends DateFieldInputProps {}
export type DatePickerInputPropsWithPrimitive = DatePickerInputProps & PrimitiveProps;

// DatePickerPrev
export interface DatePickerPrevProps extends CalendarPrevProps {}
export type DatePickerPrevPropsWithPrimitive = DatePickerPrevProps & PrimitiveProps;

// DatePickerNext
export interface DatePickerNextProps extends CalendarNextProps {}
export type DatePickerNextPropsWithPrimitive = DatePickerNextProps & PrimitiveProps;

// DatePickerClose
export interface DatePickerCloseProps extends PopoverCloseProps {}
export type DatePickerClosePropsWithPrimitive = DatePickerCloseProps & PrimitiveProps;

// DatePickerArrow
export interface DatePickerArrowProps extends PopoverArrowProps {}
export type DatePickerArrowPropsWithPrimitive = DatePickerArrowProps & PrimitiveProps;

// DatePickerAnchor
export interface DatePickerAnchorProps extends PopoverAnchorProps {}
export type DatePickerAnchorPropsWithPrimitive = DatePickerAnchorProps & PrimitiveProps;
