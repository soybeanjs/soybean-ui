import type { Side } from '@soybeanjs/headless/types';
import type { DialogEmits, DialogProps, DialogSlots } from '../dialog/types';

/**
 * Properties for the Drawer component.
 */
export interface DrawerProps extends DialogProps {
  /**
   * Side placement of the component.
   */
  side?: Side;
}

/**
 * Events for the Drawer component.
 */
export type DrawerEmits = DialogEmits;

/**
 * Slots for the Drawer component.
 */
export type DrawerSlots = DialogSlots;
