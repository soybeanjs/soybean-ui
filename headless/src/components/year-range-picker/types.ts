import type { DateValue } from '@internationalized/date';
import type { ComputedRef, ShallowRef } from 'vue';
import type { DateRange, Formatter, Grid } from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveWithBaseProps } from '../primitive/types';

/**
 * Properties for the YearRangePickerRoot component.
 */
export interface YearRangePickerRootProps extends FormFieldCommonProps, Omit<PrimitiveWithBaseProps, 'placeholder'> {
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
   * Min value.
   */
  minValue?: DateValue;
  /**
   * Max value.
   */
  maxValue?: DateValue;
  /**
   * Locale.
   */
  locale?: string;
  /**
   * Whether the component is disabled.
   */
  disabled?: boolean;
  /**
   * Whether the component is readonly.
   */
  readonly?: boolean;
  /**
   * Id.
   */
  id?: string;
  /**
   * Reading direction of the component.
   */
  dir?: Direction;
  /**
   * Whether the component is open by default.
   */
  defaultOpen?: boolean;
  /**
   * Whether the component is open.
   */
  open?: boolean;
  /**
   * Whether the popup is modal.
   */
  modal?: boolean;
}

/**
 * Events for the YearRangePickerRoot component.
 */
export type YearRangePickerRootEmits = {
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
  /**
   * Emitted when the end value changes.
   */
  'update:endValue': [date: DateValue | undefined];
  /**
   * Emitted when the open state changes.
   */
  'update:open': [open: boolean];
};

/**
 * Properties for the YearRangePickerTrigger component.
 */
export interface YearRangePickerTriggerProps extends PrimitiveWithBaseProps {}
/**
 * Properties for the YearRangePickerPopup component.
 */
export interface YearRangePickerPopupProps extends PrimitiveWithBaseProps {}

/**
 * Context for the YearRangePickerRoot component.
 */
export interface YearRangePickerRootContext extends PropsToContext<YearRangePickerRootProps, 'disabled' | 'readonly'> {
  /**
   * Locale used by the component context.
   */
  locale: ComputedRef<string>;
  /**
   * Reading direction of the component.
   */
  dir: ComputedRef<Direction>;
  /**
   * Current model value.
   */
  modelValue: ShallowRef<DateRange>;
  /**
   * Placeholder used by the component context.
   */
  placeholder: ShallowRef<DateValue>;
  /**
   * Whether the current value is invalid.
   */
  isInvalid: ComputedRef<boolean>;
  /**
   * Formatter used by the component context.
   */
  formatter: Formatter;
  /**
   * Whether the component is open.
   */
  open: ShallowRef<boolean | undefined>;
  /**
   * Popup id used by the component context.
   */
  popupId: string;
  /**
   * Display value used by the component context.
   */
  displayValue: ComputedRef<string>;
  /**
   * Heading value used by the component context.
   */
  headingValue: ComputedRef<string>;
  /**
   * Focused year used by the component context.
   */
  focusedYear: ShallowRef<DateValue>;
  /**
   * Hovered year used by the component context.
   */
  hoveredYear: ShallowRef<DateValue | undefined>;
  /**
   * Year grid used by the component context.
   */
  yearGrid: ComputedRef<Grid<DateValue>>;
  /**
   * Min value used by the component context.
   */
  minValue: ComputedRef<DateValue | undefined>;
  /**
   * Max value used by the component context.
   */
  maxValue: ComputedRef<DateValue | undefined>;
  /**
   * Whether the component has selected range.
   */
  hasSelectedRange: ComputedRef<boolean>;
  /**
   * Callback invoked when the range changes.
   */
  onRangeChange: (date: DateValue) => void;
  /**
   * Callback invoked when the placeholder changes.
   */
  onPlaceholderChange: (date: DateValue) => void;
  /**
   * Whether the year is disabled.
   */
  isYearDisabled: (date: DateValue) => boolean;
  /**
   * Whether the year is selected.
   */
  isYearSelected: (date: DateValue) => boolean;
  /**
   * Whether the year is highlighted.
   */
  isYearHighlighted: (date: DateValue) => boolean;
  /**
   * Whether a range start.
   */
  isRangeStart: (date: DateValue) => boolean;
  /**
   * Whether a range end.
   */
  isRangeEnd: (date: DateValue) => boolean;
  /**
   * Set open used by the component context.
   */
  setOpen: (value: boolean) => void;
  /**
   * Set focused year used by the component context.
   */
  setFocusedYear: (date: DateValue) => void;
  /**
   * Set hovered year used by the component context.
   */
  setHoveredYear: (date: DateValue | undefined) => void;
  /**
   * Prev page used by the component context.
   */
  prevPage: () => void;
  /**
   * Next page used by the component context.
   */
  nextPage: () => void;
  /**
   * Whether the previous button is disabled.
   */
  isPrevButtonDisabled: () => boolean;
  /**
   * Whether the next button is disabled.
   */
  isNextButtonDisabled: () => boolean;
}

/**
 * Available UI slots for the YearRangePicker component.
 */
export type YearRangePickerUiSlot =
  | 'root'
  | 'trigger'
  | 'popup'
  | 'header'
  | 'heading'
  | 'prev'
  | 'next'
  | 'grid'
  | 'cellTrigger';
/**
 * UI class overrides for the YearRangePicker component.
 */
export type YearRangePickerUi = UiClass<YearRangePickerUiSlot>;
