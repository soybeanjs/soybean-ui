import type {
  BottomSheetCompactProps,
  BottomSheetCompactEmits,
  BottomSheetCompactSlots,
  BottomSheetUi
} from '@soybeanjs/headless/bottom-sheet';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Props for the bottom sheet component.
 */
export type BottomSheetProps = BottomSheetCompactProps & {
  /**
   * the popup class of the dialog
   */
  class?: ClassValue;
  /**
   * Visual size of the component.
   */
  size?: ThemeSize;
  /**
   * Per-slot class overrides for the component.
   */
  ui?: Partial<BottomSheetUi>;
};

/**
 * Emits for the bottom sheet component.
 */
export type BottomSheetEmits = BottomSheetCompactEmits;

/**
 * Slots for the bottom sheet component.
 */
export type BottomSheetSlots = BottomSheetCompactSlots;
