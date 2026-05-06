import type { ClassValue } from '@soybeanjs/headless/types';
import type {
  TimeRangeFieldInputProps,
  TimeRangeFieldRootEmits,
  TimeRangeFieldRootProps,
  TimeRangeFieldUi
} from '@soybeanjs/headless/time-range-field';
import type { ThemeSize } from '@/theme';

/**
 * Slot properties for the TimeRangeField component.
 */
export interface TimeRangeFieldSlotProps {
  /**
   * Current model value.
   */
  modelValue: TimeRangeFieldRootProps['modelValue'];
  /**
   * Start segments exposed in the slot scope.
   */
  startSegments: { part: TimeRangeFieldInputProps['part']; value: string }[];
  /**
   * End segments exposed in the slot scope.
   */
  endSegments: { part: TimeRangeFieldInputProps['part']; value: string }[];
  /**
   * Whether the current value is invalid.
   */
  isInvalid: boolean;
}

/**
 * Properties for the TimeRangeField component.
 */
export interface TimeRangeFieldProps extends TimeRangeFieldRootProps {
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
  ui?: Partial<TimeRangeFieldUi>;
  /**
   * Properties forwarded to the input element.
   */
  inputProps?: Omit<TimeRangeFieldInputProps, 'part' | 'type'>;
  /**
   * Separator.
   */
  separator?: string;
}

/**
 * Events for the TimeRangeField component.
 */
export type TimeRangeFieldEmits = TimeRangeFieldRootEmits;

/**
 * Slots for the TimeRangeField component.
 */
export interface TimeRangeFieldSlots {
  /**
   * Custom content for the default slot.
   */
  default?: (props: TimeRangeFieldSlotProps) => any;
  /**
   * Custom content for the separator slot.
   */
  separator?: () => any;
}
