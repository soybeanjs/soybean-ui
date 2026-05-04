import type { DateValue } from '@internationalized/date';
import type { ComputedRef, HTMLAttributes, ShallowRef } from 'vue';
import type { Formatter, Grid } from '../../date';
import type { Direction, FormFieldCommonProps, PropsToContext, UiClass } from '../../types';
import type { PrimitiveProps } from '../primitive/types';

/**
 * Properties for the year picker root component.
 */
export interface YearPickerRootProps
  extends PrimitiveProps, FormFieldCommonProps, /** @vue-ignore */ Omit<HTMLAttributes, 'placeholder'> {
  /**
   * Default value.
   */
  defaultValue?: DateValue;
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
  modelValue?: DateValue;
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
 * Events for the year picker root component.
 */
export type YearPickerRootEmits = {
  /**
   * Emitted when the model value changes.
   */
  'update:modelValue': [date: DateValue | undefined];
  /**
   * Emitted when the placeholder value changes.
   */
  'update:placeholder': [date: DateValue];
  /**
   * Emitted when the open state changes.
   */
  'update:open': [open: boolean];
};

/**
 * Properties for the year picker trigger component.
 */
export interface YearPickerTriggerProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}
/**
 * Properties for the year picker popup component.
 */
export interface YearPickerPopupProps extends PrimitiveProps, /** @vue-ignore */ HTMLAttributes {}

/**
 * Context for the year picker root component.
 */
export interface YearPickerRootContext extends PropsToContext<YearPickerRootProps, 'disabled' | 'readonly'> {
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
  modelValue: ShallowRef<DateValue | undefined>;
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
   * Callback invoked when the year changes.
   */
  onYearChange: (date: DateValue) => void;
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
   * Set open used by the component context.
   */
  setOpen: (value: boolean) => void;
  /**
   * Set focused year used by the component context.
   */
  setFocusedYear: (date: DateValue) => void;
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
 * Available UI slots for the year picker component.
 */
export type YearPickerUiSlot =
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
 * UI class overrides for the year picker component.
 */
export type YearPickerUi = UiClass<YearPickerUiSlot>;
