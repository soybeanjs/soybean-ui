import type { DateValue } from '@internationalized/date';
import type { ClassValue } from '@soybeanjs/headless/types';

import type {
  YearPickerPopupProps,
  YearPickerRootEmits,
  YearPickerRootProps,
  YearPickerTriggerProps,
  YearPickerUi
} from '@soybeanjs/headless/year-picker';
import type { ThemeSize } from '@/theme';

/**
 * Props for the year picker component.
 */
export interface YearPickerProps extends /* @vue-ignore */ YearPickerRootProps {
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
  ui?: Partial<YearPickerUi>;
  /**
   * Props forwarded to the trigger element.
   */
  triggerProps?: YearPickerTriggerProps;
  /**
   * Props forwarded to the popup element.
   */
  popupProps?: YearPickerPopupProps;
}

/**
 * Emits for the year picker component.
 */
export type YearPickerEmits = YearPickerRootEmits;

/**
 * Slots for the year picker component.
 */
export interface YearPickerSlots {
  /**
   * Custom content for the trigger slot.
   */
  trigger?: (props: { displayValue: string; modelValue: DateValue | undefined; open: boolean }) => any;
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
  year?: (props: { date: DateValue; label: string; disabled: boolean; focused: boolean; selected: boolean }) => any;
  /**
   * Custom content for the default slot.
   */
  default?: (props: { displayValue: string; modelValue: DateValue | undefined; open: boolean }) => any;
}
