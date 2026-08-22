import type {
  SplitNavBaseOptionData,
  SplitNavRootEmits,
  SplitNavRootProps,
  SplitNavRootSlots,
  SplitNavUiSlot
} from '@soybeanjs/headless/split-nav';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the SplitNav component.
 */
export interface SplitNavProps<T extends SplitNavBaseOptionData = SplitNavBaseOptionData> extends SplitNavRootProps<T> {
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
  ui?: Partial<Record<SplitNavUiSlot, ClassValue>>;
}

/**
 * Events for the SplitNav component.
 */
export type SplitNavEmits = SplitNavRootEmits;

/**
 * Slots for the SplitNav component.
 */
export type SplitNavSlots<T extends SplitNavBaseOptionData = SplitNavBaseOptionData> = SplitNavRootSlots<T>;
