import type { ClassValue } from '@soybeanjs/headless/types';
import type {
  DateRangeFieldInputProps,
  DateRangeFieldRootEmits,
  DateRangeFieldRootProps,
  DateRangeFieldUi
} from '@soybeanjs/headless/date-range-field';
import type { ThemeSize } from '@/theme';

/**
 * Slot properties for the DateRangeField component.
 */
export interface DateRangeFieldSlotProps {
  /**
   * Current model value.
   */
  modelValue: DateRangeFieldRootProps['modelValue'];
  /**
   * Start segments exposed in the slot scope.
   */
  startSegments: { part: DateRangeFieldInputProps['part']; value: string }[];
  /**
   * End segments exposed in the slot scope.
   */
  endSegments: { part: DateRangeFieldInputProps['part']; value: string }[];
  /**
   * Whether the current value is invalid.
   */
  isInvalid: boolean;
}

/**
 * Properties for the DateRangeField component.
 */
export interface DateRangeFieldProps extends DateRangeFieldRootProps {
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
  ui?: Partial<DateRangeFieldUi>;
  /**
   * Properties forwarded to the input element.
   */
  inputProps?: Omit<DateRangeFieldInputProps, 'part' | 'type'>;
  /**
   * Separator.
   */
  separator?: string;
}

/**
 * Events for the DateRangeField component.
 */
export type DateRangeFieldEmits = DateRangeFieldRootEmits;

/**
 * Slots for the DateRangeField component.
 */
export interface DateRangeFieldSlots {
  /**
   * Custom content for the default slot.
   */
  default?: (props: DateRangeFieldSlotProps) => any;
  /**
   * Custom content for the separator slot.
   */
  separator?: () => any;
}
