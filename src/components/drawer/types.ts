import type { Side } from '@soybeanjs/headless';
import type { DialogEmits, DialogProps, DialogSlots } from '../dialog/types';

/**
 * Props for the drawer component.
 */
export interface DrawerProps extends DialogProps {
  /**
   * Side placement of the component.
   */
  side?: Side;
}

/**
 * Emits for the drawer component.
 */
export type DrawerEmits = DialogEmits;

/**
 * Slots for the drawer component.
 */
export type DrawerSlots = DialogSlots;
