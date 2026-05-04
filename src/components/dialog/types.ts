import type { DialogCompactProps, DialogCompactEmits, DialogCompactSlots, DialogUi } from '@soybeanjs/headless/dialog';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the dialog component.
 */
export interface DialogProps extends DialogCompactProps {
  /**
   * the popup class of the dialog
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<DialogUi>;
}

/**
 * Events for the dialog component.
 */
export type DialogEmits = DialogCompactEmits;

/**
 * Slots for the dialog component.
 */
export type DialogSlots = DialogCompactSlots;
