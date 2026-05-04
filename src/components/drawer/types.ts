import type { Side } from '@soybeanjs/headless/types';
import type { DialogEmits, DialogProps, DialogSlots } from '../dialog/types';

/**
 * Properties for the drawer component.
 */
export interface DrawerProps extends DialogProps {
  /**
   * Side placement of the component.
   */
  side?: Side;
}

/**
 * Events for the drawer component.
 */
export type DrawerEmits = DialogEmits;

/**
 * Slots for the drawer component.
 */
export type DrawerSlots = DialogSlots;
