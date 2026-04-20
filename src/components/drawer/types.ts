import type { Side } from '@soybeanjs/headless';
import type { DialogEmits, DialogProps, DialogSlots } from '../dialog/types';

export interface DrawerProps extends DialogProps {
  side?: Side;
}

export type DrawerEmits = DialogEmits;

export type DrawerSlots = DialogSlots;
