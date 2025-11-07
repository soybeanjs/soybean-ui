import type { Side } from '@soybeanjs/headless';
import type { DialogEmits, DialogProps } from '../dialog/types';

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
