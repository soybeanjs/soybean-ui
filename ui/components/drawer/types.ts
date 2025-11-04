import type { Side } from '@headless';
import type { DialogEmits, DialogProps, DialogUi } from '../dialog/types';

export interface DrawerProps extends DialogProps {
  side?: Side;
}

export type DrawerEmits = DialogEmits;

export type DrawerUi = DialogUi;
