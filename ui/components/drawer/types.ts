import type { Side } from '@headless';
import type { DialogEmits, DialogProps, DialogSizeContextParams, DialogUi } from '../dialog/types';

export interface DrawerProps extends DialogProps {
  side?: Side;
}

export type DrawerEmits = DialogEmits;

export type DrawerUi = DialogUi;

export type DrawerSizeContextParams = DialogSizeContextParams;
