import type {
  PopperV2CompactProps,
  PopperV2CompactEmits,
  PopperV2CompactSlots,
  PopperV2Ui
} from '@soybeanjs/headless/popper-v2';
import type { ClassValue } from '@soybeanjs/headless/types';

export type PopperV2Size = 'sm' | 'md' | 'lg';

/**
 * Properties for the PopperV2 component.
 */
export interface PopperV2Props extends PopperV2CompactProps {
  /**
   * class of popup
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: PopperV2Size;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<PopperV2Ui>;
}

/**
 * Events for the PopperV2 component.
 */
export type PopperV2Emits = PopperV2CompactEmits;

/**
 * Slots for the PopperV2 component.
 */
export type PopperV2Slots = PopperV2CompactSlots;
