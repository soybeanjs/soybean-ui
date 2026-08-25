import type { PopperCompactProps, PopperCompactEmits, PopperCompactSlots, PopperUi } from '@soybeanjs/headless/popper';
import type { ClassValue } from '@soybeanjs/headless/types';

export type PopperSize = 'sm' | 'md' | 'lg';

/**
 * Properties for the Popper component.
 */
export interface PopperProps extends PopperCompactProps {
  /**
   * class of popup
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: PopperSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<PopperUi>;
}

/**
 * Events for the Popper component.
 */
export type PopperEmits = PopperCompactEmits;

/**
 * Slots for the Popper component.
 */
export type PopperSlots = PopperCompactSlots;
