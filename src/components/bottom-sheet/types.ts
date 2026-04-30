import type {
  ClassValue,
  BottomSheetCompactProps,
  BottomSheetCompactEmits,
  BottomSheetCompactSlots,
  BottomSheetUi
} from '@soybeanjs/headless';
import type { ThemeSize } from '@/theme';

export type BottomSheetProps = BottomSheetCompactProps & {
  /**
   * the popup class of the dialog
   */
  class?: ClassValue;
  size?: ThemeSize;
  ui?: Partial<BottomSheetUi>;
};

export type BottomSheetEmits = BottomSheetCompactEmits;

export type BottomSheetSlots = BottomSheetCompactSlots;
