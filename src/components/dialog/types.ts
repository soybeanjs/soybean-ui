import type {
  ClassValue,
  DialogCompactProps,
  DialogCompactEmits,
  DialogCompactSlots,
  DialogUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export interface DialogProps extends DialogCompactProps {
  /**
   * the popup class of the dialog
   */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<DialogUi>;
}

export type DialogEmits = DialogCompactEmits;

export type DialogSlots = DialogCompactSlots;
