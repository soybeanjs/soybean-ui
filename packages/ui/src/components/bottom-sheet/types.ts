import type {
  BottomSheetCompactProps,
  BottomSheetCompactEmits,
  BottomSheetCompactSlots,
  BottomSheetUi
} from '@soybeanjs/headless/bottom-sheet';
import type { ClassValue } from '@soybeanjs/headless/types';
import type { ThemeSize } from '@/theme';

/**
 * Properties for the BottomSheet component.
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
 * Events for the BottomSheet component.
 */
export type BottomSheetEmits = BottomSheetCompactEmits;

/**
 * Slots for the BottomSheet component.
 */
export type BottomSheetSlots = BottomSheetCompactSlots;
