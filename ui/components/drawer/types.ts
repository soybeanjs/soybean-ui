import type { Side } from '@headless';
import type { DialogEmits, DialogProps, DialogUi } from '../dialog/types';

export interface DrawerProps extends DialogProps {
  side?: Side;
  /**
   * If true, the content will be scrollable when the root has height and content is taller than the root
   *
   * @default true
   */
  scrollable?: boolean;
}

export type DrawerEmits = DialogEmits;

export type DrawerUi = DialogUi;
