import type { DateValue } from '@internationalized/date';
import type { ClassValue } from '@soybeanjs/headless';

import type {
  YearRangePickerPopupProps,
  YearRangePickerRootEmits,
  YearRangePickerRootProps,
  YearRangePickerTriggerProps,
  YearRangePickerUi
} from '@soybeanjs/headless/year-range-picker';
import type { DateRange } from '@soybeanjs/headless/date';
import type { ThemeSize } from '@/theme';

/**
 * Props for the year range picker component.
 */
export interface YearRangePickerProps extends /* @vue-ignore */ YearRangePickerRootProps {
  /**
   * Additional class names applied to the root element.
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<YearRangePickerUi>;
  /**
   * Props forwarded to the trigger element.
   */
  triggerProps?: YearRangePickerTriggerProps;
  /**
   * Props forwarded to the popup element.
   */
  popupProps?: YearRangePickerPopupProps;
}

/**
 * Emits for the year range picker component.
 */
export type YearRangePickerEmits = YearRangePickerRootEmits;

/**
 * Slots for the year range picker component.
 */
export interface YearRangePickerSlots {
  /**
   * Custom content for the trigger slot.
   */
  trigger?: (props: { displayValue: string; modelValue: DateRange; open: boolean }) => any;
  /**
   * Custom content for the heading slot.
   */
  heading?: (props: { headingValue: string }) => any;
  /**
   * Custom content for the prev slot.
   */
  prev?: (props: { disabled: boolean }) => any;
  /**
   * Custom content for the next slot.
   */
  next?: (props: { disabled: boolean }) => any;
  /**
   * Custom content for the year slot.
   */
  year?: (props: {
    date: DateValue;
    label: string;
    disabled: boolean;
    focused: boolean;
    highlighted: boolean;
    rangeEnd: boolean;
    rangeStart: boolean;
    selected: boolean;
  }) => any;
  /**
   * Custom content for the default slot.
   */
  default?: (props: { displayValue: string; modelValue: DateRange; open: boolean }) => any;
}
